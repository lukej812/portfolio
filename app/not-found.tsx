import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-start justify-center px-4 sm:px-6">
      <p className="label text-signal">404</p>
      <h1 className="mt-4 text-h1 font-semibold">This page doesn&apos;t exist.</h1>
      <p className="mt-4 text-lead text-fg-muted">But the rest of the site does.</p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-signal px-6 font-medium text-ink-950">
        Back home
      </Link>
    </section>
  );
}
