import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SustainabilityPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl prose prose-slate">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Environmental, Social, and Governance (ESG) Policy</h1>
          <p className="text-muted-foreground font-medium mb-6">Effective Date: [Insert Date]</p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Introduction</h2>
          <p className="mb-8 leading-relaxed">
            At <strong>SecureTree.ai</strong>, we recognize the importance of Environmental, Social, and Governance (ESG) factors in creating long-term value for our stakeholders, including employees, customers, partners, investors, and the broader community. We are committed to integrating ESG considerations into our business strategies and operations to contribute to a sustainable future.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Environmental Responsibility</h2>
            <p className="mb-4">We are committed to minimizing our environmental footprint and promoting sustainability through responsible practices. Our environmental commitments include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Reducing Carbon Emissions:</strong> We aim to minimize our carbon footprint by adopting energy-efficient technologies, promoting remote work to reduce travel emissions, and encouraging the use of renewable energy sources.</li>
              <li><strong>Waste Reduction and Recycling:</strong> We prioritize waste reduction through digital operations, recycling programs, and responsible disposal of electronic equipment and other waste materials.</li>
              <li><strong>Sustainable Supply Chain:</strong> We strive to work with suppliers who share our commitment to environmental sustainability and seek to source materials and services that have minimal environmental impact.</li>
              <li><strong>Continuous Improvement:</strong> We regularly assess our environmental impact and set measurable goals for improvement, ensuring compliance with applicable environmental regulations and standards.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Social Responsibility</h2>
            <p className="mb-4">We are dedicated to fostering a diverse, inclusive, and equitable workplace while positively impacting the communities we serve. Our social commitments include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Diversity, Equity, and Inclusion (DEI):</strong> We are committed to creating a workplace that values diversity and fosters inclusion. We strive to ensure equal opportunities for all employees, regardless of race, gender, ethnicity, age, religion, sexual orientation, or disability.</li>
              <li><strong>Employee Well-being:</strong> We prioritize the health, safety, and well-being of our employees by providing a supportive work environment, promoting work-life balance, and offering resources for mental and physical health.</li>
              <li><strong>Community Engagement:</strong> We actively contribute to the communities in which we operate through volunteerism, charitable contributions, and partnerships with local organizations. We encourage our employees to participate in community service and support causes that align with our values.</li>
              <li><strong>Ethical Labor Practices:</strong> We are committed to upholding ethical labor practices, including fair wages, safe working conditions, and the protection of human rights within our organization and across our supply chain.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Governance</h2>
            <p className="mb-4">We are committed to maintaining the highest standards of corporate governance, transparency, and ethical conduct. Our governance commitments include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Corporate Ethics:</strong> We adhere to a strict code of conduct that governs our business practices, ensuring integrity, accountability, and compliance with all applicable laws and regulations.</li>
              <li><strong>Transparency and Reporting:</strong> We are committed to transparency in our ESG practices and regularly report on our progress to stakeholders. We maintain open communication channels to address any concerns and feedback.</li>
              <li><strong>Risk Management:</strong> We integrate ESG risks into our overall risk management framework, identifying and mitigating potential environmental, social, and governance-related risks to our business.</li>
              <li><strong>Board Oversight:</strong> Our Board of Directors oversees our ESG strategy and performance, ensuring that ESG considerations are embedded in our corporate decision-making processes.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Implementation and Continuous Improvement</h2>
            <p className="mb-4">To ensure the effectiveness of our ESG policy, we:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Set Clear Goals:</strong> Establish measurable ESG goals and objectives, regularly reviewing and updating them to reflect evolving best practices and stakeholder expectations.</li>
              <li><strong>Engage Stakeholders:</strong> Actively engage with our stakeholders, including employees, customers, investors, and community members, to understand their perspectives and incorporate their feedback into our ESG strategy.</li>
              <li><strong>Monitor and Report:</strong> Regularly monitor our ESG performance and report our progress to stakeholders, ensuring transparency and accountability.</li>
              <li><strong>Commit to Continuous Learning:</strong> Stay informed of the latest developments in ESG practices and adapt our approach to reflect new insights and innovations.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Conclusion</h2>
            <p className="mb-4">At <strong>SecureTree.ai</strong>, our commitment to ESG principles is fundamental to our mission and values. We believe that by integrating environmental, social, and governance considerations into our business, we can drive positive change, create long-term value, and contribute to a more sustainable and equitable world.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
