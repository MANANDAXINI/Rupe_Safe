"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe, Code, Server, Database, Layout,
  Smartphone, Wifi, Tablet, Battery, Bluetooth,
  BarChart3, Users, PieChart, TrendingUp, Building,
  Megaphone, Share2, ThumbsUp, Search, Mail,
  Cpu, Terminal, Lock, Network,
  Lightbulb, Target, Briefcase, GraduationCap, LineChart,
  ArrowRight, Check, CreditCard, Shield, Zap
} from "lucide-react";

// Service Data with Images and Icons
const SERVICES = [
  {
    id: "payment-gateway",
    title: "Payment Gateway",
    icon: CreditCard,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
    marquee: [CreditCard, Shield, Lock, Zap, Check, CreditCard, Shield, Lock, Zap, Check],
    description:
      "Secure, fast, and reliable payment processing solutions. Accept payments seamlessly with industry-leading security standards and instant settlement.",
    features: ["Multi-Currency Support", "Instant Settlements", "Advanced Fraud Detection", "Easy Integration APIs"],
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop",
    marquee: [Globe, Code, Server, Database, Layout, Globe, Code, Server, Database, Layout],
    description:
      "We engineer high-performance, scalable web applications using cutting-edge technologies like Next.js and React tailored to your specific business needs.",
    features: ["Custom Next.js Applications", "Enterprise SaaS Platforms", "Progressive Web Apps (PWA)", "API Integration & Design"],
  },
  {
    id: "app-development",
    title: "App Development",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    marquee: [Smartphone, Tablet, Wifi, Bluetooth, Battery, Smartphone, Tablet, Wifi, Bluetooth, Battery],
    description:
      "Create impactful mobile experiences with our native and cross-platform development services. We deliver seamless UX across iOS and Android.",
    features: ["iOS & Android Native", "Cross-Platform (Flutter)", "Mobile UI/UX Design", "App Store Optimization"],
  },
  {
    id: "erp-solutions",
    title: "ERP Solutions",
    icon: Database,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
    marquee: [BarChart3, Users, Building, TrendingUp, PieChart, BarChart3, Users, Building, TrendingUp, PieChart],
    description:
      "Streamline your entire business operation. We unify critical functions like finance, HR, and supply chain into a single, automated ecosystem.",
    features: ["Custom ERP Modules", "Real-time Analytics", "Supply Chain Automation", "CRM Integration"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    marquee: [Megaphone, Share2, Search, ThumbsUp, Mail, Megaphone, Share2, Search, ThumbsUp, Mail],
    description:
      "Accelerate brand growth with data-driven strategies. We combine technical SEO, social media management, and targeted PPC campaigns.",
    features: ["SEO & Content Strategy", "Social Media Growth", "PPC & Paid Ads", "Email Marketing Automation"],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    marquee: [Cpu, Terminal, Network, Lock, Code, Cpu, Terminal, Network, Lock, Code],
    description:
      "Solve unique business challenges with bespoke software. We build secure, API-first, and highly scalable applications tailored to your workflow.",
    features: ["Bespoke Software Design", "Legacy System Modernization", "API Development", "Cloud Migration"],
  },
  {
    id: "tech-consulting",
    title: "Tech Consulting",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    marquee: [Briefcase, GraduationCap, LineChart, Lightbulb, Target, Briefcase, GraduationCap, LineChart, Lightbulb, Target],
    description:
      "Navigate the complex technology landscape. We provide strategic advisory, technical audits, and governance frameworks to align IT with business goals.",
    features: ["Digital Transformation", "IT Infrastructure Audits", "Security Governance", "Product Roadmapping"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f0f2f5] relative overflow-hidden font-sans text-slate-900">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50 to-slate-300 opacity-80" />
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1800px] mx-auto px-20 py-20 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Comprehensive technology solutions designed to scale your business and drive innovation.
          </motion.p>
        </div>

        {/* Header Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-20 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
            alt="Our Services"
            className="w-full h-[400px] object-cover"
          />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[240px] rounded-3xl overflow-hidden bg-white shadow-2xl cursor-pointer perspective-1000"
    >
      {/* Background Image with Scale Effect */}
      <div className="absolute inset-0 overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-60"
          style={{ backgroundImage: `url('${service.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content Box - Slides Up on Hover */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] group-hover:h-[80%] bg-white rounded-t-[30px] p-4 flex flex-col transition-all duration-500 ease-in-out shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <service.icon size={20} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">{service.title}</h3>
        </div>

        <div className="w-full overflow-hidden py-2 border-y border-slate-100 mb-3 relative mask-linear-fade">
          <div className="flex gap-8 w-max animate-scroll text-slate-400">
            {service.marquee.map((Icon, i) => (
              <Icon key={i} size={20} />
            ))}
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed mb-3 line-clamp-2 group-hover:line-clamp-none transition-all text-sm">
          {service.description}
        </p>

        <ul className="space-y-2 mb-3">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
              <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        {/* Action Buttons - Fade In & Slide Up on Hover */}
        <div className="mt-auto grid grid-cols-2 gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <Link href={`/services/${service.id}`} className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-900 hover:text-slate-900 transition-colors">
            Explore <ArrowRight size={16} />
          </Link>
          <Link href={service.id === 'payment-gateway' ? '/onboarding/payment-gateway' : '/contact'} className="py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0 text-center">
            Get Started
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
