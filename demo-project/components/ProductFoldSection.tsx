"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const TABS = [
  { id: "accept-payments", label: "Accept Payments" },
  { id: "web-development", label: "Build Websites" },
  { id: "app-development", label: "Develop Apps" },
  { id: "erp-solutions", label: "ERP Solutions" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "custom-software", label: "Custom Software" },
];

interface ProductCard {
  title: string;
  description: string;
  image: string;
  signupLink: string;
  learnLink: string;
}

const PRODUCT_CARDS: Record<string, ProductCard[]> = {
  "accept-payments": [
    {
      title: "Payment Gateway",
      description: "Offer a seamless payment experience on your website or app with 100+ methods.",
      image: "https://framerusercontent.com/images/PzYQcqcos30Qy4f3PfwbxMw1c.webp?width=568&height=600",
      signupLink: "/auth/signup",
      learnLink: "/services/payment-gateway",
    },
    {
      title: "Payment Button",
      description: "Effortlessly add a Pay Now button to any page without any coding required.",
      image: "https://framerusercontent.com/images/44VRINrftjdawAz1x3MyW68RE7A.webp?width=568&height=600",
      signupLink: "/auth/signup",
      learnLink: "/services/payment-gateway",
    },
    {
      title: "Payment Links",
      description: "Create and share links over email, text and social to accept payments instantly.",
      image: "https://framerusercontent.com/images/i6Rk3Tj2IBrWidVJdLRyL9GrbI.webp?width=568&height=600",
      signupLink: "/auth/signup",
      learnLink: "/services/payment-gateway",
    },
    {
      title: "Payment Pages",
      description: "Accept payments on a custom-branded online store with zero coding.",
      image: "https://framerusercontent.com/images/L8S7kzordShoTOQJLkFSCmGQdo.webp?width=568&height=600",
      signupLink: "/auth/signup",
      learnLink: "/services/payment-gateway",
    },
    {
      title: "POS Solution",
      description: "Accept seamless in-store payments with India's best POS solution.",
      image: "https://framerusercontent.com/images/px2Ivi9AoSqishbe7cmcCohdyI.webp?width=568&height=600",
      signupLink: "/auth/signup",
      learnLink: "/services/payment-gateway",
    },
  ],
  "web-development": [
    {
      title: "Custom Websites",
      description: "Build stunning, fully responsive websites that engage users and drive results.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/web-development",
    },
    {
      title: "E-Commerce Stores",
      description: "Complete online store setup with cart, checkout, and payment integration.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/web-development",
    },
    {
      title: "Landing Pages",
      description: "High-converting landing pages optimised for lead generation and sales.",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/web-development",
    },
    {
      title: "Enterprise Portals",
      description: "Scalable client, vendor, or employee portals built for enterprise scale.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/web-development",
    },
  ],
  "app-development": [
    {
      title: "iOS Apps",
      description: "Native iPhone and iPad applications with beautiful, fluid interfaces.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/app-development",
    },
    {
      title: "Android Apps",
      description: "High-performance native Android applications for the Indian market.",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/app-development",
    },
    {
      title: "Cross-Platform Apps",
      description: "One codebase, two platforms. Flutter and React Native expertise.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/app-development",
    },
    {
      title: "Progressive Web Apps",
      description: "Web apps that feel native — offline support, push notifications & more.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/app-development",
    },
  ],
  "erp-solutions": [
    {
      title: "Inventory Management",
      description: "Real-time stock tracking, purchase orders, and supplier management.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/erp-solutions",
    },
    {
      title: "HR & Payroll",
      description: "Automated payroll, leave management, and employee self-service portal.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/erp-solutions",
    },
    {
      title: "CRM Integration",
      description: "Unify sales, support, and customer data in a single integrated view.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/erp-solutions",
    },
    {
      title: "Financial Module",
      description: "Accounts payable, receivable, GST compliance and real-time P&L reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/erp-solutions",
    },
  ],
  "digital-marketing": [
    {
      title: "SEO Services",
      description: "Technical SEO audits, keyword strategy, and on-page optimisation.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/digital-marketing",
    },
    {
      title: "Social Media Growth",
      description: "Content calendars, community management, and organic growth strategies.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/digital-marketing",
    },
    {
      title: "PPC & Paid Ads",
      description: "Google Ads, Meta Ads, and YouTube campaigns optimised for ROI.",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/digital-marketing",
    },
    {
      title: "Email Marketing",
      description: "Automated drip sequences, newsletters and lifecycle campaigns.",
      image: "https://images.unsplash.com/photo-1526628953301-3cd3e4be7b2b?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/digital-marketing",
    },
  ],
  "custom-software": [
    {
      title: "Bespoke Applications",
      description: "Tailored software built from scratch around your unique business logic.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/custom-software",
    },
    {
      title: "API Development",
      description: "Robust REST & GraphQL APIs designed for scale and developer-friendliness.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/custom-software",
    },
    {
      title: "Legacy Modernisation",
      description: "Migrate, refactor, or rebuild outdated systems without data loss.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/custom-software",
    },
    {
      title: "Cloud Migration",
      description: "Lift-and-shift or re-architect workloads to AWS, GCP, or Azure.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=568&h=600&fit=crop",
      signupLink: "/contact",
      learnLink: "/services/custom-software",
    },
  ],
};

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ card }: { card: ProductCard }) {
  return (
    <div
      className="flex-shrink-0 w-[260px] sm:w-[284px] rounded-[4px] overflow-hidden border border-[rgba(121,135,156,0.18)] shadow-[rgba(49,49,51,0.10)_0px_2px_16px_0px] bg-white"
      style={{ scrollSnapAlign: "center" }}
    >
      {/* Image */}
      <div className="w-full h-[220px] overflow-hidden bg-slate-100">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-5 bg-white shadow-[rgba(0,0,0,0.04)_0px_-2px_4px_0px]">
        <h5 className="text-[15px] font-[700] text-[#192839] mb-1 leading-snug">{card.title}</h5>
        <p className="text-[13px] leading-[18px] text-[#222]/70 mb-5">{card.description}</p>
        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={card.learnLink}
            className="inline-flex items-center gap-2 bg-[#305eff] hover:bg-blue-700 text-white text-[13px] font-[600] px-4 py-2 rounded-lg transition-colors"
          >
            Know More
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CAROUSEL
───────────────────────────────────────────── */
function CardCarousel({ cards }: { cards: ProductCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-slate-600 hover:text-slate-900 transition"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Cards scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cards.map((card, i) => (
          <ProductCard key={i} card={card} />
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-slate-600 hover:text-slate-900 transition"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function ProductFoldSection() {
  const [activeTab, setActiveTab] = useState("accept-payments");
  const cards = PRODUCT_CARDS[activeTab] ?? [];

  return (
    <section
      aria-label="All in one technology platform"
      className="w-full bg-white py-20 overflow-hidden border-t border-gray-100"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <div className="mb-10">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-[700] leading-[1.15] text-[#192839] max-w-2xl">
            The all in one{" "}
            <span className="text-[#009e5c]">technology platform </span>
            you&apos;ve been looking for
          </h2>

          <p className="text-[15px] text-[#40566d] font-[450] mt-3 mb-6">
            With Rupexa, you can:
          </p>

          {/* Mobile quick nav pills */}
          <div className="flex flex-wrap gap-2 md:hidden mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-full text-[13px] font-[600] transition-all border ${activeTab === tab.id
                    ? "bg-[#305eff] text-white border-[#305eff]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Bar (desktop) ── */}
        <div className="hidden md:flex items-center gap-1 border-b border-gray-200 mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-shrink-0 px-4 py-3 text-[14px] font-[600] transition-colors whitespace-nowrap pb-[14px] ${activeTab === tab.id
                  ? "text-[#192839]"
                  : "text-[#768ea7] hover:text-[#192839]"
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#48d08c] rounded-t-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* CTA on right */}
          <div className="ml-auto flex-shrink-0 pl-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-[#305eff] hover:bg-blue-700 text-white text-[14px] font-[600] px-5 py-2.5 rounded-lg transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </div>

        {/* ── Active Tab Section Label ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h3 className="text-[22px] sm:text-[26px] font-[700] text-[#192839] mb-6">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h3>

            {/* ── Cards Carousel ── */}
            <CardCarousel cards={cards} />
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
