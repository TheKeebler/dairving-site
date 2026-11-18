/* =========================================================
   HEADLINES
   Edit this list to add or swap headlines.
   real: true needs a source { label, url }.
   Each round deals PER_SIDE real and PER_SIDE fake, shuffled.
   Infinity = every headline, every round. Set a number (like 5) for shorter rounds.
   art: see the ART list below for the available pictures.
   ========================================================= */
const PER_SIDE = Infinity;

const HEADLINES = [
  /* ---------- REAL ---------- */
  {
    name: "Fish Tank Hack", age: "2018", art: "tank", color: "#1F9C8A", real: true,
    headline: "Criminals hacked a fish tank to steal data from a casino",
    chips: ["Casino", "IoT", "Data theft"],
    note: "Attackers got onto a casino's network through a smart thermometer in a lobby aquarium, then worked their way to its database.",
    message: "Yep, I was real. A thermometer was the way in.",
    source: { label: "Security Affairs, 2018", url: "https://securityaffairs.com/71433/hacking/fish-tank-hack.html?amp=1" }
  },
  {
    name: "Don't Feed Them", age: "2026", art: "hood", color: "#4B3F72", real: true,
    headline: "Please Don't Feed the Scattered Lapsus ShinyHunters",
    chips: ["Extortion", "Threat actors", "Data theft"],
    note: "A real Krebs on Security story about the extortion crew made up of members tied to Scattered Spider, Lapsus$, and ShinyHunters.",
    message: "Real. Krebs named me, not my mom.",
    source: { label: "Krebs on Security, 2026", url: "https://krebsonsecurity.com/2026/02/please-dont-feed-the-scattered-lapsus-shiny-hunters/" }
  },
  {
    name: "Dating App Breach", age: "2026", art: "profile", color: "#D9416E", real: true,
    headline: "Match, Hinge, OkCupid, and Panera Bread breached by ransomware group",
    chips: ["Dating apps", "Restaurants", "Extortion"],
    note: "In early 2026 an extortion group claimed it stole data from Match Group's dating apps and from Panera Bread.",
    message: "Real. Awkward first date for everyone.",
    source: { label: "Malwarebytes, 2026", url: "https://www.malwarebytes.com/blog/news/2026/01/match-hinge-okcupid-and-panera-bread-breached-by-ransomware-group" }
  },
  {
    name: "Operation Cupcake", age: "2011", art: "cupcake", color: "#E07A9B", real: true,
    headline: "MI6 hits al-Qaida in 'Operation Cupcake'",
    chips: ["Intelligence", "Defacement", "Counterterrorism"],
    note: "British intelligence swapped the bomb-making pages of an online al-Qaida magazine for cupcake recipes.",
    message: "Real. I was delicious and counterterrorism.",
    source: { label: "UPI, 2011", url: "https://www.upi.com/Top_News/World-News/2011/06/03/MI6-hits-al-Qaida-in-Operation-Cupcake/86971307102683/" }
  },
  {
    name: "Anna-Senpai", age: "2017", art: "worm", color: "#3E5C76", real: true,
    headline: "Who is Anna-Senpai, the Mirai worm author?",
    chips: ["Botnets", "IoT", "Investigation"],
    note: "Brian Krebs dug into who was behind the alias that leaked the source code for the Mirai IoT botnet.",
    message: "Real. That alias did not stay anonymous.",
    source: { label: "Krebs on Security, 2017", url: "https://krebsonsecurity.com/2017/01/who-is-anna-senpai-the-mirai-worm-author/" }
  },
  {
    name: "Rude Robovac", age: "2024", art: "vacuum", color: "#2E8B7A", real: true,
    headline: "Robot vacuums hacked to shout slurs at their owners",
    chips: ["Smart home", "IoT", "Hijacking"],
    note: "Attackers took over Ecovacs robot vacuums in several US cities and used their speakers to yell at people in their own homes.",
    message: "Real. I just wanted to clean.",
    source: { label: "Vice, 2024", url: "https://www.vice.com/en/article/ecovacs-robot-vacuums-hacked-slurs/" }
  },
  {
    name: "Bad Hire", age: "2024", art: "badge", color: "#5A6B8C", real: true,
    headline: "KnowBe4, a security training company, accidentally hired a North Korean hacker as a Principal Software Engineer",
    chips: ["Insider threat", "Hiring", "North Korea"],
    note: "The company caught its new remote hire, a North Korean operative using a stolen identity, when he tried to load malware on his work laptop.",
    message: "Real. Onboarding went badly.",
    source: { label: "KnowBe4 blog, 2024", url: "https://blog.knowbe4.com/how-a-north-korean-fake-it-worker-tried-to-infiltrate-us" }
  },
  {
    name: "Doom Tractor", age: "2022", art: "tractor", color: "#3E7D3A", real: true,
    headline: "Hacker jailbreaks John Deere tractor live on stage at DEF CON, then runs Doom on it",
    chips: ["Right to repair", "DEF CON", "Jailbreak"],
    note: "A researcher known as Sick Codes jailbroke a John Deere tractor display at DEF CON 2022 and got Doom running on it.",
    message: "Real. I plow and I frag.",
    source: { label: "The Register, 2022", url: "https://www.theregister.com/2022/08/16/john_deere_doom" }
  },
  {
    name: "Thunderstruck", age: "2012", art: "music", color: "#B8452B", real: true,
    headline: "Iranian nuclear facility computers blast AC/DC's 'Thunderstruck' during a cyberattack",
    chips: ["Iran", "Malware", "Nuclear"],
    note: "This was really reported in 2012, based on an email from an unnamed Iranian scientist. It was never confirmed, and despite how it's often told, it wasn't Stuxnet.",
    message: "Real report, shaky details. Still a banger.",
    source: { label: "iTnews, 2012", url: "https://www.itnews.com.au/news/ac-dc-song-used-in-iranian-nuclear-program-attack-309852" }
  },
  {
    name: "Hijacked Jeep", age: "2015", art: "car", color: "#2F7DD1", real: true,
    headline: "Researchers remotely take control of a Jeep Cherokee on the highway",
    chips: ["Cars", "Remote access", "Recall"],
    note: "Two researchers got in through the infotainment system and could mess with steering and brakes. About 1.4 million vehicles were recalled.",
    message: "Real. A reporter was driving me at the time.",
    source: { label: "Kaspersky Daily, 2015", url: "https://www.kaspersky.com/blog/remote-car-hack/" }
  },
  {
    name: "Pipeline Shutdown", age: "2021", art: "pipe", color: "#C2492B", real: true,
    headline: "Ransomware attack shuts down Colonial Pipeline, causing fuel shortages on the East Coast",
    chips: ["Energy", "Ransomware", "East Coast"],
    note: "In May 2021 the company shut down its fuel pipeline after a ransomware attack, and panic buying left many gas stations empty.",
    message: "Real, and the gas lines proved it.",
    source: { label: "ThreatDown, 2021", url: "https://www.threatdown.com/blog/ransomware-attack-shuts-down-colonial-pipeline-fuel-supply/" }
  },
  {
    name: "SWIFT Heist", age: "2016", art: "bank", color: "#3E7D52", real: true,
    headline: "Attackers steal $81 million from Bangladesh's central bank using the SWIFT network",
    chips: ["Banking", "Wire fraud", "$81M"],
    note: "Attackers sent fraudulent transfer requests from Bangladesh Bank's account at the New York Fed. About $81 million went through.",
    message: "Real. One of the biggest online bank heists ever.",
    source: { label: "Fortune, 2016", url: "https://fortune.com/2016/05/09/bangladesh-swift-bank-heist/" }
  },

  /* ---------- FAKE ---------- */
  {
    name: "Leaky Speaker", age: "2019", art: "speaker", color: "#3D7CC9", real: false,
    headline: "Hackers use Alexa to leak classified cookbook recipes",
    chips: ["Smart speakers", "Data leak", "Cooking"],
    note: "Smart speakers have had real privacy scares, but nobody has leaked a secret cookbook through one.",
    message: "Made up. My recipes stay secret."
  },
  {
    name: "Ramen Worm", age: "2017", art: "bowl", color: "#D98A2B", real: false,
    headline: "Who is ByteNoodle, the author of the 'Instant Ramen Worm'?",
    chips: ["Malware", "Investigation", "Worms"],
    note: "It copies the style of real investigative headlines, but ByteNoodle and the ramen worm don't exist.",
    message: "Made up. Ready in three minutes, though."
  },
  {
    name: "Emoji Lockout", age: "2023", art: "sofa", color: "#2B5DA8", real: false,
    headline: "Ransomware hits IKEA, locks smart furniture with emoji passwords",
    chips: ["Ransomware", "Retail", "Smart home"],
    note: "There's no ransomware strain that locks your bookshelf behind an emoji password.",
    message: "Made up. Some assembly required."
  },
  {
    name: "Crypto Espresso", age: "2018", art: "cup", color: "#6B4A35", real: false,
    headline: "Hackers exploit espresso machines to mine Monero cryptocurrency",
    chips: ["Cryptomining", "IoT", "Coffee"],
    note: "Cryptominers do turn up on odd devices, which is what makes this one tricky, but this story is made up.",
    message: "Made up. Just a double shot."
  },
  {
    name: "Pickle Spider", age: "2025", art: "spider", color: "#6E9E2F", real: false,
    headline: "Tangerine Mongoose and Pickle Spider announced joint operation targeting Western financial institutions",
    chips: ["Threat actors", "Finance", "APT"],
    note: "Threat intel firms really do give groups names like this, which is why it sounds believable. These two are invented.",
    message: "Made up. Tangerine Mongoose isn't real either."
  },
  {
    name: "Fridge Ransom", age: "2016", art: "fridge", color: "#5B6CC9", real: false,
    headline: "Ransomware group demands Bitcoin to unlock Wi-Fi enabled fridges",
    chips: ["Ransomware", "Smart home", "Bitcoin"],
    note: "Researchers have shown smart fridges can be hacked, but there was no wave of fridge ransom attacks.",
    message: "Made up. Your leftovers are safe."
  },
  {
    name: "Toaster Botnet", age: "2017", art: "toaster", color: "#8E3FB8", real: false,
    headline: "Smart toaster botnet knocks a regional bank offline for six hours",
    chips: ["Banking", "IoT", "6 hours down"],
    note: "IoT botnets are very real (Mirai ran on cameras and DVRs), but no army of toasters has taken down a bank.",
    message: "Made up. I can barely make toast."
  },
  {
    name: "Miles Ransom", age: "2022", art: "plane", color: "#E08A1E", real: false,
    headline: "Hackers demand a ransom paid entirely in airline miles",
    chips: ["Ransomware", "Travel", "Airlines"],
    note: "Ransomware crews want money that's hard to trace, which is why they ask for crypto. Airline miles could be frozen in minutes.",
    message: "Made up. Nobody wants a ransom with blackout dates."
  },
  {
    name: "Gossip Fridge", age: "2020", art: "fridge", color: "#7A5BC9", real: false,
    headline: "Smart fridge emails a CEO's grocery list to a competitor",
    chips: ["Smart home", "Corporate", "Data leak"],
    note: "Smart appliances have leaked data before, but none has tattled to a rival company.",
    message: "Made up. I keep secrets cold."
  },
  {
    name: "Loyalty Program", age: "2024", art: "card", color: "#B23A7A", real: false,
    headline: "Ransomware gang launches a loyalty program for repeat victims",
    chips: ["Ransomware", "Extortion", "Victims"],
    note: "Some gangs do run surprisingly polished support desks, but there's no punch card for getting hacked twice.",
    message: "Made up. Tenth hack is not free."
  }
];

