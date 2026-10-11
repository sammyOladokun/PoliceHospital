import { CalendarBlank, ChartLineUp, Eye, TrendUp, Users } from "@phosphor-icons/react/dist/ssr";
import { CmsShell } from "../_components/CmsShell";

const cards = [
  { label: "Page Views", value: "24.5K", change: "+8.2%", icon: Eye, color: "text-[#2563ff]" },
  { label: "Visitors", value: "8,402", change: "+5.4%", icon: Users, color: "text-[#00a651]" },
  { label: "Avg. Engagement", value: "4.2%", change: "+0.5%", icon: TrendUp, color: "text-[#ff4d1d]" }
];

const topPages = [
  { page: "Home", views: "12,840", rate: "52%" },
  { page: "Services", views: "6,093", rate: "25%" },
  { page: "About", views: "4,218", rate: "17%" },
  { page: "Contact", views: "2,906", rate: "12%" }
];

export default function CmsAnalyticsPage() {
  return (
    <CmsShell active="/cms/analytics">
      <div className="px-4 py-6 sm:px-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold leading-none">Analytics</h1>
            <p className="mt-2 text-[14px] leading-5 text-[#6b6478]">Track traffic, engagement, and content performance across the website.</p>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[#6b6478]">
            <CalendarBlank size={16} />
            <span>10/2/2026</span>
          </div>
        </div>

        <section className="mt-6 grid gap-[21px] md:grid-cols-3">
          {cards.map(({ label, value, change, icon: Icon, color }) => (
            <article key={label} className="rounded-[12px] border border-[#dedede] bg-white px-[21px] py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] text-[#6b6478]">{label}</p>
                  <p className="mt-2 text-[26px] font-semibold leading-none">{value}</p>
                  <span className="mt-3 inline-flex rounded-md bg-[#e8f8ef] px-2 py-1 text-[11px] font-semibold text-[#008f48]">{change}</span>
                </div>
                <Icon size={28} weight="bold" className={color} />
              </div>
            </article>
          ))}
        </section>

        <div className="mt-[21px] grid gap-[21px] xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.75fr)]">
          <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold">Traffic Overview</h2>
              <ChartLineUp size={22} className="text-[#2563ff]" />
            </div>
            <div className="mt-6 h-[320px] overflow-hidden">
              <svg viewBox="0 0 760 320" role="img" aria-label="Traffic overview chart" className="h-full w-full">
                {[40, 100, 160, 220, 280].map((y) => <line key={y} x1="55" x2="735" y1={y} y2={y} stroke="#d9d9d9" strokeDasharray="3 4" />)}
                <line x1="55" x2="55" y1="35" y2="285" stroke="#999" />
                <line x1="55" x2="735" y1="285" y2="285" stroke="#999" />
                <path d="M55 244 C130 220 145 120 225 150 C290 173 315 48 390 68 C463 87 475 200 550 180 C620 162 654 98 735 116" fill="none" stroke="#377dff" strokeWidth="3" strokeLinecap="round" />
                <path d="M55 262 C120 250 170 238 225 226 C305 209 334 215 390 190 C460 158 480 176 550 146 C618 116 662 138 735 88" fill="none" stroke="#00a651" strokeWidth="3" strokeLinecap="round" />
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <text key={day} x={55 + index * 113} y="310" textAnchor="middle" className="fill-[#666] text-[13px]">{day}</text>
                ))}
              </svg>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
            <h2 className="text-[16px] font-semibold">Top Pages</h2>
            <div className="mt-5 space-y-4">
              {topPages.map((item) => (
                <div key={item.page}>
                  <div className="flex justify-between text-[13px]">
                    <span className="font-semibold">{item.page}</span>
                    <span className="text-[#6b6478]">{item.views}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[#eef0f4]">
                    <div className="h-2 rounded-full bg-[#2563ff]" style={{ width: item.rate }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </CmsShell>
  );
}
