export type Finish = {
  name: string;
  hex: string;
};

export type StorageOption = {
  label: string;
  add: number;
};

export type IPhoneModel = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  price: number;
  badge?: string;
  finishes: Finish[];
  storage: StorageOption[];
  highlights: string[];
  accent: string;
};

export const models: IPhoneModel[] = [
  {
    id: "17-pro",
    name: "iPhone 17 Pro",
    shortName: "17 Pro",
    tagline: "For your biggest ideas.",
    description: "Pro camera versatility, exceptional performance, and a design that feels as capable as it looks.",
    price: 1099,
    badge: "Most capable",
    finishes: [
      { name: "Silver", hex: "#d8d8d3" },
      { name: "Deep Blue", hex: "#3c4654" },
      { name: "Cosmic Orange", hex: "#b96b45" },
    ],
    storage: [
      { label: "256GB", add: 0 },
      { label: "512GB", add: 200 },
      { label: "1TB", add: 400 },
    ],
    highlights: ["A19 Pro chip", "48MP Pro Fusion cameras", "Up to 33 hours video playback"],
    accent: "#c7b8a7",
  },
  {
    id: "17",
    name: "iPhone 17",
    shortName: "17",
    tagline: "Your everyday, elevated.",
    description: "Brilliant cameras, all-day confidence, and just-right performance in five expressive finishes.",
    price: 799,
    badge: "A great all-rounder",
    finishes: [
      { name: "Lavender", hex: "#c8c1d9" },
      { name: "Mist Blue", hex: "#b8c8d1" },
      { name: "Sage", hex: "#b8c2ae" },
      { name: "White", hex: "#e6e5df" },
      { name: "Black", hex: "#383a3b" },
    ],
    storage: [
      { label: "256GB", add: 0 },
      { label: "512GB", add: 200 },
    ],
    highlights: ["A19 chip", "48MP Dual Fusion camera", "Up to 30 hours video playback"],
    accent: "#c8c1d9",
  },
  {
    id: "air",
    name: "iPhone Air",
    shortName: "Air",
    tagline: "Remarkably light on limits.",
    description: "An impossibly thin profile with the power, display, and battery life to move through a full day.",
    price: 999,
    badge: "Thinnest iPhone",
    finishes: [
      { name: "Sky Blue", hex: "#c2d4df" },
      { name: "Light Gold", hex: "#ded3bf" },
      { name: "Cloud White", hex: "#e8e7e2" },
      { name: "Space Black", hex: "#3d3e40" },
    ],
    storage: [
      { label: "256GB", add: 0 },
      { label: "512GB", add: 200 },
      { label: "1TB", add: 400 },
    ],
    highlights: ["A19 Pro chip", "48MP Fusion camera", "All-day battery life"],
    accent: "#c2d4df",
  },
  {
    id: "16e",
    name: "iPhone 16e",
    shortName: "16e",
    tagline: "The essentials. Beautifully done.",
    description: "A modern iPhone with impressive battery life, a powerful chip, and an approachable price.",
    price: 599,
    badge: "Best value",
    finishes: [
      { name: "White", hex: "#e5e4df" },
      { name: "Black", hex: "#3b3c3d" },
    ],
    storage: [
      { label: "128GB", add: 0 },
      { label: "256GB", add: 100 },
      { label: "512GB", add: 300 },
    ],
    highlights: ["A18 chip", "48MP 2-in-1 camera", "Up to 26 hours video playback"],
    accent: "#a9aaa8",
  },
];

export const socialQuotes = [
  {
    quote: "It keeps up with my camera roll, my calendar, and my very chaotic group chat.",
    name: "Nia",
    detail: "Creative producer · 26",
  },
  {
    quote: "The first phone I’ve had that still feels fast at the end of a very long day.",
    name: "Alex",
    detail: "Product designer · 29",
  },
  {
    quote: "I take fewer photos now, but somehow love more of them. That’s the upgrade.",
    name: "Jules",
    detail: "Weekend filmmaker · 24",
  },
];

