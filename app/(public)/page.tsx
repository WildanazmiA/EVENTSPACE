import Link from "next/link";
import { ArrowDown, ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";

import { SearchBar } from "@/components/public/search-bar";
import { CategoryFilter } from "@/components/public/category-filter";
import { EventGrid } from "@/components/public/event-grid";
import { NearbyEvents } from "@/components/public/nearby-events";
import { getCurrentUser } from "@/lib/auth/guards";
import { getFavoritedEventIds } from "@/lib/data/favorites";
import {
  getGeoCandidateEvents,
  getThisWeekEvents,
  getUpcomingEvents,
} from "@/lib/data/public-events";

export default async function HomePage() {
  const user = await getCurrentUser();
  const [geoCandidates, thisWeek, upcoming, favoritedIds] = await Promise.all([
    getGeoCandidateEvents(),
    getThisWeekEvents(8),
    getUpcomingEvents(8),
    getFavoritedEventIds(user?.id),
  ]);

  return (
    <div className="space-y-14 pb-20 pt-6 lg:pt-10">
      <section className="mx-auto w-[calc(100%-2rem)] max-w-6xl relative isolate overflow-hidden rounded-[2rem] bg-[#0b2b26] px-6 py-10 text-[#daf1de] shadow-[0_24px_60px_-28px_#051f20aa] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,#8eb69b55,transparent_42%),radial-gradient(ellipse_at_10%_100%,#163832,transparent_48%)]" />
        <div className="absolute -right-16 -top-20 -z-10 size-72 rounded-full border border-[#8eb69b]/20 sm:right-10 sm:top-8 sm:size-96" />
        <div className="absolute right-8 top-28 -z-10 hidden h-32 w-64 rounded-full bg-[#163832] shadow-[0_20px_40px_#051f2080] sm:block" />
        <div className="absolute right-8 top-40 -z-10 hidden h-32 w-64 rounded-full bg-[#235347] shadow-[0_20px_40px_#051f2080] sm:block" />
        <div className="max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8eb69b]/35 bg-[#163832]/70 px-3 py-1.5 text-xs font-medium tracking-wide text-[#c5e1cb]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            RUANG UNTUK MOMEN BERIKUTNYA
          </span>
          <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Temukan cerita yang dimulai <span className="text-[#8eb69b]">di sini.</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-6 text-[#c4d9ca] sm:text-base">
            Konser, ruang kreatif, dan pertemuan baru di Samarinda. Pilih pengalaman yang terasa paling dekat denganmu.
          </p>
          <div className="mt-8 max-w-xl rounded-2xl bg-[#daf1de] p-2 shadow-[0_12px_30px_#051f2055] sm:rounded-full">
            <SearchBar size="lg" />
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#c4d9ca]">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden="true" /> Samarinda &amp; sekitarnya</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5" aria-hidden="true" /> Temukan agenda terbaru</span>
          </div>
        </div>
        <Link href="#agenda" className="absolute bottom-7 right-8 hidden size-11 items-center justify-center rounded-full border border-[#8eb69b]/40 text-[#daf1de] transition hover:bg-[#8eb69b]/15 sm:flex" aria-label="Jelajahi agenda">
          <ArrowDown className="size-5" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 lg:px-8">
        <CategoryFilter />
      </section>

      {geoCandidates.length > 0 ? (
        <section id="agenda" className="mx-auto max-w-6xl space-y-4 px-4 lg:px-8">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-[0.18em] text-[#54756b]">DI SEKITARMU</p>
            <h2 className="text-2xl font-semibold tracking-tight">Event Terdekat</h2>
          </div>
          <NearbyEvents candidates={geoCandidates} favoritedIds={favoritedIds} />
        </section>
      ) : null}

      {thisWeek.length > 0 ? (
        <section id={geoCandidates.length === 0 ? "agenda" : undefined} className="mx-auto max-w-6xl space-y-4 px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold tracking-[0.18em] text-[#54756b]">PILIHAN MINGGU INI</p>
              <h2 className="text-2xl font-semibold tracking-tight">Agenda minggu ini</h2>
            </div>
            <Link href="/events?dateRange=week" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Lihat semua <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <EventGrid events={thisWeek} favoritedIds={favoritedIds} />
        </section>
      ) : null}

      <section id={geoCandidates.length === 0 && thisWeek.length === 0 ? "agenda" : undefined} className="mx-auto max-w-6xl space-y-4 px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-[0.18em] text-[#54756b]">JANGAN LEWATKAN</p>
            <h2 className="text-2xl font-semibold tracking-tight">Event Mendatang</h2>
          </div>
          <Link href="/events" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Jelajahi semua <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <EventGrid events={upcoming} emptyMessage="Belum ada event mendatang. Coba lagi nanti." favoritedIds={favoritedIds} />
      </section>
    </div>
  );
}
