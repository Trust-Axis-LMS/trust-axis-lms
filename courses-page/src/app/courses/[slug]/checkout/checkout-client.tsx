"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Clock, Monitor, Award, CheckCircle,
  CreditCard, Building2, Smartphone, Mail, Phone, Lock, Shield,
} from "lucide-react";
import type { Course } from "@/lib/courses-data";

interface CheckoutClientProps {
  course: Course;
}

export default function CheckoutClient({ course }: CheckoutClientProps) {
  const [selectedPayment, setSelectedPayment] = useState<"card" | "bank" | "upi">("card");

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
          <p className="text-[#6C757D] text-sm mt-2">Secure your spot in the next cohort — limited seats available.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 md:gap-16 items-start">

            {/* Left: Payment */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#212529] tracking-tight mb-8">
                How Would You Like to Enroll?
              </h2>

              {/* Payment Method Selector */}
              <div className="flex gap-3 mb-8">
                {[
                  { key: "card" as const, label: "Credit / Debit Card", icon: CreditCard },
                  { key: "bank" as const, label: "Bank Transfer", icon: Building2 },
                  { key: "upi" as const, label: "UPI / Wallet", icon: Smartphone },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPayment(key)}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                      selectedPayment === key
                        ? "border-black bg-black text-white"
                        : "border-[#E5E7EB] bg-white text-[#4A5568] hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">{label}</span>
                  </button>
                ))}
              </div>

              {/* Card Payment Form */}
              {selectedPayment === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6C757D] mb-1.5">Name on Card</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full h-12 px-4 rounded-md border border-gray-200 text-sm text-[#212529] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6C757D] mb-1.5">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full h-12 px-4 pr-12 rounded-md border border-gray-200 text-sm text-[#212529] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors"
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6C757D] mb-1.5">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        maxLength={7}
                        className="w-full h-12 px-4 rounded-md border border-gray-200 text-sm text-[#212529] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6C757D] mb-1.5">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full h-12 px-4 rounded-md border border-gray-200 text-sm text-[#212529] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6C757D] mt-2">
                    <Lock className="h-3.5 w-3.5" />
                    256-bit SSL encrypted and PCI compliant
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {selectedPayment === "bank" && (
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 md:p-8 space-y-4">
                  <h3 className="font-bold text-[#212529] text-base mb-4">Bank Transfer Details</h3>
                  {[
                    { label: "Bank Name", value: "Trust Axis Financial Services" },
                    { label: "Account Number", value: "XXXX XXXX XXXX 4321" },
                    { label: "IFSC Code", value: "TRUSTAX001" },
                    { label: "Reference", value: course.slug.toUpperCase() },
                  ].map((detail, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-[#E5E7EB] last:border-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#6C757D]">{detail.label}</span>
                      <span className="text-sm font-bold text-[#212529]">{detail.value}</span>
                    </div>
                  ))}
                  <p className="text-xs text-[#6C757D] mt-4">
                    After transfer, email your transaction ID to <strong>payments@trustacg.com</strong> for confirmation.
                  </p>
                </div>
              )}

              {/* UPI */}
              {selectedPayment === "upi" && (
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 md:p-8">
                  <h3 className="font-bold text-[#212529] text-base mb-6">UPI / Wallet Payment</h3>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6C757D] mb-1.5">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full h-12 px-4 rounded-md border border-gray-200 bg-white text-sm text-[#212529] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-[#6C757D] mt-4">
                    UPI ID: <strong>payments@trustaxis</strong> — or scan the QR code at the admissions office.
                  </p>
                </div>
              )}

              <button className="mt-8 w-full h-14 flex items-center justify-center gap-2 rounded-md bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-black/90 transition-colors">
                <Shield className="h-4 w-4" /> Complete Enrollment <ArrowRight className="h-4 w-4" />
              </button>
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
                      "Industry-recognized certification",
                      "Expert practitioner instructors",
                      "Hands-on labs and projects",
                      "Career placement support",
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
                    href="mailto:hello@trustacg.com"
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-gray-300 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black group-hover:scale-105 transition-transform">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#6C757D]">Email Us</p>
                      <p className="text-sm font-bold text-[#212529]">hello@trustacg.com</p>
                    </div>
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] hover:border-gray-300 transition-all group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black group-hover:scale-105 transition-transform">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#6C757D]">Call Us</p>
                      <p className="text-sm font-bold text-[#212529]">+1 (555) 123-4567</p>
                    </div>
                  </a>
                  <p className="text-[11px] text-[#6C757D] px-1">
                    Available Mon–Fri, 9 AM – 6 PM EST. We typically respond within 2 hours.
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
