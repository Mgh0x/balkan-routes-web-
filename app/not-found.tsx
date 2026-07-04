import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[var(--ink)] px-6 pt-40 text-white">
      <div className="container-shell border-y border-white/12 py-12">
        <h1 className="font-display text-6xl leading-none md:text-7xl">Page not found</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">The page you requested is not available.</p>
        <Link href="/" className="editorial-link mt-8 border-white/35 text-white hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]">
          Return home
        </Link>
      </div>
    </section>
  );
}
