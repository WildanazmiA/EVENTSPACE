import Link from "next/link";

import { EVENT_CITIES } from "@/lib/validation/event";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl gap-8 px-4 py-10 sm:grid sm:grid-cols-3 lg:px-8">
        <div className="space-y-2">
          <p className="font-semibold tracking-tight">EventSpace</p>
          <p className="text-sm text-muted-foreground">
            Platform pencarian dan discovery event lokal di Samarinda dan sekitarnya.
          </p>
        </div>

        <div className="mt-6 space-y-2 sm:mt-0">
          <p className="text-sm font-medium">Wilayah</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {EVENT_CITIES.map((city) => (
              <li key={city}>
                <Link href={`/events?city=${encodeURIComponent(city)}`} className="hover:text-foreground hover:underline">
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 space-y-2 sm:mt-0">
          <p className="text-sm font-medium">Tautan</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>
              <Link href="/events" className="hover:text-foreground hover:underline">
                Jelajahi event
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-foreground hover:underline">
                Login admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-xs text-muted-foreground lg:px-8">
        &copy; {new Date().getFullYear()} EventSpace &middot; Dibuat untuk tugas akhir semester.
      </div>
    </footer>
  );
}
