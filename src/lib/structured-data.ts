// JSON-LD Structured Data for SEO
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hossein Khedmati',
  url: 'https://hosseinkhedmati.ir',
  jobTitle: 'Frontend Developer',
  description: 'Professional Frontend Developer specializing in React, Next.js, and TypeScript',
  knowsAbout: [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Frontend Development',
    'UI/UX Design',
    'Tailwind CSS',
    'State Management',
    'Testing',
  ],
  sameAs: [
    'https://github.com/hosseinkhedmati',
    'https://linkedin.com/in/hosseinkhedmati',
    'https://t.me/hosseinkhedmati',
  ],
  email: 'mailto:hosseinkhedmati.dev@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IR',
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hossein Khedmati',
  url: 'https://hosseinkhedmati.ir',
  logo: 'https://hosseinkhedmati.ir/logo-android.png',
  description: 'Professional Frontend Developer Portfolio',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hosseinkhedmati.dev@gmail.com',
    contactType: 'Professional Inquiries',
    availableLanguage: ['English', 'Persian'],
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Hossein Khedmati - Frontend Developer Portfolio',
  url: 'https://hosseinkhedmati.ir',
  description: 'Professional portfolio showcasing React, Next.js, and TypeScript projects',
  inLanguage: ['en', 'fa'],
  author: {
    '@type': 'Person',
    name: 'Hossein Khedmati',
  },
};

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Hossein Khedmati - Frontend Development Services',
  description: 'Professional frontend development services specializing in React, Next.js, and TypeScript',
  provider: {
    '@type': 'Person',
    name: 'Hossein Khedmati',
  },
  areaServed: 'Worldwide',
  serviceType: 'Web Development',
  url: 'https://hosseinkhedmati.ir',
};

export const breadcrumbSchema = (locale: string, items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export function generateStructuredData(type: 'person' | 'organization' | 'website' | 'service') {
  const schemas = {
    person: personSchema,
    organization: organizationSchema,
    website: websiteSchema,
    service: professionalServiceSchema,
  };

  return schemas[type];
}
