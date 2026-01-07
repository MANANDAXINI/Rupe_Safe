'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, User, Building2, FileCheck, Landmark, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Step = 'basic' | 'business' | 'kyc' | 'success';

const steps = [
    { id: 'basic', title: 'Basic details', icon: User },
    { id: 'business', title: 'Business details', icon: Building2 },
    { id: 'kyc', title: 'KYC details', icon: FileCheck },
];

export default function PaymentGatewayOnboarding() {
    const [currentStep, setCurrentStep] = useState<Step>('basic');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        acceptOn: 'Website',
        websiteLink: '',
        pan: '',
    });

    const handleNext = () => {
        if (currentStep === 'basic') setCurrentStep('business');
        else if (currentStep === 'business') setCurrentStep('kyc');
    };

    const handleComplete = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setCurrentStep('success');
        }, 2000);
    };

    const updateFormData = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-indigo-100 selection:text-indigo-900 focus:outline-none">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-slate-200 p-8 flex flex-col hidden lg:flex">
                <div className="mb-12">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                            <Landmark className="text-white h-6 w-6" />
                        </div>
                        <span className="font-bold text-2xl text-slate-900 tracking-tight">RupeSafe</span>
                    </Link>
                </div>

                <div className="flex-1">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
                        Onboarding Flow
                    </h2>
                    <nav className="space-y-3">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = steps.findIndex(s => s.id === (currentStep === 'success' ? 'kyc' : currentStep)) > index || currentStep === 'success';

                            return (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "flex items-center gap-4 p-4 rounded-2xl transition-all duration-500",
                                        isActive ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100" : "text-slate-400"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm",
                                        isActive ? "bg-indigo-600 text-white" : isCompleted ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-400"
                                    )}>
                                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Step {index + 1}</span>
                                        <span className={cn("font-bold text-sm", isActive ? "text-indigo-900" : "text-slate-500")}>{step.title}</span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-step"
                                            className="ml-auto w-1.5 h-6 bg-indigo-600 rounded-full"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors py-2 px-1 group">
                        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-semibold">Exit Onboarding</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                {/* Decorative background gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -mr-64 -mt-64 opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-50 rounded-full blur-[100px] -ml-48 -mb-48 opacity-50 pointer-events-none" />

                <div className="h-full overflow-y-auto px-6 py-12 lg:p-20">
                    <div className="max-w-2xl mx-auto">
                        <AnimatePresence mode="wait">
                            {currentStep === 'basic' && (
                                <motion.div
                                    key="basic-step"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-10"
                                >
                                    <div>
                                        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight uppercase">
                                            Let's start with <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Company Basics</span>
                                        </h1>
                                        <p className="text-slate-500 text-lg font-medium">Please provide your official contact information.</p>
                                    </div>

                                    <div className="grid gap-8 p-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                                        <div className="space-y-2">
                                            <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Mobile Number</Label>
                                            <Input
                                                placeholder="+91 00000 00000"
                                                className="bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus-visible:ring-indigo-600 focus-visible:bg-white transition-all placeholder:text-slate-300 font-semibold text-slate-700"
                                                value={formData.contact}
                                                onChange={(e) => updateFormData('contact', e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Full Name</Label>
                                            <Input
                                                placeholder="As per legal documents"
                                                className="bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus-visible:ring-indigo-600 focus-visible:bg-white transition-all placeholder:text-slate-300 font-semibold text-slate-700"
                                                value={formData.name}
                                                onChange={(e) => updateFormData('name', e.target.value)}
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Accept Payments On</Label>
                                                <select
                                                    className="w-full bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all appearance-none cursor-pointer font-semibold text-slate-700"
                                                    value={formData.acceptOn}
                                                    onChange={(e) => updateFormData('acceptOn', e.target.value)}
                                                >
                                                    <option value="Website">Website</option>
                                                    <option value="App">App</option>
                                                    <option value="Social Media">Social Media</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Business Website</Label>
                                                <Input
                                                    placeholder="https://yourstore.com"
                                                    className="bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus-visible:ring-indigo-600 focus-visible:bg-white transition-all placeholder:text-slate-300 font-semibold text-slate-700"
                                                    value={formData.websiteLink}
                                                    onChange={(e) => updateFormData('websiteLink', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full h-16 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 rounded-2xl mt-4 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                            onClick={handleNext}
                                        >
                                            Save & Continue
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 'business' && (
                                <motion.div
                                    key="business-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-10"
                                >
                                    <div>
                                        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight uppercase">
                                            Identity <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Verification</span>
                                        </h1>
                                        <p className="text-slate-500 text-lg font-medium">We require your Personal PAN for business registration.</p>
                                    </div>

                                    <div className="p-12 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <Label className="text-slate-700 text-lg font-bold">Personal PAN Card</Label>
                                                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                                                    Required
                                                </div>
                                            </div>
                                            <Input
                                                placeholder="ABCD E 1234 F"
                                                className="h-20 text-3xl font-mono border-2 border-slate-100 bg-slate-50 rounded-[1.5rem] focus-visible:ring-indigo-600 focus-visible:bg-white transition-all uppercase tracking-[0.3em] text-center placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-200 text-slate-800"
                                                maxLength={10}
                                                value={formData.pan}
                                                onChange={(e) => updateFormData('pan', e.target.value.toUpperCase())}
                                            />
                                            <p className="text-xs text-slate-400 text-center font-medium">
                                                By continuing, you agree to our identity verification terms.
                                            </p>
                                        </div>

                                        <Button
                                            className="w-full h-16 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 rounded-2xl mt-12 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                            onClick={handleNext}
                                        >
                                            Verify PAN Details
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 'kyc' && (
                                <motion.div
                                    key="kyc-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-10"
                                >
                                    <div>
                                        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight text-center lg:text-left uppercase">
                                            Final <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Milestone</span>
                                        </h1>
                                        <p className="text-slate-500 text-lg font-medium text-center lg:text-left">You're seconds away from going live with RupeSafe.</p>
                                    </div>

                                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

                                        <div className="text-center mb-10">
                                            <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-3 shadow-lg shadow-indigo-100">
                                                <ShieldCheck className="h-10 w-10 text-indigo-600" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900">Documents Checklist</h3>
                                        </div>

                                        <div className="space-y-4 mb-10">
                                            {[
                                                { title: 'Aadhaar Card', desc: 'Front and back photos required' },
                                                { title: 'Bank Passbook', desc: 'Or cancelled cheque for payout activation' },
                                                { title: 'Business Proof', desc: 'GST/Trade License or any valid proof' }
                                            ].map((doc, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-indigo-50 hover:border-indigo-100 transition-all">
                                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                        <FileCheck className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 text-sm">{doc.title}</h4>
                                                        <p className="text-xs text-slate-500 font-medium">{doc.desc}</p>
                                                    </div>
                                                    <div className="ml-auto w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                                                        <div className="w-2 h-2 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            className="w-full h-16 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 rounded-2xl transition-all disabled:opacity-70"
                                            onClick={handleComplete}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Processing...
                                                </div>
                                            ) : (
                                                <>Start KYC Process <ArrowRight className="ml-2 h-5 w-5" /></>
                                            )}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 'success' && (
                                <motion.div
                                    key="success-step"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-8 py-10"
                                >
                                    <div className="relative inline-block">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                                            className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200"
                                        >
                                            <ShieldCheck className="h-16 w-16 text-white" />
                                        </motion.div>
                                        <div className="absolute top-0 left-0 w-full h-full -z-10 animate-ping bg-emerald-400/20 rounded-full" />
                                    </div>

                                    <div className="space-y-4">
                                        <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase">Application Submitted!</h1>
                                        <p className="text-slate-600 text-xl font-medium max-w-lg mx-auto leading-relaxed">
                                            Your KYC request has been successfully queued. Our team will verify and activate your account within 24-48 hours.
                                        </p>
                                    </div>

                                    <div className="pt-8">
                                        <Button asChild className="h-16 px-12 text-lg font-bold bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-xl transition-all">
                                            <Link href="/">Back to Dashboard</Link>
                                        </Button>
                                    </div>

                                    <div className="pt-12 text-slate-400 font-bold text-sm uppercase tracking-widest">
                                        Thank you for choosing RupeSafe
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
