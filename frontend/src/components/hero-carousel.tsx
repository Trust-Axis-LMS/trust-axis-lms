"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { ArrowRight, GraduationCap, Library, Users, ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const heroSlides = [
    {
        badge: "Featured Programs",
        title: "Explore World-Class Programs",
        description: "Discover industry-aligned courses designed by experts to accelerate your career growth and unlock new opportunities",
        icon: GraduationCap,
        imageLabel: "Program Preview Image",
        imageSub: "Professional Learning Environment",
        btn1: { label: "Explore Programs", href: "/#courses" },
        btn2: { label: "View Catalog", href: "/#courses" }
    },
    {
        badge: "Learning Resources",
        title: "Discover Incredible Resources",
        description: "Expand your knowledge with our curated articles, deep-dive whitepapers, and comprehensive research reports",
        icon: Library,
        imageLabel: "Resource Preview",
        imageSub: "Curated Knowledge Base",
        btn1: { label: "Read Articles", href: "/resources" },
        btn2: { label: "View Resources", href: "/resources" }
    },
    {
        badge: "Consultancy",
        title: "Expert Guidance & Consultancy",
        description: "Connect with seasoned professionals who can guide your team through complex technical and leadership challenges",
        icon: Users,
        imageLabel: "Consultancy Preview",
        imageSub: "Global Network of Experts",
        btn1: { label: "Explore Consultancies", href: "/consultancy" },
        btn2: { label: "Learn More", href: "/consultancy" }
    }
];

export function HeroCarousel() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const plugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    return (
        <section className="bg-[#18181B] lg:bg-white overflow-hidden border-b border-[#F4F4F5] relative h-[calc(100dvh-90px)] lg:h-auto lg:max-h-none lg:min-h-0">
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                opts={{ loop: true }}
                className="w-full h-full lg:h-auto relative group"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index} className="h-full">
                            <div className="relative w-full h-full lg:bg-transparent bg-[#18181B] flex items-center">
                                {/* Mobile Background (Image) */}
                                <div className="absolute inset-0 flex items-center justify-center lg:hidden overflow-hidden bg-[#18181B] z-0">
                                    <slide.icon className="h-full w-full opacity-[0.15] absolute z-0 blur-3xl scale-150 object-cover text-white" strokeWidth={0.5} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 z-10" />
                                </div>

                                <div className="container relative z-10 mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 h-full flex flex-col justify-end lg:justify-center">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end lg:items-center h-[calc(100%-4rem)] lg:h-auto pb-16 lg:pb-0">

                                        <div className="flex flex-col space-y-5 lg:space-y-8 bg-transparent p-0">
                                            <div>
                                                <Badge variant="default" className="bg-white text-black lg:bg-black lg:text-white hover:bg-white/90 lg:hover:bg-black/90 px-3 py-1.5 lg:px-4 lg:py-1.5 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-widest mb-4 lg:mb-6 border-transparent w-max shadow-lg lg:shadow-none">
                                                    {slide.badge}
                                                </Badge>
                                                <h1 className="text-[38px] sm:text-5xl lg:text-[60px] font-bold text-white lg:text-[#212529] leading-[1.05] tracking-[-0.02em]">
                                                    {slide.title.split(' ').map((word, i, arr) => (
                                                        i === arr.length - 1 ? <span key={i}><br className="hidden md:block" />{word}</span> : <span key={i}>{word} </span>
                                                    ))}
                                                </h1>
                                            </div>

                                            <p className="text-[15px] sm:text-lg lg:text-xl text-gray-300 lg:text-[#6C757D] max-w-[600px] leading-relaxed">
                                                {slide.description}
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-3 pt-3 lg:pt-4">
                                                <Link href={slide.btn1.href} className="w-full sm:w-auto">
                                                    <Button size="lg" className="h-[52px] w-full lg:h-14 px-6 lg:px-8 text-[13px] lg:text-base uppercase tracking-wider font-bold rounded-md bg-white text-black lg:bg-primary lg:text-white hover:bg-white/90 lg:hover:bg-primary/90 shadow-lg lg:shadow-none">
                                                        {slide.btn1.label} <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                                                    </Button>
                                                </Link>
                                                <Link href={slide.btn2.href} className="w-full sm:w-auto">
                                                    <Button variant="outline" size="lg" className="h-[52px] w-full lg:h-14 px-6 lg:px-8 text-[13px] lg:text-base uppercase tracking-wider font-bold rounded-md border border-white/20 lg:border-2 lg:border-black/10 text-white lg:text-[#212529] hover:bg-white/10 lg:hover:bg-[#F4F4F5] bg-transparent lg:bg-transparent shadow-lg lg:shadow-none">
                                                        {slide.btn2.label}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Desktop Preview Visual */}
                                        <div className="hidden lg:flex relative aspect-[4/3] w-full items-center justify-center rounded-2xl bg-[#18181B] text-white shadow-xl overflow-hidden group/box">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover/box:opacity-100 transition-opacity duration-500" />
                                            <div className="relative flex flex-col items-center justify-center space-y-4 text-center z-10 p-6">
                                                <div className="rounded-full bg-white/10 p-6 backdrop-blur-sm">
                                                    <slide.icon className="h-16 w-16 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold tracking-tight">{slide.imageLabel}</h3>
                                                    <p className="text-sm text-gray-400 mt-2">{slide.imageSub}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Side Navigation Arrows — left */}
            <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="absolute left-3 lg:left-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full border border-white/30 lg:border-white/40 bg-white/20 lg:bg-white/70 backdrop-blur-md hover:bg-white/30 lg:hover:bg-white/90 text-white lg:text-[#212529] shadow-lg transition-all hover:scale-105"
            >
                <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>

            {/* Side Navigation Arrows — right */}
            <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 lg:h-12 lg:w-12 rounded-full border border-white/30 lg:border-white/40 bg-white/20 lg:bg-white/70 backdrop-blur-md hover:bg-white/30 lg:hover:bg-white/90 text-white lg:text-[#212529] shadow-lg transition-all hover:scale-105"
            >
                <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>

            {/* Dot Indicators at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 lg:gap-3 p-2 lg:p-0 bg-white/10 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none rounded-2xl lg:rounded-none border border-white/30 lg:border-transparent shadow-lg lg:shadow-none z-20">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => api?.scrollTo(i)}
                        className={cn(
                            "h-2 lg:h-3 transition-all duration-300 rounded-full",
                            current === i ? "w-6 lg:w-8 bg-white lg:bg-primary" : "w-2 lg:w-3 bg-white/40 lg:bg-gray-300 hover:bg-white/60 lg:hover:bg-gray-400"
                        )}
                    />
                ))}
            </div>
        </section>
    );
}
