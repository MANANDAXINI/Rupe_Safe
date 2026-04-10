'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, Share2, Loader2, ArrowRight, Clock } from 'lucide-react';
import { toast } from 'sonner';
import PartnerMarquee from '@/components/PartnerMarquee';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  category?: string;
  readTime?: string;
  createdAt: string;
  author: { name: string | null; email: string };
}

const SEED: Blog[] = [
  { id:'s1', category:'Payments', readTime:'6 Mins Read', title:'How Rupexa Simplifies Payment Gateway Integration for Indian Merchants', slug:'rupexa-payment-gateway-integration', excerpt:'India\'s digital payment ecosystem is booming. Rupexa makes gateway integration fast, reliable and developer-friendly for every business size.', coverImage:'/services/payment-gateway.jpg', createdAt:'2026-04-09T10:00:00Z', author:{name:'Rupexa Editorial',email:''} },
  { id:'s2', category:'Technology', readTime:'8 Mins Read', title:'ERP Systems in 2026: Why Modern Businesses Can\'t Afford to Wait', slug:'erp-systems-2026-guide', excerpt:'From automating workflows to real-time inventory tracking, modern ERP is no longer optional. Here\'s how Rupexa helps you get there faster.', coverImage:'/services/web-dev.jpg', createdAt:'2026-04-02T10:00:00Z', author:{name:'Rupexa Team',email:''} },
  { id:'s3', category:'Payments', readTime:'10 Mins Read', title:'UPI vs Payment Gateway: Which Should Your Business Use in 2026?', slug:'upi-vs-payment-gateway-2026', excerpt:'UPI is the backbone of India\'s digital economy. We compare both solutions so you can make the right call for your platform.', coverImage:null, createdAt:'2026-03-28T10:00:00Z', author:{name:'Vedant Dwivedi',email:''} },
  { id:'s4', category:'Technology', readTime:'7 Mins Read', title:'Custom Software vs Off-the-Shelf: A Guide for Growing Businesses', slug:'custom-software-vs-off-the-shelf', excerpt:'Should you build or buy? We walk through cost, scalability and time-to-market factors to help you choose the right path.', coverImage:null, createdAt:'2026-03-22T10:00:00Z', author:{name:'Rupexa Editorial',email:''} },
  { id:'s5', category:'Digital Marketing', readTime:'9 Mins Read', title:'Digital Marketing in the Age of AI: What Actually Works in 2026', slug:'digital-marketing-ai-2026', excerpt:'AI has fundamentally changed how businesses reach customers. We break down which channels and content strategies are actually delivering ROI.', coverImage:null, createdAt:'2026-03-15T10:00:00Z', author:{name:'Rupexa Team',email:''} },
  { id:'s6', category:'Customer Stories', readTime:'5 Mins Read', title:'How a Nagpur Retailer Scaled 3× After Switching to Rupexa\'s ERP', slug:'nagpur-retailer-scales-with-rupexa-erp', excerpt:'A Nagpur retail chain struggling with inventory chaos deployed Rupexa\'s custom ERP and scaled operations 3× in just 8 months.', coverImage:null, createdAt:'2026-03-08T10:00:00Z', author:{name:'Roshni Dwivedi',email:''} },
  { id:'s7', category:'Payments', readTime:'5 Mins Read', title:'Understanding PCI DSS Compliance for Indian Payment Systems', slug:'pci-dss-compliance-india-guide', excerpt:'Non-compliance with PCI DSS can cost more than fines. Here\'s everything you need to know to stay secure and compliant in 2026.', coverImage:null, createdAt:'2026-03-01T10:00:00Z', author:{name:'Rupexa Editorial',email:''} },
  { id:'s8', category:'Technology', readTime:'9 Mins Read', title:'How AI is Reshaping Software Development for Indian SMEs', slug:'ai-software-development-indian-smes', excerpt:'From AI-assisted code generation to predictive analytics, Indian SMEs are leveraging AI to punch above their weight in 2026.', coverImage:null, createdAt:'2026-02-22T10:00:00Z', author:{name:'Vedant Dwivedi',email:''} },
  { id:'s9', category:'Digital Marketing', readTime:'6 Mins Read', title:'SEO for Indian Businesses: Ranking in a Mobile-First World', slug:'seo-indian-businesses-mobile-first', excerpt:'With 77% of Indian web traffic from mobile, your SEO strategy needs to change. A complete step-by-step guide to ranking in 2026.', coverImage:null, createdAt:'2026-02-14T10:00:00Z', author:{name:'Rupexa Team',email:''} },
  { id:'s10', category:'Customer Stories', readTime:'4 Mins Read', title:'From Offline to Online: A Maharashtra Manufacturer\'s Digital Journey', slug:'maharashtra-manufacturer-digital-journey', excerpt:'Vijay Industries had zero digital presence in 2023. With Rupexa, they now generate 40% of revenue online.', coverImage:null, createdAt:'2026-02-05T10:00:00Z', author:{name:'Rupexa Editorial',email:''} },
  { id:'s11', category:'Rupexa News', readTime:'3 Mins Read', title:'Rupexa Launches Developer Portal for Payment API Integration', slug:'rupexa-developer-portal-launch', excerpt:'Our new developer portal makes it easier than ever to integrate payment APIs and go live in days, not weeks.', coverImage:null, createdAt:'2026-01-28T10:00:00Z', author:{name:'Roshni Dwivedi',email:''} },
  { id:'s12', category:'Digital Marketing', readTime:'7 Mins Read', title:'WhatsApp Marketing for Indian E-Commerce: A 2026 Guide', slug:'whatsapp-marketing-ecommerce-india', excerpt:'WhatsApp has 500M+ users in India. Businesses not using it for marketing are leaving serious revenue on the table.', coverImage:null, createdAt:'2026-01-18T10:00:00Z', author:{name:'Rupexa Team',email:''} },
];

