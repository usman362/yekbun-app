import { Heart, MessageCircle } from "lucide-react";
import { useLandingFeedSimple } from "@/hooks/use-landing";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const FeedPreview = () => {
  // Same shape as the old `dummyPosts` — JSX is unchanged.
  const dummyPosts = useLandingFeedSimple();
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Social <span className="gradient-gold-text">Feed</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
          See what the community is sharing
        </p>
      </div>

      <div className="flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {dummyPosts.map((post, i) => (
          <div
            key={post.id}
            className="min-w-[280px] max-w-[280px] rounded-2xl bg-card border border-border overflow-hidden snap-center hover:scale-[1.03] transition-transform duration-300"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-3 p-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="gradient-gold text-primary-foreground text-xs font-bold">
                  {post.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium truncate">{post.username}</span>
            </div>
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-52 object-cover"
              loading="lazy"
            />
            <div className="p-3 space-y-2">
              <p className="text-xs text-muted-foreground line-clamp-2">{post.caption}</p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1 text-xs hover:text-primary cursor-pointer transition-colors">
                  <Heart size={14} /> {post.likes}
                </span>
                <span className="flex items-center gap-1 text-xs hover:text-primary cursor-pointer transition-colors">
                  <MessageCircle size={14} /> {post.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedPreview;
