"use client";

import React, { useState } from 'react';

const partners = [
  { name: '1Pay', logo: '/images/1Pay.png' },
  { name: 'BankU', logo: '/images/BankU.png' },
];

export default function PartnerMarquee() {
  const [hiddenLogos, setHiddenLogos] = useState<Record<string, boolean>>({});

  return (
    <section className="w-full py-10 bg-white border-b border-gray-100 flex flex-col items-center justify-center overflow-hidden">
      <p className="text-[17px] text-[#40566d] font-[500] mb-8 tracking-wide uppercase text-center leading-relaxed">
        Trusted by Financial Institutions
        <br />
        &amp; Networks
      </p>
      
      <div 
        className="w-full max-w-[1400px] mx-auto overflow-hidden relative flex items-center"
        style={{
          maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex gap-16 sm:gap-24 items-center animate-partner-scroll whitespace-nowrap transition-all duration-500">
          {[...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex-shrink-0">
              {partner.logo && !hiddenLogos[`${partner.name}-${index}`] ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 sm:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  onError={() =>
                    setHiddenLogos((prev) => ({ ...prev, [`${partner.name}-${index}`]: true }))
                  }
                />
              ) : (
                <div className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-[#40566d] text-[13px] font-medium">
                  {partner.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes partnerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-partner-scroll {
          animation: partnerScroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
