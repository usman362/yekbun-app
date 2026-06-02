import { useState } from "react";
import { dummyPolls } from "@/data/dummyPolls"; // kept as the row type for PollCard
import { useLandingPollsSimple } from "@/hooks/use-landing";
import { BarChart3 } from "lucide-react";

const PollCard = ({ poll }: { poll: typeof dummyPolls[0] }) => {
  const [voted, setVoted] = useState<number | null>(null);
  const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);

  return (
    <div className="min-w-[300px] max-w-[340px] rounded-2xl bg-card border border-border p-5 snap-center">
      <div className="flex items-start gap-2 mb-4">
        <BarChart3 size={18} className="text-primary mt-0.5 shrink-0" />
        <h3 className="font-semibold text-sm">{poll.question}</h3>
      </div>
      <div className="space-y-2.5">
        {poll.options.map((opt, i) => {
          const pct = Math.round((opt.votes / totalVotes) * 100);
          const isSelected = voted === i;
          return (
            <button
              key={i}
              onClick={() => setVoted(i)}
              className={`w-full relative rounded-xl overflow-hidden text-left transition-all duration-300 ${
                voted !== null ? "" : "hover:bg-secondary"
              }`}
            >
              <div
                className="absolute inset-0 gradient-gold opacity-20 transition-all duration-500"
                style={{ width: voted !== null ? `${pct}%` : "0%" }}
              />
              <div className="relative flex items-center justify-between px-3 py-2.5 text-sm">
                <span className={`font-medium ${isSelected ? "text-primary" : ""}`}>
                  {opt.label}
                </span>
                {voted !== null && (
                  <span className="text-xs text-muted-foreground font-medium">{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {voted !== null && (
        <p className="text-[10px] text-muted-foreground mt-3">{totalVotes} votes</p>
      )}
    </div>
  );
};

const PollSection = () => {
  // Same shape as the original `dummyPolls` — JSX is unchanged.
  const dummyPolls = useLandingPollsSimple();
  return (
    <section id="community" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Community <span className="gradient-gold-text">Voice</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
          Vote and share your opinion
        </p>
      </div>
      <div className="flex gap-5 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {dummyPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </div>
    </section>
  );
};

export default PollSection;
