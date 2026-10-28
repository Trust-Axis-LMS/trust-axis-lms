/**
 * Corrects the course catalog and resource bylines flagged in the
 * 28 Sep 2026 site review (Trust_Axis_Site_Map.pdf).
 *
 *  - Real exam names, vendors and official exam facts for every course
 *  - Removes the seeded filler (generic objectives, audiences, tools, quotes)
 *  - Moves curriculum modules the PDF parser attached to the wrong course
 *  - Deletes the four "courses" that were CCNA/CCNP syllabus topics
 *    (APIC, REST, EAP, SD) and adds CDPSE and ISO/IEC 27001 Lead Implementer
 *  - Replaces placeholder blog/article authors
 *
 * Dry run (default, rolls back):  node scripts/fix-course-catalog.mjs
 * Apply:                          node scripts/fix-course-catalog.mjs --apply
 *
 * Needs DATABASE_URL in the environment (e.g. `set -a; source .env; set +a`).
 */
import pg from "pg";
import { randomUUID } from "crypto";
const { Client } = pg;

const APPLY = process.argv.includes("--apply");
const client = new Client({ connectionString: process.env.DATABASE_URL });
const newId = () => `c${randomUUID().replace(/-/g, "").slice(0, 24)}`;

// ─── Exam facts (from the issuing bodies' published exam information) ────────
const ISC2_SCORE = "700 / 1000";
const ISACA_SCORE = "450 / 800";
const EC_SCORE = "60%–85% (varies by exam form)";
const PECB_LEAD = { duration: "3 hours", format: "Open-book exam", passScore: "70%" };
const CISCO_SCORE = "Not published by Cisco";

const exam = (name, provider, duration, format, passScore) => ({ name, provider, duration, format, passScore });

