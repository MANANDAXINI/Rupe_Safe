'use client';

import React, { FormEvent, useState } from "react";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

type Props = {};

export default function ContactSection(_: Props) {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("first") || "").trim();
    const lastName = String(formData.get("last") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!firstName || !email || !message) {
      toast.error("Please fill first name, email, and message.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          service,
          message,
          source: "home",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully. We will get back to you soon.");
      form.reset();
    } catch (error: any) {
      toast.error(error?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  const marqueeItems = [
    "Start Project",
    "Get Quote",
    "Consultation",
    "Discovery",
    "Strategy",
    "Start Project",
    "Get Quote",
    "Consultation",
    "Discovery",
    "Strategy",
  ];

  const marqueeList = [...marqueeItems, ...marqueeItems];

  return (
    <section className="py-24 relative overflow-hidden bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-3 gap-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8 lg:col-span-1"
        >
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase">Get In Touch</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
              Ready to start your <br /> <span className="text-blue-600">Digital Journey?</span>
            </h2>
            <p className="mt-4 text-slate-600 max-w-xl">
              Share a few details and we’ll get back within one business day.
            </p>
          </div>

          <div className="glass-card bg-white/95 backdrop-blur-lg rounded-3xl p-4 shadow-xl">
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-900">+91 9322482539</p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-900">care@rupexa.in</p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Registered Corporate Office</p>
                  <p className="font-semibold text-slate-900">Block No.101/102, Shriram Tower</p>
                  <p className="text-sm text-slate-500">Next To NIT Kingsway Civil Lines, Sadar, Nagpur, Maharashtra 440001</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rupexa+Private+Limited,+Tent+Line,+Sadar,+Nagpur,+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View on Maps
                    <MapPin className="w-3.5 h-3.5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="relative lg:col-span-2">
          <div className="rounded-3xl p-8 shadow-xl relative z-10 bg-white text-slate-900">
            <div className="mb-6 py-3 overflow-hidden">
              <div className="flex gap-6 whitespace-nowrap animate-scroll-left justify-start">
                {marqueeList.map((t, i) => (
                  <span key={t + i} className="text-sm font-semibold text-slate-500 pr-6">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="first" placeholder="First name" required className="p-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-0 focus:shadow-lg transition" />
                <input name="last" placeholder="Last name" className="p-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-0 focus:shadow-lg transition" />
              </div>

              <input name="email" type="email" placeholder="Email" required className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-0 focus:shadow-lg transition" />

              <select name="service" className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-0 focus:shadow-lg transition">
                <option className="bg-white text-slate-900">Web Development</option>
                <option className="bg-white text-slate-900">App Development</option>
                <option className="bg-white text-slate-900">ERP Solutions</option>
                <option className="bg-white text-slate-900">Digital Marketing</option>
                <option className="bg-white text-slate-900">Payment Gateway</option>
              </select>

              <textarea name="message" rows={6} placeholder="Tell us about your project" required className="w-full p-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-0 focus:shadow-lg transition" />

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 transition disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    Sending <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full border border-slate-200 flex items-center justify-center opacity-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
