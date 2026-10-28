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
  duration?: string;
  format?: string;
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
  vendor?: string;
  title: string;
  subtitle: string;
  highlights: string[];
  duration: string;
  mode: string;
  weeklyHours: string;
  certificate: string;
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

export function mapDbCourseToFrontend(dbCourse: any): Course {
  // Ratings and student counts are not real figures yet, so they never leave the server
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { rating, students, ...course } = dbCourse;
  return {
    ...course,
    subtitle: dbCourse.subtitle || "",
    duration: dbCourse.duration || "Flexible",
    mode: dbCourse.mode || "Online",
    weeklyHours: dbCourse.weeklyHours || "10-15 hrs",
    certificate: dbCourse.certificate || "Upon Completion",
    vendor: dbCourse.vendor || undefined,
    directorQuote: {
      text: dbCourse.directorQuoteText || "",
      author: dbCourse.directorQuoteAuthor || "",
    },
    programHighlights: dbCourse.programHighlights || [],
    objectives: dbCourse.objectives || [],
    targetAudience: dbCourse.targetAudience || [],
    examDetails: dbCourse.examDetails || [],
    toolsCovered: dbCourse.toolsCovered || [],
    curriculum: (dbCourse.curriculum || []).map((c: any) => ({
      ...c,
      modules: c.modules || 0,
      subtopics: c.subtopics.map((title: string) => ({ title })),
    })),
  };
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

// Static fallback used when the database is unreachable. It carries only the
// catalog facts; sections without real content are hidden on the course page.
const generateMockCourse = (slug: string, title: string, category: string): Course => ({
  slug,
  category,
  title,
  subtitle: "Instructor-led preparation for the official certification exam.",
  highlights: [],
  duration: "Flexible",
  mode: "Online / Hybrid",
  weeklyHours: "10-15 hrs",
  certificate: "Upon Completion",
  programHighlights: [],
  aboutCourse: [],
  directorQuote: { text: "", author: "" },
  objectives: [],
  curriculum: [],
  targetAudience: [],
  examDetails: [],
  toolsCovered: [],
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
  generateMockCourse("iso-iec-20000", "PECB - ISO/IEC 20000 (ITSM) Lead Implementer - Certification Training", "Governance, Risk and Compliance"),
  generateMockCourse("cgeit", "ISACA - CGEIT - Certified in the Governance of Enterprise IT - Certification Training", "Governance, Risk and Compliance"),

  // Data Privacy
  generateMockCourse("cdpse", "ISACA - CDPSE - Certified Data Privacy Solutions Engineer - Certification Training", "Data Privacy"),
  generateMockCourse("cipp-e", "IAPP - CIPP/E - Certified Information Privacy Professional/Europe - Certification Training", "Data Privacy"),
  generateMockCourse("cipt", "IAPP - CIPT - Certified Information Privacy Technologist - Certification Training", "Data Privacy"),
  generateMockCourse("cipm", "IAPP - CIPM - Certified Information Privacy Manager - Certification Training", "Data Privacy"),

  // Cloud Security
  generateMockCourse("csa-ccsk", "CSA - CCSK - Certificate of Cloud Security Knowledge - Certification Training", "Cloud Security"),
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
