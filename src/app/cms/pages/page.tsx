import { CalendarBlank, Eye, FileText, MagnifyingGlass, NotePencil, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { CmsShell } from "../_components/CmsShell";

const pages = [
  { title: "Home", slug: "/", status: "Published", owner: "Admin", updated: "Oct 2, 2026", views: "12,840" },
  { title: "About Police Hospital", slug: "/about", status: "Published", owner: "Admin", updated: "Sep 30, 2026", views: "4,218" },
  { title: "Specialist Services", slug: "/services", status: "Review", owner: "Dr. Okafor", updated: "Sep 28, 2026", views: "6,093" },
  { title: "Contact & Appointments", slug: "/contact", status: "Draft", owner: "Front Desk", updated: "Sep 25, 2026", views: "2,906" }
];

const sections = ["Hero", "Services", "Facilities", "FAQ", "Footer"];

function StatusBadge({ status }: { status: string }) {
  const tone = status === "Published" ? "bg-[#e8f8ef] text-[#008f48]" : status === "Review" ? "bg-[#fff8df] text-[#b77900]" : "bg-[#f1f2f5] text-[#6b6478]";
  return <span className={`inline-flex rounded-md px-2 py-1 text-[12px] font-semibold ${tone}`}>{status}</span>;
}

export default function CmsPagesPage() {
  return (
    <CmsShell active="/cms/pages">
      <div className="px-4 py-6 sm:px-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold leading-none">Pages</h1>
            <p className="mt-2 text-[14px] leading-5 text-[#6b6478]">Manage website pages, section structure, and publishing state.</p>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[#6b6478]">
            <CalendarBlank size={16} />
            <span>10/2/2026</span>
          </div>
        </div>

        <div className="mt-6 grid gap-[21px] xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-[#dedede] px-3 text-[#6b6478]">
                <MagnifyingGlass size={16} />
                <span className="text-[14px]">Search pages</span>
              </div>
              <button className="flex h-10 items-center gap-2 rounded-md bg-[#030018] px-3 text-[13px] font-semibold text-white">
                <Plus size={15} weight="bold" />
                New Page
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#ededed] text-[12px] uppercase text-[#6b6478]">
                    <th className="py-3 font-semibold">Page</th>
                    <th className="py-3 font-semibold">Status</th>
                    <th className="py-3 font-semibold">Owner</th>
                    <th className="py-3 font-semibold">Updated</th>
                    <th className="py-3 text-right font-semibold">Views</th>
                    <th className="py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.slug} className="border-b border-[#f0f0f0] text-[14px] last:border-0">
                      <td className="py-4">
                        <p className="font-semibold">{page.title}</p>
                        <p className="mt-1 text-[12px] text-[#6b6478]">{page.slug}</p>
                      </td>
                      <td className="py-4"><StatusBadge status={page.status} /></td>
                      <td className="py-4 text-[#6b6478]">{page.owner}</td>
                      <td className="py-4 text-[#6b6478]">{page.updated}</td>
                      <td className="py-4 text-right font-semibold">{page.views}</td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <button aria-label={`Preview ${page.title}`} className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dedede]"><Eye size={15} /></button>
                          <button aria-label={`Edit ${page.title}`} className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dedede]"><NotePencil size={15} /></button>
                          <button aria-label={`Delete ${page.title}`} className="flex h-8 w-8 items-center justify-center rounded-md border border-[#ffd8d0] text-[#ff4d1d]"><Trash size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px] xl:sticky xl:top-[21px] xl:self-start">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold">Page Builder</h2>
              <FileText size={22} className="text-[#2563ff]" />
            </div>
            <p className="mt-2 text-[13px] leading-5 text-[#6b6478]">Edit common homepage sections and publish them through review.</p>
            <div className="mt-5 space-y-3">
              {sections.map((section, index) => (
                <div key={section} className="flex items-center justify-between rounded-[12px] border border-[#ededed] p-3">
                  <div>
                    <p className="text-[14px] font-semibold">{section}</p>
                    <p className="mt-1 text-[12px] text-[#6b6478]">Block {index + 1}</p>
                  </div>
                  <button className="rounded-md border border-[#dedede] px-3 py-1.5 text-[12px] font-semibold">Edit</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </CmsShell>
  );
}
