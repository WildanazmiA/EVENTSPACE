import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Event } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/public/favorite-button";
import { formatEventDateRange, formatPrice } from "@/lib/events/format";

type EventCardProps = {
  event: Event;
  distanceKm?: number;
  isFavorited?: boolean;
  showFavorite?: boolean;
};

export function EventCard({
  event,
  distanceKm,
  isFavorited = false,
  showFavorite = true,
}: EventCardProps) {
  return (
    <div className="group/card overflow-hidden rounded-[1.35rem] border border-white/80 bg-card shadow-[7px_7px_18px_#a9c9b066,-6px_-6px_18px_#ffffffa8] transition duration-300 hover:-translate-y-1 hover:shadow-[12px_14px_28px_#91b59a80,-5px_-5px_14px_#ffffffb3]">
      <div className="group relative">
        <Link href={`/events/${event.slug}`} className="block overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              <Badge variant="secondary">{event.category}</Badge>
              {event.status === "CANCELLED" ? (
                <Badge variant="destructive">Dibatalkan</Badge>
              ) : null}
              {event.status === "FINISHED" ? <Badge variant="outline">Selesai</Badge> : null}
            </div>
            {distanceKm != null ? (
              <div className="absolute bottom-2 left-2 rounded-full bg-background/90 px-2 py-0.5 text-xs font-medium">
                {distanceKm < 1
                  ? `${Math.round(distanceKm * 1000)} m`
                  : `${distanceKm.toFixed(1)} km`}
              </div>
            ) : null}
          </div>
        </Link>
        {showFavorite ? (
          <div className="absolute right-3 top-3">
            <FavoriteButton eventId={event.id} initialFavorited={isFavorited} />
          </div>
        ) : null}
      </div>

      <div className="space-y-2 p-4 sm:p-5">
        <Link href={`/events/${event.slug}`} className="block">
          <h3 className="line-clamp-2 font-semibold leading-snug hover:underline">
            {event.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {formatEventDateRange(event.startDate, event.endDate)} &middot; {event.startTime}
        </p>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {event.location}, {event.city}
          </span>
        </p>
        <p className="pt-1 text-sm font-medium">{formatPrice(event.price)}</p>
      </div>
    </div>
  );
}