/* ---------- Art (simple original illustrations, 230x180) ---------- */
const ART = {
  profile: '<rect x="72" y="14" width="86" height="152" rx="9" fill="#F4EDE4"/><rect x="80" y="22" width="70" height="72" rx="6" fill="#BFC7EE"/><ellipse cx="115" cy="60" rx="24" ry="16" fill="#E9B872"/><path d="M103 52 l5 11 M115 50 l5 12 M127 52 l4 10" stroke="#B9813F" stroke-width="3" stroke-linecap="round" fill="none"/><rect x="82" y="104" width="48" height="8" rx="4" fill="#B9B2C1"/><rect x="82" y="120" width="62" height="7" rx="3.5" fill="#D8D2DE"/><path transform="translate(115 146) scale(0.36)" d="M0 18 C0 18 -20 6 -23 -4 C-25 -12 -20 -19 -12 -19 C-6 -19 -2 -16 0 -12 C2 -16 6 -19 12 -19 C20 -19 25 -12 23 -4 C20 6 0 18 0 18 Z" fill="#D9416E"/><circle cx="156" cy="20" r="15" fill="#1D1724"/><rect x="154.25" y="11" width="3.5" height="11" rx="1.75" fill="#FFFFFF"/><circle cx="156" cy="27" r="2.2" fill="#FFFFFF"/>',
  toaster: '<rect x="30" y="60" width="160" height="110" rx="28" fill="#F4EDE4"/><rect x="30" y="150" width="160" height="20" rx="10" fill="#D8CDBF"/><rect x="62" y="64" width="34" height="10" rx="5" fill="#3A2E35"/><rect x="124" y="64" width="34" height="10" rx="5" fill="#3A2E35"/><rect x="74" y="36" width="12" height="32" rx="4" fill="#E9C27A"/><rect x="134" y="30" width="12" height="38" rx="4" fill="#E9C27A"/><rect x="188" y="96" width="14" height="10" rx="3" fill="#3A2E35"/><circle cx="110" cy="116" r="16" fill="#C81E63"/><path d="M104 110 l12 12 M116 110 l-12 12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
  car: '<rect x="30" y="80" width="170" height="56" rx="12" fill="#F4EDE4"/><path d="M60 80 L78 44 H150 L170 80 Z" fill="#F4EDE4"/><rect x="86" y="52" width="30" height="24" rx="4" fill="#9CC3EC"/><rect x="122" y="52" width="30" height="24" rx="4" fill="#9CC3EC"/><circle cx="70" cy="138" r="20" fill="#1D1724"/><circle cx="70" cy="138" r="8" fill="#B9B2C1"/><circle cx="164" cy="138" r="20" fill="#1D1724"/><circle cx="164" cy="138" r="8" fill="#B9B2C1"/><path d="M190 40 q14 14 0 28 M202 30 q24 24 0 48" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
  tank: '<rect x="30" y="40" width="170" height="120" rx="10" fill="#BFE3F2" stroke="#F4EDE4" stroke-width="6"/><path d="M36 70 q20 -8 40 0 t40 0 t40 0 t40 0" fill="none" stroke="#fff" stroke-width="3"/><path d="M80 110 q18 -16 36 0 q-18 16 -36 0 z M116 110 l12 -10 v20 z" fill="#E08A1E"/><circle cx="84" cy="107" r="2.5" fill="#1D1724"/><rect x="162" y="56" width="12" height="70" rx="6" fill="#fff"/><circle cx="168" cy="128" r="11" fill="#C81E63"/><rect x="165" y="84" width="6" height="40" rx="3" fill="#C81E63"/><path d="M150 150 q4 -14 0 -26 M60 150 q-4 -10 0 -20" fill="none" stroke="#5E9E6E" stroke-width="5" stroke-linecap="round"/>',
  pipe: '<rect x="10" y="70" width="90" height="36" rx="6" fill="#F4EDE4"/><rect x="130" y="70" width="90" height="36" rx="6" fill="#F4EDE4"/><rect x="92" y="62" width="14" height="52" rx="3" fill="#D8CDBF"/><rect x="124" y="62" width="14" height="52" rx="3" fill="#D8CDBF"/><circle cx="115" cy="88" r="16" fill="#1D1724"/><path d="M107 88 h16" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M60 128 q8 14 0 22 q-8 -8 0 -22 z" fill="#1D1724" opacity="0.8"/><path d="M170 30 l6 12 l13 2 l-9 9 l2 13 l-12 -6 l-12 6 l2 -13 l-9 -9 l13 -2 z" fill="#FFD45C"/>',
  bank: '<path d="M30 70 L115 30 L200 70 Z" fill="#F4EDE4"/><rect x="40" y="76" width="150" height="10" fill="#D8CDBF"/><rect x="52" y="90" width="16" height="56" fill="#F4EDE4"/><rect x="88" y="90" width="16" height="56" fill="#F4EDE4"/><rect x="126" y="90" width="16" height="56" fill="#F4EDE4"/><rect x="162" y="90" width="16" height="56" fill="#F4EDE4"/><rect x="34" y="148" width="162" height="14" rx="3" fill="#D8CDBF"/><circle cx="115" cy="58" r="9" fill="#FFD45C"/>',
  plane: '<path d="M30 100 L190 70 Q210 66 206 80 Q202 92 186 96 L30 112 Z" fill="#F4EDE4"/><path d="M110 84 L80 40 L96 38 L140 80 Z" fill="#D8CDBF"/><path d="M118 100 L96 140 L112 142 L146 100 Z" fill="#D8CDBF"/><path d="M40 100 L28 76 L40 74 L58 98 Z" fill="#D8CDBF"/><circle cx="160" cy="150" r="16" fill="#FFD45C"/>',
  fridge: '<rect x="70" y="20" width="90" height="146" rx="12" fill="#F4EDE4"/><rect x="70" y="70" width="90" height="4" fill="#D8CDBF"/><rect x="146" y="36" width="6" height="22" rx="3" fill="#B9B2C1"/><rect x="146" y="86" width="6" height="30" rx="3" fill="#B9B2C1"/><path d="M176 50 q12 12 0 24 M188 42 q22 20 0 40" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
  card: '<rect x="40" y="50" width="150" height="96" rx="14" fill="#F4EDE4"/><rect x="40" y="70" width="150" height="16" fill="#1D1724"/><circle cx="68" cy="116" r="9" fill="#C81E63"/><circle cx="94" cy="116" r="9" fill="#C81E63"/><circle cx="120" cy="116" r="9" fill="#C81E63"/><circle cx="146" cy="116" r="9" fill="none" stroke="#B9B2C1" stroke-width="3"/><circle cx="172" cy="116" r="9" fill="none" stroke="#B9B2C1" stroke-width="3"/>',
  hood: '<path d="M115 28 C70 28 52 70 52 112 L52 162 L178 162 L178 112 C178 70 160 28 115 28 Z" fill="#1D1724"/><path d="M84 98 Q115 68 146 98 L146 130 Q115 146 84 130 Z" fill="#332A3D"/><rect x="92" y="104" width="18" height="6" rx="3" fill="#7BE0A8"/><rect x="120" y="104" width="18" height="6" rx="3" fill="#7BE0A8"/>',
  heart: '<path d="M115 160 C115 160 50 124 38 88 C28 60 46 32 74 32 C92 32 106 42 115 56 C124 42 138 32 156 32 C184 32 202 60 192 88 C180 124 115 160 115 160 Z" fill="#F4EDE4"/><path d="M110 50 L100 84 L124 100 L112 140" fill="none" stroke="#1D1724" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>',
  cupcake: '<path d="M70 100 L160 100 L148 160 L82 160 Z" fill="#F4EDE4"/><path d="M88 100 L94 160 M108 100 L110 160 M124 100 L122 160 M142 100 L136 160" stroke="#D8CDBF" stroke-width="3"/><path d="M62 102 C58 70 90 54 115 60 C140 54 172 70 168 102 Z" fill="#FFE2EC"/><circle cx="115" cy="48" r="11" fill="#C81E63"/>',
  worm: '<path d="M40 130 q20 -40 40 0 t40 0 t40 0" fill="none" stroke="#F4EDE4" stroke-width="22" stroke-linecap="round"/><circle cx="172" cy="122" r="18" fill="#F4EDE4"/><circle cx="178" cy="116" r="4" fill="#1D1724"/><path d="M50 46 h120 M50 64 h80" stroke="#7BE0A8" stroke-width="5" stroke-linecap="round" opacity="0.85"/>',
  vacuum: '<circle cx="110" cy="100" r="62" fill="#F4EDE4"/><circle cx="110" cy="100" r="40" fill="#D8CDBF"/><circle cx="110" cy="100" r="10" fill="#1D1724"/><path d="M182 52 l14 -10 v40 l-14 -10 z" fill="#FFD45C"/><path d="M204 50 q10 12 0 24" fill="none" stroke="#FFD45C" stroke-width="4" stroke-linecap="round"/>',
  badge: '<rect x="60" y="30" width="110" height="140" rx="12" fill="#F4EDE4"/><rect x="100" y="20" width="30" height="20" rx="4" fill="#D8CDBF"/><circle cx="115" cy="80" r="22" fill="#1D1724"/><rect x="80" y="116" width="70" height="8" rx="4" fill="#B9B2C1"/><rect x="90" y="132" width="50" height="8" rx="4" fill="#B9B2C1"/><circle cx="160" cy="152" r="16" fill="#C81E63"/><path d="M154 146 l12 12 M166 146 l-12 12" stroke="#fff" stroke-width="3" stroke-linecap="round"/>',
  tractor: '<rect x="60" y="66" width="70" height="54" rx="6" fill="#FFD45C"/><rect x="120" y="96" width="74" height="30" rx="6" fill="#FFD45C"/><rect x="72" y="76" width="44" height="30" rx="3" fill="#1D1724"/><rect x="78" y="82" width="32" height="18" fill="#C81E63"/><circle cx="90" cy="140" r="30" fill="#1D1724"/><circle cx="90" cy="140" r="10" fill="#B9B2C1"/><circle cx="172" cy="146" r="18" fill="#1D1724"/><circle cx="172" cy="146" r="6" fill="#B9B2C1"/>',
  music: '<path d="M90 50 L170 34 L170 122" fill="none" stroke="#F4EDE4" stroke-width="10" stroke-linejoin="round"/><path d="M90 50 L90 138" stroke="#F4EDE4" stroke-width="10"/><ellipse cx="74" cy="140" rx="20" ry="15" fill="#F4EDE4"/><ellipse cx="154" cy="124" rx="20" ry="15" fill="#F4EDE4"/><path d="M40 56 l-14 26 h16 l-10 26" fill="none" stroke="#FFD45C" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>',
  speaker: '<rect x="80" y="36" width="70" height="124" rx="35" fill="#F4EDE4"/><rect x="80" y="54" width="70" height="8" fill="#9CC3EC"/><circle cx="115" cy="112" r="22" fill="#D8CDBF"/><path d="M162 80 q14 20 0 40 M174 70 q24 30 0 60" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
  bowl: '<path d="M50 92 H180 C180 126 150 152 115 152 C80 152 50 126 50 92 Z" fill="#F4EDE4"/><path d="M78 92 q10 -28 20 0 q10 -28 20 0 q10 -28 20 0" fill="none" stroke="#FFD45C" stroke-width="5"/><path d="M146 28 L114 90 M166 32 L128 90" stroke="#8B5A2B" stroke-width="5" stroke-linecap="round"/>',
  sofa: '<rect x="40" y="82" width="150" height="48" rx="10" fill="#F4EDE4"/><rect x="30" y="72" width="26" height="68" rx="10" fill="#D8CDBF"/><rect x="174" y="72" width="26" height="68" rx="10" fill="#D8CDBF"/><rect x="56" y="58" width="118" height="34" rx="10" fill="#F4EDE4"/><rect x="48" y="140" width="10" height="16" fill="#1D1724"/><rect x="172" y="140" width="10" height="16" fill="#1D1724"/><rect x="98" y="24" width="34" height="28" rx="6" fill="#FFD45C"/><path d="M106 24 v-6 a9 9 0 0 1 18 0 v6" fill="none" stroke="#FFD45C" stroke-width="5"/>',
  cup: '<path d="M70 70 H150 L142 150 H78 Z" fill="#F4EDE4"/><path d="M150 86 h10 a14 14 0 0 1 0 28 h-14" fill="none" stroke="#F4EDE4" stroke-width="8"/><path d="M92 30 q8 10 0 20 M112 26 q8 10 0 20 M132 30 q8 10 0 20" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="110" cy="110" r="14" fill="#FFD45C"/>',
  spider: '<path d="M88 90 L50 70 M88 100 L46 100 M88 112 L52 136 M142 90 L180 70 M142 100 L184 100 M142 112 L178 136" stroke="#1D1724" stroke-width="6" stroke-linecap="round"/><circle cx="115" cy="104" r="30" fill="#1D1724"/><circle cx="115" cy="64" r="16" fill="#1D1724"/><circle cx="109" cy="62" r="3" fill="#7BE0A8"/><circle cx="121" cy="62" r="3" fill="#7BE0A8"/>'
};

