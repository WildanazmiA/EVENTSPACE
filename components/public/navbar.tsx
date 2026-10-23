import Link from "next/link";
import { CalendarDays, LayoutDashboard } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions/auth-actions";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-[#b8d5bf]/70 bg-[#daf1de]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[#daf1de]/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[3px_3px_8px_#a9c9b0,-3px_-3px_8px_#ffffff]">
            <CalendarDays className="size-[18px]" aria-hidden="true" />
          </span>
          EventSpace
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          <Link href="/events" className="text-muted-foreground transition-colors hover:text-foreground">
            Event
          </Link>
          {user ? (
            <Link href="/favorites" className="text-muted-foreground transition-colors hover:text-foreground">
              Favorit
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {user.role === "ADMIN" ? (
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link href="/admin/dashboard">
                    <LayoutDashboard className="size-4" aria-hidden="true" />
                    Dashboard
                  </Link>
                </Button>
              ) : null}
              <span className="hidden text-sm text-muted-foreground md:inline">{user.name}</span>
              <form action={logoutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Keluar
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Masuk</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Daftar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
