"use client";

import type { ComponentType, FormEvent } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Article,
  CalendarBlank,
  ChartBar,
  FolderOpen,
  Gear,
  House,
  ImageSquare,
  MagnifyingGlass,
  NotePencil,
  Plus,
  Trash,
  Users,
  X
} from "@phosphor-icons/react/dist/ssr";
import brandLogo from "../../../../assets/brand_logo.png";

type IconType = ComponentType<{ size?: number; weight?: "regular" | "fill" | "bold"; className?: string }>;
type NavHref = "/cms" | "/cms/posts" | "/cms/pages" | "/cms/media" | "/cms/users" | "/cms/analytics" | "/cms/settings";
type PostStatus = "Published" | "Draft" | "Review";

type CmsPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  status: PostStatus;
  author: string;
  updatedAt: string;
  views: number;
};

type PostForm = Omit<CmsPost, "id" | "updatedAt" | "views">;

const navItems: { label: string; icon: IconType; href: NavHref; active?: boolean }[] = [
  { label: "Dashboard", icon: House, href: "/cms" },
  { label: "Posts", icon: Article, href: "/cms/posts", active: true },
  { label: "Pages", icon: FolderOpen, href: "/cms/pages" },
  { label: "Media Library", icon: ImageSquare, href: "/cms/media" },
  { label: "Users", icon: Users, href: "/cms/users" },
  { label: "Analytics", icon: ChartBar, href: "/cms/analytics" },
  { label: "Settings", icon: Gear, href: "/cms/settings" }
];

const initialPosts: CmsPost[] = [
  {
    id: 1,
    title: "Emergency Department Upgrade",
    slug: "emergency-department-upgrade",
    excerpt: "A look at the hospital's expanded emergency response capacity and improved patient flow.",
    body: "Police Hospital has improved emergency triage, ambulance reception, and clinical coordination to support faster care decisions.",
    category: "News",
    status: "Published",
    author: "Admin",
    updatedAt: "Oct 1, 2026",
    views: 3420
  },
  {
    id: 2,
    title: "Antenatal Clinic Schedule",
    slug: "antenatal-clinic-schedule",
    excerpt: "Updated clinic days, booking guidance, and visit preparation notes for expecting mothers.",
    body: "The antenatal clinic now runs structured booking windows for first visits, follow-up checks, and ultrasound referrals.",
    category: "Clinic Update",
    status: "Draft",
    author: "Matron A.",
    updatedAt: "Sep 29, 2026",
    views: 814
  },
  {
    id: 3,
    title: "Free Community Health Screening",
    slug: "free-community-health-screening",
    excerpt: "Preventive health checks for blood pressure, blood sugar, dental care, and general consultation.",
    body: "The hospital will host a community screening programme with nurses, physicians, pharmacists, and laboratory staff.",
    category: "Outreach",
    status: "Review",
    author: "Dr. Okafor",
    updatedAt: "Sep 27, 2026",
    views: 1902
  }
];

