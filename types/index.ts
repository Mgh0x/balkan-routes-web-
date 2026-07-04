export type Language = "en" | "mk" | "tr";

export type LocalizedString = Record<Language, string>;

export type LocalizedStringArray = Record<Language, string[]>;

export type Tour = {
  slug: string;
  title: LocalizedString;
  location: LocalizedString;
  duration: LocalizedString;
  price: string;
  groupSize: LocalizedString;
  difficulty: LocalizedString;
  image: string;
  gallery: string[];
  description: LocalizedString;
  overview: LocalizedString;
  highlights: LocalizedStringArray;
  itinerary: LocalizedStringArray;
  included: LocalizedStringArray;
  notIncluded: LocalizedStringArray;
  mapQuery: string;
};

export type TeamMember = {
  name: string;
  role: LocalizedString;
  bio: LocalizedString;
  languages: string[];
  image: string;
};

export type BlogPost = {
  slug: string;
  title: LocalizedString;
  category: LocalizedString;
  author: string;
  date: string;
  readingTime: LocalizedString;
  coverImage: string;
  excerpt: LocalizedString;
  content: LocalizedStringArray;
};

export type Testimonial = {
  quote: LocalizedString;
  name: string;
  origin: LocalizedString;
};

export type Service = {
  title: LocalizedString;
  description: LocalizedString;
};
