// ── KONNECT MOCK DATA ─────────────────────────────────────
// In production these come from Supabase (see supabase/schema.sql).

export const PRODUCERS = [
  {
    id: "prod_raj001",
    companyName: "Rajesh Films",
    contactName: "Rajesh Kumar",
    verified: true,
    genres: ["Thriller", "Drama", "Action"],
    languages: ["Hindi", "English"],
    budgetRange: ["₹5-20 Cr", "₹20-100 Cr"],
    formats: ["Feature Film", "Web Series"],
    targetOTT: ["Netflix", "Amazon", "Theatrical"],
    dealsActive: 5,
    dealsGreenlit: 2,
    emoji: "🎬",
  },
  {
    id: "prod_cine002",
    companyName: "CineVault Studios",
    contactName: "Meera Nair",
    verified: true,
    genres: ["Drama", "Romance", "Comedy"],
    languages: ["Hindi", "Tamil", "Telugu"],
    budgetRange: ["₹1-5 Cr", "₹5-20 Cr"],
    formats: ["Web Series", "Feature Film"],
    targetOTT: ["ZEE5", "SonyLIV"],
    dealsActive: 3,
    dealsGreenlit: 4,
    emoji: "🎞️",
  },
  {
    id: "prod_star003",
    companyName: "StarOTT Originals",
    contactName: "Vikram Shetty",
    verified: true,
    genres: ["Thriller", "Sci-Fi", "Horror"],
    languages: ["Hindi", "English"],
    budgetRange: ["₹20-100 Cr", "₹100 Cr+"],
    formats: ["Web Series"],
    targetOTT: ["Disney+ Hotstar", "Netflix"],
    dealsActive: 8,
    dealsGreenlit: 6,
    emoji: "⭐",
  },
  {
    id: "prod_mons004",
    companyName: "Monsoon Pictures",
    contactName: "Anjali Deshmukh",
    verified: true,
    genres: ["Drama", "Documentary"],
    languages: ["Hindi", "Marathi"],
    budgetRange: ["< ₹1 Cr", "₹1-5 Cr"],
    formats: ["Documentary", "Short Film"],
    targetOTT: ["MUBI", "Amazon"],
    dealsActive: 2,
    dealsGreenlit: 1,
    emoji: "🌧️",
  },
  {
    id: "prod_red005",
    companyName: "Red Chillies Digital",
    contactName: "Arun Bhatia",
    verified: true,
    genres: ["Action", "Thriller", "Comedy"],
    languages: ["Hindi"],
    budgetRange: ["₹20-100 Cr", "₹100 Cr+"],
    formats: ["Feature Film"],
    targetOTT: ["Theatrical", "Netflix"],
    dealsActive: 6,
    dealsGreenlit: 9,
    emoji: "🌶️",
  },
  {
    id: "prod_south006",
    companyName: "Southern Lights",
    contactName: "Karthik Subbaraj",
    verified: true,
    genres: ["Thriller", "Drama", "Action"],
    languages: ["Tamil", "Telugu", "Hindi"],
    budgetRange: ["₹5-20 Cr", "₹20-100 Cr"],
    formats: ["Feature Film", "Web Series"],
    targetOTT: ["Amazon", "SonyLIV", "Theatrical"],
    dealsActive: 4,
    dealsGreenlit: 3,
    emoji: "🌟",
  },
];

export const SWIPE_SCRIPTS = [
  {
    id: "pitch_noir",
    title: "Bollywood Noir",
    format: "Feature Film",
    genre: ["Thriller", "Drama"],
    language: "Hindi",
    budget: "₹5-20 Cr",
    match: 94,
    logline:
      "A washed-up Mumbai cop finds himself at the center of a conspiracy that reaches the top of the film industry itself.",
    writer: "Rohan Mehta",
    writerPlan: "Pro Member",
    emoji: "🎬",
  },
  {
    id: "pitch_monsoon",
    title: "Mumbai Monsoon",
    format: "Web Series",
    genre: ["Drama", "Romance"],
    language: "Hindi",
    budget: "₹1-5 Cr",
    match: 88,
    logline:
      "Four strangers stranded in a Mumbai high-rise during the worst monsoon in a century discover their lives are secretly intertwined.",
    writer: "Sana Iqbal",
    writerPlan: "Elite Member",
    emoji: "🌧️",
  },
  {
    id: "pitch_2047",
    title: "Time Brokers",
    format: "Web Series",
    genre: ["Sci-Fi", "Thriller"],
    language: "Hindi",
    budget: "₹20-100 Cr",
    match: 82,
    logline:
      "In 2047, a Mumbai cop discovers that time itself can be bought and sold — and the rich are buying decades from the poor.",
    writer: "Aditya Rao",
    writerPlan: "Pro Member",
    emoji: "⏳",
  },
  {
    id: "pitch_desert",
    title: "Desert Rain",
    format: "Feature Film",
    genre: ["Drama"],
    language: "Hindi",
    budget: "₹1-5 Cr",
    match: 77,
    logline:
      "A Rajasthani folk singer defies her village to record one song that could save her family's ancestral haveli.",
    writer: "Priya Chauhan",
    writerPlan: "Free Member",
    emoji: "🏜️",
  },
  {
    id: "pitch_grey",
    title: "The Grey Line",
    format: "Web Series",
    genre: ["Thriller", "Crime"],
    language: "English",
    budget: "₹5-20 Cr",
    match: 91,
    logline:
      "An encrypted-messaging whistleblower and the cybercrime officer hunting her realise they're being played by the same man.",
    writer: "Dev Malhotra",
    writerPlan: "Elite Member",
    emoji: "🕵️",
  },
];

