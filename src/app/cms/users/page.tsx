import { CalendarBlank, EnvelopeSimple, LockKey, MagnifyingGlass, Plus, ShieldCheck, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { CmsShell } from "../_components/CmsShell";

const users = [
  { name: "CMS Admin", email: "admin@policehospital.ng", role: "Administrator", status: "Active", lastSeen: "8 minutes ago" },
  { name: "Dr. Okafor", email: "okafor@policehospital.ng", role: "Editor", status: "Active", lastSeen: "Today" },
  { name: "Matron A.", email: "matron@policehospital.ng", role: "Author", status: "Active", lastSeen: "Yesterday" },
  { name: "Front Desk", email: "frontdesk@policehospital.ng", role: "Contributor", status: "Invited", lastSeen: "Pending" }
];

const roles = [
  { title: "Administrator", access: "Full CMS access", users: 1 },
  { title: "Editor", access: "Publish and approve content", users: 1 },
  { title: "Author", access: "Create and update drafts", users: 1 },
  { title: "Contributor", access: "Submit content for review", users: 1 }
];

export default function CmsUsersPage() {
  return (
    <CmsShell active="/cms/users">
      <div className="px-4 py-6 sm:px-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold leading-none">Users</h1>
            <p className="mt-2 text-[14px] leading-5 text-[#6b6478]">Manage CMS members, roles, invitations, and access levels.</p>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[#6b6478]">
            <CalendarBlank size={16} />
            <span>10/2/2026</span>
          </div>
        </div>

        <div className="mt-6 grid gap-[21px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-[#dedede] px-3 text-[#6b6478]">
                <MagnifyingGlass size={16} />
                <span className="text-[14px]">Search users</span>
              </div>
              <button className="flex h-10 items-center gap-2 rounded-md bg-[#030018] px-3 text-[13px] font-semibold text-white">
                <Plus size={15} weight="bold" />
                Invite User
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#ededed] text-[12px] uppercase text-[#6b6478]">
                    <th className="py-3 font-semibold">User</th>
                    <th className="py-3 font-semibold">Role</th>
                    <th className="py-3 font-semibold">Status</th>
                    <th className="py-3 font-semibold">Last Seen</th>
                    <th className="py-3 text-right font-semibold">Access</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.email} className="border-b border-[#f0f0f0] text-[14px] last:border-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <UserCircle size={34} weight="fill" className="text-[#2563ff]" />
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="mt-1 text-[12px] text-[#6b6478]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-[#6b6478]">{user.role}</td>
                      <td className="py-4">
                        <span className={`inline-flex rounded-md px-2 py-1 text-[12px] font-semibold ${user.status === "Active" ? "bg-[#e8f8ef] text-[#008f48]" : "bg-[#fff8df] text-[#b77900]"}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 text-[#6b6478]">{user.lastSeen}</td>
                      <td className="py-4 text-right">
                        <button className="rounded-md border border-[#dedede] px-3 py-1.5 text-[12px] font-semibold">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-[21px]">
            <div className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
              <div className="flex items-center justify-between">
                <h2 className="text-[16px] font-semibold">Role Matrix</h2>
                <ShieldCheck size={22} className="text-[#00a651]" />
              </div>
              <div className="mt-5 space-y-3">
                {roles.map((role) => (
                  <div key={role.title} className="rounded-[12px] border border-[#ededed] p-3">
                    <div className="flex justify-between gap-3">
                      <p className="text-[14px] font-semibold">{role.title}</p>
                      <span className="text-[12px] text-[#6b6478]">{role.users} user</span>
                    </div>
                    <p className="mt-1 text-[12px] text-[#6b6478]">{role.access}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
              <h2 className="text-[16px] font-semibold">Invite Member</h2>
              <div className="mt-4 space-y-3">
                <div className="flex h-10 items-center gap-2 rounded-md border border-[#dedede] px-3 text-[#6b6478]"><EnvelopeSimple size={16} /><span className="text-[13px]">email@policehospital.ng</span></div>
                <div className="flex h-10 items-center gap-2 rounded-md border border-[#dedede] px-3 text-[#6b6478]"><LockKey size={16} /><span className="text-[13px]">Select role</span></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </CmsShell>
  );
}
