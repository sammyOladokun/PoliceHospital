import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Article,
  CalendarBlank,
  ChartBar,
  ChartLineUp,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  FolderOpen,
  Gear,
  House,
  ImageSquare,
  ListChecks,
  MagnifyingGlass,
  PencilSimple,
  Plus,
  TrendUp,
  UserCircle,
  Users,
  WarningCircle
} from "@phosphor-icons/react/dist/ssr";
import brandLogo from "../../../assets/brand_logo.png";

type IconType = ComponentType<{ size?: number; weight?: "regular" | "fill" | "bold"; className?: string }>;
type NavHref = "/cms" | "/cms/posts" | "/cms/pages" | "/cms/media" | "/cms/users" | "/cms/analytics" | "/cms/settings";

const navItems: { label: string; icon: IconType; href: NavHref; active?: boolean }[] = [
  { label: "Dashboard", icon: House, href: "/cms", active: true },
  { label: "Posts", icon: Article, href: "/cms/posts" },
  { label: "Pages", icon: FolderOpen, href: "/cms/pages" },
  { label: "Media Library", icon: ImageSquare, href: "/cms/media" },
  { label: "Users", icon: Users, href: "/cms/users" },
  { label: "Analytics", icon: ChartBar, href: "/cms/analytics" },
  { label: "Settings", icon: Gear, href: "/cms/settings" }
];

const metrics = [
  { label: "Total Posts", value: "142", change: "+12%", icon: FileText, color: "text-[#2563ff]" },
  { label: "Total Views", value: "24.5K", change: "+8.2%", icon: Eye, color: "text-[#00a651]" },
  { label: "Active Users", value: "1,234", change: "+3.1%", icon: Users, color: "text-[#a020ff]" },
  { label: "Engagement", value: "4.2%", change: "+0.5%", icon: TrendUp, color: "text-[#ff4d1d]" }
];

const posts = [
  { title: "Emergency Department Upgrade", type: "News", status: "Published", author: "Admin", date: "Oct 1, 2026", views: "3,420" },
  { title: "Antenatal Clinic Schedule", type: "Page", status: "Draft", author: "Matron A.", date: "Sep 29, 2026", views: "814" },
  { title: "Free Community Health Screening", type: "Post", status: "Review", author: "Dr. Okafor", date: "Sep 27, 2026", views: "1,902" },
  { title: "NHIA/HMO Enrollment Guide", type: "Guide", status: "Published", author: "Admin", date: "Sep 24, 2026", views: "2,106" }
];

const tasks = [
  { label: "Approve homepage service edits", state: "Due today", icon: WarningCircle, tone: "text-[#ff4d1d] bg-[#fff0eb]" },
  { label: "Upload new pharmacy images", state: "In progress", icon: Clock, tone: "text-[#b77900] bg-[#fff8df]" },
  { label: "Publish weekly health article", state: "Ready", icon: CheckCircle, tone: "text-[#008f48] bg-[#eaf8f0]" }
];

const channels = [
  { label: "Search", value: "44%", bar: "w-[44%]", color: "bg-[#2563ff]" },
  { label: "Direct", value: "28%", bar: "w-[28%]", color: "bg-[#00a651]" },
  { label: "Social", value: "18%", bar: "w-[18%]", color: "bg-[#a020ff]" },
  { label: "Referral", value: "10%", bar: "w-[10%]", color: "bg-[#ff4d1d]" }
];

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[224px] shrink-0 flex-col border-r border-[#dedede] bg-white lg:flex">
      <div className="border-b border-[#e6e6e6] px-[21px] py-6">
        <Link href="/" className="flex items-center gap-3 text-black">
          <Image src={brandLogo} alt="" className="h-10 w-10 object-contain" />
          <span>
            <span className="block text-[18px] font-semibold leading-none">Police Hospital</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b6478]">Police College Ikeja</span>
          </span>
        </Link>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-3">
        {navItems.map(({ label, icon: Icon, href, active }) => {
          const className = `flex h-[31px] items-center gap-3 rounded-md px-3 text-[14px] font-semibold text-black transition ${
            active ? "bg-[#e7e9ee]" : "hover:bg-[#f1f2f5]"
          }`;
          const content = (
            <>
              <Icon size={16} className="shrink-0" weight={active ? "fill" : "regular"} />
              {label}
            </>
          );

          return (
            <Link key={label} href={href} className={className}>
              {content}
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
  );
}

function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  const Icon = metric.icon;

  return (
    <article className="min-h-[120px] rounded-[12px] border border-[#dedede] bg-white px-[21px] py-6">
      <div className="flex items-center justify-between gap-5">
        <div>
          <p className="text-[14px] leading-none text-[#6b6478]">{metric.label}</p>
          <p className="mt-2 text-[22px] font-semibold leading-none text-black">{metric.value}</p>
          <span className="mt-[13px] inline-flex rounded-md bg-[#e8f8ef] px-2 py-1 text-[11px] font-semibold leading-none text-[#008f48]">
            {metric.change}
          </span>
        </div>
        <Icon size={28} weight="bold" className={metric.color} />
      </div>
    </article>
  );
}

function PerformanceChart() {
  return (
    <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
      <h2 className="text-[14px] font-medium text-black">Content Performance</h2>
      <div className="mt-6 h-[260px] overflow-hidden">
        <svg viewBox="0 0 690 260" role="img" aria-label="Content performance from January to June" className="h-full w-full">
          {[20, 80, 140, 200].map((y) => (
            <line key={y} x1="62" x2="676" y1={y} y2={y} stroke="#d9d9d9" strokeDasharray="3 4" />
          ))}
          {[62, 185, 308, 431, 554, 676].map((x) => (
            <line key={x} x1={x} x2={x} y1="20" y2="242" stroke="#d9d9d9" strokeDasharray="3 4" />
          ))}
          <line x1="62" x2="62" y1="20" y2="242" stroke="#999" />
          <line x1="62" x2="676" y1="242" y2="242" stroke="#999" />
          {[10000, 7500, 5000, 2500, 0].map((label, index) => (
            <text key={label} x="55" y={26 + index * 55} textAnchor="end" className="fill-[#666] text-[13px]">
              {label}
            </text>
          ))}
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((label, index) => (
            <text key={label} x={62 + index * 123} y="258" textAnchor="middle" className="fill-[#666] text-[13px]">
              {label}
            </text>
          ))}
          <path
            d="M62 188 C108 202 143 214 185 211 C232 208 236 62 308 26 C354 3 397 132 431 154 C473 181 517 139 554 132 C599 124 636 142 676 156"
            fill="none"
            stroke="#377dff"
            strokeLinecap="round"
            strokeWidth="2.25"
          />
          {[
            [62, 188],
            [185, 211],
            [308, 26],
            [431, 154],
            [554, 132],
            [676, 156]
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="white" stroke="#377dff" strokeWidth="2.5" />
          ))}
        </svg>
      </div>
    </section>
  );
}

