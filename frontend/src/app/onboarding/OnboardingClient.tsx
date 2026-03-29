"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useSession } from "@/lib/auth-client";

// ─── Static data ─────────────────────────────────────────────────────────────
const STATUS_OPTIONS = [
  { value: "student", label: "Student", emoji: "🎓", desc: "Currently enrolled in a program" },
  { value: "working_professional", label: "Working Professional", emoji: "💼", desc: "Employed and looking to upskill" },
  { value: "job_seeker", label: "Job Seeker", emoji: "🔍", desc: "Actively looking for a role" },
];

const INTEREST_OPTIONS = [
  { value: "data_science", label: "Data Science", emoji: "📊" },
  { value: "ai_ml", label: "AI / ML", emoji: "🤖" },
  { value: "cybersecurity", label: "Cybersecurity", emoji: "🔒" },
  { value: "product_management", label: "Product Management", emoji: "📋" },
  { value: "business_finance", label: "Business / Finance", emoji: "📈" },
  { value: "programming", label: "Programming", emoji: "💻" },
  { value: "ux_design", label: "UX Design", emoji: "🎨" },
  { value: "marketing", label: "Digital Marketing", emoji: "📣" },
];

const GOAL_OPTIONS = [
  { value: "get_a_job", label: "Get a New Job", emoji: "🏆" },
  { value: "switch_career", label: "Switch Career", emoji: "🔄" },
  { value: "upskill", label: "Upskill at Work", emoji: "🚀" },
  { value: "certification", label: "Get Certified", emoji: "🎯" },
  { value: "side_project", label: "Build Side Projects", emoji: "⚡" },
  { value: "academic", label: "Academic Growth", emoji: "📚" },
];

// ─── Left Panel ───────────────────────────────────────────────────────────────
function LeftPanel({ step }: { step: number }) {
  const panels = [
    {
      title: "Tell us about yourself",
      subtitle: "This helps us personalise your learning experience from day one.",
      emoji: "👋",
    },
    {
      title: "What are your goals?",
      subtitle: "We'll curate the best programs and mentors to help you get there faster.",
      emoji: "🎯",
    },
    {
      title: "Almost there!",
      subtitle: "A few more details to complete your Trust Axis profile.",
      emoji: "✨",
    },
  ];

  const panel = panels[step - 1];

  return (
    <div className="hidden lg:flex flex-col justify-between h-full bg-gray-50 border-r border-gray-100 p-12">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center bg-black text-white font-bold text-sm rounded-sm tracking-tighter">TA</div>
        <span className="text-lg font-bold tracking-tight text-gray-900">Trust Axis</span>
      </div>

      {/* Illustration area */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="text-8xl">{panel.emoji}</div>
        <div className="space-y-3 max-w-xs">
          <h2 className="text-2xl font-bold text-gray-900 leading-snug">{panel.title}</h2>
          <p className="text-gray-500 text-sm leading-relaxed">{panel.subtitle}</p>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${
              s === step ? "w-8 bg-[#007BFF]" : s < step ? "w-3 bg-[#007BFF]/40" : "w-3 bg-gray-200"
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-gray-400 font-medium">{step} of 3</span>
      </div>
    </div>
  );
}

// ─── Chip button ──────────────────────────────────────────────────────────────
function Chip({ label, emoji, selected, onClick }: { label: string; emoji: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
        selected
          ? "border-[#007BFF] bg-blue-50 text-[#007BFF]"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}

// ─── Radio Card ───────────────────────────────────────────────────────────────
function RadioCard({ label, emoji, desc, selected, onClick }: { label: string; emoji: string; desc: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
        selected
          ? "border-[#007BFF] bg-blue-50"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span className="text-2xl mt-0.5">{emoji}</span>
      <div>
        <p className={`font-semibold text-sm ${selected ? "text-[#007BFF]" : "text-gray-900"}`}>{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <div className={`ml-auto mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
        selected ? "border-[#007BFF] bg-[#007BFF]" : "border-gray-300"
      }`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OnboardingClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentStatus, setCurrentStatus] = useState("");
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const toggleArray = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const canProceed = () => {
    if (step === 1) return !!currentStatus;
    if (step === 2) return goals.length > 0;
    return true;
  };

  const handleNext = async () => {
    if (step < 3) { setStep(step + 1); return; }

    // Step 3 — finish
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStatus,
          areasOfInterest: areasOfInterest,
          goals: goals,
          phone,
          linkedinUrl,
        }),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      router.push("/");
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full grid lg:grid-cols-[420px_1fr] overflow-hidden bg-white">
      <LeftPanel step={step} />

      {/* Right panel */}
      <div className="flex flex-col h-full overflow-y-auto bg-white relative">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-black text-white font-bold text-xs rounded-sm">TA</div>
            <span className="font-bold text-gray-900">Trust Axis</span>
          </div>
          <span className="text-sm text-gray-500">Step {step} of 3</span>
        </div>

        {/* Content */}
        <div className="flex flex-col min-h-full py-10 px-6 lg:px-20 max-w-2xl mx-auto w-full justify-center">
          
          {/* ── Step 1: Who are you? ── */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">What best describes you?</h1>
                <p className="text-sm text-gray-500 mt-1.5">Select the option that fits you best right now.</p>
              </div>
              <div className="space-y-3">
                {STATUS_OPTIONS.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    {...opt}
                    selected={currentStatus === opt.value}
                    onClick={() => setCurrentStatus(opt.value)}
                  />
                ))}
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Areas of Interest</h2>
                <p className="text-sm text-gray-500 mb-3">Select all that apply — even if you're just curious.</p>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((opt) => (
                    <Chip
                      key={opt.value}
                      label={opt.label}
                      emoji={opt.emoji}
                      selected={areasOfInterest.includes(opt.value)}
                      onClick={() => toggleArray(areasOfInterest, setAreasOfInterest, opt.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Goals ── */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">What are your goals?</h1>
                <p className="text-sm text-gray-500 mt-1.5">Pick what you're working towards. You can have multiple.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {GOAL_OPTIONS.map((opt) => (
                  <Chip
                    key={opt.value}
                    label={opt.label}
                    emoji={opt.emoji}
                    selected={goals.includes(opt.value)}
                    onClick={() => toggleArray(goals, setGoals, opt.value)}
                  />
                ))}
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-1">Mobile Number <span className="text-gray-400 font-normal text-sm">(optional)</span></h2>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          {/* ── Step 3: Quick Profile ── */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Complete your profile</h1>
                <p className="text-sm text-gray-500 mt-1.5">A quick intro before you start. You can always update this later.</p>
              </div>

              <div className="space-y-4">
                {session?.user && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {session.user.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
                      ) : (
                        session.user.name?.charAt(0).toUpperCase() ?? "U"
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{session.user.name}</p>
                      <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                  </div>
                )}



                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">LinkedIn URL <span className="text-gray-400 font-normal">(optional)</span></label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 mt-4">{error}</p>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-10">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <ChevronLeft size={18} />
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold text-sm tracking-wide transition-all shadow-sm shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : step === 3 ? (
                <><CheckCircle size={18} /> Finish Setup</>
              ) : (
                <>Continue <ChevronRight size={18} /></>
              )}
            </button>
          </div>

          {step === 1 && (
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-4 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
