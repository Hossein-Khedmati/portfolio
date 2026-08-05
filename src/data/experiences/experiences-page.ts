export interface Experience {
  id: number;

  company: {
    en: string;
    fa: string;
  };

  role: {
    en: string;
    fa: string;
  };

  employmentType: {
    en: string;
    fa: string;
  };

  location: {
    en: string;
    fa: string;
  };

  startDate: {
    en: string;
    fa: string;
  };

  endDate: {
    en: string;
    fa: string;
  };

  summary: {
    en: string;
    fa: string;
  };

  responsibilities: {
    en: string[];
    fa: string[];
  };

  achievements: {
    en: string[];
    fa: string[];
  };

  learned: {
    en: string[];
    fa: string[];
  };

  technologies: string[];

  current?: boolean;
}

export const experiencesData: Experience[] = [
  {
    id: 1,

    company: {
      en: "Etmita UG",
      fa: "اتمیتا (Etmita UG)",
    },

    role: {
      en: "Frontend Developer",
      fa: "توسعه‌دهنده فرانت‌اند",
    },

    employmentType: {
      en: "Full-time",
      fa: "تمام‌وقت",
    },

    location: {
      en: "Remote · Germany",
      fa: "ریموت · آلمان",
    },

    startDate: {
      en: "Dec 2025",
      fa: "آذر ۱۴۰۴",
    },

    endDate: {
      en: "Present",
      fa: "تاکنون",
    },

    current: true,

    summary: {
      en: "Engineering high-performance frontend architectures for mission-critical healthcare logistics and scheduling software. Focused on real-time data streaming, dynamic map visualization, component design systems, and automated test suites.",
      fa: "طراحی و توسعه معماری فرانت‌اند محصولات پیشرفته حوزه زمان‌بندی و لگاریتم لجستیک درمان. تمرکز بر پردازش داده‌های Real-time، نقشه‌های تعاملی، سیستم‌های دیزاین ماژولار و تست‌های خودکار.",
    },

    responsibilities: {
      en: [
        "Architect and deliver production features for large-scale healthcare scheduling using Next.js App Router and TypeScript.",
        "Engineer real-time fleet monitoring interfaces featuring interactive mapping, geospatial markers, and live socket data updates.",
        "Build fully accessible, type-safe profile management modules and complex dynamic forms.",
        "Establish design system standards and component documentation via Storybook to ensure UI consistency.",
        "Maintain high codebase quality through rigorous peer code reviews and CI-integrated unit testing setups.",
      ],
      fa: [
        "معماری و توسعه پیوسته‌ فیچرهای Production برای سامانه جامع درمان با Next.js و TypeScript.",
        "پیاده‌سازی داشبورد مانیتورینگ زنده رانندگان و ناوگان با پردازش داده‌های Socket و نقشه‌های تعاملی.",
        "طراحی و پیاده‌سازی بخش مدیریت پروفایل و فرم‌های پیچیده با رعایت کامل دسترسی‌پذیری (Accessibility).",
        "توسعه و مستندسازی سیستم دیزاین اختصاصی تیم با استفاده از Storybook.",
        "ارتقای کیفیت کُد پایه از طریق بازبینی تخصصی کدها (Code Review) و پوشش تست‌های واحد.",
      ],
    },

    achievements: {
      en: [
        "Streamlined real-time vehicle tracking rendering, preventing unnecessary re-renders during high-frequency map updates.",
        "Elevated code reliability across primary modules by introducing strict TypeScript practices and Jest test suites.",
        "Accelerated UI development cycles across the engineering team by publishing structured Storybook components.",
      ],
      fa: [
        "بهینه‌سازی کارایی رندرینگ نقشه مانیتورینگ زنده در هنگام دریافت حجم بالای داده‌های لحظه‌ای.",
        "افزایش پایداری بخش‌های کلیدی پروژه از طریق استقرار قواعد سخت‌گیرانه TypeScript و تست‌های Jest.",
        "تسریع روند توسعه UI در تیم از طریق ایزوله‌سازی و پیاده‌سازی کامپوننت‌های Storybook.",
      ],
    },

    learned: {
      en: [
        "Enterprise Next.js Architecture",
        "Geospatial & Map Visualization (Leaflet)",
        "Real-time Data Integration (Socket.IO)",
        "Component-Driven Development (Storybook)",
        "Automated Testing (Jest & RTL)",
        "Advanced TypeScript Design Patterns",
      ],
      fa: [
        "معماری کلان‌پروژه‌های Next.js",
        "پیاده‌سازی و بهینه‌سازی نقشه (Leaflet)",
        "مدیریت جریان داده‌های زنده (Socket.IO)",
        "توسعه کامپوننت‌محور با Storybook",
        "تست‌نویسی پیشرفته با Jest و RTL",
        "الگوهای پیشرفته TypeScript",
      ],
    },

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Mantine UI",
      "Leaflet",
      "Socket.IO",
      "Storybook",
      "Jest",
      "React Testing Library",
    ],
  },

  {
    id: 2,

    company: {
      en: "Cyrays Co.",
      fa: "شرکت Cyrays",
    },

    role: {
      en: "Frontend Developer",
      fa: "توسعه‌دهنده فرانت‌اند",
    },

    employmentType: {
      en: "Contract / Remote",
      fa: "قراردادی / ریموت",
    },

    location: {
      en: "Remote · Iran",
      fa: "ریموت · ایران",
    },

    startDate: {
      en: "Jul 2025",
      fa: "تیر ۱۴۰۴",
    },

    endDate: {
      en: "Sep 2025",
      fa: "شهریور ۱۴۰۴",
    },

    summary: {
      en: "Contributed to core product features for enterprise web applications, concentrating on internationalization (i18n), reusable UI component primitives, and feature-driven project layouts.",
      fa: "مشارکت در توسعه فیچرهای کلیدی سامانه‌های تحت وب سازمان، با تمرکز بر بین‌المللی‌سازی (i18n)، کامپوننت‌های پایه قابل استفاده مجدد و معماری مبتنی بر ویژگی.",
    },

    responsibilities: {
      en: [
        "Engineered modular frontend components for a high-traffic multi-property real estate platform.",
        "Integrated multi-language support (i18n) utilizing `next-intl` with right-to-left (RTL) layout compatibility.",
        "Developed scalable dashboard utilities, data display widgets, and accessible interactive interfaces.",
        "Participated in agile ceremonies, feature refinement sessions, and cross-functional technical planning.",
      ],
      fa: [
        "توسعه کامپوننت‌های ماژولار و قابل مقیاس برای پلتفرم املاک و مستغلات.",
        "پیاده‌سازی پشتیبانی از چندزبانی (i18n) با next-intl و سازگاری کامل با چیدمان‌های راست‌چین (RTL).",
        "طراحی و پیاده‌سازی ابزارهای داشبورد، ویجت‌های نمایش داده و واکشی بهینه داده‌ها.",
        "حضور فعال در جلسات چابک (Agile)، برنامه‌ریزی فیچرها و هماهنگی با تیم‌های فنی.",
      ],
    },

    achievements: {
      en: [
        "Successfully delivered localized UI structures covering both English and Persian seamlessly.",
        "Standardized core component interfaces across feature modules to maintain strict UI uniformity.",
      ],
      fa: [
        "پیاده‌سازی موفق ساختار چندزبانه بدون شکستگی ظاهر در زبانه فارسی و انگلیسی.",
        "استانداردسازی رابط کامپوننت‌های اصلی پروژه جهت حفظ یکپارچگی دیزاین سیستم.",
      ],
    },

    learned: {
      en: [
        "Feature-Driven Architecture",
        "Internationalization (next-intl)",
        "Design System Implementation",
        "Atomic Design Principles",
        "Agile Software Development",
      ],
      fa: [
        "معماری Feature-Driven",
        "بین‌المللی‌سازی با next-intl",
        "پیاده‌سازی دیزاین سیستم",
        "اصول طراحی Atomic",
        "فرآیندهای توسعه Agile",
      ],
    },

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "next-intl",
      "Git",
      "Figma",
    ],
  },
];
