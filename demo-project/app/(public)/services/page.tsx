"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CreditCard } from "lucide-react";
import PartnerMarquee from "@/components/PartnerMarquee";
import ServicesScrollSection from "@/components/ServicesScrollSection";



export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f8faff] relative overflow-hidden font-sans text-slate-900">

      {/* ─── HERO SECTION ─── */}
      <section
        id="hero"
        className="relative w-full min-h-screen bg-white font-sans flex items-center overflow-hidden pt-20 pb-10"
      >
        {/* Soft ambient glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[1000px] h-[800px] bg-[#eef4ff] rounded-[100%] blur-[120px] -translate-x-1/2" />
          <div className="absolute bottom-[20%] right-[-10%] w-[800px] h-[800px] bg-[#dbe8ff] rounded-[100%] blur-[140px] translate-x-1/4" />
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">

            {/* Left – Copy & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 mt-10 lg:mt-0 lg:-translate-y-10 xl:-translate-y-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef2ff] border border-[#c7d4ff] mb-6 text-[13px] font-[600] text-[#305eff] tracking-wide">
                  <CreditCard className="w-3.5 h-3.5" />
                  100+ Payment Methods &nbsp;|&nbsp; Easy Integration &nbsp;|&nbsp; Best-in-Class Performance
                </div>

                {/* Headline */}
                <h1 className="text-[38px] sm:text-[50px] lg:text-[54px] xl:text-[62px] font-[700] leading-[1.1] mb-6 text-[#192839]">
                  Sell Without a Website,{" "}
                  <br />
                  Create{" "}
                  <span className="text-[#305eff]">Payment Pages</span>
                </h1>

                {/* Subtitle */}
                <p className="text-[17px] sm:text-[19px] lg:text-[20px] text-[#40566d] font-[450] leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                  With Rupexa Payment Pages, create custom-branded pages, accept payments instantly, and get automated receipts. All in minutes — no coding needed.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Link href="/auth/signup" className="w-full sm:w-auto">
                    <button className="bg-[#305eff] hover:bg-blue-700 text-white px-8 py-4 rounded-[4px] text-[15px] font-[600] transition-all flex items-center justify-center gap-3 group w-full sm:w-auto shadow-lg shadow-blue-200">
                      Sign up
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/services/payment-gateway" className="w-full sm:w-auto">
                    <button className="bg-transparent hover:bg-blue-50 text-[#305eff] hover:text-[#1839b0] border border-[#305eff] px-8 py-4 rounded-[4px] text-[15px] font-[600] transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                      Explore Services
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right – Product screenshot */}
            <div className="lg:col-span-5 relative h-[420px] sm:h-[520px] lg:h-[680px] xl:h-[720px] w-full order-1 lg:order-2 pointer-events-none overflow-visible flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="absolute inset-0 right-[0%] lg:right-[-15%] xl:right-[-20%] flex items-center w-[120%] lg:w-[130%] xl:w-[145%]"
                style={{
                  maskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
                }}
              >
                <img
                  src="https://framerusercontent.com/images/thXZ310oT4r1GGftr6YZcfoKis8.png"
                  alt="Rupexa Payment Pages Dashboard"
                  className="w-full h-full object-contain object-center mix-blend-multiply opacity-95"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── TRUSTED PARTNERS ─── */}
      <PartnerMarquee />

      {/* ─── OUR SERVICES (scroll-animated, backend-driven) ─── */}
      <ServicesScrollSection />

      {/* ─── BOTTOM CTA BANNER ─── */}
      <section className="w-full bg-[#0b0f1a] relative overflow-hidden z-10">
        {/* Ambient glow blobs */}
        <div className="absolute top-[-20%] left-[-5%] w-[600px] h-[600px] bg-[#305eff]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-[#48d08c]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* ── Left: text + CTAs ── */}
            <div className="flex-1 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#48d08c] text-[12px] font-[600] tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-[#48d08c] rounded-full animate-pulse" />
                Get Started Free
              </div>

              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-[700] leading-[1.12] text-white mb-5">
                One platform.<br />
                <span className="text-[#305eff]">Every solution</span> your
                <br className="hidden sm:block" /> business needs.
              </h2>

              <p className="text-[16px] text-[#8fa3bc] leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Join thousands of businesses using Rupexa to accept payments, build software, and scale faster — all in one place.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 bg-[#305eff] hover:bg-blue-600 text-white text-[15px] font-[600] px-6 py-3 rounded-[4px] transition-all hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Sign Up — It&apos;s Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-[15px] font-[500] px-6 py-3 rounded-[4px] transition-all hover:bg-white/5"
                >
                  Talk to Sales
                </Link>
              </div>

              {/* Trust strip */}
              <p className="mt-6 text-[13px] text-[#8fa3bc]">
                No credit card required &nbsp;·&nbsp; Setup in minutes &nbsp;·&nbsp; Cancel anytime
              </p>
            </div>

            {/* ── Right: dashboard screenshot ── */}
            <div className="flex-shrink-0 w-full lg:w-[480px] xl:w-[520px] relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-[#305eff]/20 blur-[60px] rounded-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://framerusercontent.com/images/thXZ310oT4r1GGftr6YZcfoKis8.png"
                  alt="Rupexa Dashboard"
                  className="w-full h-full object-cover object-top mix-blend-lighten opacity-90"
                  loading="lazy"
                />
              </div>
              {/* Floating stat chip */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-[#e6f9f1] rounded-full flex items-center justify-center text-[#009e5c] text-lg">✓</div>
                <div>
                  <p className="text-[11px] text-slate-400 font-[500]">Payments Processed</p>
                  <p className="text-[15px] font-[700] text-[#192839]">₹4.2 Cr+ this month</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}


