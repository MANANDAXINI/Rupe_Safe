"use client";

import React from 'react';

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Founder, NovaMart India",
    image: "/images/testimonials/rohan.jpg",
    quote: "Rupexa helped us go live with payments in days, not weeks. Settlements are reliable and the dashboard makes tracking simple for our team.",
  },
  {
    name: "Priya Nair",
    role: "CEO, BrightCart",
    image: "/images/testimonials/priya.jpg",
    quote: "Integration was straightforward and support was responsive. Our checkout success rate improved within the first month of switching to Rupexa.",
  },
  {
    name: "Aarav Kapoor",
    role: "CTO, PixelForge Labs",
    image: "/images/testimonials/aarav.jpg",
    quote: "As a tech team, we needed clean APIs and clear docs. Rupexa delivered both, and we scaled without worrying about payment downtime.",
  },
  {
    name: "Sneha Iyer",
    role: "Co-founder, Loom & Co.",
    image: "/images/testimonials/sneha.jpg",
    quote: "From UPI to cards, our customers get a smooth experience. Rupexa made accepting payments easier while we focused on growing our brand.",
  },
  {
    name: "Vikram Desai",
    role: "Director, Apex Retail",
    image: "/images/testimonials/vikram.jpg",
    quote: "We needed a partner who understands Indian businesses. Rupexa’s gateway and reporting tools gave us the clarity we were missing.",
  },
  {
    name: "Ananya Sharma",
    role: "Founder, CloudNest",
    image: "/images/testimonials/ananya.jpg",
    quote: "Setup was fast, onboarding was clear, and our customers trust the checkout. Rupexa has been a solid payment partner for our SaaS business.",
  }
];

export default function TestimonialTicker() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-[32px] md:text-[40px] font-bold text-[#000912] leading-[1.2]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Rupexa</span> grows with <span className="text-[#305eff]">you!</span>
        </h2>
        <p className="text-[20px] font-bold mt-2 text-[#40566d]">
          500+ Businesses Trust Us
        </p>
      </div>

      <div 
        className="w-full relative flex items-center overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex gap-6 animate-testimonial-scroll hover:animation-paused px-4 whitespace-nowrap py-16">
          {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
            <div 
              key={idx} 
              className={`w-[304px] h-[380px] justify-center sm:h-[420px] flex-shrink-0 group perspective-1200 cursor-pointer transition-transform duration-300 ${idx % 2 !== 0 ? 'translate-y-8' : '-translate-y-8'}`}
            >
              <div className="w-full h-full relative preserve-3d transition-transform duration-700 group-hover:[transform:rotateY(180deg)] rounded-xl shadow-md border border-[rgba(108,132,157,0.18)]">
                
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-white">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent z-10" />
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute bottom-6 left-6 z-20">
                    <p className="text-white font-[700] text-[18px]">{t.name}</p>
                    <p className="text-gray-200 text-[14px]">{t.role}</p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-white p-8 flex flex-col justify-between shadow-[0_2px_16px_rgba(25,40,57,0.09)]">
                  <div className="flex-grow pt-4">
                     <h3 className="text-[#000912] font-[600] text-[17px] leading-[1.6] whitespace-normal">
                       "{t.quote}"
                     </h3>
                  </div>
                  <div>
                    <p className="text-[#132644] font-[700] text-[18px]">{t.name}</p>
                    <p className="text-[#5D6D86] text-[14px]">{t.role}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .perspective-1200 { perspective: 1200px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        @keyframes testimonialScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-testimonial-scroll {
          animation: testimonialScroll 40s linear infinite;
        }
        .animate-testimonial-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
