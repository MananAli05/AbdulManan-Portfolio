import type { CaseStudy } from './types';
import { GITHUB_URL } from '../site';

export const etihadGarden: CaseStudy = {
  slug: 'etihad-garden',
  title: 'Etihad Garden',
  kind: 'Case study · AI sales assistant & CRM',
  summary:
    'An AI sales system for a Pakistani housing society. Sara, a bilingual chat and voice assistant, answers buyers on the website and turns every conversation into a lead in a custom CRM.',
  meta: [
    { label: 'Role', value: 'Solo full-stack developer' },
    { label: 'Platform', value: 'Web · Voice · Automation' },
    { label: 'Languages', value: 'Roman Urdu · English' },
    { label: 'Status', value: 'Live on Vercel' },
  ],
  image: {
    src: '/Etihad-mockup.webp',
    width: 3600,
    height: 2400,
    alt: 'Etihad Garden admin CRM dashboard: lead pipeline, total leads, hot leads, calls today, site visits and follow-ups',
  },
  heroCrop: { x: 0.027, y: 0.039, w: 0.661, h: 0.39 },
  liveUrl: 'https://etihad-agent.vercel.app/',
  githubUrl: `${GITHUB_URL}/Etihad-Agent`,

  challenge: {
    statement: 'Buyers ask on five channels. Every one of them should end up as one lead.',
    paragraphs: [
      'Property buyers and investors reach a housing society through the website, a chat, a phone call or a form. Each channel usually keeps its own list, so the same buyer shows up several times and the sales team loses track of who was promised what.',
      'Etihad Garden puts one assistant in front of all of it. Sara answers buyers by chat and by voice, and whatever she learns lands in a single lead record that the sales team works from the CRM.',
    ],
    steps: ['Answer the buyer', 'Capture the lead', 'Qualify with AI', 'Follow up and visit'],
  },

  features: [
    {
      label: 'Website',
      title: 'A mobile-first site that leads to a booked visit.',
      body: 'The landing page shows the plots, villas and commercial units, the facilities, the location map and a virtual tour video. From any of them a buyer can ask Sara or book a site visit.',
      bullets: [
        'Properties, facilities, map and virtual tour',
        'Inquiry form with Pakistani phone validation',
        'Built for phones first',
      ],
      visual: {
        kind: 'image',
        src: '/etihad/website.webp',
        width: 1902,
        height: 875,
        label: 'Landing page',
        shape: 'wide',
      },
    },
    {
      label: 'Sara chat',
      title: 'An assistant that only says what is approved.',
      body: 'Sara chats in Roman Urdu or English. She answers only from an approved knowledge base, so buyers get real prices and plot sizes instead of made-up facts.',
      bullets: [
        'Bilingual: Roman Urdu and English',
        'Answers from an approved knowledge base',
        'Lead details pulled out of the conversation',
      ],
      visual: {
        kind: 'image',
        src: '/etihad/sara-chat.png',
        width: 513,
        height: 772,
        label: 'Sara AI chat',
        shape: 'tall',
      },
    },
    {
      label: 'Sara voice',
      title: 'The same assistant, on a real-time voice call.',
      body: 'Buyers can talk to Sara in the browser through ElevenLabs. An outbound calling agent, run by an n8n workflow, phones leads back for follow-up.',
      bullets: [
        'Real-time voice calls in the browser',
        'Outbound follow-up calls through n8n',
        'Callers are captured as leads, even from spoken numbers',
      ],
      visual: {
        kind: 'image',
        src: '/etihad/sara-voice.webp',
        width: 1902,
        height: 721,
        label: 'Sara voice agent',
        shape: 'wide',
      },
    },
    {
      label: 'Admin CRM',
      title: 'One place for leads, calls and site visits.',
      body: 'The sales team works every lead from a custom CRM: where it came from, how warm it is, what was said, and what happens next.',
      bullets: [
        'Dashboard with KPI cards, lead trend, pipeline and source charts',
        'Leads table with a status pipeline and Hot, Warm or Cold interest',
        'Calls, follow-ups and site visits, with full chat and call transcripts',
        'Login with Supabase Auth',
      ],
      visual: {
        kind: 'crop',
        crop: { x: 0.159, y: 0.335, w: 0.166, h: 0.285 },
        label: 'Recent leads, by source',
      },
    },
  ],

  flow: {
    title: 'Five ways in. One lead record.',
    intro:
      'Every channel writes to the same lead, matched by phone number. Each one adds details without overwriting earlier ones, and the lead stays credited to the channel that found it first.',
    inputs: [
      { name: 'Sara chat', via: 'Groq' },
      { name: 'Sara voice', via: 'ElevenLabs' },
      { name: 'Inquiry form', via: 'Website' },
      { name: 'Google Form', via: 'Apps Script' },
      { name: 'Calling agent', via: 'n8n' },
    ],
    hub: { name: 'FastAPI on Vercel', detail: 'Extracts the lead, matches the phone number, checks the webhook' },
    outputs: [
      { name: 'Supabase', detail: 'Leads and chat history' },
      { name: 'Admin CRM', detail: 'Pipeline, calls, visits' },
      { name: 'Email alert', detail: 'On every new lead' },
    ],
  },

  highlights: [
    {
      title: 'Lead extraction from conversations',
      body: 'A second LLM call in JSON mode pulls name, budget, plot size, purpose and interest level out of the conversation. It runs only after a phone number appears, so ordinary chats stay fast.',
    },
    {
      title: 'Phone numbers from voice calls',
      body: 'Numbers often arrive from speech-to-text as Devanagari or Arabic digits, or as spoken words like "teen, paanch". They are converted to standard digits, so callers are still captured as leads.',
    },
    {
      title: 'Built for serverless',
      body: 'No conversation state is kept on the server, and a failure in storage or email never breaks the chat. A health endpoint shows which integrations are live without exposing any keys.',
    },
    {
      title: 'A secure voice webhook',
      body: 'Signed with HMAC, it rejects old replayed requests and tells inbound callers apart from outbound follow-ups.',
    },
  ],

  stack: {
    title: 'Built as one connected product.',
    rows: [
      { layer: 'Website', tech: 'React 18 · Vite 5 · Tailwind CSS 3 · @elevenlabs/react' },
      { layer: 'Admin CRM', tech: 'React 18 · React Router 6 · Tailwind CSS 3 · hand-built SVG charts' },
      { layer: 'Backend', tech: 'Python · FastAPI · Pydantic · httpx' },
      { layer: 'AI chat', tech: 'Groq API · keyword retrieval over a Markdown knowledge base' },
      { layer: 'AI voice', tech: 'ElevenLabs Conversational AI (inbound and outbound agents)' },
      { layer: 'Database & auth', tech: 'Supabase · Postgres · Row Level Security · Auth' },
      { layer: 'Automation', tech: 'n8n calling workflow · Google Apps Script' },
      { layer: 'Hosting', tech: 'Vercel (static frontends and a Python serverless function)' },
    ],
  },
};
