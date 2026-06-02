import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import FeedPreview from "@/components/landing/FeedPreview";
import MusicSection from "@/components/landing/MusicSection";
import VideoSection from "@/components/landing/VideoSection";
import PollSection from "@/components/landing/PollSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import AppSection from "@/components/landing/AppSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <FeedPreview />
      <MusicSection />
      <VideoSection />
      <PollSection />
      <FeaturesGrid />
      <AppSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
