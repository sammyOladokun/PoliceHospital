import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";

import brandLogo from "../../../../assets/brand_logo.png";
import { newsStories } from "../news-data";

export function generateStaticParams() {
  return newsStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = newsStories.find((item) => item.slug === slug);
  return story ? { title: `${story.title} | News Update`, description: story.summary } : { title: "News Update | Police Hospital" };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = newsStories.find((item) => item.slug === slug);

  if (!story) return null;

  return (
    <main className="scroll-theme-editorial min-h-screen bg-[#f6f7fa] text-slate-800">
      <div className="bg-[#071a45] py-2 text-white"><div className="section-shell text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">Police College Hospital Ikeja | Official newsroom</div></div>
      <header className="border-b-4 border-[#0a2a6b] bg-white"><div className="section-shell flex h-20 items-center justify-between"><Link href="/news" className="flex items-center gap-3"><Image src={brandLogo} alt="" className="h-11 w-11 object-contain" /><span className="font-display text-3xl text-[#0a2a6b]">News Update</span></Link><Link href="/" className="text-xs font-bold uppercase tracking-[0.12em] text-[#0a2a6b]">Hospital home</Link></div></header>
      <article className="section-shell py-10 sm:py-16">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-[#0a2a6b]"><ArrowLeft size={16} /> Back to News Update</Link>
        <div className="mt-10 max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c12d3f]">{story.category}</p><h1 className="font-display mt-4 text-5xl leading-[0.94] text-[#0a2a6b] sm:text-7xl">{story.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{story.summary}</p><div className="mt-7 flex gap-5 text-xs font-semibold text-slate-500"><span className="inline-flex items-center gap-2"><CalendarBlank size={15} />{story.date}</span><span className="inline-flex items-center gap-2"><Clock size={15} />{story.readTime}</span></div></div>
        <div className="relative mt-10 h-[320px] overflow-hidden sm:h-[520px]"><Image src={story.image} alt={story.title} fill priority sizes="100vw" className="object-cover" /></div>
        <div className="mx-auto mt-10 max-w-3xl border-t border-slate-300 pt-8 text-[17px] leading-8 text-slate-700">{story.body.map((paragraph) => <p key={paragraph} className="mb-6">{paragraph}</p>)}<Link href="/#consult" className="mt-5 inline-flex items-center gap-2 border-b-2 border-[#0a2a6b] pb-1 text-sm font-bold text-[#0a2a6b]">Speak with a patient advisor <ArrowRight size={16} /></Link></div>
      </article>
    </main>
  );
}
