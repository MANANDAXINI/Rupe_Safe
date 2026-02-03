'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, Gavel, UserCheck, Briefcase, FileText } from 'lucide-react';

export default function TermsAndConditions() {
    const sections = [
        {
            title: "1. Common Terms for All Users",
            icon: FileText,
            color: "blue",
            content: "By accessing RupeSafe, you agree to be bound by these legal terms. RupeSafe acts as an intermediary technology provider. We do not hold funds but facilitate the collection of KYC and financial data to be processed by our regulated payment gateway partners."
        },
        {
            title: "2. Financial Responsibility & Compliance",
            icon: Scale,
            color: "indigo",
            content: "Users and Partners are strictly prohibited from using this platform for any illegal activities, including but not limited to money laundering, fraud, or financing of prohibited activities. RupeSafe reserves the right to terminate access and report suspicious activities to relevant financial authorities immediately."
        },
        {
            title: "3. Terms for General Users",
            icon: UserCheck,
            color: "emerald",
            content: "General users agree that the data provided (including Aadhaar, PAN, and Bank details) is authentic. You authorize RupeSafe to share this data with authorized financial partners for the sole purpose of enabling payment services."
        },
        {
            title: "4. Terms for Payment Gateway Partners",
            icon: Briefcase,
            color: "violet",
            content: "Partners agree to strict data security protocols. You must maintain compliance with PCI DSS and all relevant local financial regulations. Any breach of security must be reported to RupeSafe within 2 hours. Partners are liable for any financial discrepancies occurring on their integrated gateways."
        },
        {
            title: "5. Limitation of Liability",
            icon: ShieldAlert,
            color: "red",
            content: "RupeSafe is a technology facilitator. We shall not be held liable for losses arising from downtime of third-party payment gateways, bank failures, or user-side security breaches. Our maximum liability in any event is limited to the transaction fees collected by RupeSafe."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-28 px-6 font-sans">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6 font-black text-red-600 uppercase tracking-widest text-xs">
                        <Gavel className="h-4 w-4" />
                        Legal Framework
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">
                        Terms & <span className="text-indigo-600">Conditions</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
                        Strict legal guidelines for users and partners to ensure secure financial operations.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {sections.map((section, i) => {
                        const Icon = section.icon;
                        return (
                            <motion.section
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-100 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-${section.color}-50 text-${section.color}-600`}>
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">{section.title}</h2>
                                        <p className="text-slate-600 leading-relaxed font-medium text-lg">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.section>
                        );
                    })}
                </div>

                <div className="mt-20 p-12 bg-indigo-900 rounded-[3rem] text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Need Legal Clarification?</h3>
                    <p className="text-indigo-100 font-medium mb-8 max-w-lg mx-auto">
                        Contact our legal department for specific inquiries regarding partner agreements or data usage.
                    </p>
                    <button className="px-10 py-5 bg-white text-indigo-900 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-sm shadow-xl shadow-black/20">
                        Contact Legal Support
                    </button>
                    <p className="mt-8 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                        Last Updated: February 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
