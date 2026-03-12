import { ResourcePageShell } from "@/components/resource-page-shell";

const blogItems = [
  {
    title: "How Training Teams Should Evaluate Technical Programs",
    description:
      "A practical framework for comparing curriculum depth, delivery format, instructor quality, and learner outcomes before committing budget.",
    category: "Program Strategy",
    readTime: "6 Min Read",
  },
  {
    title: "What Employers Actually Look For In Cybersecurity Candidates",
    description:
      "A breakdown of the technical, communication, and certification signals hiring teams use when evaluating early and mid-career security talent.",
    category: "Cybersecurity",
    readTime: "5 Min Read",
  },
  {
    title: "Building A Data Learning Path That Leads To Real Delivery",
    description:
      "Why strong analytics programs balance business context, hands-on projects, and production-minded thinking instead of staying purely theoretical.",
    category: "Data Science",
    readTime: "7 Min Read",
  },
];

export default function BlogsPage() {
  return (
    <ResourcePageShell
      variant="blogs"
      badge="Blogs"
      title="Current Thinking For Technical Teams"
      intro="Explore blog posts focused on practical upskilling, workforce development, and the operating realities behind high-quality technical training."
      items={blogItems}
    />
  );
}
