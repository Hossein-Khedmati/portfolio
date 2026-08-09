export interface Project {
  id: number;

  title: string;

  subtitle: {
    en: string;
    fa: string;
  };

  description: {
    en: string;
    fa: string;
  };

  tags: string[];

  features: {
    en: string[];
    fa: string[];
  };

  image: string;
  demoUrl: string;
  repoUrl: string;
  year: string;
}
export const featuredProjectsData: Project[] = [
  {
    id: 1,
    title: "Menuvita",

    subtitle: {
      en: "Digital Restaurant SaaS Platform",
      fa: "پلتفرم SaaS دیجیتال رستوران",
    },

    description: {
      en: "A modern multi-tenant SaaS platform that transforms traditional restaurant menus into fast, interactive digital experiences with a powerful management dashboard.",
      fa: "یک پلتفرم SaaS چندمستأجری مدرن که منوهای سنتی رستوران را به تجربه‌ای دیجیتال، سریع و تعاملی با یک داشبورد مدیریت قدرتمند تبدیل می‌کند.",
    },

    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Shadcn UI"],

    features: {
      en: [
        "Multi-tenant restaurant dashboard with role-based management",
        "Real-time menu management powered by Supabase",
        "Landing page with restaurant information, working hours, and branding",
        "Fast menu browsing with search, category filtering, and server actions",
        "Complete admin panel for managing categories, menu items, and restaurant settings",
      ],

      fa: [
        "داشبورد چندمستأجری رستوران با مدیریت مبتنی بر نقش",
        "مدیریت منو در زمان واقعی با استفاده از Supabase",
        "صفحه فرود با اطلاعات رستوران، ساعات کاری و برندینگ",
        "مرور سریع منو با جستجو، فیلتر دسته‌بندی و Server Actions",
        "پنل مدیریت کامل برای مدیریت دسته‌بندی‌ها، آیتم‌های منو و تنظیمات رستوران",
      ],
    },

    image: "/menuvita.webp",
    demoUrl: "https://menuvita.vercel.app/",
    repoUrl: "https://github.com/Hossein-Khedmati/menuvita",
    year: "2026",
  },

  {
    id: 2,
    title: "Torino",

    subtitle: {
      en: "Tour Reservation Platform",
      fa: "پلتفرم رزرو تور",
    },

    description: {
      en: "A responsive tour booking platform focused on performance, seamless user experience, and server-driven data fetching.",
      fa: "یک پلتفرم رزرو تور واکنش‌گرا با تمرکز بر عملکرد، تجربه کاربری روان و دریافت داده سمت سرور.",
    },

    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "React Query",
      "JWT Authentication",
      "Tailwind CSS",
    ],

    features: {
      en: [
        "OTP authentication with mobile number",
        "Profile management with reservation history",
        "Server-side search and filtering synchronized with URL parameters",
        "Statically generated tour pages for improved performance and SEO",
        "Pixel-perfect implementation based on the Figma design",
      ],

      fa: [
        "احراز هویت با رمز یک‌بارمصرف (OTP) از طریق شماره موبایل",
        "مدیریت پروفایل با تاریخچه رزروها",
        "جستجو و فیلتر سمت سرور همگام‌سازی‌شده با پارامترهای URL",
        "صفحات تور تولیدشده به‌صورت استاتیک برای بهبود عملکرد و SEO",
        "پیاده‌سازی دقیق براساس طراحی Figma",
      ],
    },

    image: "/torino.webp",
    demoUrl: "https://torino-lime.vercel.app",
    repoUrl: "https://github.com/Hossein-Khedmati/torino",
    year: "2025",
  },

  {
    id: 3,
    title: "Survey App",

    subtitle: {
      en: "Interactive Survey Application",
      fa: "اپلیکیشن نظرسنجی تعاملی",
    },

    description: {
      en: "A lightweight survey application demonstrating modern state management, persistent storage, and real-time score calculation.",
      fa: "یک اپلیکیشن نظرسنجی سبک که مدیریت state مدرن، ذخیره‌سازی پایدار و محاسبه امتیاز در زمان واقعی را نشان می‌دهد.",
    },

    tags: ["Next.js", "React", "TypeScript", "Zustand", "Tailwind CSS"],

    features: {
      en: [
        "Global state management using Zustand",
        "Real-time score calculation for each section and the overall survey",
        "Persistent answers with Local Storage to prevent data loss",
        "Smooth multi-step survey experience with instant feedback",
      ],

      fa: [
        "مدیریت state سراسری با استفاده از Zustand",
        "محاسبه امتیاز در زمان واقعی برای هر بخش و کل نظرسنجی",
        "ذخیره پاسخ‌ها با Local Storage برای جلوگیری از از دست رفتن داده‌ها",
        "تجربه نظرسنجی چندمرحله‌ای روان با بازخورد فوری",
      ],
    },

    image: "/surveyapp.webp",
    demoUrl: "https://survey-app-two-kappa.vercel.app/",
    repoUrl: "https://github.com/Hossein-Khedmati/survey-app",
    year: "2026",
  },
];
export const projectsData: Project[] = [
  {
    id: 1,
    title: "Menuvita",

    subtitle: {
      en: "Digital Restaurant SaaS Platform",
      fa: "پلتفرم SaaS دیجیتال رستوران",
    },

    description: {
      en: "A modern multi-tenant SaaS platform that transforms traditional restaurant menus into fast, interactive digital experiences with a powerful management dashboard.",
      fa: "یک پلتفرم SaaS چندمستأجری مدرن که منوهای سنتی رستوران را به تجربه‌ای دیجیتال، سریع و تعاملی با یک داشبورد مدیریت قدرتمند تبدیل می‌کند.",
    },

    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Shadcn UI"],

    features: {
      en: [
        "Multi-tenant restaurant dashboard with role-based management",
        "Real-time menu management powered by Supabase",
        "Landing page with restaurant information, working hours, and branding",
        "Fast menu browsing with search, category filtering, and server actions",
        "Complete admin panel for managing categories, menu items, and restaurant settings",
      ],

      fa: [
        "داشبورد چندمستأجری رستوران با مدیریت مبتنی بر نقش",
        "مدیریت منو در زمان واقعی با استفاده از Supabase",
        "صفحه فرود با اطلاعات رستوران، ساعات کاری و برندینگ",
        "مرور سریع منو با جستجو، فیلتر دسته‌بندی و Server Actions",
        "پنل مدیریت کامل برای مدیریت دسته‌بندی‌ها، آیتم‌های منو و تنظیمات رستوران",
      ],
    },

    image: "/menuvita.webp",
    demoUrl: "https://menuvita.vercel.app/",
    repoUrl: "https://github.com/Hossein-Khedmati/menuvita",
    year: "2026",
  },

  {
    id: 2,
    title: "Torino",

    subtitle: {
      en: "Tour Reservation Platform",
      fa: "پلتفرم رزرو تور",
    },

    description: {
      en: "A responsive tour booking platform focused on performance, seamless user experience, and server-driven data fetching.",
      fa: "یک پلتفرم رزرو تور واکنش‌گرا با تمرکز بر عملکرد، تجربه کاربری روان و دریافت داده سمت سرور.",
    },

    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "React Query",
      "JWT Authentication",
      "Tailwind CSS",
    ],

    features: {
      en: [
        "OTP authentication with mobile number",
        "Profile management with reservation history",
        "Server-side search and filtering synchronized with URL parameters",
        "Statically generated tour pages for improved performance and SEO",
        "Pixel-perfect implementation based on the Figma design",
      ],

      fa: [
        "احراز هویت با رمز یک‌بارمصرف (OTP) از طریق شماره موبایل",
        "مدیریت پروفایل با تاریخچه رزروها",
        "جستجو و فیلتر سمت سرور همگام‌سازی‌شده با پارامترهای URL",
        "صفحات تور تولیدشده به‌صورت استاتیک برای بهبود عملکرد و SEO",
        "پیاده‌سازی دقیق براساس طراحی Figma",
      ],
    },

    image: "/torino.webp",
    demoUrl: "https://torino-lime.vercel.app",
    repoUrl: "https://github.com/Hossein-Khedmati/torino",
    year: "2025",
  },

  {
    id: 3,
    title: "Survey App",

    subtitle: {
      en: "Interactive Survey Application",
      fa: "اپلیکیشن نظرسنجی تعاملی",
    },

    description: {
      en: "A lightweight survey application demonstrating modern state management, persistent storage, and real-time score calculation.",
      fa: "یک اپلیکیشن نظرسنجی سبک که مدیریت state مدرن، ذخیره‌سازی پایدار و محاسبه امتیاز در زمان واقعی را نشان می‌دهد.",
    },

    tags: ["Next.js", "React", "TypeScript", "Zustand", "Tailwind CSS"],

    features: {
      en: [
        "Global state management using Zustand",
        "Real-time score calculation for each section and the overall survey",
        "Persistent answers with Local Storage to prevent data loss",
        "Smooth multi-step survey experience with instant feedback",
      ],

      fa: [
        "مدیریت state سراسری با استفاده از Zustand",
        "محاسبه امتیاز در زمان واقعی برای هر بخش و کل نظرسنجی",
        "ذخیره پاسخ‌ها با Local Storage برای جلوگیری از از دست رفتن داده‌ها",
        "تجربه نظرسنجی چندمرحله‌ای روان با بازخورد فوری",
      ],
    },

    image: "/surveyapp.webp",
    demoUrl: "https://survey-app-two-kappa.vercel.app/",
    repoUrl: "https://github.com/Hossein-Khedmati/survey-app",
    year: "2026",
  },

  {
    id: 4,
    title: "GBLG General Trading",

    subtitle: {
      en: "Corporate Trading Website",
      fa: "وب‌سایت شرکتی بازرگانی",
    },

    description: {
      en: "A modern corporate website for a general trading business, designed to present the company's services and identity through a clean, responsive, and professional interface.",
      fa: "یک وب‌سایت شرکتی مدرن برای یک مجموعه بازرگانی که خدمات و هویت برند را در قالب رابطی حرفه‌ای، واکنش‌گرا و مینیمال ارائه می‌کند.",
    },

    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],

    features: {
      en: [
        "Modern corporate website with responsive layouts",
        "Reusable component-based architecture",
        "Dedicated sections for company content and services",
        "Optimized visual presentation with custom assets and imagery",
        "Production-ready deployment on Vercel",
      ],

      fa: [
        "وب‌سایت شرکتی مدرن با طراحی کاملاً واکنش‌گرا",
        "معماری مبتنی بر کامپوننت‌های قابل استفاده مجدد",
        "بخش‌های اختصاصی برای معرفی شرکت و خدمات",
        "ارائه بصری بهینه با استفاده از تصاویر و assetهای اختصاصی",
        "استقرار نسخه نهایی پروژه روی Vercel",
      ],
    },

    image: "/gblg.webp",
    demoUrl: "https://gblg-general-trading.vercel.app",
    repoUrl: "https://github.com/Hossein-Khedmati/Gblg-GeneralTrading",
    year: "2026",
  },

  {
    id: 5,
    title: "Admin Panel",

    subtitle: {
      en: "E-commerce Admin Dashboard",
      fa: "داشبورد مدیریت فروشگاه اینترنتی",
    },

    description: {
      en: "A React-based admin dashboard for managing products in an online store, featuring authentication, protected routes, CRUD operations, search, pagination, and form validation.",
      fa: "یک داشبورد مدیریتی مبتنی بر React برای مدیریت محصولات فروشگاه اینترنتی که شامل احراز هویت، صفحات محافظت‌شده، عملیات CRUD، جستجو، صفحه‌بندی و اعتبارسنجی فرم‌ها است.",
    },

    tags: [
      "Next.js",
      "React",
      "React Query",
      "React Hook Form",
      "Yup",
      "Axios",
      "JWT",
    ],

    features: {
      en: [
        "User registration and login using JWT authentication",
        "Protected dashboard with authentication checks",
        "Product management with create, edit, delete, search, and pagination",
        "Product forms with React Hook Form and Yup validation",
        "Server data fetching and mutations using React Query",
      ],

      fa: [
        "ثبت‌نام و ورود کاربران با استفاده از احراز هویت JWT",
        "داشبورد محافظت‌شده با بررسی وضعیت احراز هویت",
        "مدیریت محصولات شامل ایجاد، ویرایش، حذف، جستجو و صفحه‌بندی",
        "فرم‌های مدیریت محصول با React Hook Form و اعتبارسنجی Yup",
        "دریافت و تغییر داده‌ها با استفاده از React Query",
      ],
    },

    image: "/admin-panel.webp",
    demoUrl: "https://admin-panel-next-js-one.vercel.app",
    repoUrl: "https://github.com/Hossein-Khedmati/admin-panel-Next.js",
    year: "2024",
  },

  {
    id: 6,
    title: "Contact App",

    subtitle: {
      en: "Contact Management Application",
      fa: "اپلیکیشن مدیریت مخاطبین",
    },

    description: {
      en: "A clean React application for managing contacts with CRUD operations, real-time search, form validation, multi-selection, and persistent browser storage.",
      fa: "یک اپلیکیشن تمیز و کاربردی با React برای مدیریت مخاطبین که قابلیت‌های CRUD، جستجوی لحظه‌ای، اعتبارسنجی فرم، انتخاب چندتایی و ذخیره‌سازی پایدار در مرورگر را ارائه می‌دهد.",
    },

    tags: [
      "React",
      "Context API",
      "useReducer",
      "React Hook Form",
      "Yup",
      "LocalStorage",
      "CSS Modules",
    ],

    features: {
      en: [
        "Create, edit, and delete contacts",
        "Global state management using Context API and useReducer",
        "Real-time contact search",
        "Form validation with React Hook Form and Yup",
        "Persistent contact data using browser LocalStorage",
        "Multiple contact selection with confirmation before deletion",
      ],

      fa: [
        "ایجاد، ویرایش و حذف مخاطبین",
        "مدیریت state با استفاده از Context API و useReducer",
        "جستجوی لحظه‌ای در میان مخاطبین",
        "اعتبارسنجی فرم با React Hook Form و Yup",
        "ذخیره‌سازی پایدار اطلاعات مخاطبین با LocalStorage",
        "انتخاب چند مخاطب و نمایش تأییدیه پیش از حذف",
      ],
    },

    image: "/contact-app.webp",
    demoUrl: "https://contact-r5fqcc38l-hosseins-projects-a2052e3e.vercel.app",
    repoUrl: "https://github.com/Hossein-Khedmati/Contact_App",
    year: "2024",
  },

  {
    id: 7,
    title: "Crypto App",

    subtitle: {
      en: "Cryptocurrency Dashboard",
      fa: "داشبورد ارزهای دیجیتال",
    },

    description: {
      en: "A React and Vite cryptocurrency application focused on building a fast frontend interface for working with crypto-related data.",
      fa: "یک اپلیکیشن ارز دیجیتال مبتنی بر React و Vite که با تمرکز بر ساخت یک رابط کاربری سریع برای نمایش و کار با داده‌های مرتبط با رمزارزها توسعه داده شده است.",
    },

    tags: ["React", "Vite", "JavaScript", "CSS"],

    features: {
      en: [
        "Responsive cryptocurrency-focused interface",
        "Fast development environment powered by Vite",
        "Component-based React architecture",
        "Frontend interface for displaying crypto-related information",
      ],

      fa: [
        "رابط کاربری واکنش‌گرا با تمرکز بر ارزهای دیجیتال",
        "محیط توسعه سریع با استفاده از Vite",
        "معماری کامپوننت‌محور React",
        "رابط کاربری برای نمایش اطلاعات مرتبط با رمزارزها",
      ],
    },

    image: "/crypto-app.webp",
    demoUrl: "https://crypto-app-rose.vercel.app",
    repoUrl: "https://github.com/Hossein-Khedmati/crypto-app",
    year: "2024",
  },

  {
    id: 8,
    title: "Food App",

    subtitle: {
      en: "Next.js Food Application",
      fa: "اپلیکیشن غذای Next.js",
    },

    description: {
      en: "A Next.js food application built to explore and demonstrate different rendering strategies including Server-Side Rendering, Static Site Generation, and Incremental Static Regeneration.",
      fa: "یک اپلیکیشن غذایی با Next.js که با هدف بررسی و نمایش روش‌های مختلف رندرینگ شامل SSR، SSG و ISR توسعه داده شده است.",
    },

    tags: ["Next.js", "React", "JavaScript", "SSR", "SSG", "ISR"],

    features: {
      en: [
        "Server-Side Rendering for dynamic content",
        "Static Site Generation for pre-rendered pages",
        "Incremental Static Regeneration for updating static content",
        "Next.js Pages Router architecture",
        "API routes for application data",
      ],

      fa: [
        "استفاده از Server-Side Rendering برای محتوای پویا",
        "استفاده از Static Site Generation برای صفحات از پیش رندرشده",
        "استفاده از Incremental Static Regeneration برای به‌روزرسانی محتوای استاتیک",
        "معماری Next.js Pages Router",
        "استفاده از API Routes برای داده‌های اپلیکیشن",
      ],
    },

    image: "/food-app.webp",
    demoUrl: "https://food-app-six-gamma-72.vercel.app",
    repoUrl: "https://github.com/Hossein-Khedmati/food-app",
    year: "2024",
  },
];