function artSvg(key, cls) {
  return '<svg class="' + (cls || '') + '" viewBox="0 0 230 180" aria-hidden="true">' + ART[key] + '</svg>';
}

/* ---------- Helpers ---------- */
const $ = (id) => document.getElementById(id);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

/* ---------- State ---------- */
let deck = [], idx = 0, answers = [], streak = 0, locked = false;

function start() {
  const reals = shuffle(HEADLINES.filter((h) => h.real)).slice(0, PER_SIDE);
  const fakes = shuffle(HEADLINES.filter((h) => !h.real)).slice(0, PER_SIDE);
  deck = shuffle(reals.concat(fakes));
  idx = 0; answers = []; streak = 0; locked = false;
  $("results").hidden = true;
  $("game").style.display = "";
  document.body.classList.remove("results-mode");
  renderCard();
  renderSidebar();
  renderStats();
}

function current() { return deck[idx]; }

function renderCard() {
  const h = current();
  const card = $("card");
  card.style.transition = "none";
  card.style.transform = "scale(0.96)";
  card.style.opacity = "0";
  card.classList.remove("locked");

  $("cardArt").style.background = h.color;
  $("cardArt").querySelectorAll("svg.art").forEach((n) => n.remove());
  $("cardArt").insertAdjacentHTML("afterbegin", artSvg(h.art, "art"));
  $("cardName").textContent = h.name;
  $("cardAge").textContent = h.age;
  $("cardHeadline").textContent = h.headline;
  $("cardChips").innerHTML = h.chips.map((c) => '<span class="chip">' + esc(c) + '</span>').join("");
  $("bars").innerHTML = deck.map((_, i) => '<span class="bar' + (i <= idx ? ' on' : '') + '"></span>').join("");
  $("stampReal").style.opacity = 0;
  $("stampFake").style.opacity = 0;
  card.setAttribute("aria-label", "Headline " + (idx + 1) + " of " + deck.length + ": " + h.headline);

  $("banner").hidden = true;
  $("controlsWrap").hidden = false;
  $("after").hidden = true;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    card.style.transition = "";
    card.style.transform = "none";
    card.style.opacity = "1";
  }));
}

