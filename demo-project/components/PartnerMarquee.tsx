"use client";

import React, { useState } from 'react';

const partners = [
  { name: '1Pay', logo: '/images/1Pay.png', className: 'h-28 sm:h-32 md:h-40 w-auto' },
  { name: 'BankU', logo: '/images/BankU.png', className: 'h-14 sm:h-16 md:h-20 w-auto' },
];

export default function PartnerMarquee() {
  const [hiddenLogos, setHiddenLogos] = useState<Record<string, boolean>>({});

  return (
    <section className="w-full py-10 bg-white border-b border-gray-100 flex flex-col items-center justify-center">
      <p className="text-[17px] text-[#40566d] font-[500] mb-8 tracking-wide uppercase text-center leading-relaxed">
        Trusted by Financial Institutions
        <br />
        &amp; Networks
      </p>

      <div className="flex items-center justify-center gap-12 sm:gap-16 md:gap-24 px-4">
        {partners.map((partner) => (
          <div key={partner.name} className="flex items-center justify-center">
            {partner.logo && !hiddenLogos[partner.name] ? (
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.className} object-contain opacity-90 hover:opacity-100 transition-opacity duration-300`}
                onError={() =>
                  setHiddenLogos((prev) => ({ ...prev, [partner.name]: true }))
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
    </section>
  );
}