// ─── Course corrections, keyed by slug ───────────────────────────────────────
const COURSES = {
  cc: {
    title: "ISC2 Certified in Cybersecurity (CC)", vendor: "ISC2", category: "Cybersecurity Management",
    subtitle: "Entry-level certification covering the foundations of security principles, operations and networks.",
    about: "Certified in Cybersecurity (CC) is ISC2's entry-level credential for people starting a career in cybersecurity. This program covers all five domains of the official exam outline: security principles; business continuity, disaster recovery and incident response; access control concepts; network security; and security operations.",
    exam: exam("ISC2 CC exam", "ISC2", "2 hours", "100 multiple-choice items", ISC2_SCORE),
  },
  sscp: {
    title: "ISC2 SSCP – Systems Security Certified Practitioner", vendor: "ISC2", category: "Cybersecurity Management",
    subtitle: "Hands-on security administration for practitioners who implement and monitor IT infrastructure.",
    about: "The SSCP validates the technical skills to implement, monitor and administer IT infrastructure using security best practices. The program follows the seven domains of the ISC2 SSCP exam outline, from security operations and access controls to cryptography and network security.",
    exam: exam("ISC2 SSCP exam", "ISC2", "2 hours", "Computerized adaptive testing, 100–125 items", ISC2_SCORE),
  },
  cissp: {
    title: "ISC2 CISSP – Certified Information Systems Security Professional", vendor: "ISC2", category: "Cybersecurity Management",
    subtitle: "The benchmark certification for experienced security leaders, architects and managers.",
    about: "CISSP demonstrates the knowledge to design, implement and manage a best-in-class cybersecurity program. The program covers all eight domains of the ISC2 CISSP Common Body of Knowledge, from security and risk management to software development security.",
    exam: exam("ISC2 CISSP exam", "ISC2", "3 hours", "Computerized adaptive testing, 100–150 items", ISC2_SCORE),
  },
  ccsp: {
    title: "ISC2 CCSP – Certified Cloud Security Professional", vendor: "ISC2", category: "Cloud Security",
    subtitle: "Advanced cloud security architecture, design, operations and compliance.",
    about: "CCSP validates the skills to design, manage and secure data, applications and infrastructure in the cloud. The program covers the six domains of the ISC2 CCSP exam outline, including cloud data security, platform and infrastructure security, and legal, risk and compliance.",
    exam: exam("ISC2 CCSP exam", "ISC2", "3 hours", "Computerized adaptive testing, 100–150 items", ISC2_SCORE),
  },
  cgrc: {
    title: "ISC2 CGRC – Certified in Governance, Risk and Compliance", vendor: "ISC2", category: "Governance, Risk and Compliance",
    subtitle: "Authorize and maintain information systems using risk management frameworks such as NIST RMF.",
    about: "CGRC (formerly CAP) validates the ability to authorize and maintain information systems within risk management frameworks. The program follows the seven domains of the ISC2 CGRC exam outline, from governance and system scoping to control assessment and compliance maintenance.",
    exam: exam("ISC2 CGRC exam", "ISC2", "3 hours", "125 multiple-choice items", ISC2_SCORE),
  },
  cism: {
    title: "ISACA CISM – Certified Information Security Manager", vendor: "ISACA", category: "Cybersecurity Management",
    subtitle: "Security management certification for those who design, build and manage enterprise security programs.",
    about: "CISM is ISACA's management-focused security certification. The program covers the four CISM job practice domains: information security governance, information security risk management, information security program, and incident management.",
    exam: exam("ISACA CISM exam", "ISACA", "4 hours", "150 multiple-choice questions", ISACA_SCORE),
  },
  cisa: {
    title: "ISACA CISA – Certified Information Systems Auditor", vendor: "ISACA", category: "IT and Information Security Audit",
    subtitle: "The global standard for IS audit, control and assurance professionals.",
    about: "CISA is the globally recognised certification for information systems audit, control and assurance. The program covers the five CISA job practice domains, from the IS audit process and IT governance to protection of information assets.",
    exam: exam("ISACA CISA exam", "ISACA", "4 hours", "150 multiple-choice questions", ISACA_SCORE),
  },
  crisc: {
    title: "ISACA CRISC – Certified in Risk and Information Systems Control", vendor: "ISACA", category: "Governance, Risk and Compliance",
    subtitle: "Enterprise IT risk identification, assessment, response and control.",
    about: "CRISC validates the ability to identify and manage enterprise IT risk and implement and maintain information systems controls. The program covers the four CRISC domains: governance, IT risk assessment, risk response and reporting, and information technology and security.",
    exam: exam("ISACA CRISC exam", "ISACA", "4 hours", "150 multiple-choice questions", ISACA_SCORE),
  },
  cgeit: {
    title: "ISACA CGEIT – Certified in the Governance of Enterprise IT", vendor: "ISACA", category: "Governance, Risk and Compliance",
    subtitle: "Governance of enterprise IT for senior IT and business leaders.",
    about: "CGEIT recognises the knowledge and application of enterprise IT governance principles and practices. The program covers the CGEIT domains: governance framework, strategic management, benefits realization, risk optimization and resource optimization.",
    exam: exam("ISACA CGEIT exam", "ISACA", "4 hours", "150 multiple-choice questions", ISACA_SCORE),
  },
  iapp: {
    title: "IAPP CIPP/E – Certified Information Privacy Professional/Europe", vendor: "IAPP", category: "Data Privacy",
    subtitle: "European data protection law, including the GDPR, for privacy and compliance professionals.",
    about: "CIPP/E is the IAPP's certification for European data protection law and practice. The program covers the history and institutions of European data protection, the GDPR's principles and obligations, international data transfers, and compliance and enforcement.",
    exam: exam("IAPP CIPP/E exam", "IAPP", "2.5 hours", "90 multiple-choice questions", "300 / 500"),
  },
  "csa-ccsk": {
    title: "CSA CCSK – Certificate of Cloud Security Knowledge (v5)", vendor: "Cloud Security Alliance", category: "Cloud Security",
    subtitle: "Vendor-neutral foundations of cloud security, aligned to the CSA Security Guidance v5.",
    about: "The CCSK is the Cloud Security Alliance's vendor-neutral certificate of cloud security knowledge. The program follows the twelve domains of the CSA Security Guidance v5, from cloud governance and identity to workload, data and application security.",
    exam: exam("CCSK v5 exam", "Cloud Security Alliance", "2 hours", "60 multiple-choice questions, online and open-book", "80%"),
  },
  ceh: {
    title: "EC-Council C|EH – Certified Ethical Hacker", vendor: "EC-Council", category: "Offensive Security",
    subtitle: "Ethical hacking methodology across reconnaissance, system hacking, web, cloud and IoT.",
    about: "C|EH teaches the tools and techniques attackers use, so defenders can find weaknesses first. The program covers all twenty C|EH modules, from footprinting and scanning to web application, wireless, mobile, IoT/OT and cloud hacking.",
    exam: exam("C|EH exam (312-50)", "EC-Council", "4 hours", "125 multiple-choice questions", EC_SCORE),
  },
  cpent: {
    title: "EC-Council CPENT – Certified Penetration Testing Professional", vendor: "EC-Council", category: "Offensive Security",
    subtitle: "Advanced, hands-on penetration testing across networks, web, IoT, OT/SCADA and cloud.",
    about: "CPENT is EC-Council's advanced, performance-based penetration testing certification. The program covers the fourteen CPENT modules, including network, web application, wireless, IoT, OT/SCADA and cloud penetration testing, binary exploitation and report writing.",
    exam: exam("CPENT practical exam", "EC-Council", "24 hours (or two 12-hour sessions)", "Hands-on practical exam in a live range", "70% (90% for LPT Master)"),
  },
  cnd: {
    title: "EC-Council C|ND – Certified Network Defender", vendor: "EC-Council", category: "Network Security",
    subtitle: "Protect, detect, respond and predict: a defence-in-depth approach to network security.",
    about: "C|ND trains network administrators and defenders to protect, detect, respond to and predict threats on the network. The program covers the C|ND modules from network attacks and defence strategies through endpoint, cloud and wireless security to incident response and threat intelligence.",
    exam: exam("C|ND exam (312-38)", "EC-Council", "4 hours", "100 multiple-choice questions", EC_SCORE),
  },
  cih: {
    title: "EC-Council E|CIH – Certified Incident Handler", vendor: "EC-Council", category: "Security Operations",
    subtitle: "Structured incident handling and response across malware, email, network, web, cloud and insider incidents.",
    about: "E|CIH teaches a structured approach to handling and responding to security incidents. The program covers the incident handling and response process, forensic readiness, and responding to malware, email, network, web application, cloud and insider threat incidents.",
    exam: exam("E|CIH exam (212-89)", "EC-Council", "3 hours", "100 multiple-choice questions", "70%"),
  },
  ccna: {
    title: "Cisco CCNA – Cisco Certified Network Associate (200-301)", vendor: "Cisco", category: "Network Security",
    subtitle: "Networking fundamentals, IP connectivity and services, security fundamentals, and automation.",
    about: "CCNA validates the skills to install, operate and troubleshoot small to medium enterprise networks. The program covers network fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation and programmability, including controller-based networking and REST APIs.",
    exam: exam("Cisco CCNA exam (200-301)", "Cisco", "2 hours", "Multiple choice, drag-and-drop and simulations", CISCO_SCORE),
  },
  "ccnp-encor": {
    title: "Cisco CCNP ENCOR – Enterprise Network Core Technologies (350-401)", vendor: "Cisco", category: "Network Security",
    subtitle: "Core enterprise networking: architecture, virtualization, infrastructure, assurance, security and automation.",
    about: "ENCOR is the core exam for the CCNP Enterprise and CCIE Enterprise tracks. The program covers enterprise network architecture, software-defined networking, virtualization, routing, wireless, network assurance, security and automation.",
    exam: exam("Cisco ENCOR exam (350-401)", "Cisco", "2 hours", "Multiple choice, drag-and-drop and simulations", CISCO_SCORE),
  },
  "itil-4-foundation": {
    title: "PeopleCert ITIL 4 Foundation", vendor: "PeopleCert", category: "IT Service Management",
    subtitle: "Key concepts of the ITIL 4 service value system for modern IT service management.",
    about: "ITIL 4 Foundation introduces the ITIL 4 framework for managing IT-enabled services. It covers the key concepts of service management, the guiding principles, the four dimensions, the service value system and value chain, and the core ITIL practices.",
    exam: exam("ITIL 4 Foundation exam", "PeopleCert", "60 minutes", "40 multiple-choice questions", "65% (26 of 40)"),
  },
  "iso-iec-20000": {
    title: "PECB ISO/IEC 20000 Lead Implementer", vendor: "PECB", category: "IT Service Management",
    subtitle: "Plan, implement and maintain a service management system based on ISO/IEC 20000-1.",
    about: "This PECB program builds the competence to implement and manage a service management system (SMS) based on ISO/IEC 20000-1. It covers SMS fundamentals, planning, service design and transition, operational processes, performance evaluation, continual improvement and certification preparation.",
    exam: exam("PECB ISO/IEC 20000 Lead Implementer exam", "PECB", PECB_LEAD.duration, PECB_LEAD.format, PECB_LEAD.passScore),
  },
  "iso-iec-27035": {
    title: "PECB ISO/IEC 27035 Lead Incident Manager", vendor: "PECB", category: "Security Operations",
    subtitle: "Establish and manage an information security incident management process based on ISO/IEC 27035.",
    about: "This PECB program builds the competence to plan, establish and lead an information security incident management process based on the ISO/IEC 27035 series, from incident management policy and team readiness to detection, response and lessons learned.",
    exam: exam("PECB ISO/IEC 27035 Lead Incident Manager exam", "PECB", PECB_LEAD.duration, PECB_LEAD.format, PECB_LEAD.passScore),
  },
};

