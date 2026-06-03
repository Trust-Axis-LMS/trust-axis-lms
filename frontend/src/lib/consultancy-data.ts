// frontend/src/lib/consultancy-data.ts
export interface ConsultancyOffering {
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export interface Consultancy {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  icon: string;       // lucide icon name for the card
  color: string;      // accent hex color
  category: string;   // display badge
  heading?: string;   // optional extended heading for hero
  whyItMatters: string;
  offerings: ConsultancyOffering[];
  keyQuestions?: string[];
  businessOutcomes?: string[];
  outcomeStatement?: string;
  ctaLabel: string;
  content: string;    // legacy markdown (kept for compatibility)
}

export const consultancies: Consultancy[] = [
  // ─── 1. Cybersecurity Advisory ─────────────────────────────────────────────
  {
    id: "1",
    slug: "cybersecurity-advisory",
    title: "Cybersecurity Advisory",
    excerpt:
      "Cybersecurity is a business resilience, trust, compliance, and leadership priority. We help organizations move from reactive security to a structured, risk-led posture.",
    icon: "ShieldCheck",
    color: "#007BFF",
    category: "Cybersecurity",
    heading: "Cybersecurity Advisory That Moves Beyond Checklists",
    whyItMatters:
      "Cybersecurity is no longer only an IT function. It is now a business resilience, trust, compliance, and leadership priority. Organizations are facing a rapidly changing threat landscape where ransomware, identity compromise, cloud misconfiguration, third-party exposure, insider risk, data leakage, and AI-enabled attacks can disrupt operations, damage reputation, and weaken stakeholder confidence.\n\nOur Cybersecurity Advisory services help organizations understand where they are exposed, what needs to be strengthened, and how to build a practical security roadmap aligned with business priorities. We do not believe in generic recommendations or one-size-fits-all security models. Our approach is risk-led, outcome-focused, and designed to help clients make informed decisions on governance, controls, technology, people, and process maturity.\n\nWe support organizations in identifying security gaps, improving cyber governance, strengthening policies, assessing controls, building awareness, and preparing for audits, regulatory reviews, and real-world cyber events.",
    offerings: [
      { icon: "BarChart3", title: "Cybersecurity Maturity Assessments", description: "Evaluate your current security posture against recognized frameworks and identify priority gaps." },
      { icon: "Search", title: "Cyber Risk & Control Reviews", description: "Identify and assess control weaknesses across your security landscape with actionable findings." },
      { icon: "Settings", title: "Security Governance & Operating Model Design", description: "Define roles, responsibilities, and governance structures that align security with business strategy." },
      { icon: "FileText", title: "Security Policy & Standards Review", description: "Review and strengthen policies to ensure they are practical, up to date, and aligned with current risks." },
      { icon: "KeyRound", title: "Identity & Access Control Advisory", description: "Assess access management practices, privilege controls, and identity governance maturity." },
      { icon: "Siren", title: "Incident Response Readiness Review", description: "Evaluate your capability to detect, respond to, and recover from a cyber incident." },
      { icon: "Users", title: "Cybersecurity Awareness Strategy", description: "Design and assess awareness programs that build a security-conscious culture across the organization." },
      { icon: "Presentation", title: "Board & Leadership Cybersecurity Briefings", description: "Clear, non-technical briefings that help leadership understand risk exposure and governance responsibilities." },
      { icon: "Map", title: "Security Roadmap & Remediation Planning", description: "Develop a prioritized, business-aligned action plan to address identified risks and improve security maturity." },
      { icon: "Link", title: "Third-Party & Supplier Cyber Risk Review", description: "Assess the security risk introduced by vendors, suppliers, and third-party service providers." },
    ],
    outcomeStatement: "The goal is simple: help organizations move from reactive cybersecurity to a more structured, measurable, and business-aligned security posture.",
    businessOutcomes: [],
    ctaLabel: "Request a Cybersecurity Advisory Consultation",
    content: `
# Cybersecurity Advisory That Moves Beyond Checklists

## OUR APPROACH

Cybersecurity is no longer only an IT function. It is now a business resilience, trust, compliance, and leadership priority. Organizations are facing a rapidly changing threat landscape where ransomware, identity compromise, cloud misconfiguration, third-party exposure, insider risk, data leakage, and AI-enabled attacks can disrupt operations, damage reputation, and weaken stakeholder confidence.

Our Cybersecurity Advisory services help organizations understand where they are exposed, what needs to be strengthened, and how to build a practical security roadmap aligned with business priorities. We do not believe in generic recommendations or one-size-fits-all security models. Our approach is risk-led, outcome-focused, and designed to help clients make informed decisions on governance, controls, technology, people, and process maturity.

We support organizations in identifying security gaps, improving cyber governance, strengthening policies, assessing controls, building awareness, and preparing for audits, regulatory reviews, and real-world cyber events.

## WHAT THIS INCLUDES

- Cybersecurity maturity assessments
- Cyber risk and control reviews
- Security governance and operating model design
- Security policy and standards review
- Identity and access control advisory
- Incident response readiness review
- Cybersecurity awareness strategy
- Board and leadership cybersecurity briefings
- Security roadmap and remediation planning
- Third-party and supplier cyber risk review

## OUTCOME

The goal is simple: help organizations move from reactive cybersecurity to a more structured, measurable, and business-aligned security posture.
    `,
  },

  // ─── 2. AI & Technology Advisory ───────────────────────────────────────────
  {
    id: "2",
    slug: "ai-technology-advisory",
    title: "AI & Technology Advisory",
    excerpt:
      "We help organizations adopt AI, automation, and digital technology with confidence — ensuring innovation is secure, governed, and aligned with business objectives.",
    icon: "Brain",
    color: "#8B5CF6",
    category: "AI & Technology",
    heading: "AI & Technology Advisory for Responsible Innovation",
    whyItMatters:
      "Artificial intelligence, automation, cloud platforms, data-driven systems, and emerging digital technologies are changing how organizations operate and compete. These technologies can improve productivity, decision-making, customer engagement, and business performance. However, they also introduce new risks around data privacy, security, model governance, bias, explainability, regulatory exposure, operational dependency, and misuse.\n\nOur AI & Technology Advisory services help organizations adopt innovation with confidence. We support clients in understanding not only what technology can do, but also what risks it can create if not governed properly.\n\nWe work with organizations to assess AI and technology adoption readiness, define governance principles, evaluate risk exposure, review control requirements, and support responsible implementation. Whether an organization is exploring AI tools, integrating automation, migrating to cloud platforms, or building digital products, our advisory approach helps ensure innovation is secure, accountable, and aligned with business objectives.",
    offerings: [
      { icon: "ClipboardCheck", title: "AI Adoption Readiness Assessment", description: "Evaluate your organization's preparedness to adopt AI tools responsibly and effectively." },
      { icon: "Settings2", title: "AI Governance Framework Design", description: "Build a practical governance structure that defines how AI is managed, reviewed, and accountable within the organization." },
      { icon: "AlertTriangle", title: "AI Risk & Control Assessment", description: "Identify and assess risks introduced by AI tools, models, and automated decision-making systems." },
      { icon: "FileCheck", title: "Responsible AI Policy Development", description: "Develop clear policies on AI usage, data handling, human oversight, and ethical boundaries." },
      { icon: "Lock", title: "AI Security & Privacy Review", description: "Assess how AI tools handle sensitive data and evaluate security controls around AI systems." },
      { icon: "BarChart2", title: "Technology Risk Assessment", description: "Evaluate risk exposure across your technology landscape including legacy systems and new platforms." },
      { icon: "Cloud", title: "Cloud & Digital Platform Risk Review", description: "Assess the risk posture of cloud services, SaaS platforms, and digital infrastructure." },
      { icon: "Database", title: "Data Governance & Usage Advisory", description: "Review how data is collected, used, and protected across AI and digital initiatives." },
      { icon: "Cpu", title: "Automation Risk Review", description: "Assess risks in automated workflows and process automation implementations." },
      { icon: "Presentation", title: "Executive AI Awareness Sessions", description: "Clear, practical briefings to help leadership understand AI risks, opportunities, and governance responsibilities." },
    ],
    outcomeStatement: "We help organizations move from excitement around AI to disciplined, responsible, and secure adoption.",
    businessOutcomes: [],
    ctaLabel: "Schedule an AI & Technology Advisory Session",
    content: `
# AI & Technology Advisory for Responsible Innovation

## OUR APPROACH

Artificial intelligence, automation, cloud platforms, data-driven systems, and emerging digital technologies are changing how organizations operate and compete. These technologies can improve productivity, decision-making, customer engagement, and business performance. However, they also introduce new risks around data privacy, security, model governance, bias, explainability, regulatory exposure, operational dependency, and misuse.

Our AI & Technology Advisory services help organizations adopt innovation with confidence. We support clients in understanding not only what technology can do, but also what risks it can create if not governed properly.

We work with organizations to assess AI and technology adoption readiness, define governance principles, evaluate risk exposure, review control requirements, and support responsible implementation.

## WHAT THIS INCLUDES

- AI adoption readiness assessment
- AI governance framework design
- AI risk and control assessment
- Responsible AI policy development
- AI security and privacy review
- Technology risk assessment
- Cloud and digital platform risk review
- Data governance and usage advisory
- Automation risk review
- Executive AI awareness sessions

## OUTCOME

We help organizations move from excitement around AI to disciplined, responsible, and secure adoption.
    `,
  },

  // ─── 3. AI Governance & Risk Advisory ──────────────────────────────────────
  {
    id: "3",
    slug: "ai-governance-risk",
    title: "AI Governance & Risk Advisory",
    excerpt:
      "AI adoption is accelerating, but many organizations still lack clear governance. We help you create a responsible, controlled, and accountable approach to AI.",
    icon: "ShieldAlert",
    color: "#F59E0B",
    category: "AI Governance",
    whyItMatters:
      "AI adoption is accelerating across business functions, but many organizations are still unclear about how to govern it. Employees may already be using public AI tools. Business teams may be testing automation. Technology teams may be integrating AI into products or workflows. Leadership may see productivity opportunities, while risk and compliance teams may worry about data exposure, accountability, and regulatory expectations.\n\nThis is where AI governance becomes essential.\n\nOur AI Governance & Risk Advisory services help organizations create a responsible and controlled approach to AI adoption. We support clients in understanding how AI is being used, what risks exist, what policies are required, and what controls should be implemented.\n\nThe objective is not to slow innovation. The objective is to make AI adoption safer, clearer, and more accountable.",
    offerings: [
      { icon: "Search", title: "AI Usage Discovery & Risk Review", description: "Identify how AI is being used across the organization and assess the associated risk exposure." },
      { icon: "Layout", title: "AI Governance Framework Development", description: "Build a structured governance model that defines accountability, review processes, and control requirements for AI." },
      { icon: "Scale", title: "Responsible AI Principles & Policy Design", description: "Develop practical policies covering AI usage, data handling, transparency, and human oversight." },
      { icon: "ClipboardList", title: "AI Risk Assessment & Control Mapping", description: "Assess AI-related risks and map them to appropriate controls and remediation priorities." },
      { icon: "Lock", title: "AI Data Privacy & Security Review", description: "Evaluate how AI tools access, process, and store sensitive organizational and personal data." },
      { icon: "Link2", title: "AI Vendor & Third-Party Risk Review", description: "Assess risks introduced by external AI providers, platforms, and tools used within the organization." },
      { icon: "GitBranch", title: "AI Model Governance Considerations", description: "Review model validation, version control, documentation, and accountability for AI-driven decisions." },
      { icon: "UserCheck", title: "Human Oversight & Accountability Design", description: "Define how humans review, approve, and remain accountable for AI-assisted decisions." },
      { icon: "GraduationCap", title: "AI Awareness Training for Employees", description: "Practical training to help employees understand responsible AI usage, risks, and organizational policies." },
      { icon: "Presentation", title: "Executive Briefing on AI Risk & Governance", description: "Leadership briefing on AI risk, regulatory expectations, and governance priorities." },
    ],
    keyQuestions: [
      "Who is using AI within the organization?",
      "What data is being entered into AI tools?",
      "Are AI outputs being validated before business use?",
      "Who is accountable for AI-related decisions?",
      "Are employees trained on responsible AI usage?",
      "Are privacy and security risks being assessed?",
      "Are policies and controls keeping pace with adoption?",
    ],
    outcomeStatement: "We help organizations create a practical AI governance foundation before AI usage becomes unmanaged business risk.",
    businessOutcomes: [],
    ctaLabel: "Assess Your AI Governance Readiness",
    content: `
# AI Governance & Risk Advisory

## OUR APPROACH

AI adoption is accelerating across business functions, but many organizations are still unclear about how to govern it. Employees may already be using public AI tools. Business teams may be testing automation. Technology teams may be integrating AI into products or workflows. Leadership may see productivity opportunities, while risk and compliance teams may worry about data exposure, accountability, and regulatory expectations.

This is where AI governance becomes essential.

Our AI Governance & Risk Advisory services help organizations create a responsible and controlled approach to AI adoption. We support clients in understanding how AI is being used, what risks exist, what policies are required, and what controls should be implemented.

The objective is not to slow innovation. The objective is to make AI adoption safer, clearer, and more accountable.

## KEY QUESTIONS WE HELP CLIENTS ANSWER

- Who is using AI within the organization?
- What data is being entered into AI tools?
- Are AI outputs being validated before business use?
- Who is accountable for AI-related decisions?
- Are employees trained on responsible AI usage?
- Are privacy and security risks being assessed?
- Are policies and controls keeping pace with adoption?

## OUTCOME

We help organizations create a practical AI governance foundation before AI usage becomes unmanaged business risk.
    `,
  },

  // ─── 4. Privacy & Data Protection Advisory ─────────────────────────────────
  {
    id: "4",
    slug: "privacy-data-protection",
    title: "Privacy & Data Protection Advisory",
    excerpt:
      "Data is one of your most valuable and sensitive assets. We help organizations understand privacy risks, strengthen data handling, and build accountability.",
    icon: "Lock",
    color: "#10B981",
    category: "Privacy",
    whyItMatters:
      "Data is one of the most valuable assets an organization holds. It is also one of the most sensitive. Customer information, employee records, business data, financial details, operational data, and digital identifiers must be collected, processed, stored, shared, and protected responsibly.\n\nAs organizations adopt cloud platforms, digital services, analytics, AI tools, and third-party providers, privacy and data protection risks become more complex. A weak data handling process, unclear retention practice, poor access control, or unreviewed vendor relationship can expose the organization to regulatory, reputational, and operational consequences.\n\nOur Privacy & Data Protection Advisory services help organizations understand how data is handled, where privacy risks may exist, and what practical improvements are needed to strengthen protection and accountability.\n\nPrivacy is no longer only a legal requirement. It is a trust expectation. Organizations that handle data responsibly are better positioned to build customer confidence, reduce compliance exposure, and support responsible digital growth.",
    offerings: [
      { icon: "ClipboardCheck", title: "Privacy Readiness Assessment", description: "Evaluate your current privacy posture, identify gaps, and understand areas requiring improvement." },
      { icon: "Search", title: "Data Protection Gap Review", description: "Identify weaknesses in how personal and sensitive data is collected, handled, stored, and protected." },
      { icon: "Users", title: "Personal Data Handling Review", description: "Review how personal information is managed across business processes and digital systems." },
      { icon: "Tag", title: "Data Classification & Handling Guidance", description: "Define data categories and establish clear handling standards for different types of sensitive information." },
      { icon: "FileText", title: "Privacy Policy & Process Review", description: "Assess privacy policies, notices, and internal processes for clarity, completeness, and compliance alignment." },
      { icon: "Archive", title: "Data Retention & Disposal Advisory", description: "Review data retention schedules and establish appropriate disposal practices across the organization." },
      { icon: "Link2", title: "Third-Party Data Sharing Risk Review", description: "Assess risks associated with sharing personal data with vendors, partners, and service providers." },
      { icon: "GraduationCap", title: "Privacy Awareness Training", description: "Practical training to build employee understanding of privacy obligations and responsible data handling." },
      { icon: "AlertOctagon", title: "Data Breach Response Readiness", description: "Evaluate your capability to detect, respond to, and notify relevant parties in the event of a data breach." },
      { icon: "Lightbulb", title: "Privacy-by-Design Advisory for Digital Initiatives", description: "Support new digital products, systems, and services in embedding privacy from the design stage." },
    ],
    outcomeStatement: "We help organizations move from informal data handling to more structured, accountable, and privacy-aware operations.",
    businessOutcomes: [],
    ctaLabel: "Review Your Privacy and Data Protection Readiness",
    content: `
# Privacy & Data Protection Advisory

## OUR APPROACH

Data is one of the most valuable assets an organization holds. It is also one of the most sensitive. Customer information, employee records, business data, financial details, operational data, and digital identifiers must be collected, processed, stored, shared, and protected responsibly.

As organizations adopt cloud platforms, digital services, analytics, AI tools, and third-party providers, privacy and data protection risks become more complex.

Our Privacy & Data Protection Advisory services help organizations understand how data is handled, where privacy risks may exist, and what practical improvements are needed to strengthen protection and accountability.

## WHY IT MATTERS

Privacy is no longer only a legal requirement. It is a trust expectation. Organizations that handle data responsibly are better positioned to build customer confidence, reduce compliance exposure, and support responsible digital growth.

## OUTCOME

We help organizations move from informal data handling to more structured, accountable, and privacy-aware operations.
    `,
  },

  // ─── 5. Cloud & Technology Risk Advisory ───────────────────────────────────
  {
    id: "5",
    slug: "cloud-technology-risk",
    title: "Cloud & Technology Risk Advisory",
    excerpt:
      "Cloud platforms and digital technologies are central to modern operations. We help organizations govern them securely, reducing configuration risk and operational exposure.",
    icon: "Cloud",
    color: "#0EA5E9",
    category: "Cloud & Tech Risk",
    whyItMatters:
      "Cloud platforms, SaaS applications, digital services, APIs, automation tools, and enterprise technologies are now central to business operations. They enable speed, scale, flexibility, and innovation. However, without the right governance and controls, they can also introduce serious risks.\n\nCommon challenges include weak access control, poor configuration management, unclear ownership, excessive privileges, limited monitoring, insecure integrations, data exposure, vendor dependency, and inconsistent security practices across platforms.\n\nOur Cloud & Technology Risk Advisory services help organizations assess and strengthen the security, governance, and risk management of their technology environments. We support clients in identifying practical improvements across cloud usage, digital platforms, access controls, technology operations, and transformation initiatives.",
    offerings: [
      { icon: "Cloud", title: "Cloud Security Posture Review", description: "Assess the configuration and security controls of your cloud environments across IaaS, PaaS, and SaaS." },
      { icon: "BarChart3", title: "Technology Risk Assessment", description: "Evaluate risk exposure across your technology landscape including platforms, applications, and digital infrastructure." },
      { icon: "KeyRound", title: "Access Control & Privilege Review", description: "Assess who has access to critical systems and data, and whether access controls are appropriately designed and enforced." },
      { icon: "Settings", title: "Secure Configuration Review", description: "Identify misconfigured cloud services, platforms, and systems that may introduce unnecessary risk exposure." },
      { icon: "Monitor", title: "SaaS & Digital Platform Risk Review", description: "Assess the risk posture of SaaS tools and digital platforms used across the organization." },
      { icon: "Layout", title: "Cloud Governance Advisory", description: "Define governance structures, ownership, and accountability for cloud environments and digital platforms." },
      { icon: "Lock", title: "Data Protection in Cloud Environments", description: "Review how sensitive data is stored, transmitted, and protected within cloud platforms." },
      { icon: "Link2", title: "Third-Party Technology Dependency Review", description: "Assess risks created by technology vendor dependencies, integrations, and supply chain exposure." },
      { icon: "Server", title: "Secure Architecture Advisory", description: "Review and advise on security architecture for cloud, hybrid, and digital platform environments." },
      { icon: "RefreshCw", title: "Digital Transformation Risk Review", description: "Assess security and compliance implications of technology transformation programmes and initiatives." },
    ],
    keyQuestions: [
      "Are cloud environments configured securely?",
      "Who has access to critical systems and data?",
      "Are privileged accounts controlled and monitored?",
      "Are SaaS platforms governed consistently?",
      "Are security responsibilities clearly defined?",
      "Are technology risks visible to leadership?",
      "Are digital transformation initiatives being reviewed for security and compliance impact?",
    ],
    outcomeStatement: "We help organizations adopt cloud and technology platforms with stronger control, better visibility, and reduced operational risk.",
    businessOutcomes: [],
    ctaLabel: "Request a Cloud & Technology Risk Review",
    content: `
# Cloud & Technology Risk Advisory

## OUR APPROACH

Cloud platforms, SaaS applications, digital services, APIs, automation tools, and enterprise technologies are now central to business operations. They enable speed, scale, flexibility, and innovation. However, without the right governance and controls, they can also introduce serious risks.

Our Cloud & Technology Risk Advisory services help organizations assess and strengthen the security, governance, and risk management of their technology environments. We support clients in identifying practical improvements across cloud usage, digital platforms, access controls, technology operations, and transformation initiatives.

## KEY QUESTIONS WE HELP CLIENTS ANSWER

- Are cloud environments configured securely?
- Who has access to critical systems and data?
- Are privileged accounts controlled and monitored?
- Are SaaS platforms governed consistently?
- Are security responsibilities clearly defined?
- Are technology risks visible to leadership?
- Are digital transformation initiatives being reviewed for security and compliance impact?

## OUTCOME

We help organizations adopt cloud and technology platforms with stronger control, better visibility, and reduced operational risk.
    `,
  },

  // ─── 6. Governance, Risk and Compliance (GRC) ──────────────────────────────
  {
    id: "6",
    slug: "governance-risk-compliance",
    title: "Governance, Risk and Compliance (GRC)",
    excerpt:
      "Uncover the potential of a robust GRC framework tailored to your organization's unique needs, regulatory landscape, and maturity level.",
    icon: "Scale",
    color: "#6366F1",
    category: "GRC",
    whyItMatters:
      "Organizations operate in complex regulatory environments where governance gaps, unmanaged risks, and compliance failures can have serious consequences. A well-designed GRC framework provides a unified approach to managing risk, maintaining compliance, and strengthening governance — reducing surprises and enabling confident decision-making.",
    offerings: [
      { icon: "Map", title: "GRC Strategy & Roadmap", description: "Develop a comprehensive GRC strategy aligned with your business objectives, risk tolerance, and regulatory requirements." },
      { icon: "Shield", title: "Cyber Security Governance Model", description: "Design a governance model that integrates cybersecurity into organizational decision-making and accountability structures." },
      { icon: "Settings", title: "Cyber Security Operating Model", description: "Define how cybersecurity teams, processes, and responsibilities are structured and operate within the organization." },
      { icon: "Monitor", title: "GRC Platform Selection", description: "Evaluate and recommend GRC platforms that best fit your organization's needs, maturity, and budget." },
      { icon: "FileText", title: "Policy & Compliance Lifecycle Management", description: "Design and manage policy frameworks that remain current, adopted, and aligned with regulatory requirements." },
      { icon: "BarChart3", title: "Risk Implementation", description: "Implement practical risk management processes that identify, assess, and treat risks across the organization." },
      { icon: "Link2", title: "Vendor Risk Management Implementation", description: "Build structured programmes to assess and manage risks introduced by third-party vendors and suppliers." },
      { icon: "Activity", title: "SecOps Implementation", description: "Design and support the implementation of security operations processes, tools, and monitoring capabilities." },
      { icon: "AlertTriangle", title: "Vulnerability Response Management", description: "Establish processes to identify, prioritize, and remediate vulnerabilities across the technology estate." },
      { icon: "Lock", title: "Privacy Risk Assessment", description: "Assess privacy risks within the GRC framework and align controls with data protection obligations." },
    ],
    businessOutcomes: [
      "Establish a unified framework for managing risk, compliance, and governance",
      "Reduce regulatory exposure through structured compliance management",
      "Improve visibility of risks across the organization for leadership and the board",
      "Strengthen vendor risk management and third-party accountability",
      "Build a scalable GRC operating model that matures over time",
      "Support audit readiness and regulatory review preparation",
    ],
    ctaLabel: "Build Your GRC Framework",
    content: `
# Governance, Risk and Compliance (GRC)

## PLAN. EXECUTE. OPTIMIZE.

# GRC Strategy & Roadmap

Uncover the potential of a robust GRC framework tailored to your organization's unique needs. Our GRC Strategy services help you chart a comprehensive roadmap that aligns with your business objectives and regulatory requirements.

- GRC Strategy & Roadmap
- Cyber Security Governance Model
- Cyber Security Operating Model
- GRC Platform Selection

# GRC Design & Implementation

Move from strategy to action with our GRC Design & Implementation services. We focus on building a strong foundation for risk management, compliance, and security operations within your organization.

- Policy and Compliance Lifecycle Management
- Risk Implementation
- Vendor Risk Management Implementation
- SecOps Implementation
- Vulnerability Response Management
- Privacy Risk Assessment

# GRC Managed Services

## MONITOR. MAINTAIN. IMPROVE.

Maintain continuous compliance and manage risk effectively with our GRC Managed Services. We provide ongoing support to help you navigate the complexities of compliance assessments, vendor risk management, and policy lifecycle management.

- Compliance Assessment
- Vendor Risk Management
- Risk and Control Assessment
- Policy Lifecycle Management
- Risk Assessment
- GRC Solution Support
    `,
  },

  // ─── 7. Third Party Risk Management ────────────────────────────────────────
  {
    id: "7",
    slug: "third-party-risk-management",
    title: "Third Party Risk Management (TPRM)",
    excerpt:
      "Identify, assess, and mitigate risks associated with your third-party relationships to enhance security, resilience, and compliance.",
    icon: "Link",
    color: "#EC4899",
    category: "Third-Party Risk",
    whyItMatters:
      "In an increasingly interconnected business environment, managing third-party risks is critical to maintaining operational integrity and protecting sensitive data. A single vendor vulnerability or supply chain compromise can introduce significant risk to your organization — regulatory, operational, reputational, and financial.",
    offerings: [
      { icon: "BarChart3", title: "TPRM Maturity Assessment", description: "Evaluate the current maturity of your third-party risk programme and identify areas for improvement." },
      { icon: "Search", title: "Third-Party Due Diligence", description: "Assess the security, compliance, and operational risks of potential third parties before engagement." },
      { icon: "Activity", title: "Continuous Monitoring", description: "Implement ongoing monitoring of third-party risk profiles to detect changes and emerging risks in real time." },
      { icon: "Cpu", title: "TPRM Automation & Service Portal", description: "Streamline TPRM processes through automation and a centralized service portal for risk data and reporting." },
      { icon: "FileCheck", title: "Vendor Risk Scoring & Prioritization", description: "Develop risk scoring models to prioritize vendor oversight based on criticality and risk exposure." },
      { icon: "ClipboardList", title: "Contract & Compliance Review", description: "Review vendor contracts and assess whether security and compliance obligations are clearly defined." },
      { icon: "RefreshCw", title: "Supplier Engagement & Remediation", description: "Engage with suppliers on identified risks and support structured remediation and improvement plans." },
      { icon: "Layout", title: "TPRM Framework Design", description: "Design a structured, scalable framework for managing third-party risk across the vendor lifecycle." },
    ],
    businessOutcomes: [
      "Gain clear visibility into risks across your third-party and vendor ecosystem",
      "Reduce supply chain security and compliance exposure",
      "Strengthen vendor onboarding, review, and ongoing oversight processes",
      "Improve contractual clarity around security and compliance obligations",
      "Build a scalable, automated approach to third-party risk management",
      "Support audit and regulatory requirements related to vendor and supply chain risk",
    ],
    ctaLabel: "Strengthen Your Third-Party Risk Programme",
    content: `
# Third Party Risk Management (TPRM)

## Mitigate Risks and Enhance Security through Strategic TPRM Solutions

In an increasingly interconnected business environment, managing third-party risks is critical to maintaining operational integrity and protecting sensitive data. Our TPRM Consulting services are designed to help your organization identify, assess, and mitigate risks associated with third-party relationships.

# Our Approach

**1. TPRM Maturity Assessment** — Evaluate and benchmark your current third-party risk management capabilities.

**2. Third Party Due Diligence and Monitoring** — Proactively manage third-party risks through ongoing due diligence and continuous monitoring.

**3. TPRM Automation and Service Portal** — Streamline third-party risk management processes with automation and a centralized portal.

# Why Choose Our TPRM Consulting?

By partnering with us, you gain access to a team of experts dedicated to strengthening your third-party risk management capabilities, providing tools, strategies, and ongoing support to adapt to evolving threats and regulatory requirements.
    `,
  },

  // ─── 8. Fintech Strategic Services ─────────────────────────────────────────
  {
    id: "8",
    slug: "fintech-strategic-services",
    title: "Fintech Strategic Services",
    excerpt:
      "Empowering financial institutions to adapt, innovate, and thrive within a rapidly evolving digital economy through strategic advisory and transformation.",
    icon: "TrendingUp",
    color: "#F97316",
    category: "FinTech",
    whyItMatters:
      "Financial institutions are navigating a rapidly shifting landscape where digital banking, open finance, blockchain, embedded payments, and AI-driven risk management are reshaping the industry. Organizations that fail to adapt risk losing market relevance, regulatory standing, and customer trust. Strategic fintech advisory helps navigate this complexity with clarity and confidence.",
    offerings: [
      { icon: "Globe", title: "Open Banking & API Strategy", description: "Design and implement API-led banking architectures that enable open finance and ecosystem integration." },
      { icon: "CreditCard", title: "Payment Modernization & Architecture", description: "Modernize payment systems to support instant payments, real-time settlement, and next-generation rails." },
      { icon: "RefreshCw", title: "Legacy Core Transformation", description: "Develop a structured approach to modernizing legacy banking infrastructure with minimal operational disruption." },
      { icon: "Scale", title: "Regulatory Navigational Support", description: "Navigate complex financial services regulatory requirements across multiple jurisdictions." },
      { icon: "GitBranch", title: "Blockchain & DeFi Advisory", description: "Evaluate realistic applications of decentralized finance, smart contracts, and digital assets for your business model." },
      { icon: "BarChart3", title: "Fintech Growth & Scale Strategies", description: "Support fintech startups and scale-ups with market positioning, product-market fit, and scaling strategies." },
      { icon: "Brain", title: "AI in Financial Services Advisory", description: "Explore responsible AI adoption in credit decisions, fraud detection, compliance, and customer experience." },
      { icon: "Shield", title: "Financial Crime & Compliance Advisory", description: "Strengthen AML, KYC, and financial crime detection capabilities across digital channels." },
    ],
    businessOutcomes: [
      "Accelerate digital banking transformation with a clear, risk-managed roadmap",
      "Modernize payment infrastructure to support real-time and open banking capabilities",
      "Navigate financial services regulations with structured, expert guidance",
      "Explore blockchain and digital asset opportunities with appropriate risk controls",
      "Scale fintech operations with validated market positioning and growth strategy",
      "Strengthen financial crime and compliance controls for a digital-first environment",
    ],
    ctaLabel: "Explore Fintech Advisory Services",
    content: `
# Fintech Strategic Services — Innovation & Transformation

## INNOVATE. ADAPT. THRIVE.

Our Fintech Innovation & Transformation consultancy empowers financial institutions and startups alike to navigate the rapidly shifting landscape of modern finance. Be it optimizing payment networks, integrating blockchain technology, or designing seamless consumer banking experiences, we provide the strategic roadmap to unlock new market potentials.

# Digital Banking & Payments Integration

Future-proof your financial products with modern architectures. We guide organizations in restructuring legacy systems to embrace API-led banking, instant payments, and open-banking frameworks.

- Open Banking & API Strategy
- Payment Modernization & Architecture
- Legacy Core Transformation
- Regulatory Navigational Support

# Blockchain & DeFi Advisory

Explore new frontiers of value exchange. Our strategic advisors evaluate the realistic impact of decentralized finance, smart contracts, and stablecoins on your business model.

- Smart Contract Auditing & Risk Assessment
- Digital Asset Strategy Formulation
- DeFi Integration Frameworks

# Fintech Growth & Scale Strategies

For ambitious fintech startups and scale-ups, market penetration requires absolute precision. We assist in market positioning, product-market-fit validation, and structural preparation for enterprise scaling.
    `,
  },

  // ─── 9. Cryptographic Inventory Management ─────────────────────────────────
  {
    id: "9",
    slug: "cryptographic-inventory-management-risk-assessment",
    title: "Cryptographic Inventory & Quantum-Safe Advisory",
    excerpt:
      "Establish a Quantum-safe strategy by identifying cryptographic vulnerabilities, assessing risks, and planning a structured transition to post-quantum cryptography.",
    icon: "KeyRound",
    color: "#14B8A6",
    category: "Quantum Readiness",
    whyItMatters:
      "The rise of quantum computing presents an unprecedented challenge to modern cryptographic systems. Organizations must proactively identify cryptographic vulnerabilities, assess risks, and establish a Quantum-safe strategy before their existing cryptographic protections become exploitable. Waiting until quantum threats materialize is not a viable risk management approach.",
    offerings: [
      { icon: "Search", title: "Enterprise-Wide Cryptographic Discovery", description: "Identify cryptographic assets across servers, networks, APIs, websites, CDNs, DNS, and PKI infrastructure." },
      { icon: "Brain", title: "AI-Powered Cryptographic Risk Analysis", description: "Detect vulnerabilities in cryptographic implementations and assess exposure to quantum computing threats." },
      { icon: "Layout", title: "Cryptographic Asset Management", description: "Maintain a centralized governance view of cryptographic assets, tracking compliance and security status." },
      { icon: "FileCheck", title: "Policy & Compliance Mapping", description: "Align cryptographic assets with industry standards, regulatory requirements, and enterprise security policies." },
      { icon: "AlertTriangle", title: "End-to-End Cryptographic Risk Assessment", description: "Evaluate cryptographic dependencies and risk levels across systems, software, and supply chains." },
      { icon: "Map", title: "Cryptographic Migration Roadmap", description: "Develop a structured plan for transitioning to quantum-resistant cryptographic algorithms." },
      { icon: "Link2", title: "Supply Chain Cryptographic Risk Review", description: "Assess quantum-vulnerable cryptographic algorithms across internal and third-party applications." },
      { icon: "Activity", title: "Continuous Monitoring & Reassessment", description: "Ensure ongoing compliance and security posture improvement with scheduled cryptographic scans." },
    ],
    businessOutcomes: [
      "Gain full visibility into your cryptographic asset landscape and risk exposure",
      "Prioritize and plan a structured transition to quantum-safe cryptography",
      "Reduce supply chain cryptographic risk through vendor assessment and engagement",
      "Demonstrate proactive quantum-readiness to regulators and stakeholders",
      "Streamline cryptographic governance and compliance reporting",
      "Build organizational capability for long-term crypto-agility and resilience",
    ],
    ctaLabel: "Begin Your Quantum-Safe Assessment",
    content: `
# Cryptographic Inventory Management & Risk Assessment

## Building Crypto Agility for a Quantum-Safe Future

## DISCOVER. ANALYZE. TRANSITION.

The rise of quantum computing presents an unprecedented challenge to modern cryptographic systems. Organizations must proactively identify cryptographic vulnerabilities, assess risks, and establish a Quantum-safe strategy.

# Comprehensive Cryptographic Inventory & Visibility

A reliable cryptographic inventory is the foundation of any Quantum-safe migration strategy. Our AI-powered cryptographic inventory platform enables organizations to discover, analyze, and manage cryptographic assets across their IT landscape.

- Enterprise-Wide Cryptographic Discovery
- Automated AI-Powered Risk Analysis
- Intuitive Cryptographic Asset Management
- Policy & Compliance Mapping

# Risk Assessment & Remediation Planning

Cryptographic weaknesses can expose businesses to compliance risks, operational disruptions, and security vulnerabilities.

- End-to-End Cryptographic Risk Assessment
- Remediation Strategy & Action Plan
- Integration with Service Desk & ITSM Tools
- Continuous Monitoring & Risk Reassessment

# Quantum-Safe Transition Program Management

Transitioning to Post-Quantum Cryptography requires strategic planning and cross-functional collaboration.

- Cryptographic Migration Roadmap
- Asset Prioritization & Impact Analysis
- Executive & Cross-Functional Collaboration
- Regulatory & Audit Compliance Readiness
    `,
  },
];
