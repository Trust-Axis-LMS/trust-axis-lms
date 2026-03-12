import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Briefcase,
  Cloud,
  Code,
  LayoutGrid,
  LineChart,
  ShieldCheck,
} from "lucide-react";

type CourseCategoryMeta = {
  icon: LucideIcon;
  shortLabel: string;
  bandClassName: string;
};

const defaultMeta: CourseCategoryMeta = {
  icon: LayoutGrid,
  shortLabel: "Programs",
  bandClassName:
    "bg-[linear-gradient(135deg,rgba(33,37,41,1)_0%,rgba(0,123,255,0.76)_100%)]",
};

const courseCategoryMeta: Record<string, CourseCategoryMeta> = {
  All: defaultMeta,
  Cybersecurity: {
    icon: ShieldCheck,
    shortLabel: "Security",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,1)_0%,rgba(0,123,255,0.88)_100%)]",
  },
  "Data Science": {
    icon: LineChart,
    shortLabel: "Data",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(0,123,255,0.95)_0%,rgba(33,37,41,0.92)_100%)]",
  },
  Business: {
    icon: Briefcase,
    shortLabel: "Leadership",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,0.98)_0%,rgba(108,117,125,0.94)_100%)]",
  },
  "Cloud Computing": {
    icon: Cloud,
    shortLabel: "Cloud",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(0,123,255,0.84)_0%,rgba(33,37,41,0.94)_100%)]",
  },
  "AI & ML": {
    icon: Brain,
    shortLabel: "AI & ML",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,1)_0%,rgba(0,123,255,0.78)_58%,rgba(108,117,125,0.82)_100%)]",
  },
  Technology: {
    icon: Code,
    shortLabel: "Engineering",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,1)_0%,rgba(0,123,255,0.74)_44%,rgba(33,37,41,1)_100%)]",
  },
};

export function getCourseCategoryMeta(category: string): CourseCategoryMeta {
  return courseCategoryMeta[category] ?? defaultMeta;
}
