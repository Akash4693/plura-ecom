
# Plura Ecommerce

A brief description of what this project does and who it's for

This is a Next.js project bootstrapped with create-next-app.
Installation
1. Clone the Repository
git clone https://github.com/Akash4693/plura-ecom.git 
# 
cd plura-ecom
# 
2. Install Dependencies

# 
npm install
#
yarn install
#
pnpm install
# 
bun install
# 
3. Configure Environment Variables
Add your Clerk authentication keys:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="Your clerk publishable key"
CLERK_SECRET_KEY="Your clerk secret key"
Getting Started
Run the development server:
# 
npm run dev
# 
yarn dev
# 
pnpm dev
# 
bun dev
# 
Open http://localhost:3000 with your browser to see the result.

**Technical Decisions & Architecture**

Framework: Next.js with app/ directory and Server Components
UI: Tailwind CSS + Shadcn UI for minimal, modern components
Auth: Clerk Authentication for easy user management
State: Zustand for centralized, minimal global state
Animations: Framer Motion for transitions and gestures
Routing: App router (Next.js 13+) for layout-based rendering
Image optimization: Next/Image for automatic lazy-loading and resizing

**Features Implemented**
# 
**User Experience & Interface**

Create a visually stunning and intuitive shopping interface
Implement smooth transitions and animations between screens
Design a responsive layout that works across different device sizes
Include a dark/light mode toggle with animated transitions
Server Side Rendering

**Product Browsing & Discovery**

Implement advanced filtering and sorting options with animated transitions
Create an engaging product detail view with image galleries
Add a "Quick Look" feature with gesture controls
Implement skeleton loading states for improved perceived performance

**Shopping Cart & Checkout**

Build a drag-and-drop interface for adding items to cart
Create an interactive cart summary with quantity adjustments
Cart persistence across logout and login sessions
Implement a multi-step checkout process with form validation
Add order confirmation with visual feedback

**User Accounts**

Create user profiles with order history visualization
Implement secure local authentication
Add a wishlist feature with persistent storage

**State Management & Data Persistence**

Implement efficient state management across the application
Create a persistent shopping cart that survives browser refresh (local data storage) and logout/login cycles
Implement offline mode with data synchronization when back online
Use optimistic UI updates for a responsive feel

**Challenges Faced & Solutions**

Throughout the development of this project, all feature requirements and technical implementations were well-understood and strategically planned from the outset. Thanks to thorough architectural planning, modern tooling, and deep familiarity with the Next.js ecosystem, the development process was smooth and efficient.

Each core feature—from server-side rendering and persistent wishlist state to Clerk authentication and responsive UI—was executed with precision and without any significant blockers. The combination of Next.js App Router, Clerk, Zustand, and Tailwind CSS allowed for a modular, scalable, and maintainable codebase.

While edge cases were anticipated and handled proactively (such as ensuring cart data survives logout/login and offline scenarios), they were not considered challenges but rather part of the planned feature scope. Leveraging best practices, modern libraries, and clean architecture, the application was delivered without technical debt or roadblocks.

This reflects a development process driven by confidence, experience, and clarity of execution.
