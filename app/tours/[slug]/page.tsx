import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourDetailClient } from "@/components/pages/TourDetailClient";
import { tours } from "@/data/tours";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((item) => item.slug === slug);

  if (!tour) {
    return { title: "Tour not found" };
  }

  return {
    title: tour.title.en,
    description: tour.description.en,
    alternates: {
      canonical: `/tours/${tour.slug}`,
    },
    openGraph: {
      title: tour.title.en,
      description: tour.description.en,
      images: [tour.image],
    },
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = tours.find((item) => item.slug === slug);

  if (!tour) {
    notFound();
  }

  const relatedTours = tours.filter((item) => item.slug !== tour.slug).slice(0, 3);
  return <TourDetailClient tour={tour} relatedTours={relatedTours} />;
}
