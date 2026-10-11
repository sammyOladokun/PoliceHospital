import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Article,
  ChartBar,
  FolderOpen,
  Gear,
  House,
  ImageSquare,
  Plus,
  Users
} from "@phosphor-icons/react/dist/ssr";
import brandLogo from "../../../../assets/brand_logo.png";

type IconType = ComponentType<{ size?: number; weight?: "regular" | "fill" | "bold"; className?: string }>;
type CmsRoute = "/cms" | "/cms/posts" | "/cms/posts/new" | "/cms/pages" | "/cms/media" | "/cms/users" | "/cms/analytics" | "/cms/settings";

const navItems: { label: string; icon: IconType; href: CmsRoute }[] = [
  { label: "Dashboard", icon: House, href: "/cms" },
  { label: "Posts", icon: Article, href: "/cms/posts" },
  { label: "Pages", icon: FolderOpen, href: "/cms/pages" },
  { label: "Media Library", icon: ImageSquare, href: "/cms/media" },
  { label: "Users", icon: Users, href: "/cms/users" },
  { label: "Analytics", icon: ChartBar, href: "/cms/analytics" },
  { label: "Settings", icon: Gear, href: "/cms/settings" }
];

export function CmsShell({ active, children }: { active: CmsRoute; children: ReactNode }) {
  return (
    <main className="scroll-theme-cms min-h-screen bg-white text-black lg:flex">
      <aside className="sticky top-0 hidden h-screen w-[224px] shrink-0 flex-col border-r border-[#dedede] bg-white lg:flex">
        <div className="border-b border-[#e6e6e6] px-[21px] py-6">
          <Link href="/cms" className="flex items-center gap-3 text-black">
            <Image src={brandLogo} alt="" className="h-10 w-10 object-contain" />
            <span>
              <span className="block text-[18px] font-semibold leading-none">Police Hospital</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b6478]">Police College Ikeja</span>
            </span>
          </Link>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-3">
          {navItems.map(({ label, icon: Icon, href }) => {
            const isActive = href === active;

            return (
              <Link
                key={label}
                href={href}
                className={`flex h-[31px] items-center gap-3 rounded-md px-3 text-[14px] font-semibold text-black transition ${
                  isActive ? "bg-[#e7e9ee]" : "hover:bg-[#f1f2f5]"
                }`}
              >
                <Icon size={16} className="shrink-0" weight={isActive ? "fill" : "regular"} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#e6e6e6] px-3 py-3">
          <Link href="/cms/posts/new" className="flex h-[31px] w-full items-center justify-center gap-2 rounded-md bg-[#030018] text-[14px] font-semibold text-white">
            <Plus size={16} weight="bold" />
            New Post
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-12 items-center justify-between border-b border-[#dedede] bg-white px-4 sm:px-[21px] lg:hidden">
          <Link href="/cms" className="text-[16px] font-semibold">
            Content Management System
          </Link>
          <Link href="/cms/posts/new" aria-label="Create new post" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#030018] text-white">
            <Plus size={16} weight="bold" />
          </Link>
        </header>

        {children}
      </div>
    </main>
  );
}
