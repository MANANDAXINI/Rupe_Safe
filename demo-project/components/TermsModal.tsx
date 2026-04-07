'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [checks, setChecks] = useState({ terms: false, partner: false });

    useEffect(() => {
        setMounted(true);
        const hasAccepted = localStorage.getItem('terms-popup-v4');
        if (!hasAccepted) {
            setIsOpen(true);
        }
    }, []);

    const handleAccept = () => {
        if (checks.terms && checks.partner) {
            localStorage.setItem('terms-popup-v4', 'true');
            setIsOpen(false);
        }
    };

    if (!mounted) return null;

    const sections = [
        {
            title: "Operational Intermediary",
            icon: FileText,
            content: "We facilitate data transmission to regulated payment gateway partners. Rupexa Private Limited does not hold or manage user funds directly."
        },
        {
            title: "Data Authorization",
            icon: Scale,
            content: "You authorize the collection and sharing of your financial identifiers (PAN/Aadhaar) with our settlement partners for KYC purposes."
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.98, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0, y: 15 }}
                        className="relative w-full max-w-xl bg-white shadow-[0_50px_120px_-20px_rgba(0,0,0,0.5)] border border-slate-200 rounded-3xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-10 py-10 flex items-start justify-between border-b border-slate-100">
                            <div>
                                <h2 className="text-2xl font-bold text-blue-600 tracking-tight mb-2">Terms of Operation</h2>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Operational Terms v2.1</span>
                                </div>
                            </div>
                            <button onClick={() => checks.terms && checks.partner && setIsOpen(false)} className="p-2 text-slate-300 hover:text-slate-900 transition-colors disabled:opacity-0" disabled={!checks.terms || !checks.partner}>
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-10 py-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-8 mb-10">
                                {sections.map((section, i) => {
                                    const Icon = section.icon;
                                    return (
                                        <div key={i} className="flex gap-6">
                                            <Icon className="h-5 w-5 text-slate-300 shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-blue-600 text-[10px] uppercase tracking-widest mb-2">{section.title}</h4>
                                                <p className="text-slate-500 text-[13px] leading-relaxed">
                                                    {section.content}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-slate-100">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={checks.terms}
                                        onChange={(e) => setChecks({ ...checks, terms: e.target.checked })}
                                        className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                                    />
                                    <span className="text-[12px] text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                                        I accept the general terms for data collection and intermediary processing.
                                    </span>
                                </label>
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={checks.partner}
                                        onChange={(e) => setChecks({ ...checks, partner: e.target.checked })}
                                        className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                                    />
                                    <span className="text-[12px] text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                                        I acknowledge the high-volume transaction protocols for payment gateway partners.
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                            <button
                                onClick={() => checks.terms && checks.partner && setIsOpen(false)}
                                className="h-12 min-w-[140px] px-5 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
                                disabled={!checks.terms || !checks.partner}
                            >
                                Review Later
                            </button>
                            <Button
                                onClick={handleAccept}
                                disabled={!checks.terms || !checks.partner}
                                className="h-12 min-w-[140px] px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-[10px] transition-all disabled:opacity-20 shadow-xl shadow-black/10"
                            >
                                Accept
                            </Button>
                            <Button
                                onClick={handleAccept}
                                disabled={!checks.terms || !checks.partner}
                                className="h-12 min-w-[140px] px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-[10px] transition-all disabled:opacity-20"
                            >
                                Continue
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