export const MY_PITCHES = [
  {
    id: "pitch_noir",
    title: "Bollywood Noir",
    format: "Feature Film",
    genre: ["Thriller", "Drama"],
    status: "under_review",
    statusLabel: "Under Review",
    submittedAt: "2026-06-15",
    viewCount: 3,
    progress: 75,
    emoji: "🎬",
    ndaSigned: true,
    ipCertificate: true,
  },
  {
    id: "pitch_monsoon2",
    title: "Mumbai Monsoon",
    format: "Web Series",
    genre: ["Drama"],
    status: "nda",
    statusLabel: "NDA Signed",
    submittedAt: "2026-06-02",
    viewCount: 7,
    progress: 50,
    emoji: "📺",
    ndaSigned: true,
    ipCertificate: false,
  },
  {
    id: "pitch_desert2",
    title: "Desert Rain",
    format: "Feature Film",
    genre: ["Drama"],
    status: "narration",
    statusLabel: "Narration Scheduled",
    submittedAt: "2026-05-20",
    viewCount: 12,
    progress: 85,
    emoji: "🏜️",
    ndaSigned: true,
    ipCertificate: true,
  },
  {
    id: "pitch_draft1",
    title: "Midnight Local",
    format: "Short Film",
    genre: ["Horror"],
    status: "draft",
    statusLabel: "Draft",
    submittedAt: "—",
    viewCount: 0,
    progress: 20,
    emoji: "🚆",
    ndaSigned: false,
    ipCertificate: false,
  },
];

export const PITCH_TRACKER = [
  { title: "Bollywood Noir", producer: "Rajesh Films", stage: "NDA-1 Signed", updated: "2 days ago", tone: "purple" },
  { title: "Mumbai Monsoon", producer: "CineVault Studios", stage: "Synopsis Read", updated: "5 hours ago", tone: "sky" },
  { title: "Desert Rain", producer: "StarOTT Originals", stage: "Narration Requested", updated: "Just now", tone: "teal" },
  { title: "Bollywood Noir", producer: "Southern Lights", stage: "7-Day Wait", updated: "1 day ago", tone: "gold" },
];

export const MARKETPLACE = [
  { id: "m1", title: "The Last Projectionist", genre: "Drama", rating: 4.8, price: "Request Access", emoji: "🎥", writer: "K. Menon", badge: "Verified IP" },
  { id: "m2", title: "Kaali Raat", genre: "Horror", rating: 4.6, price: "₹15,000", emoji: "🌑", writer: "S. Verma", badge: "Battle Proven" },
  { id: "m3", title: "Startup Shaadi", genre: "Comedy", rating: 4.4, price: "Request Access", emoji: "💍", writer: "N. Gupta", badge: "Verified IP" },
  { id: "m4", title: "Border Post 17", genre: "Action", rating: 4.9, price: "₹40,000", emoji: "🪖", writer: "A. Singh", badge: "Trending" },
  { id: "m5", title: "The Silk Route", genre: "Thriller", rating: 4.7, price: "Request Access", emoji: "🧭", writer: "R. Pillai", badge: "Verified IP" },
  { id: "m6", title: "Paper Kingdom", genre: "Drama", rating: 4.5, price: "₹22,000", emoji: "📜", writer: "M. Joshi", badge: "New" },
];

export const ROOMS = [
  { id: "r1", name: "Monsoon Scripts", members: 4, scripts: 3, active: "2 days ago", emoji: "🏠" },
  { id: "r2", name: "Thriller Writers Guild", members: 7, scripts: 5, active: "6 hours ago", emoji: "🗡️" },
];

