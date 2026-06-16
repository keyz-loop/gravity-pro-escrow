import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Coins, 
  ShieldCheck, 
  MessageSquare, 
  Send, 
  User, 
  ArrowRight, 
  Upload, 
  Lock, 
  CheckCircle2, 
  RefreshCw, 
  Github, 
  ExternalLink,
  DollarSign,
  QrCode,
  FileCheck,
  Star,
  Search,
  Settings,
  Link,
  Briefcase,
  Layers,
  TrendingUp,
  Cpu,
  Video,
  BookOpen,
  Award,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Freelancer Database covering all 13 categories
const FREELANCERS_DB = [
  {
    id: "f-graphics",
    name: "Riya Patel",
    category: "Graphics & Design",
    level: "Level 2 Pro",
    rating: "5.0",
    reviews: 42,
    skills: ["Figma", "UI/UX", "Tailwind", "Logo Design"],
    aesthetic_style: "Minimalist",
    portfolio_links: { linkedin: "https://linkedin.com/in/riyapatel", github: "https://github.com/riyapatel" },
    vpa: "riyapatel@okaxis",
    avatar: "🎨",
    gig_title: "I will design a modern minimalist landing page for your Web3 App",
    class_name: "minimalist",
    bio: "Product designer specializing in clean dark-mode visuals and cryptocurrency applications. 4+ years of industry experience.",
    member_since: "June 2023"
  },
  {
    id: "f-tech",
    name: "Arjun Sharma",
    category: "Programming & Tech",
    level: "Top Rated Pro",
    rating: "4.9",
    reviews: 128,
    skills: ["React", "Node.js", "GraphQL", "PostgreSQL", "Mobile App"],
    aesthetic_style: "Clean SaaS",
    portfolio_links: { github: "https://github.com/arjunsharma", youtube: "https://youtube.com/c/arjunbuilds" },
    vpa: "arjunsharma@okicici",
    avatar: "💻",
    gig_title: "I will build a high-performance backend API and database schemas",
    class_name: "clean-saas",
    bio: "Full-stack Node.js developer focused on serverless architectures, performance optimizations, and transactional databases.",
    member_since: "January 2022"
  },
  {
    id: "f-marketing",
    name: "Dev Modi",
    category: "Digital Marketing",
    level: "Level 1 Pro",
    rating: "4.7",
    reviews: 31,
    skills: ["Google Analytics", "Facebook Ads", "SEO", "Copywriting"],
    aesthetic_style: "Clean SaaS",
    portfolio_links: { github: "https://github.com/devmodi" },
    vpa: "devmodi@okicici",
    avatar: "📈",
    gig_title: "I will run creator traffic ads and optimize landing page SEO conversion",
    class_name: "digital-marketing",
    bio: "Data-driven growth marketer focusing on landing page conversions, organic Google SEO, and paid creator social ads.",
    member_since: "February 2024"
  },
  {
    id: "f-video",
    name: "Kabir Mehta",
    category: "Video & Animation",
    level: "Level 1 Pro",
    rating: "4.8",
    reviews: 19,
    skills: ["Figma", "Three.js", "GLSL", "Blender"],
    aesthetic_style: "Cyberpunk",
    portfolio_links: { linkedin: "https://linkedin.com/in/kabirmehta", github: "https://github.com/kabirmehta" },
    vpa: "kabirmehta@okaxis",
    avatar: "⚡",
    gig_title: "I will craft 3D websites with interactive GLSL shaders and Blender",
    class_name: "cyberpunk",
    bio: "Creative technologist crafting visual-heavy 3D web experiences using WebGL, GLSL shaders, and Blender models.",
    member_since: "March 2024"
  },
  {
    id: "f-writing",
    name: "Meera Sen",
    category: "Writing & Translation",
    level: "Level 2 Pro",
    rating: "4.9",
    reviews: 56,
    skills: ["Copywriting", "SEO Writing", "Technical Documentation"],
    aesthetic_style: "Minimalist",
    portfolio_links: { github: "https://github.com/meerasen" },
    vpa: "meerasen@okaxis",
    avatar: "✍️",
    gig_title: "I will write high-converting sales copy for your SaaS landing page",
    class_name: "writing-translation",
    bio: "Conversion copywriter helping software startups craft high-impact landing page copy that converts traffic into leads.",
    member_since: "August 2023"
  },
  {
    id: "f-music",
    name: "Rohan Verma",
    category: "Music & Audio",
    level: "Level 2 Pro",
    rating: "5.0",
    reviews: 38,
    skills: ["Sound Design", "Audio Editing", "Voice Over", "Beatmaking"],
    aesthetic_style: "Cyberpunk",
    portfolio_links: { youtube: "https://youtube.com/rohanmusic" },
    vpa: "rohanverma@okaxis",
    avatar: "🎵",
    gig_title: "I will record professional voice overs and design audio soundtracks",
    class_name: "music-audio",
    bio: "Professional sound engineer and music producer crafting immersive SFX and voice covers for apps and indie games.",
    member_since: "April 2023"
  },
  {
    id: "f-business",
    name: "Vikram Raj",
    category: "Business",
    level: "Level 2 Pro",
    rating: "4.8",
    reviews: 14,
    skills: ["Pitch Deck", "Excel", "Strategy", "Financial Modeling"],
    aesthetic_style: "Minimalist",
    portfolio_links: { github: "https://github.com/vikramraj" },
    vpa: "vikramraj@okicici",
    avatar: "💼",
    gig_title: "I will build financial projection models and design startup pitch decks",
    class_name: "business",
    bio: "Ex-investment analyst assisting tech startups with financial modeling, valuation, and capital raising pitch decks.",
    member_since: "October 2023"
  },
  {
    id: "f-finance",
    name: "Priya Nair",
    category: "Finance",
    level: "Top Rated Pro",
    rating: "4.9",
    reviews: 74,
    skills: ["Tax Advisory", "Accounting", "Excel Sheets", "Valuation"],
    aesthetic_style: "Clean SaaS",
    portfolio_links: { github: "https://github.com/priyanair" },
    vpa: "priyanair@okaxis",
    avatar: "📊",
    gig_title: "I will provide tax consulting and set up automated accounting dashboards",
    class_name: "finance",
    bio: "Chartered accountant helping creators and small business owners streamline taxes and audit financial transactions.",
    member_since: "September 2022"
  },
  {
    id: "f-ai",
    name: "Anya Roy",
    category: "AI Services",
    level: "Top Rated Pro",
    rating: "5.0",
    reviews: 88,
    skills: ["Gemini API", "Python", "LangChain", "LLMs"],
    aesthetic_style: "Clean SaaS",
    portfolio_links: { github: "https://github.com/anyaroy", youtube: "https://youtube.com/c/anyabuildsai" },
    vpa: "anyaroy@okaxis",
    avatar: "🤖",
    gig_title: "I will integrate Gemini LLMs and build intelligent conversational assistants",
    class_name: "ai-services",
    bio: "AI Systems Engineer specializing in Large Language Models, prompt engineering, agentic workflows, and integrations.",
    member_since: "November 2023"
  },
  {
    id: "f-growth",
    name: "Amit Pal",
    category: "Personal Growth",
    level: "Level 2 Pro",
    rating: "5.0",
    reviews: 21,
    skills: ["Life Coaching", "Public Speaking", "Habit Building"],
    aesthetic_style: "Minimalist",
    portfolio_links: { youtube: "https://youtube.com/amitcoach" },
    vpa: "amitpal@okaxis",
    avatar: "🌱",
    gig_title: "I will provide public speaking mentorship and career coaching sessions",
    class_name: "personal-growth",
    bio: "Certified executive coach guiding digital creators and founders on performance optimization, productivity, and habits.",
    member_since: "May 2023"
  },
  {
    id: "f-consulting",
    name: "Sana Shah",
    category: "Consulting",
    level: "Level 1 Pro",
    rating: "4.9",
    reviews: 47,
    skills: ["SaaS Consulting", "Growth Hacking", "Product Strategy"],
    aesthetic_style: "Clean SaaS",
    portfolio_links: { linkedin: "https://linkedin.com/in/sanashah" },
    vpa: "sanashah@okaxis",
    avatar: "💡",
    gig_title: "I will consult on SaaS product roadmaps and initial growth launch strategies",
    class_name: "consulting",
    bio: "Product strategist offering actionable audits for digital SaaS platforms to optimize conversion funnels and churn.",
    member_since: "December 2023"
  },
  {
    id: "f-data",
    name: "Rahul Goel",
    category: "Data",
    level: "Top Rated Pro",
    rating: "4.8",
    reviews: 93,
    skills: ["Python", "SQL", "Pandas", "PowerBI"],
    aesthetic_style: "Clean SaaS",
    portfolio_links: { github: "https://github.com/rahulgoel" },
    vpa: "rahulgoel@okicici",
    avatar: "📉",
    gig_title: "I will perform data cleaning operations and build SQL analytics panels",
    class_name: "data",
    bio: "Data scientist specialized in PostgreSQL optimization, complex aggregations, and business intelligence panels.",
    member_since: "July 2022"
  },
  {
    id: "f-photography",
    name: "Kiran Rao",
    category: "Photography",
    level: "Level 2 Pro",
    rating: "5.0",
    reviews: 16,
    skills: ["Lightroom", "Photoshop", "Commercial Photo", "Editing"],
    aesthetic_style: "Minimalist",
    portfolio_links: { linkedin: "https://linkedin.com/in/kiranrao" },
    vpa: "kiranrao@okaxis",
    avatar: "📷",
    gig_title: "I will capture premium product photos and execute high-end retouching",
    class_name: "photography",
    bio: "Commercial photographer helping digital brands create stunning visual assets for storefronts and ads.",
    member_since: "January 2024"
  }
];

