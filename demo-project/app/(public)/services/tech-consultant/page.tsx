'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Lightbulb, Compass, Target, ShieldCheck, Cpu, GitBranch, 
  Presentation, Users, CheckCircle2, ArrowRight 
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

export default function TechConsultantPage() {
  const services = [
    {
      icon: Compass,
      title: "Digital Transformation Strategy",
      description: "Comprehensive roadmaps for modernizing legacy systems and adopting new technologies to stay competitive in a digital-first world."
    },
    {
      icon: Lightbulb,
      title: "CTO Advisory Services",
      description: "Fractional technical leadership for startups and SMEs, providing high-level guidance without the cost of a full-time executive."
    },
    {
      icon: Cpu,
      title: "Cloud Architecture Design",
      description: "Planning scalable, secure, and cost-efficient cloud infrastructure on AWS, Azure, or Google Cloud tailored to your workload."
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity Assessments",
      description: "In-depth vulnerability audits, risk analysis, and compliance guides to protect your business assets and customer data."
    },
    {
      icon: Target,
      title: "Software Stack Selection",
      description: "Unbiased evaluation and selection of the right programming languages, frameworks, and tools for your specific project needs."
    },
    {
      icon: GitBranch,
      title: "IT Process Optimization",
      description: "Streamlining development workflows through Agile implementation, DevOps practices, and CI/CD automation."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Current State Audit",
      description: "We analyze your existing infrastructure, codebases, and workflows to identify gaps, inefficiencies, and risks."
    },
    {
      step: "02",
      title: "Strategic Roadmap",
      description: "We define clear technical goals, timelines, and budgets, aligning technology initiatives with your business objectives."
    },
    {
      step: "03",
      title: "Technology Selection",
      description: "We evaluate vendors, platforms, and architectural patterns to recommend the best-fit solutions for your long-term growth."
    },
    {
      step: "04",
      title: "Implementation Oversight",
      description: "We guide your internal teams or vendors through the execution phase, ensuring best practices and successful delivery."
    }
  ];

  const techStack = ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Jira"];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Blobs */}
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
              <span className="text-sm font-semibold text-blue-700">Strategic Technology Leadership</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-semibold text-[#192839] tracking-tight leading-[1.1] mb-6 max-w-4xl">
              Expert guidance to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                future-proof your digital landscape
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[16px] text-[#40566d] max-w-2xl mb-10 leading-relaxed">
              Navigate complex technical challenges with confidence. We provide the clarity and strategy you need to scale efficiently.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-7 py-2.5 bg-blue-600 text-white font-medium text-[14px] rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                Schedule Strategy Call
              </Link>
              <Link href="#process" className="px-7 py-2.5 bg-white text-[#192839] font-medium text-[14px] rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all">
                View Case Studies
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Services Grid (Consulting Areas) */}
      <section className="py-24 bg-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-[36px] font-semibold text-[#192839] mb-4">Consulting Areas</h2>
            <p className="text-[15px] text-[#40566d] max-w-2xl mx-auto">Tailored advisory services to solve your most critical technology problems.</p>
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

      {/* 3. Process Timeline (Sticky Layout) */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-2 gap-16">
            
            {/* Left Side (Sticky) */}
            <div className="mb-12 lg:mb-0">
              <div className="sticky top-32">
                <h2 className="text-[30px] md:text-[42px] font-semibold text-[#192839] mb-6 leading-tight">
                  Your Path to <br />
                  <span className="text-blue-600">Digital Clarity</span>
                </h2>
                <p className="text-[15px] text-[#40566d] mb-8 leading-relaxed">
                  We bring structure to chaos, helping you make informed decisions that reduce risk and accelerate growth.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Unbiased Expert Advice",
                    "Cost Reduction Strategies",
                    "Scalable Growth Planning",
                    "Risk Mitigation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side (Scrollable Timeline) */}
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
                  {/* Timeline Dot */}
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

      {/* 4. Tech Focus */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">Strategic Technology Focus</p>
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
              Don't let technology hold you back.
            </h2>
            <p className="text-blue-100 text-[15px] max-w-2xl mx-auto mb-9 leading-relaxed">
              Get clear, actionable advice to drive your business forward. Partner with experts who understand your goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-2.5 text-[14px] bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Book a Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-2.5 text-[14px] border border-white/40 hover:border-white/70 text-white font-medium rounded-lg transition-colors">
                Meet Our Consultants
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
