import type { Metadata } from "next";

import { EventGrid } from "@/components/public/event-grid";
import { requireUserOrRedirect } from "@/lib/auth/guards";
import { getFavoriteEvents } from "@/lib/data/favorites";

export const metadata: Metadata = {
  title: "Favorit Saya",
  robots: { index: false, follow: false },
};

export default async function FavoritesPage() {
  // Middleware sudah mengarahkan pengunjung yang belum login, ini
  // pengecekan independen kedua di server.
  const user = await requireUserOrRedirect();
  const events = await getFavoriteEvents(user.id);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Favorit Saya</h1>
        <p className="text-sm text-muted-foreground">
          Event yang sudah kamu simpan.
        </p>
      </div>

      <EventGrid
        events={events}
        emptyMessage="Tekan ikon hati pada sebuah event untuk menyimpannya di sini."
        favoritedIds={new Set(events.map((e) => e.id))}
      />
    </div>
  );
}
