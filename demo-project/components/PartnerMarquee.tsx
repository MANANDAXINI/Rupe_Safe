"use client";

import React, { useEffect, useState } from 'react';

// Fallback hardcoded list for fintech/payment gateways with legible names
const fallbackPartners = [
  { name: 'Visa', logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
  { name: 'Mastercard', logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" },
  { name: 'RuPay', logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png" },
  { name: 'UPI', logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
  { name: 'HDFC Bank', logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/HDFC_Bank_Logo.svg" },
  { name: 'ICICI Bank', logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" },
  { name: 'SBI', logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg" },
  { name: 'Axis Bank', logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Axis_Bank_Logo.svg" },
  { name: 'Yes Bank', logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Yes_Bank_Logo.svg" }
];

const INVALID_PARTNER_NAME = /(test|demo|sample|dummy|temp)/i;

export default function PartnerMarquee() {
  const [partners, setPartners] = useState(fallbackPartners);
  const [hiddenLogos, setHiddenLogos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch('/api/partners');
        if (res.ok) {
          const data = await res.json();
          // Replace fallback if backend has registered partners
          if (data && data.length > 0) {
            const normalized = data
              .map((p: any) => ({ name: (p?.name || '').trim(), logo: (p?.logo || '').trim() }))
              .filter((p: { name: string }) => p.name.length > 0 && !INVALID_PARTNER_NAME.test(p.name));

            if (normalized.length > 0) {
              setPartners(normalized);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch partners:', err);
      }
    }
    fetchPartners();
  }, []);

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
          {[...partners, ...partners].map((partner, index) => (
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
