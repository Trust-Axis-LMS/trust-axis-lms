import { ArticlesPage as ArticlesPageView } from "@/components/articles-page";

const articleItems = [
  {
    title: "Designing Certification-Aware Learning Journeys",
    description:
      "An in-depth look at how course structure, assessment design, and exam alignment influence completion quality and professional credibility.",
    category: "Learning Design",
    readTime: "9 Min Read",
  },
  {
    title: "Why Product And Engineering Leaders Need Shared Training Context",
    description:
      "A closer examination of the common skill gaps between product, engineering, and delivery teams and how structured programs reduce them.",
    category: "Product & Tech",
    readTime: "8 Min Read",
  },
  {
    title: "Comparing Online Program Formats Beyond Marketing Claims",
    description:
      "How to assess mentorship quality, cohort support, applied work, and role readiness when evaluating remote-first professional education.",
    category: "Program Evaluation",
    readTime: "10 Min Read",
  },
];

export default function ArticlesPage() {
  return <ArticlesPageView items={articleItems} />;
}
