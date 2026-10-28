"use client";

import { useState } from "react";
import { ChevronDown, Send } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_SUBJECTS, isContactSubject, type ContactSubject } from "@/lib/site";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  variant?: "light" | "dark";
  defaultSubject?: ContactSubject;
  /** Course or practice area the enquiry is about, pre-filled into the message. */
  topic?: string;
  /** Tighter spacing and a shorter message box, for embedding in a page section. */
  compact?: boolean;
}

const styles = {
  light: {
    label: "text-[#6C757D]",
    field: "border-gray-200 bg-white text-[#212529] placeholder:text-gray-400 focus:ring-primary/5 focus:border-primary/20",
    button: "bg-black text-white hover:bg-primary",
    note: "text-[#6C757D]",
  },
  dark: {
    label: "text-white/60",
    field: "border-white/20 bg-white/10 text-white placeholder:text-white/30 focus:ring-blue-400/30 focus:border-blue-400",
    button: "bg-blue-600 text-white hover:bg-blue-700",
    note: "text-white/50",
  },
};

function defaultMessage(subject: ContactSubject | undefined, topic: string | undefined): string {
  if (!topic) return "";
  if (subject === "enrollment") return `I would like to enrol in ${topic}. Please share upcoming cohort dates and fees.`;
  if (subject === "brochure") return `Please send me the brochure for ${topic}.`;
  return `I would like to discuss ${topic}.`;
}

/**
 * Enquiry form used on /contact and the Home page. There is no form backend,
 * so submitting opens the visitor's email client with the enquiry addressed
 * to the shared mailbox.
 */
export function ContactForm({ variant = "light", defaultSubject, topic, compact = false }: ContactFormProps) {
  const s = styles[variant];
  const [sent, setSent] = useState(false);

  const fieldClass = cn(
    "w-full h-12 px-4 rounded-xl border text-sm focus:outline-none focus:ring-4 transition-all",
    s.field
  );
  const labelClass = cn("block text-[10px] font-bold uppercase tracking-widest ml-1", s.label);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const subjectKey = value("subject");
    const subject = isContactSubject(subjectKey) ? CONTACT_SUBJECTS[subjectKey] : "Website Enquiry";

    const details = [`Name: ${value("name")}`, `Email: ${value("email")}`];
    if (value("phone")) details.push(`Phone: ${value("phone")}`);
    if (value("organization")) details.push(`Organization: ${value("organization")}`);
    const body = `${details.join("\n")}\n\n${value("message")}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${subject}${topic ? ` — ${topic}` : ""}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className={cn("flex-1 flex flex-col", compact ? "space-y-3" : "space-y-4")} onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className={labelClass}>Full Name</label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={fieldClass} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className={labelClass}>Email Address</label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-phone" className={labelClass}>Phone Number</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" className={fieldClass} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-organization" className={labelClass}>Organization</label>
          <input id="contact-organization" name="organization" type="text" autoComplete="organization" placeholder="Optional" className={fieldClass} />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className={labelClass}>Subject</label>
        <div className="relative">
          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue={defaultSubject ?? ""}
            className={cn(fieldClass, "appearance-none cursor-pointer", variant === "dark" && "[&>option]:text-black")}
          >
            <option value="" disabled>Select a topic</option>
            {Object.entries(CONTACT_SUBJECTS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <ChevronDown className={cn("absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none", s.label)} />
        </div>
      </div>
      <div className="space-y-1.5 flex-1 flex flex-col">
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          defaultValue={defaultMessage(defaultSubject, topic)}
          placeholder="How can we help?"
          className={cn(fieldClass, "flex-1 h-full py-3 resize-y", compact ? "min-h-[96px]" : "min-h-[140px]")}
        />
      </div>
      <button
        type="submit"
        className={cn(
          "w-full h-14 flex items-center justify-center gap-3 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-lg mt-2",
          s.button
        )}
      >
        Send Message
        <Send className="h-4 w-4" />
      </button>
      <p className={cn("text-center text-[11px]", s.note)} aria-live="polite">
        {sent
          ? `Your email app should open with the message ready to send. If it doesn't, write to ${CONTACT_EMAIL}.`
          : `Sends your enquiry to ${CONTACT_EMAIL} using your email app.`}
      </p>
    </form>
  );
}
