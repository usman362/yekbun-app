import { Play, Eye } from "lucide-react";
import { useLandingVideos } from "@/hooks/use-landing";

const VideoSection = () => {
  // Same shape as `dummyVideos` — JSX below is unchanged.
  const dummyVideos = useLandingVideos();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Videos & <span className="gradient-gold-text">Reels</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
          Watch trending Kurdish content
        </p>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {dummyVideos.map((v) => (
            <div
              key={v.id}
              className="min-w-[180px] max-w-[180px] snap-center group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[9/16]">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Play size={20} className="text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-medium line-clamp-2">{v.title}</p>
                  <div className="flex items-center gap-1 mt-1 text-white/70">
                    <Eye size={12} />
                    <span className="text-[10px]">{v.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
