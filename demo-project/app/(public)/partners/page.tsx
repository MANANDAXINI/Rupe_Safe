"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import {
  ArrowRight, Shield, Star, TrendingUp, Zap, Award,
  ChevronLeft, ChevronRight, Building2,
  CreditCard, Globe, Smartphone, Database,
  BarChart3, ChevronDown, ChevronUp,
} from "lucide-react";

/* ─────────────────────────────────────────
   ANIMATION PRESETS
───────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  hover: { y: -4, boxShadow: "0 12px 32px rgba(48,94,255,0.12)", transition: { duration: 0.25 } },
};

/* ─────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────── */
const benefits = [
  { title: "Deliver Differentiated Value",    icon: Star,       desc: "Leverage our tech to solve business payment processes across payroll, business banking, and vendor payments to deliver differentiated value to your clients." },
  { title: "Drive Business Efficiency",       icon: Zap,        desc: "Automate your client's business payment processes to reduce error-prone manual processes and lower operational costs to increase business efficiency." },
  { title: "Grow Reach & Revenue",            icon: TrendingUp, desc: "Unlock your business's true potential with our partner program, designed to grow your market reach, enhance client satisfaction, and drive revenue growth." },
  { title: "Partner Success Toolkit",         icon: Award,      desc: "Get exclusive resources to drive your success, including product training, account manager, priority support, marketing assets, and more." },
];

const products = [
  { title: "Payment Gateway",    desc: "Accept payments with 100+ methods,\nstrong security & instant settlements.", icon: CreditCard,  link: "/services/payment-gateway" },
  { title: "Payroll Automation", desc: "Automate payroll & compliance\npayments & filings with precision.",       icon: BarChart3,   link: "/services" },
  { title: "Business Banking",   desc: "Comprehensive financial management\nand instant payouts for businesses.",   icon: Building2,   link: "/services" },
  { title: "Web Development",    desc: "Build stunning, responsive websites\nthat engage users and drive results.",  icon: Globe,       link: "/services" },
  { title: "App Development",    desc: "Powerful mobile apps for iOS & Android\nwith seamless performance.",         icon: Smartphone,  link: "/services" },
  { title: "ERP Solutions",      desc: "Streamline operations with integrated\nenterprise resource planning.",       icon: Database,    link: "/services" },
];

