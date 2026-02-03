'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code, Smartphone, TrendingUp, Database, Boxes, CheckCircle, Star, Zap, Shield, Users, Lightbulb, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Counter {
  label: string;
  value: number;
  suffix: string;
}

interface Review {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface Capability {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

export default function Home() {
  const [counters, setCounters] = useState<Counter[]>([
    { label: 'Projects Completed', value: 0, suffix: '+' },
    { label: 'Happy Clients', value: 0, suffix: '+' },
    { label: 'Years Experience', value: 0, suffix: '+' },
    { label: 'Client Satisfaction', value: 0, suffix: '%' }
  ]);

  const reviews: Review[] = [
    {
      name: 'John Smith',
      role: 'CEO, Tech Corp',
      content: 'RupeSafe transformed our business with innovative solutions. Highly recommended!',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO, Innovation Labs',
      content: 'The team is professional, responsive, and delivers exceptional results on time.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Founder, StartupX',
      content: 'Best technology partner we could ask for. They truly understand our vision.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Director, Global Solutions',
      content: 'Outstanding service and support throughout the entire project lifecycle.',
      rating: 5
    },
    {
      name: 'James Wilson',
      role: 'VP Operations, Enterprise Co',
      content: 'Their expertise in ERP systems is unmatched. Highly professional team.',
      rating: 5
    }
  ];

  const capabilities: Capability[] = [
    {
      icon: CheckCircle,
      title: 'Proven Expertise',
      description: 'Years of experience delivering enterprise-grade solutions across industries'
    },
    {
      icon: Zap,
      title: 'Fast Implementation',
      description: 'Quick deployment and integration with minimal disruption to your operations'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Industry-leading security standards and compliance certifications'
    },
    {
      icon: TrendingUp,
      title: 'Scalability',
      description: 'Solutions that grow with your business, from startups to enterprises'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Dedicated support team available round the clock for your peace of mind'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Cutting-edge technology and continuous updates to stay ahead'
    }
  ];

  useEffect(() => {
    const targets = [500, 250, 15, 98];
    const intervals = targets.map((target, index) => {
      return setInterval(() => {
        setCounters(prev => {
          const updated = [...prev];
          if (updated[index].value < target) {
            updated[index].value = Math.min(updated[index].value + Math.ceil(target / 50), target);
          }
          return updated;
        });
      }, 30);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  // Trusted partners: added more companies
  const TRUSTED = [
    { name: "Acme Corp", logo: "/logos/acme.svg" },
    { name: "Globex", logo: "/logos/globex.svg" },
    { name: "Initech", logo: "/logos/initech.svg" },
    { name: "Umbrella", logo: "/logos/umbrella.svg" },
    { name: "Stark Industries", logo: "/logos/stark.svg" },
    { name: "Wayne Enterprises", logo: "/logos/wayne.svg" },
    { name: "Hooli", logo: "/logos/hooli.svg" },
    { name: "Soylent", logo: "/logos/soylent.svg" },
    // add any additional logos you have under public/logos/
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background Moving Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/ebe6d5de-4b23-4dc0-a454-63b7a0d2dd7f.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full flex flex-col h-screen justify-between">
          <div className="flex-grow flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                Transform Your Business with <span className="text-blue-400">Intelligent</span> Technology Solutions
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-50 animate-fade-in-up animation-delay-200">
                RupeSafe is a technology solutions company that helps businesses build, grow, and scale in the digital world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 rounded-full shadow-lg hover:shadow-xl transition-all h-12">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 rounded-full transition-all duration-300 h-12">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* Trusted Partners - Now inside Hero */}
          <div className="animate-fade-in-up animation-delay-600 mb-4">
            <div className="text-center mb-4">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Trusted By Partners</h3>
            </div>
            <div className="overflow-hidden marquee-container-hero">
              <div className="flex gap-10 items-center animate-scroll-left w-max">
                {["Acme Corp", "Bluewave", "Cloudify", "DataForge", "InfraWorks", "Nimbus", "Stark Industries", "Wayne Ent", "Globex", "Initech", "Umbrella", "Hooli"].map((p, i) => (
                  <span key={i} className="mx-2 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm font-bold text-white/90 transition-all hover:bg-white/20 hover:border-blue-500/50 cursor-default">
                    {p}
                  </span>
                ))}
                {/* Duplicate for seamless loop */}
                {["Acme Corp", "Bluewave", "Cloudify", "DataForge", "InfraWorks", "Nimbus", "Stark Industries", "Wayne Ent", "Globex", "Initech", "Umbrella", "Hooli"].map((p, i) => (
                  <span key={"d" + i} className="mx-2 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm font-bold text-white/90 transition-all hover:bg-white/20 hover:border-blue-500/50 cursor-default">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Payment Gateway Hero Section - MAIN FOCUS */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 overflow-hidden z-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm font-semibold">Featured Service</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Accept Payments <br />
                <span className="text-blue-200">Faster & Safer</span>
              </h2>

              <p className="text-xl text-white mb-8 leading-relaxed">
                India's most advanced payment gateway with instant settlements, 100+ payment methods,
                and bank-grade security. Start accepting payments in minutes.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold mb-2">99.9%</div>
                  <div className="text-sm text-white">Uptime SLA</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold mb-2">₹500Cr+</div>
                  <div className="text-sm text-white">Monthly Volume</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold mb-2">50K+</div>
                  <div className="text-sm text-white">Active Merchants</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl font-bold mb-2">&lt;2s</div>
                  <div className="text-sm text-white">Response Time</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/onboarding/payment-gateway">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 w-full sm:w-auto">
                    Explore Payment Gateway
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/onboarding/payment-gateway">
                  <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 w-full sm:w-auto transition-all duration-300">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Features */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Bank-Grade Security</h3>
                    <p className="text-white text-sm">PCI DSS Level 1 compliant with 256-bit encryption</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Instant Settlements</h3>
                    <p className="text-white text-sm">Get your money in minutes, not days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">100+ Payment Methods</h3>
                    <p className="text-white text-sm">Cards, UPI, Wallets, Net Banking & more</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Easy Integration</h3>
                    <p className="text-white text-sm">Developer-friendly APIs and SDKs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Enhanced Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in website and app development, digital marketing, ERP systems, and custom software solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Payment Gateway Card - PRIMARY FOCUS */}
            <Card className="border-0 overflow-hidden h-96 hover:shadow-2xl transition-all duration-300 group hover:h-[450px] bg-white ring-2 ring-blue-500 ring-offset-4">
              <div className="relative h-full">
                <img
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop"
                  alt="Payment Gateway"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* "Featured" Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  ⭐ FEATURED
                </div>

                {/* Text Content - Bottom Quarter */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white h-1/4 flex flex-col justify-center bg-gradient-to-t from-black/80 to-transparent">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Payment Gateway</h3>
                </div>

                {/* Sliding Container - Covers 3/4 on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700 transform translate-y-full group-hover:translate-y-1/4 transition-transform duration-500 ease-out flex flex-col justify-center p-6 text-white">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Payment Gateway</h3>
                  <p className="mb-4 text-sm leading-relaxed">
                    Secure, fast, and reliable payment processing solutions. Accept payments seamlessly with industry-leading security standards.
                  </p>
                  <Link href="/onboarding/payment-gateway" className="text-white font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* Website Development Card */}
            <Card className="border-0 overflow-hidden h-96 hover:shadow-2xl transition-all duration-300 group hover:h-[450px] bg-white">
              <div className="relative h-full">
                <img
                  src="/Web-dev.png"
                  alt="Website Development"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* Text Content - Bottom Quarter */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white h-1/4 flex flex-col justify-center bg-gradient-to-t from-black/80 to-transparent">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Website Development</h3>
                </div>

                {/* Sliding Container - Covers 3/4 on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700 transform translate-y-full group-hover:translate-y-1/4 transition-transform duration-500 ease-out flex flex-col justify-center p-6 text-white">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Website Development</h3>
                  <p className="mb-4 text-sm leading-relaxed">
                    Build stunning, responsive websites that engage users and drive results with cutting-edge technology.
                  </p>
                  <Link href="/services" className="text-white font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* App Development Card */}
            <Card className="border-0 overflow-hidden h-96 hover:shadow-2xl transition-all duration-300 group hover:h-[450px] bg-white">
              <div className="relative h-full">
                <img
                  src="/App-dev.png"
                  alt="App Development"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white h-1/4 flex flex-col justify-center bg-gradient-to-t from-black/80 to-transparent">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">App Development</h3>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700 transform translate-y-full group-hover:translate-y-1/4 transition-transform duration-500 ease-out flex flex-col justify-center p-6 text-white">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">App Development</h3>
                  <p className="mb-4 text-sm leading-relaxed">
                    Create powerful mobile and web applications for iOS and Android platforms with seamless performance.
                  </p>
                  <Link href="/services" className="text-white font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* Digital Marketing Card */}
            <Card className="border-0 overflow-hidden h-96 hover:shadow-2xl transition-all duration-300 group hover:h-[450px] bg-white">
              <div className="relative h-full">
                <img
                  src="/digital-marketing.png"
                  alt="Digital Marketing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white h-1/4 flex flex-col justify-center bg-gradient-to-t from-black/80 to-transparent">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Digital Marketing</h3>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700 transform translate-y-full group-hover:translate-y-1/4 transition-transform duration-500 ease-out flex flex-col justify-center p-6 text-white">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Digital Marketing</h3>
                  <p className="mb-4 text-sm leading-relaxed">
                    Grow your online presence with strategic marketing solutions that drive engagement and conversions.
                  </p>
                  <Link href="/services" className="text-white font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* ERP Systems Card */}
            <Card className="border-0 overflow-hidden h-96 hover:shadow-2xl transition-all duration-300 group hover:h-[450px] bg-white">
              <div className="relative h-full">
                <img
                  src="/ERP-system.png"
                  alt="ERP Systems"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white h-1/4 flex flex-col justify-center bg-gradient-to-t from-black/80 to-transparent">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">ERP Systems</h3>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700 transform translate-y-full group-hover:translate-y-1/4 transition-transform duration-500 ease-out flex flex-col justify-center p-6 text-white">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">ERP Systems</h3>
                  <p className="mb-4 text-sm leading-relaxed">
                    Streamline operations with integrated enterprise resource planning solutions for your business.
                  </p>
                  <Link href="/services" className="text-white font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* Custom Software Card */}
            <Card className="border-0 overflow-hidden h-96 hover:shadow-2xl transition-all duration-300 group hover:h-[450px] bg-white">
              <div className="relative h-full">
                <img
                  src="/custom-software.png"
                  alt="Custom Software"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white h-1/4 flex flex-col justify-center bg-gradient-to-t from-black/80 to-transparent">
                  <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Boxes className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Custom Software</h3>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-700 transform translate-y-full group-hover:translate-y-1/4 transition-transform duration-500 ease-out flex flex-col justify-center p-6 text-white">
                  <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Boxes className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Custom Software</h3>
                  <p className="mb-4 text-sm leading-relaxed">
                    Tailored software solutions designed specifically for your unique business needs and challenges.
                  </p>
                  <Link href="/services" className="text-white font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Card>

            {/* CTA Card */}
            <Card className="border-0 overflow-hidden h-96 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center hover:shadow-2xl transition-all duration-300 group hover:h-[450px]">
              <div className="text-center text-white p-6">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="mb-6 text-blue-100">
                  Let&apos;s discuss how we can help transform your business
                </p>
                <Link href="/contact">
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section
        className="relative py-20 bg-gray-50 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Why Choose RupeSafe?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with business insight to deliver solutions that truly make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white group-hover:bg-blue-500 transition-colors">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Expert Team</h3>
                  <p className="text-gray-600">
                    Skilled professionals with years of industry experience in cutting-edge technologies.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white group-hover:bg-blue-500 transition-colors">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Proven Results</h3>
                  <p className="text-gray-600">
                    Track record of successful projects across industries with measurable ROI.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white group-hover:bg-blue-500 transition-colors">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">End-to-End Support</h3>
                  <p className="text-gray-600">
                    From concept to deployment and beyond with continuous support and maintenance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white group-hover:bg-blue-500 transition-colors">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Scalable Solutions</h3>
                  <p className="text-gray-600">
                    Technology that grows with your business and adapts to changing needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {counters.map((counter, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-600">
                    {counter.value}
                    <span className="text-blue-400">{counter.suffix}</span>
                  </div>
                  <div className="text-gray-500 text-sm font-medium">{counter.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-20 bg-white relative z-10 overflow-hidden">
        {/* Animated Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-5 w-96 h-96 bg-blue-300/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Core Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-gray-100 bg-white hover:border-blue-500 hover:shadow-2xl transition-all duration-300 group p-8 animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Moving gradient background on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-400 via-transparent to-blue-400 transition-opacity duration-500"></div>

                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center justify-start">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{capability.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Reviews Section - Animated Carousel */}
      <section className="py-20 bg-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Client Reviews
            </h2>
            <p className="text-xl text-gray-600">
              Hear what our satisfied clients have to say about working with RupeSafe
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll">
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-4">
                    &quot;{review.content}&quot;
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Ready to Transform - With Background Image */}
      <section
        className="relative py-20 text-white bg-blue-500 overflow-hidden z-10"
      // style={{
      //   backgroundImage: 'url(/footersection-1.png)',
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      // }}
      >
        <div className="absolute inset-0 "></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get in touch with us today and discover how RupeSafe can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-500 text-lg px-8 transition-all duration-300">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
