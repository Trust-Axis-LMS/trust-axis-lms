export interface ProgramHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface Objective {
  number: number;
  title: string;
  description: string;
}

export interface CurriculumSubtopic {
  title: string;
}

export interface CurriculumModule {
  number: number;
  title: string;
  duration: string;
  modules: number;
  subtopics: CurriculumSubtopic[];
}

export interface TargetAudienceItem {
  icon: string;
  title: string;
  description: string;
}

export interface ExamDetail {
  name: string;
  provider: string;
  passScore: string;
  prepIncluded: boolean;
}

export interface Tool {
  name: string;
  icon: string;
  category: string;
}

export interface Course {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  highlights: string[];
  duration: string;
  mode: string;
  weeklyHours: string;
  certificate: string;
  rating: number;
  students: string;
  thumbnailUrl?: string;
  programHighlights: ProgramHighlight[];
  aboutCourse: string[];
  directorQuote: { text: string; author: string };
  objectives: Objective[];
  curriculum: CurriculumModule[];
  targetAudience: TargetAudienceItem[];
  examDetails: ExamDetail[];
  toolsCovered: Tool[];
}

export const categories = [
  "All",
  "Cybersecurity Management",
  "Governance, Risk and Compliance",
  "Data Privacy",
  "Cloud Security",
  "IT and Information Security Audit",
  "Security Operations",
  "Digital Forensics",
  "Network Security",
  "Identity and Access Management",
  "Offensive Security",
  "Security Architecture",
];

const generateMockCourse = (slug: string, title: string, category: string): Course => ({
  slug,
  category,
  title,
  subtitle: "Comprehensive training and preparation for specialized certification.",
  highlights: [
    "Focuses on advanced strategies and implementation principles.",
    "Covers comprehensive enterprise frameworks and best practices.",
    "Expert-led guidance towards passing the certification exam."
  ],
  duration: "Flexible",
  mode: "Online / Hybrid",
  weeklyHours: "10-15 hrs",
  certificate: "Upon Completion",
  rating: 4.8,
  students: "1.2K+",
  thumbnailUrl: "/images/courses/cdpse.webp",
  programHighlights: [
    { icon: "Shield", title: "Core Fundamentals", description: "Comprehensive training on foundational concepts." },
    { icon: "Briefcase", title: "Real-world Implementation", description: "Learn how to implement practices effectively." },
    { icon: "Lock", title: "Enterprise Strategies", description: "Understand complex protection and structural methodologies." },
    { icon: "Activity", title: "Risk Management", description: "Learn how to assess and manage risks." },
    { icon: "CheckSquare", title: "Compliance Training", description: "In-depth regulatory and standards compliance." },
    { icon: "Award", title: "Exam Preparation", description: "Robust materials to earn a globally recognized certification." }
  ],
  aboutCourse: [
    `The ${title} program provides specialized instruction and hands-on preparation to solidify your skills in the ${category} domain. Participants will master various industry frameworks, standards, and practical controls.`
  ],
  directorQuote: {
    text: "This program equips professionals with the necessary expertise required to succeed in top-tier enterprise environments.",
    author: "Trust Axis Leadership"
  },
  objectives: [
    { number: 1, title: "Master Core Frameworks", description: "Develop an understanding of key processes." },
    { number: 2, title: "Risk and Mitigation", description: "Identify and manage enterprise risks." },
    { number: 3, title: "Regulatory Compliance", description: "Ensure compliance with global standards." },
    { number: 4, title: "Strategic Implementation", description: "Implement leading practices efficiently." },
    { number: 5, title: "Operational Continuity", description: "Focus on continuous improvement of services." },
    { number: 6, title: "Advanced Architecture", description: "Integrate solutions seamlessly." }
  ],
  curriculum: [
    { number: 1, title: "Domain Foundations", duration: "Flexible", modules: 3, subtopics: [{ title: "Overview and Frameworks" }, { title: "Governance Structure" }, { title: "Policy Development" }] },
    { number: 2, title: "Process & Operations", duration: "Flexible", modules: 3, subtopics: [{ title: "Strategic Management" }, { title: "Risk Mitigation" }, { title: "Monitoring" }] },
    { number: 3, title: "Implementation Controls", duration: "Flexible", modules: 3, subtopics: [{ title: "Infrastructure Design" }, { title: "Security Layers" }, { title: "Access Policies" }] },
    { number: 4, title: "Exam Preparation", duration: "Flexible", modules: 3, subtopics: [{ title: "Review Sessions" }, { title: "Practice Tests" }, { title: "Final Assessment" }] }
  ],
  targetAudience: [
    { icon: "Users", title: "IT Professionals", description: "Professionals looking to specialize and validate their expertise." },
    { icon: "Briefcase", title: "Managers and Leaders", description: "Leaders aiming to govern and structure organization protocols." }
  ],
  examDetails: [
    { name: "Certification Exam", provider: "Industry recognized provider", passScore: "Dependent on vendor", prepIncluded: true }
  ],
  toolsCovered: [
    { name: "Global Standard", icon: "BookOpen", category: "Framework" },
    { name: "Industry Protocols", icon: "Layers", category: "Standard" },
    { name: "Assessment Toolkit", icon: "Activity", category: "Audit" },
  ],
});

