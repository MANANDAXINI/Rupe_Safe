"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Check, CreditCard, Globe, Smartphone, Database, Megaphone, Cpu, Lightbulb } from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Service {
  id: string;
  title: string;
  slug: string | null;
  description: string;
  icon: string | null;
  image: string | null;
  features: string[];
}

/* ─────────────────────────────────────────────
   STATIC FALLBACK (matches seed-services.ts)
───────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  "Payment Gateway": CreditCard,
  "Web Development": Globe,
  "App Development": Smartphone,
  "ERP Solutions": Database,
  "Digital Marketing": Megaphone,
  "Custom Software": Cpu,
  "Tech Consulting": Lightbulb,
};

const IMAGE_MAP: Record<string, string> = {
  "Payment Gateway": "https://framerusercontent.com/images/PzYQcqcos30Qy4f3PfwbxMw1c.webp?width=568&height=600",
  "Web Development": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=568&h=600&fit=crop",
  "App Development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=568&h=600&fit=crop",
  "ERP Solutions": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=568&h=600&fit=crop",
  "Digital Marketing": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=568&h=600&fit=crop",
  "Custom Software": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=568&h=600&fit=crop",
  "Tech Consulting": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=568&h=600&fit=crop",
};

const SLUG_MAP: Record<string, string> = {
  "Payment Gateway": "payment-gateway",
  "Web Development": "web-development",
  "App Development": "app-development",
  "ERP Solutions": "erp-solutions",
  "Digital Marketing": "digital-marketing",
  "Custom Software": "custom-software",
  "Tech Consulting": "tech-consultant",
};

const getStartedRoute = (title: string) =>
  title === "Payment Gateway" ? "/onboarding/payment-gateway" : "/contact";

/* ─────────────────────────────────────────────
   SECTION CARD
───────────────────────────────────────────── */
function ServiceSection({
  service,
  isActive,
  index,
  onClick,
}: {
  service: Service;
  isActive: boolean;
  index: number;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[service.title] ?? Cpu;
  const image = service.image || IMAGE_MAP[service.title] || "";
  const slug =
    service.slug ||
    SLUG_MAP[service.title] ||
    service.title.toLowerCase().replace(/\s+/g, "-");

  /* scale + opacity for the Razorpay-style stacking animation */
  const scale = isActive ? 1 : 0.88;
  const opacity = isActive ? 1 : 0.55;
  const translateY = isActive ? 0 : 24;

  return (
    <motion.section
      id={`service-${slug}`}
      aria-label={service.title}
      onClick={onClick}
      animate={{ scale, opacity, y: translateY }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className={`relative w-full rounded-[4px] overflow-hidden border cursor-pointer select-none ${isActive
          ? "border-[rgba(121,135,156,0.3)] shadow-[rgba(49,49,51,0.14)_0px_4px_32px_0px]"
          : "border-[rgba(121,135,156,0.14)] shadow-[rgba(49,49,51,0.06)_0px_2px_12px_0px]"
        }`}
      style={{ transformOrigin: "top center" }}
    >
      {/* ── Layout: image left / text right (desktop), stacked (mobile) ── */}
      <div className="flex flex-col md:flex-row min-h-[420px]">

        {/* Image panel */}
        <div className="relative w-full md:w-[45%] min-h-[240px] md:min-h-0 overflow-hidden bg-slate-100 flex-shrink-0">
          {image && (
            <img
              src={image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 md:to-white/70 pointer-events-none" />
        </div>

        {/* Text panel */}
        <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10 md:pl-10 md:pr-12">
          {/* Icon + title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[4px] bg-[#eef1ff] flex items-center justify-center text-[#305eff]">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-[22px] sm:text-[26px] font-[700] text-[#192839] leading-tight">
              {service.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-[15px] text-[#40566d] mb-6 leading-[1.65] max-w-lg">
            {service.description}
          </p>

          {/* Features */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#192839] font-[500]">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-[#e6f9f1] flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#009e5c]" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={getStartedRoute(service.title)}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 bg-[#305eff] hover:bg-blue-700 text-white text-[14px] font-[600] px-5 py-2.5 rounded-[4px] transition-colors"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/services/${slug}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[14px] font-[600] text-[#2950da] hover:text-[#1839b0] transition-colors"
            >
              Explore Service
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   TAB NAV BUTTON
───────────────────────────────────────────── */
function TabBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex-shrink-0 px-4 py-3 text-[14px] font-[600] transition-colors whitespace-nowrap ${active ? "text-[#192839]" : "text-[#768ea7] hover:text-[#192839]"
        }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="svc-tab-underline"
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#48d08c] rounded-t-full"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function ServicesScrollSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  /* ── Fetch from public API ── */
  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data: Service[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  /* ── IntersectionObserver: update active tab on scroll ── */
  useEffect(() => {
    if (!services.length) return;

    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveIdx(i);
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [services]);

  /* ── Click tab → smooth scroll to section ── */
  const scrollToIdx = useCallback((i: number) => {
    setActiveIdx(i);
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-20 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* skeleton shimmer */}
          <div className="h-10 w-80 bg-slate-100 rounded animate-pulse mb-4" />
          <div className="h-5 w-48 bg-slate-100 rounded animate-pulse mb-8" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[300px] bg-slate-100 rounded-[4px] animate-pulse mb-4" />
          ))}
        </div>
      </section>
    );
  }

  if (!services.length) return null;

  return (
    <section
      aria-label="Our Services"
      className="w-full bg-white py-20 border-t border-gray-100"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <div className="mb-10">
          <h2 className="text-[30px] sm:text-[38px] lg:text-[44px] font-[700] leading-[1.15] text-[#192839] max-w-2xl">
            The all in one{" "}
            <span className="text-[#009e5c]">technology platform </span>
            you&apos;ve been looking for
          </h2>
          <p className="text-[15px] text-[#40566d] font-[450] mt-3">
            With Rupexa, you can:
          </p>
        </div>

        {/* ── Sticky Tab Bar ── */}
        <div className="sticky top-[60px] z-20 bg-white -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto">
            {services.map((s, i) => (
              <TabBtn
                key={s.id}
                label={s.title}
                active={activeIdx === i}
                onClick={() => scrollToIdx(i)}
              />
            ))}
            {/* Get Started CTA on right */}
            <div className="ml-auto flex-shrink-0 pl-4 py-2">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 bg-[#305eff] hover:bg-blue-700 text-white text-[13px] font-[600] px-4 py-2 rounded-[4px] transition-colors whitespace-nowrap"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stacked Service Panels ── */}
        <div
          ref={containerRef}
          className="mt-6 flex flex-col gap-4"
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
            >
              <ServiceSection
                service={service}
                isActive={activeIdx === i}
                index={i}
                onClick={() => setActiveIdx(i)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
