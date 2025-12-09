"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Clock, MessageSquare, User, AtSign, Hash, FileText, Sparkles } from "lucide-react";
import { toast } from 'sonner';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Head Office",
      details: ["123 Tech Park, Suite 400", "Innovation City, ST 12345"],
      delay: 0,
      link: null
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@rupesafe.com", "support@rupesafe.com"],
      delay: 0.1,
      link: "mailto:hello@rupesafe.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      delay: 0.2,
      link: "tel:+15551234567"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9AM - 6PM", "Sat - Sun: Closed"],
      delay: 0.3,
      link: null
    }
  ];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl -mr-40 -mt-40 opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-3xl -ml-20 -mb-20 opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm uppercase tracking-wider mb-6">
              Contact Us
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Touch</span>
            </h1>

            <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Ready to discuss your financial needs? We&apos;re here to help you achieve your goals with personalized solutions and expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section - Light Theme - CENTERED & BIGGER */}
      <section className="bg-slate-50 py-32 relative overflow-hidden">
        {/* Animated Background Elements - Light */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Content - Centered */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Sparkles className="text-white w-6 h-6" />
                </div>
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Let's Collaborate</span>
              </div> */}

              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400">Transform</span> Your Future?
              </h2>

              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                Connect with our experts to explore how our cutting-edge solutions can elevate your business to new heights.
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {[
                  { icon: MessageSquare, text: "24/7 Expert Support", color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: Clock, text: "Rapid Response Time", color: "text-cyan-600", bg: "bg-cyan-50" },
                  { icon: Sparkles, text: "Tailored Solutions", color: "text-teal-600", bg: "bg-teal-50" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full ${item.bg} border border-slate-200 hover:bg-white transition-colors duration-300 shadow-sm`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${item.color} shadow-sm`}>
                      <item.icon size={16} />
                    </div>
                    <span className="font-medium text-slate-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Container - Centered & Bigger - Light Theme */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Glowing Border Effect - Subtle for Light Theme */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-[2.5rem] opacity-30 blur-lg group-hover:opacity-50 group-hover:blur-xl transition-all duration-500" />

              <div className="relative bg-white rounded-[2rem] p-8 md:p-16 border border-slate-100 shadow-2xl overflow-hidden">
                {/* Subtle inner glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-blue-50/50 blur-[100px] pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2 group/field">
                      <label className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${focusedField === 'name' ? 'text-blue-600' : 'text-slate-500'}`}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User className={`absolute left-5 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-blue-600' : 'text-slate-400'}`} />
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="John Doe"
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all duration-300 text-lg"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 group/field">
                      <label className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${focusedField === 'phone' ? 'text-blue-600' : 'text-slate-500'}`}>
                        Phone Number
                      </label>
                      <div className="relative">
                        <Hash className={`absolute left-5 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'phone' ? 'text-blue-600' : 'text-slate-400'}`} />
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all duration-300 text-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 group/field">
                    <label className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-600' : 'text-slate-500'}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <AtSign className={`absolute left-5 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-600' : 'text-slate-400'}`} />
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all duration-300 text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group/field">
                    <label className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${focusedField === 'subject' ? 'text-blue-600' : 'text-slate-500'}`}>
                      Subject
                    </label>
                    <div className="relative">
                      <FileText className={`absolute left-5 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'subject' ? 'text-blue-600' : 'text-slate-400'}`} />
                      <select
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all duration-300 text-lg appearance-none cursor-pointer"
                      >
                        <option value="" className="text-slate-400">Select a topic</option>
                        <option value="Web Development" className="text-slate-900">Web Development</option>
                        <option value="App Development" className="text-slate-900">App Development</option>
                        <option value="Digital Marketing" className="text-slate-900">Digital Marketing</option>
                        <option value="ERP Solutions" className="text-slate-900">ERP Solutions</option>
                        <option value="Other" className="text-slate-900">Other</option>
                      </select>
                      <div className="absolute right-6 top-5 pointer-events-none text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 group/field">
                    <label className={`text-sm font-bold tracking-wide uppercase transition-colors duration-300 ${focusedField === 'message' ? 'text-blue-600' : 'text-slate-500'}`}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={6}
                      placeholder="Tell us about your project..."
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all duration-300 text-lg resize-none"
                      required
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full py-5 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white font-bold text-xl rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Send Message
                        <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Contact Information Cards - Dark BG, Light Cards */}
      <section className="py-20 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Contact Information</h2>
            <p className="mt-4 text-slate-600">Reach out to us through any of these channels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactCards.map((card, index) => {
              const CardWrapper = card.link ? 'a' : 'div';
              const wrapperProps = card.link ? { href: card.link } : {};

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: card.delay }}
                  whileHover={{ y: -10 }}
                  className="h-full"
                >
                  <CardWrapper
                    {...wrapperProps}
                    className={`block h-full bg-white rounded-3xl p-8 text-center relative overflow-hidden group shadow-xl ${card.link ? 'cursor-pointer' : ''}`}
                  >
                    {/* Decorative background blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-blue-100" />

                    <div className="relative z-10 flex flex-col items-center h-full">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                        <card.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-4">{card.title}</h3>

                      <div className="space-y-2 mt-auto">
                        {card.details.map((detail, idx) => (
                          <p key={idx} className="text-slate-600 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Find Us</h2>
            <p className="mt-4 text-slate-600">Visit our office for a cup of coffee</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.665678866956!2d79.08815461493454!3d21.14580038593506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b32753b7b0969!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625634895621!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-500 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mb-32" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Contact Immediately
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Need urgent assistance? Our support team is available 24/7 to help you with your queries.
            </p>

            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-full shadow-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 group"
            >
              <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Call Now
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
