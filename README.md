# NOIR FRAMES STUDIO

A premium dark-themed static photography studio website built with HTML, CSS and vanilla JavaScript. The project is designed as a front-end portfolio, demo inquiry site and photography brand concept for a fictional studio named NOIR FRAMES STUDIO.

## Live demo placeholder

No live deployment URL is currently configured. This project is intended to be deployed as a static site on Vercel when ready.

## Demo notice

This is a portfolio/demo project. All studio details, contact information, pricing, testimonials and photography work are illustrative placeholder content and not real business information.

## Technology stack

- HTML5
- CSS3
- Vanilla JavaScript
- Static assets only
- No backend, database or framework used

## Features

- Premium cinematic dark aesthetic
- Sticky transparent-to-dark navigation
- Full-screen hero section with brand messaging
- Portfolio with category filtering
- Interactive lightbox gallery
- Service cards and WhatsApp enquiry integration
- Pricing section with package enquiries
- Testimonial carousel
- FAQ accordion
- Inquiry form with client-side validation
- Back-to-top button
- Responsive layout for mobile and desktop

## Website sections

- Hero
- Brand statement
- Portfolio gallery
- Services
- Signature visual section
- About studio
- Process overview
- Pricing packages
- Testimonials
- FAQ
- Social gallery
- Contact and inquiry
- Footer

## Project structure

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
```

## How to run locally

1. Open the project folder in your browser.
2. Double-click `index.html` to preview the site.
3. You can also serve the folder with any static file server, but it is not required.

## Vercel deployment instructions

1. Push this project to a GitHub repository.
2. Open Vercel and import the repository.
3. Select the repository root as the project root.
4. Use default static deployment settings.
5. Keep `index.html` at the root.
6. Deploy the project as a static site.

No build command, backend or environment variables are required.

## Customization instructions

All important business information is kept in the `STUDIO_CONFIG` object at the start of `script.js`.

Update the following values as needed:

```js
const STUDIO_CONFIG = {
  name: 'NOIR FRAMES STUDIO',
  tagline: 'Every Frame Tells a Story.',
  description: 'Cinematic photography for life\'s most meaningful moments.',
  phoneDisplay: '+91 98765 43210',
  phoneLink: '919876543210',
  whatsappNumber: '919876543210',
  email: 'hello@example.com',
  address: 'Demo Address, Mumbai, Maharashtra, India',
  instagramUrl: 'https://www.instagram.com/',
  mapsUrl: 'https://maps.google.com/',
  availabilityNote: 'Bookings open for the upcoming season',
  demoMode: true
};
```

When `demoMode` is true, the site clearly presents the contact information as demo content.

## WhatsApp configuration

- The site uses the WhatsApp number from `STUDIO_CONFIG.whatsappNumber`.
- All enquiry buttons and form submissions use this shared configuration.
- Do not hardcode the number across multiple sections.
- For a real studio, replace the demo number and update the contact details in `script.js`.

## Image licensing and replacement notes

The site uses publicly sourced Unsplash imagery as demo placeholders to match the premium photography aesthetic.

When preparing a production version:

- replace the demo URLs with licensed or owned images,
- keep alt text descriptive,
- maintain similar aspect ratios,
- ensure the photography matches the brand tone and story,
- keep the layout stable if any image fails to load.

## No backend policy

This project intentionally does not include any backend, database, authentication flow or API. The inquiry form never claims to save data; instead, it validates user input and opens WhatsApp with a pre-filled message so the user can send it manually.

## Developer credit

Developer: Akash Manna

## Portfolio/demo purpose

This project exists as a fictional studio showcase and frontend demo to demonstrate premium design, editorial layout, photography brand storytelling and inquiry UX without relying on a real business setup.
