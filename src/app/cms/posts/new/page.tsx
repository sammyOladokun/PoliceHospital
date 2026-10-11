import Image from "next/image";
import Link from "next/link";
import {
  Article,
  ChartBar,
  Eye,
  FloppyDisk,
  FolderOpen,
  Gear,
  House,
  ImageSquare,
  Plus,
  Users,
  X
} from "@phosphor-icons/react/dist/ssr";
import brandLogo from "../../../../../assets/brand_logo.png";

const navItems = [
  { label: "Dashboard", icon: House, href: "/cms" },
  { label: "Posts", icon: Article, href: "/cms/posts" },
  { label: "Pages", icon: FolderOpen, href: "/cms/pages" },
  { label: "Media Library", icon: ImageSquare, href: "/cms/media" },
  { label: "Users", icon: Users, href: "/cms/users" },
  { label: "Analytics", icon: ChartBar, href: "/cms/analytics" },
  { label: "Settings", icon: Gear, href: "/cms/settings" }
] as const;

export default function NewPostPage() {
  return (
    <main className="min-h-screen bg-[#fffef1] text-black lg:flex">
      <aside className="sticky top-0 hidden h-screen w-[224px] shrink-0 flex-col border-r border-[#e0dfce] bg-[#fffef1] lg:flex">
        <div className="border-b border-[#e0dfce] px-[21px] py-[25px]">
          <Link href="/cms" className="flex items-center gap-3 text-black">
            <Image src={brandLogo} alt="" className="h-10 w-10 object-contain" />
            <span>
              <span className="block text-[18px] font-semibold leading-none">Police Hospital</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6b6478]">Police College Ikeja</span>
            </span>
          </Link>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-[14px] overflow-y-auto px-[24px] py-[21px]">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link key={label} href={href} className="flex h-[24px] items-center gap-3 text-[14px] font-semibold text-black">
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-[#e0dfce] px-[14px] py-[16px]">
          <Link href="/cms/posts/new" className="flex h-[31px] w-full items-center justify-center gap-2 rounded-md bg-[#030018] text-[14px] font-semibold text-white">
            <Plus size={16} weight="bold" />
            New Post
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-[48px] items-center justify-between border-b border-[#e0dfce] bg-[#fffef1] px-4 sm:px-[21px] lg:hidden">
          <Link href="/cms" className="text-[16px] font-semibold">
            Content Management System
          </Link>
          <Link href="/cms/posts" aria-label="Close editor" className="flex h-8 w-8 items-center justify-center rounded-md text-black">
            <X size={18} />
          </Link>
        </header>

        <div className="px-5 py-[22px] sm:px-[21px]">
          <div className="mb-[21px] flex items-center justify-between gap-4">
            <div />
            <div className="flex items-center gap-[10px]">
              <button className="flex h-[29px] items-center gap-2 rounded-md border border-[#deddcc] bg-[#fffef1] px-3 text-[13px] font-semibold">
                <Eye size={15} />
                Preview
              </button>
              <button className="flex h-[29px] items-center gap-2 rounded-md bg-[#030018] px-3 text-[13px] font-semibold text-white">
                <FloppyDisk size={15} />
                Save
              </button>
              <Link href="/cms/posts" aria-label="Close editor" className="flex h-[29px] w-[29px] items-center justify-center rounded-md text-black">
                <X size={18} />
              </Link>
            </div>
          </div>

          <div className="grid gap-[21px] xl:grid-cols-[minmax(0,1fr)_352px]">
            <section className="max-w-[727px] xl:max-w-none">
              <h1 className="text-[14px] font-medium">Content Editor</h1>

              <label className="mt-[24px] block">
                <span className="text-[13px] font-semibold">Title</span>
                <input
                  placeholder="Enter your title here..."
                  className="mt-[8px] h-[32px] w-full rounded-md border border-black bg-[#fff3e2] px-3 text-[13px] outline-none placeholder:text-[#756e7e]"
                />
              </label>

              <label className="mt-[20px] block">
                <span className="text-[13px] font-semibold">Content</span>
                <textarea
                  placeholder="Start writing your content..."
                  className="mt-[8px] min-h-[337px] w-full resize-y rounded-md border border-black bg-[#fff3e2] px-3 py-3 text-[13px] leading-6 outline-none placeholder:text-[#756e7e] lg:min-h-[337px]"
                />
              </label>
            </section>

            <aside className="space-y-[21px]">
              <section className="rounded-[12px] border border-[#deddcc] bg-[#fffef1] px-[21px] py-[20px]">
                <h2 className="text-[15px] font-medium">Publish Settings</h2>

                <label className="mt-[25px] block">
                  <span className="text-[13px] font-semibold">Status</span>
                  <select className="mt-[8px] h-[32px] w-full rounded-md border border-black bg-[#fff3e2] px-3 text-[13px] outline-none">
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Review</option>
                  </select>
                </label>

                <label className="mt-[16px] block">
                  <span className="text-[13px] font-semibold">Category</span>
                  <select className="mt-[8px] h-[32px] w-full rounded-md border border-black bg-[#fff3e2] px-3 text-[13px] text-[#756e7e] outline-none">
                    <option>Select category</option>
                    <option>News</option>
                    <option>Clinic Update</option>
                    <option>Health Education</option>
                  </select>
                </label>
              </section>

              <section className="rounded-[12px] border border-[#deddcc] bg-[#fffef1] px-[21px] py-[20px]">
                <h2 className="text-[15px] font-medium">Tags</h2>

                <div className="mt-[33px] flex gap-[7px]">
                  <input
                    placeholder="Add tag..."
                    className="h-[32px] min-w-0 flex-1 rounded-md border border-black bg-[#fff3e2] px-3 text-[13px] outline-none placeholder:text-[#756e7e]"
                  />
                  <button className="h-[29px] self-center rounded-md bg-[#030018] px-[13px] text-[13px] font-semibold text-white">
                    Add
                  </button>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
