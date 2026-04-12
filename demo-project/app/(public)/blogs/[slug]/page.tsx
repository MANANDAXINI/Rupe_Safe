import { PrismaClient } from '@prisma/client';
import BlogContent from './BlogContent';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

interface BlogPageProps { params: { slug: string } }

// Same 12 seeds on the listing page — used to render a preview for non-DB slugs
const SEED_MAP: Record<string, { title: string; excerpt: string; category: string; readTime: string; coverImage: string | null; author: string }> = {
  'rupexa-payment-gateway-integration': { title:'How Rupexa Simplifies Payment Gateway Integration for Indian Merchants', excerpt:'India\'s digital payment ecosystem is booming. Rupexa makes gateway integration fast, reliable and developer-friendly for every business size.', category:'Payments', readTime:'6 Mins Read', coverImage:'/services/payment-gateway.jpg', author:'Rupexa Editorial' },
  'erp-systems-2026-guide': { title:'ERP Systems in 2026: Why Modern Businesses Can\'t Afford to Wait', excerpt:'From automating workflows to real-time inventory tracking, modern ERP is no longer optional. Here\'s how Rupexa helps you get there faster.', category:'Technology', readTime:'8 Mins Read', coverImage:'/services/web-dev.jpg', author:'Rupexa Team' },
  'upi-vs-payment-gateway-2026': { title:'UPI vs Payment Gateway: Which Should Your Business Use in 2026?', excerpt:'UPI is the backbone of India\'s digital economy. We compare both solutions so you can make the right call for your platform.', category:'Payments', readTime:'10 Mins Read', coverImage:null, author:'Vedant Dwivedi' },
  'custom-software-vs-off-the-shelf': { title:'Custom Software vs Off-the-Shelf: A Guide for Growing Businesses', excerpt:'Should you build or buy? We walk through cost, scalability and time-to-market factors to help you choose the right path.', category:'Technology', readTime:'7 Mins Read', coverImage:null, author:'Rupexa Editorial' },
  'digital-marketing-ai-2026': { title:'Digital Marketing in the Age of AI: What Actually Works in 2026', excerpt:'AI has fundamentally changed how businesses reach customers. We break down which channels and content strategies are actually delivering ROI.', category:'Digital Marketing', readTime:'9 Mins Read', coverImage:null, author:'Rupexa Team' },
  'nagpur-retailer-scales-with-rupexa-erp': { title:'How a Nagpur Retailer Scaled 3× After Switching to Rupexa\'s ERP', excerpt:'A Nagpur retail chain struggling with inventory chaos deployed Rupexa\'s custom ERP and scaled operations 3× in just 8 months.', category:'Customer Stories', readTime:'5 Mins Read', coverImage:null, author:'Roshni Dwivedi' },
  'pci-dss-compliance-india-guide': { title:'Understanding PCI DSS Compliance for Indian Payment Systems', excerpt:'Non-compliance with PCI DSS can cost more than fines. Here\'s everything you need to know to stay secure and compliant in 2026.', category:'Payments', readTime:'5 Mins Read', coverImage:null, author:'Rupexa Editorial' },
  'ai-software-development-indian-smes': { title:'How AI is Reshaping Software Development for Indian SMEs', excerpt:'From AI-assisted code generation to predictive analytics, Indian SMEs are leveraging AI to punch above their weight in 2026.', category:'Technology', readTime:'9 Mins Read', coverImage:null, author:'Vedant Dwivedi' },
  'seo-indian-businesses-mobile-first': { title:'SEO for Indian Businesses: Ranking in a Mobile-First World', excerpt:'With 77% of Indian web traffic from mobile, your SEO strategy needs to change. A complete step-by-step guide to ranking in 2026.', category:'Digital Marketing', readTime:'6 Mins Read', coverImage:null, author:'Rupexa Team' },
  'maharashtra-manufacturer-digital-journey': { title:'From Offline to Online: A Maharashtra Manufacturer\'s Digital Journey', excerpt:'Vijay Industries had zero digital presence in 2023. With Rupexa\'s platform and payment integration, they now generate 40% of revenue online.', category:'Customer Stories', readTime:'4 Mins Read', coverImage:null, author:'Rupexa Editorial' },
  'rupexa-developer-portal-launch': { title:'Rupexa Launches Developer Portal for Payment API Integration', excerpt:'Our new developer portal makes it easier than ever to integrate payment APIs and go live in days, not weeks.', category:'Rupexa News', readTime:'3 Mins Read', coverImage:null, author:'Roshni Dwivedi' },
  'whatsapp-marketing-ecommerce-india': { title:'WhatsApp Marketing for Indian E-Commerce: A 2026 Guide', excerpt:'WhatsApp has 500M+ users in India. Businesses not using it for marketing are leaving serious revenue on the table.', category:'Digital Marketing', readTime:'7 Mins Read', coverImage:null, author:'Rupexa Team' },
};