// ─── Courses that were missing from the catalog ──────────────────────────────
const NEW_COURSES = [
  {
    slug: "cdpse",
    title: "ISACA CDPSE – Certified Data Privacy Solutions Engineer", vendor: "ISACA", category: "Data Privacy",
    subtitle: "Implement privacy by design across governance, architecture and the data lifecycle.",
    about: "CDPSE validates the technical skills to build privacy into technology platforms, products and processes. The program covers privacy governance, privacy architecture and the data lifecycle.",
    exam: exam("ISACA CDPSE exam", "ISACA", "3.5 hours", "120 multiple-choice questions", ISACA_SCORE),
    curriculum: [
      ["Domain 1: Privacy Governance", [
        "Privacy program requirements", "Privacy protection legal models", "Common privacy laws and regulations", "Privacy standards",
        "Documentation for data privacy management", "Data subjects' rights", "Roles and responsibilities of stakeholders",
        "Privacy awareness programs", "Privacy incident management", "Privacy impact assessment methodologies",
        "NIST privacy risk assessment methodology and the EU GDPR", "Data Protection Impact Assessment (DPIA)",
      ]],
      ["Domain 2: Privacy Architecture", [
        "Computing infrastructure types", "Advantages and limitations of cloud computing", "Shared responsibility model",
        "Secure development life cycle", "Endpoint security considerations", "Privacy by design principles",
        "System and application hardening", "Privacy considerations for APIs and web services", "Risks of communication protocols",
      ]],
      ["Domain 3: Data Lifecycle", [
        "Data inventory and classification", "Data quality process areas", "Data flow diagrams", "Data analytics and privacy",
        "Data minimization", "Data migration and storage", "Data warehousing", "Data retention, archiving and destruction",
      ]],
    ],
  },
  {
    slug: "iso-27001-lead-implementer",
    title: "PECB ISO/IEC 27001 Lead Implementer", vendor: "PECB", category: "Cybersecurity Management",
    subtitle: "Plan, implement, manage and maintain an information security management system based on ISO/IEC 27001:2022.",
    about: "This PECB program builds the competence to support an organisation in establishing, implementing, managing and maintaining an information security management system (ISMS) based on ISO/IEC 27001:2022, through to readiness for certification audit.",
    exam: exam("PECB ISO/IEC 27001 Lead Implementer exam", "PECB", PECB_LEAD.duration, PECB_LEAD.format, PECB_LEAD.passScore),
    curriculum: [
      ["Day 1: Introduction to ISO/IEC 27001 and initiation of an ISMS", [
        "Training course objectives and structure", "Standards and regulatory frameworks", "Information security management system (ISMS)",
        "Fundamental information security concepts and principles", "Initiation of the ISMS implementation",
        "Understanding the organization and its context", "ISMS scope",
      ]],
      ["Day 2: Planning the implementation of an ISMS", [
        "Leadership and project approval", "Organizational structure", "Analysis of the existing system",
        "Information security policy", "Risk management", "Statement of Applicability",
      ]],
      ["Day 3: Implementation of an ISMS", [
        "Documented information management", "Selection and design of controls", "Implementation of controls",
        "Trends and technologies", "Communication", "Competence and awareness", "Security operations management",
      ]],
      ["Day 4: ISMS monitoring, continual improvement and certification readiness", [
        "Monitoring, measurement, analysis and evaluation", "Internal audit", "Management review",
        "Treatment of nonconformities", "Continual improvement", "Preparing for the certification audit",
      ]],
      ["Day 5: Practical implementation and exam preparation", [
        "Practical approach to ISMS implementation", "ISO/IEC 27001:2022 controls-to-evidence mapping", "Preparation for exam and interview",
      ]],
    ],
  },
];

