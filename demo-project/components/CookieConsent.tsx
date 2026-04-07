'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const consent = localStorage.getItem('cookie-consent-v3');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    if (!mounted) return null;

    const handleAccept = () => {
        localStorage.setItem('cookie-consent-v3', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent-v3', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    exit={{ y: 150 }}
                    className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-slate-300 shadow-[0_-10px_60px_rgba(0,0,0,0.1)]"
                >
                    <div className="max-w-7xl mx-auto px-6 py-6 lg:py-5">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex-1">
                                <p className="text-slate-600 text-[13px] leading-relaxed font-medium">
                                    <span className="font-bold text-slate-900 mr-2 uppercase tracking-widest text-xs">Privacy Transparency</span>
                                    We and our partners use cookies to enhance your experience, ensure transaction security, and analyze site traffic.
                                    By clicking "Accept All Cookies", you consent to our use of cookies as described in our
                                    <Link href="/privacy" className="text-slate-900 underline font-bold px-1">Privacy Policy</Link> and
                                    <Link href="/terms" className="text-slate-900 underline font-bold px-1">Terms of Service</Link>.
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-3 whitespace-nowrap">
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="h-11 px-6 rounded-xl bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors text-[11px] font-black uppercase tracking-widest"
                                >
                                    Preferences
                                </button>
                                <Button
                                    variant="outline"
                                    onClick={handleDecline}
                                    className="h-11 px-6 rounded-xl border-red-300 text-red-700 hover:bg-red-50 font-bold text-[11px] uppercase tracking-widest transition-all"
                                >
                                    Decline
                                </Button>
                                <Button
                                    onClick={handleAccept}
                                    className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] uppercase tracking-widest shadow-xl shadow-black/10 transition-all"
                                >
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
