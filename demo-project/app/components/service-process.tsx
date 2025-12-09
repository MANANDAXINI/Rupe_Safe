import React from "react";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  process: ProcessStep[];
}

export default function ServiceProcess({ process }: ServiceProcessProps) {
  if (!process || process.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          {/* central vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200"></div>

          <div className="space-y-12">
            {process.map((p, idx) => (
              <div key={p.step} className="relative flex flex-col items-center text-center">
                {/* marker */}
                <div className="z-20">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-lg">
                    {p.step}
                  </div>
                </div>

                {/* content card */}
                <div className="mt-6 w-full max-w-2xl">
                  <div className="mx-auto bg-white rounded-2xl p-6 shadow-lg border border-white/20">
                    <h4 className="text-lg font-semibold text-slate-900">{p.title}</h4>
                    <p className="text-sm text-slate-600 mt-2">{p.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}