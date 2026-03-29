"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroCarousel } from "@/components/hero-carousel";
import { AnimatedCounter } from "@/components/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, Monitor, Award, CheckCircle, Search, Filter, ArrowRight, LineChart, Brain, Shield, Globe, Code, GraduationCap, Users, TrendingUp, Library, Newspaper, FileText, ChevronLeft, ChevronRight, UserCircle, Briefcase, Linkedin, Twitter, BookOpen } from "lucide-react";
import { COURSES_SITE_URL } from "@/lib/url";

// ─── Course Data ──────────────────────────────────────────────────────────────
const allCourses = [
  {
    slug: "advanced-data-analytics",
    title: "Advanced Data Analytics",
    category: "Data Science",
    description: "Master data analysis, visualization, and machine learning techniques from industry experts.",
    duration: "6 Months",
    mode: "Online",
    icon: LineChart,
  },
  {
    slug: "product-management",
    title: "Product Management",
    category: "Business",
    description: "Learn to build and launch successful products from ideation to market rollout.",
    duration: "8 Months",
    mode: "Hybrid",
    icon: Brain,
  },
  {
    slug: "cdpse",
    title: "CDPSE – Certified Data Privacy Solutions Engineer",
    category: "Cybersecurity",
    description: "Focuses on data privacy governance, privacy program implementation, and data protection.",
    duration: "Flexible",
    mode: "Online / Hybrid",
    icon: Shield,
    image: "/images/courses/cdpse.webp",
  },
  {
    slug: "iso-20000",
    title: "ISO/IEC 20000 Lead Implementer",
    category: "Business",
    description: "Focuses on IT Service Management Systems implementation and IT service delivery.",
    duration: "Flexible",
    mode: "Online / Hybrid",
    icon: Globe,
    image: "",
  },
  {
    slug: "cism",
    title: "CISM – Certified Information Security Manager",
    category: "Cybersecurity",
    description: "Focuses on security governance, risk management, and security program management.",
    duration: "Flexible",
    mode: "Online / Hybrid",
    icon: Code,
    image: "/images/courses/cism.png",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Data Analyst",
    company: "TechCorp",
    quote:
      "The Data Science program completely transformed my career trajectory. The curriculum was meticulously structured — from foundational statistics to advanced ML pipelines. The hands-on capstone projects gave me a portfolio that impressed every interviewer. Within two months of graduating, I landed a senior analyst role at a Fortune 500 company with a 60% salary increase. The instructors were always available, and the peer community was incredibly supportive throughout the journey.",
  },
  {
    name: "Michael Chen",
    title: "Product Manager",
    company: "StartupXYZ",
    quote:
      "Outstanding learning experience from day one. The Product Management course seamlessly bridged the gap between engineering thinking and business strategy. Real-world case studies, live product critiques, and guest sessions from PMs at top tech companies made the curriculum feel genuinely relevant. I was able to transition from a software engineering background into product leadership within six months. The career coaching sessions were particularly invaluable in refining my narrative for interviews.",
  },
  {
    name: "Priya Sharma",
    title: "Software Engineer",
    company: "CloudSolutions",
    quote:
      "Trust Axis stands out because of the quality of its instructors — every one of them is an active practitioner in their domain. The Cloud & DevOps program covered everything from containerization to CI/CD pipelines with real enterprise tooling. The labs were incredibly practical, and the structured mentorship ensured I never felt stuck. The career support team helped me secure my dream job within weeks of graduation, and my manager specifically mentioned how ready-to-contribute I was from day one.",
  },
  {
    name: "Ahmed Al-Rashidi",
    title: "Cybersecurity Analyst",
    company: "SecureNet Global",
    quote:
      "I had tried other online platforms before, but Trust Axis was on a completely different level. The Information Security program was comprehensive, covering both offensive and defensive security with real penetration testing labs. The certification preparation was embedded naturally into the curriculum, helping me pass my CEH and CompTIA Security+ exams on the first attempt. The cohort-based model meant I had study partners who pushed me to stay consistent, which made all the difference.",
  },
  {
    name: "Neha Gupta",
    title: "Business Analyst",
    company: "FinEdge Capital",
    quote:
      "As someone transitioning from a finance background into tech, I was initially nervous about keeping up. The instructors at Trust Axis were patient and structured the program to accommodate learners at all levels. The machine learning modules were made incredibly approachable while still being industry-relevant. By the time I finished, I had built three production-ready models and a solid understanding of how AI is reshaping the financial sector. I now lead the data analytics initiative at my firm.",
  },
];