const SECTIONS = [
  { key:'Payments',          label:'Payments' },
  { key:'Technology',        label:'Technology & ERP' },
  { key:'Digital Marketing', label:'Digital Marketing' },
  { key:'Customer Stories',  label:'Customer Stories' },
  { key:'Rupexa News',       label:'Rupexa News' },
];

const GRAD: Record<string,string> = {
  'Payments':'from-blue-500 to-indigo-600',
  'Technology':'from-violet-500 to-purple-600',
  'Digital Marketing':'from-emerald-500 to-teal-600',
  'Customer Stories':'from-amber-500 to-orange-600',
  'Rupexa News':'from-rose-500 to-pink-600',
};

const stagger = { hidden:{opacity:0}, visible:{opacity:1, transition:{staggerChildren:0.06}} };
const fadeUp  = { hidden:{opacity:0,y:16}, visible:{opacity:1,y:0, transition:{duration:0.45}} };

export default function BlogsPage() {
  const [dbBlogs, setDbBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/blogs');
        if (r.ok) { const d: Blog[] = await r.json(); setDbBlogs(d); }
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  // DB blogs ALWAYS first (sorted by date), then seeds not already covered
  const all = [
    ...dbBlogs.sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    ...SEED.filter(s => !dbBlogs.find(b => b.slug === s.slug)),
  ];

  const fmt = (d:string) => new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});

  const handleShare = async (e: React.MouseEvent, blog: Blog) => {
    e.preventDefault();
    const url = `${window.location.origin}/blogs/${blog.slug}`;
    try {
      if (navigator.share) { await navigator.share({title:blog.title, url}); toast.success('Shared!'); }
      else { await navigator.clipboard.writeText(url); toast.success('Link copied!'); }
    } catch {}
  };

  const hero = all[0] ?? null;
  const recent = all.slice(1, 5);
  const byCategory = (key:string) => all.filter(b => b.category === key).slice(0,3);
  // DB blogs without a category (e.g. created from admin without category set)
  const uncategorized = dbBlogs.filter(b => !b.category || b.category.trim() === '');

  // ── Card sub-components ─────────────────────────────────────────────────────

  function CoverImg({ blog, className }: { blog:Blog; className:string }) {
    const grad = GRAD[blog.category ?? ''] ?? 'from-blue-400 to-indigo-500';
    return blog.coverImage
      ? <img src={blog.coverImage} alt={blog.title} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${className}`} />
      : <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
          <span className="text-white/20 font-black text-6xl select-none">{blog.title[0]}</span>
        </div>;
  }

  function CatBadge({ cat }: { cat?:string }) {
    if (!cat) return null;
    return (
      <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
        In {cat}
      </span>
    );
  }

  function MetaRow({ blog }: { blog:Blog }) {
    return (
      <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>{fmt(blog.createdAt)}</span>
        {blog.readTime && <><span>·</span><span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{blog.readTime}</span></>}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 font-sans text-slate-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── PAGE HEADER ─────────────────────────────────────────── */}
        <div className="py-10 border-b border-gray-300 mb-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Rupexa Blog</h1>
          <div className="w-12 h-1 bg-blue-600 mb-4" />
          <p className="text-slate-500 text-base max-w-2xl">
            Insights, guides and customer stories from the Rupexa team — helping businesses grow smarter with technology and payments.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="w-10 h-10 animate-spin text-blue-600"/></div>
        ) : (
          <>
            {/* ── SECTION 1: FEATURED / HERO ─────────────────────── */}
            {hero && (
              <section className="mb-10">
                <Link href={`/blogs/${hero.slug}`} className="group block">
                  <article className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] overflow-hidden">
                      <CoverImg blog={hero} className="" />
                      {/* Stronger gradient for mobile readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                        <CatBadge cat={hero.category} />
                        <h2 className="mt-2 text-white text-lg sm:text-2xl md:text-3xl font-bold leading-snug group-hover:text-blue-200 transition-colors line-clamp-3">
                          {hero.title}
                        </h2>
                        <p className="hidden sm:block mt-2 text-white/75 text-sm line-clamp-2">{hero.excerpt}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-white/60 text-[11px]">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>{fmt(hero.createdAt)}</span>
                          {hero.readTime && <><span className="hidden sm:inline">·</span><span className="hidden sm:flex items-center gap-1">{hero.readTime}</span></>}
                          <span className="hidden sm:inline">·</span>
                          <span className="hidden sm:flex items-center gap-1"><User className="w-3 h-3"/>{hero.author.name}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </section>
            )}

            {/* ── SECTION 2: RECENT — 2-col grid with excerpt ──────── */}
            {recent.length > 0 && (
              <section className="mb-12">
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={stagger} initial="hidden" animate="visible">
                  {recent.map(blog => (
                    <motion.div key={blog.id} variants={fadeUp}>
                      <Link href={`/blogs/${blog.slug}`} className="group block">
                        <article className="bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 overflow-hidden flex h-full">
                          <div className="w-24 sm:w-28 h-full min-h-[100px] flex-shrink-0 overflow-hidden bg-slate-100 relative">
                            <CoverImg blog={blog} className="" />
                          </div>
                          <div className="p-3 sm:p-4 flex flex-col justify-between min-w-0 flex-grow">
                            <div>
                              <CatBadge cat={blog.category} />
                              <h3 className="mt-1.5 font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {blog.title}
                              </h3>
                              <p className="hidden sm:block mt-1 text-slate-500 text-xs leading-relaxed line-clamp-2">{blog.excerpt}</p>
                            </div>
                            <MetaRow blog={blog} />
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            )}

            {/* ── SECTION 3–7: Category sections — 3-col compact ──── */}
            {SECTIONS.map(({key,label}) => {
              const posts = byCategory(key);
              if (posts.length === 0) return null;
              return (
                <section key={key} className="mb-12">
                  {/* Razorpay-style category header */}
                  <div className="flex items-center gap-3 mb-5 border-b border-gray-300 pb-3">
                    <h2 className="text-base font-bold text-slate-900">{label}</h2>
                    <div className="flex-grow" />
                    <Link href={`/blogs?category=${key}`} className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1">
                      View all <ArrowRight className="w-3 h-3"/>
                    </Link>
                  </div>

                  <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5" variants={stagger} initial="hidden" animate="visible">
                    {posts.map(blog => (
                      <motion.div key={blog.id} variants={fadeUp}>
                        <Link href={`/blogs/${blog.slug}`} className="group block">
                          <article className="bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 overflow-hidden">
                            <div className="relative h-36 overflow-hidden bg-slate-100">
                              <CoverImg blog={blog} className="" />
                              <div className="absolute top-0 left-0 p-2">
                                <CatBadge cat={blog.category} />
                              </div>
                              {/* Share */}
                              <button
                                onClick={e => handleShare(e, blog)}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 shadow transition-all"
                              >
                                <Share2 className="w-3 h-3 text-slate-500"/>
                              </button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {blog.title}
                              </h3>
                              <div className="flex items-center justify-between">
                                <MetaRow blog={blog} />
                                <span className="text-blue-600 text-xs font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                                  Read <ArrowRight className="w-3 h-3"/>
                                </span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              );
            })}
            {/* ── UNCATEGORIZED DB BLOGS (admin-created, no category) ── */}
            {uncategorized.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-5 border-b border-gray-300 pb-3">
                  <h2 className="text-base font-bold text-slate-900">From Our Blog</h2>
                  <div className="flex-grow" />
                  <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{uncategorized.length} article{uncategorized.length > 1 ? 's' : ''}</span>
                </div>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" variants={stagger} initial="hidden" animate="visible">
                  {uncategorized.map(blog => (
                    <motion.div key={blog.id} variants={fadeUp}>
                      <Link href={`/blogs/${blog.slug}`} className="group block">
                        <article className="bg-white border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 overflow-hidden">
                          <div className="relative h-36 overflow-hidden bg-slate-100">
                            <CoverImg blog={blog} className="" />
                            <button onClick={e => handleShare(e, blog)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 shadow transition-all">
                              <Share2 className="w-3 h-3 text-slate-500"/>
                            </button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                            <p className="text-slate-500 text-xs line-clamp-2 mb-3">{blog.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <MetaRow blog={blog} />
                              <span className="text-blue-600 text-xs font-semibold flex items-center gap-0.5">Read <ArrowRight className="w-3 h-3"/></span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            )}
          </>
        )}

        {/* ── CTA STRIP ───────────────────────────────────────────── */}
        <section className="mt-4 bg-gradient-to-br from-blue-700 to-indigo-800 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Ready to transform your business?</h3>
            <p className="text-blue-100 text-sm">Connect with the Rupexa team and discover how we can help you grow.</p>
          </div>
          <Link href="/contact" className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-5 py-2.5 text-sm hover:shadow-lg transition-all">
            Get In Touch <ArrowRight className="w-4 h-4"/>
          </Link>
        </section>

      </div>

      {/* ── PARTNERS ─────────────────────────────────────────────── */}
      <div className="mt-16 bg-white border-t border-gray-200 py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-blue-600 uppercase tracking-widest mb-8">
            Trusted By Partners
          </p>
          <PartnerMarquee />
        </div>
      </div>
    </main>
  );
}
