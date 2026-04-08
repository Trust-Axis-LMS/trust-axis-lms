import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl prose prose-slate">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Terms and Conditions</h1>

          <p className="mb-4 leading-relaxed">
            <strong>Welcome to SecureTree.ai</strong>. This website provides online access to information about our company, our products, services, and various opportunities available to our users.
          </p>
          <p className="mb-4 leading-relaxed">
            Your access to and use of this website (“Site”) is subject to your acceptance of and compliance with these Terms of Use (“Terms”). These Terms apply to all visitors, users, and others who engage with the Site.
          </p>
          <p className="mb-8 font-semibold uppercase tracking-wider">
            BY ACCESSING OR USING THIS SITE, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT USE THIS SITE.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Purchases</h2>
            <p className="mb-4">If you wish to purchase any of our products or services (“Purchase”), you may do so by using one of the following methods:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Submit your request via our contact form.</li>
              <li>Engage with our live chat support.</li>
              <li>Purchase through an authorized reseller or partner.</li>
              <li>Send your request to hello@securetree.ai.</li>
              <li>Contact us by phone at [Insert Phone Number].</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend your access to the Site at any time, without prior notice or liability, for any reason, including but not limited to a violation of these Terms.
            </p>
            <p className="mb-4">
              All provisions of these Terms that should logically survive termination shall remain in effect, including, but not limited to, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Content, Copyrights, and Trademarks</h2>
            <p className="mb-4">
              All content on this Site—including text, data, information, descriptions of our products and services, graphics, images, user interfaces, visual interfaces, photographs, trademarks, logos, and computer code—is owned, controlled, or licensed by or to SecureTree.ai and is protected by applicable intellectual property laws, including copyright and trademark laws.
            </p>
            <p className="mb-4">
              SecureTree.ai retains all rights to the content and reserves all related legal rights. You acknowledge that SecureTree.ai makes no warranties or representations regarding the content accessible on the Site, including any potentially infringing content, errors, omissions, or any loss or damage resulting from the use of any content posted, transmitted, or made available via the Site.
            </p>
            <p className="mb-4">
              You agree that you are solely responsible for the reuse of any content available on the Site, including providing appropriate attribution where required. Before using any content, you should review the terms of the applicable license to understand your rights and limitations.
            </p>
            <p className="mb-4">
              No part of the Site or its content may be copied, reproduced, modified, published, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, or distributed in any way (including “mirroring”) to any other computer, server, website, or other medium for commercial purposes without the express prior written consent of SecureTree.ai. You also agree not to edit, rent, lease, loan, sell, distribute, transmit, broadcast, or create derivative works based on the content or the Site in any way.
            </p>
            <p className="mb-4">
              The logos and trademarks displayed on this Site are the registered trademarks of SecureTree.ai. The overall design, layout, and appearance of the Site are protected as trade dress. No rights or permissions are granted for the use of the above, except as expressly authorized. We reserve the right to utilize and incorporate any suggestions or other feedback you submit into the Site, free of charge and without restriction.
            </p>
            <p className="mb-4">
              You may use this Site and its content solely for your non-commercial, personal use, and/or to learn about SecureTree.ai’s products and services, provided that you do not remove any proprietary notice language, do not copy or post any content on any networked computer or broadcast it in any media, and do not make any modifications to the content.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Use of the Site</h2>
            <p className="mb-4">By using this Site, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Use the Site in any manner that violates these Terms;</li>
              <li>Copy, modify, create derivative works from, reverse engineer, or attempt to discover the source code of the Site, or assist a third party in doing so;</li>
              <li>Sell, assign, sublicense, distribute, or commercially exploit any rights in the content or the Site to a third party;</li>
              <li>Use or launch any automated system (such as “deep-links,” “page-scrapers,” “robots,” or “spiders”) to access or monitor the Site or its content, or reproduce or circumvent the navigational structure of the Site;</li>
              <li>Use the Site in a way that could damage, disable, overburden, or impair the Site or interfere with anyone else’s use of the Site;</li>
              <li>Mirror or frame the Site or any part of it on any other website;</li>
              <li>Probe, scan, or test the vulnerability of the Site or any network connected to it, or breach any security or authentication measures;</li>
              <li>Use any device, software, or routine to interfere with the proper functioning of the Site or any activities conducted on the Site.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Links</h2>
            <p className="mb-4">
              This Site may contain links to third-party websites or services that are not owned or controlled by SecureTree.ai. These links are provided for your convenience only and do not constitute an endorsement, sponsorship, or recommendation by SecureTree.ai of the third party, the third party’s website, or the information contained therein.
            </p>
            <p className="mb-4">
              SecureTree.ai has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that SecureTree.ai is not responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with your use of or reliance on any such content, products, or services available on or through any such websites or services.
            </p>
            <p className="mb-4">
              SecureTree.ai reserves the right, at its sole discretion, to request the removal of any or all links to our Site. You agree to immediately remove all links to our Site upon our request.
            </p>
            <p className="mb-4">
              No link(s) to our Site may appear on any page of your website or within any context containing content or materials that may be construed as defamatory, obscene, or criminal, or which infringes or otherwise violates any third-party rights.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
