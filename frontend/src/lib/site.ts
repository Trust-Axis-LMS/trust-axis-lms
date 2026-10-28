// ─── Canonical site facts ─────────────────────────────────────────────────────
// Single source for contact details and the practice-area list, so the header,
// footer, Home and policy pages never drift apart. Mirrored in courses-page.

export const LEGAL_NAME = "Trust Axis Consulting Group";
export const CONTACT_EMAIL = "contactus@trustacg.com";
export const CONTACT_PHONE = "+65 6690 9262";
export const CONTACT_PHONE_HREF = "tel:+6566909262";
export const OFFICE_ADDRESS = "51 Goldhill Plaza #07-07, Singapore 308900";

export const LINKEDIN_URL = "https://www.linkedin.com/company/trust-axis-conulting-group-pvt-ltd/";
export const YOUTUBE_URL = "https://www.youtube.com/@TrustAxisConsultingGroup";

/** Date the current legal policies took effect. Update when a policy changes. */
export const POLICY_EFFECTIVE_DATE = "27 October 2026";

export const PRACTICE_AREAS = [
  { slug: "cybersecurity-advisory", label: "Cybersecurity Advisory" },
  { slug: "ai-technology-advisory", label: "AI & Technology Advisory" },
  { slug: "privacy-data-protection", label: "Privacy & Data Protection" },
  { slug: "cloud-technology-risk", label: "Cloud & Technology Risk" },
  { slug: "fintech-strategic-services", label: "Banking Services" },
  { slug: "esg-consulting-advisory", label: "ESG Advisory" },
] as const;

/** Enquiry subjects accepted by the /contact form (?subject=). */
export const CONTACT_SUBJECTS = {
  enrollment: "Program Enrollment",
  brochure: "Course Brochure",
  corporate: "Corporate Training",
  consultancy: "Consultancy Services",
  general: "General Inquiry",
} as const;

export type ContactSubject = keyof typeof CONTACT_SUBJECTS;

export function isContactSubject(value: string | undefined): value is ContactSubject {
  return !!value && value in CONTACT_SUBJECTS;
}

/** Builds a /contact link with the enquiry form pre-filled. */
export function contactHref(base: string, subject?: ContactSubject, topic?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (topic) params.set("topic", topic);
  const query = params.toString();
  return `${base}/contact${query ? `?${query}` : ""}`;
}
