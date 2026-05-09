import { announcementText } from "@/data/homepage";

export function AnnouncementBar() {
  return (
    <div className="border-b border-zinc-200/70 bg-white">
      <p className="py-3 text-center text-[11px] uppercase tracking-[0.2em] text-zinc-600">{announcementText}</p>
    </div>
  );
}
