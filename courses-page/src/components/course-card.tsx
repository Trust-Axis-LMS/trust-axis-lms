import Link from "next/link";
import { Clock, Users, Star, ArrowRight, Download } from "lucide-react";
import type { Course } from "@/lib/courses-data";

const categoryIcons: Record<string, string> = {
  Cybersecurity: "🔐",
  "Data Science": "📊",
  Business: "💼",
  "Cloud Computing": "☁️",
  "AI & ML": "🤖",
  Technology: "💻",
};

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E5E7EB] flex flex-col h-full bg-white group">
      {/* Card image / hero */}
      <div className="bg-[#212529] aspect-video flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d2d2d] to-[#111] opacity-80" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <span className="text-4xl">{categoryIcons[course.category] ?? "📚"}</span>
          <span className="font-semibold tracking-wide text-xs opacity-80 uppercase">
            {course.category}
          </span>
        </div>
        {/* Rating badge */}
        <div className="absolute top-3 right-3 z-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-xs font-bold">{course.rating}</span>
        </div>
      </div>

      <div className="p-5 md:p-7 flex flex-col flex-1">
        {/* Category badge */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-[#F4F4F5] text-[#212529] rounded-sm font-bold text-[10px] uppercase tracking-wider px-3 py-1.5">
            {course.category}
          </span>
          <div className="flex items-center text-xs text-[#6C757D] font-medium">
            <Users className="h-3.5 w-3.5 mr-1.5" />
            {course.students} Students
          </div>
        </div>

        <h3 className="text-base md:text-lg font-bold text-[#212529] mb-2 leading-tight tracking-tight line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-[#6C757D] mb-5 flex-1 leading-relaxed line-clamp-2">
          {course.subtitle}
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center text-xs text-[#6C757D] font-medium mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#212529] bg-[#F4F4F5] px-2.5 py-1 rounded-sm">
            {course.mode}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="flex-1 h-11 text-xs uppercase tracking-wider font-bold rounded-sm bg-black text-white hover:bg-black/80 transition-colors flex items-center justify-center gap-1.5"
          >
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => alert("Brochure PDF coming soon!")}
            className="h-11 px-4 text-xs uppercase tracking-wider font-bold rounded-sm border border-gray-300 text-[#212529] hover:bg-gray-50 transition-colors flex items-center gap-1.5"
            title="Download Brochure"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
