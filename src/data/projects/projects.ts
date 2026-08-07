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
      fa: "یک پلتفرم SaaS چندمستأجری مدرن که منوهای سنتی رستوران را به تجربه‌های دیجیتال سریع و تعاملی با داشبورد مدیریت قدرتمند تبدیل می‌کند.",
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
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/user/repo",
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
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/user/repo",
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
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/user/repo",
    year: "2026",
  },
];