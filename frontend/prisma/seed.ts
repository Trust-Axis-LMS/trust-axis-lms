import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import prisma from '../src/lib/prisma';

function getVendor(name: string): string {
  const n = name.toUpperCase();
  if (n.includes('CEH') || n.includes('CND') || n.includes('CPENT') || n.includes('CIH')) return 'EC-Council';
  if (n.includes('CISSP') || n.includes('CCSP') || n.includes('SSCP') || n === 'CC' || n.includes('CGRC') || n.includes('SOFTWARE DEVELOPMENT SECURITY')) return 'ISC2';
  if (n.includes('CISA') || n.includes('CISM') || n.includes('CRISC') || n.includes('CGEIT') || n.includes('CDPSE') || n.includes('COBIT')) return 'ISACA';
  if (n.includes('IAPP')) return 'IAPP';
  if (n.includes('NETWORK+') || n.includes('PENTEST+')) return 'CompTIA';
  if (n.includes('CCNA') || n.includes('CCNP') || n.includes('APIC') || n.includes('REST')) return 'Cisco';
  if (n.includes('CSA')) return 'CSA';
  if (n.includes('SAILPOINT')) return 'SailPoint';
  if (n.includes('ISO') || n.includes('IEC')) return 'PECB';
  if (n.includes('ITIL')) return 'AXELOS';
  if (n.includes('ENTERPRISE ARCHITECTURE')) return 'The Open Group';
  return 'Global Providers';
}

function getCategory(name: string): string {
  const n = name.toUpperCase();
  if (n.includes('CEH') || n.includes('CPENT') || n.includes('PENTEST+')) return 'Offensive Security';
  if (n.includes('CND') || n.includes('CCNA') || n.includes('CCNP') || n.includes('NETWORK+') || n.includes('APIC')) return 'Network Security';
  if (n.includes('CCSP') || n.includes('CSA CCSK')) return 'Cloud Security';
  if (n.includes('IAPP') || n.includes('CDPSE')) return 'Data Privacy';
  if (n.includes('SAILPOINT')) return 'Identity and Access Management';
  if (n.includes('CIH') || n.includes('CCOA') || n.includes('27035')) return 'Security Operations';
  if (n.includes('CISA') || n.includes('27001')) return 'IT and Information Security Audit';
  if (n.includes('CRISC') || n.includes('CGRC')) return 'Governance, Risk and Compliance';
  if (n.includes('ITIL') || n.includes('20000')) return 'IT Service Management';
  if (n.includes('SOFTWARE DEVELOPMENT SECURITY') || n.includes('REST')) return 'Application Security';
  if (n.includes('ENTERPRISE ARCHITECTURE')) return 'Enterprise Architecture';
  if (n.includes('CISSP') || n.includes('CISM') || n.includes('CGEIT') || n === 'CC') return 'Cybersecurity Management';
  return 'Cybersecurity Management';
}

