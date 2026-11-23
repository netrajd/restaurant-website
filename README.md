# Aura & Hearth Bistro | Modern Restaurant Website

A responsive, accessible, and welcoming website for **Aura & Hearth Bistro**, an artisanal farm-to-table eatery featuring open-flame cooking, wild-fermented sourdough, and natural wines.

Built for **Project 1 (Beginner: Restaurant Website)** adhering to modern web standards.

---

## 🍽️ Key Features

- **Semantic HTML5 Architecture**: Implements clean semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`, `<dialog>`) with complete ARIA accessibility attributes (`aria-label`, `aria-expanded`, `aria-selected`, `aria-hidden`, `aria-live`).
- **Modern CSS3 Design System**:
  - CSS Custom Properties (Variables) for colors, typography, spacing, shadows, and border radii.
  - **Dark / Light Theme Toggle**: Seamlessly switches themes with smooth transitions and remembers the user's choice using `localStorage` and `prefers-color-scheme`.
  - **Modern Layouts**: Flexible Flexbox navigation and robust CSS Grid cards (`repeat(auto-fill, minmax(...))`).
  - **Animations & Hover Effects**: Gentle pulsing emblem, floating hero badges (`@keyframes floatSlow`), image zoom transitions, and interactive button elevations.
- **Hero Section**:
  - Warm headline, farm-to-table narrative, and prominent dual CTAs ("Explore Menu", "Reserve a Table").
  - Floating highlights cards ("Hearth-Roasted", "Open Daily") with keyframe floating animations.
  - Key restaurant stats (4.9★ rating, 100% organic sourcing, 850° wood-fired hearth).
- **About & Heritage Section**:
  - Story of Executive Chef Nicolas Vance and Master Baker Elena Rossi.
  - 4 core value proposition feature cards with custom emoji/SVG accents.
  - "14 Years of Culinary Craft" badge overlay.
- **Chef's Specials & Offers**:
  - Featured *Wood-Fired Prime Ribeye with Black Truffle Butter* with old vs. new price badges, perks list, and direct booking CTA.
  - Secondary promotional cards for *Twilight Aperitivo Hour* and *Artisan Hearth Brunch & Flight*.
- **Interactive Menu (12 Dishes)**:
  - Multi-category filter tabs: **All Dishes**, **Starters & Boards**, **Hearth Mains**, **Artisanal Pizzas**, **Patisserie & Sweets**, and **Beverages & Wine**.
  - High-resolution food photography, dish names, dietary badges (🌱 Vegetarian, 🌾 Gluten-Free, ⭐ House Favorite, 🔥 Chef Signature, 🌶️ Hot Honey), descriptions, and prices.
  - "Order Dish" button with toast notification feedback.
- **Photo Gallery**:
  - Ambiance grid showcasing dining room, open hearth kitchen, sourdough loaves, fresh pasta, copper bar, and garden patio with hover overlays.
- **Guest Testimonials**:
  - Verified diner and food critic review cards with 5-star ratings, quotes, author avatars, and credentials.
- **Hours, Location & Inquiries**:
  - Detailed daily opening times and happy hour schedule.
  - Physical address with parking and transit details.
  - Direct phone, email, and interactive inquiry form with validation.
- **Accessible Table Reservation Modal (`<dialog>`)**:
  - Native `<dialog>` modal with frosted backdrop blur.
  - Comprehensive booking form: Guest name, email, phone, party size, date (with minimum date validation), time slot, seating zone preference, and dietary requests.
  - Interactive confirmation feedback.
- **Responsive Navigation**:
  - Sticky glassmorphism header with scroll elevation.
  - Mobile hamburger toggle with animated icon and body scroll locking.
  - Active scroll spy that highlights the current section in the nav bar.

---

## 📂 Project Structure

```
restaurant-website/
├── index.html            # Main semantic HTML5 markup
├── css/
│   └── styles.css        # CSS variables, light/dark themes, Flexbox/Grid, responsive queries
├── js/
│   └── main.js           # Theme switch, mobile nav, menu filters, modal logic, toast utility
└── README.md             # Documentation and feature guide
```

---

## 🚀 How to Run and View

### Option 1: Direct File Opening
Double-click `index.html` or open it directly in Google Chrome, Safari, Firefox, or Edge.

### Option 2: Local HTTP Server
Run a local Python server from this folder:
```bash
python3 -m http.server 8080
```
Then navigate to:
```
http://localhost:8080
```