const emptyForm: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  category: "News",
  status: "Draft",
  author: "Admin"
};

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Sidebar() {
  return (
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

function StatusBadge({ status }: { status: PostStatus }) {
  const tone =
    status === "Published"
      ? "bg-[#e8f8ef] text-[#008f48]"
      : status === "Review"
        ? "bg-[#fff8df] text-[#b77900]"
        : "bg-[#f1f2f5] text-[#6b6478]";

  return <span className={`inline-flex rounded-md px-2 py-1 text-[12px] font-semibold ${tone}`}>{status}</span>;
}

export default function CmsPostsPage() {
  const [posts, setPosts] = useState<CmsPost[]>(initialPosts);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PostStatus>("All");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<PostForm>(emptyForm);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesStatus = statusFilter === "All" || post.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery) ||
        post.author.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [posts, query, statusFilter]);

  const selectedPost = posts.find((post) => post.id === editingId) ?? null;

  function closeEditor() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function startEdit(post: CmsPost) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body,
      category: post.category,
      status: post.status,
      author: post.author
    });
  }

  function deletePost(postId: number) {
    const nextPosts = posts.filter((post) => post.id !== postId);
    setPosts(nextPosts);

    if (editingId === postId) {
      closeEditor();
    }
  }

  function updateField<Key extends keyof PostForm>(key: Key, value: PostForm[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === "title" && !current.slug ? { slug: makeSlug(String(value)) } : {})
    }));
  }

  function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: PostForm = {
      ...form,
      title: form.title.trim(),
      slug: form.slug.trim() || makeSlug(form.title),
      excerpt: form.excerpt.trim(),
      body: form.body.trim(),
      category: form.category.trim(),
      author: form.author.trim()
    };

    if (!payload.title || !payload.slug) return;

    if (editingId) {
      setPosts((current) =>
        current.map((post) => (post.id === editingId ? { ...post, ...payload, updatedAt: "Oct 2, 2026" } : post))
      );
      closeEditor();
      return;
    }

    const newPost: CmsPost = {
      ...payload,
      id: Date.now(),
      updatedAt: "Oct 2, 2026",
      views: 0
    };

    setPosts((current) => [newPost, ...current]);
    setEditingId(newPost.id);
  }

  return (
    <main className="min-h-screen bg-white text-black lg:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-12 items-center justify-between border-b border-[#dedede] bg-white px-4 sm:px-[21px] lg:hidden">
          <Link href="/cms" className="text-[16px] font-semibold">
            Content Management System
          </Link>
          <Link href="/cms/posts/new" aria-label="Create new post" className="flex h-8 w-8 items-center justify-center rounded-md bg-[#030018] text-white">
            <Plus size={16} weight="bold" />
          </Link>
        </header>

        <div className="px-4 py-6 sm:px-[21px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[20px] font-semibold leading-none text-black">Posts</h1>
              <p className="mt-2 text-[14px] leading-5 text-[#6b6478]">Create, update, publish, and remove hospital website posts.</p>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#6b6478]">
              <CalendarBlank size={16} />
              <span>10/2/2026</span>
            </div>
          </div>

          <div className="mt-6">
            <section className="rounded-[16px] border border-[#dedede] bg-white p-[21px]">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-[#dedede] px-3 text-[#6b6478]">
                  <MagnifyingGlass size={16} className="shrink-0" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search posts"
                    className="min-w-0 flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#6b6478]"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {(["All", "Published", "Draft", "Review"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`h-10 rounded-md px-3 text-[13px] font-semibold ${
                        statusFilter === status ? "bg-[#030018] text-white" : "border border-[#dedede] bg-white text-black"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                  <Link href="/cms/posts/new" className="flex h-10 items-center gap-2 rounded-md bg-[#030018] px-3 text-[13px] font-semibold text-white">
                    <Plus size={15} weight="bold" />
                    New
                  </Link>
                </div>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#ededed] text-[12px] uppercase text-[#6b6478]">
                      <th className="py-3 font-semibold">Title</th>
                      <th className="py-3 font-semibold">Category</th>
                      <th className="py-3 font-semibold">Status</th>
                      <th className="py-3 font-semibold">Author</th>
                      <th className="py-3 font-semibold">Updated</th>
                      <th className="py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="border-b border-[#f0f0f0] text-[14px] last:border-0">
                        <td className="max-w-[270px] py-4">
                          <button onClick={() => startEdit(post)} className="text-left">
                            <span className="block truncate font-semibold text-black">{post.title}</span>
                            <span className="mt-1 block truncate text-[12px] text-[#6b6478]">/{post.slug}</span>
                          </button>
                        </td>
                        <td className="py-4 text-[#6b6478]">{post.category}</td>
                        <td className="py-4">
                          <StatusBadge status={post.status} />
                        </td>
                        <td className="py-4 text-[#6b6478]">{post.author}</td>
                        <td className="py-4 text-[#6b6478]">{post.updatedAt}</td>
                        <td className="py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => startEdit(post)}
                              aria-label={`Edit ${post.title}`}
                              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dedede] text-black"
                            >
                              <NotePencil size={15} />
                            </button>
                            <button
                              onClick={() => deletePost(post.id)}
                              aria-label={`Delete ${post.title}`}
                              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#ffd8d0] text-[#ff4d1d]"
                            >
                              <Trash size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="mt-5 rounded-[12px] border border-dashed border-[#dedede] p-8 text-center">
                  <p className="text-[14px] font-semibold text-black">No posts found</p>
                  <p className="mt-1 text-[13px] text-[#6b6478]">Try a different search or create a new post.</p>
                </div>
              ) : null}
            </section>

            {editingId ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030018]/35 px-4 py-6 backdrop-blur-md">
                <section className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[16px] border border-[#dedede] bg-white p-[21px] shadow-[0_28px_90px_rgba(3,0,24,0.28)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-[16px] font-semibold text-black">Edit Post</h2>
                      <p className="mt-1 text-[13px] leading-5 text-[#6b6478]">
                        {selectedPost ? `Editing ${selectedPost.title}` : "Update content details and publishing state."}
                      </p>
                    </div>
                    <button onClick={closeEditor} aria-label="Close editor" className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dedede]">
                      <X size={15} />
                    </button>
                  </div>

                  <form onSubmit={savePost} className="mt-5 space-y-4">
                <label className="block">
                  <span className="text-[12px] font-semibold uppercase text-[#6b6478]">Title</span>
                  <input
                    value={form.title}
                    onChange={(event) => updateField("title", event.target.value)}
                    className="mt-2 h-10 w-full rounded-md border border-[#dedede] px-3 text-[14px] outline-none focus:border-[#2563ff]"
                    placeholder="Post title"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-[12px] font-semibold uppercase text-[#6b6478]">Slug</span>
                  <input
                    value={form.slug}
                    onChange={(event) => updateField("slug", makeSlug(event.target.value))}
                    className="mt-2 h-10 w-full rounded-md border border-[#dedede] px-3 text-[14px] outline-none focus:border-[#2563ff]"
                    placeholder="post-url-slug"
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[12px] font-semibold uppercase text-[#6b6478]">Category</span>
                    <input
                      value={form.category}
                      onChange={(event) => updateField("category", event.target.value)}
                      className="mt-2 h-10 w-full rounded-md border border-[#dedede] px-3 text-[14px] outline-none focus:border-[#2563ff]"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[12px] font-semibold uppercase text-[#6b6478]">Status</span>
                    <select
                      value={form.status}
                      onChange={(event) => updateField("status", event.target.value as PostStatus)}
                      className="mt-2 h-10 w-full rounded-md border border-[#dedede] bg-white px-3 text-[14px] outline-none focus:border-[#2563ff]"
                    >
                      <option>Draft</option>
                      <option>Review</option>
                      <option>Published</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-[12px] font-semibold uppercase text-[#6b6478]">Author</span>
                  <input
                    value={form.author}
                    onChange={(event) => updateField("author", event.target.value)}
                    className="mt-2 h-10 w-full rounded-md border border-[#dedede] px-3 text-[14px] outline-none focus:border-[#2563ff]"
                  />
                </label>

                <label className="block">
                  <span className="text-[12px] font-semibold uppercase text-[#6b6478]">Excerpt</span>
                  <textarea
                    value={form.excerpt}
                    onChange={(event) => updateField("excerpt", event.target.value)}
                    className="mt-2 min-h-[82px] w-full resize-none rounded-md border border-[#dedede] px-3 py-2 text-[14px] outline-none focus:border-[#2563ff]"
                    placeholder="Short summary for cards and previews"
                  />
                </label>

                <label className="block">
                  <span className="text-[12px] font-semibold uppercase text-[#6b6478]">Body</span>
                  <textarea
                    value={form.body}
                    onChange={(event) => updateField("body", event.target.value)}
                    className="mt-2 min-h-[160px] w-full resize-y rounded-md border border-[#dedede] px-3 py-2 text-[14px] leading-6 outline-none focus:border-[#2563ff]"
                    placeholder="Write the post content"
                  />
                </label>

                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                      <button type="button" onClick={closeEditor} className="h-10 rounded-md border border-[#dedede] px-4 text-[14px] font-semibold text-black">
                        Cancel
                      </button>
                      <button type="submit" className="flex h-10 items-center justify-center gap-2 rounded-md bg-[#030018] px-4 text-[14px] font-semibold text-white">
                        <NotePencil size={16} />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