// "Courses" that were CCNA / CCNP syllabus bullets picked up by the PDF parser
const PHANTOM_COURSES = ["apic", "rest", "enterprise-architecture-practitioner", "software-development-security"];

const PLACEHOLDER_AUTHORS = ["Jane Doe", "John Smith", "Alice Johnson", "Bob Williams"];
const EDITORIAL_AUTHOR = "Trust Axis Editorial Team";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const log = (...args) => console.log(" ", ...args);

async function courseId(slug) {
  const { rows } = await client.query("SELECT id FROM courses WHERE slug = $1", [slug]);
  return rows[0]?.id ?? null;
}

const leadingNumber = (title) => Number(title.match(/(?:Chapter|Module|Domain)\s*0*(\d+)/i)?.[1] ?? 0);
const squash = (title) => title.replace(/\s+/g, "").toLowerCase();

/** Moves curriculum rows matching `where` from one course to another. */
async function moveModules(fromSlug, toSlug, where, params = []) {
  const from = await courseId(fromSlug);
  const to = await courseId(toSlug);
  if (!from || !to) return log(`skip move ${fromSlug} → ${toSlug} (course missing)`);
  const { rowCount } = await client.query(
    `UPDATE course_curriculum_modules SET course_id = $2 WHERE course_id = $1 AND ${where}`,
    [from, to, ...params]
  );
  log(`moved ${rowCount} module(s) ${fromSlug} → ${toSlug}`);
}

