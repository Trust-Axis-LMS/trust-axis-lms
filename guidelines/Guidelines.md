**Add your own guidelines here**


# System Guidelines
use these guidelined whenever working in this directory.

we are creating an lms, which will be 3 parts, main website will be landing page i will provide the sitemap, ,secondary website will just work as courses brochure which will be having all the courses listed and details, third part will be the lms itself which will be having the courses and the content for the courses thinkific in this case.

there will also be an admin panel which will be used to update brochure content on website as well as creating blogs, articles and whitepapers by site admins so need to figure that too as well.

the main website will also have student onboarding and login as well as student profile.

we have business plan from hostinger from where we will be taking the domain and sub-domain as well as custom email domain and storage.

use a modular well thoughout code sturcture for frontend as well as backend, making sure we have test as well as production environment, system logs set up and beautified.

we will also ahve blogs, articles and whtiepapers

create a demo .env file which i will see and give you all the necessary variables required.

typography can be found in typography.md file.
sitemap in Sitemap.md
DataFlow in Dataflow.md

here is thehostinger plan:
Create up to 50 websites
50 GB of fast storage for your files (SSD)
5 mailboxes per website - free for 1 year
Build with:
WordPress
Website Builder + Ecommerce
Horizons - free credits
Node.js - up to 5 apps
New
PHP/HTML
Key Features
~100 000 visits monthly
600 000 files and directories (Inodes)
Free pre-built templates
Free automatic website migration
Unlimited free SSL
Daily backups
WordPress vulnerabilities scanner
Smart WordPress auto updates
Advanced WordPress acceleration
Unlimited bandwidth
Free domain for 1 year
Free CDN
WordPress AI tools
WordPress staging tool
Dedicated IP address
Priority support
Managed WordPress
Free 1-click WordPress installation
Free automatic website migration
Free pre-built templates
WordPress acceleration (LiteSpeed)
Smart WordPress auto updates
WordPress vulnerabilities scanner
WordPress compatibility checker
Basic WooCommerce
WordPress multisite
WP-CLI and SSH
Free Amazon affiliate WordPress plugin
WordPress staging tool
Object cache for WordPress
On-demand backup
WordPress AI tools
Hostinger Website Builder
AI website builder
Drag-and-Drop Editor
150 templates
Marketing Integrations
AI Image Generator
AI writer
AI blog generator
AI SEO tools
eCommerce Features
0% Transaction fees
100+ payment methods
Security
Enhanced DDoS protection
Web application firewall
Cloudflare protected nameservers
Malware scanner
Secure access manager
Free domain WHOIS privacy protection
Service and support
30-Day Money-Back Guarantee
99.9% uptime guarantee
Global data centers
24/7 Customer Support
Priority support
Technical details
600 000 files and directories (Inodes)
60 PHP workers
~100 000 visits monthly
100 subdomains
75 MySQL max user connections
150 databases
Unlimited FTP accounts
Unlimited cronjobs
Git access
Multiple PHP versions
DNS management
Cache manager
Powerful control panel
SSH access


use it to the fullest of whatever we can use for ourselves.

## TECH STACK

### Frontend

Next.js for frontend along with typescript as well as shadcn components with proper component design system.

use BetterAuth for authentication system (google and email login).

use tailwind css for styling.

Helvetica Neue along with it's variables will be the sole font used.

### Backend

for orm let's use drizzle orm with mongodb as the database.

use proper api documentation using swagger or openapi.

use redis for caching and session management.

### Database

use mongodb for database

### Deployment

use hostinger for deployment.

### Other

all the necessary sitemaps.
and required documents.

## Design System

use shadcn components for the design system.

use Helvetica Neue along with it's variables for the font.

use tailwind css for styling.

use proper component design system.

We have divide the work in 3 phases to complete over 2.5 months.

## Phases:

| Checkpoint | Timeline | Focus Area | Features & Deliverables | Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **Checkpoint 1** | Week 1–2 | Foundation + Live Website | Domain + Hosting Setup, Next.js Project Setup, UI Component Base, Landing Page (Live), Course Brochure Pages, Deployment Pipeline Setup | Public website live and accessible |
| **Checkpoint 2** | Week 3–4 | User System + Database | Authentication (Signup/Login), User Roles (Student/Admin), Database Schema Setup, Dashboard Base Structure, Email Setup (Welcome + Reset Password) | Users can register, login, and access dashboard |
| **Checkpoint 3** | Week 5–6 | LMS Integration | Thinkific API Integration, Course Sync, Enrollment Sync, Course Access Flow, Student Dashboard Course Display, Basic Admin View (Users + Enrollments) | Students can access purchased courses |
| **Checkpoint 4** | Week 7–8 | Admin + Automation | Admin Dashboard Controls, Enrollment Management, Email Automation (Enrollment / Notifications), Payment Webhook Handling (If Required), Logging + Monitoring Setup | Admin can operate platform independently |
| **Checkpoint 5** | Week 9–10 | Launch + Optimization | Performance Optimization, Security Hardening, SEO Basics, QA + Edge Case Testing, Backup Validation, Documentation + Handover | Production-ready public launch |