async function main() {
  const jsonPath = path.resolve(__dirname, '../../course_content.json');
  const fileContent = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(fileContent);

  const fixedJsonPath = path.resolve(__dirname, '../../fixed_curriculum.json');
  let fixedCurriculumData: Record<string, any> = {};
  if (fs.existsSync(fixedJsonPath)) {
    fixedCurriculumData = JSON.parse(fs.readFileSync(fixedJsonPath, 'utf8'));
  }

  console.log("Clearing existing courses...");
  await prisma.course.deleteMany();

  for (const courseData of data.courses) {
    const rawTitle = courseData.name;
    // Clean up weird parsing artifacts (e.g. " AI")
    let cleanTitle = rawTitle.replace(/[^a-zA-Z0-9\s\+\-\/]/g, '').trim();
    if (!cleanTitle || cleanTitle.length < 2) continue;

    // Special case for the weird "AI" or truncated titles
    if (cleanTitle === 'AI') continue;
    if (cleanTitle === '4 IT') cleanTitle = 'ITIL 4 Foundation';
    if (cleanTitle === 'SD') cleanTitle = 'Software Development Security';
    if (cleanTitle === 'EAP') cleanTitle = 'Enterprise Architecture Practitioner';

    const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const vendor = getVendor(cleanTitle);
    const category = getCategory(cleanTitle);

    console.log(`Seeding course: ${cleanTitle} (Slug: ${slug}, Vendor: ${vendor}, Category: ${category})`);

    const course = await prisma.course.upsert({
      where: { slug },
      update: {},
      create: {
        title: cleanTitle,
        slug,
        category,
        vendor,
        subtitle: `Comprehensive training for ${cleanTitle} Certification.`,
        highlights: [
          'Master industry-standard frameworks and practices.',
          'Hands-on labs and real-world scenarios.',
          'Expert-led guidance for certification success.'
        ],
        duration: 'Flexible',
        mode: 'Online / Hybrid',
        weeklyHours: '10-15 hrs',
        certificate: 'Upon Completion',
        rating: 4.8,
        students: '1.2K+',
        aboutCourse: [
          `The ${cleanTitle} program provides specialized instruction and hands-on preparation to solidify your skills in the ${category} domain.`
        ],
        directorQuoteText: 'This program equips professionals with the necessary expertise required to succeed in top-tier enterprise environments.',
        directorQuoteAuthor: 'Trust Axis Leadership',
        curriculum: {
          create: (fixedCurriculumData[slug] || courseData.modules || []).map((m: any, idx: number) => ({
            number: m.number || idx + 1,
            title: m.title,
            subtopics: m.subtopics || m.topics || [],
          }))
        },
        programHighlights: {
          create: [
            { icon: "Shield", title: "Core Fundamentals", description: `Comprehensive training on foundational ${category.toLowerCase()} concepts.` },
            { icon: "Brain", title: "Advanced Strategies", description: `Learn deep architectural and security patterns for ${cleanTitle}.` },
            { icon: "Crosshair", title: "Exam Preparation", description: "Targeted practice for certification success." }
          ]
        },
        objectives: {
          create: [
            { number: 1, title: "Understand Core Principles", description: `Grasp the fundamental models and concepts of ${cleanTitle}.` },
            { number: 2, title: "Implement Best Practices", description: `Apply industry-standard ${category.toLowerCase()} practices to real-world scenarios.` },
            { number: 3, title: "Analyze and Troubleshoot", description: `Identify issues and implement robust solutions in a ${category.toLowerCase()} environment.` }
          ]
        },
        targetAudience: {
          create: [
            { icon: "User", title: "Professionals", description: `IT professionals seeking expertise in ${category}.` },
            { icon: "UserCheck", title: "Security Enthusiasts", description: `Individuals passionate about mastering ${cleanTitle}.` },
            { icon: "Building2", title: "Consultants", description: `Consultants who advise clients on ${category.toLowerCase()} best practices.` }
          ]
        },
        examDetails: {
          create: [
            {
              name: `${cleanTitle} Certification Exam`,
              provider: vendor,
              duration: "3 - 4 Hours",
              format: "Multiple Choice / Practical",
              passScore: "70% or higher",
              prepIncluded: true
            }
          ]
        },
        toolsCovered: {
          create: category === 'Offensive Security' ? [
            { name: "Kali Linux", icon: "Terminal", category: "OS" },
            { name: "Metasploit", icon: "Sword", category: "Exploitation" },
            { name: "Nmap", icon: "Network", category: "Scanning" },
            { name: "Burp Suite", icon: "Globe", category: "Proxy" }
          ] : category === 'Cloud Security' ? [
            { name: "AWS Security", icon: "Cloud", category: "Infrastructure" },
            { name: "Azure Security", icon: "Cloud", category: "Infrastructure" },
            { name: "Google Cloud", icon: "Cloud", category: "Infrastructure" }
          ] : category === 'Network Security' ? [
            { name: "Wireshark", icon: "Search", category: "Analysis" },
            { name: "Nmap", icon: "Network", category: "Scanning" },
            { name: "Snort", icon: "Shield", category: "IDS" }
          ] : [
            { name: "Enterprise Tools", icon: "Settings", category: "Governance" },
            { name: "Audit Frameworks", icon: "FileText", category: "Audit" },
            { name: "Automation Scripts", icon: "Code", category: "Management" }
          ]
        }
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
