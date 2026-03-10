import { Header } from "@/components/header";
import { HeroCarousel } from "@/components/hero-carousel";
import { AnimatedCounter } from "@/components/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, Search, Filter, Code, LineChart, Shield, Library, Newspaper, FileText, Clock, Star, ArrowRight, Twitter, Linkedin, Facebook, Instagram, UserCircle, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroCarousel />

        {/* 2. Stats Section */}
        <section id="about" className="bg-white py-16 md:py-20 border-b border-[#F4F4F5] scroll-mt-[90px]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <h4 className="text-3xl md:text-5xl font-bold tracking-tight text-[#212529]">
                  <AnimatedCounter value={50000} suffix="+" />
                </h4>
                <p className="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-[#6C757D]">Students Enrolled</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <h4 className="text-3xl md:text-5xl font-bold tracking-tight text-[#212529]">
                  <AnimatedCounter value={200} suffix="+" />
                </h4>
                <p className="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-[#6C757D]">Expert Instructors</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <h4 className="text-3xl md:text-5xl font-bold tracking-tight text-[#212529]">
                  <AnimatedCounter value={95} suffix="%" />
                </h4>
                <p className="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-[#6C757D]">Completion Rate</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                <h4 className="text-3xl md:text-5xl font-bold tracking-tight text-[#212529]">
                  <AnimatedCounter value={85} suffix="%" />
                </h4>
                <p className="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-[#6C757D]">Career Advancement</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Course Catalog Section */}
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
              {/* Course 1 */}
              <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-[#E5E7EB] flex flex-col h-full bg-white group p-0">
                <div className="bg-[#212529] aspect-video md:aspect-[16/10] flex flex-col items-center justify-center text-white relative">
                  <Code className="h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide text-xs md:text-sm opacity-90">Course Preview</span>
                </div>
                <CardContent className="p-5 md:p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-4 md:mb-5">
                    <Badge variant="secondary" className="bg-[#F4F4F5] text-[#212529] hover:bg-[#E5E7EB] rounded-sm font-bold text-[10px] uppercase tracking-wider px-2 md:px-3 py-1 md:py-1.5">Data Science</Badge>
                    <div className="flex items-center text-xs md:text-sm font-bold text-[#212529]">
                      <Star className="h-3 md:h-3.5 w-3 md:w-3.5 fill-current mr-1.5" /> 4.8
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#212529] mb-2 md:mb-3 leading-tight tracking-tight">Advanced Data Analytics</h3>
                  <p className="text-sm md:text-[15px] text-[#6C757D] mb-6 md:mb-8 flex-1 leading-relaxed">Master data analysis, visualization, and machine learning techniques from industry experts.</p>

                  <div className="flex justify-between items-center text-xs md:text-sm text-[#6C757D] font-medium mb-6 md:mb-8">
                    <div className="flex items-center"><Clock className="h-3.5 md:h-4 w-3.5 md:w-4 mr-1.5 md:mr-2" /> 6 Months</div>
                    <div className="flex items-center"><Users className="h-3.5 md:h-4 w-3.5 md:w-4 mr-1.5 md:mr-2" /> 2.5K Students</div>
                  </div>
                  <Button className="w-full h-11 md:h-12 text-xs md:text-sm uppercase tracking-wider font-bold rounded-sm bg-black text-white hover:bg-black/90">Enroll Now</Button>
                </CardContent>
              </Card>

              {/* Course 2 */}
              <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-[#E5E7EB] flex flex-col h-full bg-white group p-0">
                <div className="bg-[#212529] aspect-video md:aspect-[16/10] flex flex-col items-center justify-center text-white relative">
                  <LineChart className="h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide text-xs md:text-sm opacity-90">Course Preview</span>
                </div>
                <CardContent className="p-5 md:p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-4 md:mb-5">
                    <Badge variant="secondary" className="bg-[#F4F4F5] text-[#212529] hover:bg-[#E5E7EB] rounded-sm font-bold text-[10px] uppercase tracking-wider px-2 md:px-3 py-1 md:py-1.5">Business</Badge>
                    <div className="flex items-center text-xs md:text-sm font-bold text-[#212529]">
                      <Star className="h-3 md:h-3.5 w-3 md:w-3.5 fill-current mr-1.5" /> 4.9
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#212529] mb-2 md:mb-3 leading-tight tracking-tight">Product Management</h3>
                  <p className="text-sm md:text-[15px] text-[#6C757D] mb-6 md:mb-8 flex-1 leading-relaxed">Learn to build and launch successful products from ideation to market rollout.</p>

                  <div className="flex justify-between items-center text-xs md:text-sm text-[#6C757D] font-medium mb-6 md:mb-8">
                    <div className="flex items-center"><Clock className="h-3.5 md:h-4 w-3.5 md:w-4 mr-1.5 md:mr-2" /> 8 Months</div>
                    <div className="flex items-center"><Users className="h-3.5 md:h-4 w-3.5 md:w-4 mr-1.5 md:mr-2" /> 3.2K Students</div>
                  </div>
                  <Button className="w-full h-11 md:h-12 text-xs md:text-sm uppercase tracking-wider font-bold rounded-sm bg-black text-white hover:bg-black/90">Enroll Now</Button>
                </CardContent>
              </Card>

              {/* Course 3 */}
              <Card className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-[#E5E7EB] flex flex-col h-full bg-white group p-0">
                <div className="bg-[#212529] aspect-video md:aspect-[16/10] flex flex-col items-center justify-center text-white relative">
                  <Shield className="h-10 w-10 md:h-12 md:w-12 mb-2 md:mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold tracking-wide text-xs md:text-sm opacity-90">Course Preview</span>
                </div>
                <CardContent className="p-5 md:p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-4 md:mb-5">
                    <Badge variant="secondary" className="bg-[#F4F4F5] text-[#212529] hover:bg-[#E5E7EB] rounded-sm font-bold text-[10px] uppercase tracking-wider px-2 md:px-3 py-1 md:py-1.5">Cybersecurity</Badge>
                    <div className="flex items-center text-xs md:text-sm font-bold text-[#212529]">
                      <Star className="h-3 md:h-3.5 w-3 md:w-3.5 fill-current mr-1.5" /> 4.7
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#212529] mb-2 md:mb-3 leading-tight tracking-tight">Information Security</h3>
                  <p className="text-sm md:text-[15px] text-[#6C757D] mb-6 md:mb-8 flex-1 leading-relaxed">Protect systems and data with advanced security protocols and practical implementations.</p>

                  <div className="flex justify-between items-center text-xs md:text-sm text-[#6C757D] font-medium mb-6 md:mb-8">
                    <div className="flex items-center"><Clock className="h-3.5 md:h-4 w-3.5 md:w-4 mr-1.5 md:mr-2" /> 10 Months</div>
                    <div className="flex items-center"><Users className="h-3.5 md:h-4 w-3.5 md:w-4 mr-1.5 md:mr-2" /> 1.8K Students</div>
                  </div>
                  <Button className="w-full h-11 md:h-12 text-xs md:text-sm uppercase tracking-wider font-bold rounded-sm bg-black text-white hover:bg-black/90">Enroll Now</Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 md:mt-16 flex justify-center">
              <Button variant="outline" className="h-11 md:h-12 px-8 md:px-10 font-bold border border-gray-300 text-[#212529] hover:bg-gray-50 rounded-sm uppercase tracking-widest text-[10px] md:text-[11px]">
                Load More Courses
              </Button>
            </div>
          </div>
        </section>

        {/* 4. Infinite Partners Section */}
        <section className="py-16 md:py-24 bg-[#F9FAFB] border-b border-[#F4F4F5] overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12">
            <div className="text-center space-y-2 md:space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-[#212529] tracking-tight">Our Partners</h2>
              <p className="text-[#6C757D] text-sm md:text-base">Trusted by leading organizations worldwide</p>
            </div>
          </div>

          <div className="w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 md:[&_li]:mx-8 animate-infinite-scroll">
              {[1, 2, 3].map((set) => (
                <div key={set} className="flex gap-4 md:gap-8 px-2 md:px-4 items-center">
                  {[
                    { name: 'TECHCORP', color: 'bg-blue-600' },
                    { name: 'INNOVATELABS', color: 'bg-emerald-500' },
                    { name: 'DATASYSTEMS', color: 'bg-indigo-500' },
                    { name: 'CLOUDNINE', color: 'bg-sky-400' },
                    { name: 'SECURENET', color: 'bg-red-500' },
                    { name: 'AIFUTURE', color: 'bg-purple-600' }
                  ].map((partner, i) => (
                    <li key={i} className="flex flex-col items-center justify-center md:bg-white md:px-10 md:py-8 md:rounded-lg md:border md:border-[#F4F4F5] md:shadow-sm w-auto md:w-[180px] px-2 group transition-all duration-300">
                      <div className={`h-12 w-12 rounded-sm bg-black opacity-60 md:opacity-80 group-hover:${partner.color} group-hover:opacity-100 transition-all duration-300 shrink-0`}></div>
                      <span className="hidden md:block text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-4">
                        {partner.name}
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
                  <a href="#" className="font-bold flex items-center text-[#212529] hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] md:text-[11px]">
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
                  <a href="#" className="font-bold flex items-center text-[#212529] hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] md:text-[11px]">
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
                  <a href="#" className="font-bold flex items-center text-[#212529] hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] md:text-[11px]">
                    Download Papers <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. Testimonials Section */}
        <section className="bg-white py-16 md:py-24 border-b border-[#F4F4F5]">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-10 md:mb-16 space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold text-[#212529] tracking-tight">Student Success Stories</h2>
              <p className="text-[#6C757D] text-sm md:text-lg">Hear from our graduates who transformed their careers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  title: "Data Analyst, TechCorp",
                  quote: '"The Data Science program completely transformed my career. The hands-on projects and expert mentorship helped me land a senior analyst role at a Fortune 500 company."'
                },
                {
                  name: "Michael Chen",
                  title: "Product Manager, StartupXYZ",
                  quote: '"Outstanding learning experience! The Product Management course gave me the skills and confidence to transition from engineering to product leadership."'
                },
                {
                  name: "Priya Sharma",
                  title: "Software Engineer, CloudSolutions",
                  quote: '"The instructors are industry experts who provide real-world insights. The career support team helped me secure my dream job within weeks of graduation."'
                }
              ].map((testimonial, i) => (
                <Card key={i} className="rounded-xl border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] bg-[#FAFAFA] p-6 md:p-8 flex flex-col">
                  <div className="flex gap-1.5 mb-5 md:mb-6 text-black">
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                  </div>
                  <p className="text-[#4A5568] text-sm md:text-[15px] leading-relaxed mb-6 md:mb-8 flex-1 font-medium">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                      <UserCircle className="h-full w-full text-black stroke-[1px]" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-[#212529] text-sm truncate">{testimonial.name}</h4>
                      <p className="text-[11px] md:text-xs text-[#6C757D] mt-0.5 md:mt-1 truncate">{testimonial.title}</p>
                    </div>
                  </div>
                </Card>
              ))}
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
              {[
                { name: "Dr. James Patterson", title: "Information Security Expert", exp: "20+ Years Experience" },
                { name: "Emily Rodriguez", title: "Cybersecurity Specialist", exp: "15+ Years Experience" },
                { name: "David Kumar", title: "Network Security Architect", exp: "18+ Years Experience" },
                { name: "Lisa Thompson", title: "Penetration Testing Lead", exp: "12+ Years Experience" }
              ].map((instructor, i) => (
                <Card key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-md bg-white flex flex-col p-0 group">
                  <div className="aspect-[4/3] bg-gradient-to-b from-[#5c5c5c] to-[#2a2a2a] flex items-center justify-center relative overflow-hidden">
                    {/* Placeholder for images */}
                    <div className="w-full h-full flex items-center justify-center">
                      <UserCircle className="w-1/2 h-1/2 md:w-2/3 md:h-2/3 text-white/10" strokeWidth={0.5} />
                    </div>
                  </div>
                  <CardContent className="p-5 md:p-6 text-center flex flex-col items-center">
                    <h3 className="font-bold text-[#212529] text-base mb-1 md:mb-1.5">{instructor.name}</h3>
                    <p className="text-xs md:text-[13px] text-[#6C757D] mb-4 md:mb-5">{instructor.title}</p>
                    <div className="flex items-center justify-center gap-1.5 md:gap-2 text-xs md:text-[13px] font-medium text-[#4A5568] mb-5 md:mb-6">
                      <Briefcase className="h-3.5 w-3.5 md:h-[14px] md:w-[14px] text-[#6C757D]" /> {instructor.exp}
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

      {/* Footer */}
      <footer className="bg-black text-white pt-16 md:pt-20 pb-8 border-t border-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 mb-16 md:mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center bg-white text-black font-bold text-base md:text-lg rounded-sm tracking-tighter">
                  TA
                </div>
                <span className="text-xl md:text-2xl font-bold tracking-tight">Trust Axis</span>
              </div>
              <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed max-w-sm">
                Empowering professionals with industry-leading education and career advancement opportunities.
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-5 md:mb-6 uppercase tracking-widest text-[10px] md:text-[11px]">Programs</h4>
                <ul className="space-y-3 md:space-y-4 text-sm text-gray-400 font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Product Management</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cybersecurity</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cloud Computing</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-5 md:mb-6 uppercase tracking-widest text-[10px] md:text-[11px]">Company</h4>
                <ul className="space-y-3 md:space-y-4 text-sm text-gray-400 font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 md:ml-auto">
              <h4 className="font-bold text-white mb-5 md:mb-6 uppercase tracking-widest text-[10px] md:text-[11px]">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5 md:h-5 md:w-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5 md:h-5 md:w-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5 md:h-5 md:w-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5 md:h-5 md:w-5" /></a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-[13px] text-gray-500 font-semibold tracking-wide text-center md:text-left">
            <p>© 2026 Trust Axis. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
