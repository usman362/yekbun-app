import { Button } from "@/components/ui/button";
import { Download, Smartphone } from "lucide-react";

const AppSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
          {/* Phone mockup */}
          <div className="relative flex-shrink-0">
            <div className="w-[260px] h-[520px] rounded-[3rem] border-4 border-border bg-card shadow-2xl shadow-primary/10 overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-background rounded-b-2xl" />
              <div className="p-4 pt-10 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center mb-4">
                  <Smartphone size={28} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold gradient-gold-text">YekBun</h3>
                <p className="text-xs text-muted-foreground mt-2">Your Kurdish social platform</p>
                <div className="mt-6 space-y-2 w-full">
                  {["Feed", "Music", "Videos", "Community"].map((item) => (
                    <div key={item} className="w-full h-8 rounded-lg bg-secondary flex items-center px-3">
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/10 blur-[80px]" />
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Available <span className="gradient-gold-text">Everywhere</span>
            </h2>
            <p className="text-muted-foreground mb-2 max-w-md">
              Mobile, web, and more. Take YekBun with you wherever you go.
            </p>
            <p className="text-muted-foreground mb-8 max-w-md text-sm">
              Download the app to stay connected with your community on the go.
            </p>
            <Button
              size="lg"
              className="gradient-gold text-primary-foreground font-semibold rounded-full px-8 hover:opacity-90 transition-opacity"
            >
              <Download className="mr-2" size={18} /> Download App
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