/** Drops duplicate modules (same title ignoring spaces), then renumbers by the number in the title. */
async function tidyCurriculum(slug) {
  const id = await courseId(slug);
  if (!id) return;
  const { rows } = await client.query(
    "SELECT id, title, number, coalesce(array_length(subtopics, 1), 0) AS n FROM course_curriculum_modules WHERE course_id = $1",
    [id]
  );
  const keep = new Map();
  for (const row of rows) {
    const key = squash(row.title);
    const current = keep.get(key);
    if (!current || row.n > current.n) keep.set(key, row);
  }
  const drop = rows.filter((r) => keep.get(squash(r.title)) !== r).map((r) => r.id);
  if (drop.length) {
    await client.query("DELETE FROM course_curriculum_modules WHERE id = ANY($1)", [drop]);
    log(`${slug}: removed ${drop.length} duplicate module(s)`);
  }
  const ordered = [...keep.values()].sort((a, b) => (leadingNumber(a.title) || a.number) - (leadingNumber(b.title) || b.number));
  for (const [i, row] of ordered.entries()) {
    await client.query("UPDATE course_curriculum_modules SET number = $2 WHERE id = $1", [row.id, i + 1]);
  }
}

async function replaceExam(id, e) {
  await client.query("DELETE FROM course_exam_details WHERE course_id = $1", [id]);
  await client.query(
    `INSERT INTO course_exam_details (id, course_id, name, provider, duration, format, "passScore", prep_included)
     VALUES ($1, $2, $3, $4, $5, $6, $7, true)`,
    [newId(), id, e.name, e.provider, e.duration, e.format, e.passScore]
  );
}

function highlightsFor(c) {
  return [
    `Aligned to the official ${c.exam.provider} exam outline.`,
    `Exam: ${c.exam.format}, ${c.exam.duration}.`,
    "Instructor-led sessions with practice questions and exam guidance.",
  ];
}

// ─── Steps ───────────────────────────────────────────────────────────────────
async function fixCurricula() {
  console.log("\nCurriculum fixes");
  // CCNA chapters 29–48 were attached to the phantom courses
  for (const slug of ["enterprise-architecture-practitioner", "apic", "rest"]) {
    await moveModules(slug, "ccna", "title ILIKE 'Chapter%'");
  }
  // ENCOR modules sat under "REST" and "SD"; ENARSI modules follow them and are dropped with "SD"
  await moveModules("rest", "ccnp-encor", "title ILIKE 'Module%'");
  const sd = await courseId("software-development-security");
  if (sd) {
    const { rows } = await client.query(
      "SELECT number FROM course_curriculum_modules WHERE course_id = $1 AND title ILIKE 'Module 1:%Advanced Enterprise Routing%'",
      [sd]
    );
    const enarsiStart = rows[0]?.number ?? Number.MAX_SAFE_INTEGER;
    await moveModules("software-development-security", "ccnp-encor", "number < $3", [enarsiStart]);
  }
  // ISO/IEC 20000 modules 1–2 were attached to CGRC
  await moveModules("cgrc", "iso-iec-20000", "title ILIKE 'Module%'");

  // CIPP/E: keep only the European data protection domains
  const iapp = await courseId("iapp");
  if (iapp) {
    const { rowCount } = await client.query(
      "DELETE FROM course_curriculum_modules WHERE course_id = $1 AND title NOT ILIKE '%European%'",
      [iapp]
    );
    log(`iapp: removed ${rowCount} module(s) from other courses`);
  }
  // These held COBIT 2019 content; there is no source outline for the real courses yet
  for (const slug of ["iso-iec-27035", "itil-4-foundation"]) {
    const id = await courseId(slug);
    if (!id) continue;
    const { rowCount } = await client.query("DELETE FROM course_curriculum_modules WHERE course_id = $1", [id]);
    log(`${slug}: removed ${rowCount} COBIT module(s)`);
  }

  for (const slug of ["ccna", "ccnp-encor", "iso-iec-20000", "iapp", "cgeit", "cpent", "cgrc"]) {
    await tidyCurriculum(slug);
  }
}

