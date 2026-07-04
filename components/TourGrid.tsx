"use client";

import { TourCard } from "@/components/TourCard";
import type { Tour } from "@/types";

export function TourGrid({ tours }: { tours: Tour[] }) {
  return (
    <div className="motion-list grid gap-0 border-t border-[var(--line)]">
      {tours.map((tour, index) => (
        <TourCard key={tour.slug} tour={tour} index={index} />
      ))}
    </div>
  );
}
