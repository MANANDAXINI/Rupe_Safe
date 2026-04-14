/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code, Smartphone, TrendingUp, Database, Boxes, CheckCircle, Star, Zap, Shield, Users, Lightbulb, CreditCard } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import HeroSlider from '@/components/HeroSlider';
import PartnerMarquee from '@/components/PartnerMarquee';
import ProductFoldSection from '@/components/ProductFoldSection';
import TestimonialTicker from '@/components/TestimonialTicker';
import FAQSection from '@/components/FAQSection';

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
  const statsRef = useRef<HTMLDivElement | null>(null);
  const countersStartedRef = useRef(false);
  const [counters, setCounters] = useState<Counter[]>([
    { label: 'Projects Completed', value: 0, suffix: '+' },
    { label: 'Happy Clients', value: 0, suffix: '+' },
    { label: 'Years Experience', value: 0, suffix: '+' },
    { label: 'Client Satisfaction', value: 0, suffix: '%' }
  ]);

  const reviews: Review[] = [
    {
      name: "John Smith",
      role: "CEO, Tech Corp",
      content: "Rupexa Private Limited transformed our business with innovative solutions. Highly recommended!",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "CTO, Innovation Labs",
      content: "The team is professional, responsive, and delivers exceptional results on time.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, StartupX",
      content: "Best technology partner we could ask for. They truly understand our vision.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Director, Global Solutions",
      content: "Outstanding service and support throughout the entire project lifecycle.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "VP Operations, Enterprise Co",
      content: "Their expertise in ERP systems is unmatched. Highly professional team.",
      rating: 5,
    },
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
    let intervals: ReturnType<typeof setInterval>[] = [];
    const startCounters = () => {
      if (countersStartedRef.current) return;
      countersStartedRef.current = true;
      const targets = [500, 250, 15, 98];
      setCounters([
        { label: 'Projects Completed', value: 0, suffix: '+' },
        { label: 'Happy Clients', value: 0, suffix: '+' },
        { label: 'Years Experience', value: 0, suffix: '+' },
        { label: 'Client Satisfaction', value: 0, suffix: '%' }
      ]);
      intervals = targets.map((target, index) => {
        const interval = setInterval(() => {
          setCounters(prev => {
            const updated = [...prev];
            if (updated[index].value < target) {
              updated[index].value = Math.min(updated[index].value + Math.ceil(target / 50), target);
            }
            return updated;
          });
        }, 30);
        return interval;
      });
    };

    let statsObserver: IntersectionObserver | null = null;
    if (statsRef.current && typeof IntersectionObserver !== 'undefined') {
      statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            statsObserver?.disconnect();
          }
        });
      }, { threshold: 0.25 });
      statsObserver.observe(statsRef.current);
    } else {
      startCounters();
    }

    const fadeElements = Array.from(document.querySelectorAll('.scroll-fade-in'));
    let observer: IntersectionObserver | null = null;

    if (fadeElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      fadeElements.forEach(el => observer?.observe(el));
    }

    return () => {
      intervals.forEach(interval => clearInterval(interval));
      observer?.disconnect();
      statsObserver?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f5fa] font-sans text-[#192839]">
      {/* Hero Section with Slider */}
      <HeroSlider />

      {/* Institution Partners Marquee */}
      <PartnerMarquee />

      {/* All-in-one Platform Section */}
      <ProductFoldSection />

      {/* Payment Gateway Hero Section */}
      <section className="relative py-32 overflow-hidden z-10 service-theme scroll-fade-in text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* Reduced image brightness and stronger overlay for legibility */}
          <div className="absolute inset-0 bg-blue-950/95"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm font-semibold">Featured Service</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Accept Payments <br />
                <span className="text-blue-200">Faster & Safer</span>
              </h2>

              <p className="text-lg text-white mb-8 leading-relaxed">
                India&apos;s most advanced payment gateway with instant settlements, 100+ payment methods,
                and bank-grade security. Start accepting payments in minutes.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/25 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="text-2xl font-bold mb-2 text-white">99.9%</div>
                  <div className="text-xs text-slate-100">Uptime SLA</div>
                </div>
                <div className="bg-white/25 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="text-2xl font-bold mb-2 text-white">₹500Cr+</div>
                  <div className="text-xs text-slate-100">Monthly Volume</div>
                </div>
                <div className="bg-white/25 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="text-2xl font-bold mb-2 text-white">50K+</div>
                  <div className="text-xs text-slate-100">Active Merchants</div>
                </div>
                <div className="bg-white/25 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="text-2xl font-bold mb-2 text-white">&lt;2s</div>
                  <div className="text-xs text-slate-100">Response Time</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/onboarding/payment-gateway" className="max-md:w-fit max-md:max-w-[min(100%,220px)]">
                  <Button size="sm" className="bg-[#305eff] text-white hover:bg-blue-700 text-sm px-6 max-md:rounded-xl md:rounded-full w-full sm:w-auto max-md:w-full">
                    Explore Payment Gateway
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/onboarding/payment-gateway" className="max-md:w-fit max-md:max-w-[min(100%,220px)]">
                  <Button size="sm" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-sm px-6 w-full sm:w-auto transition-all duration-300 max-md:rounded-xl md:rounded-full max-md:w-full">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Features */}
            <div className="space-y-4 md:pl-6 lg:pl-10">
              <div className="scroll-fade-in bg-white/25 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Bank-Grade Security</h3>
                    <p className="text-white text-sm">PCI DSS Level 1 compliant with 256-bit encryption</p>
                  </div>
                </div>
              </div>

              <div className="scroll-fade-in bg-white/25 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 [transition-delay:80ms]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">Instant Settlements</h3>
                    <p className="text-white text-sm">Get your money in minutes, not days</p>
                  </div>
                </div>
              </div>

              <div className="scroll-fade-in bg-white/25 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 [transition-delay:140ms]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-white">100+ Payment Methods</h3>
                    <p className="text-white text-sm">Cards, UPI, Wallets, Net Banking & more</p>
                  </div>
                </div>
              </div>

              <div className="scroll-fade-in bg-white/25 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 [transition-delay:200ms]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
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
      </section >

      <section
        className="relative py-20 bg-[#f1f5fa] overflow-hidden"
        ref={statsRef}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[800] mb-4 text-[#192839]">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Rupexa</span>?
            </h2>
            <p className="text-lg text-[#40566d] max-w-5xl mx-auto hidden md:block">
              We combine technical expertise with business insight to deliver solutions that truly make a difference.
            </p>
            <p className="text-lg text-[#40566d] max-w-3xl mx-auto md:hidden">
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
                  <h3 className="text-lg font-[700] mb-2 text-[#192839]">Expert Team</h3>
                  <p className="text-[#40566d]">
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
                  <h3 className="text-lg font-[700] mb-2 text-[#192839]">Proven Results</h3>
                  <p className="text-[#40566d]">
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
                  <h3 className="text-lg font-[700] mb-2 text-[#192839]">End-to-End Support</h3>
                  <p className="text-[#40566d]">
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
                  <h3 className="text-lg font-[700] mb-2 text-[#192839]">Scalable Solutions</h3>
                  <p className="text-[#40566d]">
                    Technology that grows with your business and adapts to changing needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 items-stretch">
              {counters.map((counter, index) => (
                <div
                  key={index}
                  className="rounded-3xl p-[2px] bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4 card-rounded h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-3xl p-8 text-center h-full flex flex-col justify-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-600">
                      {counter.value}
                      <span className="text-blue-400">{counter.suffix}</span>
                    </div>
                    <div className="text-[#40566d] text-sm font-[500]">{counter.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-20 bg-white relative z-10 overflow-hidden scroll-fade-in">
        {/* Animated Background Bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-5 w-96 h-96 bg-blue-300/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-400/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-[900] mb-4 text-[#192839]">
              Core Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <div
                  key={index}
                  className="relative p-[2px] rounded-3xl group transition-all duration-300 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card
                    className="border-0 bg-white hover:shadow-2xl transition-all duration-300 p-8 relative overflow-hidden rounded-[22px]"
                  >
                    {/* Moving gradient background on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400 transition-opacity duration-500"></div>

                    <div className="flex flex-col gap-4 relative z-10">
                      <div className="flex items-center justify-start">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:from-pink-500 group-hover:to-purple-600">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-[700] text-[#192839] mb-3">{capability.title}</h3>
                        <p className="text-[#40566d] leading-relaxed">{capability.description}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TestimonialTicker />

      <FAQSection />

      {/* Ready to Transform */}
      <section className="relative py-20 text-white bg-gradient-to-br from-blue-700 to-indigo-800 overflow-hidden z-10">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Get in touch with us today and discover how Rupexa Private Limited can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-sm mx-auto sm:max-w-none max-md:max-w-[min(100%,220px)] max-md:mx-auto">
            <Link href="/contact" className="max-md:w-full">
              <Button size="sm" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 text-sm px-6 max-md:rounded-xl md:rounded-full">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services" className="max-md:w-full">
              <Button size="sm" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-500 text-sm px-6 transition-all duration-300 max-md:rounded-xl md:rounded-full">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div >
  );
}
