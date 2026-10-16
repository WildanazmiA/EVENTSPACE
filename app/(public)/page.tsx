import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <div className="space-y-16 pb-20">
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-center sm:py-24">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Temukan Event di Samarinda
          </h1>
          <p className="text-muted-foreground sm:text-lg">
            Temukan konser, workshop, festival, komunitas, dan berbagai event menarik
            di Samarinda dan sekitarnya.
          </p>
          <div className="mx-auto max-w-xl">
            <SearchBar size="lg" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 lg:px-8">
        <CategoryFilter />
      </section>

      {geoCandidates.length > 0 ? (
        <section className="mx-auto max-w-6xl space-y-4 px-4 lg:px-8">
          <h2 className="text-xl font-semibold tracking-tight">Event Terdekat</h2>
          <NearbyEvents candidates={geoCandidates} favoritedIds={favoritedIds} />
        </section>
      ) : null}

      {thisWeek.length > 0 ? (
        <section className="mx-auto max-w-6xl space-y-4 px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Event Minggu Ini</h2>
            <Link
              href="/events?dateRange=week"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Lihat semua
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <EventGrid events={thisWeek} favoritedIds={favoritedIds} />
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl space-y-4 px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Event Mendatang</h2>
          <Link
            href="/events"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Lihat semua
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <EventGrid
          events={upcoming}
          emptyMessage="Belum ada event mendatang. Coba lagi nanti."
          favoritedIds={favoritedIds}
        />
      </section>
    </div>
  );
}