export const benefits = [
  {
    id: "create",
    nav: "Make something",
    eyebrow: "For the makers",
    title: "Your ideas don’t have to wait.",
    body: "Frame the shot, cut the reel, record the voice note, and share it before the moment passes. Powerful creative tools feel immediate, not intimidating.",
    image: "/images/lifestyle-man.jpg",
    alt: "A young man taking a photo on a rooftop at golden hour",
    points: ["Pro-level video in your pocket", "Fast, fluid editing on device", "Room for the work you love"],
  },
  {
    id: "connect",
    nav: "Feel closer",
    eyebrow: "For your people",
    title: "More presence. Less distance.",
    body: "The big news, the tiny wins, the unfiltered laughs—iPhone makes every check-in feel natural with clear calls, expressive messages, and effortless sharing.",
    image: "/images/lifestyle-friends.jpg",
    alt: "Three friends taking a joyful selfie by the coast",
    points: ["Crisp video calls wherever you are", "Simple, private photo sharing", "Messages that feel more like you"],
  },
  {
    id: "unwind",
    nav: "Take a breath",
    eyebrow: "For your downtime",
    title: "Technology that knows when to quiet down.",
    body: "Shape your notifications around your day, settle into a cinematic display, and keep your attention for the people and moments in front of you.",
    image: "/images/lifestyle-woman.jpg",
    alt: "A young woman relaxing with her phone beside a sunlit window",
    points: ["Focus modes that fit your rhythm", "A display made for getting lost in", "Screen Time insights without judgment"],
  },
];

export const testimonials = [
  {
    quote: "I used to carry a camera ‘just in case.’ Now I just bring my iPhone. Last weekend I shot my sister’s engagement dinner, edited a little film on the train, and sent it to my family before dessert.",
    name: "Maya R.",
    meta: "27 · Photographer · Austin",
    tag: "Camera",
    color: "#d9c9b9",
  },
  {
    quote: "My days move between classes, work, and football practice. The battery gets me home without the low-power anxiety, and Focus mode means I can actually study when I need to.",
    name: "Devon K.",
    meta: "22 · Student · Chicago",
    tag: "Everyday battery",
    color: "#b8c8b7",
  },
  {
    quote: "Switching felt suspiciously easy. My photos, chats, and playlists came across, and the privacy prompts explained things in normal language. It felt like my phone from day one.",
    name: "Priya S.",
    meta: "31 · Architect · Seattle",
    tag: "Easy switching",
    color: "#c5bfd8",
  },
  {
    quote: "I run my small business between school drop-offs and late-night packaging sessions. Scanning labels, answering customers, editing product clips—it’s the one tool that never asks me to slow down.",
    name: "Marco T.",
    meta: "34 · Founder · Brooklyn",
    tag: "Performance",
    color: "#b8c8d4",
  },
];

export const faqs = [
  {
    question: "Which iPhone is right for me?",
    answer: "Choose iPhone 17 Pro if camera control and maximum performance matter most. iPhone 17 is the balanced choice for everyday photos, entertainment, and all-day use. iPhone Air prioritizes an exceptionally thin, light design, while iPhone 16e covers the modern essentials at the lowest price. The comparison cards above let you save a setup and revisit it anytime on this device.",
  },
  {
    question: "How does the trade-in estimate work?",
    answer: "Our configurator provides a simple planning estimate based on the device and condition you select. It is not an official valuation. Final trade-in credit depends on Apple’s inspection and current offer; confirm it during checkout before sending in your device.",
  },
  {
    question: "Can I move everything from my current phone?",
    answer: "Yes. Quick Start helps move your data from another iPhone, and the Move to iOS app transfers contacts, messages, photos, videos, mail accounts, calendars, and more from Android. Back up your old phone first and keep both devices connected to power during the transfer.",
  },
  {
    question: "Will my current SIM or carrier plan work?",
    answer: "Recent iPhone models use eSIM in many regions, and supported carriers make activation straightforward. Compatibility varies by country and plan, so check with your carrier before ordering. If you travel often, eSIM can also make it easier to add a local data plan.",
  },
  {
    question: "How can I make the battery last longer?",
    answer: "Keep your iPhone updated, avoid prolonged exposure to high heat, and enable Optimized Battery Charging. Low Power Mode is useful on long days. Battery health naturally changes over time; you can view its current maximum capacity in Settings > Battery > Battery Health & Charging.",
  },
  {
    question: "What happens after I configure an iPhone here?",
    answer: "You can save the configuration privately in your browser, then continue to Apple.com to confirm current pricing, financing eligibility, delivery, and availability. No payment is collected on this page, and your configuration is not transmitted to us.",
  },
];