// ─── Instructors ──────────────────────────────────────────────────────────────
const instructors = [
  {
    name: "Dr. James Patterson",
    title: "Information Security Expert",
    exp: "20+ Years Experience",
    certs: ["CISSP", "CEH", "CISM"],
  },
  {
    name: "Emily Rodriguez",
    title: "Cybersecurity Specialist",
    exp: "15+ Years Experience",
    certs: ["CompTIA Security+", "OSCP", "AWS Security"],
  },
  {
    name: "David Kumar",
    title: "Network Security Architect",
    exp: "18+ Years Experience",
    certs: ["CCNA Security", "CCIE", "PMP"],
  },
  {
    name: "Lisa Thompson",
    title: "Penetration Testing Lead",
    exp: "12+ Years Experience",
    certs: ["GPEN", "eJPT", "CEH Master"],
  },
];

// ─── Partners ────────────────────────────────────────────────────────────────
const partners = [
  "Microsoft", "AWS", "Google Cloud", "Cisco", "Palo Alto Networks", "CrowdStrike",
  "ISACA", "CompTIA", "Goldman Sachs", "JPMorgan Chase", "IBM Security", "Fortinet",
];

export default function Home() {
  const [showMoreCourses, setShowMoreCourses] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isTestiAutoplay, setIsTestiAutoplay] = useState(true);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const visibleCourses = showMoreCourses ? allCourses : allCourses.slice(0, 3);

  // Testimonial autoplay
  useEffect(() => {
    if (!isTestiAutoplay) return;
    autoplayRef.current = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [isTestiAutoplay, testimonialIndex]);

  const prevTestimonial = useCallback(() => {
    setIsTestiAutoplay(false);
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const nextTestimonial = useCallback(() => {
    setIsTestiAutoplay(false);
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroCarousel />

        {/* 2. Stats Section */}
        <section id="about" className="bg-white py-16 md:py-20 border-b border-[#F4F4F5] scroll-mt-[90px]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  value: 50000,
                  suffix: "+",
                  label: "Students Enrolled",
                  subtext: "Professionals trained globally",
                  icon: GraduationCap,
                  accent: "#007BFF",
                },
                {
                  value: 200,
                  suffix: "+",
                  label: "Expert Instructors",
                  subtext: "Industry-active practitioners",
                  icon: Users,
                  accent: "#10B981",
                },
                {
                  value: 95,
                  suffix: "%",
                  label: "Completion Rate",
                  subtext: "Consistent learner success",
                  icon: Award,
                  accent: "#F59E0B",
                },
                {
                  value: 85,
                  suffix: "%",
                  label: "Career Advancement",
                  subtext: "Graduates promoted or hired",
                  icon: TrendingUp,
                  accent: "#8B5CF6",
                },
              ].map((stat, i) => {
                const IconComp = stat.icon;
                return (
                  <div
                    key={i}
                    className="group flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${stat.accent}15` }}
                    >
                      <IconComp className="h-6 w-6" style={{ color: stat.accent }} />
                    </div>
                    <div>
                      <h4 className="text-3xl md:text-4xl font-bold tracking-tight text-[#212529]">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </h4>
                      <p className="mt-1 text-sm font-bold uppercase tracking-widest text-[#212529]">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-xs text-[#6C757D]">{stat.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Popular Programs Section */}
        <section id="courses" className="bg-white py-16 md:py-24 border-b border-[#F4F4F5] scroll-mt-[90px]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight mb-2 md:mb-3">Popular Programs</h2>
                <p className="text-[#6C757D] text-sm md:text-lg">Industry-aligned courses to accelerate your career</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-[320px]">
                  <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search courses..." className="pl-10 md:pl-12 h-11 md:h-12 rounded-sm border-gray-200" />
                </div>
                <Button variant="outline" className="h-11 md:h-12 px-4 md:px-6 rounded-sm border-gray-200 font-bold gap-2 text-[#212529]">
                  <Filter className="h-4 w-4" /> <span className="hidden sm:inline">Filter</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {visibleCourses.map((course) => {
                const Icon = course.icon;
                return (
                  <Card key={course.slug} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-[#E5E7EB] flex flex-col h-full bg-white group p-0">
                    <div className="bg-[#212529] aspect-video md:aspect-[16/10] flex flex-col items-center justify-center text-white relative overflow-hidden group-hover:bg-[#18181B] transition-colors">
                      {course.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                      ) : (
                        <>
                          <Icon className="h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-semibold tracking-wide text-xs md:text-sm opacity-90">Course Preview</span>
                        </>
                      )}
                    </div>
                    <CardContent className="p-5 md:p-8 flex flex-col flex-1">
                      <div className="flex justify-between items-center mb-4 md:mb-5">
                        <Badge variant="secondary" className="bg-[#F4F4F5] text-[#212529] hover:bg-[#E5E7EB] rounded-sm font-bold text-[10px] uppercase tracking-wider px-2 md:px-3 py-1 md:py-1.5">
                          {course.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#212529] mb-2 md:mb-3 leading-tight tracking-tight">{course.title}</h3>
                      <p className="text-sm md:text-[15px] text-[#6C757D] mb-6 md:mb-8 flex-1 leading-relaxed">{course.description}</p>

                      <div className="flex justify-between items-center text-xs md:text-sm text-[#6C757D] font-medium mb-6 md:mb-8">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 md:h-4 w-3.5 md:w-4" /> {course.duration}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Monitor className="h-3.5 md:h-4 w-3.5 md:w-4" /> {course.mode}
                        </div>
                      </div>
                      <a
                        href={`${COURSES_SITE_URL}/courses/${course.slug}`}
                        className="w-full inline-flex items-center justify-center h-11 md:h-12 text-xs md:text-sm uppercase tracking-wider font-bold rounded-sm bg-black text-white hover:bg-black/90 transition-colors"
                      >
                        Enroll Now
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 md:mt-16 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowMoreCourses((v) => !v)}
                className="h-11 md:h-12 px-8 md:px-10 font-bold border border-gray-300 text-[#212529] hover:bg-gray-50 rounded-sm uppercase tracking-widest text-[10px] md:text-[11px]"
              >
                {showMoreCourses ? "Show Less" : "Explore More"}
              </Button>
            </div>
          </div>
        </section>

        {/* 4. Partners Section */}
        <section className="py-16 md:py-24 bg-[#F9FAFB] border-b border-[#F4F4F5] overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#212529] tracking-tight">Our Partners</h2>
            </div>
          </div>

          <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start animate-infinite-scroll">
              {[1, 2].map((set) => (
                <div key={set} className="flex gap-6 md:gap-10 px-4 items-center">
                  {partners.map((name, i) => (
                    <li
                      key={i}
                      className="flex flex-col items-center justify-center bg-white px-6 md:px-10 py-4 md:py-6 rounded-lg border border-[#F4F4F5] shadow-sm w-[140px] md:w-[200px] group transition-all duration-300 hover:shadow-md hover:border-gray-200"
                    >
                      <div className="h-8 w-8 rounded-sm bg-[#212529] opacity-70 group-hover:opacity-100 transition-opacity duration-300 shrink-0 mb-3" />
                      <span className="text-[10px] md:text-[11px] font-bold text-gray-500 group-hover:text-gray-800 tracking-widest uppercase transition-colors duration-300 text-center leading-tight">
                        {name}
                      </span>
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Learning Resources Section */}
        <section id="resources" className="bg-white py-16 md:py-24 border-b border-[#F4F4F5] scroll-mt-[90px]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Learning Resources</h2>
              <p className="text-[#6C757D] text-sm md:text-base">Expand your knowledge with our curated content</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-[#E5E7EB] flex flex-col h-full bg-white group p-0">
                <div className="bg-[#212529] aspect-video md:aspect-[16/10] flex flex-col items-center justify-center text-white relative">
                  <Library className="h-10 w-10 md:h-14 md:w-14 mb-3 md:mb-4 opacity-90 group-hover:-translate-y-2 transition-transform duration-300" />
                  <span className="font-bold text-base md:text-lg tracking-wide opacity-90">Blog Articles</span>
                </div>
                <CardContent className="p-5 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[#212529] mb-2 md:mb-3 tracking-tight">Blogs</h3>
                  <p className="text-sm md:text-[15px] text-[#6C757D] mb-6 md:mb-8 flex-1 leading-relaxed">Stay updated with the latest developments in technology, business, and education from our expert authors.</p>
                  <a href="/resources" className="font-bold flex items-center text-[#212529] hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] md:text-[11px]">
                    Explore Blogs <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-[#E5E7EB] flex flex-col h-full bg-white group p-0">
                <div className="bg-[#212529] aspect-video md:aspect-[16/10] flex flex-col items-center justify-center text-white relative">
                  <Newspaper className="h-10 w-10 md:h-14 md:w-14 mb-3 md:mb-4 opacity-90 group-hover:-translate-y-2 transition-transform duration-300" />
                  <span className="font-bold text-base md:text-lg tracking-wide opacity-90">Articles</span>
                </div>
                <CardContent className="p-5 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[#212529] mb-2 md:mb-3 tracking-tight">Articles</h3>
                  <p className="text-sm md:text-[15px] text-[#6C757D] mb-6 md:mb-8 flex-1 leading-relaxed">Deep-dive articles on technical topics, career guidance, and practical skill development strategies.</p>
                  <a href="/resources" className="font-bold flex items-center text-[#212529] hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] md:text-[11px]">
                    Read Articles <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-[#E5E7EB] flex flex-col h-full bg-white group p-0">
                <div className="bg-[#212529] aspect-video md:aspect-[16/10] flex flex-col items-center justify-center text-white relative">
                  <FileText className="h-10 w-10 md:h-14 md:w-14 mb-3 md:mb-4 opacity-90 group-hover:-translate-y-2 transition-transform duration-300" />
                  <span className="font-bold text-base md:text-lg tracking-wide opacity-90">White Papers</span>
                </div>
                <CardContent className="p-5 md:p-8 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-[#212529] mb-2 md:mb-3 tracking-tight">Research & Reports</h3>
                  <p className="text-sm md:text-[15px] text-[#6C757D] mb-6 md:mb-8 flex-1 leading-relaxed">Comprehensive research papers and industry reports for in-depth learning and analysis.</p>
                  <a href="/resources" className="font-bold flex items-center text-[#212529] hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] md:text-[11px]">
                    Download Papers <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. Testimonials Carousel */}
        <section className="bg-[#F9FAFB] py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Student Success Stories</h2>
              <p className="text-[#6C757D] text-sm md:text-lg">Hear from our graduates who transformed their careers</p>
            </div>

            <div className="relative">
              {/* Prev Arrow */}
              <button
                onClick={prevTestimonial}
                className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 text-[#212529] transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Card */}
              <div className="mx-6 md:mx-10 overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
                >
                  {testimonials.map((t, i) => (
                    <div key={i} className="w-full flex-shrink-0 px-2 md:px-4">
                      <Card className="rounded-xl border border-gray-100 shadow-sm bg-white p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                        {/* Left: avatar + info */}
                        <div className="flex flex-col items-center md:items-start gap-3 md:min-w-[160px]">
                          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-[#F4F4F5] border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                            <UserCircle className="h-full w-full text-[#6C757D] stroke-[0.75px]" />
                          </div>
                          <div className="text-center md:text-left">
                            <h4 className="font-bold text-[#212529] text-sm md:text-base">{t.name}</h4>
                            <p className="text-xs text-[#6C757D] mt-0.5">{t.title}</p>
                            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest text-[#212529] bg-[#F4F4F5] px-2 py-0.5 rounded-sm">{t.company}</span>
                          </div>
                        </div>
                        {/* Right: quote */}
                        <div className="flex-1">
                          <BookOpen className="h-8 w-8 text-[#E5E7EB] mb-4" />
                          <p className="text-[#4A5568] text-sm md:text-base leading-relaxed font-medium">{t.quote}</p>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Arrow */}
              <button
                onClick={nextTestimonial}
                className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 text-[#212529] transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIsTestiAutoplay(false); setTestimonialIndex(i); }}
                    className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIndex ? "w-6 bg-[#212529]" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Instructors Section */}
        <section className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Meet Our Expert Instructors</h2>
              <p className="text-[#6C757D] text-sm md:text-lg">Learn from industry leaders with decades of experience</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
              {instructors.map((instructor, i) => (
                <Card key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-md bg-white flex flex-col p-0 group">
                  <div className="aspect-[4/3] bg-gradient-to-b from-[#5c5c5c] to-[#2a2a2a] flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <UserCircle className="w-1/2 h-1/2 md:w-2/3 md:h-2/3 text-white/10" strokeWidth={0.5} />
                    </div>
                  </div>
                  <CardContent className="p-5 md:p-6 text-center flex flex-col items-center">
                    <h3 className="font-bold text-[#212529] text-base mb-1 md:mb-1.5">{instructor.name}</h3>
                    <p className="text-xs md:text-[13px] text-[#6C757D] mb-3">{instructor.title}</p>
                    <div className="flex items-center justify-center gap-1.5 md:gap-2 text-xs md:text-[13px] font-medium text-[#4A5568] mb-4">
                      <Briefcase className="h-3.5 w-3.5 md:h-[14px] md:w-[14px] text-[#6C757D]" /> {instructor.exp}
                    </div>
                    {/* Certifications */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                      {instructor.certs.map((cert, j) => (
                        <span key={j} className="inline-flex items-center gap-1 rounded-sm bg-[#F4F4F5] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#212529]">
                          <Award className="h-2.5 w-2.5" />
                          {cert}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center gap-4 text-[#8C8C8C]">
                      <Linkedin className="h-4 w-4 hover:text-[#0a66c2] cursor-pointer transition-colors" />
                      <Twitter className="h-4 w-4 hover:text-black cursor-pointer transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Contact Us */}
        <section id="contact" className="bg-white py-16 md:py-24 border-b border-[#F4F4F5] scroll-mt-[90px]">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Get In Touch</h2>
              <p className="text-[#6C757D] text-sm md:text-lg">Have questions? We&apos;re here to help you get started.</p>
            </div>

            <Card className="rounded-2xl border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] bg-[#F8FAFC] p-6 md:p-12">
              <form className="space-y-5 md:space-y-6">
                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="fullName" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-500 mb-1 ml-1">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" className="h-12 md:h-14 bg-white border-gray-200 rounded-md shadow-sm focus-visible:ring-black" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="email" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-500 mb-1 ml-1">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="h-12 md:h-14 bg-white border-gray-200 rounded-md shadow-sm focus-visible:ring-black" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="phone" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-500 mb-1 ml-1">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-12 md:h-14 bg-white border-gray-200 rounded-md shadow-sm focus-visible:ring-black" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="message" className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-500 mb-1 ml-1">Message</Label>
                  <Textarea id="message" placeholder="Tell us how we can help you..." className="min-h-[120px] md:min-h-[160px] bg-white border-gray-200 rounded-md shadow-sm resize-y focus-visible:ring-black p-4 text-sm" />
                </div>
                <Button className="w-full h-12 md:h-14 text-xs md:text-sm uppercase tracking-widest font-bold rounded-md bg-black text-white hover:bg-black/90 mt-6 shadow-md transition-all">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
