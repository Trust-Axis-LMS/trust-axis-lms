export interface CourseItem {
  title: string;
  slug: string;
}

export interface SubCategory {
  id: string;
  label: string;
  courses: CourseItem[];
}

export interface MainCategory {
  id: string;
  label: string;
  subcategories?: SubCategory[];
  allCourses?: CourseItem[];
}

const abbreviationMap: Record<string, string> = {
  "isc2": "ISC2: International Information System Security Certification Consortium",
  "isaca": "ISACA: Information Systems Audit and Control Association",
  "ec-council": "EC-Council: International Council of E-Commerce Consultants",
  "aws": "AWS: Amazon Web Services",
  "gcp": "GCP: Google Cloud Platform",
  "comptia": "CompTIA: Computing Technology Industry Association",
  "ceh": "CEH: Certified Ethical Hacker",
  "cism": "CISM: Certified Information Security Manager",
  "cisa": "CISA: Certified Information Systems Auditor",
  "cissp": "CISSP: Certified Information Systems Security Professional",
  "ai": "AI: Artificial Intelligence",
  "ml": "ML: Machine Learning",
  "iot": "IoT: Internet of Things",
  "it": "IT: Information Technology"
};

export function formatLabel(label: string): string {
  const key = label.toLowerCase();
  return abbreviationMap[key] || label;
}

export function getVendor(name: string): string {
  const n = name.toUpperCase();
  if (n.includes('CEH') || n.includes('CND') || n.includes('CPENT') || n.includes('CIH') || n.includes('CHFI')) return 'EC-Council';
  if (n.includes('CISSP') || n.includes('CCSP') || n.includes('SSCP') || n === 'CC' || n.includes('CGRC') || n.includes('ISSAP')) return 'ISC2';
  if (n.includes('CISA') || n.includes('CISM') || n.includes('CRISC') || n.includes('CGEIT') || n.includes('CDPSE') || n.includes('COBIT') || n.includes('CCOA')) return 'ISACA';
  if (n.includes('IAPP') || n.includes('CIPP') || n.includes('CIPT') || n.includes('CIPM')) return 'IAPP';
  if (n.includes('COMPTIA') || n.includes('NETWORK+') || n.includes('PENTEST+')) return 'CompTIA';
  if (n.includes('CCNA') || n.includes('CCNP') || n.includes('CISCO') || n.includes('APIC')) return 'Cisco';
  if (n.includes('CSA') || n.includes('CCZT')) return 'CSA';
  if (n.includes('SAILPOINT')) return 'SailPoint';
  if (n.includes('CYBERARK')) return 'CyberArk';
  if (n.includes('PECB') || n.includes('ISO')) return 'PECB';
  if (n.includes('ITIL')) return 'AXELOS';
  return 'Global Providers';
}

