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

      {/* ─── CTA SECTION ─── */}
      <section className="py-24 bg-blue-500 relative z-10 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Let&apos;s collaborate to build something amazing. Our team is ready to help you achieve your digital goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-black transition-all duration-300 bg-white rounded-full shadow-lg hover:bg-blue-500 hover:scale-105 hover:shadow-blue-400/30"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </main>
  );
}


