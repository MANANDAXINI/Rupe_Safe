'use client';

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Users, Smile, CheckCircle } from "lucide-react";

const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

function useCountOnView(targetRef: React.RefObject<HTMLElement>, endValues: number[]) {
  const [values, setValues] = useState<number[]>(endValues.map(() => 0));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            // animate counts
            endValues.forEach((end, idx) => {
              const duration = 1000 + idx * 250;
              const start = performance.now();
              const step = (t: number) => {
                const p = Math.min(1, (t - start) / duration);
                const v = Math.floor(p * end);
                setValues((prev) => {
                  const copy = [...prev];
                  copy[idx] = v;
                  return copy;
                });
                if (p < 1) requestAnimationFrame(step);
                else {
                  setValues((prev) => {
                    const copy = [...prev];
                    copy[idx] = end;
                    return copy;
                  });
                }
              };
              requestAnimationFrame(step);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [targetRef, endValues]);

  return values;
}

export default function About(): JSX.Element {
  const impactRef = useRef<HTMLElement | null>(null);
  const endNumbers = [15, 50, 250, 500];
  const counts = useCountOnView(impactRef as React.RefObject<HTMLElement>, endNumbers);

  return (
    <main className="font-sans bg-slate-100 text-slate-600 min-h-screen">
      {/* Hero Section - White with Blue Gradient Accents */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-white">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-50 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm uppercase tracking-wider mb-6">
              About Us
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight">
              Empowering Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Through Technology</span>
            </h1>

            <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              We combine strategy, engineering and product design to help companies scale with resilient, modern technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story - background image Rupesafe-aboutus.png */}
      <section
        className="py-24 bg-cover bg-center"
        style={{
          backgroundImage: "url('/aboutus-1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-2 gap-12 items-start">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="glass-card bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-12 transform transition hover:-translate-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Story</h2>

            <p className="text-slate-800 leading-relaxed mb-6 text-lg">
              Founded to accelerate digital transformation, we partner with ambitious teams to design, build and operate resilient software systems.
              Our journey began with a small group of engineers and a shared belief: technology should simplify complexity and unlock growth.
            </p>

            <p className="text-slate-700 leading-relaxed mb-6">
              Today we blend product strategy, user-centred design and pragmatic engineering to deliver measurable outcomes.
              From prototype to production, we focus on observability, security and scalable architecture — ensuring solutions that last.
            </p>

            <div className="grid gap-4 mt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600/10 flex items-center justify-center text-brand-600 font-bold">01</div>
                <div>
                  <div className="font-semibold text-slate-900">Product-led engineering</div>
                  <div className="text-sm text-slate-600">Ship fast, iterate safely with measurable outcomes.</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600/10 flex items-center justify-center text-brand-600 font-bold">02</div>
                <div>
                  <div className="font-semibold text-slate-900">Cloud-first operations</div>
                  <div className="text-sm text-slate-600">Secure, observable and cost-optimised platforms.</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-600/10 flex items-center justify-center text-brand-600 font-bold">03</div>
                <div>
                  <div className="font-semibold text-slate-900">Long-term partnerships</div>
                  <div className="text-sm text-slate-600">We stay to evolve and operate the product with you.</div>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="w-full h-[560px] bg-black/40 flex items-center justify-center">
              <Image
                src="/Rupesafe-aboutus.png"
                alt="Gig illustration"
                width={800}
                height={700}
                className="object-cover w-full h-full saturate-110 contrast-105"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Impact - counters + hover animation */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6" ref={impactRef as React.RefObject<HTMLDivElement>}>
          <h3 className="text-4xl md:text-5xl font-extrabold text-blue-500 text-center mb-10">Our Impact</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, value: 15, label: "Years of Experience", suffix: "+" },
              { icon: Users, value: 50, label: "Team Members", suffix: "+" },
              { icon: Smile, value: 250, label: "Happy Clients", suffix: "+" },
              { icon: CheckCircle, value: 500, label: "Projects Completed", suffix: "+" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass-card bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-10 hover:shadow-2xl transition-transform"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center animate-pulse">
                      <Icon className="w-7 h-7 text-brand-600" />
                    </div>

                    <div>
                      <div className="text-5xl md:text-6xl font-extrabold text-brand-600 leading-tight">
                        {counts[i]}
                        {s.suffix}
                      </div>
                      <div className="text-sm md:text-base text-slate-600 mt-1">{s.label}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values - modern dark background, centered blue-400 heading */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl md:text-5xl font-extrabold text-blue-500 text-center mb-10">Our Values</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Innovation", "Integrity", "Excellence"].map((val, idx) => (
              <motion.div
                key={val}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="relative rounded-3xl p-10 bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden transform transition hover:scale-105 hover:shadow-2xl"
              >
                <h4 className="text-2xl font-bold mb-4">{val}</h4>
                <p className="text-slate-300 mb-6">
                  We prioritise {val.toLowerCase()} in everything we build — from architecture to culture.
                </p>

                <div className="mt-6 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
                  <div className="flex gap-6 whitespace-nowrap animate-scroll-left">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span key={i} className="text-sm font-semibold text-slate-400">{val} •</span>
                    ))}
                  </div>
                </div>

                <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-brand-600/5 blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team - centered blue header, hover-grow cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl md:text-5xl font-extrabold text-blue-500 text-center mb-10">Meet the Team</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg border-b-4 border-brand-600 transform transition hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="mx-auto w-28 h-28 rounded-full bg-slate-200 mb-4" />
                <div className="font-semibold text-slate-900 text-lg">Member {i + 1}</div>
                <div className="text-sm text-slate-600 mt-1">Role</div>
                <p className="text-sm text-slate-600 mt-3"> bio describing expertise and interests — adds personality and trust.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA - attach Get Started to Contact page */}
      <section className="py-20 bg-blue-500">
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to transform your business?</h2>
          <p className="text-white mb-8">Let&apos;s partner to design and deliver software that moves your business forward.</p>
          <Link href="/contact" className="inline-block">
            <button className="px-12 py-4 bg-blue-400 text-black font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
