# Gentle Piercing Warszawa

A modern, multilingual website for Gentle Piercing - medical ear piercing services in Warsaw.

## Technologies

This project is built with:

- Astro
- TypeScript
- React (for interactive components)
- shadcn-ui
- Tailwind CSS
- Sanity CMS (for blog content)
- Static Site Generation (SSG)

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd inverness-warszawa

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

### Development

The development server will start on `http://localhost:4321` with hot module replacement.

### Building

```sh
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `src/pages/` - Astro pages (file-based routing)
- `src/components/` - Reusable components (Astro and React)
- `src/lib/` - Utility functions and configurations
- `src/content/translations/` - Translation JSON files
- `sanity/` - Sanity CMS configuration and schemas

## Features

- Multilingual support (Polish, English, Ukrainian, Russian)
- Static Site Generation (SSG) for SEO
- Blog content management via Sanity CMS
- Optimized performance and loading speed
- Responsive design
- React islands for interactive components

## Deployment

The project is configured for deployment on Vercel with static site generation support.

