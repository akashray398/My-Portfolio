export const profile = {
  name: 'Akash Kumar Yadav',
  brand: 'AKASH KUMAR YADAV',
  role: 'Android Developer • Java Engineer • Product-minded Builder',
  email: 'akashw6666@gmail.com',
  contactEmail: 'akashw6666@gmail.com',
  github: 'https://github.com/akashray398',
  linkedin: 'https://www.linkedin.com/in/akash-yadav-878906286',
  leetcode: 'https://leetcode.com/u/akashray398/',
  resume: '/resume.html',
  location: 'India',
  availability: 'Open to Android, Java, and product-focused engineering roles',
  shortBio:
    'Information Technology undergraduate building polished Android apps with Kotlin and Jetpack Compose, with hands-on experience in AI-powered products, backend APIs, and practical problem-solving.',
  summary:
    'Information Technology undergraduate skilled in Android development using Kotlin, Jetpack Compose, MVVM, and Clean Architecture, with hands-on experience building AI-powered applications. Familiar with .NET, ASP.NET Core, REST APIs, databases, data structures, and object-oriented programming. Solved 150+ problems on LeetCode and contributed to campus leadership and hackathon activities.',
};

export const projects = [
  {
    id: 'cognitask-ai',
    index: '01',
    title: 'CogniTask AI',
    label: 'AI productivity',
    eyebrow: 'Android · AI · Productivity',
    description:
      'A smart Android note and task management app with a responsive Jetpack Compose interface, cloud-backed account workflows, and productivity analytics.',
    impact:
      'Combines note-taking and task planning with focus-velocity metrics and task-trend insights.',
    tags: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Firebase Auth', 'DataStore', 'Flow'],
    accent: 'violet',
    github: 'https://github.com/akashray398/CogniTask-AI',
    liveDemo: 'https://www.cognote.io/feature',
    privateRepo: false,
    visualLabel: 'KNOWLEDGE / TASKS / AI',
    visualTitle: 'Make space for focus.',
    visualMetric: '30 day habit insights',
    features: [
      'Responsive Compose UI with Material Design 3 and custom state hoisting',
      'Hybrid Compose and Fragment navigation',
      'Firebase Authentication and DataStore preferences',
      'REST API integration with OkHttp request logging',
      'Reactive focus-velocity metrics and task trends using Flow and StateFlow',
    ],
    problem:
      'Personal knowledge, tasks, and focus routines often live in separate apps, making it harder to maintain momentum.',
    solution:
      'CogniTask AI combines these everyday workflows in a single Android workspace with local persistence and optional cloud sync.',
    architecture: 'Jetpack Compose → MVVM → Flow / StateFlow → Firebase / REST APIs',
    challenge:
      'Keeping the experience responsive and useful offline while bringing several productivity features into one coherent interface.',
    learned:
      'Offline-first architecture and thoughtful information hierarchy can make a feature-rich product feel dependable and calm.',
  },
  {
    id: 'saafloop',
    index: '02',
    title: 'SaafLoop',
    label: 'Civic tech',
    eyebrow: 'Android · Community · Sustainability',
    description:
      'A civic cleanliness app concept that helps communities report waste hotspots, discover cleanup drives, and follow local progress.',
    impact:
      'Connects the steps from noticing a local issue to reporting it and joining community action.',
    tags: ['Kotlin', 'Android', 'Jetpack Compose', 'Maps', 'Civic tech'],
    accent: 'cyan',
    github: 'https://github.com/akashray398/SaafLoop',
    privateRepo: false,
    visualLabel: 'SPOT / CLEAN / VERIFY',
    visualTitle: 'Small actions. Cleaner places.',
    visualMetric: 'Community impact',
    features: [
      'Civic issue reporting and report-status views',
      'Area-based issue discovery with map and list concepts',
      'Community cleanup drives and organization discovery',
      'Local draft saving for reports',
      'English, Hindi, and Punjabi language options',
    ],
    problem:
      'Civic cleanliness concerns can be hard to report and difficult for residents to track or act on together.',
    solution:
      'SaafLoop presents reporting, neighborhood discovery, and cleanup participation as connected community workflows.',
    architecture: 'Android app concept with reporting, discovery, and community feature areas',
    challenge:
      'Designing clear, accessible civic workflows while setting honest expectations for features that still need backend integrations.',
    learned:
      'For community products, clarity about report status, location privacy, and service availability is essential to earn user trust.',
  },
  {
    id: 'pulsemind',
    index: '03',
    title: 'PulseMind',
    label: 'System companion',
    eyebrow: 'Android · System monitoring · Automation',
    description:
      'A real-time Android system companion for viewing device health, understanding battery and network signals, and creating contextual automations.',
    impact:
      'Turns device telemetry into a readable dashboard with useful alerts, history, and configurable rules.',
    tags: ['Kotlin', 'Jetpack Compose', 'WorkManager', 'Room', 'Hilt', 'Coroutines'],
    accent: 'amber',
    github: 'https://github.com/akashray398/PulseMind360',
    privateRepo: false,
    visualLabel: 'DEVICE HEALTH / LIVE',
    visualTitle: 'Your device, in context.',
    visualMetric: 'Signals · Rules · History',
    features: [
      'Live battery, thermal, and network monitoring views',
      'Contextual health summaries and system advisories',
      'IF-THEN automation rules for device conditions',
      'Offline event history backed by Room',
      'Background work and configurable notifications',
    ],
    problem:
      'Useful device health signals are spread across system settings and individual tools, with little context for everyday decisions.',
    solution:
      'PulseMind brings selected system metrics, recommendations, automation rules, and event history together in one Android companion.',
    architecture: 'Compose UI → MVVM / UDF → Repositories → Android APIs / Room / WorkManager',
    challenge:
      'Presenting frequently changing system data clearly while respecting Android permissions and background execution limits.',
    learned:
      'System dashboards should explain what a signal means and what the user can do next, not simply display numbers.',
  },
  {
    id: 'kontact-plus',
    index: '04',
    title: 'Kontact Plus',
    label: 'Smart contacts',
    eyebrow: 'Android · AI · Privacy',
    description:
      'An AI-enhanced Android contact manager with professional profiles, life-event tracking, communication history, and quick actions.',
    impact:
      'Makes contact information more useful through richer profiles and privacy-aware communication workflows.',
    tags: ['Kotlin', 'Android', 'Material 3', 'Activity Result APIs', 'Intents', 'Vector Graphics'],
    accent: 'violet',
    github: 'https://github.com/akashray398/KontactPlus',
    privateRepo: false,
    visualLabel: 'PEOPLE / CONTEXT / FOLLOW-UP',
    visualTitle: 'Stay meaningfully connected.',
    visualMetric: 'Private by design',
    features: [
      'Professional contact fields, life events, and communication history',
      'Quick contact actions and profile customization',
      'Privacy and security controls',
      'Intent-based data flow and Activity Result APIs',
      'Responsive Material 3 UI with animations and vector graphics',
    ],
    problem:
      'Basic contact lists store names and numbers but provide limited support for managing context and keeping relationships current.',
    solution:
      'Kontact Plus explores contact workflows with AI assistance, local data, and a companion backend in a modular app structure.',
    architecture: 'Kotlin Android app → Material 3 UI → intents / Activity Result APIs',
    challenge:
      'Pairing AI-assisted features with a privacy-conscious approach to personal contact information.',
    learned:
      'Personal data products need visible privacy boundaries and explicit handling of integrations, not just helpful features.',
  },
  {
    id: 'gamestore-api',
    index: '05',
    title: 'GameStore API',
    label: 'Full-stack',
    eyebrow: '.NET · React · REST API',
    description:
      'A full-stack game catalog with an ASP.NET Core Minimal API, SQLite persistence, and a React + TypeScript client.',
    impact:
      'Demonstrates an end-to-end CRUD workflow across a typed frontend, REST endpoints, and a relational data store.',
    tags: ['.NET 10', 'Minimal APIs', 'EF Core', 'SQLite', 'React', 'TypeScript'],
    accent: 'cyan',
    github: 'https://github.com/akashray398/GameStore-Api',
    privateRepo: false,
    visualLabel: 'CATALOG / API / SQLITE',
    visualTitle: 'A catalog built end to end.',
    visualMetric: 'React ↔ .NET API',
    features: [
      'Browse games and available genres',
      'Create, edit, and delete game records',
      'ASP.NET Core Minimal API with Entity Framework Core',
      'SQLite persistence and startup database migration',
      'Vite development proxy for API requests',
    ],
    problem:
      'A catalog application needs a consistent way to browse and manage records across its user interface and backend.',
    solution:
      'GameStore connects a React and TypeScript frontend to a .NET Minimal API backed by SQLite for a complete catalog workflow.',
    architecture: 'React + TypeScript → REST API → ASP.NET Core / EF Core → SQLite',
    challenge:
      'Keeping frontend API calls, backend routes, and local development setup aligned across separate application layers.',
    learned:
      'Explicit API boundaries and repeatable local setup make full-stack projects easier to understand and extend.',
  },
  {
    id: 'androforge',
    index: '06',
    title: 'AndroForge',
    label: 'Android developer toolkit',
    eyebrow: 'Android · Platform APIs · Learning',
    description:
      'An interactive Android lab for exploring platform APIs through hands-on experiments, clear explanations, and practical developer examples.',
    impact:
      'Helps developers learn how Android capabilities behave on real devices instead of relying only on documentation.',
    tags: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Room', 'DataStore', 'Android APIs'],
    accent: 'amber',
    github: 'https://github.com/akashray398/AndroForge',
    privateRepo: true,
    visualLabel: 'EXPLORE / EXPERIMENT / LEARN',
    visualTitle: 'Learn Android by doing.',
    visualMetric: 'Hands-on API lab',
    features: [
      'Interactive modules for sensors, battery, connectivity, and storage',
      'Permission-aware experiments and device capability notes',
      'Explanations, use cases, and interview-style learning content',
      'Experiment history stored locally with Room',
      'Compose and Material 3 interface with a modular architecture',
    ],
    problem:
      'Android platform APIs are easier to understand when developers can observe their behavior and test them directly.',
    solution:
      'AndroForge organizes interactive experiments, platform guidance, and local history into a developer-focused Android toolkit.',
    architecture: 'Compose screens → feature modules → repositories / Room / DataStore → Android platform APIs',
    challenge:
      'Accounting for device differences, missing hardware, permission limits, and OS behavior while making experiments safe and understandable.',
    learned:
      'Practical API education works best when each experiment explains its permissions, limitations, and expected behavior.',
  },
];

