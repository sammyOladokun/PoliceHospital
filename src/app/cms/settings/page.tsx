import { Bell, CalendarBlank, Database, Globe, ShieldCheck, ToggleLeft, ToggleRight } from "@phosphor-icons/react/dist/ssr";
import { CmsShell } from "../_components/CmsShell";

const settingsGroups = [
  {
    title: "Site Identity",
    icon: Globe,
    fields: ["Hospital name", "Tagline", "Primary domain", "Contact email"]
  },
  {
    title: "Publishing Rules",
    icon: ShieldCheck,
    fields: ["Require review before publish", "Allow scheduled publishing", "Keep content revision history"]
  },
  {
    title: "Notifications",
    icon: Bell,
    fields: ["Review request emails", "Publish success alerts", "Weekly analytics summary"]
  }
];

const toggles = [
  { label: "Maintenance mode", enabled: false },
  { label: "Auto-save drafts", enabled: true },
  { label: "Require admin approval", enabled: true },
  { label: "Public search indexing", enabled: true }
];

export default function CmsSettingsPage() {
  return (
    <CmsShell active="/cms/settings">
      <div className="px-4 py-6 sm:px-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold leading-none">Settings</h1>
            <p className="mt-2 text-[14px] leading-5 text-[#6b6478]">Configure CMS identity, publishing workflow, notifications, and storage.</p>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[#6b6478]">
            <CalendarBlank size={16} />
            <span>10/2/2026</span>
          </div>
        </div>

        <div className="mt-6 grid gap-[21px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="grid gap-[21px]">
            {settingsGroups.map(({ title, icon: Icon, fields }) => (
              <article key={title} className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] font-semibold">{title}</h2>
                  <Icon size={22} className="text-[#2563ff]" />
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {fields.map((field) => (
                    <label key={field} className="block">
                      <span className="text-[12px] font-semibold uppercase text-[#6b6478]">{field}</span>
                      <div className="mt-2 flex h-10 items-center rounded-md border border-[#dedede] px-3 text-[14px] text-[#6b6478]">
                        {field}
                      </div>
                    </label>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="space-y-[21px]">
            <div className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
              <h2 className="text-[16px] font-semibold">System Toggles</h2>
              <div className="mt-5 space-y-3">
                {toggles.map((toggle) => {
                  const Icon = toggle.enabled ? ToggleRight : ToggleLeft;
                  return (
                    <div key={toggle.label} className="flex items-center justify-between rounded-[12px] border border-[#ededed] p-3">
                      <span className="text-[14px] font-semibold">{toggle.label}</span>
                      <Icon size={30} weight="fill" className={toggle.enabled ? "text-[#00a651]" : "text-[#6b6478]"} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold">Storage</h2>
                <Database size={22} className="text-[#a020ff]" />
              </div>
              <p className="mt-2 text-[13px] leading-5 text-[#6b6478]">Media storage usage</p>
              <div className="mt-4 h-2 rounded-full bg-[#eef0f4]">
                <div className="h-2 w-[38%] rounded-full bg-[#a020ff]" />
              </div>
              <p className="mt-2 text-[12px] text-[#6b6478]">3.8 GB used of 10 GB</p>
            </div>

            <button className="h-10 w-full rounded-md bg-[#030018] text-[14px] font-semibold text-white">Save Settings</button>
          </section>
        </div>
      </div>
    </CmsShell>
  );
}
