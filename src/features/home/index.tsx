import {
  HeroSection,
  ContactBox,
  AboutSection,
  JourneySection,
  FeaturedProjects,
} from "./components";

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