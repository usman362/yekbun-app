import { Play, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { useLandingMusicCarousel } from "@/hooks/use-landing";
import { Progress } from "@/components/ui/progress";

const MusicSection = () => {
  // Same shape as `dummyMusic` — JSX below is unchanged.
  const dummyMusic = useLandingMusicCarousel();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Discover <span className="gradient-gold-text">Kurdish Music</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
          Stream your favorite artists
        </p>

        {/* Artist cards */}
        <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {dummyMusic.map((m) => (
            <div
              key={m.id}
              className="min-w-[200px] max-w-[200px] group snap-center"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={m.image}
                  alt={m.artist}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
                    <Play size={20} className="text-primary-foreground ml-0.5" />
                  </div>
                </div>
              </div>
              <h3 className="mt-3 font-semibold text-sm truncate">{m.artist}</h3>
              <p className="text-xs text-muted-foreground">{m.genre}</p>
            </div>
          ))}
        </div>

        {/* Mini player UI */}
        <div className="mt-8 max-w-lg mx-auto glass rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <img
              src={dummyMusic[0].image}
              alt="Now playing"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{dummyMusic[0].artist}</p>
              <p className="text-xs text-muted-foreground">{dummyMusic[0].genre}</p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <SkipBack size={16} className="cursor-pointer hover:text-foreground transition-colors" />
              <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center cursor-pointer">
                <Play size={16} className="text-primary-foreground ml-0.5" />
              </div>
              <SkipForward size={16} className="cursor-pointer hover:text-foreground transition-colors" />
              <Volume2 size={16} className="ml-2 cursor-pointer hover:text-foreground transition-colors" />
            </div>
          </div>
          <Progress value={35} className="mt-3 h-1" />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
