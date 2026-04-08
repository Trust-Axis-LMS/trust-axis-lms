import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl prose prose-slate">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Privacy and Cookie Consent Policy</h1>
          <p className="text-muted-foreground font-medium mb-12">Effective Date: [Insert Date]</p>

          <p className="mb-8 leading-relaxed">
            Welcome to <strong>SecureTree.ai</strong> (“we,” “our,” “us”). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy and Cookie Consent Policy outlines how we collect, use, and protect your information when you visit our website.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information when you use our website:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Personal Information:</strong> This includes information that can identify you personally, such as your name, email address, phone number, and any other details you provide through forms on our website.</li>
              <li><strong>Non-Personal Information:</strong> This includes information that does not identify you personally, such as your IP address, browser type, operating system, and usage data.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to enhance your experience on our website and to understand how you use our services.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>To Provide and Improve Our Services:</strong> We use your information to operate, maintain, and improve our website and the services we offer.</li>
              <li><strong>To Communicate with You:</strong> We may use your contact information to send you updates, respond to your inquiries, and provide customer support.</li>
              <li><strong>To Personalize Your Experience:</strong> We use cookies and other tracking technologies to remember your preferences and to show you content that is relevant to you.</li>
              <li><strong>To Analyze Usage:</strong> We analyze how users interact with our website to improve our content and services.</li>
              <li><strong>To Comply with Legal Obligations:</strong> We may use your information to comply with applicable laws and regulations.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking Technologies</h2>
            <h3 className="text-xl font-medium mb-2">What Are Cookies?</h3>
            <p className="mb-4">Cookies are small text files that are stored on your device when you visit a website. They help us understand how you interact with our website, remember your preferences, and improve your user experience.</p>
            <h3 className="text-xl font-medium mb-2">Types of Cookies We Use:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems.</li>
              <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make and provide enhanced features and personalization.</li>
              <li><strong>Targeting/Advertising Cookies:</strong> These cookies are used to deliver content and advertisements that are more relevant to you and your interests.</li>
            </ul>
            <h3 className="text-xl font-medium mb-2">Managing Cookies:</h3>
            <p className="mb-4">You can control and manage cookies through your browser settings. However, please note that disabling cookies may affect the functionality of our website and your ability to use certain features.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
            <p className="mb-4">We do not sell, trade, or otherwise transfer your personal information to outside parties, except as described below:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our website and providing services to you.</li>
              <li><strong>Legal Compliance:</strong> We may disclose your information when required to do so by law or in response to legal requests.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of our assets, your information may be transferred to the new owner.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
            <p className="mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
              <li><strong>Correction:</strong> You can request that we correct any inaccuracies in your personal information.</li>
              <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to certain legal restrictions.</li>
              <li><strong>Objection:</strong> You can object to the processing of your personal information for direct marketing purposes.</li>
              <li><strong>Withdrawal of Consent:</strong> If you have given consent to the use of your personal information, you can withdraw it at any time.</li>
            </ul>
            <p className="mb-4">To exercise these rights, please contact us at [Your Contact Information].</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Security of Your Information</h2>
            <p className="mb-4">We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it from unauthorized access, disclosure, alteration, or destruction.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
            <p className="mb-4">We may update this Privacy and Cookie Consent Policy from time to time to reflect changes in our practices or legal obligations. Any changes will be posted on this page with an updated effective date.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="mb-4">If you have any questions or concerns about this Privacy and Cookie Consent Policy, please contact us at:</p>
            <address className="not-italic formatting leading-relaxed">
              <strong>SecureTree.ai</strong><br />
              [Your Address]<br />
              [Your Email Address]<br />
              [Your Phone Number]
            </address>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
