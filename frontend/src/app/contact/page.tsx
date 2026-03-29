import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, ChevronDown, Shield } from "lucide-react";
import { COURSES_SITE_URL } from "@/lib/url";

export const metadata = {
  title: "Contact Us — Trust Axis",
  description: "Get in touch with the Trust Axis team for enrollment, consultancy, or any inquiries.",
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@trustacg.com",
    sub: "We respond within 24 hours",
    href: "mailto:hello@trustacg.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (555) 123-4567",
    sub: "Mon–Fri, 9 AM – 6 PM EST",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Our Office",
    value: "New York, NY 10001",
    sub: "United States",
    href: "#",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri",
    sub: "9:00 AM – 6:00 PM EST",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-[#212529] tracking-tight leading-tight mb-4">
              Let&apos;s Start a Conversation
            </h1>
            <p className="text-[#6C757D] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Questions about our programs or corporate training? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="bg-white pb-16 md:pb-24">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 md:gap-12 items-stretch">
              {/* Left Side: Contact Details & Quick Call */}
              <div className="flex flex-col h-full">
                <div className="flex-1 rounded-2xl bg-black p-6 md:p-8 text-white shadow-xl relative overflow-hidden group flex flex-col">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform duration-700" />
                  
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6 relative z-10">
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6 relative z-10 flex-1">
                    {contactDetails.map((detail, i) => {
                      const Icon = detail.icon;
                      return (
                        <a
                          key={i}
                          href={detail.href}
                          className="flex items-start gap-4 transition-opacity hover:opacity-80"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">
                              {detail.label}
                            </p>
                            <p className="font-bold text-sm md:text-base">{detail.value}</p>
                            <p className="text-[11px] text-gray-400">{detail.sub}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                    <h3 className="text-lg font-bold mb-2">Quick Chat?</h3>
                    <p className="text-gray-400 text-[13px] leading-relaxed mb-6 max-w-sm">
                      Book a 15-min call with our advisor for personalized guidance.
                    </p>
                    <a
                      href={COURSES_SITE_URL}
                      className="inline-flex items-center justify-center w-full sm:w-auto px-6 h-12 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-transparent shadow-lg"
                    >
                      Book a Free Call
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex flex-col h-full">
                <div className="flex-1 rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 md:p-10 shadow-sm flex flex-col">
                  <div className="mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-[#212529] tracking-tight">
                      Send Us a Message
                    </h2>
                  </div>
                  
                  <form className="space-y-4 flex-1 flex flex-col">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-[#6C757D] ml-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-[#6C757D] ml-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-[#6C757D] ml-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="john@company.com"
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[9px] font-bold uppercase tracking-widest text-[#6C757D] ml-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-[#6C757D] ml-1">
                        Subject
                      </label>
                      <div className="relative">
                        <select className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all">
                          <option value="">Select a topic</option>
                          <option value="enrollment">Program Enrollment</option>
                          <option value="corporate">Corporate Training</option>
                          <option value="consultancy">Consultancy Services</option>
                          <option value="general">General Inquiry</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5 flex-1 flex flex-col">
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-[#6C757D] ml-1">
                        Message
                      </label>
                      <textarea
                        placeholder="How can we help?"
                        className="w-full flex-1 h-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-14 flex items-center justify-center gap-3 rounded-full bg-black text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-[0.98] shadow-lg mt-2"
                    >
                      Send Message 
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section / Success Quote */}
        <section className="bg-[#F8FAFC] py-20 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <div className="flex justify-center mb-8">
              <div className="h-16 w-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#212529] mb-6 tracking-tight">
              Committed to Your Growth
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed italic">
              &quot;At Trust Axis, our mission is to narrow the gap between academic theory and industry practice. 
              Every inquiry we receive is a chance to help a professional or an organization take their next 
              strategic step. We look forward to connecting with you.&quot;
            </p>
            <div className="mt-8">
              <p className="font-bold text-black uppercase tracking-widest text-xs">— The Trust Axis Leadership Team</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
