"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface ProfileData {
  phone?: string | null;
  linkedinUrl?: string | null;
  currentStatus?: string | null;
  areaOfInterest?: string[];
  goal?: string[];
  educationLevel?: string | null;
  degree?: string | null;
  college?: string | null;
  graduationYear?: number | null;
  currentCompany?: string | null;
  jobRole?: string | null;
  yearsExperience?: number | null;
  skillsKnown?: string[];
  toolsKnown?: string[];
  skillLevel?: string | null;
  targetJobRole?: string | null;
  targetCompanies?: string[];
  expectedSalary?: string | null;
  resumeUrl?: string | null;
  studyHoursPerWeek?: number | null;
  learningMode?: string | null;
}

interface Props {
  userId: string;
  initialProfile: ProfileData | null;
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="p-6 space-y-5">
        {children}
      </div>
    </div>
  );
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        {label}
        {optional && <span className="text-xs font-normal text-gray-400">optional</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full h-11 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:bg-white transition-all";
const selectCls = "w-full h-11 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer";

export default function ProfileForm({ userId, initialProfile }: Props) {
  const [form, setForm] = useState<ProfileData>(initialProfile ?? {});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userId,
          areasOfInterest: form.areaOfInterest,
          goals: form.goal,
          skills: form.skillsKnown,
          tools: form.toolsKnown,
        }),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-20 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 -mx-6 px-6 py-3 flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">Edit Your Profile</p>
        <div className="flex items-center gap-3">
          {error && <p className="text-sm text-red-500">{error}</p>}
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
              <CheckCircle size={16} /> Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold text-sm transition-all disabled:opacity-60 flex items-center gap-2"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            Save Changes
          </button>
        </div>
      </div>

      <Section title="About" description="Basic personal information">
        <Field label="Phone" optional>
          <input type="tel" value={form.phone ?? ""} onChange={set("phone")} placeholder="+91 98765 43210" className={inputCls} />
        </Field>
        <Field label="LinkedIn URL" optional>
          <input type="url" value={form.linkedinUrl ?? ""} onChange={set("linkedinUrl")} placeholder="https://linkedin.com/in/yourname" className={inputCls} />
        </Field>
      </Section>

      <Section title="Education">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Education Level">
            <select value={form.educationLevel ?? ""} onChange={set("educationLevel")} className={selectCls}>
              <option value="">Select level</option>
              <option value="high_school">High School</option>
              <option value="diploma">Diploma</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="phd">PhD</option>
            </select>
          </Field>
          <Field label="Degree" optional>
            <input value={form.degree ?? ""} onChange={set("degree")} placeholder="e.g. B.Tech Computer Science" className={inputCls} />
          </Field>
          <Field label="College / University" optional>
            <input value={form.college ?? ""} onChange={set("college")} placeholder="e.g. IIT Delhi" className={inputCls} />
          </Field>
          <Field label="Graduation Year" optional>
            <input 
              type="number" 
              value={form.graduationYear ?? ""} 
              onChange={(e) => setForm(f => ({ ...f, graduationYear: e.target.value ? parseInt(e.target.value) : null }))} 
              placeholder="e.g. 2025" 
              className={inputCls} 
            />
          </Field>
        </div>
      </Section>

      <Section title="Work Experience">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Current Company" optional>
            <input value={form.currentCompany ?? ""} onChange={set("currentCompany")} placeholder="e.g. Google" className={inputCls} />
          </Field>
          <Field label="Role" optional>
            <input value={form.jobRole ?? ""} onChange={set("jobRole")} placeholder="e.g. Software Engineer" className={inputCls} />
          </Field>
          <Field label="Years of Experience" optional>
            <input 
              type="number" 
              value={form.yearsExperience ?? ""} 
              onChange={(e) => setForm(f => ({ ...f, yearsExperience: e.target.value ? parseInt(e.target.value) : null }))} 
              placeholder="e.g. 2" 
              className={inputCls} 
            />
          </Field>
        </div>
      </Section>

      <Section title="Skills & Tools" description="What you know and work with">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Skills" optional>
            <input
              value={(form.skillsKnown ?? []).join(", ")}
              onChange={(e) => setForm((f) => ({ ...f, skillsKnown: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
              placeholder="e.g. Python, React, SQL"
              className={inputCls}
            />
          </Field>
          <Field label="Tools" optional>
            <input
              value={(form.toolsKnown ?? []).join(", ")}
              onChange={(e) => setForm((f) => ({ ...f, toolsKnown: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))}
              placeholder="e.g. Figma, Jira, VS Code"
              className={inputCls}
            />
          </Field>
          <Field label="Skill Level">
            <select value={form.skillLevel ?? ""} onChange={set("skillLevel")} className={selectCls}>
              <option value="">Select</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </Field>
        </div>
      </Section>

      <Section title="Career Goals">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Target Role" optional>
            <input value={form.targetJobRole ?? ""} onChange={set("targetJobRole")} placeholder="e.g. Product Manager" className={inputCls} />
          </Field>
          <Field label="Desired Salary" optional>
            <input value={form.expectedSalary ?? ""} onChange={set("expectedSalary")} placeholder="e.g. ₹15 LPA" className={inputCls} />
          </Field>
          <Field label="Resume URL" optional>
            <input type="url" value={form.resumeUrl ?? ""} onChange={set("resumeUrl")} placeholder="Link to your resume" className={inputCls} />
          </Field>
        </div>
      </Section>

      <Section title="Learning Preferences">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Hours per Week" optional>
            <input 
              type="number" 
              value={form.studyHoursPerWeek ?? ""} 
              onChange={(e) => setForm(f => ({ ...f, studyHoursPerWeek: e.target.value ? parseInt(e.target.value) : null }))} 
              placeholder="e.g. 10" 
              className={inputCls} 
            />
          </Field>
          <Field label="Learning Mode" optional>
            <select value={form.learningMode ?? ""} onChange={set("learningMode")} className={selectCls}>
              <option value="">Select</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </Field>
        </div>
      </Section>
    </div>
  );
}
