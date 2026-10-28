import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CONTACT_EMAIL, CONTACT_PHONE, LEGAL_NAME, OFFICE_ADDRESS, POLICY_EFFECTIVE_DATE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description: `How ${LEGAL_NAME} collects, uses, protects and discloses personal data under Singapore's Personal Data Protection Act 2012.`,
};

const sectionClass = "mb-10";
const h2Class = "text-2xl font-semibold mb-4";
const listClass = "list-disc pl-6 space-y-2 mb-4";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl prose prose-slate">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Privacy and Cookie Policy</h1>
          <p className="text-muted-foreground font-medium mb-12">Effective date: {POLICY_EFFECTIVE_DATE}</p>

          <p className="mb-8 leading-relaxed">
            This policy explains how <strong>{LEGAL_NAME}</strong> (&ldquo;Trust Axis&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses,
            discloses and protects personal data when you use trustacg.com and train.trustacg.com (the &ldquo;Sites&rdquo;),
            contact us, or enrol in our programs. We handle personal data in accordance with Singapore&apos;s Personal Data
            Protection Act 2012 (&ldquo;PDPA&rdquo;).
          </p>

          <section className={sectionClass}>
            <h2 className={h2Class}>1. Who We Are</h2>
            <p className="mb-4">
              {LEGAL_NAME} is the organisation responsible for your personal data. Our office is at {OFFICE_ADDRESS}.
            </p>
            <p className="mb-4">
              We have appointed a Data Protection Officer (&ldquo;DPO&rdquo;) who oversees our compliance with the PDPA. You can
              reach the DPO at <a href={`mailto:${CONTACT_EMAIL}?subject=Attn%3A%20Data%20Protection%20Officer`}>{CONTACT_EMAIL}</a> with
              the subject line &ldquo;Attn: Data Protection Officer&rdquo;.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>2. Personal Data We Collect</h2>
            <ul className={listClass}>
              <li><strong>Enquiries:</strong> your name, email address, phone number, organisation and message when you contact us by email, phone or through our enquiry form.</li>
              <li><strong>Account data:</strong> your name, email address and profile photo when you sign in with Google.</li>
              <li><strong>Learner profile:</strong> details you choose to add to your profile, such as phone number, education, current role and company, experience, skills, career goals, learning preferences, LinkedIn URL and résumé.</li>
              <li><strong>Enrolment and billing:</strong> the programs you enrol in, invoicing details and payment confirmations. We do not collect or store card numbers on the Sites; payments are processed by our payment provider.</li>
              <li><strong>Technical data:</strong> IP address, browser type and request logs created by our hosting provider when you visit the Sites.</li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>3. How We Use Your Personal Data</h2>
            <p className="mb-4">We use personal data, with your consent or as otherwise permitted by the PDPA, to:</p>
            <ul className={listClass}>
              <li>respond to enquiries and provide consultancy proposals;</li>
              <li>create and manage your account and learner profile;</li>
              <li>process enrolments, invoices and payments, and deliver our programs;</li>
              <li>register you for certification exams where you ask us to;</li>
              <li>send updates about programs or services you have asked to hear about;</li>
              <li>keep the Sites secure and working properly; and</li>
              <li>meet our legal, regulatory and accounting obligations.</li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>4. Consent and Withdrawal</h2>
            <p className="mb-4">
              You may withdraw your consent to our use of your personal data at any time by contacting our DPO. We will
              process your request within a reasonable time and tell you about any likely consequences, for example that we
              can no longer deliver a program you are enrolled in. We will not send you marketing messages by phone call,
              SMS or fax unless you have given clear consent, in line with Singapore&apos;s Do Not Call rules.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>5. Disclosure to Third Parties</h2>
            <p className="mb-4">We do not sell personal data. We share it only as needed with:</p>
            <ul className={listClass}>
              <li><strong>Service providers</strong> that host and operate the Sites and our database, provide Google sign-in, and process payments, under contracts that require them to protect your data;</li>
              <li><strong>Certification bodies</strong> (for example ISC2, ISACA or EC-Council) when you ask us to register you for their exam;</li>
              <li><strong>Your employer</strong> where your enrolment is sponsored by your organisation; and</li>
              <li><strong>Authorities</strong> where disclosure is required or permitted by law.</li>
            </ul>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>6. Transfers Outside Singapore</h2>
            <p className="mb-4">
              Some of our service providers store or process data outside Singapore. When we transfer personal data overseas
              we take steps to ensure it receives a standard of protection comparable to the PDPA, such as contractual
              safeguards with the recipient.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>7. Cookies</h2>
            <p className="mb-4">
              The Sites use only cookies that are strictly necessary for them to work. We do not use advertising or
              analytics cookies.
            </p>
            <ul className={listClass}>
              <li><strong>Sign-in session cookies</strong> keep you signed in across trustacg.com and train.trustacg.com. They are set only when you sign in and expire when your session ends or you sign out.</li>
              <li><strong>Security cookies</strong> protect the sign-in process and our content management area from misuse.</li>
            </ul>
            <p className="mb-4">
              You can block or delete cookies in your browser settings, but you will not be able to sign in without them.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>8. Protection and Retention</h2>
            <p className="mb-4">
              We protect personal data with reasonable security arrangements, including encrypted connections, access
              controls and restricted administrative access. We keep personal data only for as long as it is needed for the
              purposes above or for legal and business reasons (for example, financial records), and then delete or
              anonymise it.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>9. Accuracy, Access and Correction</h2>
            <p className="mb-4">
              You can update most profile details yourself after signing in. You may also ask our DPO for access to the
              personal data we hold about you, information about how it has been used or disclosed in the past year, or a
              correction. We aim to respond within 30 days; if we need longer, we will tell you when to expect a response.
              We may charge a reasonable fee for access requests and will tell you the amount first.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>10. Data Breaches</h2>
            <p className="mb-4">
              If a data breach is likely to result in significant harm to you, or affects a significant number of people, we
              will notify the Personal Data Protection Commission (&ldquo;PDPC&rdquo;) and, where required, the affected
              individuals, as the PDPA requires.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>11. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this policy from time to time. Changes are posted on this page with a new effective date.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={h2Class}>12. Contact Us</h2>
            <p className="mb-4">For questions, requests or complaints about your personal data, contact our Data Protection Officer:</p>
            <address className="not-italic leading-relaxed mb-4">
              <strong>Data Protection Officer, {LEGAL_NAME}</strong><br />
              {OFFICE_ADDRESS}<br />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><br />
              {CONTACT_PHONE}
            </address>
            <p className="mb-4">
              If you are not satisfied with our response, you may contact the Personal Data Protection Commission at{" "}
              <a href="https://www.pdpc.gov.sg" target="_blank" rel="noopener noreferrer">www.pdpc.gov.sg</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