async function getBlog(slug: string) {
  try {
    return await prisma.blog.findUnique({
      where: { slug, published: true },
      include: { author: { select: { name: true, image: true } } },
    });
  } catch { return null; }
}

export async function generateMetadata({ params }: BlogPageProps) {
  const blog = await getBlog(params.slug);
  if (blog) return { title: blog.title, description: blog.excerpt };
  const seed = SEED_MAP[params.slug];
  if (seed) return { title: seed.title, description: seed.excerpt };
  return { title: 'Article Not Found — Rupexa Blog' };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlog(params.slug);

  if (blog) {
    const readingTime = blog.content
      ? Math.ceil(blog.content.trim().split(/\s+/).length / 200)
      : 0;
    return <BlogContent blog={blog as any} readingTime={readingTime} />;
  }

  // ── Seed article preview (not in DB yet) ──────────────────────────────────
  const seed = SEED_MAP[params.slug];

  if (!seed) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-24 pb-20 px-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Article Not Found</h1>
        <p className="text-slate-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/blogs" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 hover:bg-blue-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link href="/blogs" className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> All Articles
        </Link>

        <article className="bg-white border border-gray-200 overflow-hidden">
          {seed.coverImage && (
            <img src={seed.coverImage} alt={seed.title} className="w-full h-56 object-cover" />
          )}
          <div className="p-8 md:p-12">
            {/* Category */}
            <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide mb-4">
              In {seed.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-semibold text-[#192839] leading-tight mb-6">
              {seed.title}
            </h1>
            <div className="w-12 h-1 bg-blue-600 mb-6" />

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-8 pb-6 border-b border-gray-100">
              <span>By <strong className="text-slate-700">{seed.author}</strong></span>
              <span>·</span>
              <span>{seed.readTime}</span>
            </div>

            {/* Preview body */}
            <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-blue-600">
              <p className="text-lg text-slate-600 leading-relaxed">{seed.excerpt}</p>
              <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-blue-800 font-semibold text-base mb-2">📝 Full article coming soon</p>
                <p className="text-blue-700 text-sm">
                  This article is currently being written by the Rupexa editorial team. 
                  Check back soon, or explore other articles on the blog.
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/blogs" className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-2.5 text-sm hover:bg-blue-700 transition-colors rounded-lg">
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 border border-[#192839]/20 text-[#192839] font-medium px-6 py-2.5 text-sm hover:bg-gray-50 transition-colors rounded-lg">
            Contact Rupexa Team
          </Link>
        </div>

        {/* Bottom gradient CTA */}
      </div>
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 py-14 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-[26px] font-semibold text-white mb-3">Ready to transform your business?</h2>
          <p className="text-blue-100 text-[14px] mb-7">Connect with the Rupexa team and discover how we can help you grow.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-medium px-6 py-2.5 text-[14px] transition-colors rounded-lg">
            Get In Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}