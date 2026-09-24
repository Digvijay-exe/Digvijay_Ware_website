import { Project, SkillCategory, Certification, Hackathon, Experience, Quest } from '../types';

export const PERSONAL_INFO = {
  name: 'Digvijay Madhav Ware',
  headline: 'Computer Science and Engineering Undergraduate | C++, AI, Systems & Algorithms',
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
    focusAreas: ['Software Engineering', 'DBMS & Applied AI']
  },
  professionalSummary:
    'Computer Science and Engineering undergraduate with hands-on experience in C++, Python, Data Structures & Algorithms, MySQL, Artificial Intelligence, and Computer Vision. Experienced in developing software prototypes, database-driven applications, AI-assisted systems, and hackathon MVPs. Strong foundation in object-oriented programming, relational database design, algorithmic problem solving, and technical documentation.'
};

export const PROJECTS: Project[] = [
  {
    id: 'pulse',
    title: 'Pulse',
    subtitle: 'Real-Time Collaborative Platform',
    year: '2026',
    tags: ['C++', 'Data Structures', 'Socket Programming'],
    techStack: ['C++', 'Data Structures', 'Socket Programming', 'Kinematics', 'Signal Processing'],
    summary:
      'Kinematic Fatigue Tracker that uses accelerometer and gyroscope data to detect exercise repetitions, estimate movement velocity, calculate velocity loss, and provide real-time fatigue alerts.',
    bulletPoints: [
      'Kinematic Fatigue Tracker that uses accelerometer and gyroscope data to detect exercise repetitions, estimate movement velocity, calculate velocity loss, and provide real-time fatigue alerts.',
      'Implemented automatic 3-rep calibration, confidence-based rep detection, and haptic alerts when significant velocity loss is detected.'
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
    tags: ['C++', 'Data Structures', 'OOP', 'File I/O'],
    techStack: ['C++', 'Data Structures', 'OOP', 'File I/O', 'KMP Algorithm', 'Boyer-Moore'],
    summary:
      'Engineered a lightweight text-processing application designed for fast startup and efficient memory usage.',
    bulletPoints: [
      'Engineered a lightweight text-processing application designed for fast startup and efficient memory usage.',
      'Implemented KMP and Boyer–Moore string-search algorithms for efficient text searching across large files.',
      'Developed file management and structured document-processing functionality using object-oriented design.'
    ],
    githubUrl: 'https://github.com/Digvijay-exe',
    highlightStat: 'O(N+M) / Sublinear Pattern Search',
    category: 'algorithms'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Programming',
    icon: 'code',
    skills: [
      { name: 'C++', level: 92, highlight: 'Modern C++, OOP, Low-level Memory, Sockets' },
      { name: 'Python', level: 86, highlight: 'AI-assisted systems, Automation, Data Processing' },
      { name: 'SQL', level: 88, highlight: 'Relational Schemas, Complex Queries, Joins' }
    ]
  },
  {
    name: 'Data Structures & Algorithms',
    icon: 'binary',
    skills: [
      { name: 'Trees & Graphs', level: 88, highlight: 'Traversals, Shortest Paths, Trees' },
      { name: 'Dynamic Programming', level: 84, highlight: 'Memoization, Tabulation, Optimization' },
      { name: 'Sorting & Searching', level: 92, highlight: 'QuickSort, MergeSort, Binary Search' },
      { name: 'KMP & Boyer–Moore', level: 90, highlight: 'String matching, Failure table, Bad-character shift' }
    ]
  },
  {
    name: 'Database Management',
    icon: 'database',
    skills: [
      { name: 'MySQL', level: 88, highlight: 'Relational Database Design, 3NF Normalization' },
      { name: 'Relational Design & Joins', level: 90, highlight: 'Multi-table analytical queries, Integrity' },
      { name: 'Indexing & Procedures', level: 85, highlight: 'B-Tree Indexing, Stored Procedures, Triggers' }
    ]
  },
  {
    name: 'AI & Computer Vision',
    icon: 'cpu',
    skills: [
      { name: 'Artificial Intelligence Fundamentals', level: 86, highlight: 'AI Systems, Heuristics, Applied ML' },
      { name: 'Computer Vision', level: 82, highlight: 'Image Filtering, Feature Detection' },
      { name: 'AI Productivity Tools', level: 90, highlight: 'Prompt Engineering, Modern Workflows' }
    ]
  },
  {
    name: 'Development Tools & Core Concepts',
    icon: 'terminal',
    skills: [
      { name: 'Git & GitHub', level: 90, highlight: 'Version control, PRs, collaborative workflows' },
      { name: 'VS Code, Linux/Unix', level: 88, highlight: 'CLI, environment setup, build tooling' },
      { name: 'Object-Oriented Programming', level: 92, highlight: 'Encapsulation, Polymorphism, Clean Architecture' },
      { name: 'File I/O & Socket Programming', level: 86, highlight: 'Low-latency streams, Buffer management' }
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
      'Developed peer engagement strategies and coordinated communication across student communities.'
    ],
    badgeColor: 'emerald'
  },
  {
    role: 'Campus Ambassador – Marketing Outreach & Community Engagement',
    company: 'The Framed Wall',
    location: 'Remote / Campus',
    period: '2026',
    points: [
      'Supported promotional campaigns targeting student communities through digital outreach and networking.',
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
    details: '2 ECTS Credits earned. Comprehensive foundation in AI principles, neural networks, and machine learning implications.',
    badge: '2 ECTS'
  },
  {
    id: 'cert-2',
    title: 'DBMS Course: Master Fundamentals',
    issuer: 'Scaler Topics',
    date: 'May 2026',
    details: 'Database fundamentals, indexing mechanisms, normalization, and relational architecture.',
    badge: 'DBMS'
  },
  {
    id: 'cert-3',
    title: 'Computer Vision Essentials',
    issuer: 'Great Learning',
    date: 'August 2026',
    details: 'Computer vision fundamentals, image processing, and convolutional feature mapping.',
    badge: 'CV'
  },
  {
    id: 'cert-4',
    title: 'AI Tools & ChatGPT Workshop',
    issuer: 'Be10x',
    date: 'July 2025',
    details: 'AI tools, prompt workflows, and productivity enhancement.',
    badge: 'AI Tools'
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q-inspect-pulse',
    title: 'Review Pulse Platform',
    description: 'Inspect the Kinematic Fatigue Tracker and 3-rep calibration simulator.',
    xp: 50,
    completed: false
  },
  {
    id: 'q-test-kmp',
    title: 'Run String Search Engine',
    description: 'Test the KMP & Boyer-Moore pattern matching demo from InkLite.',
    xp: 75,
    completed: false
  },
  {
    id: 'q-view-hackathons',
    title: 'Explore Hackathons & Leadership',
    description: 'Review competitive achievements at PCCOE & R, Adobe, and Cummins College.',
    xp: 50,
    completed: false
  },
  {
    id: 'q-download-resume',
    title: 'Download Official Resume',
    description: 'Preview or download Digvijay’s formatted resume PDF.',
    xp: 100,
    completed: false
  },
  {
    id: 'q-contact-copilot',
    title: 'Send Contact Inquiry',
    description: 'Dispatch an automated employer inquiry or consult the AI Career Copilot.',
    xp: 125,
    completed: false
  }
];
