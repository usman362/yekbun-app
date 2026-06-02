import { Rss, Music, Radio, ShoppingBag, BookOpen, Sparkles } from "lucide-react";

const features = [
  { icon: Rss, title: "Posts & Stories", desc: "Share moments with your community through rich media posts and ephemeral stories." },
  { icon: Music, title: "Music & Playlists", desc: "Stream and discover Kurdish music. Create playlists and follow artists." },
  { icon: Radio, title: "Live Streams", desc: "Go live and connect with your audience in real-time with interactive streams." },
  { icon: ShoppingBag, title: "Marketplace", desc: "Buy and sell services, crafts, and cultural products from the community." },
  { icon: BookOpen, title: "Cultural Content", desc: "Explore Kurdish history, language lessons, and heritage content." },
  { icon: Sparkles, title: "AI Content", desc: "AI-powered history videos, language tools, and personalized recommendations." },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Everything in <span className="gradient-gold-text">One Place</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
          All the tools you need to connect and create
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-2xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-11 h-11 rounded-xl gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
