const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

export interface LegacyProfile {
  slug: string;
  nickname: string;
  realName: string;
  country: string;
  countryFlag?: string;
  status: "Retired" | "Active";
  role: string;
  epithet: string;
  era: string;
  heroImage?: string;
  summary: string;
  biography: string[];
  infobox: Array<{ label: string; value: string }>;
  timeline: Array<{ period: string; title: string; detail: string }>;
  achievements: string[];
  signatureMoments: string[];
}

export interface HallOfFameClass {
  year: string;
  classLabel: string;
  inducted: string[];
  announcementDate: string;
  inductionDate: string;
  note: string;
}

export interface HallOfFameBallot {
  year: string;
  ballotDate: string;
  nominees: string[];
  note: string;
}

export const legacyProfiles: LegacyProfile[] = [
  {
    slug: "fallen",
    nickname: "FalleN",
    realName: "Gabriel Toledo",
    country: "BR",
    countryFlag: "🇧🇷",
    status: "Active",
    role: "AWPer / In-Game Leader",
    epithet: "The Professor",
    era: "1.6 to CS2",
    heroImage: `${B}/players/fallen_hall_of_fame.jpg`,
    summary:
      "Gabriel \"FalleN\" Toledo de Alcantara Sguario is the rare player who became an ecosystem: he captained two Major titles, opened an international path for Brazil, built competitive infrastructure, and remains active in CS2 with FURIA.",
    biography: [
      "FalleN was born on May 30, 1991 and is listed by Liquipedia as active since 2003, spanning Counter-Strike, Source, Global Offensive, and Counter-Strike 2. That longevity matters because his career was not just a transition between versions of the game; it was a bridge from Brazil's semi-professional scene to the modern international circuit.",
      "Before becoming a world champion, he was already a leader, teacher, and organizer. He moved through Brazilian projects such as crashers, FireGamers, compLexity, Mandic, KaBuM.TD, and Keyd Stars while carrying the idea that Brazil needed to learn, train, and compete at a global standard. Games Academy became a central part of that mission, working as a school, showcase, and meeting point for an entire generation.",
      "The historical leap came with the Brazilian core that moved from KaBuM and Keyd, exploded with Luminosity, and became a powerhouse under SK Gaming. In 2016, FalleN led the first South American Major-winning team at MLG Columbus and repeated the feat at ESL One Cologne months later. As an AWPer and IGL, he combined structured calling, emotional reads, and individual impact in decisive rounds.",
      "The SK era cemented The Professor nickname. The team stacked elite trophies, including ESL Pro League Season 6 Finals, EPICENTER 2017, and ECS Season 3 Finals, while also forming part of the run that ended in the Intel Grand Slam Season 1 title. FalleN also earned four HLTV-listed MVP awards, highlighted by DreamHack Open Austin 2016, ESL One Cologne 2017, BLAST Pro Series Copenhagen 2017, and ZOTAC Cup Masters 2018.",
      "After his peak, his historical value kept growing through MIBR, Team Liquid, Imperial, and FURIA. Imperial's Last Dance brought the champion core's memory back to Major arenas, while his move to FURIA kept him active as a symbol of continuity: still competing, but also carrying the cultural authority of someone who helped build the scene itself.",
      "That is why his Hall of Fame dossier cannot fit into a trophy list alone. FalleN is a two-time Major champion, HLTV's number two player of 2016, HLTV's number six player of 2017, Esports Personality of the Year 2016, a founder, a mentor, a captain, and an informal ambassador for Brazilian Counter-Strike.",
    ],
    infobox: [
      { label: "Legacy status", value: "Regional pioneer and Major-winning captain" },
      { label: "Full name", value: "Gabriel Toledo de Alcantara Sguario" },
      { label: "Born", value: "May 30, 1991" },
      { label: "Current team", value: "FURIA" },
      { label: "Years active", value: "2003 - present" },
      { label: "Prime years", value: "2015 - 2017" },
      { label: "Signature trait", value: "IGL authority with AWP impact" },
      { label: "Historic milestone", value: "First South American Major champion" },
      { label: "Known as", value: "The Professor / Godfather of Brazilian CS" },
      { label: "Approx. winnings", value: "$1.46M+" },
    ],
    timeline: [
      {
        period: "2003 - 2014",
        title: "Builder before the breakthrough",
        detail:
          "Competed through the early Brazilian scene and became a leader, teacher, and organizer before the region had consistent international infrastructure.",
      },
      {
        period: "2015 - 2016",
        title: "KaBuM, Keyd, and the door opening",
        detail:
          "Helped the Brazilian core reach the global stage through KaBuM.TD and Keyd Stars, setting up the jump that would become Luminosity's rise.",
      },
      {
        period: "2016",
        title: "Back-to-back Major captain",
        detail:
          "Led Luminosity to MLG Columbus and SK Gaming to ESL One Cologne, making his team the first South American Major champions.",
      },
      {
        period: "2017 - 2018",
        title: "Elite SK and global recognition",
        detail:
          "Remained a title-winning IGL, earned HLTV Top 20 recognition for a second straight year, and collected MVP awards across big international events.",
      },
      {
        period: "2018 - 2023",
        title: "MIBR, Liquid, Imperial",
        detail:
          "Moved through veteran chapters while keeping his status as the public symbol of Brazilian CS and later revived the old core's story with Imperial.",
      },
      {
        period: "2023 - present",
        title: "FURIA and CS2 continuity",
        detail:
          "Returned to a leading Brazilian organization in the CS2 era, keeping his career active while mentoring another generation on elite stages.",
      },
    ],
    achievements: [
      "MLG Columbus 2016 Major champion",
      "ESL One Cologne 2016 Major champion",
      "Intel Grand Slam Season 1 winner",
      "HLTV Top 20: #2 in 2016 and #6 in 2017",
      "HLTV MVP at four tournaments",
      "ESL Pro League Season 6 Finals champion",
      "EPICENTER 2017 champion",
      "ECS Season 3 Finals champion",
      "Esports Personality of the Year 2016",
      "Founder of Games Academy",
    ],
    signatureMoments: [
      "Back-to-back Major victories with the LG/SK core",
      "MLG Columbus 2016 turning Brazil into a Major-winning region",
      "ESL One Cologne 2017 MVP performance as a veteran superstar",
      "The Last Dance run with Imperial reconnecting the old core with Major arenas",
      "Games Academy helping formalize a development path for Brazilian players",
      "Long-term impact as mentor, entrepreneur, captain, and cultural reference",
    ],
  },
  {
    slug: "get-right",
    nickname: "GeT_RiGhT",
    realName: "Christopher Alesund",
    country: "SE",
    countryFlag: "🇸🇪",
    status: "Retired",
    role: "Lurker / Closer",
    epithet: "The Prototype Lurker",
    era: "1.6 to Global Offensive",
    summary:
      "GeT_RiGhT helped define how a lurker could control the flow of elite Counter-Strike, turning patience, timing, and information abuse into a championship weapon.",
    biography: [
      "Christopher \"GeT_RiGhT\" Alesund was already one of the elite names of Counter-Strike 1.6, but his cultural impact grew even larger in Global Offensive. Early NiP dominance gave him the perfect stage, and he used it to shape an entire role around map pressure, timing, and intuition.",
      "At a time when many teams still played rigid defaults, GeT_RiGhT made late-round lurking feel like an art form. He was not simply avoiding fights; he was bending rotations and forcing defenders to respect empty parts of the map.",
      "That mixture of trophies, role innovation, and iconic clutches explains why his name is inseparable from any serious historical overview of CS:GO's first great dynasty.",
    ],
    infobox: [
      { label: "Legacy status", value: "HLTV Hall of Fame inductee" },
      { label: "Prime years", value: "2012–2014" },
      { label: "Signature trait", value: "Lurking and late-round reads" },
      { label: "Historic milestone", value: "Core star of early NiP era" },
    ],
    timeline: [
      {
        period: "1.6",
        title: "Established elite credentials",
        detail:
          "Built his reputation in Swedish Counter-Strike before carrying that status into the new Global Offensive era.",
      },
      {
        period: "2012–2013",
        title: "NiP's unbeaten launch",
        detail:
          "Became a pillar of the most dominant opening act in CS:GO history as NiP crushed event after event.",
      },
      {
        period: "Late legacy",
        title: "Role model for modern lurkers",
        detail:
          "Left behind one of the clearest stylistic templates in the game, copied in spirit by countless riflers after him.",
      },
    ],
    achievements: [
      "HLTV Hall of Fame 2024 inductee",
      "One of the foundational stars of NiP's CS:GO dynasty",
      "Multiple big-event titles across 1.6 and GO",
      "Role-defining lurker in modern Counter-Strike history",
    ],
    signatureMoments: [
      "NiP's iconic opening run in CS:GO",
      "Clutch-heavy lurking that changed role expectations",
      "Long-standing presence in every all-time debate",
    ],
  },
  {
    slug: "forest",
    nickname: "f0rest",
    realName: "Patrik Lindberg",
    country: "SE",
    countryFlag: "🇸🇪",
    status: "Retired",
    role: "Rifler / Flexible Star",
    epithet: "Mechanical Purity",
    era: "1.6 to Global Offensive",
    summary:
      "f0rest is remembered as one of the smoothest and most naturally gifted players Counter-Strike has ever produced, bridging eras without losing elegance.",
    biography: [
      "Patrik \"f0rest\" Lindberg is often described through aesthetics as much as results: movement, crosshair placement, and effortless multi-kills that seemed cleaner than everyone else's. He was one of the rare stars whose style stayed recognizable across multiple versions of the game.",
      "From 1.6 through GO, he remained relevant in elite Swedish Counter-Strike, proving that longevity at the top could coexist with explosive aim. His career became a reference point for mechanical excellence that never looked forced.",
      "That continuity matters historically. Some legends own a moment; f0rest owned an entire span of Counter-Strike history and did so with a style players still imitate in frag movies and demos.",
    ],
    infobox: [
      { label: "Legacy status", value: "HLTV Hall of Fame inductee" },
      { label: "Prime years", value: "2006–2014" },
      { label: "Signature trait", value: "Fluid aim and all-around rifle play" },
      { label: "Historic milestone", value: "Elite across multiple game eras" },
    ],
    timeline: [
      {
        period: "1.6",
        title: "Swedish superstar years",
        detail:
          "Rose as one of the most feared fraggers in the world and became synonymous with Swedish mechanical brilliance.",
      },
      {
        period: "GO transition",
        title: "Immediate relevance in a new title",
        detail:
          "Stayed at the highest level while many former stars struggled to carry their impact across versions.",
      },
      {
        period: "Long tail",
        title: "A benchmark for longevity",
        detail:
          "Extended his relevance for years and remained a touchstone in conversations about pure talent.",
      },
    ],
    achievements: [
      "HLTV Hall of Fame 2024 inductee",
      "One of the defining Swedish stars of 1.6 and GO",
      "Long elite career across multiple competitive eras",
      "Frequently cited among the most gifted riflers ever",
    ],
    signatureMoments: [
      "Iconic Swedish era championships",
      "Seamless transition into CS:GO relevance",
      "Decade-spanning reputation for pristine mechanics",
    ],
  },
  {
    slug: "heaton",
    nickname: "HeatoN",
    realName: "Emil Christensen",
    country: "SE",
    countryFlag: "🇸🇪",
    status: "Retired",
    role: "Entry / Franchise Icon",
    epithet: "The Original Superstar",
    era: "Counter-Strike beta to 1.6",
    summary:
      "HeatoN belongs to the earliest layer of Counter-Strike mythology: a player whose name became bigger than rosters and whose influence helped define what a CS superstar looked like.",
    biography: [
      "Emil \"HeatoN\" Christensen was one of the first true global celebrities of Counter-Strike. In the formative years of the scene, his name carried an aura that went beyond match results; he represented top-tier ambition, professionalism, and personal brand before esports branding became standard.",
      "He excelled with early Swedish powerhouses and helped establish the standards by which star players would later be judged. Fans did not simply follow his teams, they followed HeatoN as a personality and symbol of winning Counter-Strike.",
      "That early cultural footprint matters enormously in Hall of Fame conversations because he helped define the very idea of legendary status in the game's first mass-growth era.",
    ],
    infobox: [
      { label: "Legacy status", value: "HLTV Hall of Fame inductee" },
      { label: "Prime years", value: "2001–2005" },
      { label: "Signature trait", value: "Early era star power and aggression" },
      { label: "Historic milestone", value: "One of CS's first global icons" },
    ],
    timeline: [
      {
        period: "Early CS",
        title: "Face of a young esport",
        detail:
          "Turned individual skill and personality into one of the earliest recognizable brands in competitive Counter-Strike.",
      },
      {
        period: "Swedish supremacy",
        title: "Built the legend through wins",
        detail:
          "Helped Swedish Counter-Strike become the era's defining force and gave the scene one of its first superstar figures.",
      },
      {
        period: "After retirement",
        title: "Institutional legacy",
        detail:
          "Remained part of Counter-Strike's historical vocabulary long after stepping away from active play.",
      },
    ],
    achievements: [
      "HLTV Hall of Fame 2024 inductee",
      "Foundational Swedish legend of early Counter-Strike",
      "One of the first players to become a global CS icon",
      "Key name in the scene's first major growth phase",
    ],
    signatureMoments: [
      "Early CPL-era dominance",
      "Massive personal brand during CS's formative years",
      "Establishing the archetype of the Counter-Strike star",
    ],
  },
  {
    slug: "olofmeister",
    nickname: "olofmeister",
    realName: "Olof Kajbjer",
    country: "SE",
    countryFlag: "🇸🇪",
    status: "Retired",
    role: "Rifler / Playmaker",
    epithet: "Peak Versatility",
    era: "Global Offensive",
    summary:
      "olofmeister's prime compressed almost every quality a modern superstar needed into one package: rifling, clutches, utility value, movement, and big-match calm.",
    biography: [
      "Olof \"olofmeister\" Kajbjer reached a peak in CS:GO that felt both complete and effortless. At his best with fnatic, he could open rounds, close them, adapt positions, and still produce highlight plays that defined an era.",
      "He was not just a star in the abstract statistical sense; he was a player teams had to prepare for in every phase of the round. His versatility made him one of the clearest examples of the fully rounded GO superstar.",
      "Later chapters with FaZe added longevity and a second layer to the legacy, but his place in history was already secure thanks to one of the highest peaks the title produced.",
    ],
    infobox: [
      { label: "Legacy status", value: "HLTV Hall of Fame 2025 inductee" },
      { label: "Prime years", value: "2014–2016" },
      { label: "Signature trait", value: "Versatility and big-stage impact" },
      { label: "Historic milestone", value: "One of CS:GO's defining peak players" },
    ],
    timeline: [
      {
        period: "fnatic era",
        title: "Peak of the Swedish GO machine",
        detail:
          "Anchored one of the most feared teams in CS:GO while becoming a symbol of flexible, complete superstar play.",
      },
      {
        period: "FaZe years",
        title: "Second act with international lineups",
        detail:
          "Extended his relevance and showed that his game translated beyond the Swedish system that first made him famous.",
      },
      {
        period: "Legacy",
        title: "A shorthand for peak form",
        detail:
          "His name still works as reference language whenever players discuss all-around prime performance in GO.",
      },
    ],
    achievements: [
      "HLTV Hall of Fame 2025 inductee",
      "One of fnatic's era-defining stars",
      "Widely considered one of the highest peak players in GO",
      "Successful second chapter with FaZe",
    ],
    signatureMoments: [
      "fnatic's era-defining championship run",
      "Elite form across opening duels, mid-rounds, and clutches",
      "Long-term reputation for complete superstar play",
    ],
  },
];

