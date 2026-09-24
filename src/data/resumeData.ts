import { Project, SkillCategory, Certification, Hackathon, Experience, Quest } from '../types';

export const PERSONAL_INFO = {
  name: 'Digvijay Madhav Ware',
  headline: 'Computer Science & Engineering Undergraduate | C++, AI, Systems & Algorithms',
  location: 'Pune, Maharashtra, India',
  phone: '+91-8779877704',
  email: 'digvijay.ware@mitwpu.edu.in',
  linkedin: 'https://linkedin.com/in/digvijay-ware-57a007330',
  github: 'https://github.com/Digvijay-exe',
  education: {
    institution: 'MIT World Peace University (MIT WPU)',
    location: 'Pune, India',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    period: '2024 – 2028',
    status: '3rd Year Undergraduate',
    focusAreas: ['Software Engineering', 'DBMS', 'Applied AI']
  },
  professionalSummary:
    'Computer Science and Engineering undergraduate with hands-on experience in C++, Python, Data Structures & Algorithms, MySQL, Artificial Intelligence, and Computer Vision. Experienced in developing software prototypes, database-driven applications, AI-assisted systems, and hackathon MVPs. Strong foundation in object-oriented programming, relational database design, algorithmic problem solving, and technical documentation.'
};

export const PROJECTS: Project[] = [
  {
    id: 'pulse',
    title: 'Pulse',
    subtitle: 'Real-Time Collaborative Platform & Kinematic Fatigue Tracker',
    year: '2026',
    tags: ['C++', 'Data Structures', 'Socket Programming', 'Kinematics', 'Haptics'],
    techStack: ['C++', 'Data Structures', 'Socket Programming', 'Sensor Fusion', 'Signal Processing'],
    summary:
      'Kinematic Fatigue Tracker that analyzes real-time accelerometer and gyroscope data to detect exercise repetitions, estimate movement velocity, calculate velocity loss, and provide real-time fatigue alerts.',
    bulletPoints: [
      'Implemented automatic 3-rep calibration system to establish dynamic baseline biomechanical velocities.',
      'Developed confidence-based repetition detection filter resilient against sensor noise and erratic drift.',
      'Engineered real-time velocity decay computation with low-latency haptic alerts triggered upon critical fatigue thresholds.',
      'Constructed low-latency socket networking infrastructure to transmit kinematic telemetry streams with minimal jitter.'
    ],
    githubUrl: 'https://github.com/Digvijay-exe',
    highlightStat: 'Sub-15ms Latency Kinematic Stream',
    category: 'systems'
  },
  {
    id: 'inklite',
    title: 'InkLite',
    subtitle: 'Lightweight Text & Note Processing Engine',
    year: '2026',
    tags: ['C++', 'Data Structures', 'OOP', 'File I/O', 'String Algorithms'],
    techStack: ['C++', 'KMP Algorithm', 'Boyer-Moore', 'Object-Oriented Design', 'File I/O'],
    summary:
      'Engineered a lightweight text-processing application designed for fast startup and efficient memory usage, featuring high-performance string matching algorithms.',
    bulletPoints: [
      'Engineered high-efficiency text search engine implementing Knuth-Morris-Pratt (KMP) and Boyer–Moore string-search algorithms for rapid sublinear pattern matching across massive files.',
      'Architected modular document processing pipeline adhering to strict object-oriented design and memory management in C++.',
      'Designed safe, buffered file I/O operations enabling fast document serialization, indexing, and note retrieval.',
      'Optimized memory allocations achieving sub-millisecond cold start times and negligible RAM overhead.'
    ],
    githubUrl: 'https://github.com/Digvijay-exe',
    highlightStat: 'O(N+M) / Sublinear Pattern Search',
    category: 'algorithms'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: 'code',
    skills: [
      { name: 'C++', level: 90, highlight: 'Modern C++, OOP, Low-level Memory, Sockets' },
      { name: 'Python', level: 85, highlight: 'AI Scripts, Data Processing, OpenCV, Automation' },
      { name: 'SQL', level: 88, highlight: 'Relational Schemas, Complex Queries, Joins, Indexing' }
    ]
  },
  {
    name: 'Data Structures & Algorithms',
    icon: 'binary',
    skills: [
      { name: 'Trees & Graphs', level: 88, highlight: 'Traversal, Shortest Paths, BSTs, DAGs' },
      { name: 'Dynamic Programming', level: 84, highlight: 'Memoization, Tabulation, Knapsack, Optimization' },
      { name: 'Sorting & Searching', level: 92, highlight: 'QuickSort, MergeSort, Binary Search' },
      { name: 'KMP & Boyer–Moore', level: 90, highlight: 'Preprocessing, Bad-character shift, Failure table' }
    ]
  },
  {
    name: 'Database Management (DBMS)',
    icon: 'database',
    skills: [
      { name: 'MySQL & Relational Design', level: 88, highlight: '3NF Normalization, Foreign Keys, Integrity' },
      { name: 'Indexing & Performance', level: 85, highlight: 'B-Tree Indexes, Query Execution Plans' },
      { name: 'Procedures & Triggers', level: 82, highlight: 'Stored Logic, ACID Compliance' },
      { name: 'Complex SQL Joins', level: 90, highlight: 'Multi-table analytical queries' }
    ]
  },
  {
    name: 'AI & Computer Vision',
    icon: 'cpu',
    skills: [
      { name: 'AI Fundamentals', level: 85, highlight: 'Heuristics, State Spaces, Applied ML' },
      { name: 'Computer Vision', level: 82, highlight: 'Image Filtering, Feature Extraction, OpenCV' },
      { name: 'AI Productivity Tools', level: 92, highlight: 'Prompt Engineering, Workflows, Copilots' }
    ]
  },
  {
    name: 'Development & Core Concepts',
    icon: 'terminal',
    skills: [
      { name: 'Git & GitHub', level: 90, highlight: 'Branching, PRs, Version Control Workflows' },
      { name: 'Linux / Unix & VS Code', level: 88, highlight: 'CLI, Shell scripting, Build environments' },
      { name: 'Socket Programming', level: 85, highlight: 'TCP/UDP, Telemetry streaming, Buffering' },
      { name: 'OOP & File I/O', level: 90, highlight: 'Encapsulation, Polymorphism, Binary/Stream I/O' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Campus Ambassador – Student Outreach & Brand Engagement',
    company: 'SHEIN India',
    location: 'Pune, India',
    period: 'Summer 2026',
    points: [
      'Executed student outreach and campus-level promotional initiatives to increase awareness and participation.',
      'Developed peer engagement strategies and coordinated communication across multiple student communities.'
    ],
    badgeColor: 'emerald'
  },
  {
    role: 'Campus Ambassador – Marketing Outreach & Community Engagement',
    company: 'The Framed Wall',
    location: 'Remote / Campus',
    period: '2026',
    points: [
      'Supported promotional campaigns targeting student communities through digital outreach and professional networking.',
      'Communicated campaign information and coordinated student-level engagement activities.'
    ],
    badgeColor: 'cyan'
  }
];

export const HACKATHONS: Hackathon[] = [
  {
    name: 'Inceptia Hackathon',
    organizer: 'Pimpri Chinchwad College of Engineering & Research (PCCOE & R)',
    location: 'Pune',
    round: 'Presentation Submission Round',
    year: '2026',
    iconName: 'trophy'
  },
  {
    name: 'Adobe University Hackathon',
    organizer: 'Adobe',
    location: 'National / Online',
    round: 'Participant',
    year: '2026',
    iconName: 'award'
  },
  {
    name: 'Think & Code',
    organizer: "MKSSS's Cummins College of Engineering for Women",
    location: 'Pune',
    round: 'Participant',
    year: '2026',
    iconName: 'zap'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Elements of AI',
    issuer: 'University of Helsinki & MinnaLearn',
    date: 'August 2025',
    details: '2 ECTS Credits earned. Comprehensive foundation in AI principles, neural networks, philosophy, and machine learning implications.',
    badge: '2 ECTS'
  },
  {
    id: 'cert-2',
    title: 'DBMS Course: Master Fundamentals',
    issuer: 'Scaler Topics',
    date: 'May 2026',
    details: 'Deep mastery of database fundamentals, indexing mechanisms, normalization (1NF–BCNF), and scalable relational architecture.',
    badge: 'Database Architect'
  },
  {
    id: 'cert-3',
    title: 'Computer Vision Essentials',
    issuer: 'Great Learning',
    date: 'August 2026',
    details: 'Practical image processing, edge detection, convolutional feature mapping, and computer vision implementation pipelines.',
    badge: 'CV Specialist'
  },
  {
    id: 'cert-4',
    title: 'AI Tools & ChatGPT Workshop',
    issuer: 'Be10x',
    date: 'July 2025',
    details: 'Modern AI tools, prompt engineering workflows, automation pipelines, and developer productivity enhancement.',
    badge: 'AI Workflows'
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q-inspect-pulse',
    title: 'Analyze Flagship Project',
    description: 'Explore the Pulse Kinematic Fatigue Tracker or run the fatigue decay simulator.',
    xp: 50,
    completed: false
  },
  {
    id: 'q-test-kmp',
    title: 'Run Algorithmic Engine',
    description: 'Test the KMP / Boyer-Moore string pattern matcher in the InkLite showcase.',
    xp: 75,
    completed: false
  },
  {
    id: 'q-view-certs',
    title: 'Verify Academic Credentials',
    description: 'Review Digvijay’s certifications from Univ of Helsinki, Scaler, and Great Learning.',
    xp: 50,
    completed: false
  },
  {
    id: 'q-download-resume',
    title: 'Acquire Official Dossier',
    description: 'Preview or download Digvijay’s formatted resume PDF.',
    xp: 100,
    completed: false
  },
  {
    id: 'q-contact-copilot',
    title: 'Engage Communication Link',
    description: 'Submit an automated contact inquiry or consult the AI Career Copilot.',
    xp: 125,
    completed: false
  }
];
