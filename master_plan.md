# TrustACG Website & Learning Ecosystem: Master Plan

This document defines the complete structure, sitemap, page flow, and backend data architecture required to build the TrustACG digital platform.

## 1. Core Objectives
The system supports the following primary functions:
*   **Training:** Course catalog and LMS integration (Thinkific).
*   **Consultancy:** Service showcases and lead generation.
*   **Resources:** Publishing blogs, articles, and whitepapers.
*   **User Management:** Instructor onboarding, student registration, and admin controls.

---

## 2. Platform Architecture

### Global Navigation
| Item | Function | Destination |
| :--- | :--- | :--- |
| **Courses** | Training subdomain | `training.trustacg.com` |
| **Resources** | Resource library | `/resources` |
| **Consultations** | Consultancy services | `/consultations` |
| **About Us** | Company information | `/about` |
| **Login / Signup** | Authentication portal | `/auth` |

### Subdomain Strategy
*   **Primary Domain (`trustacg.com`):** Landing page, Resources, Consultations, About Us.
*   **Training Subdomain (`training.trustacg.com`):** Course catalog and Thinkific LMS integration.

---

## 3. Sitemap & Page Hierarchy

*   **Landing Page (Hub)**
    *   **Courses**
        *   Catalog (Cybersecurity, AI & Data, Fintech, GRC, Digital Transformation)
        *   Individual Course Pages
    *   **Resources**
        *   Blogs, Articles, Whitepapers
    *   **Consultations**
        *   Verticals: Fintech, GRC, Cyber/Data Privacy, TPRM, AI Strategy, Cryptography
    *   **About Us**
        *   Overview, Vision/Mission, Team (with Modal Bios), Testimonials, Contact
    *   **Auth System**
        *   Student Registration
        *   Trainer Onboarding

---

## 4. Page Specifications

### Landing Page Sections
1.  **Hero:** Value proposition and primary CTA.
2.  **Courses Overview:** Featured training programs.
3.  **Consultancy Overview:** High-level service summary.
4.  **Featured Resources:** Latest insights/whitepapers.
5.  **Social Proof:** Why Choose Us & Testimonials.
6.  **Footer:** Global navigation and legal links.

### Registration & Onboarding
*   **Students:** Capture profile data (Name, Email, Profession, Interests) for course mapping.
*   **Trainers:** Multi-step onboarding capturing expertise, certifications, and experience proof for admin approval.

### Consultancy Detail Pages
Each vertical (e.g., GRC, Fintech) includes:
*   Overview & Key Benefits
*   Service Catalog & Engagement Model
*   Industry Use Cases
*   Dedicated Contact/Inquiry Form

---

## 5. Backend Data Architecture

### Core Databases
1.  **User DB:** Students, Trainers, and Admins (RBAC enabled).
2.  **Orders DB:** Transactions, payment records, and enrollment status.
3.  **Course DB:** Metadata, instructor mapping, and Thinkific sync.
4.  **Consultancy DB:** Leads, booking history, and client interactions.
5.  **Resources DB:** CMS for blogs and whitepapers.

### Admin Control Panel
*   **User Management:** Approval workflows for trainers and student mapping.
*   **Content Management:** Course metadata and resource publishing.
*   **Analytics:** Dashboard for revenue, enrollments, and lead conversion.
*   **System Config:** Mailing system and feature flags.

---

## 6. System Integrations
*   **LMS (Thinkific):** Handles course hosting, progress tracking, and student learning environment.
*   **Mailing System:** Automated triggers for enrollments, onboarding approvals, and newsletters.

---

## 7. Operational Workflows

### User Journeys
*   **Student:** Signup → Browse → Enroll → Course Mapping → LMS Access.
*   **Trainer:** Signup → Verification → Admin Approval → Profile Creation → Course Assignment.
*   **Client:** Consultancy Page → Vertical Selection → Inquiry Form → Admin Follow-up.

---

## 8. Security & Compliance
*   **Authentication:** Secure OAuth/JWT-based login via Supabase Auth.
*   **Authorization:** Role-Based Access Control (RBAC) for Admin/Trainer/Student.
*   **Data Protection:** Encryption at rest and in transit; secure form validation.