export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  stack: string[];
  description: string;
  longDescription: string;
  highlights: string[];
  architectureNotes: string;
  badge?: string;
  year: string;
  status: string;
  color: string;
  accent: string;
  interactiveType: 'habits' | 'expenses' | 'agriculture' | 'campus' | 'iot';
}

export interface HackathonMilestone {
  id: string;
  year: string;
  title: string;
  roleOrPrize: string;
  organization: string;
  projectOrTopic: string;
  description: string;
  tags: string[];
  type: 'award' | 'finalist' | 'presentation' | 'hackathon' | 'cultural';
  courtPosition: { x: number; y: number };
}

export interface TechSkill {
  name: string;
  category: 'CODE' | 'BUILD' | 'DESIGN' | 'EXPERIMENT';
  level: string;
  description: string;
  projectsUsedIn: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Dhyey Trivedi",
    handle: "dhyey.trivedi",
    title: "Frontend & Software Developer • AI & Product Projects",
    summary: "BCA student and active technology-project contributor with hands-on exposure to frontend development, Python, JavaScript, C/C#, Java, SQL, AI-assisted product development and hackathon-based problem solving.",
    location: "Ahmedabad, Gujarat, India",
    coordinates: "23.0225° N, 72.5714° E",
    college: "L J College of Computer Applications, Gujarat University",
    degree: "Bachelor of Computer Applications (BCA)",
    semester: "Semester 5",
    mentor: "Prof. Parth Joshi",
    lab: "Advanced Research and Analytics Lab (AiRA LAB)",
    socials: {
      github: "https://github.com/dhyeytrivedi",
      linkedin: "https://linkedin.com/in/dhyeytrivedi",
      email: "dhyey.trivedi.dev@gmail.com",
      resumeUrl: "/Dhyey_Trivedi_Resume.pdf",
    },
    status: "Open to Software Engineering & Frontend Roles",
  },

  projects: [
    {
      id: "habit-tracker",
      title: "Habit Tracker Web App",
      category: "Frontend & PWA Engineering",
      tagline: "Mobile-first habit tracking PWA with tactile claymorphism UI and streak analytics",
      stack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PWA"],
      description: "Built a mobile-first habit tracking PWA concept with claymorphism UI, authentication, streaks, daily check-ins, and visual progress tracking.",
      longDescription: "Engineered a high-polish progressive web application designed around micro-interactions and tactile feedback. Implemented Supabase authentication, real-time streak calculations, interactive daily check-in workflows, and responsive data visualizations using custom claymorphism design tokens.",
      highlights: [
        "Mobile-first responsive Progressive Web App architecture",
        "Unique claymorphism design system with soft depth styling",
        "Streak calculation algorithms with daily completion triggers",
        "Supabase cloud synchronization for multi-device habit data"
      ],
      architectureNotes: "Client-side React state orchestrations coupled with Supabase PostgreSQL row-level security and local storage offline fallback caches.",
      year: "2026",
      status: "Featured Concept",
      color: "#00F59B",
      accent: "from-emerald-500/20 to-teal-500/10",
      interactiveType: "habits"
    },
    {
      id: "spendsnap",
      title: "SpendSnap — SaaS Expense Tracker",
      category: "Full-Stack & Data Workflow",
      tagline: "Expense and investment intelligence system with multi-timeframe analytics and CSV pipelines",
      stack: ["React", "Python Backend Roadmap", "Supabase", "Tailwind CSS", "Data Analytics"],
      description: "Designed an expense and investment tracking product with categories, daily/weekly/monthly summaries, insights and CSV-export workflow.",
      longDescription: "Conceived and developed SpendSnap to give users granular visibility into their cashflow and investment assets. Features categorized expense logging, dynamic weekly/monthly expenditure graphs, automated budget alerts, and full CSV export capabilities for fiscal reporting.",
      highlights: [
        "Daily, weekly, and monthly aggregate financial summaries",
        "Granular categorization for expenses vs. investment capital",
        "Automated CSV data transformation and reporting pipeline",
        "Python-focused backend roadmap for predictive spending insights"
      ],
      architectureNotes: "React-driven analytics frontend connecting to Supabase database models with planned Python FastAPI analytic processing endpoints.",
      year: "2026",
      status: "Active Development",
      color: "#38BDF8",
      accent: "from-cyan-500/20 to-blue-500/10",
      interactiveType: "expenses"
    },
    {
      id: "smart-agri-yield",
      title: "Smart Agri Yield",
      category: "AI / ML & Satellite Data • SIH 2025",
      tagline: "Satellite and NDVI-oriented data analysis pipeline with Redis caching architecture",
      stack: ["Python", "AI/ML Concepts", "Satellite NDVI", "Redis", "SIH 2025"],
      description: "Worked on a smart agriculture solution using satellite/NDVI-oriented data and Redis-oriented architecture concepts for yield-related analysis.",
      longDescription: "Developed for the Smart India Hackathon (SIH 2025), this system explores how normalized difference vegetation index (NDVI) satellite telemetry can be processed and rapidly retrieved via low-latency Redis caching for crop yield predictions.",
      highlights: [
        "SIH 2025 recognized hackathon project concept",
        "NDVI spectral data processing for crop health assessment",
        "High-throughput Redis cache pipeline design",
        "Agricultural intelligence models for predictive harvest planning"
      ],
      architectureNotes: "Satellite telemetry ingestion module with low-latency in-memory Redis indexing and predictive analytics scoring.",
      badge: "SIH 2025 Concept",
      year: "2025",
      status: "Hackathon Concept",
      color: "#A3E635",
      accent: "from-lime-500/20 to-emerald-500/10",
      interactiveType: "agriculture"
    },
    {
      id: "campus360",
      title: "Campus360",
      category: "Web Application • Campus Ecosystem",
      tagline: "Unified digital hub for college student services, complaint resolution, and event discovery",
      stack: ["React", "JavaScript", "SQL", "Tailwind CSS", "REST APIs"],
      description: "Developed a college-focused concept for student services including complaints, events and campus interactions.",
      longDescription: "Campus360 centralizes campus life into a unified digital portal. It provides streamlined student issue logging, department-level ticketing workflows, campus-wide event schedules, and collaborative student interaction channels.",
      highlights: [
        "Role-based ticketing for administrative and campus grievances",
        "Interactive college events calendar and registration flow",
        "Normalized SQL database schema for student and departmental records",
        "Intuitive modern interface optimized for mobile student access"
      ],
      architectureNotes: "Relational SQL database model backing RESTful API endpoints for multi-departmental campus administration.",
      year: "2025 - 2026",
      status: "Ecosystem Project",
      color: "#F472B6",
      accent: "from-pink-500/20 to-rose-500/10",
      interactiveType: "campus"
    },
    {
      id: "project-amrit",
      title: "Project Amrit",
      category: "IoT & Embedded Systems • Advanced Research and Analytics Lab",
      tagline: "First flagship hardware/software IoT integration showcased at Advanced Research and Analytics Lab",
      stack: ["IoT Sensors", "Embedded C/C++", "Python", "Hardware Interfacing", "AiRA LAB"],
      description: "Contributed to the first IoT project showcased during Advanced Research and Analytics Lab activities, demonstrating practical hardware/software project exposure.",
      longDescription: "As part of the Advanced Research and Analytics Lab (AiRA LAB) core research and build mandate under Prof. Parth Joshi, Project Amrit bridged physical hardware telemetry with software analytics. Served as the first official IoT prototype demonstrated during lab inauguration and stakeholder exhibitions.",
      highlights: [
        "First IoT prototype demonstrated in AiRA LAB's official portfolio",
        "Real-time sensor data telemetry acquisition and parsing",
        "Hardware-to-software signal processing and visual readout",
        "Showcased during Advanced Research and Analytics Lab Inauguration 2026"
      ],
      architectureNotes: "Microcontroller telemetry streaming over serial/network protocols into Python data monitoring dash.",
      badge: "AiRA LAB Flagship",
      year: "2026",
      status: "Lab Prototype",
      color: "#FB923C",
      accent: "from-orange-500/20 to-amber-500/10",
      interactiveType: "iot"
    }
  ] as Project[],

  techSkills: [
    // CODE
    { name: "Python", category: "CODE", level: "Core", description: "Backend logic, data handling, AI prototypes, and IoT data processing scripts.", projectsUsedIn: ["Smart Agri Yield", "SpendSnap Backend", "Project Amrit"] },
    { name: "JavaScript", category: "CODE", level: "Core", description: "Modern ES6+ frontend architectures, interactive DOM manipulation, and asynchronous APIs.", projectsUsedIn: ["Habit Tracker", "SpendSnap", "Campus360"] },
    { name: "SQL", category: "CODE", level: "Proficient", description: "Relational schema design, queries, aggregation, and Supabase / PostgreSQL database models.", projectsUsedIn: ["Campus360", "SpendSnap", "Habit Tracker"] },
    { name: "C & C#", category: "CODE", level: "Proficient", description: "Object-oriented software principles, .NET framework foundations, and systems concepts.", projectsUsedIn: [".NET Concepts", "Academic Problem Solving"] },
    { name: "Java", category: "CODE", level: "Proficient", description: "OOP paradigms, robust application logic, and academic software engineering.", projectsUsedIn: ["Core Systems", "Academic Modules"] },
    { name: "HTML & CSS", category: "CODE", level: "Advanced", description: "Semantic markup, custom responsive design tokens, and CSS animations.", projectsUsedIn: ["All Web Projects"] },

    // BUILD
    { name: "React", category: "BUILD", level: "Advanced", description: "Component state orchestration, custom hooks, dynamic UI rendering, and responsive apps.", projectsUsedIn: ["Habit Tracker", "SpendSnap", "Campus360"] },
    { name: "Vite", category: "BUILD", level: "Advanced", description: "Ultra-fast build tooling, HMR, and modern frontend bundling pipelines.", projectsUsedIn: ["Portfolio", "Habit Tracker", "SpendSnap"] },
    { name: "Tailwind CSS", category: "BUILD", level: "Advanced", description: "Utility-first modern styling, responsive layouts, and design system tokens.", projectsUsedIn: ["Habit Tracker", "SpendSnap", "Portfolio"] },
    { name: ".NET Framework", category: "BUILD", level: "Proficient", description: "C# .NET enterprise application concepts and structured desktop/web workflows.", projectsUsedIn: ["Software Development Exposure"] },
    { name: "REST / API Concepts", category: "BUILD", level: "Advanced", description: "Asynchronous endpoint consumption, JSON payloads, and client-server synchronization.", projectsUsedIn: ["Campus360", "SpendSnap", "Smart Agri Yield"] },
    { name: "Responsive UI & PWA", category: "BUILD", level: "Advanced", description: "Mobile-first layouts, offline capability, manifest configurations, and tactile gestures.", projectsUsedIn: ["Habit Tracker Web App"] },

    // DESIGN
    { name: "Figma Make", category: "DESIGN", level: "Advanced", description: "UI wireframing, layout prototyping, claymorphism aesthetic structuring, and user flows.", projectsUsedIn: ["Habit Tracker", "SpendSnap", "Campus360"] },
    { name: "Canva & Gamma", category: "DESIGN", level: "Advanced", description: "Visual design decks, AI-assisted presentations, and editorial storytelling layouts.", projectsUsedIn: ["AiRA LAB Presentations", "Event Collaterals"] },
    { name: "Claymorphism Design", category: "DESIGN", level: "Specialist", description: "Tactile soft-3D UI with multi-layered inner and drop shadows.", projectsUsedIn: ["Habit Tracker Web App"] },

    // EXPERIMENT
    { name: "Antigravity", category: "EXPERIMENT", level: "Expert", description: "Agentic AI workflows, pair programming, and full-stack project building.", projectsUsedIn: ["Digital Portfolio", "Product Prototypes"] },
    { name: "Lovable", category: "EXPERIMENT", level: "Proficient", description: "AI-accelerated product generation and rapid UI scaffolding.", projectsUsedIn: ["Rapid Prototyping"] },
    { name: "Supabase", category: "EXPERIMENT", level: "Advanced", description: "PostgreSQL cloud databases, authentication, real-time listeners, and row-level security.", projectsUsedIn: ["Habit Tracker", "SpendSnap"] },
    { name: "Git & GitHub", category: "EXPERIMENT", level: "Advanced", description: "Version control, branching workflows, collaborative open source, and repository management.", projectsUsedIn: ["All Codebases"] },
    { name: "VS Code", category: "EXPERIMENT", level: "Advanced", description: "Primary IDE environment with custom linting, terminal scripting, and debugging.", projectsUsedIn: ["All Projects"] },
    { name: "Vercel & Render", category: "EXPERIMENT", level: "Proficient", description: "Continuous integration, edge deployments, cloud hosting, and preview environments.", projectsUsedIn: ["Web App Deployments"] }
  ] as TechSkill[],

  hackathonsAndJourney: [
    {
      id: "sih-internal-2026",
      year: "2026",
      title: "Smart India Hackathon Internal 2026",
      roleOrPrize: "2nd Rank Winner",
      organization: "L J College of Computer Applications",
      projectOrTopic: "Smart Incense Drying Hardware Automation",
      description: "Secured 2nd rank for the Smart Incense Drying hardware and automation concept with embedded sensors.",
      tags: ["Hardware Automation", "IoT Sensors", "2nd Rank Winner"],
      type: "award",
      courtPosition: { x: 20, y: 30 }
    },
    {
      id: "hack-baroda-2026",
      year: "2026",
      title: "Hack Baroda 2026",
      roleOrPrize: "Semi-Finalist",
      organization: "Hack Baroda Tech Community",
      projectOrTopic: "Social Media Post Analyzer",
      description: "Recognized as semi-finalist with the Social Media Post Analyzer data analytics and NLP project.",
      tags: ["Data Analytics", "NLP/AI", "Semi-Finalist"],
      type: "finalist",
      courtPosition: { x: 45, y: 25 }
    },
    {
      id: "iim-indore-2026",
      year: "2026",
      title: "IIM Indore Hackathon 2026",
      roleOrPrize: "Finalist",
      organization: "IIM Indore",
      projectOrTopic: "Digital Business Problem Solving",
      description: "Competed at the national level as a finalist solving real-world digital business strategy challenges.",
      tags: ["Product Strategy", "National Level", "Finalist"],
      type: "finalist",
      courtPosition: { x: 70, y: 35 }
    },
    {
      id: "ai-image-2026",
      year: "2026",
      title: "AI Image Creation Contest 2026",
      roleOrPrize: "Winner (1st Place)",
      organization: "Creative AI Competition",
      projectOrTopic: "AI Clay-Doll Digital Artwork",
      description: "Won 1st prize with an innovative AI-generated clay-doll artwork created via tailored prompt engineering.",
      tags: ["Generative AI", "Prompt Engineering", "1st Place"],
      type: "award",
      courtPosition: { x: 85, y: 55 }
    },
    {
      id: "ai-cyber-2026",
      year: "2026",
      title: "AI Cyber Image Creation Contest 2026",
      roleOrPrize: "Top 8 Selection",
      organization: "Digital Cyber Art Challenge",
      projectOrTopic: "Cyberpunk Manga Visual Storytelling",
      description: "Ranked in the Top 8 nationally with cyberpunk manga creative visual storytelling.",
      tags: ["Cyberpunk Manga", "Creative Tech", "Top 8"],
      type: "award",
      courtPosition: { x: 65, y: 75 }
    },
    {
      id: "aira-coordinator-2026",
      year: "2026",
      title: "AI Powered Bootcamp & Lab Showcase",
      roleOrPrize: "Event Coordinator",
      organization: "Advanced Research and Analytics Lab",
      projectOrTopic: "AI Content Creation & Lab Demonstration",
      description: "Coordinated technical execution and demonstrated AI content-generation pipelines during official lab showcase sessions.",
      tags: ["Leadership", "AI Bootcamp", "Coordination"],
      type: "hackathon",
      courtPosition: { x: 35, y: 80 }
    },
    {
      id: "sih-2025",
      year: "2025",
      title: "Smart India Hackathon (SIH 2025)",
      roleOrPrize: "Active Contributor",
      organization: "Govt of India / AICTE",
      projectOrTopic: "Smart Agri Yield (NDVI Satellite & Redis)",
      description: "Developed Smart Agri Yield concept utilizing satellite NDVI spectral telemetry and high-throughput Redis caching.",
      tags: ["SIH 2025", "Agriculture AI", "NDVI Telemetry"],
      type: "hackathon",
      courtPosition: { x: 15, y: 60 }
    },
    {
      id: "national-hackathons-2025",
      year: "2025",
      title: "National Hackathons Participation",
      roleOrPrize: "Active Participant",
      organization: "Odoo, IIT Hyderabad, ISRO, UNESCO, IIIT Pune",
      projectOrTopic: "Multi-domain Problem Solving",
      description: "Participated across Odoo Hackathon, PSB × IIT Hyderabad, Bhartiya Antriksh/ISRO Hackathon, UNESCO Hackathon, and IIIT Pune Hackathon.",
      tags: ["ISRO Hackathon", "IIT Hyderabad", "Odoo", "IIIT Pune"],
      type: "hackathon",
      courtPosition: { x: 50, y: 50 }
    }
  ] as HackathonMilestone[],

  airaLab: {
    fullName: "Advanced Research and Analytics Lab (AiRA LAB)",
    mentor: "Prof. Parth Joshi",
    location: "L J College of Computer Applications",
    philosophy: "RESEARCH / BUILD / EXPERIMENT",
    description: "Advanced Research and Analytics Lab (AiRA LAB) is an academic innovation hub dedicated to advancing applied computing, software prototyping, and embedded IoT experimentation under the guidance of Prof. Parth Joshi.",
    roles: [
      {
        title: "AiRA LAB Inauguration 2026",
        role: "Member + Coordinator",
        detail: "Supported event coordination, VIP demonstrations, and project showcasing."
      },
      {
        title: "AI Powered Bootcamp 2026",
        role: "Coordinator",
        detail: "Supported event execution and participated in AI content-creation workflows."
      },
      {
        title: "Project Amrit",
        role: "IoT Project Contributor",
        detail: "Built and showcased the lab's premier hardware-to-software IoT data integration."
      }
    ],
    verifiedStats: {
      certificates: "15 Certificates across Academic, Tech & Culture",
      hackathons: "8+ Hackathons & Technical Summits",
      mentorship: "Guided by Prof. Parth Joshi"
    }
  },

  learningRoadmap: [
    {
      phase: "NOW",
      title: "Advanced Python Backend Systems",
      focus: "FastAPI, asynchronous event loops, scalable REST APIs, and microservice architectures.",
      status: "In Progress",
      color: "#00F59B"
    },
    {
      phase: "NEXT",
      title: "Scalable In-Memory Caching & Redis",
      focus: "Deepening real-time in-memory caching patterns derived from the Smart Agri Yield architecture.",
      status: "Active Exploration",
      color: "#38BDF8"
    },
    {
      phase: "EXPLORING",
      title: "Embedded IoT Sensor Telemetry",
      focus: "Expanding microcontroller signal processing and physical-to-cloud data ingestion protocols.",
      status: "Lab Prototyping",
      color: "#F59E0B"
    },
    {
      phase: "BUILDING",
      title: "Next-Gen Tactile & Claymorphic PWAs",
      focus: "Refining tactile PWA components with rich micro-interactions and offline-first data sync.",
      status: "Active Prototyping",
      color: "#EC4899"
    }
  ],

  beyondCode: [
    {
      title: "Mime Champion — Youth Festival 2024",
      subtitle: "Winner at Zonal & Interzonal Levels",
      description: "Mastery of non-verbal storytelling, emotional expression, and dramatic discipline, resulting in university-wide championship trophies.",
      badge: "Double Winner"
    },
    {
      title: "Yugma 2026 Cultural Committee Member",
      subtitle: "Campus Cultural Event Leadership",
      description: "Contributed to orchestrating large-scale college cultural events, stage coordination, and student engagement.",
      badge: "Leadership"
    },
    {
      title: "Generative AI Artistry & Cyberpunk Manga",
      subtitle: "1st Place Clay-Doll & Top 8 Manga Creator",
      description: "Blending visual prompt engineering with editorial aesthetic composition, producing award-winning AI digital artwork.",
      badge: "Contest Winner"
    }
  ]
};