export const courses: Course[] = [
  // Cybersecurity Management
  generateMockCourse("cc", "ISC2 - Certified in Cybersecurity (CC) - Certification Training", "Cybersecurity Management"),
  generateMockCourse("sscp", "ISC2 - SSCP - Systems Security Certified Practitioner", "Cybersecurity Management"),
  generateMockCourse("iso-27001-foundation", "PECB - ISO/IEC 27001 Foundation - Certification Training", "Cybersecurity Management"),
  generateMockCourse("iso-27001-lead-implementer", "PECB - ISO/IEC 27001 Lead Implementer", "Cybersecurity Management"),
  generateMockCourse("cism", "ISACA - CISM - Certified Information Security Manager - Certification Training", "Cybersecurity Management"),
  generateMockCourse("cissp", "ISC2 - CISSP - Certified Information Systems Security Professional - Certification Training", "Cybersecurity Management"),
  
  // Governance, Risk and Compliance
  generateMockCourse("cobit-2019-foundation", "ISACA COBIT 2019 Foundation", "Governance, Risk and Compliance"),
  generateMockCourse("cobit-2019-design", "ISACA COBIT 2019 Design & Implementation Certification Training", "Governance, Risk and Compliance"),
  generateMockCourse("crisc", "ISACA - Certified Risk and Information Systems Control (CRISC) - Certification Training", "Governance, Risk and Compliance"),
  generateMockCourse("cgrc", "ISC2 CGRC - Certified in Governance, Risk, and Compliance - Certification Training", "Governance, Risk and Compliance"),
  generateMockCourse("iso-20000", "PECB - ISO/IEC 20000 (ITSM) Lead Implementer - Certification Training", "Governance, Risk and Compliance"),
  generateMockCourse("cgeit", "ISACA - CGEIT - Certified in the Governance of Enterprise IT - Certification Training", "Governance, Risk and Compliance"),

  // Data Privacy
  generateMockCourse("cdpse", "ISACA - CDPSE - Certified Data Privacy Solutions Engineer - Certification Training", "Data Privacy"),
  generateMockCourse("cipp-e", "IAPP - CIPP/E - Certified Information Privacy Professional/Europe - Certification Training", "Data Privacy"),
  generateMockCourse("cipt", "IAPP - CIPT - Certified Information Privacy Technologist - Certification Training", "Data Privacy"),
  generateMockCourse("cipm", "IAPP - CIPM - Certified Information Privacy Manager - Certification Training", "Data Privacy"),

  // Cloud Security
  generateMockCourse("ccsk", "CSA - CCSK - Certificate of Cloud Security Knowledge - Certification Training", "Cloud Security"),
  generateMockCourse("ccsp", "ISC2 - CCSP – Certified Cloud Security Professional - Certification Training", "Cloud Security"),

  // IT and Information Security Audit
  generateMockCourse("cisa", "ISACA - Certified Information Systems Auditor (CISA) - Certification Training", "IT and Information Security Audit"),
  generateMockCourse("ccak", "ISACA/CSA - Certificate of Cloud Auditing Knowledge - CCAK - Certification Training", "IT and Information Security Audit"),
  generateMockCourse("iso-27001-lead-auditor", "PECB - ISO/IEC 27001 Lead Auditor - Certification Training", "IT and Information Security Audit"),

  // Security Operations
  generateMockCourse("ccoa", "ISACA - CCOA - Certified Cybersecurity Operations Analyst - Certification Training", "Security Operations"),
  generateMockCourse("cnd", "EC-Council – C|ND - Certified Network Defender - Certification Training", "Security Operations"),
  generateMockCourse("cih", "E|CIH - EC-Council Certified Incident Handler - Certification Training", "Security Operations"),

  // Digital Forensics
  generateMockCourse("chfi", "C|HFI - Computer Hacking Forensic Investigator - Certification Training", "Digital Forensics"),

  // Network Security
  generateMockCourse("comptia-network-plus", "CompTIA Network+ - Certification Training", "Network Security"),
  generateMockCourse("ccna", "Cisco - CCNA - Cisco Certified Network Associate (CCNA 200-301) - Certification Training", "Network Security"),
  generateMockCourse("ccnp-encor", "Cisco - CCNP ENCOR 350-401 - Implementing and Operating Cisco Enterprise Network Core Technologies", "Network Security"),
  generateMockCourse("ccnp-enarsi", "Cisco - CCNP ENARSI 300-410 - Implementing Cisco Enterprise Advanced Routing and Services", "Network Security"),

  // Identity and Access Management
  generateMockCourse("sailpoint-iiq", "SailPoint IdentityIQ (IIQ) Exam Prep Training (v8.4)", "Identity and Access Management"),
  generateMockCourse("cyberark-implementation", "Cyberark Implementation Training", "Identity and Access Management"),

  // Offensive Security
  generateMockCourse("ceh", "C|EH - Certified Ethical Hacker - Certification Training", "Offensive Security"),
  generateMockCourse("comptia-pentest-plus", "CompTIAPenTest+ (PT0-002) - Certification Training", "Offensive Security"),
  generateMockCourse("cpent", "CPENT - Certified Penetration Testing Professional - Certification Training", "Offensive Security"),

  // Security Architecture
  generateMockCourse("issap", "ISC2 - ISSAP - Information Systems Security Architecture Professional - Certification Training", "Security Architecture"),
  generateMockCourse("cczt", "CSA - Certificate of Competence in Zero Trust (CCZT) - Certification Training", "Security Architecture"),
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  if (category === "All") return courses;
  return courses.filter((c) => c.category === category);
}
