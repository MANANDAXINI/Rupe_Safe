"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    titleHTML: (
      <>
        <span className="text-[#305eff]">AI-native payments for the</span><br />
        <span className="text-[#000912]">next generation of disruptors</span>
      </>
    ),
    subtitleHTML: "The infrastructure behind India's next hundred million businesses.",
    primaryCta: "Get Started Now",
    primaryLink: "/auth/signup",
    secondaryCta: null,
    secondaryLink: null,
    imageParams: {
      url: "/images/pro_1.png",
    }
  },
  {
    titleHTML: (
      <>
        <span className="text-[#305eff]">Advanced Payment Solutions</span><br />
        <span className="text-[#000912]">for India's boldest disruptors</span>
      </>
    ),
    subtitleHTML: "100+ Payment Methods | Easy Integration | Powerful Dashboard",
    primaryCta: "Sign Up Now",
    primaryLink: "/auth/signup",
    secondaryCta: "Know More",
    secondaryLink: "/services",
    imageParams: {
      url: "/images/pro_2.png",
    }
  },
  {
    titleHTML: (
      <>
        <span className="text-[#305eff]">Automated Payroll</span><br />
        <span className="text-[#000912]">for India's boldest disruptors</span>
      </>
    ),
    subtitleHTML: "Automated Payroll & Compliances | Built for Startups & Enterprises",
    primaryCta: "Sign Up Now",
    primaryLink: "/auth/signup",
    secondaryCta: "Know More",
    secondaryLink: "/services",
    imageParams: {
      url: "/images/pro_3.png",
      className: "scale-[1.25] origin-top"
    }
  },
  {
    titleHTML: (
      <>
        <span className="text-[#305eff]">Effortless Banking</span><br />
        <span className="text-[#000912]">for India's boldest disruptors</span>
      </>
    ),
    subtitleHTML: "Powerful Automation | Smart Dashboard | Integrated Access",
    primaryCta: "Sign Up Now",
    primaryLink: "/auth/signup",
    secondaryCta: "Know More",
    secondaryLink: "/services",
    imageParams: {
      url: "/images/pro_1.png",
    }
  },
  {
    titleHTML: (
      <>
        <span className="text-[#305eff]">Easy In-Store Payments</span><br />
        <span className="text-[#000912]">for India's boldest disruptors</span>
      </>
    ),
    subtitleHTML: "Quick Payments | Seamless Integration | Top-tier UPI stack",
    primaryCta: "Sign Up Now",
    primaryLink: "/auth/signup",
    secondaryCta: "Know More",
    secondaryLink: "/services",
    imageParams: {
      url: "/images/pro_2.png",
    }
  },
  {
    titleHTML: (
      <>
        <span className="text-[#305eff]">International Payments</span><br />
        <span className="text-[#000912]">for India's boldest disruptors</span>
      </>
    ),
    subtitleHTML: "Accept cards, bank transfers and Apple Pay from 180+ countries",
    primaryCta: "Sign Up Now",
    primaryLink: "/auth/signup",
    secondaryCta: "Know More",
    secondaryLink: "/services",
    imageParams: {
      url: "/images/pro_3.png",
      className: "scale-[1.25] origin-top"
    }
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const slidePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full min-h-screen bg-white font-sans flex items-center overflow-hidden pt-28 sm:pt-20 pb-10">

      {/* Immersive Razorpay Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Huge soft blue glow connecting the left and right like in Razorpay */}
        <div className="absolute top-[10%] left-[20%] w-[1000px] h-[800px] bg-[#eef4ff] rounded-[100%] blur-[120px] -translate-x-1/2"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[800px] h-[800px] bg-[#dbe8ff] rounded-[100%] blur-[140px] translate-x-1/4"></div>
      </div>

      {/* Main Container - Extended max width to deeply match exact Razorpay proportion */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center h-full">

        {/* Navigation Chevrons directly next to container just like Razorpay */}
        <div className="hidden xl:block absolute left-2 top-1/2 -translate-y-1/2 z-30">
          <button onClick={slidePrev} className="p-2 text-blue-600 hover:text-blue-800">
            <ChevronLeft strokeWidth={2.5} size={28} />
          </button>
        </div>
        <div className="hidden xl:block absolute right-2 top-1/2 -translate-y-1/2 z-30">
          <button onClick={slideNext} className="p-2 text-blue-600 hover:text-blue-800">
            <ChevronRight strokeWidth={2.5} size={28} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center xl:ml-6 xl:mr-6 relative">

          {/* Left: Text & CTA */}
          {/* Changed col-span to 7 so it occupies significantly MORE space, pushing the image right. */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1 mt-12 lg:mt-0 lg:-translate-y-12 xl:-translate-y-16 relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${index}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h1 className="text-[30px] sm:text-[42px] lg:text-[52px] xl:text-[58px] 2xl:text-[64px] font-[650] leading-[1.1] mb-5">
                  {slides[index % slides.length]?.titleHTML}
                </h1>

                <p className="text-[15px] sm:text-[17px] lg:text-[20px] text-[#40566d] font-[500] leading-snug mb-8 max-w-2xl mx-auto lg:mx-0">
                  {slides[index % slides.length]?.subtitleHTML}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                  <Link href={slides[index % slides.length]?.primaryLink || "#"} className="w-fit mx-auto lg:mx-0">
                    <button className="bg-[#305eff] hover:bg-blue-700 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-[13px] sm:text-[14px] font-[600] transition-all flex items-center justify-center gap-2 group">
                      {slides[index % slides.length]?.primaryCta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  {slides[index % slides.length]?.secondaryCta && slides[index % slides.length]?.secondaryLink && (
                    <Link href={slides[index % slides.length]?.secondaryLink || "#"} className="w-fit mx-auto lg:mx-0">
                      <button className="bg-transparent hover:bg-blue-50 text-[#2950da] hover:text-[#1839b0] px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-[13px] sm:text-[14px] font-[600] transition-all flex items-center justify-center border border-[#2950da]/20">
                        {slides[index % slides.length]?.secondaryCta}
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: massive bleeding transparent images natively blending right */}
          {/* Changed col-span to 5 so it occupies LESS width, giving more room to the left text. */}
          <div className="lg:col-span-5 xl:col-span-5 relative h-[450px] sm:h-[550px] lg:h-[700px] xl:h-[750px] w-full order-1 lg:order-2 pointer-events-none overflow-visible flex items-center justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${index}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 right-[0%] lg:right-[-15%] xl:right-[-25%] flex items-center w-[120%] lg:w-[130%] xl:w-[150%]"
                // Creating a mask so the hard left edge of the AI photo dissolves beautifully into the white background!
                style={{
                  maskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)"
                }}
              >
                <img
                  src={slides[index % slides.length]?.imageParams.url}
                  alt="Professional Stakeholder Presentation"
                  className={`w-full h-full object-cover object-left-center sm:object-center mix-blend-multiply opacity-95 ${slides[index % slides.length]?.imageParams.className || ""}`}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
