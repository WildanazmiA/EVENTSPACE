import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type PaginationProps = {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export function Pagination({ page, totalPages, buildHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Navigasi halaman"
      className="flex items-center justify-center gap-2"
    >
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          page <= 1 && "pointer-events-none opacity-50"
        )}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Sebelumnya
      </Link>
      <span className="px-2 text-sm text-muted-foreground">
        Halaman {page} dari {totalPages}
      </span>
      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          page >= totalPages && "pointer-events-none opacity-50"
        )}
      >
        Berikutnya
        <ChevronRight className="size-4" aria-hidden="true" />
      </Link>
    </nav>
  );
}
