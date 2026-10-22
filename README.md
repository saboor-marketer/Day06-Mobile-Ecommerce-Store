# iPhone Landing Page — Project Report

## Overview

A premium, responsive, conversion-focused landing page for the iPhone lineup. The experience is designed for a young, style-conscious audience and centers on a simple message: **“Your day, only better.”**

The page combines editorial product storytelling with practical shopping tools. It includes original product and lifestyle imagery, scroll-driven scenes, refined microinteractions, accessible controls, and a functional device configurator.

## Experience Goals

- Present iPhone as capable, personal, and easy to fit into everyday life.
- Balance premium visual storytelling with clear product comparison and pricing.
- Provide useful interactions instead of decorative or simulated functionality.
- Keep the purchase path transparent: configurations can be saved locally, while final purchases continue on Apple.com.
- Deliver a polished experience across mobile, tablet, and desktop, including reduced-motion preferences.

## Landing Page Structure

1. **Sticky navigation**
   - Fixed announcement bar and responsive glassmorphic navbar
   - Desktop section navigation
   - Animated mobile menu with Escape-key support
   - Direct conversion links to the product comparison section

2. **Full-viewport hero**
   - Staggered headline, copy, CTA, and pricing entrances
   - Original cinematic product imagery
   - Ambient light motion and scroll-linked image scale/parallax
   - Primary and secondary conversion paths

3. **Community social proof**
   - Three individually written customer perspectives
   - Staggered reveal animations and refined hover treatments

4. **Feature showcase**
   - Six substantive feature stories covering cameras, performance, battery, privacy, display, and durability
   - Interactive camera zoom preview
   - Responsive bento-style layout

5. **Scroll-driven product narrative**
   - Full-screen, section-scale design and camera scenes
   - Scroll-scrubbed image scale, clipping, opacity, and copy transitions
   - Progress indicator
   - Static, readable alternative for reduced-motion users

6. **Lifestyle benefits**
   - Three keyboard-accessible tabs: Make something, Feel closer, and Take a breath
   - Unique imagery, copy, and benefits for each use case
   - Animated content and media transitions

7. **Testimonials**
   - Four distinct customer stories
   - Previous/next controls and direct story pagination
   - Polite screen-reader announcements for story changes

8. **Product comparison and pricing**
   - iPhone 17 Pro, iPhone 17, iPhone Air, and iPhone 16e
   - Full-price and 24-month comparison views
   - Model-specific finishes, storage, highlights, and pricing

9. **Device configurator**
   - Finish selection with live product color updates
   - Storage selection with real price calculations
   - Optional trade-in planning estimate based on device and condition
   - Responsive desktop dialog and mobile bottom-sheet presentation
   - Focus trapping, Escape-to-close, and focus restoration
   - Local configuration saving and restoration
   - External handoff to Apple.com for final pricing and purchase

10. **FAQ, closing CTA, and footer**
    - Six animated, accessible accordion entries
    - Links to relevant Apple support and retail resources
    - Clear purchase, financing, and imagery disclosures

## Functional Behavior

### Saved configurations

Configurations are stored in the browser under:

```text
iphone-configuration
```

The saved data contains only the selected model, finish, storage, and trade-in planner inputs. No payment details or personal information are collected. Saved setups can be resumed or removed, and malformed stored values are handled defensively.

### Trade-in planner

The trade-in planner calculates a local planning estimate from the selected device and condition. It is explicitly labeled as an estimate, not an official valuation. Final credit must be confirmed by Apple after inspection.

### Purchasing

The page does not simulate a successful checkout or collect payment. The **Continue on Apple.com** action opens Apple’s iPhone shopping page, where current availability, financing, trade-in value, and purchase terms can be confirmed.

### Other interactions

- Camera zoom buttons change the displayed image scale.
- Pricing controls recalculate all visible model prices.
- Lifestyle tabs change complete content and imagery panels.
- Testimonial controls navigate real story data.
- FAQ buttons expand and collapse their associated answers.
- All internal navigation points to valid page sections.

## Design and Motion

- Clean, tightly tracked typography with a system-first Apple-style font stack
- Warm ivory surfaces, midnight scenes, soft lavender, and muted apricot accents
- Layered gradients, subtle glassmorphism, fine borders, and restrained shadows
- Custom CSS product illustrations for finish and configurator previews
- Framer Motion entrances, transitions, dialogs, carousels, and scroll transformations
- CSS ambient animation for background light and abstract product details
- Motion reduction through both `MotionConfig` and CSS media queries

## Accessibility and Responsiveness

- Semantic landmarks, headings, figures, blockquotes, fieldsets, and footer navigation
- Skip-to-content link and visible keyboard focus states
- Accessible names and pressed/expanded/selected states for controls
- Keyboard-operable tabs and dialogs
- Dialog focus trapping and restoration
- Screen-reader status announcements for saved configurations and testimonials
- Reduced-motion alternatives for major animated scenes
- Mobile-first layouts with dedicated breakpoints for phones, tablets, and desktops
- Lazy-loaded below-the-fold imagery and high-priority hero media

## Technology Stack

- **React 19** — component-based interface
- **TypeScript** — typed product data and component logic
- **Vite 7** — development and production build tooling
- **Tailwind CSS 4** — base styling pipeline and preflight
- **Custom CSS** — responsive design system and product visuals
- **Framer Motion** — animation and scroll-linked interactions
- **Lucide React** — consistent interface icons

## Project Structure

```text
.
├── public/
│   └── images/
│       ├── hero-iphone.png
│       ├── showcase-back.png
│       ├── night-camera.jpg
│       ├── lifestyle-woman.jpg
│       ├── lifestyle-man.jpg
│       └── lifestyle-friends.jpg
├── src/
│   ├── components/
│   │   ├── PhoneVisual.tsx
│   │   ├── ScrollStory.tsx
│   │   └── Shop.tsx
│   ├── App.tsx
│   ├── data.ts
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Build Verification

The production build was run successfully with:

```bash
npm run build
```

Result: Vite completed the production bundle successfully and generated `dist/index.html` with inlined application JavaScript and CSS.

## Content and Publishing Notes

- Product imagery is illustrative and was created specifically for this experience.
- Customer stories are marketing content for the page concept.
- Product specifications, model availability, financing terms, and prices should be revalidated before a live commercial launch.
- External support, privacy, accessibility, environmental, retail, and shopping links lead to Apple’s official resources.
