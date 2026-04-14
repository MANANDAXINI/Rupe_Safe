"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import PartnerMarquee from "@/components/PartnerMarquee";

export default function About(): JSX.Element {
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners');
        if (response.ok) {
          const data = await response.json();
          setPartners(data);
        }
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      }
    };
    fetchPartners();
  }, []);

  return (
    <div className="bg-gray-100 font-sans text-slate-900 min-h-screen pt-24 pb-0">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. About Us Section */}
        <section className="py-12 md:py-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              About Us
            </h1>
            <div className="w-12 h-1 bg-blue-600 mb-6" />
            <p className="text-lg md:text-xl leading-relaxed text-slate-600">
              For a long time, we have felt that enabling frictionless business operations is a major problem and nobody seems to be doing it right. We decided to tackle it ourselves. Founded by visionary leaders, Rupexa Private Limited aims to revolutionize digital operations for modern businesses by providing clean, developer-friendly architectures and hassle-free integrations. We offer a fast, affordable and secure way for merchants, startups, ecommerce and large enterprises to scale custom software, deploy holistic ERP systems, and accelerate growth flawlessly.
            </p>
          </div>
        </section>

        {/* 2. Meet the Team Section */}
        <section className="py-12 md:py-16 border-t border-gray-200">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
              Meet the Team
            </h2>
            <div className="w-12 h-1 bg-blue-600 mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
              {/* Roshni */}
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-[180px] h-[180px] relative rounded-full overflow-hidden shadow-md flex-shrink-0">
                  <Image
                    src="/images/roshni.jpeg"
                    alt="Roshni Vijay Dwivedi"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Roshni Vijay Dwivedi</h3>
                  <p className="text-blue-600 font-semibold text-sm mt-1">Founder & Director</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2 max-w-[220px] mx-auto">Visionary leader driving innovation and strategic growth.</p>
                </div>
              </div>

              {/* Vedant */}
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-[180px] h-[180px] relative rounded-full overflow-hidden shadow-md flex-shrink-0">
                  <Image
                    src="/images/vedant.jpeg"
                    alt="Vedant Vijay Dwivedi"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Vedant Vijay Dwivedi</h3>
                  <p className="text-blue-600 font-semibold text-sm mt-1">Technical Department</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2 max-w-[220px] mx-auto">Heads technical solutions, ensuring robust software delivery.</p>
                </div>
              </div>

              {/* Vijay */}
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-[180px] h-[180px] relative rounded-full overflow-hidden shadow-md flex-shrink-0">
                  <Image
                    src="/images/vijay.jpeg"
                    alt="Vijay Dwivedi"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Vijay Dwivedi</h3>
                  <p className="text-blue-600 font-semibold text-sm mt-1">Consultant</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-2 max-w-[220px] mx-auto">Providing unparalleled strategic guidance and corporate expertise.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Backers / Partners Section */}
        <section className="py-12 md:py-16 border-t border-gray-200 overflow-hidden">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
              Our Partners
            </h2>
            <div className="w-12 h-1 bg-blue-600 mb-10" />

            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <PartnerMarquee />
            </div>
          </div>
        </section>

        {/* 4. Our Workspaces Section */}
        <section className="py-12 md:py-16 border-t border-gray-200">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
              Our Workspaces
            </h2>
            <div className="w-12 h-1 bg-blue-600 mb-10" />

            <div className="flex flex-col items-start">
              <p className="text-lg font-bold text-slate-900 mb-2">Registered Office</p>
              <p className="text-md text-slate-600">Block No. 101/102, Shriram Tower,</p>
              <p className="text-md text-slate-600">Next To NIT Kingsway, Civil Lines,</p>
              <p className="text-md text-slate-600 mb-6">Sadar, Nagpur, Maharashtra 440001</p>

              <a
                href="https://maps.google.com/?q=Shriram+Tower+NIT+Kingsway+Nagpur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                View on Maps
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 5. Minimal CTA / Perks Block — same bg as homepage 'Ready to Transform' */}
      <section className="relative py-20 text-white bg-gradient-to-br from-blue-700 to-indigo-800 overflow-hidden z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/30 rounded-s-full hidden md:block" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">

          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Supercharge your business with Rupexa
            </h2>
            <div className="w-12 h-1 bg-white mb-6" />
            <p className="text-blue-100 text-lg mb-8 max-w-md">
              Sign up now to experience the future of digital solutions and offer your customers the best experience.
            </p>

            <ul className="space-y-4 mb-10 font-medium text-white/95">
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" /> Quick onboarding
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" /> Access to entire product suite
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" /> API access
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" /> 24x7 support
              </li>
            </ul>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 max-md:rounded-xl md:rounded-sm font-bold shadow-lg hover:shadow-xl transition-all max-md:w-fit max-md:max-w-[min(100%,220px)]"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="hidden md:flex w-full md:w-1/2 mt-12 md:mt-0 justify-center md:justify-end">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center gap-4 border border-white/20">
              <Image
                src="/images/RupexaLogo.jpeg"
                alt="Rupexa Logo"
                width={160}
                height={80}
                className="object-contain"
              />
              <p className="text-white/80 text-sm text-center max-w-[220px]">Digitally empowering businesses across India</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}