This is a Next.js project bootstrapped with create-next-app.
Installation
1. Clone the Repository
bashgit clone https://github.com/Akash4693/plura-ecom.git
cd your-repo-name
2. Install Dependencies
bashnpm install
# or
yarn install
# or
pnpm install
# or
bun install
3. Configure Environment Variables
Create a .env.local file in the root directory and add your Clerk authentication keys:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="Your clerk publishable key"
CLERK_SECRET_KEY="Your clerk secret key"
Getting Started
Run the development server:
bashnpm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.
You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.
This project uses next/font to automatically optimize and load Inter, a custom Google Font.
Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!
Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.
Check out our Next.js deployment documentation for more details.