export const skillGroups = {
  Android: ['Kotlin', 'Jetpack Compose', 'Android Studio', 'XML', 'Material 3', 'MVVM', 'Clean Architecture'],
  Programming: ['Kotlin', 'Java', 'C#', 'OOP', 'Data Structures & Algorithms'],
  'Backend & APIs': ['.NET', 'ASP.NET Core', 'REST APIs', 'LINQ', 'Entity Framework Core', 'Dependency Injection'],
  Databases: ['MySQL', 'Room Database', 'Firebase Authentication', 'DataStore'],
  'Testing & Tools': ['Git', 'GitHub', 'VS Code', 'JUnit', 'Espresso', 'Android Studio'],
};

export const education = [
  {
    date: '2023 — 2027',
    qualification: 'Bachelor of Technology',
    subject: 'Information Technology',
    institution: 'Chandigarh Engineering College',
    result: 'CGPA: 8.04 / 10',
  },
  {
    date: '2020 — 2021',
    qualification: 'Intermediate',
    subject: 'BSEB',
    institution: 'A.S.R.L.S College, Nabiganj Bazar',
    result: '72%',
  },
];

export const experience = [
  {
    date: 'July 2026 — August 2026',
    title: '.NET Developer Trainee',
    company: 'Wipro TalentNext',
    description:
      'Completed an 8-week hands-on .NET Developer training covering C#, object-oriented programming, .NET, ASP.NET Core, LINQ, and Entity Framework Core. Practiced RESTful APIs, authentication and authorization, dependency injection, asynchronous programming, exception handling, database integration, unit testing, debugging, and clean coding.',
    tags: ['C#', '.NET', 'ASP.NET Core', 'LINQ', 'EF Core', 'REST APIs', 'Unit Testing'],
  },
];

export const achievements = [
  ['01', '150+ LeetCode problems', 'Data Structures & Algorithms practice'],
  ['02', 'Placement Ambassador · CGC', 'Supported placement initiatives and recruitment drives · 2025'],
  ['03', 'Hackathon Final Organizer · CGC', 'Coordinated participants and event execution'],
];

export const certifications = [
  ['Android Using Kotlin', 'Infosys', 'Mobile development'],
  ['Software Programmer – Java', 'NASSCOM', 'Programming'],
];

export const careerInterests = [
  'Android Development',
  'Mobile Application Engineering',
  'Generative AI',
  'AI Agents',
];
