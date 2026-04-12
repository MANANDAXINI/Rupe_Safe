"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Mail, MapPin, Phone, Send, Clock,
  MessageSquare, User, AtSign, FileText, Sparkles, ArrowRight
} from "lucide-react";
import { toast } from "sonner";

/* ── animation presets ────────────────────────────────────────────────────── */
const fadeUp: Variants  = { hidden:{opacity:0,y:22}, visible:{opacity:1,y:0,transition:{duration:0.52}} };
const stagger: Variants = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.09}} };
const fadeLeft: Variants  = { hidden:{opacity:0,x:24}, visible:{opacity:1,x:0,transition:{duration:0.6}} };

/* ── data ─────────────────────────────────────────────────────────────────── */
const countryCodes = [
  { code:"+91",  label:"IN",  flag:"🇮🇳" },
  { code:"+1",   label:"US",  flag:"🇺🇸" },
  { code:"+44",  label:"UK",  flag:"🇬🇧" },
  { code:"+971", label:"UAE", flag:"🇦🇪" },
  { code:"+65",  label:"SG",  flag:"🇸🇬" },
];

const contactCards = [
  { icon:MapPin, title:"Head Office",    delay:0,   link:null,
    details:["Block No.101/102, Shriram Tower","Next To NIT Kingsway Civil Lines, Sadar, Nagpur, Maharashtra 440001"] },
  { icon:Mail,   title:"Email Us",       delay:0.1, link:"mailto:care@rupexa.in",
    details:["care@rupexa.in","info@rupexa.in"] },
  { icon:Phone,  title:"Call Us",        delay:0.2, link:"tel:+919067488273",
    details:["+91 9067488273"] },
  { icon:Clock,  title:"Business Hours", delay:0.3, link:null,
    details:["Mon - Fri: 9AM - 6PM","Sat - Sun: Closed"] },
];

const perks = [
  { icon:MessageSquare, text:"24/7 Expert Support",  color:"text-blue-600",   bg:"bg-blue-50"   },
  { icon:Clock,         text:"Rapid Response Time",  color:"text-indigo-600", bg:"bg-indigo-50" },
  { icon:Sparkles,      text:"Tailored Solutions",   color:"text-blue-700",   bg:"bg-blue-100"  },
];

const inputBase =
  "w-full bg-gray-50 border border-gray-200 text-slate-900 placeholder:text-slate-400 " +
  "rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 " +
  "focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelBase = "block text-xs font-bold uppercase tracking-widest mb-1.5 transition-colors duration-200";

