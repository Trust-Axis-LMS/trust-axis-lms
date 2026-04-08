import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Scale,
  Lock,
  Cloud,
  ClipboardCheck,
  Activity,
  Search,
  Network,
  Key,
  Crosshair,
  Layers,
  LayoutGrid
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
  "Cybersecurity Management": {
    icon: Shield,
    shortLabel: "Management",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,1)_0%,rgba(0,123,255,0.88)_100%)]",
  },
  "Governance, Risk and Compliance": {
    icon: Scale,
    shortLabel: "GRC",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(0,123,255,0.95)_0%,rgba(33,37,41,0.92)_100%)]",
  },
  "Data Privacy": {
    icon: Lock,
    shortLabel: "Privacy",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,0.98)_0%,rgba(108,117,125,0.94)_100%)]",
  },
  "Cloud Security": {
    icon: Cloud,
    shortLabel: "Cloud",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(0,123,255,0.84)_0%,rgba(33,37,41,0.94)_100%)]",
  },
  "IT and Information Security Audit": {
    icon: ClipboardCheck,
    shortLabel: "Audit",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,1)_0%,rgba(0,123,255,0.78)_58%,rgba(108,117,125,0.82)_100%)]",
  },
  "Security Operations": {
    icon: Activity,
    shortLabel: "SecOps",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,1)_0%,rgba(0,123,255,0.74)_44%,rgba(33,37,41,1)_100%)]",
  },
  "Digital Forensics": {
    icon: Search,
    shortLabel: "Forensics",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(0,90,200,0.95)_0%,rgba(20,20,20,0.92)_100%)]",
  },
  "Network Security": {
    icon: Network,
    shortLabel: "Network",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(10,37,60,1)_0%,rgba(0,123,255,0.88)_100%)]",
  },
  "Identity and Access Management": {
    icon: Key,
    shortLabel: "IAM",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(33,37,41,1)_0%,rgba(100,100,250,0.76)_100%)]",
  },
  "Offensive Security": {
    icon: Crosshair,
    shortLabel: "Offensive",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(50,10,10,1)_0%,rgba(255,50,50,0.8)_100%)]",
  },
  "Security Architecture": {
    icon: Layers,
    shortLabel: "Architecture",
    bandClassName:
      "bg-[linear-gradient(135deg,rgba(10,37,41,1)_0%,rgba(0,255,150,0.76)_100%)]",
  },
};

export function getCourseCategoryMeta(category: string): CourseCategoryMeta {
  return courseCategoryMeta[category] ?? defaultMeta;
}
