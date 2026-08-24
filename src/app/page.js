import HeroSection from "@/components/sections/HeroSection";
import FeatureStrip from "@/components/sections/FeatureStrip";
import HotRightNow from "@/components/sections/HotRightNow";
import CategoryStrip from "@/components/sections/CategoryStrip";
import WhyPulseTix from "@/components/sections/WhyPulseTix";
import CompetitionsBanner from "@/components/sections/CompetitionsBanner";
import HowItWorks from "@/components/sections/HowItWorks";
import AppDownload from "@/components/sections/AppDownlaod";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <HotRightNow />
      <CategoryStrip />
      <WhyPulseTix />
      <CompetitionsBanner />
      <HowItWorks />
      <AppDownload />
    </>
  );
}