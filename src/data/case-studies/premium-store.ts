import type { CaseStudy } from './types';
import { GITHUB_URL } from '../site';

export const premiumStore: CaseStudy = {
  slug: 'premium-store',
  title: 'Premium Store',
  kind: 'Case study · Chat-based subscription store',
  summary:
    'A store where customers buy digital subscriptions through a chatbot and pay with local wallets. The owner verifies payments from a web admin panel and a native Flutter admin app.',
  meta: [
    { label: 'Role', value: 'Full stack developer, solo build' },
    { label: 'Platform', value: 'Web chatbot · Admin panel · Android app' },
    { label: 'Customers', value: '2,300+' },
    { label: 'Orders', value: 'About 360 completed a week' },
    { label: 'Status', value: 'Live, used daily' },
  ],
  image: {
    src: '/premium-store-mockup.webp',
    width: 1536,
    height: 1024,
    alt: 'Premium Store: the admin dashboard on a laptop and the customer chatbot on phones',
  },
  heroImage: {
    src: '/premium-store/admin.png',
    width: 1916,
    height: 857,
    alt: 'Premium Store admin dashboard: payments waiting for verification, pending orders, app issues, active chats and a chart of completed orders for the week',
  },
  liveUrl: 'https://premiumstore.online/',
  githubUrl: GITHUB_URL,

  challenge: {
    statement: 'Every order used to be a manual WhatsApp conversation.',
    paragraphs: [
      'The business sold over WhatsApp. Each order meant sending prices, sharing payment details, checking screenshots and typing codes by hand. Orders got lost, customers waited, and nothing could be tracked.',
      'Premium Store replaces that with a chat that runs itself. The customer is guided step by step, the owner gets an instant phone notification for each payment, and the code arrives in the same chat once it is approved.',
    ],
    steps: ['Choose a plan', 'Pay with a local wallet', 'Upload the proof', 'Get the code in the chat'],
  },

  features: [
    {
      label: 'Customer chatbot',
      title: 'A checkout that feels like a chat.',
      body: 'A WhatsApp-style chat guides the customer with buttons instead of typing: buy a subscription, choose a plan, choose how to pay, pay, upload the proof, and get the code.',
      bullets: [
        'JazzCash, Easypaisa, NayaPay and other local banks',
        'Payment proof uploaded as a screenshot, right in the chat',
        'Customer support requests from the same chat',
      ],
      visual: {
        kind: 'phones',
        screens: [
          { src: '/premium-store/pay-method.jpeg', label: 'Choosing how to pay' },
          { src: '/premium-store/proof-submitted.jpeg', label: 'Proof submitted' },
        ],
      },
    },
    {
      label: 'Admin panel',
      title: 'Every payment, chat and order on one screen.',
      body: 'The web panel shows what is waiting right now and how the week is going, with an inbox that holds every customer chat in real time.',
      bullets: [
        'Live counts: payments waiting, app issues, active chats, active orders',
        'Weekly chart of completed orders, with arrows to see past weeks',
        'Approve or reject a payment with one tap',
      ],
      visual: {
        kind: 'crop',
        source: { src: '/premium-store/admin.png', width: 1916, height: 857 },
        crop: { x: 0.2, y: 0.535, w: 0.76, h: 0.465 },
        label: 'Completed orders, last 7 days',
      },
    },
    {
      label: 'Admin app',
      title: 'The same tools in the owner\'s pocket.',
      body: 'A native Flutter app for Android carries the admin panel on a phone, so a payment can be approved a few seconds after the customer sends it.',
      bullets: [
        'Instant push notification for every new payment',
        'Quick approve and reject',
        'Weekly chart, inbox and settings',
      ],
      visual: {
        kind: 'phones',
        screens: [{ src: '/premium-store/admin-app.jpeg', label: 'Flutter admin app' }],
      },
    },
    {
      label: 'Real users',
      title: 'Built for the phones customers really have.',
      body: 'Many customers use cheap Android phones and old browsers. The chat avoids new browser features, retries on weak internet, and keeps each chat private.',
      bullets: [
        'Works on Chrome 80+ and UC Browser',
        'Login with a WhatsApp number check; messages deleted after 15 days',
        'Orders expire on the server if they are not paid in time',
      ],
      visual: {
        kind: 'phones',
        screens: [{ src: '/premium-store/chat-flow.png', label: 'Guided chat', width: 356, height: 765 }],
      },
    },
  ],

  flow: {
    title: 'Three apps. One real-time backend.',
    intro:
      'The customer chat, the web panel and the Flutter app all read and write the same Supabase database, so a new order or message shows up everywhere without a refresh.',
    inputs: [
      { name: 'Customer chatbot', via: 'Next.js' },
      { name: 'Admin panel', via: 'Next.js' },
      { name: 'Admin app', via: 'Flutter' },
    ],
    hub: { name: 'Supabase', detail: 'PostgreSQL, Auth, Realtime, Row Level Security, Edge Functions and scheduled jobs' },
    outputs: [
      { name: 'Firebase Cloud Messaging', detail: 'Push to every admin phone' },
      { name: 'Cloudinary', detail: 'Signed, private payment proofs' },
      { name: 'Cloudflare Workers', detail: 'Hosting' },
    ],
  },

  highlights: [
    {
      title: 'No lost orders',
      body: 'Each chat step is saved to the database in one atomic action, and an offline queue re-sends messages when the internet comes back.',
    },
    {
      title: 'Rules that cannot be bypassed',
      body: 'Order expiry, blocked customers and payment checks run in the database, so they cannot be skipped from the browser.',
    },
    {
      title: 'Instant admin alerts',
      body: 'A database webhook triggers an Edge Function that sends a push notification to every logged-in admin phone.',
    },
    {
      title: 'Cost under control',
      body: 'Screenshots are stored in Cloudinary and old files are cleaned up automatically, which keeps the database within its plan.',
    },
  ],

  stack: {
    title: 'One codebase per screen, one backend.',
    rows: [
      { layer: 'Customer & admin web', tech: 'Next.js · React · TypeScript · Tailwind CSS' },
      { layer: 'Mobile admin app', tech: 'Flutter · Riverpod · go_router' },
      { layer: 'Backend', tech: 'Supabase: PostgreSQL, Auth, Realtime, Row Level Security, Edge Functions, scheduled jobs' },
      { layer: 'Push notifications', tech: 'Firebase Cloud Messaging' },
      { layer: 'Image storage', tech: 'Cloudinary (signed, private uploads)' },
      { layer: 'Hosting', tech: 'Cloudflare Workers' },
      { layer: 'Testing', tech: 'Playwright end-to-end tests' },
    ],
  },
};
