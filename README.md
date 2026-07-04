# Balkan Routes

Premium multilingual tourism agency website for a university project. Built with Next.js App Router, TypeScript, Tailwind CSS, reusable React components, local data files, client-side language switching, accessible forms, and cookie preferences.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Newsletter And Confirmation Email

Newsletter submissions post to `app/api/newsletter/route.ts` and are saved in `data/newsletter-subscribers.json`.

After a new subscriber is saved, the server tries to send a confirmation email using the first configured provider:

- Resend when `RESEND_API_KEY` is available.
- SMTP when `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are available.

Copy `.env.example` to `.env.local`, add real credentials, then restart the dev server. Without email credentials, the newsletter still saves subscribers but returns `confirmationEmail: "not_configured"`.

For production on serverless hosting, replace the JSON subscriber file with a durable database such as Supabase or Neon.

## Contact And Trip Requests

Contact form submissions post to `app/api/contact/route.ts` and custom trip requests post to `app/api/trip-request/route.ts`.

Both routes:

- validate required fields on the server,
- save submissions in `data/contact-submissions.json` or `data/trip-requests.json`,
- send an internal notification to `CONTACT_TO_EMAIL`,
- send the visitor an English + Macedonian confirmation email.

## Project Structure

```text
app/                  App Router pages, dynamic tour/blog routes, metadata
components/           Shared UI, cards, layout, forms, cookie system
components/home/      Homepage composition
components/pages/     Client page compositions for localized content
data/                 Tours, blog posts, services, team, testimonials, images
lib/                  Localization helpers
public/images/        Local poster and replaceable image assets
public/videos/        Add north-macedonia-hero.mp4 here
translations/         English, Macedonian, and Turkish dictionaries
types/                Shared TypeScript content types
```

## Replacing Images And Video

The hero poster is `public/images/hero-poster.jpg`.

To use your own North Macedonia hero footage, add:

```text
public/videos/north-macedonia-hero.mp4
```

The hero component already points to that path. If the video is missing or cannot load, the poster remains visible and the hero text stays readable.

Photography is centralized in `data/images.ts` and points to local files in `public/images/`. The current image set was extracted from the supplied North Macedonia source video, so the site does not depend on external stock photography.

## Editing Translations

Visible navigation labels, buttons, headings, form labels, policy copy, cookie text, and repeated UI labels live in:

```text
translations/en.ts
translations/mk.ts
translations/tr.ts
```

Tour, team, blog, service, and testimonial content is localized inside the matching files in `data/`.

## Adding A Tour

Add a new object to `data/tours.ts` with a unique `slug`, localized fields, image, gallery, itinerary, included/not included lists, and `mapQuery`. The `/tours` page and `/tours/[slug]` detail route update automatically.

## Adding A Blog Post

Add a new object to `data/blog.ts` with a unique `slug`, localized title/category/excerpt/content, author, date, reading time, and cover image. The `/blog` page and `/blog/[slug]` detail route update automatically.

## Notes

Contact, custom trip, and newsletter forms are backed by local API routes and can send real email when provider credentials are configured.
