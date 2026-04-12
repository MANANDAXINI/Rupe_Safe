import React from "react";
import { motion } from "framer-motion";
import { Code, Cloud, Server, Trophy, Users, Smile, CheckCircle, Zap, Heart, Shield } from "lucide-react";

export default function AboutUsPage(): JSX.Element {
  return (
    <main className="font-sans bg-slate-100 text-slate-600 min-h-screen">
      {/* Header */}
      <header className="py-20 relative overflow-hidden">
        {/* animated blobs behind header */}
        <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-blue-100 animate-float pointer-events-none" />
        <div className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-blue-100 animate-float pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900">
            Empowering Business Through Technology
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            We combine strategy, engineering and product design to help companies scale with resilient technology.
          </p>
        </div>
      </header>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 shadow-xl rounded-2xl p-8"
          >
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Our Story</h2>
            <p className="text-slate-600 leading-relaxed">
              Founded with a vision to streamline digital transformation, we help organisations
              design and build modern systems that accelerate growth. From early strategy to
              ongoing delivery, our teams focus on pragmatic engineering and long-term value.
            </p>
          </motion.div>

          {/* Visual - orbit animation */}
          <div className="relative flex items-center justify-center mt-8 lg:mt-0">
            <div className="w-64 h-64 rounded-full bg-blue-100 flex items-center justify-center relative">
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-blue-200 opacity-60" />
              <div className="absolute inset-8 rounded-full bg-white shadow-lg" />
              {/* orbit rings with icons */}
              <div className="absolute w-44 h-44 rounded-full border border-blue-200 animate-spin-slow">
                <div className="absolute w-10 h-10 rounded-full bg-white flex items-center justify-center left-1/2 top-4 transform -translate-x-1/2 shadow-md">
                  <Code className="w-4 h-4 text-blue-600" />
                </div>
                <div className="absolute w-10 h-10 rounded-full bg-white flex items-center justify-center right-4 top-1/2 transform -translate-y-1/2 shadow-md">
                  <Cloud className="w-4 h-4 text-blue-600" />
                </div>
                <div className="absolute w-10 h-10 rounded-full bg-white flex items-center justify-center left-4 bottom-6 shadow-md">
                  <Server className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact (Stats) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Our Impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Trophy, label: "15+ Years of Experience", key: "years" },
              { icon: Users, label: "50+ Team Members", key: "team" },
              { icon: Smile, label: "250+ Happy Clients", key: "clients" },
              { icon: CheckCircle, label: "500+ Projects Completed", key: "projects" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.key} className="glass-card bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-6 hover:-translate-y-2 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center animate-pulse">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-5xl font-extrabold text-blue-600 leading-none">{
                        s.key === "years" ? "15+" : s.key === "team" ? "50+" : s.key === "clients" ? "250+" : "500+"
                      }</div>
                      <div className="text-sm text-slate-600 mt-1">{s.label.replace(/^[0-9+\s-]+/, "").trim() || s.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Innovation", "Integrity", "Excellence"].map((val) => (
              <div key={val} className="glass-card bg-white/80 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-8">
                <h4 className="text-xl font-bold text-slate-900 mb-4">{val}</h4>
                <p className="text-slate-600 mb-6">
                  We prioritise {val.toLowerCase()} in everything we build — ideas, processes and people.
                </p>

                <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
                  <div className="flex gap-6 whitespace-nowrap animate-scroll-left">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span key={i} className="text-sm font-semibold text-slate-500">{val} •</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="mx-auto w-24 h-24 rounded-full bg-slate-200 mb-4" />
                <div className="font-semibold text-slate-900">Member {i + 1}</div>
                <div className="text-sm text-slate-600 mt-1">Role</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to transform your business?</h2>
          <button className="px-6 py-2.5 text-sm bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg">
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}