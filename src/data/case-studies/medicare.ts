import type { CaseStudy } from './types';
import { GITHUB_URL } from '../site';

export const mediCare: CaseStudy = {
  slug: 'medicare',
  title: 'MediCare',
  kind: 'Case study · Multilingual AI medical assistant',
  summary:
    'A mobile health assistant that combines machine learning, computer vision, OCR and multilingual voice AI to make health information easier to understand in English and Urdu.',
  meta: [
    { label: 'Role', value: 'AI / ML developer' },
    { label: 'Platform', value: 'Flutter mobile app' },
    { label: 'Backend', value: 'FastAPI server' },
    { label: 'Languages', value: 'English · Urdu' },
  ],
  image: {
    src: '/medical.webp',
    width: 1535,
    height: 1024,
    alt: 'MediCare app screens: home, sign-up, chest X-ray result, activity history, symptom checker and diagnosis',
  },
  githubUrl: `${GITHUB_URL}/Multilingual-AI-Healthcare`,

  challenge: {
    statement: 'Medical reports are written for doctors, not for the people they are about.',
    paragraphs: [
      'Medical information is often hard for everyday users to understand, especially when reports are written in technical English. MediCare makes symptom screening, chest X-ray analysis and lab report reading more accessible, in both English and Urdu.',
      'MediCare is an AI-assisted screening project. It is not intended to replace a professional medical diagnosis.',
    ],
    steps: ['Speak or pick symptoms', 'Answer severity questions', 'Scan an X-ray or a report', 'Read the result in Urdu or English'],
  },

  features: [
    {
      label: 'Symptom checker',
      title: 'Symptom screening by voice or by tap.',
      body: 'Users give their symptoms by hand or by voice. Follow-up questions capture how severe each one is, and then the ML model returns ranked predictions with supporting guidance.',
      bullets: [
        'Select symptoms or speak them',
        'Follow-up questions on severity',
        'Ranked predictions with guidance',
      ],
      visual: {
        kind: 'phones',
        screens: [
          { src: '/app-images/symtoms.jpeg', label: 'Select or speak' },
          { src: '/app-images/symtom-mcq.jpeg', label: 'Severity questions' },
          { src: '/app-images/symtom-result.jpeg', label: 'AI predictions' },
        ],
      },
    },
    {
      label: 'X-ray analysis',
      title: 'Chest X-ray screening with a confidence score.',
      body: 'A TensorFlow/Keras CNN analyses an uploaded chest X-ray and classifies it as Normal or Pneumonia, with a confidence score.',
      bullets: [
        'CNN trained for Normal and Pneumonia',
        'Confidence score with every result',
        'Result saved to the activity history',
      ],
      visual: {
        kind: 'phones',
        screens: [{ src: '/app-images/x-ray result.jpeg', label: 'X-ray result' }],
      },
    },
    {
      label: 'Lab report reader',
      title: 'From a lab report to clear results.',
      body: 'EasyOCR pulls the text out of an uploaded report, finds the supported medical tests and shows each value as Normal, Low or High.',
      bullets: [
        'Text extracted with EasyOCR',
        'Supported tests matched automatically',
        'Each value marked Normal, Low or High',
      ],
      visual: {
        kind: 'phones',
        screens: [
          { src: '/app-images/report.jpeg', label: 'Uploaded report' },
          { src: '/app-images/Lab-result.jpeg', label: 'Interpreted result' },
        ],
      },
    },
    {
      label: 'English and Urdu',
      title: 'Built to be spoken to, in two languages.',
      body: 'Users can speak in English, Urdu or Roman Urdu. Groq Whisper transcribes the speech, and LLaMA handles symptom understanding, translation and the Urdu result, which is read out loud.',
      bullets: [
        'Voice input in English, Urdu or Roman Urdu',
        'Speech to text with Groq Whisper',
        'Results written and spoken in Urdu',
      ],
      visual: {
        kind: 'phones',
        screens: [
          { src: '/app-images/Dashboard.jpeg', label: 'Home' },
          { src: '/app-images/profile.jpeg', label: 'Profile and language' },
        ],
      },
    },
  ],

  flow: {
    title: 'One app. Four kinds of AI.',
    intro:
      'The Flutter app sends each request to a FastAPI server, which runs the right model for the job and returns a result the app can show or read out in the user\'s language.',
    inputs: [
      { name: 'Symptoms', via: 'Voice or tap' },
      { name: 'Chest X-ray', via: 'Image' },
      { name: 'Lab report', via: 'Photo' },
    ],
    hub: { name: 'FastAPI server', detail: 'Runs the ML, CNN, OCR and LLM models for each request' },
    outputs: [
      { name: 'Ranked predictions', detail: 'scikit-learn and TensorFlow' },
      { name: 'Urdu and English results', detail: 'Groq Whisper and LLaMA 3.3 70B' },
      { name: 'History', detail: 'Supabase and on-device SQLite' },
    ],
  },

  highlights: [
    {
      title: 'Machine learning for symptoms',
      body: 'A scikit-learn model ranks likely conditions after the follow-up questions have captured how severe each symptom is.',
    },
    {
      title: 'Computer vision for X-rays',
      body: 'A TensorFlow/Keras CNN classifies a chest X-ray as Normal or Pneumonia and reports how confident it is.',
    },
    {
      title: 'OCR for lab reports',
      body: 'EasyOCR reads the report, then matching logic finds the supported tests and compares each value with its normal range.',
    },
    {
      title: 'Speech and language in Urdu',
      body: 'Groq Whisper turns speech into text, and LLaMA 3.3 70B maps it to symptoms, translates, and writes the result in Urdu for text-to-speech.',
    },
  ],

  stack: {
    title: 'Several AI systems in one mobile product.',
    rows: [
      { layer: 'Mobile', tech: 'Flutter · Dart' },
      { layer: 'AI & ML', tech: 'TensorFlow · scikit-learn · EasyOCR' },
      { layer: 'Backend & AI', tech: 'Python · FastAPI · Groq Whisper · LLaMA 3.3 70B' },
      { layer: 'Data & authentication', tech: 'Supabase / PostgreSQL · SQLite (on-device) · Firebase Auth' },
    ],
  },
};
