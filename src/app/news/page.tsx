import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";

import brandLogo from "../../../assets/brand_logo.png";
import { newsStories } from "./news-data";

export const metadata: Metadata = {
  title: "News Update | Police Hospital",
  description: "News, patient education, and clinical updates from Police College Hospital Ikeja."
};

export default function NewsPage() {
  const [featured, ...moreStories] = newsStories;

  return (
    <main className="scroll-theme-editorial min-h-screen bg-[#f6f7fa] text-slate-800">
      <header className="border-b-4 border-[#0a2a6b] bg-white">
        <div className="section-shell grid min-h-28 grid-cols-[1fr_auto_1fr] items-center gap-4 py-4">
          <Link href="/" className="flex items-center gap-2.5"><Image src={brandLogo} alt="" className="h-10 w-10 object-contain" /><span className="hidden text-[10px] font-bold uppercase tracking-[0.13em] text-[#0a2a6b] sm:inline">Police Hospital</span></Link>
          <div className="text-center"><p className="font-display text-4xl leading-none text-[#0a2a6b] sm:text-6xl">News Update</p><p className="mt-2 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">Care | Community | Clinical insight</p></div>
          <div className="justify-self-end"><Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#0a2a6b]"><ArrowLeft size={14} /> <span className="hidden sm:inline">Hospital home</span></Link></div>
        </div>
        <div className="border-t border-slate-200"><div className="section-shell flex items-center gap-5 overflow-x-auto py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500"><span className="text-[#c12d3f]">Latest</span><span>Patient education</span><span>Clinical care</span><span>Hospital life</span></div></div>
      </header>

      <section className="section-shell py-10 sm:py-16">
        <div className="flex items-center justify-between border-y border-slate-300 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500"><span>Issue 01 | July 2026</span><span>Police Hospital news desk</span></div>
        <div className="grid border-b border-slate-300 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          <article className="order-2 flex flex-col justify-center py-7 lg:order-1 lg:py-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c12d3f]">Lead story | {featured.category}</p>
            <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[0.94] text-[#0a2a6b] sm:text-7xl">{featured.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{featured.summary}</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500"><span className="inline-flex items-center gap-2"><CalendarBlank size={15} />{featured.date}</span><span className="inline-flex items-center gap-2"><Clock size={15} />{featured.readTime}</span></div>
            <Link href={`/news/${featured.slug}`} className="mt-7 inline-flex w-fit items-center gap-2 border-b-2 border-[#0a2a6b] pb-1 text-sm font-bold text-[#0a2a6b]">Read the full story <ArrowRight size={16} /></Link>
          </article>
          <div className="relative order-1 min-h-80 overflow-hidden lg:order-2 lg:min-h-[520px]"><Image src={featured.image} alt={featured.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><span className="absolute bottom-0 left-0 bg-[#071a45] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white">From the clinical desk</span></div>
        </div>

        <div className="mt-12 flex items-end justify-between border-b-2 border-[#0a2a6b] pb-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c12d3f]">The archive</p><h2 className="font-display mt-2 text-4xl text-[#0a2a6b] sm:text-5xl">More headlines</h2></div><span className="hidden text-xs font-semibold text-slate-400 sm:inline">Latest updates from our teams</span></div>
        <div>
          {moreStories.map((story, index) => (
            <article key={story.title} className="grid gap-5 border-b border-slate-300 py-7 md:grid-cols-[190px_minmax(0,1fr)_auto] md:items-center md:gap-7">
              <div className="relative h-44 overflow-hidden md:h-32"><Image src={story.image} alt={story.title} fill sizes="190px" className="object-cover" /></div>
              <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#c12d3f]">0{index + 2} | {story.category}</p><h3 className="font-display mt-2 text-3xl leading-tight text-[#0a2a6b] sm:text-4xl">{story.title}</h3><p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{story.summary}</p><p className="mt-3 text-xs font-semibold text-slate-500">{story.date} | {story.readTime}</p></div>
              <div className="md:justify-self-end"><Link href={`/news/${story.slug}`} className="inline-flex items-center gap-2 border-b-2 border-[#0a2a6b] pb-1 text-sm font-bold text-[#0a2a6b]">Read <ArrowRight size={15} /></Link></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
