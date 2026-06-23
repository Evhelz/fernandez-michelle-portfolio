# **App Name**: devlogfolio

## Core Features:

- Static Content Management: Parse and display projects from local JSON and weekly logs from Markdown/MDX files.
- Dynamic Project Gallery: Render a gallery of all projects, fetching details from 'projects.json', with rich content display.
- Interactive Project Filtering: Enable users to filter the project gallery by technical stack or category for efficient navigation.
- Markdown Log Viewer: Generate static routes for weekly logs from '/content' and display them with proper formatting.
- Responsive Navigation & Layout: Provide persistent site navigation, footer, and active-link styling, adapting flawlessly across devices.
- Advanced SEO & Image Optimization: Implement dynamic metadata generation for log pages and optimize all images with Next.js <Image/> component for top performance.

## Style Guidelines:

- Primary accent color: A professional and tech-inspired deep blue (#4480F0) for emphasis on interactive elements and branding, conveying technical proficiency and trust.
- Background color: A very subtle, cool off-white (#F3F5F7) providing a clean, spacious canvas that complements the primary blue without distraction, suitable for a professional and modern look.
- Secondary accent color: A vibrant cyan-turquoise (#0AA9BF) used sparingly for strong contrast and calls to action, drawing attention to key interactive components or highlights.
- Headline font: 'Space Grotesk' (sans-serif) for its modern, techy aesthetic, ideal for titles and short, impactful text. Body font: 'Inter' (sans-serif) for excellent readability and neutrality across various content types, suitable for longer descriptions and log entries.
- Adopt a crisp, minimalist iconography style, preferably using line-art vector icons, to maintain a clean and consistent aesthetic throughout the 'Atomic Design' components.
- Employ a highly responsive, fluid grid system powered by Tailwind CSS, allowing seamless transition from a single-column layout on mobile devices to a multi-column (up to 3) layout on desktop, ensuring persistent and accessible navigation.
- Integrate subtle, performance-optimized micro-animations for UI feedback and seamless transitions, including 'loading.tsx' skeleton loaders for improved user experience during content fetching.