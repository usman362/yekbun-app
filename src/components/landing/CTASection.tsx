import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Join the <span className="gradient-gold-text">YekBun</span> Community Today
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
          Be part of the largest Kurdish social platform. Share your culture, connect with others, and discover amazing content.
        </p>
        <Button
          size="lg"
          className="gradient-gold text-primary-foreground font-semibold rounded-full px-10 text-base hover:opacity-90 transition-opacity"
        >
          Create Account <ArrowRight className="ml-2" size={18} />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
