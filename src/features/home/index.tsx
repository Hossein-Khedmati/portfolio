import { HeroSection } from "./components/hero";
import { ContactBox } from "./components/contact-box";
import { AboutSection } from "./components/about";
import { JourneySection } from "./components/journey";
import { FeaturedProjects } from "./components/featured-projects";

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <FeaturedProjects />
      <ContactBox />
    </div>
  );
};