const partnerTypes = [
  {
    tag: "ACCOUNTING PARTNER",
    title: "Become a Business Advisor\n& Grow your Practice",
    desc: "Expand your services beyond tax, bookkeeping & audit to solve broader business challenges to become an advisor for your client.",
    bgImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    tag: "REFERRAL PARTNER",
    title: "Leverage your Client Network\n& Grow your Revenue",
    desc: "Offer 10+ business financial services leveraging our tech to automate your client's payroll, vendor payments & customer payouts.",
    bgImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  },
  {
    tag: "CONSULTING PARTNER",
    title: "Implement Business Finance\nSolutions & Maximize Efficiency",
    desc: "Understand your client's business needs. Recommend and implement the right Rupexa solution to maximize business efficiency.",
    bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    tag: "TECHNOLOGY PARTNER",
    title: "Integrate with Rupexa\n& Provide Value to Customers",
    desc: "Strengthen your software offerings with Rupexa integrations and provide additional value to your customers & exclusive discounts.",
    bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
];

const steps = [
  { num: 1, title: "Join the Rupexa Partner Network",  desc: "Join our partner program at no cost, and let's grow together." },
  { num: 2, title: "Solve your Client's Problems",     desc: "Use our tech stack to solve client's business payment problems." },
  { num: 3, title: "Get Rewards and Recognition",      desc: "Unlock revenue potential & get client recognition in the process." },
];

const typeMetrics = [
  { value: 500, suffix: "+", label: "Accounting\nPartners" },
  { value: 200, suffix: "+", label: "Referral\nPartners" },
  { value: 80,  suffix: "+", label: "Consulting\nPartners" },
  { value: 30,  suffix: "+", label: "Technology\nPartners" },
];

type PartnerLogo = { name: string; logo?: string };

const FALLBACK_LOGOS: PartnerLogo[] = [
  { name: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
  { name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
  { name: "RuPay", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png" },
  { name: "UPI", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
  { name: "HDFC Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" },
  { name: "ICICI Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" },
  { name: "SBI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg" },
  { name: "Axis Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Axis_Bank_Logo.svg" },
  { name: "Yes Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Yes_Bank_Logo.svg" },
  { name: "Paytm", logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Paytm_logo.png" },
  { name: "PhonePe", logo: "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg" },
  { name: "Razorpay", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" },
];

const INVALID_PARTNER_NAME = /(test|demo|sample|dummy|temp)/i;

const testimonials = [
  { quote: "Rupexa's interface is very user-friendly, and the support staff is outstanding. Startups who want to make their life easy, please start using Rupexa right away.", name: "Rahul Sharma",       role: "Co-Founder, StartUp Movers Pvt. Ltd.",     initials: "RS", color: "bg-blue-600"    },
  { quote: "Filing compliance and managing payroll has never been so easy. A simple dashboard for employees ensures smooth onboarding.",                                       name: "Rohit Lohade",       role: "Advisor, Business Setup Pvt. Ltd.",        initials: "RL", color: "bg-purple-600"  },
  { quote: "Our clients were happy to be onboarded with Rupexa, given the offerings were reasonably priced and automated manual financial processes.",                        name: "CA Vatsal Mehta",    role: "Partner, The Financialist",               initials: "VM", color: "bg-emerald-600" },
  { quote: "The team helped us setup very quickly since we were under pressure. We will not hesitate to recommend your services to anyone in need.",                          name: "CA Damini Agarwal",  role: "Partner, Witcorp India Advisors LLP",     initials: "DA", color: "bg-orange-500"  },
];

const faqs = [
  { q: "Who can become a Rupexa Partner?",                a: "Any business — accounting firms, consultants, software companies, or referral agents — can join. There's no fee to become a partner." },
  { q: "How do I earn as a Rupexa Partner?",              a: "You earn commissions on every client you bring on board who uses Rupexa's platform. Commissions are paid monthly directly to your account." },
  { q: "What support does Rupexa provide to partners?",   a: "We provide a dedicated account manager, priority customer support, marketing assets, product training, and access to our partner portal." },
  { q: "Is there any cost to join the partner program?",  a: "No, joining is completely free. There are no hidden fees or upfront investments required to become a Rupexa Partner." },
  { q: "How long does onboarding take?",                  a: "Most partners complete onboarding within 24–48 hours. You'll get instant access to the partner dashboard upon approval." },
];

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function AnimatedCounter({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 50;
    const increment = to / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <div ref={ref} className="text-[42px] sm:text-[52px] font-semibold leading-none" style={{ color: "rgb(0,190,111)" }}>
      {count}{suffix}
    </div>
  );
}

/* ─────────────────────────────────────────
   LOGO MARQUEE — fetches from /api/partners with fallback
───────────────────────────────────────── */
function LogoMarquee() {
  const [logos, setLogos] = useState<PartnerLogo[]>(FALLBACK_LOGOS);
  const [hiddenLogos, setHiddenLogos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then((data: Array<{ name: string; logo?: string }>) => {
        if (Array.isArray(data) && data.length > 0) {
          const items = data
            .map((p) => ({ name: (p?.name || "").trim(), logo: (p?.logo || "").trim() }))
            .filter((p) => p.name.length > 0 && !INVALID_PARTNER_NAME.test(p.name));
          if (items.length > 0) setLogos(items);
        }
      })
      .catch(() => {}); // silently keep fallback
  }, []);

  const doubled = [...logos, ...logos];
  return (
    <div className="overflow-hidden w-full relative">
      <div className="flex gap-8 w-max" style={{ animation: "marquee 30s linear infinite" }}>
        {doubled.map((partner, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-5 py-2.5 bg-white rounded border border-gray-200"
          >
            {partner.logo && !hiddenLogos[`${partner.name}-${i}`] ? (
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-7 w-auto object-contain"
                onError={() =>
                  setHiddenLogos((prev) => ({ ...prev, [`${partner.name}-${i}`]: true }))
                }
              />
            ) : (
              <span className="text-[13px] font-medium text-[#40566d] whitespace-nowrap">{partner.name}</span>
            )}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform:translateX(0) } to { transform:translateX(-50%) } }`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-lg transition-all duration-300 ${open ? "border-[#305eff]/40 bg-[#f5f8ff]" : "border-gray-200 bg-white"}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left px-6 py-4 gap-4">
        <span className="text-[15px] font-semibold text-[#192839]">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? "bg-[#305eff] text-white" : "bg-gray-100 text-[#40566d]"}`}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[14px] text-[#40566d] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function PartnersPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeStep, setActiveStep]               = useState(0);
  const intervalRef                               = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % steps.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen font-sans overflow-x-hidden" style={{ fontFamily: "'Inter',sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden pt-28 sm:pt-20" style={{ background: "#f1f5fa" }}>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url(https://framerusercontent.com/images/QymEBWjUQoJ5GaZgRzxnkJxwQ.png?scale-down-to=2048)", backgroundSize: "cover", backgroundPosition: "right center" }}
        />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-24 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[13px] font-medium tracking-wide text-[#768ea7] mb-5">
              Rupexa Partners
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-[28px] sm:text-[44px] lg:text-[62px] font-semibold leading-[1.02] text-[#192839] mb-5 max-w-4xl mx-auto">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Rupexa</span><br />
              Partner Network:<br />
              Let&apos;s grow together
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[16px] text-[#40566d] max-w-xl mx-auto mb-10 leading-relaxed">
              Partner with us and leverage Rupexa&apos;s full-stack business finance suite to drive
              innovation and boost your business revenue, reach, and retention.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact" className="w-auto max-md:w-[min(100%,220px)] max-md:max-w-[220px]">
                <button className="bg-[#305eff] hover:bg-blue-700 text-white font-medium px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-[14px] transition-all max-md:rounded-xl md:rounded-full whitespace-nowrap w-full max-md:w-full md:w-auto flex items-center justify-center" >
                  Become a Partner
                </button>
              </Link>
              <Link href="/auth/signin" className="w-auto max-md:w-[min(100%,220px)] max-md:max-w-[220px]">
                <button className="border border-[#305eff] text-[#2950da] hover:bg-blue-50 font-medium px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-[14px] transition-all bg-transparent inline-flex items-center justify-center gap-1.5 max-md:rounded-xl md:rounded-full whitespace-nowrap w-full max-md:w-full md:w-auto" >
                  Login <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f1f5fa] to-transparent" />
      </section>

      {/* ── WHY PARTNER ── */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-14">
            <motion.h2 variants={fadeUp} className="text-[32px] sm:text-[42px] font-semibold text-white mb-2 leading-snug">
              Why Partner<br />with Us?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-white/60">
              Fuel your business growth by 10X<br />with this strategic partnership.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 border border-white/20 rounded-xl overflow-hidden"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i} variants={fadeUp}
                className="p-8 hover:bg-white/[0.06] transition-colors duration-300"
                style={{ borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.15)" : "none", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none" }}
              >
                <h3 className="text-[17px] font-semibold text-white mb-3">{b.title}</h3>
                <p className="text-[14px] text-blue-100 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS (white) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-[28px] sm:text-[36px] font-semibold text-[#192839] mb-3">
              <strong className="text-[#305eff]">Business Finance Stack</strong> for You and Your Clients
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[14px] text-[#40566d]">
              Power seamless payments for businesses of all sizes
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i} variants={fadeUp}
                  initial="rest" whileHover="hover" animate="rest"
                  // @ts-ignore
                  variants={cardHover}
                  className="relative p-[2px] rounded-xl bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500"
                >
                  <div className="bg-white rounded-[10px] p-6 flex flex-col h-full cursor-default hover:bg-gradient-to-br hover:from-white hover:to-[#f8f5ff] transition-colors duration-300">
                    <div className="w-10 h-10 bg-[#f0f4ff] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#305eff]" />
                    </div>
                    <h3 className="text-[16px] font-semibold text-[#192839] mb-2">{p.title}</h3>
                    <p className="text-[13px] text-[#40566d] leading-relaxed flex-1 whitespace-pre-line">{p.desc}</p>
                    <Link href={p.link} className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[#2950da] hover:text-blue-700 transition-colors group">
                      Learn More <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── PARTNER TYPES (#f1f5fa) ── */}
      <section className="py-20 bg-[#f1f5fa]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-[28px] sm:text-[36px] font-semibold text-[#192839] mb-3">
              Types of <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Partner Programs</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[14px] text-[#40566d]">
              Range of <span className="text-pink-500 font-medium">partner programs</span> tailored for businesses of all types &amp; sizes
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {partnerTypes.map((pt, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative rounded-xl overflow-hidden group min-h-[320px] cursor-default"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                {/* photo */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${pt.bgImage})` }} />
                {/* gradient overlay — strong enough to keep WHITE text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

                {/* content — text must be WHITE on dark photo background */}
                <div className="relative z-10 p-7 flex flex-col justify-end h-full min-h-[320px]">
                  <span
                    className="self-start text-[10px] font-semibold tracking-widest uppercase border border-[#305eff] text-[#305eff] bg-white px-3 py-1 mb-4"
                    style={{ borderRadius: 4 }}
                  >
                    {pt.tag}
                  </span>
                  {/* ✅ text-white — on a dark photo overlay, NOT #192839 */}
                  <h3 className="text-[20px] font-semibold text-white mb-2 leading-snug whitespace-pre-line">{pt.title}</h3>
                  {/* ✅ text-white/80 for body on dark overlay */}
                  <p className="text-[13px] text-white/80 leading-relaxed mb-5">{pt.desc}</p>
                  <div className="flex items-center gap-3 flex-wrap max-md:max-w-[220px]">
                    <Link href="/contact" className="w-auto max-md:w-full">
                      <button className="bg-[#305eff] hover:bg-blue-700 text-white font-medium px-4 py-1.5 sm:px-5 sm:py-2 text-[12px] sm:text-[13px] transition-all max-md:rounded-xl md:rounded-full whitespace-nowrap w-full max-md:w-full md:w-auto flex items-center justify-center">
                        Become a Partner
                      </button>
                    </Link>
                    <Link href="/contact" className="w-auto max-md:w-full">
                      <button className="border border-white/50 hover:bg-white/10 text-white font-medium text-[12px] sm:text-[13px] px-4 py-1.5 sm:px-5 sm:py-2 inline-flex items-center justify-center gap-1 bg-transparent max-md:rounded-xl md:rounded-full whitespace-nowrap w-full max-md:w-full md:w-auto">
                        Learn More <ArrowRight className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GET STARTED (white) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-[28px] sm:text-[36px] font-semibold text-[#192839]">
              Get Started in<br />3 Easy Steps
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.14, duration: 0.45 }}
                className={`rounded-lg p-6 border transition-all duration-300 cursor-pointer hover:border-[#305eff]/40 hover:shadow-md
                  ${activeStep === i ? "border-[#305eff] shadow-md bg-white" : "border-gray-200 bg-white"}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full border-[3px] flex items-center justify-center text-[13px] font-semibold transition-all duration-300
                        ${activeStep === i ? "border-[#305eff] text-[#305eff]" : "border-[rgba(108,132,157,0.32)] text-[#768ea7]"}`}>
                      {s.num}
                    </div>
                    <div className="w-0.5 h-8 rounded-full overflow-hidden bg-[rgba(108,132,157,0.2)]">
                      <div className="w-full bg-[#305eff] transition-all duration-700" style={{ height: activeStep === i ? "100%" : "0%" }} />
                    </div>
                  </div>
                  <div>
                    {/* ✅ consistent: heading=192839, body=40566d */}
                    <h3 className="text-[15px] font-semibold text-[#192839] mb-1.5 leading-snug">{s.title}</h3>
                    <p className="text-[13px] text-[#40566d] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contact">
              <button className="bg-[#305eff] hover:bg-blue-700 text-white font-medium px-7 py-2.5 text-[14px] inline-flex items-center gap-2 group transition-all" style={{ borderRadius: 4 }}>
                Start Your Partner Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARTNER STORY ── */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-[28px] sm:text-[40px] font-semibold text-white mb-3">
              Partner Stories with Rupexa
            </motion.h2>
            {/* ✅ dark-section body: text-white/60 */}
            <motion.p variants={fadeUp} className="text-[14px] text-white/60">
              Discover how our Partners are driving innovation for their customers
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="border border-white/10 rounded-xl overflow-hidden grid md:grid-cols-2"
          >
            <div className="relative h-[260px] md:h-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=700&q=80" alt="Partner story" className="w-full h-full object-cover" />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center bg-blue-800/60 backdrop-blur-sm">
              <div className="text-[#6ed00b] text-[11px] font-semibold tracking-widest uppercase mb-5">Partner Stories</div>
              <h3 className="text-[22px] sm:text-[28px] font-semibold text-white leading-snug mb-4">
                CA Ajay <span style={{ color: "rgb(110,208,11)" }}>saved 98% time</span> on managing his client&apos;s business finance.
              </h3>
              {/* ✅ body in dark section: text-white/60 */}
              <p className="text-[14px] text-white/60 leading-relaxed mb-7">
                He reduced time taken on business processes from days to minutes.
              </p>
              <Link href="/contact">
                <button className="self-start border border-white/40 hover:bg-white hover:text-[#192839] text-white font-medium px-5 py-2 text-[13px] transition-all" style={{ borderRadius: 4 }}>
                  Download →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── METRICS (#f1f5fa) — animated counters ── */}
      <section className="py-20 bg-[#f1f5fa]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center text-[22px] sm:text-[30px] font-semibold text-[#192839] mb-14"
          >
            Our Growing Partner Network
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {typeMetrics.map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <AnimatedCounter to={m.value} suffix={m.suffix} />
                {/* ✅ label: text-[#192839] on light bg */}
                <div className="text-[15px] font-semibold text-[#192839] whitespace-pre-line leading-snug mt-2">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LOGO STRIP (white) — real backend data ── */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 text-center md:text-left min-w-[80px]">
              {/* ✅ consistent: #192839 heading on white bg */}
              <p className="text-[14px] font-normal text-[#40566d]">Our</p>
              <h3 className="text-[22px] font-semibold text-[#192839]">Partners</h3>
            </div>
            <div className="flex-1 overflow-hidden">
              <LogoMarquee />
            </div>
          </div>
        </div>
      </section>

      {/* ── WALL OF LOVE (#f1f5fa) ── */}
      <section className="py-20 bg-[#f1f5fa]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-[28px] sm:text-[40px] font-semibold text-[#192839] mb-2">
              Partner Wall of Love
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[14px] text-[#40566d]">Here&apos;s what they have to say</motion.p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-gray-100"
              >
                {/* ✅ testimonial quote: text-[#40566d] on white — consistent */}
                <p className="text-[18px] sm:text-[20px] text-[#40566d] leading-[1.8] mb-8 font-normal">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${testimonials[activeTestimonial].color} rounded-full flex items-center justify-center text-white text-[13px] font-semibold flex-shrink-0`}>
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div>
                    {/* ✅ name: #192839, role: #40566d */}
                    <div className="font-semibold text-[14px] text-[#192839]">{testimonials[activeTestimonial].name}</div>
                    <div className="text-[12px] text-[#40566d]">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-7">
              <button onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#305eff] hover:text-white hover:border-[#305eff] transition-all text-[#40566d]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-7 bg-[#305eff]" : "w-1.5 bg-gray-300"}`} />
                ))}
              </div>
              <button onClick={() => setActiveTestimonial((p) => (p + 1) % testimonials.length)} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#305eff] hover:text-white hover:border-[#305eff] transition-all text-[#40566d]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (white) ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-[26px] sm:text-[36px] font-semibold text-[#192839] mb-3">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[14px] text-[#40566d]">
              Everything you need to know about the Rupexa Partner Program.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-[#48d08c] text-[11px] font-medium tracking-widest uppercase mb-5">
              <Shield className="w-3.5 h-3.5" /> No Cost to Join
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-[30px] sm:text-[44px] font-semibold text-white mb-4 leading-snug">
              Ready to grow your business with Rupexa?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-blue-100 mb-9 max-w-lg mx-auto leading-relaxed">
              Join hundreds of partners already leveraging Rupexa&apos;s platform to deliver more value and scale their practice.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-md:max-w-[min(100%,220px)] max-md:mx-auto">
              <Link href="/contact" className="w-auto max-md:w-full">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                  className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-[14px] inline-flex items-center justify-center gap-2 group transition-colors max-md:rounded-xl md:rounded-full whitespace-nowrap w-full max-md:w-full md:w-auto"
                >
                  Become a Partner — It&apos;s Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/contact" className="w-auto max-md:w-full">
                <button className="border border-white/40 hover:border-white/70 text-white font-medium px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-[14px] transition-all max-md:rounded-xl md:rounded-full whitespace-nowrap w-full max-md:w-full md:w-auto flex items-center justify-center">
                  Talk to Sales
                </button>
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="text-[12px] text-white/40 mt-5">
              No credit card required &nbsp;·&nbsp; Setup in minutes &nbsp;·&nbsp; Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
