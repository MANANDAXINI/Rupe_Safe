"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Globe, Code, Server, Database, Layout, 
  Smartphone, Wifi, Tablet, Battery, Bluetooth,
  BarChart3, Users, PieChart, TrendingUp, Building,
  Megaphone, Share2, ThumbsUp, Search, Mail,
  Cpu, Terminal, Lock, Network,
  Lightbulb, Target, Briefcase, GraduationCap, LineChart,
  ArrowRight, Check
} from "lucide-react";

// Service Data with Images and Icons
const SERVICES = [
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
    id: "tech-consultant",
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
        <section className="relative pt-40 pb-32 overflow-hidden bg-white">
        {/* Background Gradients (Blue/White Theme) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/80 rounded-full blur-[80px] opacity-60" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-50/80 rounded-full blur-[80px] opacity-60" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm uppercase tracking-wider mb-6">
            Our Expertise
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
            Driving Innovation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Through Technology
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Follow our roadmap of digital transformation — strategy, engineering, and delivery that scales your business.
          </p>
        </div>
      </section>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50 to-slate-300 opacity-80" />
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-20 relative z-10">
        
        {/* Added "Our Services" Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our Services</h2>
        </div>

        {/* Services Grid - Increased gap from gap-8 to gap-14 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-blue-500 relative z-10 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Let's collaborate to build something amazing. Our team is ready to help you achieve your digital goals.
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

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[700px] rounded-3xl overflow-hidden bg-white shadow-2xl cursor-pointer perspective-1000"
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
      <div className="absolute bottom-0 left-0 w-full h-[60%] group-hover:h-[80%] bg-white rounded-t-[30px] p-8 flex flex-col transition-all duration-500 ease-in-out shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        
        {/* Header Row */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <service.icon size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 leading-tight">{service.title}</h3>
        </div>

        {/* Marquee */}
        <div className="w-full overflow-hidden py-4 border-y border-slate-100 mb-6 relative mask-linear-fade">
          <div className="flex gap-8 w-max animate-scroll text-slate-400">
            {service.marquee.map((Icon, i) => (
              <Icon key={i} size={20} />
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-3 mb-6">
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
          <Link 
            href={`/services/${service.id}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-900 hover:text-slate-900 transition-colors"
          >
            Explore Service <ArrowRight size={16} />
          </Link>
          <Link 
            href="/contact"
            className="flex items-center justify-center py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
