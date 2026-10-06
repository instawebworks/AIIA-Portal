import Image from "next/image";
import type { ReactNode } from "react";

export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/aiia-logo.png"
      alt="AIIA - Australian Information Industry Association"
      width={500}
      height={500}
      priority
      className={className}
    />
  );
}

export function SiteHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="border-b border-brand-sand bg-white">
      <div className="h-1 bg-brand-red" />
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo className="h-14 w-14" />
          <div className="hidden sm:block">
            <p className="font-heading text-base font-semibold leading-tight text-brand-black">Member Portal</p>
            <p className="text-xs text-brand-grey">Australian Information Industry Association</p>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="h-1 bg-brand-yellow" />
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} Australian Information Industry Association. ABN 19 008 568 036
        </p>
        <nav className="flex gap-5">
          <a href="https://aiia.com.au/" className="transition hover:text-white" target="_blank" rel="noreferrer">
            aiia.com.au
          </a>
          <a
            href="https://aiia.com.au/privacy/"
            className="transition hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  );
}
