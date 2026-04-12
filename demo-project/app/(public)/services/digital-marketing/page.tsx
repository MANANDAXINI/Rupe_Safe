"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Megaphone, BarChart3, Target, Globe, TrendingUp, Search, 
  Mail, CheckCircle2, ArrowRight, Zap, PenTool, PieChart 
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function DigitalMarketingPage() {
  const services = [
    {
      icon: Search,
      title: "Search Engine Optimization (SEO)",
      description: "Dominate search results with technical SEO, on-page optimization, and high-quality backlink strategies to rank #1 on Google."
    },
    {
      icon: Target,
      title: "PPC Advertising",
      description: "Maximize ROI with precision-targeted Google Ads and Meta campaigns that drive qualified traffic and instant leads."
    },
    {
      icon: Globe,
      title: "Social Media Management",
      description: "Build a loyal community and enhance brand presence across platforms like Instagram, LinkedIn, and Twitter with engaging content."
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      description: "Establish authority with compelling blog posts, whitepapers, and copywriting that resonates with your audience and drives conversions."
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Nurture leads and retain customers with personalized automation flows, newsletters, and high-converting email campaigns."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Make data-backed decisions with comprehensive tracking, custom dashboards, and actionable insights on campaign performance."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Audit & Analysis",
      description: "We conduct a deep dive into your current digital presence, competitor landscape, and site health to identify gaps and opportunities."
    },
    {
      step: "02",
      title: "Strategy Formulation",
      description: "We develop a custom roadmap tailored to your business goals, defining clear KPIs, target personas, and channel mix."
    },
    {
      step: "03",
      title: "Campaign Execution",
      description: "Our team launches high-impact campaigns, creating thumb-stopping creative assets and compelling ad copy."
    },
    {
      step: "04",
      title: "Optimization & Scaling",
      description: "We continuously monitor performance, A/B test creatives, and scale budgets on winning strategies to maximize ROI."
    }
  ];

  const techStack = ["Google Analytics", "Meta Ads", "SEMrush", "HubSpot", "Mailchimp", "Google Ads", "Ahrefs", "Canva"];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl -mr-40 -mt-40 opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-3xl -ml-20 -mb-20 opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-sm font-semibold text-blue-700">Data-Driven Growth</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-semibold text-[#192839] tracking-tight leading-[1.1] mb-6 max-w-4xl">
              We create strategies that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                ignite your brand visibility
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[16px] text-[#40566d] max-w-2xl mb-10 leading-relaxed">
              From SEO to paid advertising, we deliver measurable results that turn clicks into customers and traffic into revenue.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-7 py-2.5 bg-blue-600 text-white font-medium text-[14px] rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                Boost Your Traffic
              </Link>
              <Link href="#process" className="px-7 py-2.5 bg-white text-[#192839] font-medium text-[14px] rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all">
                View Case Studies
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="py-24 bg-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-[36px] font-semibold text-[#192839] mb-4">Our Expertise</h2>
            <p className="text-[15px] text-[#40566d] max-w-2xl mx-auto">Comprehensive digital marketing services designed to scale your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-[17px] font-semibold text-[#192839] mb-3">{service.title}</h3>
                <p className="text-[14px] text-[#40566d] leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process Timeline */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-2 gap-16">
            
            <div className="mb-12 lg:mb-0">
              <div className="sticky top-32">
                <h2 className="text-[30px] md:text-[42px] font-semibold text-[#192839] mb-6 leading-tight">
                  From Clicks to <br />
                  <span className="text-blue-600">Conversions</span>
                </h2>
                <p className="text-[15px] text-[#40566d] mb-8 leading-relaxed">
                  Our data-driven approach ensures every marketing dollar spent contributes to your bottom line growth.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Targeted Audience Reach",
                    "Measurable ROI",
                    "Brand Authority Building",
                    "Continuous Optimization"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#192839] font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-100 space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-white border-4 border-blue-600" />
                  <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2 block">Step {step.step}</span>
                  <h3 className="text-[20px] font-semibold text-[#192839] mb-3">{step.title}</h3>
                  <p className="text-[14px] text-[#40566d] leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Tech Stack */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">Powered by Marketing Tools</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
            {techStack.map((tech) => (
              <span key={tech} className="text-xl md:text-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 py-20 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[30px] sm:text-[44px] font-semibold text-white mb-4 leading-snug">
              Ready to scale your business?
            </h2>
            <p className="text-blue-100 text-[15px] max-w-2xl mx-auto mb-9 leading-relaxed">
              Let's skyrocket your sales today. Get a free audit of your current digital strategy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-2.5 text-[14px] bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Get a Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-2.5 text-[14px] border border-white/40 hover:border-white/70 text-white font-medium rounded-lg transition-colors">
                Schedule Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
