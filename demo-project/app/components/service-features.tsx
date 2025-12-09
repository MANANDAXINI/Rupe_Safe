import React from 'react';

interface Feature {
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  features: Feature[];
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ features }) => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;