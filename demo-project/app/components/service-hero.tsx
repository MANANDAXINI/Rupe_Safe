import React from "react";

interface ServiceHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function ServiceHero({ title, subtitle, description }: ServiceHeroProps) {
  return (
    <header className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {subtitle && <p className="text-sm font-semibold text-blue-600 uppercase mb-4">{subtitle}</p>}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 mb-4">
          <span className="block">{title}</span>
        </h1>

        {description && (
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}