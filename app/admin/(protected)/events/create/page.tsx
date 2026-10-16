import type { Metadata } from "next";

import { EventForm } from "@/components/admin/event-form";
import { createEventAction } from "@/lib/actions/event-actions";

export const metadata: Metadata = {
  title: "Tambah Event",
  robots: { index: false, follow: false },
};

export default function CreateEventPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tambah event</h1>
        <p className="text-sm text-muted-foreground">
          Lengkapi detail event yang akan ditampilkan di EventSpace.
        </p>
      </div>
      <EventForm action={createEventAction} submitLabel="Simpan event" />
    </div>
  );
}
