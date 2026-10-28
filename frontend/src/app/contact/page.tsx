import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, Clock, Shield } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, OFFICE_ADDRESS, isContactSubject } from "@/lib/site";

export const metadata = {
  title: "Contact Us",
  description: "Contact Trust Axis about consultancy, certification training, corporate programs or any other enquiry. Office at Goldhill Plaza, Singapore.",
};

const contactDetails = [
  {
    icon: Mail,
    label: "Email Us",
    value: CONTACT_EMAIL,
    sub: "We respond within one business day",
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: CONTACT_PHONE,
    sub: "Mon–Fri, 9 AM – 6 PM SGT",
    href: CONTACT_PHONE_HREF,
  },
  {
    icon: MapPin,
    label: "Our Office",
    value: "51 GOLDHILL PLAZA #07-07",
    sub: "SINGAPORE 308900",
    href: `https://maps.google.com/?q=${encodeURIComponent(OFFICE_ADDRESS)}`,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Fri",
    sub: "9:00 AM – 6:00 PM SGT",
    href: undefined,
  },
];

interface Props {
  searchParams: Promise<{ subject?: string; topic?: string }>;
}

export default async function ContactPage({ searchParams }: Props) {
  const { subject, topic } = await searchParams;
  const defaultSubject = isContactSubject(subject) ? subject : undefined;

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
              Questions about our consultancy, programs or corporate training? We&apos;d love to hear from you.
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
                      const Wrapper = detail.href ? "a" : "div";
                      return (
                        <Wrapper
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
                        </Wrapper>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                    <h3 className="text-lg font-bold mb-2">Quick Chat?</h3>
                    <p className="text-gray-400 text-[13px] leading-relaxed mb-6 max-w-sm">
                      Call an advisor during business hours for personalized guidance.
                    </p>
                    <a
                      href={CONTACT_PHONE_HREF}
                      className="inline-flex items-center justify-center w-full sm:w-auto px-6 h-12 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-transparent shadow-lg"
                    >
                      Call {CONTACT_PHONE}
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
                  
                  <ContactForm defaultSubject={defaultSubject} topic={topic} />
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