function PostsTable() {
  return (
    <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[16px] font-semibold text-black">Recent Content</h2>
          <p className="mt-1 text-[13px] text-[#6b6478]">Manage hospital pages, posts, and publishing status.</p>
        </div>
        <div className="flex h-9 items-center gap-2 rounded-md border border-[#dedede] px-3 text-[#6b6478]">
          <MagnifyingGlass size={16} />
          <span className="text-[13px]">Search content</span>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[690px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#ededed] text-[12px] uppercase text-[#6b6478]">
              <th className="py-3 font-semibold">Title</th>
              <th className="py-3 font-semibold">Type</th>
              <th className="py-3 font-semibold">Status</th>
              <th className="py-3 font-semibold">Author</th>
              <th className="py-3 font-semibold">Date</th>
              <th className="py-3 text-right font-semibold">Views</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.title} className="border-b border-[#f0f0f0] text-[14px] last:border-0">
                <td className="py-4 font-semibold text-black">{post.title}</td>
                <td className="py-4 text-[#6b6478]">{post.type}</td>
                <td className="py-4">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-[12px] font-semibold ${
                      post.status === "Published"
                        ? "bg-[#e8f8ef] text-[#008f48]"
                        : post.status === "Draft"
                          ? "bg-[#f1f2f5] text-[#6b6478]"
                          : "bg-[#fff8df] text-[#b77900]"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="py-4 text-[#6b6478]">{post.author}</td>
                <td className="py-4 text-[#6b6478]">{post.date}</td>
                <td className="py-4 text-right font-semibold text-black">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function CmsPage() {
  return (
    <main className="min-h-screen bg-white text-black lg:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-12 items-center justify-between border-b border-[#dedede] bg-white px-4 sm:px-[21px] lg:hidden">
          <Link href="/" className="text-[16px] font-semibold">
            Content Management System
          </Link>
          <button aria-label="Create new post" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#030018] text-white">
            <Plus size={16} weight="bold" />
          </button>
        </header>

        <div className="px-4 py-6 sm:px-[21px] lg:px-[21px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[20px] font-semibold leading-none text-black">Dashboard</h1>
              <p className="mt-2 text-[14px] leading-none text-[#6b6478]">Welcome back! Here&apos;s what&apos;s happening with your content.</p>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#6b6478]">
              <CalendarBlank size={16} />
              <span>10/2/2026</span>
            </div>
          </div>

          <section className="mt-6 grid gap-[21px] sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <div className="mt-[21px] grid gap-[21px] xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.7fr)]">
            <PerformanceChart />

            <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-black">Editorial Tasks</h2>
                <ListChecks size={20} className="text-[#2563ff]" />
              </div>
              <div className="mt-5 space-y-3">
                {tasks.map(({ label, state, icon: Icon, tone }) => (
                  <div key={label} className="flex items-center gap-3 rounded-[12px] border border-[#ededed] p-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                      <Icon size={18} weight="fill" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-black">{label}</p>
                      <p className="mt-1 text-[12px] text-[#6b6478]">{state}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[12px] bg-[#f6f7fa] p-4">
                <div className="flex items-center gap-3">
                  <UserCircle size={36} weight="fill" className="text-[#2563ff]" />
                  <div>
                    <p className="text-[14px] font-semibold">CMS Admin</p>
                    <p className="text-[12px] text-[#6b6478]">Last active 8 minutes ago</p>
                  </div>
                </div>
                <button className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-white text-[13px] font-semibold text-black shadow-sm">
                  <PencilSimple size={16} />
                  Continue editing
                </button>
              </div>
            </section>
          </div>

          <div className="mt-[21px] grid gap-[21px] xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <PostsTable />

            <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-black">Traffic Sources</h2>
                <ChartLineUp size={22} className="text-[#00a651]" />
              </div>
              <div className="mt-5 space-y-4">
                {channels.map((channel) => (
                  <div key={channel.label}>
                    <div className="flex justify-between text-[13px]">
                      <span className="font-semibold text-black">{channel.label}</span>
                      <span className="text-[#6b6478]">{channel.value}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-[#eef0f4]">
                      <div className={`h-2 rounded-full ${channel.bar} ${channel.color}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[12px] border border-[#ededed] p-4">
                <p className="text-[13px] font-semibold text-black">Publishing Queue</p>
                <p className="mt-2 text-[28px] font-semibold leading-none">7</p>
                <p className="mt-2 text-[13px] leading-5 text-[#6b6478]">Items are waiting for final review across news, services, and patient education.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
