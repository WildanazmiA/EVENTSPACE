import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import type { EventStatus } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventTable } from "@/components/admin/event-table";
import { Pagination } from "@/components/shared/pagination";
import { ToastOnParam } from "@/components/admin/toast-on-param";
import { getAdminEvents } from "@/lib/data/events";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kelola Event",
  robots: { index: false, follow: false },
};

const STATUS_TABS: { label: string; value: EventStatus | "ALL" }[] = [
  { label: "Semua", value: "ALL" },
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Finished", value: "FINISHED" },
];

type EventsPageProps = {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
};

export default async function AdminEventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search?.trim() || undefined;
  const status = (params.status as EventStatus | "ALL" | undefined) ?? "ALL";

  const { events, totalPages } = await getAdminEvents({ page, search, status });

  function buildHref(overrides: { page?: number; status?: string }) {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    next.set("status", overrides.status ?? status);
    next.set("page", String(overrides.page ?? page));
    return `/admin/events?${next.toString()}`;
  }

  return (
    <div className="space-y-6">
      <ToastOnParam param="created" message="Event berhasil dibuat" />
      <ToastOnParam param="updated" message="Event berhasil diperbarui" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Kelola Event</h1>
          <p className="text-sm text-muted-foreground">
            Semua event yang kamu kelola di EventSpace.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/events/create">
            <Plus className="size-4" aria-hidden="true" />
            Tambah event
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {STATUS_TABS.map((tab) => (
            <Link
              key={tab.value}
              href={buildHref({ status: tab.value, page: 1 })}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                status === tab.value
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <form method="GET" className="flex items-center gap-2">
          <input type="hidden" name="status" value={status} />
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Cari nama event..."
              className="w-56 pl-9"
            />
          </div>
        </form>
      </div>

      <EventTable
        events={events}
        emptyAction={
          <Button asChild size="sm">
            <Link href="/admin/events/create">Tambah event pertama</Link>
          </Button>
        }
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        buildHref={(p) => buildHref({ page: p })}
      />
    </div>
  );
}