export const TALENT = [
  { id: "t1", name: "Rohan Mehta", plan: "Pro Member", genres: "Thriller, Drama", years: 8, city: "Mumbai", projects: 12, deals: 3 },
  { id: "t2", name: "Sana Iqbal", plan: "Elite Member", genres: "Drama, Romance", years: 11, city: "Delhi", projects: 18, deals: 6 },
  { id: "t3", name: "Aditya Rao", plan: "Pro Member", genres: "Sci-Fi, Thriller", years: 5, city: "Bengaluru", projects: 7, deals: 1 },
  { id: "t4", name: "Priya Chauhan", plan: "Free Member", genres: "Drama", years: 3, city: "Jaipur", projects: 4, deals: 0 },
];

export const PIPELINE_COLUMNS = [
  { key: "nda", label: "NDA Pending", tone: "gold", deals: [{ title: "The Grey Line", writer: "Dev Malhotra", updated: "2hr ago" }] },
  { key: "synopsis", label: "Synopsis", tone: "sky", deals: [{ title: "Mumbai Monsoon", writer: "Sana Iqbal", updated: "5hr ago" }] },
  { key: "wait", label: "7-Day Wait", tone: "gold", deals: [{ title: "Time Brokers", writer: "Aditya Rao", updated: "1d ago" }] },
  { key: "narr", label: "Narration", tone: "teal", deals: [{ title: "Bollywood Noir", writer: "Rohan Mehta", updated: "2hr ago" }] },
  { key: "agreement", label: "Agreement", tone: "purple", deals: [] },
  { key: "greenlit", label: "Greenlit", tone: "green", deals: [{ title: "Desert Rain", writer: "Priya Chauhan", updated: "3d ago" }] },
];

export const GENRES = ["Drama", "Thriller", "Comedy", "Horror", "Action", "Romance", "Sci-Fi"];
export const LANGUAGES = ["Hindi", "English", "Tamil", "Telugu", "Marathi", "Bengali"];
export const OTT_PLATFORMS = ["Netflix", "Amazon", "ZEE5", "SonyLIV", "Disney+ Hotstar", "Theatrical"];
export const BUDGETS = ["< ₹1 Cr", "₹1-5 Cr", "₹5-20 Cr", "₹20-100 Cr", "₹100 Cr+"];
export const WRITER_TYPES = [
  { key: "screenplay", label: "Screenplay", emoji: "🎬", desc: "Feature film scripts" },
  { key: "novel", label: "Novel / Book", emoji: "📚", desc: "Adaptation-ready fiction" },
  { key: "webseries", label: "Web Series", emoji: "📺", desc: "Episodic storytelling" },
  { key: "shortfilm", label: "Short Film", emoji: "🎞️", desc: "Festival & OTT shorts" },
  { key: "reality", label: "Reality Show", emoji: "🎭", desc: "Unscripted formats" },
  { key: "documentary", label: "Documentary", emoji: "🎥", desc: "True-story features" },
];

export const WRITER_PLANS = [
  { name: "Free", price: "₹0", period: "/month", features: ["3 pitches / month", "1 DNA match", "Basic badge", "No Rooms", "No Battle"], cta: "Current Plan", current: true },
  { name: "Pro", price: "₹499", period: "/month", features: ["20 pitches / month", "50 DNA matches", "Pro badge", "1 Writers Room", "Battle access"], cta: "Upgrade to Pro", popular: true },
  { name: "Elite", price: "₹2,999", period: "/month", features: ["Unlimited pitches", "500 DNA matches", "Elite badge", "5 Writers Rooms", "Priority jury"], cta: "Go Elite" },
];

export const PRODUCER_PLANS = [
  { name: "Studio Free", price: "₹0", period: "/month", features: ["50 matches / month", "5 script requests", "1 active deal", "No Talent Pool"], cta: "Current Plan", current: true },
  { name: "Studio Pro", price: "₹1,999", period: "/month", features: ["500 matches / month", "50 script requests", "20 active deals", "Talent Pool access"], cta: "Upgrade", popular: true },
  { name: "Studio Elite", price: "₹9,999", period: "/month", features: ["Unlimited matches", "Unlimited requests", "Unlimited deals", "Priority Talent Pool"], cta: "Go Elite" },
];

// ── DNA MATCH ALGORITHM (spec §16.4) ─────────────────────
export function dnaMatch(pitch, producer) {
  const genreOverlap = pitch.genre.filter((g) => producer.genres.includes(g)).length;
  const budgetCompatible = producer.budgetRange.includes(pitch.budget);
  const langOverlap = producer.languages.includes(pitch.language) ? 1 : 0;
  const formatMatch = producer.formats.includes(pitch.format);
  const score =
    (genreOverlap / Math.max(pitch.genre.length, 1)) * 40 +
    (budgetCompatible ? 25 : 0) +
    langOverlap * 20 +
    (formatMatch ? 15 : 0);
  return Math.round(score);
}

// ── UTILITIES ─────────────────────────────────────────────
export function formatINR(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export function generateHash() {
  return (
    "sha256:" +
    Array.from({ length: 16 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("")
  );
}