export const hltvHallOfFameClasses: HallOfFameClass[] = [
  {
    year: "2024",
    classLabel: "Inaugural class",
    inducted: ["Potti", "HeatoN", "GeT_RiGhT", "f0rest"],
    announcementDate: "December 3, 2024",
    inductionDate: "January 11, 2025",
    note:
      "The first HLTV Hall of Fame class was an all-Swedish group spanning the scene's earliest superstar era and the start of CS:GO's first dynasty.",
  },
  {
    year: "2025",
    classLabel: "Second class",
    inducted: ["cogu", "markeloff", "olofmeister"],
    announcementDate: "November 9, 2025",
    inductionDate: "January 10, 2026",
    note:
      "The second class widened the geographic spread of the hall with major names from Brazil, Ukraine, and Sweden.",
  },
];

export const hltvHallOfFameBallots: HallOfFameBallot[] = [
  {
    year: "2025",
    ballotDate: "November 2, 2025",
    nominees: [
      "dupreeh",
      "XeqtR",
      "elemeNt",
      "SpawN",
      "cogu",
      "markeloff",
      "Ksharp",
      "fRoD",
      "kennyS",
      "olofmeister",
    ],
    note:
      "HLTV published a 10-player ballot mixing four first-time nominees with six returning names from the inaugural voting cycle.",
  },
  {
    year: "2024",
    ballotDate: "November 28, 2024",
    nominees: [
      "cogu",
      "cyx",
      "kennyS",
      "solo",
      "HeatoN",
      "Potti",
      "f0rest",
      "GeT_RiGhT",
      "olofmeister",
      "markeloff",
      "Ksharp",
      "fRoD",
    ],
    note:
      "The inaugural HLTV Hall of Fame ballot launched with 12 nominees and ultimately produced the first four inductees.",
  },
];

export const hallOfFameSourceNote =
  "Official HLTV class and ballot references used here come from the Hall of Fame page and the nominee announcements published on November 28, 2024, November 2, 2025, and November 9, 2025.";
