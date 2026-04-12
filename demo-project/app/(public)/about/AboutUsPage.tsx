"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Trophy, Users, Smile, CheckCircle, ArrowRight, Lightbulb, ShieldCheck, Zap } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const stats = [
  { icon: Trophy,       value: "15+",  label: "Years of Experience" },
  { icon: Users,        value: "50+",  label: "Team Members" },
  { icon: Smile,        value: "250+", label: "Happy Clients" },
  { icon: CheckCircle,  value: "500+", label: "Projects Completed" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We stay ahead of the curve — constantly exploring new technologies so your business gets tomorrow&apos;s solutions today.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "We operate with full transparency. No hidden fees, no vague deliverables — just honest partnerships built on trust.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Zap,
    title: "Excellence",
    desc: "Good enough is never enough. We obsess over quality in every line of code, every design decision, every client interaction.",
    color: "from-orange-400 to-red-500",
  },
];

export default function AboutUsPage(): JSX.Element {
  return (
    <main className="min-h-screen font-sans bg-[#f1f5fa] text-[#192839]">

      {/* ── HERO ── */}
      <section className="relative bg-[#0a0f1e] pt-32 pb-28 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#305eff]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#48d08c] text-[11px] font-[700] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-[#48d08c] rounded-full animate-pulse" />
              About Rupexa
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-[36px] sm:text-[52px] lg:text-[64px] font-semibold leading-[1.05] text-white mb-6 max-w-4xl mx-auto">
              Empowering Business{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#305eff] via-blue-400 to-purple-400">Through Technology</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[17px] text-[#8fa3bc] max-w-2xl mx-auto leading-relaxed">
              We combine strategy, engineering and product design to help companies scale with resilient technology and powerful financial infrastructure.
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f1f5fa] to-transparent" />
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-24 bg-[#f1f5fa]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-[11px] font-[800] tracking-[0.2em] uppercase text-[#305eff] mb-4">Our Story</motion.p>
              <motion.h2 variants={fadeUp} className="text-[32px] sm:text-[42px] font-[900] text-[#192839] leading-snug mb-6">
                From a vision to a full-stack<br />finance platform
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[16px] text-[#40566d] leading-relaxed mb-6">
                Founded with a vision to streamline digital transformation, Rupexa helps organisations design and build modern systems that accelerate growth. From early strategy to ongoing delivery, our teams focus on pragmatic engineering and long-term value.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[16px] text-[#40566d] leading-relaxed mb-8">
                Today we serve 250+ clients across India, powering their payroll, payments, web presence and enterprise operations — all under one roof.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/contact" className="w-auto">
                  <button className="inline-flex items-center gap-2 bg-[#305eff] hover:bg-blue-700 text-white font-medium px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-[13px] sm:text-[14px] transition-all shadow-lg shadow-blue-200 group whitespace-nowrap">
                    Work with Us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=500&fit=crop&q=80"
                  alt="Rupexa team collaborating"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#e6f9f1] rounded-full flex items-center justify-center text-[#009e5c] font-[800]">✓</div>
                  <div>
                    <p className="text-[11px] text-[#40566d] font-[500]">Est. Since</p>
                    <p className="text-[15px] font-[800] text-[#192839]">2009 · 15+ years</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── IMPACT / STATS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-[32px] sm:text-[42px] font-[900] text-[#192839] mb-3">Our Impact</motion.h2>
            <motion.p variants={fadeUp} className="text-[16px] text-[#40566d]">Numbers that speak louder than words.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} variants={fadeUp} className="bg-[#f1f5fa] rounded-2xl p-7 border border-gray-100 hover:border-[#305eff]/30 hover:shadow-lg transition-all group">
                  <div className="w-11 h-11 bg-[#eef1ff] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#305eff] transition-colors">
                    <Icon className="w-5 h-5 text-[#305eff] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-[42px] font-[900] text-[#305eff] leading-none mb-2">{s.value}</div>
                  <div className="text-[14px] text-[#40566d] font-[500]">{s.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-[#f1f5fa]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-[32px] sm:text-[42px] font-[900] text-[#192839] mb-3">Our Values</motion.h2>
            <motion.p variants={fadeUp} className="text-[16px] text-[#40566d]">The principles that guide everything we build.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#305eff]/20 transition-all group">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[20px] font-[800] text-[#192839] mb-3">{v.title}</h3>
                  <p className="text-[15px] text-[#40566d] leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="text-[32px] sm:text-[42px] font-[900] text-[#192839] mb-3">Meet the Team</motion.h2>
            <motion.p variants={fadeUp} className="text-[16px] text-[#40566d]">Passionate people building the future of business finance.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Rohan Mehta", role: "Co-Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&q=80" },
              { name: "Anjali Sharma", role: "Head of Engineering", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&q=80" },
              { name: "Vikram Singh", role: "Chief Product Officer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&q=80" },
              { name: "Priya Desai", role: "Director of Finance", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&q=80" },
            ].map((m, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-[#f1f5fa] rounded-3xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all group">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-[#305eff]/20 group-hover:ring-[#305eff]/50 transition-all">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-[700] text-[#192839] text-[15px]">{m.name}</div>
                <div className="text-[13px] text-[#40566d] mt-1">{m.role}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-[30px] sm:text-[44px] font-semibold text-white mb-5">
              Ready to transform your business?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[15px] text-blue-100 mb-9 max-w-lg mx-auto leading-relaxed">
              Let&apos;s build something great together. Reach out and our team will help you get started.
            </motion.p>
            <motion.div variants={fadeUp} className="flex justify-center">
              <Link href="/contact" className="w-auto">
                <button
                  className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-[14px] inline-flex items-center gap-2 group transition-colors rounded-full whitespace-nowrap"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}