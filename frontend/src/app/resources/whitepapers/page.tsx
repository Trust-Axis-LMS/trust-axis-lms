import { ResourcePageShell } from "@/components/resource-page-shell";

const whitepaperItems = [
  {
    title: "State Of Technical Upskilling In High-Trust Industries",
    description:
      "A research-led perspective on how regulated and security-sensitive sectors are approaching workforce capability building and training governance.",
    category: "Research",
    readTime: "12 Min Read",
  },
  {
    title: "A Framework For Enterprise Training Program Selection",
    description:
      "A whitepaper outlining the decision model enterprises can use to compare external learning vendors, credentials, and operational fit.",
    category: "Enterprise Learning",
    readTime: "14 Min Read",
  },
  {
    title: "From Learning To Deployment: Measuring Program ROI",
    description:
      "A structured model for evaluating whether professional education programs actually improve delivery quality, team output, and role mobility.",
    category: "Analytics",
    readTime: "11 Min Read",
  },
];

export default function WhitepapersPage() {
  return (
    <ResourcePageShell
      variant="whitepapers"
      badge="Whitepapers"
      title="Research And Decision Support For Program Leaders"
      intro="Access longer-form whitepapers designed to support education strategy, vendor evaluation, and technical workforce planning."
      items={whitepaperItems}
    />
  );
}
