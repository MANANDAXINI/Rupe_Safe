"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  PieChart, Users, Truck, Factory, Briefcase, TrendingUp, 
  ClipboardList, Database, RefreshCw, CheckCircle2, ArrowRight, BarChart 
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

export default function ERPSolutionsPage() {
  const services = [
    {
      icon: PieChart,
      title: "Finance & Accounting",
      description: "Automate ledgers, streamline invoicing, and ensure tax compliance with a fully integrated financial management system."
    },
    {
      icon: Truck,
      title: "Supply Chain Management",
      description: "Gain real-time visibility into inventory, optimize logistics, and manage procurement efficiently across your entire network."
    },
    {
      icon: Users,
      title: "Human Resources (HRMS)",
      description: "Manage the complete employee lifecycle from recruitment to retirement, including payroll, attendance, and performance reviews."
    },
    {
      icon: Briefcase,
      title: "Sales & CRM",
      description: "Accelerate sales with pipeline management, automated follow-ups, and deep customer insights integrated directly into operations."
    },
    {
      icon: Factory,
      title: "Manufacturing & Production",
      description: "Optimize resource planning, shop floor control, and bill of materials (BOM) management to reduce waste and boost efficiency."
    },
    {
      icon: BarChart,
      title: "Analytics & Reporting",
      description: "Make informed decisions with custom dashboards that provide predictive insights and real-time data visualization."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Workflow Audit",
      description: "We map your current business processes, identify bottlenecks, and define the exact requirements for your new ERP system."
    },
    {
      step: "02",
      title: "Solution Architecture",
      description: "Our experts customize modules and configure workflows to perfectly align with your unique operational needs."
    },
    {
      step: "03",
      title: "Data Migration",
      description: "We ensure a secure and accurate transfer of your legacy records, maintaining data integrity throughout the transition."
    },
    {
      step: "04",
      title: "Training & Go-Live",
      description: "Comprehensive training for your teams ensures smooth adoption, followed by a supported system launch."
    }
  ];

  const techStack = ["Odoo", "SAP", "Oracle NetSuite", "Python", "PostgreSQL", "AWS", "Microsoft Dynamics", "Tableau"];

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
              <span className="text-sm font-semibold text-blue-700">Centralized Business Intelligence</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl">
              One unified platform to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                power your entire enterprise
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
              Break down silos and streamline operations with our custom ERP solutions designed to scale with your business growth.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all transform hover:-translate-y-1">
                Request a Demo
              </Link>
              <Link href="#modules" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all">
                Explore Modules
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Services Grid (ERP Modules) */}
      <section id="modules" className="py-24 bg-blue-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Modules</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">A comprehensive suite of integrated applications to manage every aspect of your business.</p>
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
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process Timeline (Sticky Layout) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-2 gap-16">
            
            {/* Left Side (Sticky) */}
            <div className="mb-12 lg:mb-0">
              <div className="sticky top-32">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Seamless Implementation <br />
                  <span className="text-blue-600">Path</span>
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  We follow a structured methodology to ensure your ERP implementation is successful, on time, and within budget.
                </p>
                
                <ul className="space-y-4">
                  {[
                    "Data Integrity Assurance",
                    "Minimized Operational Downtime",
                    "User-Centric Training",
                    "Scalable Architecture"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
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
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Tech Stack */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-10">Powered by Enterprise Technologies</p>
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
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl"
          >
            {/* Decorative Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Stop managing with spreadsheets.
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Unify your data and accelerate decision-making today. Let's build your custom ERP solution.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25">
                  Get a Custom Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-colors">
                  Watch Demo Video
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}