export const FALLBACK_COURSES: { slug: string; title: string; category: string; vendor: string }[] = [
  // Cybersecurity Management
  { slug: "cc", title: "ISC2 - Certified in Cybersecurity (CC) - Certification Training", category: "Cybersecurity Management", vendor: "ISC2" },
  { slug: "sscp", title: "ISC2 - SSCP - Systems Security Certified Practitioner", category: "Cybersecurity Management", vendor: "ISC2" },
  { slug: "iso-27001-foundation", title: "PECB - ISO/IEC 27001 Foundation - Certification Training", category: "Cybersecurity Management", vendor: "PECB" },
  { slug: "iso-27001-lead-implementer", title: "PECB - ISO/IEC 27001 Lead Implementer", category: "Cybersecurity Management", vendor: "PECB" },
  { slug: "cism", title: "ISACA - CISM - Certified Information Security Manager - Certification Training", category: "Cybersecurity Management", vendor: "ISACA" },
  { slug: "cissp", title: "ISC2 - CISSP - Certified Information Systems Security Professional - Certification Training", category: "Cybersecurity Management", vendor: "ISC2" },

  // Governance, Risk and Compliance
  { slug: "cobit-2019-foundation", title: "ISACA COBIT 2019 Foundation", category: "Governance, Risk and Compliance", vendor: "ISACA" },
  { slug: "cobit-2019-design", title: "ISACA COBIT 2019 Design & Implementation Certification Training", category: "Governance, Risk and Compliance", vendor: "ISACA" },
  { slug: "crisc", title: "ISACA - Certified Risk and Information Systems Control (CRISC) - Certification Training", category: "Governance, Risk and Compliance", vendor: "ISACA" },
  { slug: "cgrc", title: "ISC2 CGRC - Certified in Governance, Risk, and Compliance - Certification Training", category: "Governance, Risk and Compliance", vendor: "ISC2" },
  { slug: "iso-20000", title: "PECB - ISO/IEC 20000 (ITSM) Lead Implementer - Certification Training", category: "Governance, Risk and Compliance", vendor: "PECB" },
  { slug: "cgeit", title: "ISACA - CGEIT - Certified in the Governance of Enterprise IT - Certification Training", category: "Governance, Risk and Compliance", vendor: "ISACA" },

  // Data Privacy
  { slug: "cdpse", title: "ISACA - CDPSE - Certified Data Privacy Solutions Engineer - Certification Training", category: "Data Privacy", vendor: "ISACA" },
  { slug: "cipp-e", title: "IAPP - CIPP/E - Certified Information Privacy Professional/Europe - Certification Training", category: "Data Privacy", vendor: "IAPP" },
  { slug: "cipt", title: "IAPP - CIPT - Certified Information Privacy Technologist - Certification Training", category: "Data Privacy", vendor: "IAPP" },
  { slug: "cipm", title: "IAPP - CIPM - Certified Information Privacy Manager - Certification Training", category: "Data Privacy", vendor: "IAPP" },

  // Cloud Security
  { slug: "ccsk", title: "CSA - CCSK - Certificate of Cloud Security Knowledge - Certification Training", category: "Cloud Security", vendor: "CSA" },
  { slug: "ccsp", title: "ISC2 - CCSP – Certified Cloud Security Professional - Certification Training", category: "Cloud Security", vendor: "ISC2" },

  // IT and Information Security Audit
  { slug: "cisa", title: "ISACA - Certified Information Systems Auditor (CISA) - Certification Training", category: "IT and Information Security Audit", vendor: "ISACA" },
  { slug: "ccak", title: "ISACA/CSA - Certificate of Cloud Auditing Knowledge - CCAK - Certification Training", category: "IT and Information Security Audit", vendor: "ISACA" },
  { slug: "iso-27001-lead-auditor", title: "PECB - ISO/IEC 27001 Lead Auditor - Certification Training", category: "IT and Information Security Audit", vendor: "PECB" },

  // Security Operations
  { slug: "ccoa", title: "ISACA - CCOA - Certified Cybersecurity Operations Analyst - Certification Training", category: "Security Operations", vendor: "ISACA" },
  { slug: "cnd", title: "EC-Council – C|ND - Certified Network Defender - Certification Training", category: "Security Operations", vendor: "EC-Council" },
  { slug: "cih", title: "E|CIH - EC-Council Certified Incident Handler - Certification Training", category: "Security Operations", vendor: "EC-Council" },

  // Digital Forensics
  { slug: "chfi", title: "C|HFI - Computer Hacking Forensic Investigator - Certification Training", category: "Digital Forensics", vendor: "EC-Council" },

  // Network Security
  { slug: "comptia-network-plus", title: "CompTIA Network+ - Certification Training", category: "Network Security", vendor: "CompTIA" },
  { slug: "ccna", title: "Cisco - CCNA - Cisco Certified Network Associate (CCNA 200-301) - Certification Training", category: "Network Security", vendor: "Cisco" },
  { slug: "ccnp-encor", title: "Cisco - CCNP ENCOR 350-401 - Implementing and Operating Cisco Enterprise Network Core Technologies", category: "Network Security", vendor: "Cisco" },
  { slug: "ccnp-enarsi", title: "Cisco - CCNP ENARSI 300-410 - Implementing Cisco Enterprise Advanced Routing and Services", category: "Network Security", vendor: "Cisco" },

  // Identity and Access Management
  { slug: "sailpoint-iiq", title: "SailPoint IdentityIQ (IIQ) Exam Prep Training (v8.4)", category: "Identity and Access Management", vendor: "SailPoint" },
  { slug: "cyberark-implementation", title: "Cyberark Implementation Training", category: "Identity and Access Management", vendor: "CyberArk" },

  // Offensive Security
  { slug: "ceh", title: "C|EH - Certified Ethical Hacker - Certification Training", category: "Offensive Security", vendor: "EC-Council" },
  { slug: "comptia-pentest-plus", title: "CompTIAPenTest+ (PT0-002) - Certification Training", category: "Offensive Security", vendor: "CompTIA" },
  { slug: "cpent", title: "CPENT - Certified Penetration Testing Professional - Certification Training", category: "Offensive Security", vendor: "EC-Council" },

  // Security Architecture
  { slug: "issap", title: "ISC2 - ISSAP - Information Systems Security Architecture Professional - Certification Training", category: "Security Architecture", vendor: "ISC2" },
  { slug: "cczt", title: "CSA - Certificate of Competence in Zero Trust (CCZT) - Certification Training", category: "Security Architecture", vendor: "CSA" },
];

export function buildMegaMenuData(coursesList: { title: string; slug: string; vendor?: string | null; category?: string | null }[]): MainCategory[] {
  const vendorMap: Record<string, CourseItem[]> = {};
  const domainMap: Record<string, CourseItem[]> = {};
  const allCourses: CourseItem[] = [];

  coursesList.forEach((c) => {
    const courseItem: CourseItem = { title: c.title, slug: c.slug };
    allCourses.push(courseItem);

    const vendor = c.vendor || getVendor(c.title);
    if (vendor) {
      if (!vendorMap[vendor]) vendorMap[vendor] = [];
      vendorMap[vendor].push(courseItem);
    }

    const category = c.category;
    if (category) {
      if (!domainMap[category]) domainMap[category] = [];
      domainMap[category].push(courseItem);
    }
  });

  return [
    {
      id: "vendor",
      label: "Courses by Vendor",
      subcategories: Object.entries(vendorMap).map(([vendor, courses]) => ({
        id: vendor.toLowerCase().replace(/\s+/g, "-"),
        label: formatLabel(vendor),
        courses,
      })),
    },
    {
      id: "domain",
      label: "Courses by Domain",
      subcategories: Object.entries(domainMap).map(([domain, courses]) => ({
        id: domain.toLowerCase().replace(/\s+/g, "-"),
        label: formatLabel(domain),
        courses,
      })),
    },
    {
      id: "courses",
      label: "All Courses",
      allCourses,
    },
  ];
}
