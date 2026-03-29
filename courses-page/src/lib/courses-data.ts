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

export const courses: Course[] = [
  {
    slug: "cdpse",
    category: "Cybersecurity",
    title: "CDPSE – Certified Data Privacy Solutions Engineer",
    subtitle: "Focuses on data privacy governance, privacy program implementation, and data protection.",
    highlights: [
      "Focuses on data privacy governance, privacy program implementation, and data protection.",
      "Covers privacy frameworks, data protection regulations, and privacy engineering.",
      "Helps professionals implement privacy programs and data protection controls."
    ],
    duration: "Flexible",
    mode: "Online / Hybrid",
    weeklyHours: "10-15 hrs",
    certificate: "Upon Completion",
    rating: 4.8,
    students: "1.2K",
    thumbnailUrl: "/images/courses/cdpse.webp",
    programHighlights: [
      { icon: "Shield", title: "Data Privacy Governance Training", description: "Comprehensive training on data privacy governance." },
      { icon: "Briefcase", title: "Privacy Program Implementation", description: "Learn how to implement privacy programs effectively." },
      { icon: "Lock", title: "Data Protection and Privacy Engineering", description: "Understand data protection and privacy engineering." },
      { icon: "Activity", title: "Privacy Risk Management", description: "Learn how to manage privacy risks." },
      { icon: "CheckSquare", title: "Regulatory Compliance Training", description: "Training on regulatory compliance." },
      { icon: "Award", title: "Globally Recognized Privacy Certification", description: "Earn a globally recognized privacy certification." }
    ],
    aboutCourse: [
      "The CDPSE course focuses on data privacy governance, privacy program implementation, and data protection strategies. It covers privacy frameworks, regulatory compliance, privacy engineering, and data protection controls."
    ],
    directorQuote: {
      text: "This program is designed for professionals who are serious about data privacy and protection.",
      author: "Trust Axis Leadership"
    },
    objectives: [
      { number: 1, title: "Implement Data Privacy Programs", description: "Learn how to implement data privacy programs." },
      { number: 2, title: "Manage Privacy Risks", description: "Learn how to manage privacy risks." },
      { number: 3, title: "Ensure Data Protection Compliance", description: "Learn how to ensure data protection compliance." },
      { number: 4, title: "Implement Privacy Controls", description: "Learn how to implement privacy controls." },
      { number: 5, title: "Manage Personal Data Protection", description: "Learn how to manage personal data protection." },
      { number: 6, title: "Develop Privacy Governance Frameworks", description: "Learn how to develop privacy governance frameworks." }
    ],
    curriculum: [
      { number: 1, title: "Privacy Governance", duration: "Flexible", modules: 3, subtopics: [{ title: "Privacy Frameworks" }, { title: "Privacy Policies" }, { title: "Governance Structure" }] },
      { number: 2, title: "Privacy Risk Management", duration: "Flexible", modules: 3, subtopics: [{ title: "Privacy Risk Assessment" }, { title: "Risk Mitigation" }, { title: "Monitoring" }] },
      { number: 3, title: "Privacy Engineering", duration: "Flexible", modules: 3, subtopics: [{ title: "Data Protection Controls" }, { title: "Encryption" }, { title: "Access Control" }] },
      { number: 4, title: "Compliance", duration: "Flexible", modules: 3, subtopics: [{ title: "GDPR" }, { title: "Data Protection Laws" }, { title: "Privacy Audits" }] }
    ],
    targetAudience: [
      { icon: "Users", title: "IT Professionals", description: "IT professionals looking to specialize in data privacy." },
      { icon: "Briefcase", title: "Privacy Officers", description: "Privacy officers aiming to enhance their skills." }
    ],
    examDetails: [
      { name: "CDPSE Certification Exam", provider: "ISACA", passScore: "450/800", prepIncluded: true }
    ],
    toolsCovered: [
      { name: "GDPR", icon: "BookOpen", category: "Framework" },
      { name: "Data Privacy Frameworks", icon: "Layers", category: "Framework" },
      { name: "Privacy Risk Framework", icon: "Activity", category: "Framework" },
      { name: "Data Protection Controls", icon: "Lock", category: "Controls" },
      { name: "Privacy Governance Framework", icon: "Shield", category: "Governance" }
    ],
  },
  {
    slug: "iso-20000",
    category: "Business",
    title: "ISO/IEC 20000 Lead Implementer",
    subtitle: "Focuses on IT Service Management Systems implementation.",
    highlights: [
      "Focuses on IT Service Management Systems implementation.",
      "Covers IT service delivery, incident management, and service improvement.",
      "Helps implement ISO 20000 compliant IT service management systems."
    ],
    duration: "Flexible",
    mode: "Online / Hybrid",
    weeklyHours: "10-15 hrs",
    certificate: "Upon Completion",
    rating: 4.7,
    students: "1.1K",
    programHighlights: [
      { icon: "Layers", title: "IT Service Management System Implementation", description: "Learn to implement IT Service Management Systems." },
      { icon: "Activity", title: "IT Service Delivery and Operations Management", description: "Manage IT service delivery and operations efficiently." },
      { icon: "AlertTriangle", title: "Incident and Problem Management Training", description: "Comprehensive training on incident and problem management." },
      { icon: "Network", title: "ITSM Framework Integration", description: "Learn to integrate ITSM frameworks effectively." },
      { icon: "Award", title: "Globally Recognized ITSM Certification", description: "Earn a globally recognized ITSM certification." },
      { icon: "TrendingUp", title: "Service Improvement and Governance Training", description: "Training on service improvement and governance." }
    ],
    aboutCourse: [
      "The ISO 20000 Lead Implementer course focuses on implementing IT Service Management Systems and improving IT service delivery."
    ],
    directorQuote: {
      text: "This program is essential for professionals aiming to standardize IT services.",
      author: "Trust Axis Leadership"
    },
    objectives: [
      { number: 1, title: "Implement ITSMS Framework", description: "Learn to implement ITSMS framework." },
      { number: 2, title: "Manage IT Services", description: "Learn to manage IT services effectively." },
      { number: 3, title: "Implement Incident Management", description: "Learn to implement incident management processes." },
      { number: 4, title: "Improve IT Services", description: "Focus on continuous improvement of IT services." },
      { number: 5, title: "Ensure Compliance", description: "Ensure compliance with ISO 20000 standards." },
      { number: 6, title: "Integrate IT Governance Frameworks", description: "Integrate IT governance frameworks seamlessly." }
    ],
    curriculum: [
      { number: 1, title: "ITSMS Fundamentals", duration: "Flexible", modules: 3, subtopics: [{ title: "ISO 20000 Overview" }, { title: "ITSMS Scope" }, { title: "Service Management" }] },
      { number: 2, title: "Service Management Processes", duration: "Flexible", modules: 3, subtopics: [{ title: "Incident Management" }, { title: "Problem Management" }, { title: "Change Management" }] },
      { number: 3, title: "Service Delivery", duration: "Flexible", modules: 3, subtopics: [{ title: "Service Level Management" }, { title: "Service Reporting" }, { title: "Service Monitoring" }] },
      { number: 4, title: "Continuous Improvement", duration: "Flexible", modules: 3, subtopics: [{ title: "Service Improvement" }, { title: "Audits" }, { title: "Compliance" }] }
    ],
    targetAudience: [
      { icon: "Users", title: "IT Managers", description: "IT Managers responsible for service delivery." },
      { icon: "CheckSquare", title: "Quality Consultants", description: "Consultants focusing on IT service quality." }
    ],
    examDetails: [
      { name: "ISO 20000 Lead Implementer Exam", provider: "PECB", passScore: "70%", prepIncluded: true }
    ],
    toolsCovered: [
      { name: "ISO 20000", icon: "BookOpen", category: "Standard" },
      { name: "ITIL", icon: "Layers", category: "Framework" },
      { name: "COBIT", icon: "Shield", category: "Framework" },
      { name: "IT Service Management Framework", icon: "Network", category: "Framework" }
    ],
  },
  {
    slug: "cism",
    category: "Cybersecurity",
    title: "CISM – Certified Information Security Manager",
    subtitle: "Focuses on security governance, risk management, and security program management.",
    highlights: [
      "Focuses on security governance, risk management, and security program management.",
      "Designed for cybersecurity leaders and managers.",
      "Helps professionals manage enterprise security programs."
    ],
    duration: "Flexible",
    mode: "Online / Hybrid",
    weeklyHours: "10-15 hrs",
    certificate: "Upon Completion",
    rating: 4.8,
    students: "1.5K",
    thumbnailUrl: "/images/courses/cism.png",
    programHighlights: [
      { icon: "Shield", title: "Security Governance Training", description: "Training on security governance principles." },
      { icon: "Activity", title: "Risk Management and Compliance", description: "Learn risk management and compliance best practices." },
      { icon: "Briefcase", title: "Security Program Management", description: "Manage enterprise-wide security programs." },
      { icon: "Users", title: "Incident Management Leadership", description: "Leadership skills for managing security incidents." },
      { icon: "Award", title: "Globally Recognized Certification", description: "Achieve a globally recognized security certification." },
      { icon: "GraduationCap", title: "Leadership and Management Focused Course", description: "Focused on leadership and management in security." }
    ],
    aboutCourse: [
      "The CISM course focuses on information security governance, risk management, and enterprise security program management. It prepares professionals for leadership roles in cybersecurity management."
    ],
    directorQuote: {
      text: "This program equips leaders to manage and govern enterprise information security programs.",
      author: "Trust Axis Leadership"
    },
    objectives: [
      { number: 1, title: "Develop Security Governance Programs", description: "Develop and implement security governance programs." },
      { number: 2, title: "Manage Security Risks", description: "Identify and manage enterprise security risks." },
      { number: 3, title: "Develop Security Programs", description: "Develop comprehensive security programs." },
      { number: 4, title: "Manage Security Incidents", description: "Manage and respond to security incidents effectively." },
      { number: 5, title: "Ensure Compliance", description: "Ensure compliance with security standards and regulations." },
      { number: 6, title: "Align Security with Business Goals", description: "Align security initiatives with broader business goals." }
    ],
    curriculum: [
      { number: 1, title: "Security Governance", duration: "Flexible", modules: 3, subtopics: [{ title: "Governance Frameworks" }, { title: "Policies" }, { title: "Strategy" }] },
      { number: 2, title: "Risk Management", duration: "Flexible", modules: 3, subtopics: [{ title: "Risk Assessment" }, { title: "Risk Treatment" }, { title: "Risk Monitoring" }] },
      { number: 3, title: "Security Program Development", duration: "Flexible", modules: 3, subtopics: [{ title: "Program Management" }, { title: "Metrics" }, { title: "Governance" }] },
      { number: 4, title: "Incident Management", duration: "Flexible", modules: 3, subtopics: [{ title: "Incident Response" }, { title: "Business Continuity" }, { title: "Disaster Recovery" }] }
    ],
    targetAudience: [
      { icon: "Shield", title: "Security Leaders", description: "Current and aspiring information security leaders." },
      { icon: "Briefcase", title: "IT Managers", description: "IT managers seeking to enhance security practices." }
    ],
    examDetails: [
      { name: "CISM Certification Exam", provider: "ISACA", passScore: "450/800", prepIncluded: true }
    ],
    toolsCovered: [
      { name: "ISACA CISM Framework", icon: "BookOpen", category: "Framework" },
      { name: "ISO 27001", icon: "Shield", category: "Standard" },
      { name: "NIST", icon: "Layers", category: "Framework" },
      { name: "COBIT", icon: "Briefcase", category: "Framework" },
      { name: "Risk Management Framework", icon: "Activity", category: "Framework" }
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
