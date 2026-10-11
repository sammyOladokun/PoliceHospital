import { CalendarBlank, DownloadSimple, ImageSquare, MagnifyingGlass, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import ambulanceImg from "../../../../assets/ambulance.jpeg";
import buildingImg from "../../../../assets/building.jpeg";
import dentalImg from "../../../../assets/dental.jpeg";
import heroImg from "../../../../assets/hero.jpeg";
import labImg from "../../../../assets/lab.jpeg";
import pharmacyImg from "../../../../assets/pharmacy.jpeg";
import { CmsShell } from "../_components/CmsShell";

const mediaItems = [
  { title: "Hospital Building", type: "JPG", size: "1.8 MB", used: "Home hero", image: buildingImg },
  { title: "Care Team", type: "JPG", size: "2.4 MB", used: "About page", image: heroImg },
  { title: "Ambulance", type: "JPG", size: "980 KB", used: "Facilities", image: ambulanceImg },
  { title: "Dental Clinic", type: "JPG", size: "1.2 MB", used: "Services", image: dentalImg },
  { title: "Laboratory", type: "JPG", size: "1.1 MB", used: "Diagnostics", image: labImg },
  { title: "Pharmacy", type: "JPG", size: "940 KB", used: "Pharmacy", image: pharmacyImg }
];

export default function CmsMediaPage() {
  return (
    <CmsShell active="/cms/media">
      <div className="px-4 py-6 sm:px-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[20px] font-semibold leading-none">Media Library</h1>
            <p className="mt-2 text-[14px] leading-5 text-[#6b6478]">Upload, organize, and reuse website images and documents.</p>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-[#6b6478]">
            <CalendarBlank size={16} />
            <span>10/2/2026</span>
          </div>
        </div>

        <section className="mt-6 rounded-[16px] border border-[#dedede] bg-white p-[21px]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-[#dedede] px-3 text-[#6b6478]">
              <MagnifyingGlass size={16} />
              <span className="text-[14px]">Search media</span>
            </div>
            <button className="flex h-10 items-center gap-2 rounded-md bg-[#030018] px-3 text-[13px] font-semibold text-white">
              <Plus size={15} weight="bold" />
              Upload Asset
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mediaItems.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[14px] border border-[#ededed] bg-white">
                <div className="relative h-44 bg-[#f6f7fa]">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-[14px] font-semibold">{item.title}</h2>
                      <p className="mt-1 text-[12px] text-[#6b6478]">{item.type} · {item.size}</p>
                    </div>
                    <ImageSquare size={20} className="shrink-0 text-[#2563ff]" />
                  </div>
                  <p className="mt-3 text-[13px] text-[#6b6478]">Used in: {item.used}</p>
                  <div className="mt-4 flex gap-2">
                    <button className="flex h-8 flex-1 items-center justify-center gap-2 rounded-md border border-[#dedede] text-[12px] font-semibold">
                      <DownloadSimple size={14} />
                      Download
                    </button>
                    <button aria-label={`Delete ${item.title}`} className="flex h-8 w-8 items-center justify-center rounded-md border border-[#ffd8d0] text-[#ff4d1d]">
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
