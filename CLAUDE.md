# Gentle Piercing (gentlepiercing.pl)

Multilingual Astro site for a medical ear-piercing studio at Ursynowska 10/1, Warsaw Mokotów.
Stack: Astro, React islands, Tailwind, Sanity, SSG. Locales: PL, EN, UK, RU.

## Design Context

### Users

Parents deciding where to pierce a young child's ears, and adults booking lobe or cartilage
piercings for themselves. Most arrive from Google on a phone, mid-research, comparing this
studio against mall kiosks and tattoo shops. The parent is anxious: they are handing a child
to a stranger with a needle. They are scanning for proof of safety (0+ certificate, sterile
single-use cassettes, Inverness Med rather than a piercing gun), price clarity, and how hard
it is to get there.

The job to be done is narrow: decide this place is safe and competent, then book on Booksy.
Every page has one action.

### Brand Personality

Calm, credentialed, warm. Not clinical-cold, not cutesy. The tone reassures without
overselling: concrete facts (0+ certificate, 5.0 from 200+ reviews, 12 minutes from Metro
Wilanowska) do the persuading, and copy stays plain-spoken Polish that a nervous parent reads
once and understands.

Emotional goal: relief. The visitor should feel they have found the careful option. The
closest reference feel is Glossier — warm, approachable, photographic — applied to a
medical service, not a beauty brand. Softness comes from photography, rose accents, and
space; trust comes from facts and indigo.

### Aesthetic Direction

Established and non-negotiable — new work composes within this system and **tightens**
inconsistencies rather than reinventing it.

- **Color**: deep indigo primary (`--primary` 221 43% 50%) with a soft rose
  secondary/accent (340 65%). Neutrals are already tinted toward the brand hue. Dark navy
  sections (`hsl(221,43%,18%)`) with blurred primary/secondary blobs are the established
  high-emphasis treatment (see `CTASection.astro`, `Hero`). Do not introduce new hues.
- **Type**: Inter only, weights 400–700, loaded in `BaseLayout.astro`. Hierarchy from
  weight and scale, not decorative fonts. Drop leftover Poppins (`@fontsource/poppins`)
  and any other family.
- **Shape**: `--radius` 0.75rem (`rounded-lg`) is the default for buttons, inputs, and
  cards. Large `rounded-[36px]` is reserved for hero-adjacent booking panels only. Do not
  mix `rounded-md` and `rounded-lg` on the same class of control.
- **Buttons**: one primary CTA style site-wide — `.btn-cta` (h-14, `rounded-lg`,
  `font-bold`, `shadow-card`). Secondary is outline or text. Hero may use the same
  primary, not a one-off gradient/size. Never two competing primary buttons on a page.
- **Shadows**: `--shadow-soft` and `--shadow-card` only — never hard drop shadows.
- **Motion**: `[data-reveal]` scroll reveal with staggered `data-reveal-delay`,
  exponential easing, already wrapped in `prefers-reduced-motion`. Hover = subtle scale
  plus color. Nothing bouncy.
- **Theme**: light mode is the product. Dark tokens exist but the site ships light.
  Dark navy bands are a *section treatment*, not a theme.
- **Photography**: lead with real studio/client images the way Glossier leads with
  skin and people. Crop generously. Do not replace photos with icon-topped card grids.
- **Accessibility**: WCAG 2.2 AA. Contrast on indigo-on-white, white-on-navy, and rose
  text must hold. Focus rings already use `--ring`. Keep `prefers-reduced-motion`.

Anti-references: mall-kiosk piercing brands, generic medical SaaS landing pages, and the
2024-era AI look (purple-to-cyan gradients, glassmorphism, identical icon-topped card
grids, gradient headline text, bouncy easing).

### Design Principles

1. **One action per page.** A single Booksy destination. Everything else is a text link or a
   quiet secondary. Never two competing primary buttons.
2. **Proof over adjectives.** Show the certificate, the price, the review count, the travel
   time. Delete any sentence that only asserts quality.
3. **Hierarchy through weight and space, not containers.** Do not wrap every section in a
   card; do not nest cards. Emphasis is scale, order, and surrounding space.
4. **Composition should reflect the content.** When two options are not equally relevant,
   they must not be rendered as an equal two-column split — the recommended one leads and is
   visibly larger.
5. **Tighten, don't invent.** Reuse existing tokens, type, radius, and CTA. If a new
   pattern appears, it is a bug unless it replaces an inconsistent one.
6. **Warmth is photographic, not ornamental.** Approachability comes from people, rose, and
   space — not extra decoration, extra fonts, or extra motion. This is a service that
   involves children and needles; nothing should feel like a game.
