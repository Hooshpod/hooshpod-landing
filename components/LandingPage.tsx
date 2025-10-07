"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Services } from "@/components/landing/Services";
import { Comparison } from "@/components/landing/Comparison";
import { Resources } from "@/components/landing/Resources";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FAQ } from "@/components/landing/FAQ";
// import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import type { BlogPost } from "@/lib/blog";
import { BlogList } from "@/components/blog/BlogList";

type LandingPageProps = {
  posts?: BlogPost[];
};

export default function LandingPage({ posts }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Removed Calendly modal state
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const tBlog = useTranslations("blog");

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

  const handlePrimaryCTA = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = "mailto:hooshpod.ai@gmail.com";
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
      />
      <main className="flex-1">
        <Hero />
        <Features />
        <Services onPrimaryCTA={handlePrimaryCTA} />
        {/* <Comparison /> */}
        {/* <Resources /> */}
        {posts && posts.length > 0 && (
          <section className="w-full py-16">
            <div className="container px-4 md:px-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                  {tBlog("title")}
                </h2>
                <Link
                  href={`/${locale}/blog`}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {tBlog("readMore")}
                </Link>
              </div>
              <BlogList posts={posts} />
            </div>
          </section>
        )}
        <HowItWorks />
        <FAQ />
        <FinalCTA onPrimaryCTA={handlePrimaryCTA} />
      </main>
      <Footer />
    </div>
  );
}