function guess(saidReal) {
  if (locked) return;
  locked = true;
  const h = current();
  const correct = saidReal === h.real;
  answers.push({ h: h, saidReal: saidReal, correct: correct });
  streak = correct ? streak + 1 : 0;

  const card = $("card");
  card.classList.add("locked");
  card.style.transform = saidReal ? "rotate(2deg)" : "rotate(-2deg)";
  $("stampReal").style.opacity = h.real ? 1 : 0;
  $("stampFake").style.opacity = h.real ? 0 : 1;

  $("banner").className = "reveal " + (correct ? "win" : "lose");
  $("bannerTitle").textContent = (correct ? "You called it. " : "It got you. ") + (h.real ? "It's real." : "It's fake.");
  $("bannerText").textContent = h.note;
  $("banner").hidden = false;

  $("controlsWrap").hidden = true;
  $("after").hidden = false;
  const src = $("btnSource");
  if (h.real && h.source) { src.hidden = false; src.href = h.source.url; src.textContent = "Read the story"; src.title = h.source.label; src.setAttribute("aria-label", "Read the story (" + h.source.label + ")"); }
  else { src.hidden = true; }
  $("btnNext").textContent = idx === deck.length - 1 ? "See results" : "Keep swiping";
  $("btnNext").focus({ preventScroll: true });

  renderSidebar();
  renderStats();
}

