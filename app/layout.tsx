import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MotionObserver } from "@/components/MotionObserver";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skopje-routes.local"),
  title: {
    default: "Skopje Routes | Private Tours in North Macedonia",
    template: "%s | Skopje Routes",
  },
  description:
    "Skopje Routes is a Skopje-based tourism agency creating private tours, day trips, local experiences, airport transfers, and custom journeys across North Macedonia.",
  openGraph: {
    title: "Skopje Routes | Private Tours in North Macedonia",
    description:
      "Private journeys, local stories, and unforgettable landscapes across North Macedonia.",
    siteName: "Skopje Routes",
    type: "website",
    images: ["/images/hero-poster.jpg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <LanguageProvider>
          <MotionObserver />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
