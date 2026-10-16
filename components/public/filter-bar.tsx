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

export function FilterBar({ values }: { values: FilterBarValues }) {
  return (
    <form method="GET" action="/events" className="space-y-3">
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

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <Select name="category" defaultValue={values.category || "all"}>
          <SelectTrigger aria-label="Kategori">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua kategori</SelectItem>
            {EVENT_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="city" defaultValue={values.city || "all"}>
          <SelectTrigger aria-label="Kota">
            <SelectValue placeholder="Kota" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua kota</SelectItem>
            {EVENT_CITIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="dateRange" defaultValue={values.dateRange || "all"}>
          <SelectTrigger aria-label="Tanggal">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DATE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="price" defaultValue={values.price || "all"}>
          <SelectTrigger aria-label="Harga">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRICE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="status" defaultValue={values.status || "all"}>
          <SelectTrigger aria-label="Status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select name="sort" defaultValue={values.sort || "newest"}>
          <SelectTrigger aria-label="Urutkan">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" size="sm">
          Terapkan filter
        </Button>
        <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground hover:underline">
          Reset
        </Link>
      </div>
    </form>
  );
}