function next() {
  if (!locked) return;
  const last = answers[answers.length - 1];
  const card = $("card");
  card.style.transform = (last.saidReal ? "translateX(140%) rotate(18deg)" : "translateX(-140%) rotate(-18deg)");
  card.style.opacity = "0";
  setTimeout(() => {
    idx++;
    locked = false;
    if (idx >= deck.length) showResults();
    else renderCard();
  }, 260);
}

function renderStats() {
  const right = answers.filter((a) => a.correct).length;
  $("sScore").textContent = right + "/" + answers.length + " called right";
  $("mScore").textContent = right + "/" + answers.length + " right";
  $("mStreak").textContent = streak + " streak";
}

function renderSidebar() {
  const called = answers.filter((a) => a.correct);
  const left = deck.length - answers.length;
  let html = "";
  if (!called.length) html += '<p class="empty-note">Headlines you call correctly show up here.</p>';
  html += '<div class="tiles">';
  called.forEach((a) => {
    html += '<div class="tile"><div class="tile-art" data-color="' + a.h.color + '">' + artSvg(a.h.art) + '</div><span class="tile-name">' + esc(a.h.name) + '</span></div>';
  });
  if (left > 0) html += '<div class="tile"><div class="tile-empty">' + left + ' left in the deck</div></div>';
  html += '</div>';
  $("panelCalled").innerHTML = html;

  const msgs = answers.slice().reverse();
  $("panelMsgs").innerHTML = msgs.length
    ? msgs.map((a) => '<div class="msg"><span class="msg-dot" data-color="' + a.h.color + '">' + artSvg(a.h.art) + '</span><div class="msg-body"><span class="msg-name">' + esc(a.h.name) + '</span><span class="msg-text">' + esc(a.h.message) + '</span></div></div>').join("")
    : '<p class="empty-note">Each headline messages you the truth after you swipe.</p>';
  document.querySelectorAll("[data-color]").forEach((el) => { el.style.background = el.dataset.color; });
}

