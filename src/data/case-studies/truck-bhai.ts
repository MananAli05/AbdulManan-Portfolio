import type { CaseStudy } from './types';
import { GITHUB_URL } from '../site';

export const truckBhai: CaseStudy = {
  slug: 'truck-bhai',
  title: 'Truck Bhai',
  kind: 'Case study · Truck booking app for Bangladesh',
  summary:
    'A truck booking app for Bangladesh. Shippers post a load, nearby verified drivers send a price, the shipper picks one, and the trip is tracked from pickup to delivery.',
  meta: [
    { label: 'Role', value: 'Full-stack developer' },
    { label: 'Platform', value: 'Android app · Admin panel · API' },
    { label: 'Languages', value: 'English · Bangla' },
    { label: 'Launch', value: 'Planned for December 2026' },
  ],
  image: {
    src: '/TruckBhai-mockup.webp',
    width: 3600,
    height: 2250,
    alt: 'Truck Bhai admin panel: trucks to check, open problems, trips running and loads waiting',
  },
  heroCrop: { x: 0.04, y: 0.051, w: 0.569, h: 0.34 },
  githubUrl: GITHUB_URL,

  challenge: {
    statement: 'Booking a truck should not depend on how well you read.',
    paragraphs: [
      'Truck Bhai connects four kinds of user: shippers who need goods moved, drivers who need loads, truck owners who link drivers to trucks, and the admin team that checks documents and watches trips.',
      'Many of them read very little. So every role and action in the app has a real photo, the buttons are big and clear, and everything works in both English and Bangla, including Bangla digits.',
    ],
    steps: ['Post a load', 'Drivers send a price', 'Shipper picks one', 'Track to delivery'],
  },

  features: [
    {
      label: 'For shippers',
      title: 'Post a load in six steps.',
      body: 'A shipper picks the places on Google Maps, the date, the goods with photos, the truck type and size, and a price. The app suggests a fair price from the real road distance.',
      bullets: [
        'Pickup and drop-off chosen on Google Maps',
        'Fair price suggested from the road distance',
        'Nearby drivers send a price and the shipper chooses',
      ],
      visual: {
        kind: 'phones',
        screens: [
          { src: '/truck-bhai/home.jpeg', label: 'Shipper home' },
          { src: '/truck-bhai/pickup-map.jpeg', label: 'Pickup place' },
        ],
      },
    },
    {
      label: 'Verification',
      title: 'Sign-up checks that are hard to fake.',
      body: 'Every driver and shipper goes through KYC inside the app: an NID card scan, a driving licence, a selfie and truck photos. The checks run on the phone with Google ML Kit.',
      bullets: [
        'Camera only, no uploads from the gallery',
        'Card number read from the photo, blink check on the selfie',
        'Truck photo checked against the typed number plate, in Bangla and English',
      ],
      visual: {
        kind: 'phones',
        screens: [{ src: '/truck-bhai/verification.jpeg', label: 'KYC verification' }],
      },
    },
    {
      label: 'Trips',
      title: 'Every trip tracked from pickup to delivery.',
      body: 'A trip moves through clear steps, with a pickup code, a delivery code and a delivery photo. Both sides see a live map with the route and the arrival time.',
      bullets: [
        'Pickup code, delivery code and delivery photo',
        'Live trip map with route and arrival time',
        'Push alerts with sound for loads, prices, bookings and trip steps',
        'Ratings, trip problems and a driver earnings screen',
      ],
      visual: {
        kind: 'phones',
        screens: [{ src: '/truck-bhai/orders.jpeg', label: 'My orders' }],
      },
    },
    {
      label: 'Admin panel',
      title: 'The team sees what needs attention first.',
      body: 'A web panel for the staff who check documents and watch trips. It shows live counts, refreshes itself and plays a sound when new work arrives.',
      bullets: [
        'KYC review item by item, approve all in one click, reject with a reason',
        'Truck approval, loads and trips, problems and flagged cancels',
        'Block a user with a reason; the app logs them out at once',
      ],
      visual: {
        kind: 'image',
        src: '/truck-bhai/admin.png',
        width: 1917,
        height: 872,
        label: 'Admin panel home',
        shape: 'wide',
      },
    },
  ],

  flow: {
    title: 'Two apps. One API behind them.',
    intro:
      'The Flutter app and the React admin panel talk to the same API. It keeps the data in Supabase and hands login, alerts, maps and plate reading to Firebase and Google Cloud.',
    inputs: [
      { name: 'Shipper', via: 'Flutter app' },
      { name: 'Driver', via: 'Flutter app' },
      { name: 'Truck owner', via: 'Flutter app' },
      { name: 'Admin team', via: 'React panel' },
    ],
    hub: { name: 'Hono API on Cloud Run', detail: 'Node.js 24 and TypeScript, with admin routes and staff login' },
    outputs: [
      { name: 'Supabase', detail: 'PostgreSQL and file storage' },
      { name: 'Firebase', detail: 'Phone login and push alerts' },
      { name: 'Google Maps and Cloud Vision', detail: 'Routes, places and plate reading' },
    ],
  },

  highlights: [
    {
      title: 'Designed for users who read little',
      body: 'Every role and every action has a real photo, and the buttons are big and clear, so the app can be used without reading much.',
    },
    {
      title: 'Full Bangla support',
      body: 'The whole app and its alert messages work in Bangla as well as English, down to Bangla digits.',
    },
    {
      title: 'Fake-proof sign-up',
      body: 'Camera only, the card number read from the photo, the number plate checked against the truck photo, and a blink check on the selfie.',
    },
    {
      title: 'Prices from real roads',
      body: 'Prices and distances come from Google road routes, not straight lines on a map.',
    },
  ],

  stack: {
    title: 'A phone app, a panel and an API.',
    rows: [
      { layer: 'Mobile app', tech: 'Flutter (Android) · Riverpod · go_router' },
      { layer: 'Maps', tech: 'Google Maps SDK · Places API · Routes API · Geocoding API' },
      { layer: 'Login & alerts', tech: 'Firebase Auth (phone OTP) · Firebase Cloud Messaging' },
      { layer: 'On-device checks', tech: 'Google ML Kit: document scanner, text recognition, face detection' },
      { layer: 'API', tech: 'Node.js 24 · Hono · TypeScript' },
      { layer: 'Database & files', tech: 'Supabase (PostgreSQL, Storage)' },
      { layer: 'Plate reading', tech: 'Google Cloud Vision' },
      { layer: 'Admin panel', tech: 'React · TypeScript · Vite · Supabase Auth' },
      { layer: 'Hosting', tech: 'Google Cloud Run · Secret Manager · Cloudflare Pages and Access' },
    ],
  },
};