/* ────────────────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [formState, setFormState] = useState({
    name:"", email:"", countryCode:"+91", phoneNumber:"", subject:"", message:"",
  });
  const [focusedField, setFocusedField] = useState<string|null>(null);
  const selectedCountry = countryCodes.find(c => c.code === formState.countryCode) ?? countryCodes[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState(p => ({ ...p, phoneNumber: e.target.value.replace(/[^0-9]/g,"").slice(0,10) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(formState.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    toast.success("Form details captured successfully.");
  };

  const lbl = (f:string) => focusedField === f ? "text-blue-600" : "text-slate-400";

  return (
    <main className="min-h-screen bg-gray-100 font-sans text-slate-900 overflow-x-hidden">

      {/* ── 1. PAGE HEADER ─────────────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-gray-200 pt-32 pb-14 overflow-hidden">
        {/* Subtle blue dot-grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"radial-gradient(#2563eb 1px,transparent 1px)", backgroundSize:"26px 26px" }}
        />
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold text-blue-600 mb-3 tracking-tight">
              Get in Touch
            </motion.h1>
            <motion.div variants={fadeUp} className="w-12 h-1 bg-blue-600 mb-5" />
            <motion.p variants={fadeUp} className="text-slate-500 text-base max-w-2xl leading-relaxed">
              Ready to discuss your financial needs? We're here to help you achieve your goals with
              personalized solutions and expert guidance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. PERKS ROW ───────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden" whileInView="visible" viewport={{ once:true }} variants={stagger}
          >
            {perks.map(({ icon:Icon, text, color, bg }) => (
              <motion.span
                key={text}
                variants={fadeUp}
                whileHover={{ y:-2, scale:1.03 }}
                transition={{ type:"spring", stiffness:300 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bg} border border-gray-200 text-sm font-semibold text-slate-700 cursor-default shadow-sm`}
              >
                <Icon className={`w-4 h-4 ${color}`} />
                {text}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. FORM + IMAGE ────────────────────────────────────────────────── */}
      <section className="py-16 relative">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-indigo-50/40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
              Ready to Transform
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-slate-900">
              Your Future?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-slate-500 text-sm max-w-xl mb-10">
              Connect with our experts to explore how our cutting-edge solutions can elevate your business to new heights.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ── Contact Form ───────────────────────────────────── */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
            >
              <motion.div
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-500 p-6 sm:p-8"
                whileHover={{ y:-2 }}
                transition={{ type:"spring", stiffness:200, damping:20 }}
              >
                <h3 className="text-base font-bold text-slate-900 mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-blue-600 inline-block" />
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className={`${labelBase} ${lbl("name")}`}>Full Name</label>
                      <div className="relative">
                        <User className={`absolute left-3 top-3 w-4 h-4 transition-colors duration-200 ${lbl("name")}`} />
                        <input
                          type="text" name="name" value={formState.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="John Doe"
                          className={`${inputBase} pl-9`}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={`${labelBase} ${focusedField === "phoneNumber" || focusedField === "countryCode" ? "text-blue-600" : "text-slate-400"}`}>
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 flex-shrink-0 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                          <span className="text-base">{selectedCountry.flag}</span>
                          <select
                            name="countryCode" value={formState.countryCode}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("countryCode")}
                            onBlur={() => setFocusedField(null)}
                            className="bg-transparent text-slate-900 text-sm py-3 outline-none cursor-pointer pr-1"
                          >
                            {countryCodes.map(c => (
                              <option key={c.code} value={c.code}>{c.label} {c.code}</option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="text" name="phoneNumber" value={formState.phoneNumber}
                          onChange={handlePhone}
                          onFocus={() => setFocusedField("phoneNumber")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="10-digit number"
                          className={inputBase} inputMode="numeric" maxLength={10} required
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400">Format: country code + 10 digit mobile number</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`${labelBase} ${lbl("email")}`}>Email Address</label>
                    <div className="relative">
                      <AtSign className={`absolute left-3 top-3 w-4 h-4 transition-colors duration-200 ${lbl("email")}`} />
                      <input
                        type="email" name="email" value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        className={`${inputBase} pl-9`}
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className={`${labelBase} ${lbl("subject")}`}>Subject</label>
                    <div className="relative">
                      <FileText className={`absolute left-3 top-3 w-4 h-4 pointer-events-none transition-colors duration-200 ${lbl("subject")}`} />
                      <select
                        name="subject" value={formState.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputBase} pl-9 appearance-none cursor-pointer`}
                      >
                        <option value="">Select a topic</option>
                        <option value="Web Development">Web Development</option>
                        <option value="App Development">App Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="ERP Solutions">ERP Solutions</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={`${labelBase} ${lbl("message")}`}>Message</label>
                    <textarea
                      name="message" value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      placeholder="Tell us about your project..."
                      className={`${inputBase} resize-none`}
                      required
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale:1.015, boxShadow:"0 8px 24px rgba(37,99,235,0.25)" }}
                    whileTap={{ scale:0.98 }}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm shadow-blue-200 group"
                  >
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>

            {/* ── Right Image Card ────────────────────────────────── */}
            <motion.div
              className="hidden lg:block"
              initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeLeft}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-md border border-gray-200 group"
                style={{ minHeight:"560px" }}
                whileHover={{ scale:1.005, boxShadow:"0 20px 50px rgba(37,99,235,0.15)" }}
                transition={{ type:"spring", stiffness:180, damping:22 }}
              >
                <img
                  src="/images/services.jpg"
                  alt="Rupexa support team at work"
                  className="w-full h-full min-h-[560px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />

                {/* Floating info card at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity:0, y:12 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.3, duration:0.5 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5"
                  >
                    <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Rupexa Support</p>
                    <h3 className="text-xl font-bold text-white mb-1.5">Talk to our team</h3>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      Strategic guidance and quick response for onboarding, payments, and integrations.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-blue-300 text-xs font-semibold">
                      <span>Get started today</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                </div>

                {/* Animated shimmer strip on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. CONTACT INFO CARDS ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-200 relative overflow-hidden">
        {/* Subtle gradient behind cards */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Reach Out</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-slate-900">Contact Information</motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-slate-500 text-sm mb-10">Reach out to us through any of these channels</motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}
          >
            {contactCards.map((card) => {
              const Tag = card.link ? "a" : "div";
              const extra = card.link ? { href:card.link } : {};
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{ y:-6, boxShadow:"0 12px 32px rgba(37,99,235,0.12)" }}
                  transition={{ type:"spring", stiffness:260, damping:20 }}
                >
                  <Tag
                    {...(extra as any)}
                    className={`block h-full bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all duration-300 group overflow-hidden relative ${card.link ? "cursor-pointer" : ""}`}
                  >
                    {/* Top accent bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-t-2xl" />

                    <motion.div
                      className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300"
                      whileHover={{ rotate:5 }}
                      transition={{ type:"spring", stiffness:400 }}
                    >
                      <card.icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </motion.div>

                    <h3 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {card.title}
                    </h3>
                    <div className="space-y-1">
                      {card.details.map(d => (
                        <p key={d} className="text-slate-500 text-sm leading-relaxed">{d}</p>
                      ))}
                    </div>
                  </Tag>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 5. MAP ─────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Location</motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold text-slate-900">Find Us</motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-slate-500 text-sm mb-10">Visit our office for a cup of coffee</motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.55 }}
            whileHover={{ boxShadow:"0 16px 48px rgba(37,99,235,0.12)" }}
            className="w-full h-[300px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm transition-shadow duration-500"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.665678866956!2d79.08815461493454!3d21.14580038593506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b32753b7b0969!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625634895621!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border:0 }} allowFullScreen loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA STRIP ───────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 py-16 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.div
              initial={{ opacity:0, x:-20 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5 }}
            >
              <h2 className="text-white text-[22px] font-semibold mb-2">Contact Immediately</h2>
              <p className="text-blue-100 text-[14px] max-w-lg">
                Need urgent assistance? Our support team is available 24/7 to help you with your queries.
              </p>
            </motion.div>

            <motion.a
              href="tel:+919067488273"
              initial={{ opacity:0, x:20 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5, delay:0.1 }}
              whileHover={{ scale:1.03, y:-2 }}
              whileTap={{ scale:0.97 }}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-medium px-6 py-2.5 text-[14px] flex-shrink-0 group transition-colors rounded-lg"
            >
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              Call Now
            </motion.a>
          </div>
        </div>
      </section>

    </main>
  );
}
