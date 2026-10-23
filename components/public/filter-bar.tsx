"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_CATEGORIES, EVENT_CITIES } from "@/lib/validation/event";

export type FilterBarValues = {
  search?: string;
  category?: string;
  city?: string;
  dateRange?: string;
  price?: string;
  status?: string;
  sort?: string;
};

const DATE_OPTIONS = [
  { value: "all", label: "Semua tanggal" },
  { value: "today", label: "Hari ini" },
  { value: "week", label: "Minggu ini" },
  { value: "month", label: "Bulan ini" },
];

const PRICE_OPTIONS = [
  { value: "all", label: "Semua harga" },
  { value: "free", label: "Gratis" },
  { value: "paid", label: "Berbayar" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Semua status" },
  { value: "upcoming", label: "Akan datang" },
  { value: "finished", label: "Selesai" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Terbaru" },
  { value: "soonest", label: "Tanggal terdekat" },
  { value: "popular", label: "Event populer" },
];

function getCategoryHref(category: string, values: FilterBarValues) {
  const params = new URLSearchParams();

  if (values.search) params.set("search", values.search);
  if (values.city && values.city !== "all") params.set("city", values.city);
  if (values.dateRange && values.dateRange !== "all") {
    params.set("dateRange", values.dateRange);
  }
  if (values.price && values.price !== "all") {
    params.set("price", values.price);
  }
  if (values.status && values.status !== "all") {
    params.set("status", values.status);
  }
  if (values.sort && values.sort !== "newest") {
    params.set("sort", values.sort);
  }

  if (category) params.set("category", category);

  const query = params.toString();
  return query ? `/events?${query}` : "/events";
}

export function FilterBar({ values }: { values: FilterBarValues }) {
  return (
    <form method="GET" action="/events" className="space-y-5">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          name="search"
          defaultValue={values.search}
          placeholder="Cari event..."
          className="pl-9"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Kategori</p>
        <div className="flex flex-wrap gap-2">
          {EVENT_CATEGORIES.map((category) => {
            const isActive = values.category === category;

            return (
              <Link
                key={category}
                href={getCategoryHref(
                  isActive ? "" : category,
                  values,
                )}
                aria-pressed={isActive}
                className={
                  isActive
                    ? "rounded-full border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[3px_3px_8px_#a9c9b0,-3px_-3px_8px_#ffffff]"
                    : "rounded-full border border-white/80 bg-[#e4f2e6] px-4 py-2 text-sm font-medium shadow-[3px_3px_8px_#a9c9b044,-3px_-3px_8px_#ffffff88] transition hover:-translate-y-0.5 hover:bg-secondary"
                }
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <Select name="city" defaultValue={values.city || "all"}>
          <SelectTrigger aria-label="Kota">
            <SelectValue placeholder="Kota" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua kota</SelectItem>
            {EVENT_CITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="dateRange" defaultValue={values.dateRange || "all"}>
          <SelectTrigger aria-label="Tanggal">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DATE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="price" defaultValue={values.price || "all"}>
          <SelectTrigger aria-label="Harga">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRICE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="status" defaultValue={values.status || "all"}>
          <SelectTrigger aria-label="Status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="sort" defaultValue={values.sort || "newest"}>
          <SelectTrigger aria-label="Urutkan">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" size="sm">
          Terapkan filter
        </Button>
        <Link
          href="/events"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          Reset
        </Link>
      </div>
    </form>
  );
}
