export interface Job {
  id: number;

  company: {
    en: string;
    fa: string;
  };

  jobTitle: {
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

  achievements: {
    en: string[];
    fa: string[];
  };
}

export const timeLineJobsData: Job[] = [
  {
    id: 1,

    company: {
      en: "Etmita UG",
      fa: "اتمیتا Etmita UG",
    },

    jobTitle: {
      en: "Frontend Developer",
      fa: "توسعه‌دهنده فرانت‌اند",
    },

    startDate: {
      en: "Dec 2025",
      fa: "آذر ۱۴۰۴",
    },

    endDate: {
      en: "",
      fa: "",
    },

    achievements: {
      en: [
        "Advanced TypeScript proficiency through production-scale applications",
        "Established modern component development and testing practices",
        "Strengthened experience with scalable frontend architecture",
        "Thrived in a collaborative engineering environment with structured workflows",
      ],

      fa: [
        "کسب تسلط پیشرفته بر TypeScript در پروژه‌های واقعی و مقیاس‌پذیر",
        "استقرار رویکردهای مدرن برای توسعه و تست کامپوننت‌ها",
        "تقویت تجربه در طراحی معماری‌های مقیاس‌پذیر فرانت‌اند",
        "همکاری مؤثر در یک تیم مهندسی با فرآیندهای توسعه ساختاریافته",
      ],
    },
  },

  {
    id: 2,

    company: {
      en: "Cyrays Co.",
      fa: "شرکت سای‌ریز Cyrays",
    },

    jobTitle: {
      en: "Frontend Developer Intern",
      fa: "کارآموز توسعه‌دهنده فرانت‌اند",
    },

    startDate: {
      en: "Jul 2025",
      fa: "تیر ۱۴۰۴",
    },

    endDate: {
      en: "Sep 2025",
      fa: "شهریور ۱۴۰۴",
    },

    achievements: {
      en: [
        "Built a strong foundation in TypeScript and scalable React development",
        "Adopted feature-driven architecture and maintainable code organization",
        "Expanded frontend expertise with Shadcn UI and modern development tools",
        "Developed professional collaboration and agile software development practices",
      ],

      fa: [
        "ایجاد پایه‌ای مستحکم در توسعه React و TypeScript برای پروژه‌های مقیاس‌پذیر",
        "آشنایی و پیاده‌سازی معماری Feature-Driven و ساختاردهی قابل نگهداری پروژه‌ها",
        "گسترش مهارت در استفاده از Shadcn UI و ابزارهای مدرن توسعه فرانت‌اند",
        "کسب تجربه همکاری تیمی و فرآیندهای توسعه چابک (Agile)",
      ],
    },
  },
];