function showResults() {
  const total = answers.length;
  const right = answers.filter((a) => a.correct).length;
  const reals = answers.filter((a) => a.h.real), fakes = answers.filter((a) => !a.h.real);
  const realRight = reals.filter((a) => a.correct).length, fakeRight = fakes.filter((a) => a.correct).length;

  $("game").style.display = "none";
  $("results").hidden = false;
  document.body.classList.add("results-mode");
  $("rScore").textContent = right;
  $("rTotal").textContent = total;
  const pct = total ? right / total : 0;
  const lines = [
    [1, "Perfect. Nothing gets past you."],
    [0.8, "Sharp eye. You'd do fine on a SOC shift."],
    [0.6, "Solid. A couple slipped by."],
    [0.4, "The internet fooled you a few times."],
    [0, "Rough round. The real ones really are weird."]
  ];
  $("rLine").textContent = lines.find((l) => pct >= l[0])[1];
  $("rReal").textContent = realRight + "/" + reals.length;
  $("rFake").textContent = fakeRight + "/" + fakes.length;
  $("rRealFill").style.width = (reals.length ? realRight / reals.length * 100 : 0) + "%";
  $("rFakeFill").style.width = (fakes.length ? fakeRight / fakes.length * 100 : 0) + "%";

  const best = Math.max(right, parseInt(store.get("rof-best") || "0", 10));
  store.set("rof-best", String(best));
  $("rBest").textContent = "Your best on this device: " + best + "/" + total;

  $("reviewList").innerHTML = answers.map((a) => {
    const meta = (a.correct ? "" : "You said " + (a.saidReal ? "Real" : "Fake") + ". ") +
      (a.h.real && a.h.source ? '<a href="' + esc(a.h.source.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.h.source.label) + '</a>' : "Written for this game");
    return '<li><span class="mark ' + (a.correct ? "ok" : "no") + '" aria-label="' + (a.correct ? "Correct" : "Wrong") + '">' + (a.correct ? "✓" : "✗") + '</span>' +
      '<div class="review-text"><span class="review-h">' + esc(a.h.headline) + '</span><span class="review-meta">' + meta + '</span></div>' +
      '<span class="tag ' + (a.h.real ? "real" : "fake") + '">' + (a.h.real ? "REAL" : "FAKE") + '</span></li>';
  }).join("");
  $("btnAgain").focus({ preventScroll: true });
  window.scrollTo({ top: 0 });
}

