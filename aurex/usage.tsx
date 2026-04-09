"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
    SquiggleFilter, 
    GraphPaper, 
    Hero, 
    TapeMarquee, 
    FeatureBoard, 
    SketchbookShowcase, 
    ProcessPath, 
    ClientScribbles, 
    PricingDrafts, 
    BlueprintFooter 
} from "@/src/components/CoreLandingPages/CompleteLandingPages/tsx/Sketchy";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- Main Layout ---
export default function SketchyPage() {
    // Initialize Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <main className="relative min-h-screen w-full text-slate-800 overflow-x-hidden font-sans selection:bg-yellow-300 selection:text-black bg-[#fdfbf7]">
            <SquiggleFilter />
            <GraphPaper />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 backdrop-blur-sm border-b border-slate-200">
                <div className="flex items-center gap-2 text-2xl font-black tracking-tighter">
                    <div className="h-8 w-8 rounded border-2 border-slate-900 bg-slate-800" />
                    Blueprint.
                </div>
                <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest font-bold">
                    <a href="#" className="hover:text-blue-600 transition-colors">Manifesto</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Log</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Drafts</a>
                </div>
                <button className="rounded-full border-2 border-slate-900 bg-white px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none">
                    Sign In
                </button>
            </nav>

            {/* Sections */}
            <Hero />
            <TapeMarquee />
            <FeatureBoard />
            <SketchbookShowcase />
            <ProcessPath />
            <ClientScribbles />
            <PricingDrafts />
            <BlueprintFooter />

        </main>
    );
}