import React from "react";

interface ServiceTechProps {
  technologies: string[];
}

export default function ServiceTech({ technologies }: ServiceTechProps) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">Tech & Tools</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-xl p-4 flex items-center justify-center text-center shadow-lg transform transition hover:-translate-y-2"
            >
              <span className="font-semibold">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}