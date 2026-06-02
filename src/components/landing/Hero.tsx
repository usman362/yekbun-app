import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-pulse-glow [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight animate-fade-in-up">
          Connect. Share.{" "}
          <span className="gradient-gold-text">Discover Kurdish Culture.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms] opacity-0">
          Music, Videos, Stories, Polls and Community — all in one place.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:400ms] opacity-0">
          <Button
            size="lg"
            className="gradient-gold text-primary-foreground font-semibold rounded-full px-8 text-base hover:opacity-90 transition-opacity"
          >
            Start Now <ArrowRight className="ml-2" size={18} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 text-base border-primary/30 hover:bg-primary/10 hover:text-foreground"
          >
            <Compass className="mr-2" size={18} /> Explore Content
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 mx-auto flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
