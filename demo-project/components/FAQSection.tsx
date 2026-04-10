"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Rupexa?",
    answer: "Rupexa Private Limited is a comprehensive technology partner, offering solutions ranging from Payment Gateways and API integrations to full-scale Website & App Development, ERP implementation, and digital marketing."
  },
  {
    question: "What services does Rupexa offer?",
    answer: "We offer Payment Gateway integrations, native and cross-platform App Development, custom Website Development, holistic ERP solutions, and rigorous Digital Marketing to scale your business."
  },
  {
    question: "What online payment solutions does Rupexa offer?",
    answer: "Rupexa provides comprehensive full-stack payment gateway APIs, smart routing, subscription models, and payment links designed for fast and flawless online transactions."
  },
  {
    question: "What offline payment solutions does Rupexa offer?",
    answer: "Rupexa provides comprehensive omnichannel solutions including high-speed POS devices, smart QR code payments, and seamlessly integrated agent-based collections for retail."
  },
  {
    question: "What international payment solutions does Rupexa offer?",
    answer: "Rupexa enables businesses to accept payments globally, seamlessly handling forex transactions, localized alternative payment methods, and international card processing with high success rates."
  },
  {
    question: "What are Rupexa Payroll and Payouts?",
    answer: "Our automated systems handle employee salary disbursements, tax compliances, and immediate vendor payouts using API-driven money movement to completely remove operational overhead."
  },
  {
    question: "Which banks are supported by Rupexa?",
    answer: "We partner with all major private and public sector banks including HDFC, ICICI, SBI, Axis, and Yes Bank to ensure wide coverage, high uptime, and rapid settlement cycles."
  },
  {
    question: "What is Rupexa Rize?",
    answer: "Rupexa Rize is our dedicated launchpad program for startups, offering exclusive mentoring, technology partnerships, and networking opportunities to accelerate early-stage growth."
  },
  {
    question: "Is Rupexa safe and secure?",
    answer: "Yes, security is our ultimate priority. Rupexa is PCI DSS Level 1 compliant, utilizing state-of-the-art 256-bit AES encryption to ensure absolutely secure transactions and continuous data privacy."
  },
  {
    question: "Is Rupexa approved and regulated?",
    answer: "Yes, Rupexa strictly adheres to all relevant RBI guidelines and global financial regulations, working in full compliance with modern payment aggregation protocols."
  },
  {
    question: "Does Rupexa provide customer support?",
    answer: "Absolutely! We provide dedicated 24/7 technical support and maintenance via email, live chat, and dedicated account managers to ensure your operations run flawlessly at scale."
  },
  {
    question: "Which companies use Rupexa’s products?",
    answer: "Our technology stack and custom solutions are heavily trusted by over 500+ ambitious startups, fast-growing retail brands, and large enterprises across India."
  },
  {
    question: "In which countries does Rupexa operate?",
    answer: "Originally founded and headquartered in India, Rupexa is perfectly positioned to provide localized solutions locally while fully supporting expansive global and cross-border integrations."
  }
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-white font-sans w-full flex justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/3 flex flex-col items-start pt-2">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-600 leading-[1.2]">
            Frequently asked<br className="hidden lg:block" /> questions
          </h2>
        </div>

        <div className="lg:w-2/3">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border-b-[0.5px] border-[rgba(67,69,71,0.24)] last:border-b-0"
              >
                <AccordionTrigger className="text-[17px] font-[600] text-[#192839] hover:no-underline py-6 text-left transition-colors bg-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#40566d] text-[15px] font-[400] leading-[1.6] pb-6 text-left">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
