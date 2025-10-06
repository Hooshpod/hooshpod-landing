"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CalendlyModal } from "@/components/calendly-modal";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Services } from "@/components/landing/Services";
import { Comparison } from "@/components/landing/Comparison";
import { Resources } from "@/components/landing/Resources";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calendlyModalOpen, setCalendlyModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const openCalendlyModal = () => {
    setCalendlyModalOpen(true);
  };

  const closeCalendlyModal = () => {
    setCalendlyModalOpen(false);
  };

  const openCalendlyDirect = () => {
    window.open(
      "https://calendly.com/echorift-ai",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header
        isScrolled={isScrolled}
        mounted={mounted}
        theme={theme}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        openCalendlyDirect={openCalendlyDirect}
      />
      <main className="flex-1">
        <Hero openCalendlyDirect={openCalendlyDirect} />
        <Features />
        <Services onPrimaryCTA={openCalendlyDirect} />
        <Comparison />
        <Resources onPrimaryCTA={openCalendlyDirect} />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <FinalCTA onPrimaryCTA={openCalendlyDirect} />
      </main>
      <Footer />

      <CalendlyModal isOpen={calendlyModalOpen} onClose={closeCalendlyModal} />
    </div>
  );
}
