export interface ProgramHighlight {
  icon: string; // lucide icon name
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
  heroIcon: string;
  programHighlights: ProgramHighlight[];
  aboutCourse: string[];
  directorQuote: { text: string; author: string };
  objectives: Objective[];
  curriculum: CurriculumModule[];
  targetAudience: TargetAudienceItem[];
  examDetails: ExamDetail[];
  toolsCovered: Tool[];
}

export const courses: Course[] = [
  {
    slug: "advanced-cybersecurity-program",
    category: "Cybersecurity",
    title: "Advanced Information Security & Cybersecurity Program",
    subtitle: "Become a certified cybersecurity expert with hands-on labs and industry mentorship",
    highlights: [
      "Comprehensive 10-month program designed to transform you into a cybersecurity expert with hands-on experience in threat detection, incident response, and security architecture",
      "Industry-recognized certification preparation including CEH, CISSP, and CompTIA Security+ with expert mentorship from leading security professionals",
      "Real-world capstone projects involving penetration testing, security audits, and incident management scenarios used by Fortune 500 companies",
    ],
    duration: "10 Months",
    mode: "Online",
    weeklyHours: "15-20 hrs",
    certificate: "Upon Completion",
    rating: 4.9,
    students: "1.8K",
    heroIcon: "Shield",
    programHighlights: [
      { icon: "FlaskConical", title: "Hands-On Lab Environment", description: "Access to state-of-the-art virtual labs with real-world security scenarios and tools including Kali Linux, Metasploit, and Wireshark" },
      { icon: "UserCheck", title: "Industry Expert Mentors", description: "Learn directly from cybersecurity professionals with 15+ years of experience in enterprise security and ethical hacking" },
      { icon: "Award", title: "Multiple Certifications", description: "Preparation for CEH, CISSP, CompTIA Security+, and CISM certifications with dedicated exam prep modules" },
      { icon: "Briefcase", title: "Career Support", description: "Dedicated career services including resume building, interview preparation, and job placement assistance with partner companies" },
      { icon: "FolderKanban", title: "Capstone Projects", description: "Work on 3 major projects including penetration testing, security infrastructure design, and incident response planning" },
      { icon: "Users", title: "Community Access", description: "Join an exclusive network of 5,000+ cybersecurity professionals and alumni for ongoing learning and collaboration" },
    ],
    aboutCourse: [
      "The Advanced Information Security & Cybersecurity Program is a comprehensive, industry-aligned curriculum designed to prepare you for a successful career in cybersecurity. This program combines theoretical knowledge with extensive hands-on practice to ensure you develop both the technical skills and strategic thinking required in today's threat landscape.",
      "Throughout this 10-month journey, you'll master essential cybersecurity domains including network security, application security, cloud security, incident response, and security governance. Our curriculum is continuously updated to reflect the latest threats, technologies, and industry best practices, ensuring you stay ahead in this rapidly evolving field.",
      "The program features a unique blend of live instructor-led sessions, self-paced learning modules, and practical lab exercises. You'll work with industry-standard tools and technologies, participate in capture-the-flag competitions, and complete real-world projects that mirror the challenges faced by security professionals in enterprise environments.",
    ],
    directorQuote: {
      text: "This program is designed for professionals who are serious about building a career in cybersecurity. Our graduates have gone on to secure positions at leading technology companies, financial institutions, and government agencies worldwide.",
      author: "Dr. James Patterson, Program Director",
    },
    objectives: [
      { number: 1, title: "Identify and Analyze Security Threats", description: "Recognize various types of cyber threats, vulnerabilities, and attack vectors affecting modern systems and networks" },
      { number: 2, title: "Implement Security Controls", description: "Design and deploy comprehensive security solutions including firewalls, IDS/IPS, and endpoint protection systems" },
      { number: 3, title: "Conduct Penetration Testing", description: "Perform ethical hacking and penetration testing using industry-standard methodologies and tools" },
      { number: 4, title: "Manage Security Incidents", description: "Develop and execute incident response plans, conduct forensic analysis, and manage security breaches effectively" },
      { number: 5, title: "Ensure Compliance", description: "Understand and implement security frameworks including ISO 27001, NIST, PCI-DSS, and GDPR requirements" },
      { number: 6, title: "Secure Cloud Infrastructure", description: "Implement security best practices for AWS, Azure, and GCP cloud environments and containerized applications" },
    ],
    curriculum: [
      { number: 1, title: "Fundamentals of Information Security", duration: "4 weeks", modules: 8, subtopics: [{ title: "Introduction to Cybersecurity and CIA Triad" }, { title: "Security Principles and Risk Management" }, { title: "Cryptography Basics and PKI" }, { title: "Security Policies and Procedures" }] },
      { number: 2, title: "Network Security", duration: "6 weeks", modules: 12, subtopics: [{ title: "TCP/IP Protocol Suite and Network Architecture" }, { title: "Firewalls, IDS/IPS Configuration" }, { title: "VPN and Secure Tunneling Protocols" }, { title: "Wireless Network Security" }] },
      { number: 3, title: "Ethical Hacking & Penetration Testing", duration: "8 weeks", modules: 15, subtopics: [{ title: "Reconnaissance and Information Gathering" }, { title: "Vulnerability Scanning and Analysis" }, { title: "Exploitation Techniques with Metasploit" }, { title: "Post-Exploitation and Reporting" }] },
      { number: 4, title: "Application Security", duration: "5 weeks", modules: 10, subtopics: [{ title: "OWASP Top 10 Vulnerabilities" }, { title: "Secure Coding Practices" }, { title: "Web Application Penetration Testing" }, { title: "API Security Testing" }] },
      { number: 5, title: "Cloud Security", duration: "4 weeks", modules: 8, subtopics: [{ title: "Cloud Security Architecture" }, { title: "AWS/Azure/GCP Security Services" }, { title: "Container and Kubernetes Security" }, { title: "DevSecOps Principles" }] },
      { number: 6, title: "Incident Response & Forensics", duration: "6 weeks", modules: 11, subtopics: [{ title: "Incident Response Lifecycle" }, { title: "Digital Forensics Fundamentals" }, { title: "Memory and Disk Analysis" }, { title: "Malware Analysis Techniques" }] },
      { number: 7, title: "Security Governance & Compliance", duration: "3 weeks", modules: 6, subtopics: [{ title: "ISO 27001 Implementation" }, { title: "NIST Cybersecurity Framework" }, { title: "GDPR and PCI-DSS Compliance" }] },
      { number: 8, title: "Capstone Project & Certification Prep", duration: "4 weeks", modules: 0, subtopics: [{ title: "Enterprise Security Audit Project" }, { title: "CEH Exam Preparation" }, { title: "CISSP Domain Review" }, { title: "CompTIA Security+ Mock Exams" }] },
    ],
    targetAudience: [
      { icon: "Code", title: "IT Professionals", description: "System administrators and IT professionals looking to transition into cybersecurity roles" },
      { icon: "GraduationCap", title: "Recent Graduates", description: "Computer science and engineering graduates seeking specialized cybersecurity expertise" },
      { icon: "Shield", title: "Security Enthusiasts", description: "Individuals passionate about cybersecurity who want to formalize their skills with certifications" },
      { icon: "Briefcase", title: "Career Changers", description: "Professionals from other industries who want to pivot into the high-demand cybersecurity field" },
    ],
    examDetails: [
      { name: "Certified Ethical Hacker (CEH)", provider: "EC-Council", passScore: "70%", prepIncluded: true },
      { name: "CompTIA Security+", provider: "CompTIA", passScore: "750/900", prepIncluded: true },
      { name: "CISSP", provider: "ISC²", passScore: "700/1000", prepIncluded: true },
    ],
    toolsCovered: [
      { name: "Kali Linux", icon: "Terminal", category: "OS" },
      { name: "Metasploit", icon: "Zap", category: "Exploitation" },
      { name: "Wireshark", icon: "Activity", category: "Analysis" },
      { name: "Burp Suite", icon: "Search", category: "Web Security" },
      { name: "Nmap", icon: "Network", category: "Scanning" },
      { name: "Splunk", icon: "BarChart2", category: "SIEM" },
      { name: "Snort", icon: "Bell", category: "IDS" },
      { name: "Nessus", icon: "ScanSearch", category: "Vulnerability" },
      { name: "John the Ripper", icon: "Lock", category: "Password" },
      { name: "Autopsy", icon: "FolderSearch", category: "Forensics" },
      { name: "OpenVAS", icon: "ShieldCheck", category: "Scanning" },
      { name: "Aircrack-ng", icon: "Wifi", category: "Wireless" },
    ],
  },
  {
    slug: "advanced-data-analytics-program",
    category: "Data Science",
    title: "Advanced Data Analytics & Machine Learning Program",
    subtitle: "Master data science, ML engineering, and AI with real-world projects",
    highlights: [
      "Comprehensive 6-month program covering data analysis, machine learning, deep learning, and business intelligence with hands-on Python projects",
      "Work with real datasets from Fortune 500 companies and build a portfolio of 5+ end-to-end ML projects ready to showcase to employers",
      "Industry-recognized certification preparation for Google Data Analytics, IBM Data Science, and AWS Machine Learning Specialty",
    ],
    duration: "6 Months",
    mode: "Online",
    weeklyHours: "12-15 hrs",
    certificate: "Upon Completion",
    rating: 4.8,
    students: "2.5K",
    heroIcon: "LineChart",
    programHighlights: [
      { icon: "Database", title: "Real-World Datasets", description: "Work with actual industry datasets from finance, healthcare, e-commerce, and social media domains" },
      { icon: "Brain", title: "AI/ML Deep Dives", description: "Master deep learning frameworks including TensorFlow, PyTorch, and Keras with hands-on neural network projects" },
      { icon: "Award", title: "Google & IBM Certifications", description: "Earn industry-recognized credentials from Google, IBM, and AWS upon program completion" },
      { icon: "Briefcase", title: "Portfolio Building", description: "Graduate with 5+ deployed ML projects and a professional data science portfolio on GitHub" },
      { icon: "BarChart2", title: "Business Intelligence", description: "Master Tableau, Power BI, and advanced SQL for creating executive-level dashboards and reports" },
      { icon: "Users", title: "Mentorship Network", description: "1-on-1 mentorship sessions with senior data scientists from Google, Meta, and leading analytics firms" },
    ],
    aboutCourse: [
      "The Advanced Data Analytics & Machine Learning Program is designed to transform you from a data beginner into a confident data scientist capable of building production-grade ML systems. Our curriculum balances theoretical foundations with extensive practical application, ensuring you're job-ready from day one.",
      "You'll progress from Python fundamentals and statistical analysis through to advanced deep learning and MLOps, covering the complete lifecycle of a data science project. Every module is built around solving real business problems with real data — no toy datasets, no contrived examples.",
      "By the end of this program, you'll have a strong portfolio of end-to-end projects, proficiency in the most in-demand tools and frameworks, and the confidence to ace technical interviews at top technology companies.",
    ],
    directorQuote: {
      text: "Data science is not just about algorithms — it's about telling stories with data that drive business decisions. Our program teaches you both the technical depth and business acumen needed to excel in this field.",
      author: "Dr. Emily Rodriguez, Program Director",
    },
    objectives: [
      { number: 1, title: "Master Python for Data Science", description: "Build proficiency in Python, NumPy, Pandas, and scientific computing for data manipulation and analysis" },
      { number: 2, title: "Apply Statistical Analysis", description: "Apply statistical methods, hypothesis testing, and probability theory to real-world business problems" },
      { number: 3, title: "Build Machine Learning Models", description: "Train, evaluate, and deploy supervised and unsupervised ML models using scikit-learn and advanced frameworks" },
      { number: 4, title: "Develop Deep Learning Systems", description: "Design and train neural networks for computer vision, NLP, and time-series forecasting using TensorFlow and PyTorch" },
      { number: 5, title: "Create Data Visualizations", description: "Build compelling dashboards and data stories using Matplotlib, Seaborn, Tableau, and Power BI" },
      { number: 6, title: "Deploy ML in Production", description: "Package and deploy ML models as APIs, implement MLOps pipelines, and monitor model performance in production" },
    ],
    curriculum: [
      { number: 1, title: "Python & Data Foundations", duration: "3 weeks", modules: 8, subtopics: [{ title: "Python Programming Fundamentals" }, { title: "NumPy and Pandas for Data Analysis" }, { title: "Data Cleaning and Preprocessing" }, { title: "Exploratory Data Analysis (EDA)" }] },
      { number: 2, title: "Statistics & Probability", duration: "3 weeks", modules: 7, subtopics: [{ title: "Descriptive Statistics and Distributions" }, { title: "Hypothesis Testing and p-values" }, { title: "Bayesian Statistics" }, { title: "A/B Testing Design" }] },
      { number: 3, title: "Machine Learning Fundamentals", duration: "5 weeks", modules: 10, subtopics: [{ title: "Supervised Learning: Regression & Classification" }, { title: "Model Evaluation and Cross-Validation" }, { title: "Feature Engineering and Selection" }, { title: "Ensemble Methods: Random Forest, XGBoost" }] },
      { number: 4, title: "Deep Learning & Neural Networks", duration: "5 weeks", modules: 10, subtopics: [{ title: "Neural Network Architecture Design" }, { title: "Convolutional Neural Networks (CNN)" }, { title: "Recurrent Neural Networks (RNN/LSTM)" }, { title: "Transformer Models and Attention" }] },
      { number: 5, title: "Data Visualization & BI", duration: "3 weeks", modules: 6, subtopics: [{ title: "Advanced Matplotlib and Seaborn" }, { title: "Tableau Dashboard Design" }, { title: "Power BI for Business Analytics" }] },
      { number: 6, title: "Big Data & Cloud Analytics", duration: "3 weeks", modules: 6, subtopics: [{ title: "Spark and Distributed Computing" }, { title: "AWS SageMaker for ML" }, { title: "Google BigQuery and DataFlow" }] },
      { number: 7, title: "NLP & Computer Vision", duration: "4 weeks", modules: 8, subtopics: [{ title: "Text Preprocessing and Embeddings" }, { title: "Sentiment Analysis and Named Entity Recognition" }, { title: "Object Detection with YOLO" }, { title: "Image Segmentation" }] },
      { number: 8, title: "MLOps & Capstone Project", duration: "4 weeks", modules: 0, subtopics: [{ title: "Model Deployment with FastAPI" }, { title: "MLflow and Experiment Tracking" }, { title: "CI/CD for Machine Learning" }, { title: "Capstone Project Presentation" }] },
    ],
    targetAudience: [
      { icon: "Code", title: "Software Developers", description: "Developers looking to pivot into data science and machine learning engineering" },
      { icon: "BarChart2", title: "Business Analysts", description: "Analysts wanting to level up from Excel to Python-driven data science and predictive analytics" },
      { icon: "GraduationCap", title: "STEM Graduates", description: "Mathematics, statistics, or engineering graduates entering the data science workforce" },
      { icon: "Briefcase", title: "Product Managers", description: "PMs seeking data literacy to make more evidence-based product decisions" },
    ],
    examDetails: [
      { name: "Google Data Analytics Certificate", provider: "Google", passScore: "80%", prepIncluded: true },
      { name: "IBM Data Science Professional", provider: "IBM", passScore: "75%", prepIncluded: true },
      { name: "AWS Machine Learning Specialty", provider: "Amazon Web Services", passScore: "72%", prepIncluded: false },
    ],
    toolsCovered: [
      { name: "Python", icon: "Code", category: "Language" },
      { name: "TensorFlow", icon: "Brain", category: "Deep Learning" },
      { name: "PyTorch", icon: "Flame", category: "Deep Learning" },
      { name: "Scikit-learn", icon: "Cog", category: "ML" },
      { name: "Pandas", icon: "Table", category: "Data" },
      { name: "Tableau", icon: "BarChart2", category: "BI" },
      { name: "Power BI", icon: "PieChart", category: "BI" },
      { name: "Spark", icon: "Zap", category: "Big Data" },
      { name: "AWS SageMaker", icon: "Cloud", category: "MLOps" },
      { name: "MLflow", icon: "Activity", category: "MLOps" },
      { name: "Jupyter", icon: "BookOpen", category: "IDE" },
      { name: "Docker", icon: "Box", category: "Deployment" },
    ],
  },
  {
    slug: "product-management-program",
    category: "Business",
    title: "Product Management Fundamentals to Advanced",
    subtitle: "Launch and scale products from ideation to market with expert PM frameworks",
    highlights: [
      "8-month comprehensive program covering the full product lifecycle from user research and ideation to launch, growth, and monetization strategies",
      "Work on live product case studies from companies like Airbnb, Spotify, and Uber — build a PM portfolio that stands out in interviews",
      "Earn certificates recognized by top tech companies and gain access to a global network of 3,000+ product leaders",
    ],
    duration: "8 Months",
    mode: "Online + Live Sessions",
    weeklyHours: "10-12 hrs",
    certificate: "Upon Completion",
    rating: 4.9,
    students: "3.2K",
    heroIcon: "Rocket",
    programHighlights: [
      { icon: "Users", title: "Real User Research", description: "Master user interviews, usability testing, and jobs-to-be-done framework with live research projects" },
      { icon: "LayoutDashboard", title: "Product Strategy", description: "Learn to define vision, set OKRs, prioritize roadmaps, and align stakeholders across the organization" },
      { icon: "LineChart", title: "Data-Driven Decisions", description: "Use SQL, Amplitude, and Mixpanel to drive product decisions with behavioral analytics and A/B testing" },
      { icon: "Code", title: "Technical Fluency", description: "Develop enough technical depth to collaborate effectively with engineering teams on APIs, system design, and trade-offs" },
      { icon: "Megaphone", title: "Go-to-Market Strategy", description: "Build comprehensive GTM plans, pricing strategies, and launch playbooks that maximize product adoption" },
      { icon: "Award", title: "PM Certification", description: "Earn a recognized Product Management certificate and prepare for interviews at FAANG companies" },
    ],
    aboutCourse: [
      "The Product Management Fundamentals to Advanced program is built for aspiring PMs and current practitioners who want to master the craft of building products that users love and businesses scale. You'll learn from former PMs at Google, Amazon, and Stripe who bring real product war stories into every session.",
      "This program doesn't just teach frameworks — it puts you in the seat of a PM with live product challenges, group sprints, and stakeholder roleplay simulations. You'll leave with a complete product playbook and portfolio that demonstrates your ability to think, communicate, and execute like a seasoned PM.",
      "From writing your first PRD to presenting a roadmap to a C-suite, every skill you develop here is immediately applicable. Our curriculum is designed to be ruthlessly practical, removing the fluff and focusing on what actually matters in real product roles.",
    ],
    directorQuote: {
      text: "Great product management is about making the right bets at the right time with limited information. This program teaches you the frameworks, the instincts, and the communication skills to do exactly that.",
      author: "Sarah Mitchell, Program Director & Former Google PM",
    },
    objectives: [
      { number: 1, title: "Define Product Vision & Strategy", description: "Craft compelling product visions, set measurable OKRs, and build north-star metrics that align the entire organization" },
      { number: 2, title: "Conduct User Research", description: "Design and execute user interviews, surveys, and usability studies to uncover genuine user needs and pain points" },
      { number: 3, title: "Prioritize & Build Roadmaps", description: "Apply frameworks like RICE, MoSCoW, and impact-effort matrices to make principled product prioritization decisions" },
      { number: 4, title: "Write Exceptional PRDs", description: "Document product requirements clearly for engineering, design, and stakeholders with structured specification templates" },
      { number: 5, title: "Launch & Measure Products", description: "Design and execute product launches, set up analytics, run A/B tests, and iterate based on data and user feedback" },
      { number: 6, title: "Lead Cross-Functional Teams", description: "Develop the influence, communication, and stakeholder management skills needed to align engineering, design, and business" },
    ],
    curriculum: [
      { number: 1, title: "PM Fundamentals & Mindset", duration: "3 weeks", modules: 6, subtopics: [{ title: "What PMs Do: Roles and Responsibilities" }, { title: "Product Thinking and Mental Models" }, { title: "The Product Lifecycle" }, { title: "Types of PMs: B2B, B2C, Platform, Growth" }] },
      { number: 2, title: "User Research & Discovery", duration: "4 weeks", modules: 8, subtopics: [{ title: "User Interview Design and Facilitation" }, { title: "Jobs-to-be-Done Framework" }, { title: "Competitive Analysis" }, { title: "Persona Development" }] },
      { number: 3, title: "Product Strategy & Vision", duration: "4 weeks", modules: 8, subtopics: [{ title: "Product Vision and Mission Statements" }, { title: "OKR Setting and Alignment" }, { title: "Market Sizing (TAM/SAM/SOM)" }, { title: "Competitive Positioning" }] },
      { number: 4, title: "Roadmapping & Prioritization", duration: "3 weeks", modules: 7, subtopics: [{ title: "Roadmap Formats and Tools" }, { title: "RICE and MoSCoW Frameworks" }, { title: "Stakeholder Alignment Workshops" }] },
      { number: 5, title: "Design & Prototyping", duration: "3 weeks", modules: 6, subtopics: [{ title: "UX Fundamentals for PMs" }, { title: "Figma Prototyping" }, { title: "Design Sprints" }] },
      { number: 6, title: "Metrics & Analytics", duration: "4 weeks", modules: 8, subtopics: [{ title: "North Star Metrics and KPIs" }, { title: "SQL for PMs" }, { title: "A/B Testing and Statistical Significance" }, { title: "Cohort Analysis and Retention" }] },
      { number: 7, title: "Go-to-Market & Launch", duration: "3 weeks", modules: 6, subtopics: [{ title: "GTM Strategy Frameworks" }, { title: "Pricing Strategy" }, { title: "Launch Playbook Creation" }] },
      { number: 8, title: "PM Interviews & Capstone", duration: "4 weeks", modules: 0, subtopics: [{ title: "FAANG PM Interview Prep" }, { title: "Product Design Interview Questions" }, { title: "Estimation Questions" }, { title: "Capstone Product Pitch" }] },
    ],
    targetAudience: [
      { icon: "Code", title: "Software Developers", description: "Engineers who want to transition from building to defining what gets built" },
      { icon: "Users", title: "Business Analysts", description: "BAs and consultants seeking to move into strategic product roles at tech companies" },
      { icon: "GraduationCap", title: "MBA Graduates", description: "Business school graduates targeting Associate PM or PM roles at top technology companies" },
      { icon: "Megaphone", title: "Marketing Professionals", description: "Marketers who understand customers deeply and want to apply that insight to product strategy" },
    ],
    examDetails: [
      { name: "Certified Product Manager (CPM)", provider: "AIPMM", passScore: "70%", prepIncluded: true },
      { name: "Product Management Certificate", provider: "Trust Axis", passScore: "80%", prepIncluded: true },
    ],
    toolsCovered: [
      { name: "Figma", icon: "Pen", category: "Design" },
      { name: "Jira", icon: "LayoutDashboard", category: "Planning" },
      { name: "Amplitude", icon: "Activity", category: "Analytics" },
      { name: "Mixpanel", icon: "BarChart2", category: "Analytics" },
      { name: "Notion", icon: "FileText", category: "Documentation" },
      { name: "SQL", icon: "Database", category: "Data" },
      { name: "Miro", icon: "Layers", category: "Collaboration" },
      { name: "Linear", icon: "CheckSquare", category: "Planning" },
    ],
  },
  {
    slug: "aws-cloud-architecture-program",
    category: "Cloud Computing",
    title: "AWS & Cloud Architecture Professional Program",
    subtitle: "Architect, deploy, and manage scalable cloud infrastructure on AWS",
    highlights: [
      "7-month program covering AWS core services, cloud architecture patterns, DevOps, and cloud security with 3 hands-on architecture projects",
      "Prepare for AWS Solutions Architect Professional and DevOps Engineer certifications with structured exam prep modules and practice exams",
      "Build and deploy real multi-tier applications on AWS with EC2, Lambda, RDS, and Kubernetes in a live AWS environment",
    ],
    duration: "7 Months",
    mode: "Online",
    weeklyHours: "14-16 hrs",
    certificate: "Upon Completion",
    rating: 4.7,
    students: "1.5K",
    heroIcon: "Cloud",
    programHighlights: [
      { icon: "Cloud", title: "Live AWS Environment", description: "Each student gets a sandboxed AWS account with $300 in credits to build and test architectures in a real cloud environment" },
      { icon: "Server", title: "Architecture Design", description: "Design high-availability, fault-tolerant, and cost-optimized architectures using AWS Well-Architected Framework principles" },
      { icon: "Award", title: "AWS Certifications", description: "Comprehensive preparation for AWS Solutions Architect (Associate & Professional) and DevOps Engineer certifications" },
      { icon: "Code", title: "Infrastructure as Code", description: "Master Terraform and AWS CloudFormation for automated, repeatable, and version-controlled infrastructure deployment" },
      { icon: "Shield", title: "Cloud Security", description: "Implement IAM, VPC security, encryption, and compliance controls following AWS security best practices" },
      { icon: "BarChart2", title: "Cost Optimization", description: "Learn to monitor, analyze, and reduce AWS costs using Cost Explorer, Trusted Advisor, and reserved instance strategies" },
    ],
    aboutCourse: [
      "The AWS & Cloud Architecture Professional Program is an intensive, hands-on program that takes you from cloud fundamentals to enterprise-grade architecture design. You'll work directly in AWS environments, deploying real workloads and solving architectural challenges across compute, storage, networking, and database services.",
      "Our curriculum is structured around the AWS Well-Architected Framework's five pillars — operational excellence, security, reliability, performance efficiency, and cost optimization. Every module connects theory to practice through guided labs, architectural case studies, and production-simulation exercises.",
      "Graduates leave with multiple AWS certifications, a portfolio of deployed cloud solutions, and the architectural thinking skills needed to lead cloud transformation initiatives in any organization.",
    ],
    directorQuote: {
      text: "Cloud architecture is not just about knowing which AWS service to use — it's about understanding the trade-offs and designing systems that are resilient, secure, and cost-effective at scale.",
      author: "David Kumar, Program Director & AWS Certified Solutions Architect",
    },
    objectives: [
      { number: 1, title: "Design Scalable Cloud Architectures", description: "Apply AWS Well-Architected Framework principles to design highly available, scalable, and resilient systems" },
      { number: 2, title: "Deploy Core AWS Services", description: "Configure and manage EC2, S3, RDS, Lambda, VPC, CloudFront, and 30+ additional AWS services" },
      { number: 3, title: "Implement DevOps Pipelines", description: "Build CI/CD pipelines with AWS CodePipeline, CodeBuild, CodeDeploy, and integrate with GitHub Actions" },
      { number: 4, title: "Secure Cloud Infrastructure", description: "Implement IAM policies, VPC security groups, NACLs, AWS WAF, and encryption at rest and in transit" },
      { number: 5, title: "Manage Containerized Workloads", description: "Deploy and orchestrate containers with Amazon ECS, EKS, and Kubernetes for microservices architectures" },
      { number: 6, title: "Optimize Cloud Costs", description: "Analyze spending with Cost Explorer, right-size resources, utilize reserved and spot instances, and set budget alerts" },
    ],
    curriculum: [
      { number: 1, title: "Cloud Fundamentals & AWS Basics", duration: "3 weeks", modules: 7, subtopics: [{ title: "Cloud Computing Models (IaaS, PaaS, SaaS)" }, { title: "AWS Global Infrastructure" }, { title: "IAM: Users, Groups, Roles, Policies" }, { title: "EC2 Instance Types and Pricing" }] },
      { number: 2, title: "Networking & VPC Design", duration: "4 weeks", modules: 8, subtopics: [{ title: "VPC Design and Subnetting" }, { title: "Route Tables, NAT Gateways, Internet Gateways" }, { title: "Security Groups and NACLs" }, { title: "Hybrid Connectivity: VPN and Direct Connect" }] },
      { number: 3, title: "Compute & Serverless", duration: "4 weeks", modules: 8, subtopics: [{ title: "Auto Scaling Groups and Load Balancers" }, { title: "AWS Lambda and Event-Driven Architecture" }, { title: "API Gateway" }, { title: "Elastic Beanstalk" }] },
      { number: 4, title: "Storage & Databases", duration: "4 weeks", modules: 9, subtopics: [{ title: "S3 Storage Classes and Lifecycle Policies" }, { title: "RDS Multi-AZ and Read Replicas" }, { title: "DynamoDB Design Patterns" }, { title: "ElastiCache and DAX" }] },
      { number: 5, title: "DevOps & CI/CD on AWS", duration: "4 weeks", modules: 8, subtopics: [{ title: "CodeCommit, CodeBuild, CodeDeploy" }, { title: "AWS CodePipeline" }, { title: "Infrastructure as Code with CloudFormation" }, { title: "Terraform for AWS" }] },
      { number: 6, title: "Containers & Kubernetes", duration: "4 weeks", modules: 8, subtopics: [{ title: "Docker Fundamentals" }, { title: "Amazon ECS and Fargate" }, { title: "Amazon EKS (Kubernetes on AWS)" }, { title: "Service Mesh with App Mesh" }] },
      { number: 7, title: "Monitoring, Security & Cost", duration: "3 weeks", modules: 6, subtopics: [{ title: "CloudWatch, X-Ray, CloudTrail" }, { title: "AWS WAF and Shield" }, { title: "Cost Explorer and Trusted Advisor" }] },
      { number: 8, title: "Certification Prep & Capstone", duration: "4 weeks", modules: 0, subtopics: [{ title: "Solutions Architect Associate Exam Prep" }, { title: "Solutions Architect Professional Exam Prep" }, { title: "Multi-Tier Application Architecture Project" }] },
    ],
    targetAudience: [
      { icon: "Server", title: "System Administrators", description: "On-prem sysadmins looking to transition to cloud infrastructure management" },
      { icon: "Code", title: "DevOps Engineers", description: "DevOps practitioners wanting to deepen AWS expertise and earn professional certifications" },
      { icon: "GraduationCap", title: "IT Graduates", description: "Computer science graduates targeting cloud engineering and solutions architect roles" },
      { icon: "Shield", title: "Security Engineers", description: "Security professionals seeking to understand and implement cloud security architecture" },
    ],
    examDetails: [
      { name: "AWS Solutions Architect Associate", provider: "Amazon Web Services", passScore: "72%", prepIncluded: true },
      { name: "AWS Solutions Architect Professional", provider: "Amazon Web Services", passScore: "75%", prepIncluded: true },
      { name: "AWS DevOps Engineer Professional", provider: "Amazon Web Services", passScore: "75%", prepIncluded: false },
    ],
    toolsCovered: [
      { name: "AWS Console", icon: "Cloud", category: "Platform" },
      { name: "Terraform", icon: "Code", category: "IaC" },
      { name: "CloudFormation", icon: "Layers", category: "IaC" },
      { name: "Docker", icon: "Box", category: "Containers" },
      { name: "Kubernetes", icon: "Cog", category: "Orchestration" },
      { name: "GitHub Actions", icon: "GitBranch", category: "CI/CD" },
      { name: "CloudWatch", icon: "Activity", category: "Monitoring" },
      { name: "AWS CLI", icon: "Terminal", category: "CLI" },
    ],
  },
  {
    slug: "ml-engineering-program",
    category: "AI & ML",
    title: "Machine Learning Engineering Program",
    subtitle: "Build, deploy, and scale production ML systems with MLOps best practices",
    highlights: [
      "9-month specialized program for engineers who want to build not just models, but production-ready ML systems that scale to millions of users",
      "Master the entire ML engineering stack: data pipelines, model training, serving infrastructure, monitoring, and automated retraining workflows",
      "Collaborate with senior ML engineers from Meta, Netflix, and Uber on real capstone projects deployed to production cloud environments",
    ],
    duration: "9 Months",
    mode: "Online + Mentorship",
    weeklyHours: "16-20 hrs",
    certificate: "Upon Completion",
    rating: 4.8,
    students: "980",
    heroIcon: "Brain",
    programHighlights: [
      { icon: "Cpu", title: "Production ML Systems", description: "Design and implement ML systems that handle real-time inference at scale using TensorFlow Serving, Triton, and Ray" },
      { icon: "Database", title: "Feature Stores & Data Pipelines", description: "Build robust data pipelines with Apache Kafka, Airflow, and Feast feature store for consistent ML feature serving" },
      { icon: "Award", title: "MLOps Certification", description: "Earn a professional MLOps certification and prepare for Google Professional ML Engineer and AWS ML Specialty exams" },
      { icon: "Activity", title: "Model Monitoring", description: "Implement drift detection, model performance monitoring, and automated retraining systems using Evidently and Prometheus" },
      { icon: "GitBranch", title: "ML Pipelines", description: "Build automated ML training and deployment pipelines with Kubeflow, MLflow, and GitHub Actions" },
      { icon: "Users", title: "Engineering Mentors", description: "Weekly 1-on-1 mentorship sessions with senior ML engineers who've built recommendation systems, fraud detection, and NLP at scale" },
    ],
    aboutCourse: [
      "The Machine Learning Engineering Program bridges the gap between data science research and production software engineering. Many data scientists can build models — far fewer can build systems that reliably serve those models at scale, monitor them in production, and retrain them automatically when performance degrades.",
      "This program is built around that gap. You'll master the engineering disciplines that turn experimental notebooks into robust, scalable ML systems: distributed training, model serving, feature stores, data validation, CI/CD for ML, and observability.",
      "By the end of this program, you'll be able to design and implement the full ML system stack, from data ingestion to model serving, monitoring, and automated retraining. You'll have deployed multiple production systems and earned the credentials that top ML engineering teams look for.",
    ],
    directorQuote: {
      text: "The difference between a good data scientist and a great ML engineer is the ability to build systems that are reliable, scalable, and maintainable. This program teaches you exactly that.",
      author: "Dr. Lisa Thompson, Program Director & Former ML Lead at Netflix",
    },
    objectives: [
      { number: 1, title: "Design ML System Architecture", description: "Architect end-to-end ML systems including data pipelines, training infrastructure, and model serving layers" },
      { number: 2, title: "Build Scalable Data Pipelines", description: "Implement batch and streaming data pipelines with Apache Kafka, Spark, and Airflow for reliable feature engineering" },
      { number: 3, title: "Optimize Model Training at Scale", description: "Apply distributed training, mixed-precision training, and hyperparameter optimization across GPU/TPU clusters" },
      { number: 4, title: "Deploy & Serve ML Models", description: "Package models as REST and gRPC APIs, implement A/B testing for models, and manage model versioning in production" },
      { number: 5, title: "Monitor Model Performance", description: "Detect data drift, concept drift, and model degradation using statistical tests and automated alerting systems" },
      { number: 6, title: "Implement MLOps Practices", description: "Build CI/CD pipelines for ML, automate retraining workflows, implement model governance, and manage technical debt" },
    ],
    curriculum: [
      { number: 1, title: "ML Engineering Foundations", duration: "3 weeks", modules: 7, subtopics: [{ title: "Software Engineering for ML" }, { title: "ML System Design Principles" }, { title: "Python Engineering Best Practices" }, { title: "Version Control for ML with DVC" }] },
      { number: 2, title: "Data Engineering for ML", duration: "5 weeks", modules: 10, subtopics: [{ title: "Apache Kafka for Real-Time Data" }, { title: "Apache Spark for Batch Processing" }, { title: "Apache Airflow for Pipeline Orchestration" }, { title: "Feature Stores with Feast" }] },
      { number: 3, title: "Advanced ML & Deep Learning", duration: "5 weeks", modules: 10, subtopics: [{ title: "Distributed Training with Horovod" }, { title: "Neural Architecture Search" }, { title: "Foundation Models and Fine-Tuning" }, { title: "Efficient Inference: Quantization and Pruning" }] },
      { number: 4, title: "Model Serving Infrastructure", duration: "5 weeks", modules: 10, subtopics: [{ title: "FastAPI and gRPC Model Serving" }, { title: "TensorFlow Serving and Triton" }, { title: "Model Versioning and A/B Testing" }, { title: "Latency Optimization Techniques" }] },
      { number: 5, title: "MLOps & Pipeline Automation", duration: "5 weeks", modules: 10, subtopics: [{ title: "MLflow for Experiment Tracking" }, { title: "Kubeflow Pipelines" }, { title: "CI/CD for ML with GitHub Actions" }, { title: "Automated Retraining Workflows" }] },
      { number: 6, title: "Model Monitoring & Observability", duration: "4 weeks", modules: 8, subtopics: [{ title: "Data Drift and Concept Drift Detection" }, { title: "Evidently for Model Monitoring" }, { title: "Prometheus and Grafana Dashboards" }, { title: "Alerting and Incident Response for ML" }] },
      { number: 7, title: "LLMs & GenAI Engineering", duration: "4 weeks", modules: 8, subtopics: [{ title: "LLM Fine-Tuning and RLHF" }, { title: "RAG System Architecture" }, { title: "Prompt Engineering at Scale" }, { title: "LLM Evaluation and Safety" }] },
      { number: 8, title: "Capstone ML System Build", duration: "4 weeks", modules: 0, subtopics: [{ title: "End-to-End ML System Design" }, { title: "Production Deployment and Monitoring Setup" }, { title: "Google Professional ML Engineer Exam Prep" }] },
    ],
    targetAudience: [
      { icon: "Code", title: "Senior Software Engineers", description: "Strong engineers who want to specialize in ML system design and MLOps practices" },
      { icon: "Brain", title: "Data Scientists", description: "Data scientists who build great models but want to learn to deploy and scale them effectively" },
      { icon: "Database", title: "Data Engineers", description: "Data engineers looking to extend their skills into the ML feature engineering and pipeline automation space" },
      { icon: "GraduationCap", title: "ML Researchers", description: "Academic ML researchers transitioning into industry who need production engineering skills" },
    ],
    examDetails: [
      { name: "Google Professional ML Engineer", provider: "Google Cloud", passScore: "70%", prepIncluded: true },
      { name: "AWS Machine Learning Specialty", provider: "Amazon Web Services", passScore: "72%", prepIncluded: true },
    ],
    toolsCovered: [
      { name: "MLflow", icon: "Activity", category: "MLOps" },
      { name: "Kubeflow", icon: "Cog", category: "Pipelines" },
      { name: "Apache Kafka", icon: "Zap", category: "Streaming" },
      { name: "Apache Airflow", icon: "Wind", category: "Orchestration" },
      { name: "TensorFlow", icon: "Brain", category: "Training" },
      { name: "PyTorch", icon: "Flame", category: "Training" },
      { name: "Kubernetes", icon: "Box", category: "Infra" },
      { name: "Prometheus", icon: "Bell", category: "Monitoring" },
      { name: "Feast", icon: "Database", category: "Feature Store" },
      { name: "Evidently", icon: "BarChart2", category: "Monitoring" },
    ],
  },
  {
    slug: "digital-marketing-analytics-program",
    category: "Business",
    title: "Digital Marketing Analytics & Growth Strategy",
    subtitle: "Master data-driven marketing, growth hacking, and marketing automation",
    highlights: [
      "5-month program combining marketing strategy with analytics, covering SEO, paid media, email, social, and marketing automation platforms",
      "Build and run live marketing campaigns with real ad budgets on Google Ads, Meta Ads, and LinkedIn — analyze and optimize real results",
      "Earn Google Analytics 4, Google Ads, and HubSpot Marketing certifications as part of the program curriculum",
    ],
    duration: "5 Months",
    mode: "Online",
    weeklyHours: "8-10 hrs",
    certificate: "Upon Completion",
    rating: 4.6,
    students: "4.1K",
    heroIcon: "Megaphone",
    programHighlights: [
      { icon: "BarChart2", title: "Live Campaign Management", description: "Run real campaigns with provided ad budgets on Google, Meta, and LinkedIn — learn from actual performance data" },
      { icon: "Search", title: "Advanced SEO & Content", description: "Master technical SEO, content strategy, link building, and SEO analytics to drive sustainable organic growth" },
      { icon: "Award", title: "5 Industry Certifications", description: "Earn GA4, Google Ads, HubSpot, Meta Blueprint, and LinkedIn Marketing certifications as part of the curriculum" },
      { icon: "Mail", title: "Email & Automation", description: "Build automated customer journeys, lifecycle email campaigns, and lead nurturing sequences in HubSpot and Klaviyo" },
      { icon: "LineChart", title: "Growth Analytics", description: "Implement attribution modeling, cohort analysis, and funnel optimization to maximize marketing ROI" },
      { icon: "Users", title: "Community of Marketers", description: "Join a network of 8,000+ marketing professionals across 40+ countries for peer learning and career opportunities" },
    ],
    aboutCourse: [
      "The Digital Marketing Analytics & Growth Strategy program is designed for marketers who want to make the leap from intuition-based to data-driven marketing. You'll master the full growth stack — from acquisition and activation to retention and revenue — using analytics to guide every decision.",
      "What sets this program apart is its emphasis on doing, not just learning. You'll run live campaigns, manage real ad spend, build actual marketing automation workflows, and analyze genuine data — not hypothetical exercises in a vacuum.",
      "By the end, you'll have a comprehensive digital marketing portfolio, multiple industry certifications, and the analytical mindset that separates elite marketers from the rest.",
    ],
    directorQuote: {
      text: "Marketing without analytics is like sailing without a compass. This program equips you with the data skills and strategic frameworks to navigate every channel with confidence.",
      author: "Jennifer Park, Program Director & Former CMO",
    },
    objectives: [
      { number: 1, title: "Build & Execute Marketing Strategy", description: "Develop integrated multi-channel marketing strategies aligned to business goals, customer personas, and competitive positioning" },
      { number: 2, title: "Master Paid Performance Marketing", description: "Set up, manage, and optimize Google Ads, Meta Ads, and LinkedIn campaigns with advanced bidding and targeting strategies" },
      { number: 3, title: "Drive Organic Growth with SEO", description: "Conduct technical SEO audits, build content strategies, execute link building, and track rankings with data-driven processes" },
      { number: 4, title: "Analyze Marketing Performance", description: "Implement GA4, build custom dashboards, apply attribution modeling, and generate insights that drive ROI improvements" },
      { number: 5, title: "Automate Customer Journeys", description: "Design and implement marketing automation workflows, email sequences, and CRM integrations for scalable personalization" },
      { number: 6, title: "Optimize Conversion Funnels", description: "Run A/B tests, analyze heatmaps and session recordings, and systematically remove friction from the conversion funnel" },
    ],
    curriculum: [
      { number: 1, title: "Marketing Strategy & Foundations", duration: "2 weeks", modules: 5, subtopics: [{ title: "Digital Marketing Ecosystem Overview" }, { title: "Customer Persona Development" }, { title: "Competitor Analysis Framework" }, { title: "Channel Strategy and Budget Allocation" }] },
      { number: 2, title: "SEO & Content Marketing", duration: "4 weeks", modules: 9, subtopics: [{ title: "Technical SEO Fundamentals" }, { title: "Keyword Research with Semrush & Ahrefs" }, { title: "Content Strategy and Editorial Planning" }, { title: "Link Building Strategies" }] },
      { number: 3, title: "Paid Media & Performance", duration: "4 weeks", modules: 9, subtopics: [{ title: "Google Search & Display Campaigns" }, { title: "Meta Ads (Facebook & Instagram)" }, { title: "LinkedIn Campaign Manager" }, { title: "Programmatic Advertising Basics" }] },
      { number: 4, title: "Analytics & Attribution", duration: "4 weeks", modules: 8, subtopics: [{ title: "Google Analytics 4 Setup and Configuration" }, { title: "Custom Dimensions and Events" }, { title: "Attribution Modeling" }, { title: "Looker Studio Dashboard Creation" }] },
      { number: 5, title: "Email & Marketing Automation", duration: "3 weeks", modules: 7, subtopics: [{ title: "Email Marketing Best Practices" }, { title: "HubSpot Workflows and Sequences" }, { title: "Klaviyo for E-commerce" }] },
      { number: 6, title: "Social Media & Influencer Marketing", duration: "2 weeks", modules: 5, subtopics: [{ title: "Organic Social Media Strategy" }, { title: "Influencer Partnership Models" }, { title: "Social Media Analytics" }] },
      { number: 7, title: "CRO & Growth Hacking", duration: "2 weeks", modules: 5, subtopics: [{ title: "A/B Testing with Optimizely" }, { title: "Landing Page Optimization" }, { title: "Growth Hacking Frameworks" }] },
      { number: 8, title: "Certification Prep & Capstone", duration: "3 weeks", modules: 0, subtopics: [{ title: "Google Analytics 4 Exam Prep" }, { title: "Google Ads Certification" }, { title: "Marketing Campaign Capstone" }] },
    ],
    targetAudience: [
      { icon: "Megaphone", title: "Marketing Professionals", description: "Traditional marketers wanting to build data analytics and performance marketing skills" },
      { icon: "Briefcase", title: "Entrepreneurs", description: "Startup founders and small business owners who want to drive growth with limited budgets" },
      { icon: "GraduationCap", title: "Marketing Graduates", description: "Recent marketing graduates who want practical, job-ready skills to stand out in the job market" },
      { icon: "Users", title: "Content Creators", description: "Content creators and social media managers looking to monetize and scale their audience" },
    ],
    examDetails: [
      { name: "Google Analytics 4 Certification", provider: "Google", passScore: "80%", prepIncluded: true },
      { name: "Google Ads Search Certification", provider: "Google", passScore: "80%", prepIncluded: true },
      { name: "HubSpot Marketing Certification", provider: "HubSpot", passScore: "75%", prepIncluded: true },
    ],
    toolsCovered: [
      { name: "Google Analytics 4", icon: "BarChart2", category: "Analytics" },
      { name: "Google Ads", icon: "Megaphone", category: "Paid Media" },
      { name: "Meta Ads Manager", icon: "Globe", category: "Paid Media" },
      { name: "HubSpot", icon: "Mail", category: "CRM/Automation" },
      { name: "Semrush", icon: "Search", category: "SEO" },
      { name: "Ahrefs", icon: "Link", category: "SEO" },
      { name: "Klaviyo", icon: "Send", category: "Email" },
      { name: "Looker Studio", icon: "PieChart", category: "Reporting" },
    ],
  },
  {
    slug: "full-stack-development-program",
    category: "Technology",
    title: "Full Stack Web Development Bootcamp",
    subtitle: "Build modern web applications from frontend to backend with React and Node.js",
    highlights: [
      "12-month intensive bootcamp covering HTML/CSS, JavaScript, React, Node.js, databases, APIs, and cloud deployment — from zero to full-stack",
      "Build 8+ real-world projects including a social app, e-commerce platform, and SaaS product that you own and can showcase to employers",
      "Career services team with a track record of placing 94% of graduates in developer roles within 6 months of graduation",
    ],
    duration: "12 Months",
    mode: "Online + Live Coding Sessions",
    weeklyHours: "20-25 hrs",
    certificate: "Upon Completion",
    rating: 4.9,
    students: "5.4K",
    heroIcon: "Code",
    programHighlights: [
      { icon: "Code", title: "Modern Tech Stack", description: "Master React 19, Next.js, TypeScript, Node.js, Express, PostgreSQL, MongoDB, and Redis — the exact stack used by top companies" },
      { icon: "GitBranch", title: "Real Project Portfolio", description: "Build 8+ complete, deployed projects that demonstrate real-world development skills to employers and freelance clients" },
      { icon: "Users", title: "Collaborative Learning", description: "Work in agile teams on group projects, code review sessions, and pair programming — just like in a real engineering team" },
      { icon: "Briefcase", title: "Job Placement Support", description: "Resume review, technical interview coaching, take-home challenge prep, and direct referrals to our 200+ hiring partner companies" },
      { icon: "Award", title: "Industry Certification", description: "Earn a Trust Axis Full Stack Developer certification recognized by our hiring partner network" },
      { icon: "Smartphone", title: "Mobile Development", description: "Learn React Native to build iOS and Android apps from your existing React knowledge — one codebase, two platforms" },
    ],
    aboutCourse: [
      "The Full Stack Web Development Bootcamp is an intensive, project-based program that takes you from absolute beginner to job-ready full stack developer. Whether you've written no code before or have some experience you want to formalize, this program provides the structured curriculum and hands-on practice to make you a confident, hireable developer.",
      "Every week you'll be building — not just watching videos or reading documentation. From week one, you're writing code. By the end of the program, you'll have an impressive portfolio of 8+ deployed applications and the deep understanding of both frontend and backend development that employers demand.",
      "Our teaching methodology is built on learning by doing, collaborative problem-solving, and working with the same tools and workflows that professional engineering teams use every day. You'll graduate understanding not just how to write code, but how to think like a software engineer.",
    ],
    directorQuote: {
      text: "The best way to learn to code is to code — a lot, on real projects, with real feedback. This program is ruthlessly focused on building skills through practice, not theory.",
      author: "Alex Chen, Program Director & Senior Software Engineer",
    },
    objectives: [
      { number: 1, title: "Build Frontend User Interfaces", description: "Create responsive, interactive web UIs with HTML, CSS, JavaScript, React 19, and TypeScript following modern best practices" },
      { number: 2, title: "Develop Backend APIs", description: "Design and build RESTful and GraphQL APIs with Node.js, Express, authentication, and robust error handling" },
      { number: 3, title: "Work with Databases", description: "Design schemas and write queries for PostgreSQL, implement NoSQL data models with MongoDB, and use Redis for caching" },
      { number: 4, title: "Deploy & Scale Applications", description: "Deploy applications to AWS, Vercel, and Railway — implement CI/CD pipelines, environment management, and monitoring" },
      { number: 5, title: "Write Clean, Maintainable Code", description: "Apply software engineering principles: SOLID, DRY, testing, code review, and documentation for professional-grade codebases" },
      { number: 6, title: "Collaborate in Agile Teams", description: "Work with Git, GitHub, Jira, and agile workflows — code review, pair programming, and sprint planning just like real teams" },
    ],
    curriculum: [
      { number: 1, title: "Web Fundamentals", duration: "4 weeks", modules: 8, subtopics: [{ title: "HTML5 Semantic Markup" }, { title: "CSS3 and Flexbox/Grid Layouts" }, { title: "Responsive Web Design" }, { title: "JavaScript Fundamentals" }] },
      { number: 2, title: "Advanced JavaScript & TypeScript", duration: "4 weeks", modules: 8, subtopics: [{ title: "ES6+ Features and Async/Await" }, { title: "TypeScript Fundamentals" }, { title: "Data Structures and Algorithms" }, { title: "Browser APIs and DOM Manipulation" }] },
      { number: 3, title: "React & Modern Frontend", duration: "6 weeks", modules: 12, subtopics: [{ title: "React Components and Hooks" }, { title: "State Management with Zustand/Redux" }, { title: "Next.js App Router" }, { title: "Testing with Vitest and React Testing Library" }] },
      { number: 4, title: "Backend with Node.js", duration: "5 weeks", modules: 10, subtopics: [{ title: "Node.js Core APIs" }, { title: "Express.js REST API Design" }, { title: "Authentication with JWT and OAuth" }, { title: "File Uploads and Email APIs" }] },
      { number: 5, title: "Databases & Data Modeling", duration: "4 weeks", modules: 8, subtopics: [{ title: "PostgreSQL and SQL Fundamentals" }, { title: "MongoDB and Document Modeling" }, { title: "Prisma ORM" }, { title: "Redis Caching Strategies" }] },
      { number: 6, title: "DevOps & Deployment", duration: "3 weeks", modules: 6, subtopics: [{ title: "Git, GitHub, and Pull Request Workflow" }, { title: "Docker Basics" }, { title: "Deploying to AWS and Vercel" }] },
      { number: 7, title: "React Native Mobile", duration: "4 weeks", modules: 8, subtopics: [{ title: "React Native Fundamentals" }, { title: "Expo and Native APIs" }, { title: "Navigation and State Management" }, { title: "Publishing to App Store and Play Store" }] },
      { number: 8, title: "Capstone Project & Job Prep", duration: "6 weeks", modules: 0, subtopics: [{ title: "Full-Stack Capstone Application" }, { title: "Technical Interview Prep: DSA" }, { title: "System Design Interviews" }, { title: "Portfolio Review and Job Applications" }] },
    ],
    targetAudience: [
      { icon: "GraduationCap", title: "Career Changers", description: "Professionals from any background who want to transition into software engineering and tech" },
      { icon: "Users", title: "Beginner Coders", description: "Those with minimal coding experience who want a structured, intensive path to becoming a professional developer" },
      { icon: "Briefcase", title: "Entrepreneurs", description: "Founders who want to build their own products and not be dependent on hiring developers for every change" },
      { icon: "Code", title: "Junior Developers", description: "Self-taught developers who want to formalize their knowledge and fill gaps in their full-stack skill set" },
    ],
    examDetails: [
      { name: "Trust Axis Full Stack Developer Certificate", provider: "Trust Axis", passScore: "80%", prepIncluded: true },
    ],
    toolsCovered: [
      { name: "React", icon: "Code", category: "Frontend" },
      { name: "Next.js", icon: "Globe", category: "Framework" },
      { name: "Node.js", icon: "Server", category: "Backend" },
      { name: "PostgreSQL", icon: "Database", category: "Database" },
      { name: "MongoDB", icon: "Layers", category: "Database" },
      { name: "TypeScript", icon: "FileCode", category: "Language" },
      { name: "Docker", icon: "Box", category: "DevOps" },
      { name: "Git", icon: "GitBranch", category: "Version Control" },
      { name: "Redis", icon: "Zap", category: "Cache" },
      { name: "AWS", icon: "Cloud", category: "Cloud" },
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: string): Course[] {
  if (category === "All") return courses;
  return courses.filter((c) => c.category === category);
}

export const categories = [
  "All",
  "Cybersecurity",
  "Data Science",
  "Business",
  "Cloud Computing",
  "AI & ML",
  "Technology",
];
