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
  ArrowRight, Check, CreditCard, Shield, Zap
} from "lucide-react";

// Service Data with Images and Icons
const SERVICES = [
  {
    id: "payment-gateway",
    title: "Payment Gateway",
    icon: CreditCard,
    highlighted: true,
    image: "/services/payment-gateway.jpg",
    marquee: [CreditCard, Shield, Zap, Lock, Globe, CreditCard, Shield, Zap, Lock, Globe],
    description:
      "India's most advanced payment gateway with instant settlements, 100+ payment methods, and bank-grade security.",
    features: ["Instant Settlements", "100+ Payment Methods", "PCI DSS Compliance", "Easy API Integration"],
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: Globe,
    image: "/services/web-dev.jpg",
    marquee: [Globe, Code, Server, Database, Layout, Globe, Code, Server, Database, Layout],
    description:
      "We engineer high-performance, scalable web applications using cutting-edge technologies like Next.js and React tailored to your specific business needs.",
    features: ["Custom Next.js Applications", "Enterprise SaaS Platforms", "Progressive Web Apps (PWA)", "API Integration & Design"],
  },
  {
    id: "app-development",
    title: "App Development",
    icon: Smartphone,
    image: "/services/app-dev.jpg",
    marquee: [Smartphone, Tablet, Wifi, Bluetooth, Battery, Smartphone, Tablet, Wifi, Bluetooth, Battery],
    description:
      "Create impactful mobile experiences with our native and cross-platform development services. We deliver seamless UX across iOS and Android.",
    features: ["iOS & Android Native", "Cross-Platform (Flutter)", "Mobile UI/UX Design", "App Store Optimization"],
  },
  {
    id: "erp-solutions",
    title: "ERP Solutions",
    icon: Database,
    image: "/services/erp.jpg",
    marquee: [BarChart3, Users, Building, TrendingUp, PieChart, BarChart3, Users, Building, TrendingUp, PieChart],
    description:
      "Streamline your entire business operation. We unify critical functions like finance, HR, and supply chain into a single, automated ecosystem.",
    features: ["Custom ERP Modules", "Real-time Analytics", "Supply Chain Automation", "CRM Integration"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    image: "/services/digital-marketing.jpg",
    marquee: [Megaphone, Share2, Search, ThumbsUp, Mail, Megaphone, Share2, Search, ThumbsUp, Mail],
    description:
      "Accelerate brand growth with data-driven strategies. We combine technical SEO, social media management, and targeted PPC campaigns.",
    features: ["SEO & Content Strategy", "Social Media Growth", "PPC & Paid Ads", "Email Marketing Automation"],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    icon: Cpu,
    image: "/services/cms.jpg",
    marquee: [Cpu, Terminal, Network, Lock, Code, Cpu, Terminal, Network, Lock, Code],
    description:
      "Solve unique business challenges with bespoke software. We build secure, API-first, and highly scalable applications tailored to your workflow.",
    features: ["Bespoke Software Design", "Legacy System Modernization", "API Development", "Cloud Migration"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f0f2f5] relative overflow-hidden font-sans text-slate-900">
      {/* Background Gradients */}
      <section className="relative h-[calc(100vh-64px)] flex flex-col justify-center overflow-hidden">
        {/* Background Video - Crystal Clear */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-[1.01]"
          >
            <source src="https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/e374c2fe-d8d9-464f-9039-9b333e150602.mp4" />
          </video>
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          

         

        
        </div>
      </section>


      <div className="max-w-[1600px] mx-auto px-6 py-20 relative z-10">

        {/* Added "Our Services" Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600">Our Services</h2>
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
            Lets collaborate to build something amazing. Our team is ready to help you achieve your digital goals.
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
      className={`group relative h-[700px] rounded-3xl overflow-hidden bg-white shadow-2xl cursor-pointer perspective-1000 ${service.highlighted ? 'ring-4 ring-indigo-500 shadow-indigo-500/20' : ''}`}
    >
      {/* Highlight Badge */}
      {service.highlighted && (
        <div className="absolute top-6 right-6 z-20">
          <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      {/* Background Image with Scale Effect */}
      <div className="absolute inset-0 overflow-hidden bg-slate-900">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 ${service.highlighted ? 'opacity-90' : 'group-hover:opacity-60'}`}
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
          <h3 className="text-2xl font-bold text-slate-900 leading-tight">
            {service.title === "Custom Software" ? <>Custom<br />Software</> : service.title}
          </h3>
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
            className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-900 hover:text-slate-900 transition-colors"
          >
            Explore Service <ArrowRight size={16} />
          </Link>
          <Link
            href={service.id === 'payment-gateway' ? '/onboarding/payment-gateway' : '/contact'}
            className="flex items-center justify-center py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
