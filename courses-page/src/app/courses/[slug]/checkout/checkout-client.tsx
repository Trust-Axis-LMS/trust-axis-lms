"use client";

import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Clock, Monitor, Award, CheckCircle,
  FileText, Send, Mail, Phone, Lock, Shield,
} from "lucide-react";
import type { Course } from "@/lib/courses-data";
import { MAIN_SITE_URL } from "@/lib/url";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, contactHref } from "@/lib/site";

interface CheckoutClientProps {
  course: Course;
}

export default function CheckoutClient({ course }: CheckoutClientProps) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F9FAFB] border-b border-[#F4F4F5] py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#6C757D] hover:text-[#212529] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Course
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <div className="inline-block bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
              {course.category}
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">
            Enroll in {course.title}
          </h1>
          <p className="text-[#6C757D] text-sm mt-2">Request a place in the next cohort and an advisor will confirm the details with you.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 md:gap-16 items-start">

            {/* Left: Enrolment request */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#212529] tracking-tight mb-3">
                How Enrolment Works
              </h2>
              <p className="text-sm text-[#6C757D] leading-relaxed mb-8">
                We confirm every enrolment personally so you join the right cohort. No payment details are
                collected on this site.
              </p>

              <ol className="space-y-4">
                {[
                  { icon: Send, title: "Send an enrolment request", description: "Tell us which program you want and your preferred schedule. It takes a minute." },
                  { icon: Phone, title: "Talk to an advisor", description: "We confirm cohort dates, delivery mode, exam voucher options and any corporate billing needs." },
                  { icon: FileText, title: "Receive your invoice", description: "You get an invoice by email with a secure payment link from our payment provider, or bank transfer details for corporate clients." },
                  { icon: CheckCircle, title: "Start learning", description: "Once payment is confirmed you receive your joining instructions and course materials." },
                ].map(({ icon: Icon, title, description }, i) => (
                  <li key={title} className="flex gap-4 rounded-xl border border-[#E5E7EB] p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#6C757D]">Step {i + 1}</p>
                      <h3 className="font-bold text-[#212529] text-sm md:text-base">{title}</h3>
                      <p className="text-xs md:text-sm text-[#6C757D] leading-relaxed mt-1">{description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <a
                href={contactHref(MAIN_SITE_URL, "enrollment", course.title)}
                className="mt-8 w-full h-14 flex items-center justify-center gap-2 rounded-md bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-black/90 transition-colors"
              >
                <Shield className="h-4 w-4" /> Request Enrolment <ArrowRight className="h-4 w-4" />
              </a>
              <p className="flex items-center justify-center gap-2 text-xs text-[#6C757D] mt-3">
                <Lock className="h-3.5 w-3.5" />
                Payments are processed by our payment provider, never on this site.
              </p>
            </div>

            {/* Right: Course Summary + Connect */}
            <div className="space-y-6">
              {/* Course Card */}
              <div className="rounded-xl border border-[#E5E7EB] overflow-hidden shadow-sm">
                <div className="bg-[#212529] text-white p-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{course.category}</div>
                  <h3 className="text-lg font-bold tracking-tight">{course.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{course.subtitle}</p>
                </div>
                <div className="bg-white p-5 space-y-3">
                  {[
                    { icon: Clock, label: "Duration", value: course.duration },
                    { icon: Monitor, label: "Mode", value: course.mode },
                    { icon: Award, label: "Certificate", value: course.certificate },
                  ].map(({ icon: Icon, label, value }, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-[#F4F4F5] last:border-0">
                      <div className="flex items-center gap-2 text-[#6C757D]">
                        <Icon className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
                      </div>
                      <span className="font-bold text-[#212529] text-xs">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#F9FAFB] p-5 border-t border-[#F4F4F5]">
                  <div className="space-y-2">
                    {[
                      "Preparation for the official certification exam",
                      "Instructor-led, live sessions",
                      "Practice questions and exam guidance",
                      "Corporate and team enrolment available",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#10B981] fill-[#10B981] text-white shrink-0" />
                        <span className="text-xs text-[#4A5568] font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connect With Us */}
              <div className="rounded-xl border border-[#E5E7EB] overflow-hidden">
                <div className="bg-black text-white p-5">
                  <h3 className="font-bold text-base">Have Questions Before Enrolling?</h3>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    Speak with an advisor to get personalized guidance before making your decision.
                  </p>
                </div>
                <div className="bg-white p-5 space-y-3">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-gray-300 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black group-hover:scale-105 transition-transform">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#6C757D]">Email Us</p>
                      <p className="text-sm font-bold text-[#212529]">{CONTACT_EMAIL}</p>
                    </div>
                  </a>
                  <a
                    href={CONTACT_PHONE_HREF}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-gray-300 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black group-hover:scale-105 transition-transform">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#6C757D]">Call Us</p>
                      <p className="text-sm font-bold text-[#212529]">{CONTACT_PHONE}</p>
                    </div>
                  </a>
                  <p className="text-[11px] text-[#6C757D] px-1">
                    Available Mon–Fri, 9 AM – 6 PM SGT. We respond within one business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
