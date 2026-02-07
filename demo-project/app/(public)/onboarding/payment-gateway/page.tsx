'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, User, Building2, FileCheck, Landmark, ShieldCheck, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        name: '', // Full Name
        companyName: '',
        contact: '',
        industryType: '',
        businessNature: '',
        websiteLink: '',
        acceptOn: 'Website',
        pan: '',
        termsAccepted: false,
        partnerTermsAccepted: false,
    });

    const handleNext = () => {
        if (currentStep === 'basic') {
            const mobileRegex = /^[6-9]\d{9}$/;
            if (!mobileRegex.test(formData.contact)) {
                toast.error('Please enter a valid 10-digit mobile number starting with 6-9.');
                return;
            }
            if (!formData.name || !formData.companyName) {
                toast.error('Please fill in your name and company details.');
                return;
            }
            setCurrentStep('business');
        }
        else if (currentStep === 'business') {
            const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
            if (!panRegex.test(formData.pan)) {
                toast.error('Please enter a valid PAN number (e.g., ABCDE1234F).');
                return;
            }
            if (!formData.industryType || !formData.businessNature) {
                toast.error('Please select industry and business nature.');
                return;
            }
            setCurrentStep('kyc');
        }
    };

    const handleBack = () => {
        if (currentStep === 'business') setCurrentStep('basic');
        else if (currentStep === 'kyc') setCurrentStep('business');
    };

    const goToStep = (step: Step) => {
        // Only allow going to 'basic', 'business', or 'kyc' if not on success
        if (currentStep === 'success') return;
        setCurrentStep(step);
    };

    const handleComplete = async () => {
        if (!formData.termsAccepted || !formData.partnerTermsAccepted) {
            toast.error('Please accept all terms and conditions to proceed.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/kyc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.name,
                    companyName: formData.companyName,
                    contact: formData.contact,
                    websiteLink: formData.websiteLink,
                    industryType: formData.industryType,
                    businessNature: formData.businessNature,
                    panNumber: formData.pan,
                    acceptOn: formData.acceptOn
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Submission failed');
            }

            setCurrentStep('success');
            toast.success('Onboarding details received!');
        } catch (error: any) {
            console.error('Submission error:', error);
            toast.error(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateFormData = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            updateFormData(field, e.target.files[0]);
        }
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
                                <button
                                    key={step.id}
                                    onClick={() => goToStep(step.id as Step)}
                                    disabled={currentStep === 'success'}
                                    className={cn(
                                        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 text-left",
                                        isActive ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100" : "text-slate-400 hover:bg-slate-50"
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
                                </button>
                            );
                        })}
                    </nav>

                    <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Protocol</span>
                        </div>
                        <p className="text-[10px] leading-relaxed text-slate-400 font-bold uppercase tracking-tight">
                            All data is encrypted with AES-256 and transmitted directly to our financial settlement partners through an isolated vault.
                        </p>
                    </div>
                    <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Protocol</span>
                        </div>
                        <p className="text-[10px] leading-relaxed text-slate-400 font-bold uppercase tracking-tight">
                            Your data will be shared with our financial settlement partners who will contact you via email for setup.
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100">
                    {currentStep === 'basic' ? (
                        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors py-2 px-1 group">
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-semibold">Exit Onboarding</span>
                        </Link>
                    ) : (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors py-2 px-1 group"
                        >
                            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-semibold uppercase tracking-widest text-[10px]">Back to Previous</span>
                        </button>
                    )}
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
                                                placeholder="Enter 10 digit mobile"
                                                maxLength={10}
                                                className="bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus-visible:ring-indigo-600 focus-visible:bg-white transition-all placeholder:text-slate-300 font-semibold text-slate-700"
                                                value={formData.contact}
                                                onChange={(e) => updateFormData('contact', e.target.value.replace(/\D/g, ''))}
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Full Name</Label>
                                                <Input
                                                    placeholder="As per legal documents"
                                                    className="bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus-visible:ring-indigo-600 focus-visible:bg-white transition-all placeholder:text-slate-300 font-semibold text-slate-700"
                                                    value={formData.name}
                                                    onChange={(e) => updateFormData('name', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Company Name</Label>
                                                <Input
                                                    placeholder="Legal Entity Name"
                                                    className="bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus-visible:ring-indigo-600 focus-visible:bg-white transition-all placeholder:text-slate-300 font-semibold text-slate-700"
                                                    value={formData.companyName}
                                                    onChange={(e) => updateFormData('companyName', e.target.value)}
                                                />
                                            </div>
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

                                    <div className="p-12 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Industry Type</Label>
                                                <select
                                                    className="w-full bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all appearance-none cursor-pointer font-semibold text-slate-700"
                                                    value={formData.industryType}
                                                    onChange={(e) => updateFormData('industryType', e.target.value)}
                                                >
                                                    <option value="">Select Industry</option>
                                                    <option value="E-commerce">E-commerce</option>
                                                    <option value="SaaS">SaaS</option>
                                                    <option value="EdTech">EdTech</option>
                                                    <option value="FinTech">FinTech</option>
                                                    <option value="Healthcare">Healthcare</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest pl-1">Nature of Business</Label>
                                                <Input
                                                    placeholder="e.g. Retail, Consulting"
                                                    className="bg-slate-50 border-slate-100 h-16 rounded-2xl px-6 text-xl focus-visible:ring-indigo-600 focus-visible:bg-white transition-all placeholder:text-slate-300 font-semibold text-slate-700"
                                                    value={formData.businessNature}
                                                    onChange={(e) => updateFormData('businessNature', e.target.value)}
                                                />
                                            </div>
                                        </div>

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

                                        <div className="flex gap-4 mt-4">
                                            <Button
                                                variant="outline"
                                                className="flex-1 h-16 text-lg font-bold border-slate-200 text-slate-400 hover:bg-slate-50 rounded-2xl transition-all"
                                                onClick={handleBack}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                className="flex-[2] h-16 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                                onClick={handleNext}
                                            >
                                                Save & Continue
                                                <ChevronRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>
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
                                        <p className="text-slate-500 text-lg font-medium text-center lg:text-left font-black animate-pulse">AI-POWERED DOCUMENT VERIFICATION ACTIVE</p>
                                    </div>

                                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 pointer-events-none" />

                                        <div className="text-center mb-10">
                                            <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-3 shadow-lg shadow-emerald-100">
                                                <ShieldCheck className="h-10 w-10 text-emerald-600" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Review & Confirm</h3>
                                            <p className="text-slate-400 font-bold text-[10px] mt-2 uppercase tracking-widest">Double check your details before submission</p>
                                        </div>

                                        <div className="space-y-4 mb-10">
                                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                                <div className="flex justify-between items-center border-b border-white pb-3">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business</span>
                                                    <span className="text-sm font-bold text-slate-700">{formData.companyName}</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-white pb-3">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry</span>
                                                    <span className="text-sm font-bold text-slate-700">{formData.industryType}</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-white pb-3">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PAN Card</span>
                                                    <span className="text-sm font-bold text-slate-700 font-mono tracking-widest">{formData.pan}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nature</span>
                                                    <span className="text-sm font-bold text-slate-700">{formData.businessNature}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-10 border-t pt-8">
                                            <div className="flex items-start gap-4">
                                                <input
                                                    type="checkbox"
                                                    id="user-terms"
                                                    checked={formData.termsAccepted}
                                                    onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
                                                    className="mt-1 w-5 h-5 rounded border-slate-200 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                                />
                                                <Label htmlFor="user-terms" className="text-xs text-slate-500 font-bold leading-relaxed cursor-pointer">
                                                    I agree to the <Link href="/terms" className="text-indigo-600 underline">User Terms & Conditions</Link> for data collection and processing.
                                                </Label>
                                            </div>

                                            <div className="flex items-start gap-4">
                                                <input
                                                    type="checkbox"
                                                    id="partner-terms"
                                                    checked={formData.partnerTermsAccepted}
                                                    onChange={(e) => updateFormData('partnerTermsAccepted', e.target.checked)}
                                                    className="mt-1 w-5 h-5 rounded border-slate-200 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                                />
                                                <Label htmlFor="partner-terms" className="text-xs text-slate-500 font-bold leading-relaxed cursor-pointer">
                                                    I understand that settlement companies will contact me via email for further verification.
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button
                                                variant="outline"
                                                className="h-20 text-xl font-black border-slate-200 text-slate-400 hover:bg-slate-50 rounded-3xl transition-all uppercase tracking-widest w-1/3"
                                                onClick={handleBack}
                                                disabled={isSubmitting}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                className="flex-1 h-20 text-xl font-black bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-600/40 rounded-3xl transition-all disabled:opacity-70 uppercase tracking-widest"
                                                onClick={handleComplete}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin mb-1" />
                                                        <span className="text-[10px] font-black">AI VERIFICATION IN PROGRESS</span>
                                                    </div>
                                                ) : (
                                                    <>Submit for Verification <ArrowRight className="ml-2 h-6 w-6" /></>
                                                )}
                                            </Button>
                                        </div>
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

                                    <div className="space-y-6">
                                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Application Forwarded!</h1>
                                        <div className="space-y-4 max-w-lg mx-auto">
                                            <p className="text-slate-600 text-xl font-bold leading-relaxed underline decoration-indigo-200 underline-offset-8">
                                                YOUR DATA HAS BEEN SECURELY SENT TO OUR PARTNERS.
                                            </p>
                                            <p className="text-slate-400 text-sm font-medium leading-relaxed uppercase tracking-widest">
                                                Our settlement companies will now review your profile. Please keep a close watch on your <span className="text-indigo-600 font-black">Email Inbox</span> for further setup instructions and contact.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-8 flex flex-col items-center gap-6">
                                        <Button asChild className="h-16 px-16 text-lg font-black bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-2xl transition-all uppercase tracking-widest hover:scale-105 active:scale-95">
                                            <Link href="/">Return to Dashboard</Link>
                                        </Button>
                                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3">
                                            <ShieldCheck className="w-5 h-5 text-amber-500" />
                                            <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">No further action is required on this portal.</span>
                                        </div>
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
