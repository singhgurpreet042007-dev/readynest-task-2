import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { WhyUs } from '../components/landing/WhyUs';
import { CoreFeatures } from '../components/landing/CoreFeatures';
import { FeatureShowcase } from '../components/landing/FeatureShowcase';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CampusExperience } from '../components/landing/CampusExperience';
import { TechSecurity } from '../components/landing/TechSecurity';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/landing/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyUs />
        <CoreFeatures />
        <FeatureShowcase />
        <HowItWorks />
        <CampusExperience />
        <TechSecurity />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
