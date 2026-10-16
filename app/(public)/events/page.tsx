import type { Metadata } from "next";

import { FilterBar } from "@/components/public/filter-bar";
import { EventGrid } from "@/components/public/event-grid";
import { Pagination } from "@/components/shared/pagination";
import { getCurrentUser } from "@/lib/auth/guards";
import { getFavoritedEventIds } from "@/lib/data/favorites";
import {
  getPublicEvents,
  type DateRangeFilter,
  type PriceFilter,
  type StatusFilter,
  type SortOption,
} from "@/lib/data/public-events";

export const metadata: Metadata = {
  title: "Jelajahi Event",
  description: "Cari event berdasarkan kategori, kota, tanggal, dan harga di Samarinda dan sekitarnya.",
};

type EventsPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    city?: string;
    dateRange?: string;
    price?: string;
    status?: string;
    sort?: string;
  }>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const filters = {
    page,
    search: params.search?.trim() || undefined,
    category: params.category && params.category !== "all" ? params.category : undefined,
    city: params.city && params.city !== "all" ? params.city : undefined,
    dateRange: (params.dateRange as DateRangeFilter) || "all",
    price: (params.price as PriceFilter) || "all",
    status: (params.status as StatusFilter) || "all",
    sort: (params.sort as SortOption) || "newest",
  };

  const [{ events, totalPages }, user] = await Promise.all([
    getPublicEvents(filters),
    getCurrentUser(),
  ]);
  const favoritedIds = await getFavoritedEventIds(user?.id);

  function buildHref(targetPage: number) {
    const next = new URLSearchParams();
    if (filters.search) next.set("search", filters.search);
    if (filters.category) next.set("category", filters.category);
    if (filters.city) next.set("city", filters.city);
    if (filters.dateRange !== "all") next.set("dateRange", filters.dateRange);
    if (filters.price !== "all") next.set("price", filters.price);
    if (filters.status !== "all") next.set("status", filters.status);
    if (filters.sort !== "newest") next.set("sort", filters.sort);
    next.set("page", String(targetPage));
    return `/events?${next.toString()}`;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Jelajahi Event</h1>
        <p className="text-sm text-muted-foreground">
          Temukan event di Samarinda dan wilayah sekitarnya.
        </p>
      </div>

      <FilterBar
        values={{
          search: params.search,
          category: params.category,
          city: params.city,
          dateRange: params.dateRange,
          price: params.price,
          status: params.status,
          sort: params.sort,
        }}
      />

      <EventGrid
        events={events}
        emptyMessage="Coba ubah kata kunci atau filter yang kamu pakai."
        favoritedIds={favoritedIds}
      />

      <Pagination page={page} totalPages={totalPages} buildHref={buildHref} />
    </div>
  );
}