const CATEGORY_PRESETS = {
  "Graphics & Design": {
    title: "Minimalist landing page design for Web3 App",
    description: "Need a Figma designer who specializes in Dark Mode + Minimalist aesthetics.",
    budget: 15000,
    aesthetic_style: "Minimalist",
    required_skills: "Figma, UI/UX, Logo Design"
  },
  "Programming & Tech": {
    title: "Build a responsive mobile app from scratch",
    description: "Need a developer to compile and deploy a lightweight React Native app.",
    budget: 35000,
    aesthetic_style: "Clean SaaS",
    required_skills: "React, Node.js, Mobile App"
  },
  "Digital Marketing": {
    title: "Social Media and creator ads traffic boost",
    description: "Audit Google search indicators and setup paid ad funnels.",
    budget: 9000,
    aesthetic_style: "Clean SaaS",
    required_skills: "Facebook Ads, SEO, Google Analytics"
  },
  "Video & Animation": {
    title: "Blender 3D Asset Renderings for WebGL",
    description: "Create WebGL-ready 3D animations using Blender.",
    budget: 18000,
    aesthetic_style: "Cyberpunk",
    required_skills: "Blender, Three.js, GLSL"
  },
  "Writing & Translation": {
    title: "SaaS landing page copywriting",
    description: "Write conversion-oriented sales copy for home headers.",
    budget: 7000,
    aesthetic_style: "Minimalist",
    required_skills: "Copywriting, SEO Writing"
  },
  "Music & Audio": {
    title: "Voice over and podcast audio editing",
    description: "Record audio tracks and edit sound layouts.",
    budget: 6000,
    aesthetic_style: "Cyberpunk",
    required_skills: "Sound Design, Voice Over"
  },
  "Business": {
    title: "VC Pitch Deck design and layout structure",
    description: "Design pitch slides and strategy matrices.",
    budget: 14000,
    aesthetic_style: "Minimalist",
    required_skills: "Pitch Deck, Strategy"
  },
  "Finance": {
    title: "Tax setup and financial modeling template",
    description: "Structure sheets to automate creator tax audits.",
    budget: 11000,
    aesthetic_style: "Clean SaaS",
    required_skills: "Tax Advisory, Excel Sheets"
  },
  "AI Services": {
    title: "Integrate Gemini AI model into chat assistant",
    description: "Setup serverless AI routes using Gemini API and Python LangChain.",
    budget: 20000,
    aesthetic_style: "Clean SaaS",
    required_skills: "Gemini API, Python, LangChain"
  },
  "Personal Growth": {
    title: "Public speaking habit building mentorship",
    description: "1-on-1 speaking coaching sessions.",
    budget: 5000,
    aesthetic_style: "Minimalist",
    required_skills: "Public Speaking, Habit Building"
  },
  "Consulting": {
    title: "SaaS product roadmap growth consulting",
    description: "Product strategies to reduce subscriber churn rates.",
    budget: 16000,
    aesthetic_style: "Clean SaaS",
    required_skills: "SaaS Consulting, Product Strategy"
  },
  "Data": {
    title: "PostgreSQL Database migrations and cleaning",
    description: "Clean tables, index columns, and optimize queries.",
    budget: 13000,
    aesthetic_style: "Clean SaaS",
    required_skills: "Python, SQL, SQL Analytics"
  },
  "Photography": {
    title: "Ecommerce product photoshoot and edit",
    description: "Photoshop and Lightroom retouching on product catalogs.",
    budget: 12000,
    aesthetic_style: "Minimalist",
    required_skills: "Lightroom, Commercial Photo"
  }
};

const CATEGORIES_LIST = [
  "Graphics & Design",
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Business",
  "Finance",
  "AI Services",
  "Personal Growth",
  "Consulting",
  "Data",
  "Photography"
];

// Popular services mapping
const POPULAR_SERVICES = [
  { name: "Vibe Coding", category: "Programming & Tech", subtitle: "Prompt Engineering", image: "/images/vibe_coding.webp" },
  { name: "Website Development", category: "Programming & Tech", subtitle: "Build Web Apps", image: "/images/web_development.webp" },
  { name: "Video Editing", category: "Video & Animation", subtitle: "Trim & Animate", image: "/images/video_editing.webp" },
  { name: "Software Development", category: "Programming & Tech", subtitle: "Clean Codes", image: "/images/software_development.webp" },
  { name: "Book Publishing", category: "Writing & Translation", subtitle: "Copy Edit", image: "/images/book_publishing.webp" },
  { name: "Architecture & Design", category: "Graphics & Design", subtitle: "3D Layouts", image: "/images/architecture_design.webp" },
  { name: "Book Design", category: "Graphics & Design", subtitle: "Cover Art", image: "/images/book_design.webp" },
  { name: "UGC Videos", category: "Video & Animation", subtitle: "Social Ads", image: "/images/ugc_videos.webp" },
  { name: "Voice Over", category: "Music & Audio", subtitle: "Record Audio", image: "/images/voice_over.webp" },
  { name: "Social Media Marketing", category: "Digital Marketing", subtitle: "Funnels Boost", image: "/images/social_media_marketing.webp" },
  { name: "AI Development", category: "AI Services", subtitle: "LLM Agents", image: "/images/ai_development.webp" },
  { name: "Logo Design", category: "Graphics & Design", subtitle: "Brand Identity", image: "/images/logo_design.webp" },
  { name: "Website Design", category: "Graphics & Design", subtitle: "Figma UI/UX", image: "/images/website_design.webp" }
];

// Guides list
const GUIDES = [
  { title: "Start a side business", subtitle: "Tips from top creators" },
  { title: "Ecommerce business Ideas", subtitle: "What sells online in 2026" },
  { title: "Start an online business and work from home", subtitle: "Remote strategies" },
  { title: "Build a website from scratch", subtitle: "WordPress & React tutorial" },
  { title: "Grow your business with AI", subtitle: "Leverage Gemini integrations" },
  { title: "Create a logo for your business", subtitle: "Identity brand guide" }
];

