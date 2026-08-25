import HeroSection from "@/components/sections/HeroSection";
import FeatureStrip from "@/components/sections/FeatureStrip";
import HotRightNow from "@/components/sections/HotRightNow";
import CategoryStrip from "@/components/sections/CategoryStrip";
import WhyPulseTix from "@/components/sections/WhyPulseTix";
// import CompetitionsBanner from "@/components/sections/CompetitionsBanner";
import HowItWorks from "@/components/sections/HowItWorks";
import LovedBy from "@/components/sections/LovedBy";
import AppDownload from "@/components/sections/AppDownlaod";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <FeatureStrip /> */}
      <WhyPulseTix />
      <HotRightNow />
      <CategoryStrip />
      {/* <CompetitionsBanner /> */}
      <HowItWorks />
      <LovedBy />
      <AppDownload />
    </>
  );
}
