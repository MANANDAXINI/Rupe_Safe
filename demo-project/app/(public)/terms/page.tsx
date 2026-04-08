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
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20 md:py-24 px-4 sm:px-6 font-sans">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 font-bold text-blue-700 uppercase tracking-wider text-xs">
                        <Gavel className="h-4 w-4" />
                        Legal & Compliance
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Terms & <span className="text-blue-600">Conditions</span>
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                        Please review our operational and compliance terms carefully to ensure secure and transparent usage of Rupexa services.
                    </p>
                </motion.div>

                <div className="grid gap-5 md:gap-6">
                    {sections.map((section, i) => {
                        const Icon = section.icon;
                        return (
                            <motion.section
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                                        <Icon className="h-6 w-6 md:h-7 md:w-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2 tracking-tight">{section.title}</h2>
                                        <p className="text-slate-600 leading-7 md:leading-8 text-base md:text-lg">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.section>
                        );
                    })}
                </div>

                <div className="mt-12 md:mt-14 p-8 md:p-10 bg-blue-600 rounded-2xl md:rounded-3xl text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4">Need Legal Clarification?</h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Contact our legal department for specific inquiries regarding partner agreements or data usage.<br />
                        <b>Contact:</b> +91 9067488273, care@rupexa.in, info@rupexa.in<br />
                        <b>Address:</b> Block No.101/102, Shriram Tower Next To NIT Kingsway Civil Lines, Sadar, Nagpur, Maharashtra 440001
                    </p>
                    <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm shadow-lg">
                        Contact Legal Support
                    </button>
                    <p className="mt-8 text-blue-200 text-xs font-semibold uppercase tracking-wider">
                        Last Updated: February 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