export default function App() {
  const [page, setPage] = useState('HOME'); // HOME, BRIEF, DASHBOARD
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('CLIENT'); // CLIENT or FREELANCER
  const [activeCategory, setActiveCategory] = useState("Programming & Tech");

  // Theme Toggle State
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Mobile Footer Collapsible State
  const [expandedFooter, setExpandedFooter] = useState({});
  const toggleFooter = (section) => {
    setExpandedFooter(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mobile Menu Sheet State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom Profile States
  const [clientProfile, setClientProfile] = useState({
    id: "client-id-999",
    name: "Alpha Ventures",
    email: "contact@alphaventures.in",
    phone: "+919988776655",
    industry: "SaaS & AI Tech",
    hiringHistory: "5 projects hired"
  });

  const [freelancerProfile, setFreelancerProfile] = useState({
    id: "freelancer-id-888",
    name: "Himanshu Singh",
    email: "himanshusinghkr15@gmail.com",
    phone: "+919988776655",
    vpa: "himanshu@okaxis",
    skills: ["React", "UI/UX Development", "Full-Stack Development", "Vite"],
    hourlyRate: "2500",
    portfolio_links: { github: "https://github.com/keyz-loop", linkedin: "https://linkedin.com/in/himanshusingh", youtube: "https://youtube.com/c/himanshucodes" }
  });

  // Client Projects List
  const [gigsList, setGigsList] = useState([
    {
      id: "gig-archive-101",
      client_id: "client-id-999",
      freelancer_id: "f-tech",
      title: "Optimized Node.js API Service",
      description: "Setup backend router architecture.",
      budget: 8000.00,
      aesthetic_style: "Clean SaaS",
      status: "COMPLETED",
      created_at: "2026-06-01T04:00:00Z"
    },
    {
      id: "gig-archive-102",
      client_id: "client-id-999",
      freelancer_id: "f-video",
      title: "Blender 3D Asset Renderings",
      description: "Build 3D interactive layout components.",
      budget: 18000.00,
      aesthetic_style: "Cyberpunk",
      status: "DELIVERED",
      created_at: "2026-06-10T12:00:00Z"
    }
  ]);

  // Archive Transactions
  const [transactionsList, setTransactionsList] = useState([
    {
      id: "tx-archive-1",
      gig_id: "gig-archive-101",
      amount: 8000.00,
      gateway_reference_id: "pay_archived_998",
      status: "RELEASED",
      freelancer_vpa: "arjunsharma@okicici",
      created_at: "2026-06-01T04:05:00Z"
    },
    {
      id: "tx-archive-2",
      gig_id: "gig-archive-102",
      amount: 18000.00,
      gateway_reference_id: "pay_archived_772",
      status: "ESCROW_LOCKED",
      freelancer_vpa: "kabirmehta@okaxis",
      created_at: "2026-06-10T12:15:00Z"
    }
  ]);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "", email: "", phone: "", vpa: "", github: "", linkedin: "", youtube: "", skills: "", industry: "", hiringHistory: "", hourlyRate: ""
  });

  const [inspectedSeller, setInspectedSeller] = useState(null);

  const [gigForm, setGigForm] = useState({
    title: "Minimalist landing page design for Web3 App",
    description: "Need a Figma designer who specializes in Dark Mode + Minimalist aesthetics.",
    budget: 15000,
    aesthetic_style: "Minimalist",
    required_skills: "Figma, Web3, UI/UX"
  });
  
  const [activeGig, setActiveGig] = useState(null);
  const [matchedFreelancers, setMatchedFreelancers] = useState([]);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [upiTx, setUpiTx] = useState(null);
  const [deliverable, setDeliverable] = useState(null);
  const [deliverableUrls, setDeliverableUrls] = useState({});
  const [deliverableNotes, setDeliverableNotes] = useState({});
  
  // Chat
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Trigger matches automatically when activeCategory changes
  useEffect(() => {
    runAutoMatch();
  }, [activeCategory]);

  const runAutoMatch = () => {
    const list = FREELANCERS_DB.filter(f => f.category === activeCategory);
    
    // Calculate match scores
    const calculated = list.map(f => {
      let score = 75; 
      const preset = CATEGORY_PRESETS[activeCategory];
      if (preset) {
        const matchingSkills = f.skills.filter(s => preset.required_skills.split(', ').includes(s));
        score += matchingSkills.length * 10;
      }
      return { ...f, matchScore: Math.min(score, 100) };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setMatchedFreelancers(calculated);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const preset = CATEGORY_PRESETS[category];
    if (preset) {
      setGigForm({
        title: preset.title,
        description: preset.description,
        budget: preset.budget,
        aesthetic_style: preset.aesthetic_style,
        required_skills: preset.required_skills
      });
    }
    setStep(1);
    setPage('BRIEF');
  };

  const handleOpenProfileEditor = () => {
    if (role === 'CLIENT') {
      setProfileForm({
        name: clientProfile.name,
        email: clientProfile.email,
        phone: clientProfile.phone,
        industry: clientProfile.industry || "",
        hiringHistory: clientProfile.hiringHistory || "",
        vpa: "", github: "", linkedin: "", youtube: "", skills: "", hourlyRate: ""
      });
    } else {
      setProfileForm({
        name: freelancerProfile.name,
        email: freelancerProfile.email,
        phone: freelancerProfile.phone,
        vpa: freelancerProfile.vpa || "",
        github: freelancerProfile.portfolio_links.github || "",
        linkedin: freelancerProfile.portfolio_links.linkedin || "",
        youtube: freelancerProfile.portfolio_links.youtube || "",
        skills: freelancerProfile.skills.join(", "),
        hourlyRate: freelancerProfile.hourlyRate || "",
        industry: "", hiringHistory: ""
      });
    }
    setProfileModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (role === 'CLIENT') {
      const updatedProfile = {
        ...clientProfile,
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
        industry: profileForm.industry,
        hiringHistory: profileForm.hiringHistory
      };
      setClientProfile(updatedProfile);
    } else {
      const updatedProfile = {
        ...freelancerProfile,
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
        vpa: profileForm.vpa,
        hourlyRate: profileForm.hourlyRate,
        portfolio_links: {
          github: profileForm.github,
          linkedin: profileForm.linkedin,
          youtube: profileForm.youtube
        },
        skills: profileForm.skills.split(',').map(s => s.trim()).filter(Boolean)
      };
      setFreelancerProfile(updatedProfile);
    }
    setProfileModalOpen(false);
  };

  const handleApproveAndReleaseForGig = (gig) => {
    const matchingTx = transactionsList.find(t => t.gig_id === gig.id);
    const updatedGig = {
      ...gig,
      status: 'COMPLETED'
    };
    
    setGigsList(prev => prev.map(g => g.id === gig.id ? updatedGig : g));

    if (matchingTx) {
      const updatedTx = {
        ...matchingTx,
        status: 'RELEASED',
        updated_at: new Date().toISOString()
      };
      setTransactionsList(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
      if (upiTx && upiTx.gig_id === gig.id) {
        setUpiTx(updatedTx);
      }
    }

    if (activeGig && activeGig.id === gig.id) {
      setActiveGig(updatedGig);
      setStep(4);
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDeliverWorkForGig = (gig, url, notes) => {
    const delivery = {
      url: url || "https://github.com/keyz-loop/gravity-pro-escrow",
      notes: notes || "Completed development and verified mobile responsive layout."
    };
    
    const updatedGig = {
      ...gig,
      status: 'DELIVERED'
    };
    
    setGigsList(prev => prev.map(g => g.id === updatedGig.id ? updatedGig : g));
    
    if (activeGig && activeGig.id === gig.id) {
      setDeliverable(delivery);
      setActiveGig(updatedGig);
      setStep(3);
    }
    
    const deliveryMsg = {
      id: "msg-delivery-" + Math.random().toString(36).substring(2, 9),
      gig_id: gig.id,
      sender_id: freelancerProfile.id,
      content: `📦 PROJECT SUBMITTED: ${delivery.notes}. Link: ${delivery.url}`
    };
    setChatMessages(prev => [...prev, deliveryMsg]);
  };

  const handleCreateGig = (e) => {
    e.preventDefault();
    const newGig = {
      id: "gig-" + Math.random().toString(36).substring(2, 9),
      client_id: clientProfile.id,
      freelancer_id: null,
      title: gigForm.title,
      description: gigForm.description,
      budget: parseFloat(gigForm.budget),
      aesthetic_style: gigForm.aesthetic_style,
      status: 'OPEN',
      created_at: new Date().toISOString()
    };

    const list = FREELANCERS_DB.filter(f => f.category === activeCategory);
    const scores = list.map(f => {
      let score = 50;
      const formSkills = gigForm.required_skills.split(',').map(s => s.trim().toLowerCase());
      const matchingSkills = f.skills.filter(s => formSkills.includes(s.toLowerCase()));
      score += matchingSkills.length * 20;
      
      if (f.aesthetic_style.toLowerCase() === gigForm.aesthetic_style.toLowerCase()) {
        score += 15;
      }
      return { ...f, matchScore: Math.min(score, 100) };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setActiveGig(newGig);
    setMatchedFreelancers(scores);
    setGigsList(prev => [newGig, ...prev]);
  };

  const handleSelectFreelancer = (freelancer) => {
    setSelectedFreelancer(freelancer);
    const updatedGig = {
      ...activeGig,
      freelancer_id: freelancer.id,
      status: 'OPEN'
    };
    setActiveGig(updatedGig);
    setGigsList(prev => prev.map(g => g.id === updatedGig.id ? updatedGig : g));

    const welcomeMsgs = [
      { id: "msg-1", gig_id: activeGig.id, sender_id: clientProfile.id, content: "Hey! Let's get started on the landing page design. I need it by tomorrow." },
      { id: "msg-2", gig_id: activeGig.id, sender_id: freelancer.id, content: "Hi! Sounds great. Let me check the details. I will upload a Figma link soon." }
    ];
    setChatMessages(welcomeMsgs);
    setStep(2);
  };

  const handleSelectActiveProject = (project) => {
    const freelancer = FREELANCERS_DB.find(f => f.id === project.freelancer_id);
    setSelectedFreelancer(freelancer || null);
    setActiveGig(project);
    
    if (freelancer) {
      setActiveCategory(freelancer.category);
    }

    const tx = transactionsList.find(t => t.gig_id === project.id);
    setUpiTx(tx || null);

    if (project.status === 'COMPLETED') {
      setChatMessages([
        { id: "msg-h1", gig_id: project.id, sender_id: clientProfile.id, content: "Please update the API endpoints." },
        { id: "msg-h2", gig_id: project.id, sender_id: freelancer?.id, content: "All completed. Delivering backend routes now." },
        { id: "msg-h3", gig_id: project.id, sender_id: freelancer?.id, content: "📦 PROJECT SUBMITTED: Production models deployed." }
      ]);
      setStep(4);
    } else if (project.status === 'DELIVERED') {
      setChatMessages([
        { id: "msg-h1", gig_id: project.id, sender_id: clientProfile.id, content: "Are the Blender renders ready?" },
        { id: "msg-h2", gig_id: project.id, sender_id: freelancer?.id, content: "Yes! Here are the 3D rendering links." },
        { id: "msg-h3", gig_id: project.id, sender_id: freelancer?.id, content: "📦 PROJECT SUBMITTED: Completed dark-mode home layout. Verified animations." }
      ]);
      setDeliverable({
        url: "https://github.com/riyapatel/web3-landing-page",
        notes: "Completed dark-mode home layout. Verified animations."
      });
      setStep(3);
    } else if (project.status === 'IN_PROGRESS') {
      setStep(3);
    } else if (project.status === 'OPEN' && freelancer) {
      setStep(2);
    } else {
      setStep(1);
    }

    setPage('BRIEF');
  };

  const handleInitiateEscrow = () => {
    const gatewayTxId = "tx_" + Math.random().toString(36).substring(2, 11);
    const mockQR = `upi://pay?pa=escrow@razorpay&pn=GravityProEscrow&am=${activeGig.budget}&tr=${gatewayTxId}`;
    
    const newTx = {
      id: gatewayTxId,
      gig_id: activeGig.id,
      amount: activeGig.budget,
      gateway_reference_id: null,
      status: 'PENDING',
      payment_qr_code_url: mockQR,
      client_vpa: clientProfile.vpa,
      freelancer_vpa: selectedFreelancer.vpa,
      created_at: new Date().toISOString()
    };

    setUpiTx(newTx);
    setTransactionsList(prev => [newTx, ...prev]);
  };

  const handleMockPaymentScan = () => {
    if (!upiTx) return;

    setTimeout(() => {
      const updatedTx = {
        ...upiTx,
        status: 'ESCROW_LOCKED',
        gateway_reference_id: "pay_ref_" + Math.random().toString(36).substring(2, 9),
        updated_at: new Date().toISOString()
      };
      
      const updatedGig = {
        ...activeGig,
        status: 'IN_PROGRESS'
      };

      setUpiTx(updatedTx);
      setActiveGig(updatedGig);

      setTransactionsList(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
      setGigsList(prev => prev.map(g => g.id === updatedGig.id ? updatedGig : g));
      setStep(3);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: "msg-" + Math.random().toString(36).substring(2, 9),
      gig_id: activeGig.id,
      sender_id: role === 'CLIENT' ? clientProfile.id : selectedFreelancer.id,
      content: chatInput,
      created_at: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput("");

    if (role === 'CLIENT') {
      setTimeout(() => {
        const autoReply = {
          id: "msg-auto",
          gig_id: activeGig.id,
          sender_id: selectedFreelancer.id,
          content: "Perfect! I've uploaded the project deliverables draft now. Check the submit panel.",
          created_at: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, autoReply]);
      }, 2000);
    }
  };

  const handleDeliverWork = () => {
    const delivery = {
      url: "https://github.com/riyapatel/web3-landing-page",
      notes: "Completed dark-mode home layout. Verified animations."
    };
    
    setDeliverable(delivery);
    const updatedGig = {
      ...activeGig,
      status: 'DELIVERED'
    };
    setActiveGig(updatedGig);
    setGigsList(prev => prev.map(g => g.id === updatedGig.id ? updatedGig : g));

    const deliveryMsg = {
      id: "msg-delivery",
      gig_id: activeGig.id,
      sender_id: selectedFreelancer.id,
      content: `📦 PROJECT SUBMITTED: ${delivery.notes}. Link: ${delivery.url}`
    };
    setChatMessages(prev => [...prev, deliveryMsg]);
  };

  const handleApproveAndRelease = () => {
    const updatedGig = {
      ...activeGig,
      status: 'COMPLETED'
    };
    const updatedTx = {
      ...upiTx,
      status: 'RELEASED',
      updated_at: new Date().toISOString()
    };

    setActiveGig(updatedGig);
    setUpiTx(updatedTx);

    setTransactionsList(prev => prev.map(t => t.id === updatedTx.id ? updatedTx : t));
    setGigsList(prev => prev.map(g => g.id === updatedGig.id ? updatedGig : g));

    setTimeout(() => {
      setStep(4);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-branding">
          <div className="logo" onClick={() => { setPage('HOME'); setMobileMenuOpen(false); }}>
            gravity<span className="logo-dot">.</span>
            <span className="logo-pro-badge">pro</span>
          </div>
          <span className="badge-tag">UPI ESCROW</span>
        </div>
        
        {/* Mobile menu toggle button */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="header-controls">
          {/* Role Switcher Toggle */}
          <div className="role-switcher" onClick={() => setRole(role === 'CLIENT' ? 'FREELANCER' : 'CLIENT')} title="Toggle client/freelancer terminal mode">
            <div className={`role-switcher-slider ${role === 'CLIENT' ? 'client' : 'freelancer'}`}></div>
            <span className={`role-switcher-text ${role === 'CLIENT' ? 'active' : ''}`}>Client Mode (Post Problems)</span>
            <span className={`role-switcher-text ${role === 'FREELANCER' ? 'active' : ''}`}>Freelancer Mode (Solve Problems)</span>
          </div>

          {/* Dashboard Navigator */}
          <div className="header-nav-group">
            <button 
              className="btn" 
              onClick={() => {
                setPage(activeGig ? 'BRIEF' : 'HOME');
              }}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: page !== 'DASHBOARD' ? 'var(--bg-tertiary)' : 'transparent', color: page !== 'DASHBOARD' ? 'var(--text-primary)' : 'var(--text-secondary)', border: 'none' }}
            >
              <Briefcase size={12} style={{ marginRight: '0.2rem' }} /> Sourcing Portal
            </button>
            <button 
              className="btn" 
              onClick={() => setPage('DASHBOARD')}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: page === 'DASHBOARD' ? 'var(--bg-tertiary)' : 'transparent', color: page === 'DASHBOARD' ? 'var(--text-primary)' : 'var(--text-secondary)', border: 'none' }}
            >
              <Layers size={12} style={{ marginRight: '0.2rem' }} /> Pro Projects ({gigsList.length})
            </button>
          </div>

          <div className="header-action-group">
            <button 
              onClick={toggleTheme} 
              className="btn btn-secondary" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem', width: '32px', height: '32px', borderRadius: '50%' }}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button 
              onClick={handleOpenProfileEditor} 
              className="btn btn-secondary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              <Settings size={14} /> Profile Setup
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu sheet */}
      {mobileMenuOpen && (
        <div className="mobile-menu-sheet">
          {/* Mobile Role Switcher */}
          <div style={{ padding: '0.5rem 0' }}>
            <div className="role-switcher" style={{ width: '100%' }} onClick={() => { setRole(role === 'CLIENT' ? 'FREELANCER' : 'CLIENT'); setMobileMenuOpen(false); }}>
              <div className={`role-switcher-slider ${role === 'CLIENT' ? 'client' : 'freelancer'}`} style={{ width: 'calc(50% - 2px)' }}></div>
              <span className={`role-switcher-text ${role === 'CLIENT' ? 'active' : ''}`}>Client Mode (Post Problems)</span>
              <span className={`role-switcher-text ${role === 'FREELANCER' ? 'active' : ''}`}>Freelancer Mode (Solve Problems)</span>
            </div>
          </div>

          <button 
            className={`mobile-menu-btn ${page !== 'DASHBOARD' ? 'active' : ''}`}
            onClick={() => {
              setPage(activeGig ? 'BRIEF' : 'HOME');
              setMobileMenuOpen(false);
            }}
          >
            <Briefcase size={16} /> Sourcing Portal
          </button>
          <button 
            className={`mobile-menu-btn ${page === 'DASHBOARD' ? 'active' : ''}`}
            onClick={() => {
              setPage('DASHBOARD');
              setMobileMenuOpen(false);
            }}
          >
            <Layers size={16} /> Pro Projects ({gigsList.length})
          </button>
          <button 
            className="mobile-menu-btn"
            onClick={() => {
              handleOpenProfileEditor();
              setMobileMenuOpen(false);
            }}
          >
            <Settings size={16} /> Profile Setup
          </button>
          <button 
            className="mobile-menu-btn"
            onClick={() => {
              toggleTheme();
              setMobileMenuOpen(false);
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}

      {/* Main Grid View */}
      <main className="main-content">
        
        {/* 1. DEDICATED MARKETPLACE HOME PAGE */}
        {page === 'HOME' && (
          <div>
            {/* Stunning large hero section */}
            <div className="home-hero">
              <h1>Find the perfect Pro talent for your enterprise vision.</h1>
              <p className="hero-subtext">Work with vetted freelance talent under secure escrow contracts.</p>
              
              <div className="home-search">
                <input 
                  type="text" 
                  readOnly
                  placeholder='Try "building mobile app", "website design", or "video editing"...'
                  onClick={() => handleCategoryClick("Programming & Tech")}
                />
                <button onClick={() => handleCategoryClick("Programming & Tech")}>
                  <Search size={18} /> Search Pro Sourcing
                </button>
              </div>

              <div className="popular-tags">
                <span className="popular-tags-label">Popular Keywords:</span>
                <div className="popular-tags-list">
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("Graphics & Design")}>Graphics & Design</span>
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("Programming & Tech")}>Programming & Tech</span>
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("Digital Marketing")}>Digital Marketing</span>
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("Writing & Translation")}>Writing & Translation</span>
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("Video & Animation")}>Video & Animation</span>
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("AI Services")}>AI Services</span>
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("Music & Audio")}>Music & Audio</span>
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("Business")}>Business</span>
                  <span className="popular-tag-badge" onClick={() => handleCategoryClick("Consulting")}>Consulting</span>
                </div>
              </div>
            </div>

            {/* Inline Category Navigation Row (repositioned below the green card) */}
            <div className="sub-nav-container inline-sub-nav">
              <div className="sub-nav">
                {CATEGORIES_LIST.map((cat, i) => (
                  <span 
                    key={i}
                    className={activeCategory === cat ? 'active' : ''}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Popular service categories row */}
            <h2 className="section-title" style={{ marginTop: '2.5rem' }}>Popular Pro services</h2>
            <div className="service-grid">
              {POPULAR_SERVICES.map((s, i) => (
                <div key={i} className="service-card" onClick={() => handleCategoryClick(s.category)}>
                  <div className="service-card-overlay">
                    <span className="service-card-subtitle">{s.subtitle}</span>
                    <span className="service-card-title">{s.name}</span>
                  </div>
                  {s.image ? (
                    <img src={s.image} alt={s.name} />
                  ) : (
                    <div style={{ height: '100%', background: `linear-gradient(135deg, #${(i*12345).toString(16).padEnd(6,'a')} 0%, #0073e6 100%)` }}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Trust highlights section */}
            <h2 className="section-title" style={{ marginTop: '4rem' }}>Why Gravity Pro</h2>
            <div className="features-container" style={{ borderTop: 'none', paddingTop: 0, marginBottom: '5rem' }}>
              
              <div className="feature-col" onClick={() => handleCategoryClick("Programming & Tech")}>
                <div className="feature-icon-wrapper">
                  <Award size={24} />
                </div>
                <h3>Vetted Pro Talent</h3>
                <p>Collaborate with the top 1% verified digital creators and developers, backed by direct links to their GitHub, LinkedIn, or YouTube portfolios.</p>
              </div>

              <div className="feature-col" onClick={() => handleCategoryClick("Programming & Tech")}>
                <div className="feature-icon-wrapper">
                  <FileCheck size={24} />
                </div>
                <h3>Milestone Tracking</h3>
                <p>Break down complex projects into strict, clear milestones. Review deliverables and communicate in real-time inside your collaborative workspace.</p>
              </div>

              <div className="feature-col" onClick={() => handleCategoryClick("Programming & Tech")}>
                <div className="feature-icon-wrapper">
                  <ShieldCheck size={24} />
                </div>
                <h3>Secured UPI Escrow Pool</h3>
                <p>Funds remain locked inside the secure UPI Escrow pool. Payouts are dispatched to the freelancer’s VPA only after you verify and release.</p>
              </div>

            </div>

            {/* Let experts find the right freelancer for you section */}
            <div className="glass-card clickable-card" onClick={() => handleCategoryClick("Consulting")} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', padding: '3rem', background: 'rgba(205, 164, 94, 0.05)', borderColor: 'rgba(205, 164, 94, 0.2)', marginBottom: '5rem' }}>
              <div>
                <span className="campaign-tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>GRAVITY PRO EXPORTS</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>Let experts find the right freelancer for you</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                  Work with experts who will source, interview, and vet freelancers for you. Get a report with clear recommendations. Hire vetted freelance talent with confidence.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    ✔ 100% money-back guarantee
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    ✔ Vetted Pro Sourcing
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Banners Section */}
            <div className="campaign-banner" onClick={() => handleCategoryClick("AI Services")} style={{ cursor: 'pointer', marginBottom: '5rem' }}>
              <span className="campaign-tag">PRO SPOTLIGHT</span>
              <h2>The AI Director era has arrived</h2>
              <p>From vision to final frame, work with the most renowned AI Video Directors to create scroll-stopping content and campaigns that drive real impact.</p>
              <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={(e) => { e.stopPropagation(); handleCategoryClick("AI Services"); }}>
                Explore AI Directors
              </button>
            </div>

            <div className="glass-card clickable-card" onClick={() => handleCategoryClick("Graphics & Design")} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>What success on Gravity Pro looks like</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Vontélle Eyewear turns to Gravity Pro freelancers to bring their vision to life. From logo design and Shopify development to copywriting and photography setups.
              </p>
            </div>

            {/* Guides Section */}
            <h2 className="section-title">Guides to help you grow</h2>
            <div className="guides-grid">
              {GUIDES.map((g, i) => (
                <div key={i} className="guide-card" onClick={() => handleCategoryClick("Programming & Tech")}>
                  <div className="guide-card-img" style={{ background: `linear-gradient(135deg, #${(i*321).toString(16).padEnd(3,'7')} 0%, #10a35c 100%)` }}>
                    <BookOpen size={32} color="#08090d" />
                  </div>
                  <div className="guide-card-body">
                    <h4 className="guide-card-title">{g.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{g.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* 2. DUAL DASHBOARD VIEW */}
        {page === 'DASHBOARD' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {role === 'CLIENT' ? (
              /* CLIENT MODE DASHBOARD */
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.25rem' }}>
                      Client Portal: Project Control Room
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Manage your posted problems, escrow locks, and release instant UPI payouts to solvers.
                    </p>
                  </div>
                  
                  {/* Post a New Project Card Button */}
                  <button 
                    className="btn btn-primary" 
                    onClick={() => { setPage('HOME'); setTimeout(() => { document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-glow)' }}
                  >
                    <Sparkles size={16} /> Post a New Project/Problem
                  </button>
                </div>

                {/* Client Stats Grid */}
                <div className="dashboard-stats-grid">
                  <div className="dashboard-stat-card">
                    <div className="stat-icon-wrapper client">
                      <Briefcase size={22} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">My Posted Problems</span>
                      <span className="stat-val">{gigsList.filter(g => g.client_id === clientProfile.id).length}</span>
                    </div>
                  </div>
                  
                  <div className="dashboard-stat-card">
                    <div className="stat-icon-wrapper client" style={{ color: 'var(--primary)', background: 'rgba(29, 191, 115, 0.1)' }}>
                      <Coins size={22} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Total Escrow Funded</span>
                      <span className="stat-val">
                        ₹{gigsList.filter(g => g.client_id === clientProfile.id).reduce((sum, g) => {
                          const tx = transactionsList.find(t => t.gig_id === g.id);
                          return sum + (tx && tx.status !== 'PENDING' ? g.budget : 0);
                        }, 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="dashboard-stat-card">
                    <div className="stat-icon-wrapper client" style={{ color: 'var(--accent-cyan)', background: 'rgba(14, 165, 233, 0.1)' }}>
                      <User size={22} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Freelancers Hired</span>
                      <span className="stat-val">
                        {gigsList.filter(g => g.client_id === clientProfile.id && g.freelancer_id !== null).length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Client Projects Ledger */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                  Hiring Ledger & Active Escrows
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {gigsList.filter(g => g.client_id === clientProfile.id).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-secondary)', border: '1px dashed var(--glass-border)', borderRadius: '8px' }}>
                      <Briefcase size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
                      <p>You haven't posted any problems yet. Click "Post a New Project/Problem" to begin.</p>
                    </div>
                  ) : (
                    gigsList.filter(g => g.client_id === clientProfile.id).map(gig => {
                      const freelancer = FREELANCERS_DB.find(f => f.id === gig.freelancer_id);
                      const tx = transactionsList.find(t => t.gig_id === gig.id);
                      
                      return (
                        <div key={gig.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'var(--bg-secondary)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                                <span style={{ fontWeight: '700', fontSize: '1rem', color: '#ffffff' }}>{gig.title}</span>
                                <span className={`status-pill ${gig.status.toLowerCase()}`}>{gig.status}</span>
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                Budget: <strong>₹{gig.budget.toLocaleString('en-IN')}</strong> | Pro Freelancer: <strong>{freelancer ? freelancer.name : (gig.freelancer_id ? 'Specialist Selected' : 'Searching / Unassigned')}</strong>
                              </div>
                              {tx && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                  <Lock size={10} style={{ color: 'var(--accent-amber)' }} /> Escrow status: <span style={{ color: tx.status === 'RELEASED' ? 'var(--primary)' : 'var(--accent-amber)', fontWeight: '600' }}>{tx.status}</span> {tx.gateway_reference_id && `(Ref: ${tx.gateway_reference_id})`}
                                </div>
                              )}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              {gig.status === 'DELIVERED' && (
                                <button 
                                  onClick={() => handleApproveAndReleaseForGig(gig)}
                                  className="btn btn-primary"
                                  style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', boxShadow: 'var(--shadow-glow)' }}
                                >
                                  <CheckCircle2 size={12} /> Approve & Release UPI Payout
                                </button>
                              )}

                              <button 
                                onClick={() => handleSelectActiveProject(gig)}
                                className="btn btn-secondary"
                                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                              >
                                <ExternalLink size={12} /> Enter Workspace
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              /* FREELANCER MODE DASHBOARD */
              <div className="glass-card">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.25rem' }}>
                    Freelancer Mode: Solution Terminal
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Browse active enterprise problems, submit completed deliverables, and track your instant UPI payouts.
                  </p>
                </div>

                {/* Freelancer Stats Grid */}
                <div className="dashboard-stats-grid">
                  <div className="dashboard-stat-card">
                    <div className="stat-icon-wrapper freelancer">
                      <Briefcase size={22} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">My Active Jobs</span>
                      <span className="stat-val">
                        {gigsList.filter(g => g.freelancer_id === freelancerProfile.id && (g.status === 'IN_PROGRESS' || g.status === 'DELIVERED')).length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="dashboard-stat-card">
                    <div className="stat-icon-wrapper freelancer" style={{ color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.1)' }}>
                      <ShieldCheck size={22} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Escrow Locked / Verified</span>
                      <span className="stat-val">
                        {gigsList.filter(g => g.freelancer_id === freelancerProfile.id && g.status === 'IN_PROGRESS').length}
                      </span>
                    </div>
                  </div>

                  <div className="dashboard-stat-card">
                    <div className="stat-icon-wrapper freelancer" style={{ color: 'var(--primary)', background: 'rgba(29, 191, 115, 0.1)' }}>
                      <Coins size={22} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Earnings Ledger (UPI Payouts)</span>
                      <span className="stat-val">
                        ₹{gigsList.filter(g => g.freelancer_id === freelancerProfile.id && g.status === 'COMPLETED').reduce((sum, g) => sum + g.budget, 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* My Active Jobs & Submission Ledger */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '1rem' }}>
                  My Active Contracts & Work Submission Ledger
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  {gigsList.filter(g => g.freelancer_id === freelancerProfile.id).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-secondary)', border: '1px dashed var(--glass-border)', borderRadius: '8px' }}>
                      <Briefcase size={32} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }} />
                      <p>You don't have any active jobs or contracts yet. Browse the available briefs below to get started!</p>
                    </div>
                  ) : (
                    gigsList.filter(g => g.freelancer_id === freelancerProfile.id).map(gig => {
                      const tx = transactionsList.find(t => t.gig_id === gig.id);
                      
                      return (
                        <div key={gig.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'var(--bg-secondary)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                                <span style={{ fontWeight: '700', fontSize: '1rem', color: '#ffffff' }}>{gig.title}</span>
                                <span className={`status-pill ${gig.status.toLowerCase()}`}>{gig.status}</span>
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                Budget: <strong>₹{gig.budget.toLocaleString('en-IN')}</strong> | Escrow VPA: <strong>escrow@razorpay</strong>
                              </div>
                              {tx && (
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                  <Lock size={10} style={{ color: tx.status === 'RELEASED' ? 'var(--primary)' : 'var(--accent-amber)' }} /> Escrow Status: <span style={{ color: tx.status === 'RELEASED' ? 'var(--primary)' : 'var(--accent-amber)', fontWeight: '600' }}>{tx.status} (Verified)</span>
                                </div>
                              )}
                            </div>

                            <button 
                              onClick={() => handleSelectActiveProject(gig)}
                              className="btn btn-secondary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                            >
                              <ExternalLink size={12} /> Enter Workspace
                            </button>
                          </div>

                          {/* Work submission form inline inside ledger row */}
                          {gig.status === 'IN_PROGRESS' && (
                            <div className="submission-form-container">
                              <h4 className="submission-form-title">
                                <Upload size={12} /> Submit Deliverables for Client Review
                              </h4>
                              <div className="submission-input-group">
                                <input 
                                  type="text" 
                                  placeholder="GitHub Repository, LinkedIn, or Blender link" 
                                  className="submission-input" 
                                  value={deliverableUrls[gig.id] || ""}
                                  onChange={e => setDeliverableUrls({ ...deliverableUrls, [gig.id]: e.target.value })}
                                />
                                <input 
                                  type="text" 
                                  placeholder="Describe what you did (e.g., Completed layout, optimized routers)" 
                                  className="submission-input" 
                                  value={deliverableNotes[gig.id] || ""}
                                  onChange={e => setDeliverableNotes({ ...deliverableNotes, [gig.id]: e.target.value })}
                                />
                              </div>
                              <button 
                                className="btn btn-primary"
                                style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                                onClick={() => {
                                  if (!(deliverableUrls[gig.id] || "").trim()) {
                                    alert("Please provide a deliverable project URL.");
                                    return;
                                  }
                                  handleDeliverWorkForGig(gig, deliverableUrls[gig.id], deliverableNotes[gig.id]);
                                }}
                              >
                                Submit Work
                              </button>
                            </div>
                          )}

                          {gig.status === 'DELIVERED' && (
                            <div style={{ background: 'rgba(205, 164, 94, 0.05)', border: '1px dashed rgba(205, 164, 94, 0.2)', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                              📦 <strong>Deliverables submitted!</strong> Awaiting client's review and instant UPI escrow release.
                            </div>
                          )}

                          {gig.status === 'COMPLETED' && (
                            <div style={{ background: 'rgba(29, 191, 115, 0.05)', border: '1px dashed rgba(29, 191, 115, 0.2)', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--primary)' }}>
                              🎉 <strong>Payout Released!</strong> Payout amount of ₹{gig.budget.toLocaleString('en-IN')} was successfully transferred to your UPI VPA: {freelancerProfile.vpa}.
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Browse Active Problems / Gigs Feed */}
                <h3 className="browse-feed-title">
                  <Sparkles size={16} color="var(--accent-gold)" /> Browse Active Marketplace Problems & Briefs
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Select a problem posted by clients, claim it, and lock their deposited escrow budget to your solution terminal.
                </p>

                <div className="browse-gigs-grid">
                  {gigsList.filter(g => g.status === 'OPEN').length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2.5rem', color: 'var(--text-secondary)', border: '1px dashed var(--glass-border)', borderRadius: '8px' }}>
                      <p>No open client problems found. Go to Client Mode to post a new problem brief!</p>
                    </div>
                  ) : (
                    gigsList.filter(g => g.status === 'OPEN').map(gig => (
                      <div key={gig.id} className="browse-gig-card">
                        <div>
                          <div className="browse-gig-header">
                            <h4 className="browse-gig-title">{gig.title}</h4>
                            <span className="browse-gig-budget">₹{gig.budget.toLocaleString('en-IN')}</span>
                          </div>
                          <p className="browse-gig-desc">{gig.description}</p>
                        </div>
                        
                        <div className="browse-gig-footer">
                          <div className="browse-skills-list">
                            {(gig.required_skills || "Figma, React").split(',').map((skill, index) => (
                              <span key={index} className="browse-skill-tag">{skill.trim()}</span>
                            ))}
                          </div>
                          
                          <button 
                            className="btn btn-secondary"
                            style={{ padding: '0.45rem 0.9rem', fontSize: '0.75rem', borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}
                            onClick={() => {
                              const updatedGig = {
                                ...gig,
                                freelancer_id: freelancerProfile.id,
                                status: 'IN_PROGRESS'
                              };
                              const newTx = {
                                id: "tx_" + Math.random().toString(36).substring(2, 11),
                                gig_id: gig.id,
                                amount: gig.budget,
                                gateway_reference_id: "pay_ref_" + Math.random().toString(36).substring(2, 9),
                                status: 'ESCROW_LOCKED',
                                client_vpa: clientProfile.vpa,
                                freelancer_vpa: freelancerProfile.vpa,
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString()
                              };
                              setGigsList(prev => prev.map(g => g.id === gig.id ? updatedGig : g));
                              setTransactionsList(prev => [newTx, ...prev]);
                              alert(`Success! You accepted the gig: "${gig.title}". The escrow budget of ₹${gig.budget.toLocaleString('en-IN')} has been LOCKED. Switch to active jobs above to submit completed work.`);
                            }}
                          >
                            Apply & Solve Gig
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. BRIEF SUBMISSION & MULTI-STEP CONTRACT WORKSPACE */}
        {page === 'BRIEF' && (
          <div>
            {/* Category sub-navigation categories (FILTERS FREELANCERS) */}
            <div className="sub-nav-container">
              <div className="sub-nav">
                {CATEGORIES_LIST.map((cat, i) => (
                  <span 
                    key={i}
                    className={activeCategory === cat ? 'active' : ''}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Stepper Progress bar */}
            <div className="stepper">
              <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-circle">1</div>
                <div className="step-label">Find Seller</div>
              </div>
              <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <div className="step-circle">2</div>
                <div className="step-label">Escrow Lock</div>
              </div>
              <div className={`step-node ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                <div className="step-circle">3</div>
                <div className="step-label">Workspace</div>
              </div>
              <div className={`step-node ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
                <div className="step-circle">4</div>
                <div className="step-label">Instant Payout</div>
              </div>
            </div>

            {/* Step 1: Matching Panel */}
            {step === 1 && (
              <div>
                {/* Forest Green Hero search banner */}
                <div className="hero-banner">
                  <h1>Category: <i>{activeCategory}</i></h1>
                  <p>Matching brief presets loaded. Fine-tune your details or select matching creators below.</p>
                </div>

                {/* Matching Setup Card */}
                <div className="glass-card">
                  <h2 style={{ marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>
                    Project Brief Setup
                  </h2>
                  
                  <form onSubmit={handleCreateGig}>
                    <div className="form-group">
                      <label className="form-label">Project Title</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={gigForm.title} 
                        onChange={e => setGigForm({...gigForm, title: e.target.value})} 
                      />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Budget (INR)</label>
                        <input 
                          type="number" 
                          className="form-input" 
                          value={gigForm.budget} 
                          onChange={e => setGigForm({...gigForm, budget: parseInt(e.target.value)})} 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Aesthetic Vibe</label>
                        <select 
                          className="form-input" 
                          value={gigForm.aesthetic_style} 
                          onChange={e => setGigForm({...gigForm, aesthetic_style: e.target.value})}
                        >
                          <option value="Minimalist">Minimalist</option>
                          <option value="Clean SaaS">Clean SaaS</option>
                          <option value="Cyberpunk">Cyberpunk</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Required Skills (Comma separated)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={gigForm.required_skills} 
                        onChange={e => setGigForm({...gigForm, required_skills: e.target.value})} 
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                      Recalculate Matching Scores
                    </button>
                  </form>
                </div>

                {/* Gig result list */}
                {matchedFreelancers.length > 0 ? (
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: '700', marginBottom: '1rem' }}>
                      Matched {activeCategory} Pro Creators:
                    </h3>
                    
                    <div className="gig-grid">
                      {matchedFreelancers.map(freelancer => (
                        <div key={freelancer.id} className="gravity-gig-card">
                          
                          {/* Gig Card Image header */}
                          <div className={`gig-card-image ${freelancer.class_name}`}>
                            {freelancer.avatar}
                            <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: 'var(--primary)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '800' }}>
                              {freelancer.matchScore}% MATCH
                            </span>
                          </div>

                          {/* Gig Card Body */}
                          <div className="gig-card-body">
                            <div className="seller-row">
                              <div className="seller-avatar">{freelancer.avatar}</div>
                              <span 
                                className="seller-name" 
                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => setInspectedSeller(freelancer)}
                              >
                                {freelancer.name}
                              </span>
                              <span className="seller-level">{freelancer.level}</span>
                            </div>

                            <div className="gig-title-text" style={{ cursor: 'pointer' }} onClick={() => setInspectedSeller(freelancer)}>
                              {freelancer.gig_title}
                            </div>

                            <div className="rating-row">
                              <Star size={12} fill="#ffb33e" color="#ffb33e" />
                              <span>{freelancer.rating}</span>
                              <span className="rating-count">({freelancer.reviews})</span>
                            </div>

                            <div className="gig-card-footer">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                <button 
                                  onClick={() => handleSelectFreelancer(freelancer)} 
                                  className="btn btn-primary"
                                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', borderRadius: '4px' }}
                                >
                                  Hire Seller
                                </button>
                                <button 
                                  onClick={() => setInspectedSeller(freelancer)} 
                                  className="btn btn-secondary"
                                  style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem', borderRadius: '4px', border: 'none', background: 'transparent' }}
                                >
                                  View Profile
                                </button>
                              </div>
                              <div className="starting-price">
                                STARTING AT
                                <strong>₹{activeGig?.budget || gigForm.budget}</strong>
                              </div>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-secondary)', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '6px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                    No mock freelancers currently loaded for {activeCategory}. Please switch sub-nav categories.
                  </p>
                )}
              </div>
            )}

            {/* Step 2: UPI Escrow Lock */}
            {step === 2 && (
              <div className="glass-card">
                <h2 style={{ marginBottom: '1.25rem', fontSize: '1.3rem', fontWeight: '700', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Lock color="var(--primary)" /> Gravity Pro Escrow Verification
                </h2>

                {!upiTx ? (
                  <div style={{ padding: '2rem 0', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                      Verify contract terms and initiate UPI Escrow payment of <strong>₹{activeGig.budget}</strong> to lock funds safely for <strong>{selectedFreelancer?.name}</strong>.
                    </p>
                    <button onClick={handleInitiateEscrow} className="btn btn-primary">
                      Generate Dynamic UPI QR Code
                    </button>
                  </div>
                ) : (
                  <div className="qr-modal">
                    <p style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>UPI Escrow QR Code</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.2' }}>
                      Payable amount: <strong style={{ color: '#ffffff' }}>₹{activeGig.budget}</strong>
                    </p>

                    <div className="qr-box">
                      <img 
                        className="qr-placeholder-img"
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiTx.payment_qr_code_url)}`} 
                        alt="UPI QR Code" 
                      />
                    </div>

                    <p className="qr-timer" style={{ marginBottom: '1.5rem' }}>
                      <span style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                      Scan and pay using BHIM UPI, GPay, or PhonePe
                    </p>

                    <button 
                      onClick={handleMockPaymentScan} 
                      className="btn btn-emerald"
                      style={{ width: '100%', padding: '0.75rem' }}
                    >
                      Simulate UPI Scan Success (Webhook Trigger)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Chat Workspace */}
            {step === 3 && (
              <div className="workspace-grid">
                
                {/* Workspace Main (Chat) */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Gravity Pro Collaborative Workspace</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Secure communication channel and contract deliverables logs
                      </p>
                    </div>
                    <div className="role-tabs" style={{ margin: 0 }}>
                      <button 
                        className={`role-tab ${role === 'CLIENT' ? 'active' : ''}`}
                        onClick={() => setRole('CLIENT')}
                      >
                        Client View
                      </button>
                      <button 
                        className={`role-tab ${role === 'FREELANCER' ? 'active' : ''}`}
                        onClick={() => setRole('FREELANCER')}
                      >
                        Freelancer View
                      </button>
                    </div>
                  </div>

                  {/* Chat Log */}
                  <div className="chat-container">
                    <div className="chat-history">
                      {chatMessages.map(msg => (
                        <div 
                          key={msg.id} 
                          className={`chat-bubble ${msg.sender_id === clientProfile.id ? 'sent' : 'received'}`}
                        >
                          <div className="chat-bubble-sender">
                            {msg.sender_id === clientProfile.id ? `${clientProfile.name} (Client)` : `${selectedFreelancer?.name} (Freelancer)`}
                          </div>
                          <div>{msg.content}</div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="chat-input-bar">
                      <input 
                        type="text" 
                        placeholder={`Write message as ${role === 'CLIENT' ? 'Client' : 'Freelancer'}...`} 
                        className="chat-input"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', borderRadius: '4px' }}>
                        Send
                      </button>
                    </form>
                  </div>
                </div>

                {/* Workspace Actions Panel */}
                <div className="glass-card" style={{ height: 'fit-content' }}>
                  <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', fontSize: '1rem', fontWeight: '700' }}>
                    Contract Status Options
                  </h3>
                  
                  {activeGig.status === 'IN_PROGRESS' && (
                    <div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                        Escrow budget of <strong>₹{activeGig.budget}</strong> is locked. Switch roles to Freelancer to submit the files.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button 
                          onClick={() => setRole('FREELANCER')}
                          className="btn btn-secondary"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Switch role to Freelancer
                        </button>

                        <button 
                          onClick={handleDeliverWork}
                          disabled={role !== 'FREELANCER'}
                          className="btn btn-primary"
                        >
                          Submit Project Deliverable
                        </button>
                        {role !== 'FREELANCER' && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', textAlign: 'center' }}>
                            * Switch to Freelancer view to submit.
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {activeGig.status === 'DELIVERED' && (
                    <div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.4' }}>
                        The work has been delivered by the Freelancer:
                        <br />
                        <strong style={{ color: 'var(--primary)' }}>{deliverable?.url}</strong>
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button 
                          onClick={() => setRole('CLIENT')}
                          className="btn btn-secondary"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Switch role to Client
                        </button>

                        <button 
                          onClick={handleApproveAndRelease}
                          disabled={role !== 'CLIENT'}
                          className="btn btn-emerald"
                        >
                          Approve Deliverables & Payout
                        </button>
                        {role !== 'CLIENT' && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', textAlign: 'center' }}>
                            * Switch to Client view to release.
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Step 4: Payout Complete */}
            {step === 4 && (
              <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(29, 191, 115, 0.1)', border: '2px solid var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 1.5rem auto' }}>
                  <CheckCircle2 size={40} color="var(--primary)" />
                </div>
                <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#ffffff', fontWeight: '800' }}>Payout Released Successfully!</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '0.9rem', lineHeight: '1.4' }}>
                  The contract funds (<strong>₹{activeGig.budget}</strong>) have been released from the platform escrow pool and sent via UPI Payouts to <strong>{selectedFreelancer?.name}</strong>'s VPA: <code>{selectedFreelancer?.vpa}</code>.
                </p>

                <button onClick={handleResetSimulator} className="btn btn-primary">
                  Simulate New Gig Brief
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Gravity Pro Detailed Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          
          <div className={`footer-col ${expandedFooter['categories'] ? 'expanded' : ''}`}>
            <h5 onClick={() => toggleFooter('categories')}>Categories</h5>
            <ul>
              <li onClick={() => handleCategoryClick("Graphics & Design")}>Graphics & Design</li>
              <li onClick={() => handleCategoryClick("Digital Marketing")}>Digital Marketing</li>
              <li onClick={() => handleCategoryClick("Writing & Translation")}>Writing & Translation</li>
              <li onClick={() => handleCategoryClick("Video & Animation")}>Video & Animation</li>
              <li onClick={() => handleCategoryClick("Music & Audio")}>Music & Audio</li>
              <li onClick={() => handleCategoryClick("Programming & Tech")}>Programming & Tech</li>
              <li onClick={() => handleCategoryClick("AI Services")}>AI Services</li>
              <li onClick={() => handleCategoryClick("Consulting")}>Consulting</li>
              <li onClick={() => handleCategoryClick("Data")}>Data</li>
              <li onClick={() => handleCategoryClick("Business")}>Business</li>
              <li onClick={() => handleCategoryClick("Personal Growth")}>Personal Growth & Hobbies</li>
              <li onClick={() => handleCategoryClick("Photography")}>Photography</li>
              <li onClick={() => handleCategoryClick("Finance")}>Finance</li>
            </ul>
          </div>

          <div className={`footer-col ${expandedFooter['clients'] ? 'expanded' : ''}`}>
            <h5 onClick={() => toggleFooter('clients')}>For Clients</h5>
            <ul>
              <li>How Gravity Works</li>
              <li>Customer Success Stories</li>
              <li>Quality Guide</li>
              <li>Gravity Guides</li>
              <li>Gravity Answers</li>
              <li>Browse Freelance By Skill</li>
            </ul>
          </div>

          <div className={`footer-col ${expandedFooter['freelancers'] ? 'expanded' : ''}`}>
            <h5 onClick={() => toggleFooter('freelancers')}>For Freelancers</h5>
            <ul>
              <li>Become a Gravity Freelancer</li>
              <li>Become an Agency</li>
              <li>Community Hub</li>
              <li>Forum</li>
              <li>Events</li>
            </ul>
          </div>

          <div className={`footer-col ${expandedFooter['solutions'] ? 'expanded' : ''}`}>
            <h5 onClick={() => toggleFooter('solutions')}>Business Solutions</h5>
            <ul>
              <li>Gravity Pro</li>
              <li>Project Management Service</li>
              <li>Expert Sourcing Service</li>
              <li>ClearVoice - Content Marketing</li>
              <li>AutoDS - Dropshipping Tool</li>
              <li>Digis - Software Development</li>
              <li>AI store builder</li>
              <li>Gravity Logo Maker</li>
              <li>Contact Sales</li>
            </ul>
          </div>

          <div className={`footer-col ${expandedFooter['company'] ? 'expanded' : ''}`}>
            <h5 onClick={() => toggleFooter('company')}>Company</h5>
            <ul>
              <li>About Gravity</li>
              <li>Help Center</li>
              <li>Trust & Safety</li>
              <li>Careers</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Do not sell or share my personal information</li>
              <li>Partnerships</li>
              <li>Investor Relations</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <strong>gravity<span>.</span>pro</strong>
            <span>© Gravity International Ltd. 2026</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
          </div>
        </div>
      </footer>

      {/* Profile Setup Modal */}
      {profileModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>Profile Setup Settings</h2>
              <button className="modal-close" onClick={() => setProfileModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label className="form-label">Full Name / Business Name</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="form-input" 
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="text" 
                    required
                    className="form-input" 
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>
              </div>

              {role === 'CLIENT' ? (
                /* CLIENT FORM FIELDS */
                <>
                  <div className="form-group">
                    <label className="form-label">Enterprise Industry</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. SaaS, AI Tech, FinTech"
                      value={profileForm.industry || ""}
                      onChange={e => setProfileForm({ ...profileForm, industry: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Past Hiring History</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 5 projects hired, 10 active freelancers"
                      value={profileForm.hiringHistory || ""}
                      onChange={e => setProfileForm({ ...profileForm, hiringHistory: e.target.value })}
                    />
                  </div>
                </>
              ) : (
                /* FREELANCER FORM FIELDS */
                <>
                  <div className="form-group">
                    <label className="form-label">Tech Stack / Skills (comma separated)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. React, UI/UX, Node.js"
                      value={profileForm.skills}
                      onChange={e => setProfileForm({ ...profileForm, skills: e.target.value })}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Hourly Rate (₹/hr)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        placeholder="e.g. 2500"
                        value={profileForm.hourlyRate || ""}
                        onChange={e => setProfileForm({ ...profileForm, hourlyRate: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Indian UPI VPA ID (for Escrow routing)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. freelancer@okaxis"
                        className="form-input" 
                        value={profileForm.vpa}
                        onChange={e => setProfileForm({ ...profileForm, vpa: e.target.value })}
                      />
                    </div>
                  </div>

                  <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffffff', margin: '1.5rem 0 0.5rem 0', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                    Portfolio Connections
                  </h4>

                  <div className="form-group">
                    <label className="form-label">GitHub Portfolio URL</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={profileForm.github}
                      placeholder="https://github.com/..."
                      onChange={e => setProfileForm({ ...profileForm, github: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">LinkedIn Profile URL</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={profileForm.linkedin}
                        placeholder="https://linkedin.com/in/..."
                        onChange={e => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">YouTube Showcase Link</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={profileForm.youtube}
                        placeholder="https://youtube.com/..."
                        onChange={e => setProfileForm({ ...profileForm, youtube: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setProfileModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Freelancer Profile Detail Modal */}
      {inspectedSeller && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} color="var(--primary)" /> Freelancer Profile Workspace
              </h2>
              <button className="modal-close" onClick={() => setInspectedSeller(null)}>×</button>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3.5rem', background: 'var(--bg-tertiary)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', border: '1px solid var(--glass-border)' }}>
                {inspectedSeller.avatar}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>{inspectedSeller.name}</span>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="seller-level" style={{ fontSize: '0.75rem' }}>{inspectedSeller.level}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', fontSize: '0.8rem', color: '#ffb33e', fontWeight: '700' }}>
                    <Star size={12} fill="#ffb33e" color="#ffb33e" /> {inspectedSeller.rating} ({inspectedSeller.reviews} reviews)
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Member Since: {inspectedSeller.member_since} | India 🇮🇳</span>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>About Me</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{inspectedSeller.bio}</p>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>Verified VPA Address</h4>
              <div style={{ background: 'rgba(29, 191, 115, 0.08)', border: '1px solid rgba(29, 191, 115, 0.2)', padding: '0.5rem 0.75rem', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--primary)', fontFamily: 'monospace' }}>
                {inspectedSeller.vpa}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {inspectedSeller.skills.map((s, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', padding: '0.25rem 0.6rem', borderRadius: '20px', color: '#ffffff', fontWeight: '600' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                Connected Portfolio Links (Fast Verification)
              </h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {inspectedSeller.portfolio_links.github && (
                  <a href={inspectedSeller.portfolio_links.github} target="_blank" rel="noreferrer" className="portfolio-badge">
                    <Github size={14} /> GitHub Profile
                  </a>
                )}
                {inspectedSeller.portfolio_links.linkedin && (
                  <a href={inspectedSeller.portfolio_links.linkedin} target="_blank" rel="noreferrer" className="portfolio-badge">
                    💼 LinkedIn Profile
                  </a>
                )}
                {inspectedSeller.portfolio_links.youtube && (
                  <a href={inspectedSeller.portfolio_links.youtube} target="_blank" rel="noreferrer" className="portfolio-badge">
                    📺 YouTube Channel
                  </a>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setInspectedSeller(null)}>
                Close
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  handleSelectFreelancer(inspectedSeller);
                  setInspectedSeller(null);
                }}
              >
                Hire {inspectedSeller.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock crypto generator
function requireCryptoMock() {
  return {
    createHmac: (algorithm, key) => {
      let dataStr = '';
      return {
        update: (data) => {
          dataStr = data;
          return {
            digest: (format) => {
              let hash = 0;
              const combined = dataStr + key;
              for (let i = 0; i < combined.length; i++) {
                const char = combined.charCodeAt(i);
                hash = (hash << 5) - hash + char;
                hash |= 0;
              }
              return "hmac_sha256_" + Math.abs(hash).toString(16);
            }
          };
        }
      };
    }
  };
}
