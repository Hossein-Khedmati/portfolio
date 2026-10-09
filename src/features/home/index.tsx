'use client';

import { useEffect, useState } from "react";
import {
  HeroSection,
  ContactBox,
  AboutSection,
  JourneySection,
  FeaturedProjects,
} from "./components";

export const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Mark as loaded after initial render
    setIsLoaded(true);
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="will-change-scroll">
      <HeroSection />
      <AboutSection />
      {isLoaded && <JourneySection />}
      <FeaturedProjects />
      <ContactBox />
    </div>
  );
};
