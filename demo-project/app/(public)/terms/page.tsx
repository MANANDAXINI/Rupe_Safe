'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, Gavel, UserCheck, Briefcase, FileText } from 'lucide-react';

export default function TermsAndConditions() {
    const sections = [
        {
            title: "1. Common Terms for All Users",
            icon: FileText,
            content: "By accessing Rupexa Private Limited, you agree to be bound by these legal terms. Rupexa Private Limited acts as an intermediary technology provider. We do not hold funds but facilitate the collection of KYC and financial data to be processed by our regulated payment gateway partners."
        },
        {
            title: "2. Financial Responsibility & Compliance",
            icon: Scale,
            content: "Users and Partners are strictly prohibited from using this platform for any illegal activities, including but not limited to money laundering, fraud, or financing of prohibited activities. Rupexa Private Limited reserves the right to terminate access and report suspicious activities to relevant financial authorities immediately."
        },
        {
            title: "3. Terms for General Users",
            icon: UserCheck,
            content: "General users agree that the data provided (including Aadhaar, PAN, and Bank details) is authentic. You authorize Rupexa Private Limited to share this data with authorized financial partners for the sole purpose of enabling payment services."
        },
        {
            title: "4. Terms for Payment Gateway Partners",
            icon: Briefcase,
            content: "Partners agree to strict data security protocols. You must maintain compliance with PCI DSS and all relevant local financial regulations. Any breach of security must be reported to Rupexa Private Limited within 2 hours. Partners are liable for any financial discrepancies occurring on their integrated gateways."
        },
        {
            title: "5. Limitation of Liability",
            icon: ShieldAlert,
            content: "Rupexa Private Limited is a technology facilitator. We shall not be held liable for losses arising from downtime of third-party payment gateways, bank failures, or user-side security breaches. Our maximum liability in any event is limited to the transaction fees collected by Rupexa Private Limited."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-24 md:py-28 px-4 sm:px-6 font-sans">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 md:mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6 font-black text-red-600 uppercase tracking-widest text-xs">
                        <Gavel className="h-4 w-4" />
                        Legal Framework
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Terms & <span className="text-indigo-600">Conditions</span>
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg font-medium max-w-3xl mx-auto leading-relaxed">
                        Strict legal guidelines for users and partners to ensure secure financial operations with Rupexa Private Limited.
                    </p>
                </motion.div>

                <div className="space-y-6 md:space-y-7">
                    {sections.map((section, i) => {
                        const Icon = section.icon;
                        return (
                            <motion.section
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-md shadow-slate-200/50 hover:border-indigo-100 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-3 tracking-tight">{section.title}</h2>
                                        <p className="text-slate-600 leading-8 font-normal text-base md:text-lg">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.section>
                        );
                    })}
                </div>

                <div className="mt-16 p-8 md:p-12 bg-indigo-900 rounded-3xl text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Legal Clarification?</h3>
                    <p className="text-indigo-100 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
                        Contact our legal department for specific inquiries regarding partner agreements or data usage.<br />
                        <b>Contact:</b> +91 9067488273, care@rupexa.in, info@rupexa.in<br />
                        <b>Address:</b> Block No.101/102, Shriram Tower Next To NIT Kingsway Civil Lines, Sadar, Nagpur, Maharashtra 440001
                    </p>
                    <button className="px-8 py-4 bg-white text-indigo-900 font-semibold rounded-2xl hover:bg-slate-50 transition-all text-sm shadow-xl shadow-black/20">
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