async function deletePhantoms() {
  console.log("\nRemoving phantom courses");
  const { rows } = await client.query("DELETE FROM courses WHERE slug = ANY($1) RETURNING slug", [PHANTOM_COURSES]);
  log(`deleted: ${rows.map((r) => r.slug).join(", ") || "none"}`);
}

async function fixCourses() {
  console.log("\nCourse details");
  for (const [slug, c] of Object.entries(COURSES)) {
    const id = await courseId(slug);
    if (!id) { log(`skip ${slug} (not in database)`); continue; }
    await client.query(
      `UPDATE courses SET title = $2, vendor = $3, category = $4, subtitle = $5, highlights = $6, about_course = $7,
         director_quote_text = NULL, director_quote_author = NULL, updated_at = now()
       WHERE id = $1`,
      [id, c.title, c.vendor, c.category, c.subtitle, highlightsFor(c), [c.about]]
    );
    await replaceExam(id, c.exam);
    // Seeded filler that was identical across every course
    for (const table of ["course_objectives", "course_target_audience", "course_tools", "course_program_highlights"]) {
      await client.query(`DELETE FROM ${table} WHERE course_id = $1`, [id]);
    }
    log(`updated ${slug}: ${c.title}`);
  }
}

async function addCourses() {
  console.log("\nAdding missing catalog courses");
  for (const c of NEW_COURSES) {
    if (await courseId(c.slug)) { log(`skip ${c.slug} (already exists)`); continue; }
    const id = newId();
    await client.query(
      `INSERT INTO courses (id, slug, category, vendor, title, subtitle, highlights, duration, mode, weekly_hours, certificate,
         about_course, rating, students, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Flexible', 'Online / Hybrid', '10-15 hrs', 'Upon Completion', $8, NULL, NULL, now(), now())`,
      [id, c.slug, c.category, c.vendor, c.title, c.subtitle, highlightsFor(c), [c.about]]
    );
    await replaceExam(id, c.exam);
    for (const [i, [title, subtopics]] of c.curriculum.entries()) {
      await client.query(
        "INSERT INTO course_curriculum_modules (id, course_id, number, title, subtopics) VALUES ($1, $2, $3, $4, $5)",
        [newId(), id, i + 1, title, subtopics]
      );
    }
    log(`added ${c.slug}: ${c.title}`);
  }
}

async function fixAuthors() {
  console.log("\nResource bylines");
  const { rows } = await client.query(
    "UPDATE content_posts SET author = $2, updated_at = now() WHERE author = ANY($1) RETURNING slug",
    [PLACEHOLDER_AUTHORS, EDITORIAL_AUTHOR]
  );
  log(`replaced placeholder author on: ${rows.map((r) => r.slug).join(", ") || "none"}`);
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  await client.connect();
  console.log(APPLY ? "Applying catalog fixes…" : "Dry run — changes will be rolled back. Pass --apply to commit.");
  await client.query("BEGIN");
  try {
    await fixCurricula();
    await deletePhantoms();
    await fixCourses();
    await addCourses();
    await fixAuthors();

    const { rows } = await client.query("SELECT count(*)::int AS n FROM courses");
    console.log(`\nCatalog now has ${rows[0].n} courses.`);
    await client.query(APPLY ? "COMMIT" : "ROLLBACK");
    console.log(APPLY ? "Committed." : "Rolled back (dry run).");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
