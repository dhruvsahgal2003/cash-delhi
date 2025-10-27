# Cash Delhi - Luxury Event Organizer Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from luxury hospitality and premium event platforms like high-end hotel brands, luxury event companies, and upscale nightlife venues. The design emphasizes sophistication, exclusivity, and visual impact through immersive media and refined typography.

## Core Design Principles

1. **Cinematic Immersion**: Full-screen video and imagery create immediate emotional impact
2. **Sophisticated Restraint**: Premium feel through generous whitespace and refined typography
3. **Effortless Navigation**: Smooth transitions and intuitive flow maintain luxury experience
4. **Dynamic Content**: Event-focused design that puts experiences front and center

## Typography System

**Primary Font**: Cormorant Garamond (serif) - for headlines, elegant and sophisticated
- Hero Headlines: 4xl to 6xl (text-4xl lg:text-6xl), font-light to font-normal
- Section Headers: 3xl to 4xl (text-3xl lg:text-4xl), font-normal
- Subheadings: xl to 2xl (text-xl lg:text-2xl), font-light

**Secondary Font**: Inter or Montserrat (sans-serif) - for body text and navigation
- Body Text: base to lg (text-base lg:text-lg), font-normal, line-height relaxed
- Navigation: sm to base (text-sm lg:text-base), font-medium, tracking-wide uppercase
- Button Text: sm to base, font-semibold, tracking-wide

**Text Hierarchy on Video**:
- Overlay text with subtle backdrop-blur-sm or dark gradient for readability
- White text with high contrast for hero messaging
- Tagline/supporting text at reduced opacity (opacity-90)

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 to p-8 for cards, p-4 for smaller elements
- Section spacing: py-16 to py-32 for desktop, py-12 to py-20 for mobile
- Content margins: mx-4 to mx-8 on mobile, contained with max-w-7xl on desktop
- Grid gaps: gap-6 to gap-8 for card layouts

**Container Strategy**:
- Full-width sections with inner max-w-7xl mx-auto px-6 lg:px-8
- Video sections at w-full for edge-to-edge impact
- Content sections at max-w-6xl for readability
- Form containers at max-w-2xl for focus

## Component Library

### Navigation
- Fixed/sticky header with backdrop-blur-md for glass effect over video
- Horizontal desktop navigation with elegant spacing (gap-8)
- Logo left-aligned, navigation center or right-aligned
- Mobile: Hamburger menu with full-screen overlay transition
- CTA button (Instagram or Contact) highlighted in navigation

### Hero Section - Video Background
- Full viewport height (min-h-screen) video background below navigation
- Video element with object-cover, autoplay, muted, loop attributes
- Dark overlay gradient (from-black/70 via-black/50 to-transparent) for text readability
- Centered content with company name, tagline, and scroll indicator
- Text layout: Company name (text-5xl to text-7xl), tagline below (text-xl to text-2xl)
- Subtle scroll indicator at bottom with animated bounce

### Event Cards
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Each card with aspect-ratio-16/9 image, event title, date, venue
- Hover state: subtle scale transform (hover:scale-105 transition-transform)
- Card structure: Image top, content padding p-6, clear typography hierarchy
- Date badge absolutely positioned on image (top-4 right-4)

### About/Story Sections
- Two-column layouts on desktop (grid-cols-1 lg:grid-cols-2 gap-12)
- Large imagery paired with text blocks
- Staggered image-text alternating sections for visual rhythm
- Pull quotes highlighted with larger text-2xl to text-3xl and font-light

### Contact Form
- Single column max-w-2xl centered
- Input fields with border, rounded corners, generous padding (p-4)
- Labels above inputs, helper text below
- Submit button full-width on mobile, auto-width on desktop
- Instagram link prominently displayed with icon

### Founder Section
- Hero layout with large founder image (rounded or full-bleed)
- Bio text in elegant serif typography
- Quote callout in larger size
- Two-column desktop layout: image left (40%), content right (60%)

### Upcoming Events Page
- Featured event at top with large visual treatment
- Grid of upcoming events below
- Filter/sort options if multiple events
- "Add to Calendar" interaction for each event

### Admin Panel
- Clean dashboard layout with sidebar navigation
- Event management table with add/edit/delete actions
- Form for adding events: title, date, venue, description, image upload
- Simple authentication with Replit Auth
- Minimal design focusing on functionality

## Images

**Hero Section**: Use high-quality background video (MP4, WebM formats) showing luxury events, nightlife, or venue atmosphere. Video should loop seamlessly, be muted, and optimized for web (<10MB). Provide video placeholder path.

**About/Story Sections**: Include 3-4 high-quality images showing:
- Cash Delhi events in action (crowds, atmosphere)
- Luxury venue interiors
- Event setup/details
- Team/behind-the-scenes moments

**Event Cards**: Each event needs a hero image (16:9 aspect ratio, minimum 1200px wide)

**Founder Section**: Professional headshot or environmental portrait of Yuvraj Ahuja (portrait orientation, high quality)

**Image Treatment**: 
- All images with subtle hover zoom (hover:scale-105)
- Loading with blur placeholder (blur-up technique)
- Responsive srcset for performance
- Overlay gradient on hero images for text readability

## Animations

**Scroll Animations** (using Framer Motion or AOS):
- Fade-up on scroll for section content (translateY: 40px to 0)
- Stagger children elements (0.1s delay between items)
- Zoom-in effect on images as they enter viewport (scale: 0.95 to 1)
- Parallax on hero video (slower scroll rate)

**Interaction Animations**:
- Navigation links: subtle underline slide-in on hover
- Buttons: smooth color transition, slight lift (translateY: -2px)
- Cards: scale transform on hover (1 to 1.05) with smooth transition
- Form inputs: border color change on focus

**Page Transitions**:
- Smooth scroll behavior enabled globally
- Section reveals with intersection observer
- Minimal, sophisticated - avoid excessive motion

## Responsive Breakpoints

- Mobile: < 768px - Single column, stacked navigation, full-width cards
- Tablet: 768px - 1024px - Two-column grids, horizontal navigation
- Desktop: > 1024px - Multi-column layouts, full design system

## Accessibility

- Video with controls accessible via keyboard, option to pause
- ARIA labels on all interactive elements
- Focus states clearly visible on all interactive components
- Color contrast ratio minimum 4.5:1 for text
- Semantic HTML structure throughout
- Form validation with clear error messages