function share() {
  const right = answers.filter((a) => a.correct).length;
  const grid = answers.map((a) => (a.correct ? "✅" : "❌")).join("");
  const text = "Real or Fake? " + right + "/" + answers.length + "\n" + grid + "\nhttps://www.dairving.com/real-or-fake/";
  const done = () => toast("Copied. Paste it anywhere.");
  if (navigator.share) {
    navigator.share({ text: text }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(done, () => toast(text));
  } else {
    toast(text);
  }
}

let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2400);
}

/* ---------- Swipe / drag ---------- */
(function setupDrag() {
  const card = $("card");
  let startX = 0, startY = 0, dx = 0, dragging = false, pointerId = null;
  const THRESHOLD = 110;

  card.addEventListener("pointerdown", (e) => {
    if (locked || e.button > 0) return;
    if (e.target.closest("a, button")) return;
    dragging = true; pointerId = e.pointerId;
    startX = e.clientX; startY = e.clientY; dx = 0;
    card.setPointerCapture(pointerId);
    card.classList.add("dragging");
  });
  card.addEventListener("pointermove", (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    dx = e.clientX - startX;
    card.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 18) + "deg)";
    const p = Math.min(Math.abs(dx) / THRESHOLD, 1);
    $("stampReal").style.opacity = dx > 0 ? p : 0;
    $("stampFake").style.opacity = dx < 0 ? p : 0;
  });
  function end(e) {
    if (!dragging || (e && e.pointerId !== pointerId)) return;
    dragging = false;
    card.classList.remove("dragging");
    try { card.releasePointerCapture(pointerId); } catch (err) {}
    if (Math.abs(dx) >= THRESHOLD) {
      guess(dx > 0);
    } else {
      card.style.transform = "none";
      $("stampReal").style.opacity = 0;
      $("stampFake").style.opacity = 0;
    }
  }
  card.addEventListener("pointerup", end);
  card.addEventListener("pointercancel", end);
})();

/* ---------- Wiring ---------- */
$("btnReal").addEventListener("click", () => guess(true));
$("btnFake").addEventListener("click", () => guess(false));
$("btnNext").addEventListener("click", next);
$("btnAgain").addEventListener("click", start);
$("btnShare").addEventListener("click", share);

document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea")) return;
  if (!$("results").hidden) return;
  if (!locked && e.key === "ArrowRight") { e.preventDefault(); guess(true); }
  else if (!locked && e.key === "ArrowLeft") { e.preventDefault(); guess(false); }
});

function selectTab(which) {
  const called = which === "called";
  $("tabCalled").setAttribute("aria-selected", String(called));
  $("tabMsgs").setAttribute("aria-selected", String(!called));
  $("panelCalled").hidden = !called;
  $("panelMsgs").hidden = called;
}
$("tabCalled").addEventListener("click", () => selectTab("called"));
$("tabMsgs").addEventListener("click", () => selectTab("msgs"));

start();
