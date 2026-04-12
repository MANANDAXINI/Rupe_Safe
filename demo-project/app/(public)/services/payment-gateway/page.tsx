"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    CreditCard, Shield, Zap, Globe, CheckCircle2, ArrowRight,
    Lock, Smartphone, BarChart3, RefreshCw, Users, DollarSign,
    Wallet, TrendingUp, Bell, FileText, Settings, ChevronRight
} from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function PaymentGatewayPage() {
    const features = [
        {
            icon: Shield,
            title: "Bank-Grade Security",
            description: "PCI DSS Level 1 compliant with 256-bit SSL encryption. Your transactions are protected by industry-leading security protocols."
        },
        {
            icon: Zap,
            title: "Instant Settlements",
            description: "Get your money faster with instant settlement options. No more waiting days for your payments to clear."
        },
        {
            icon: Globe,
            title: "100+ Payment Methods",
            description: "Accept credit cards, debit cards, UPI, net banking, wallets, and international payment methods seamlessly."
        },
        {
            icon: Smartphone,
            title: "Mobile-First Design",
            description: "Optimized checkout experience for mobile devices with one-tap payments and digital wallet integration."
        },
        {
            icon: BarChart3,
            title: "Real-Time Analytics",
            description: "Comprehensive dashboard with real-time transaction insights, revenue tracking, and detailed reports."
        },
        {
            icon: RefreshCw,
            title: "Automated Refunds",
            description: "Seamless refund processing with automated workflows. Handle refunds instantly with just a click."
        }
    ];

    const integrationSteps = [
        {
            step: "01",
            title: "Sign Up & Get API Keys",
            description: "Create your account in minutes and get instant access to your API credentials. No lengthy approval process.",
            icon: Users
        },
        {
            step: "02",
            title: "Integrate Payment APIs",
            description: "Use our developer-friendly SDKs and comprehensive documentation to integrate in hours, not weeks.",
            icon: Settings
        },
        {
            step: "03",
            title: "Test in Sandbox",
            description: "Test all payment flows in our sandbox environment with realistic test scenarios before going live.",
            icon: FileText
        },
        {
            step: "04",
            title: "Go Live & Accept Payments",
            description: "Launch your payment gateway and start accepting payments from customers worldwide instantly.",
            icon: Zap
        }
    ];

    const pricingPlans = [
        {
            name: "Starter",
            price: "1.99%",
            description: "Perfect for startups and small businesses",
            features: [
                "All payment methods",
                "Instant settlements",
                "Basic analytics",
                "Email support",
                "Standard security"
            ],
            highlight: false
        },
        {
            name: "Business",
            price: "1.49%",
            description: "For growing businesses with higher volumes",
            features: [
                "Everything in Starter",
                "Priority settlements",
                "Advanced analytics",
                "24/7 phone support",
                "Fraud detection",
                "Custom branding"
            ],
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Tailored solutions for large enterprises",
            features: [
                "Everything in Business",
                "Dedicated account manager",
                "Custom integrations",
                "White-label solution",
                "SLA guarantees",
                "Volume discounts"
            ],
            highlight: false
        }
    ];

    const paymentMethods = [
        { name: "Credit Cards", icon: CreditCard },
        { name: "Debit Cards", icon: CreditCard },
        { name: "UPI", icon: Smartphone },
        { name: "Net Banking", icon: DollarSign },
        { name: "Wallets", icon: Wallet },
        { name: "International", icon: Globe }
    ];

    const stats = [
        { value: "99.9%", label: "Uptime" },
        { value: "₹500Cr+", label: "Processed Monthly" },
        { value: "50K+", label: "Merchants" },
        { value: "<2s", label: "Avg. Response Time" }
    ];

    return (
        <main className="min-h-screen bg-white font-sans selection:bg-blue-100">

            {/* 1. Hero Section with Background Image */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop"
                        alt="Payment Gateway"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/90"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="text-center"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-semibold text-white">Trusted by 50,000+ Merchants</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto">
                            Accept Payments <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                                Faster, Safer, Smarter
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-white max-w-3xl mx-auto mb-10 leading-relaxed">
                            India's most advanced payment gateway. Accept payments from customers worldwide with instant settlements,
                            bank-grade security, and seamless integration.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/onboarding/payment-gateway" className="px-7 py-3.5 text-sm bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-1 text-center">
                                Start Onboarding Now
                            </Link>
                            <Link href="#pricing" className="px-7 py-3.5 text-sm bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all">
                                View Pricing
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-sm text-white font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Hero Image - Removed as background is now the image */}
                </div>
            </section>

            {/* 2. Payment Methods Section */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                        Accept All Major Payment Methods
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
                        {paymentMethods.map((method, index) => (
                            <div key={index} className="flex flex-col items-center gap-3 group cursor-pointer">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <method.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{method.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Features Grid */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Why Choose Our Payment Gateway?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Built for modern businesses with features that help you grow faster and serve customers better.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Integration Process */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Get Started in <span className="text-blue-600">4 Simple Steps</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Integration made simple. Go live in hours with our developer-friendly APIs and comprehensive documentation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {integrationSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Connector Line */}
                                {index < integrationSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent -ml-4" />
                                )}

                                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 group">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {step.step}
                                    </div>

                                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                        <step.icon className="w-7 h-7 text-blue-600" />
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/onboarding/payment-gateway" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                            Go to Onboarding Flow <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Pricing Section */}
            <section id="pricing" className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            No hidden fees. No setup costs. Pay only for successful transactions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${plan.highlight
                                    ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-105'
                                    : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                    <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
                                    <div className="mb-2">
                                        <span className="text-5xl font-bold text-blue-600">{plan.price}</span>
                                        {plan.price !== "Custom" && <span className="text-slate-600 ml-2">per transaction</span>}
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/onboarding/payment-gateway"
                                    className={`block w-full py-3 rounded-full font-bold text-center transition-all ${plan.highlight
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25'
                                        : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Get Started
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CTA Section */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Transform Your Payment Experience?
                            </h2>
                            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                                Join thousands of businesses already using our payment gateway. Start accepting payments in minutes.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/onboarding/payment-gateway" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
                                    Start Free Trial <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                                    Talk to Sales
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
