import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/data/mock";
import { Check, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/20">
              <Zap className="h-3 w-3 mr-1" />Simple Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your <span className="text-primary">YekBûn</span> Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include access to the YekBûn community.
            </p>
            {/* Toggle */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={cn("text-sm font-medium", !yearly ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
              <button
                onClick={() => setYearly(!yearly)}
                className={cn(
                  "relative inline-flex h-7 w-12 rounded-full transition-colors duration-300",
                  yearly ? "bg-primary" : "bg-secondary"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300",
                  yearly ? "translate-x-5" : "translate-x-0"
                )} />
              </button>
              <span className={cn("text-sm font-medium", yearly ? "text-foreground" : "text-muted-foreground")}>
                Yearly <Badge className="ml-1 bg-green-500/15 text-green-500 border-green-500/20 text-xs">Save 17%</Badge>
              </span>
            </div>
          </motion.div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  "relative rounded-3xl p-8 border flex flex-col",
                  plan.recommended
                    ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/30 scale-105"
                    : "bg-card border-border/50"
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-white text-primary shadow-lg px-4 py-1">
                      <Star className="h-3 w-3 mr-1 fill-primary" />Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={cn("text-xl font-bold mb-1", plan.recommended ? "text-primary-foreground" : "text-foreground")}>
                    {plan.name}
                  </h3>
                  <div className="flex items-end gap-1 mt-3">
                    <span className={cn("text-4xl font-bold", plan.recommended ? "text-primary-foreground" : "text-foreground")}>
                      {plan.priceMonthly === 0 ? "Free" : `$${yearly ? (plan.priceYearly / 12).toFixed(2) : plan.priceMonthly}`}
                    </span>
                    {plan.priceMonthly > 0 && (
                      <span className={cn("text-sm mb-1", plan.recommended ? "text-primary-foreground/70" : "text-muted-foreground")}>/month</span>
                    )}
                  </div>
                  {plan.priceMonthly > 0 && yearly && (
                    <p className={cn("text-xs mt-1", plan.recommended ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      Billed ${plan.priceYearly}/year
                    </p>
                  )}
                  {plan.zerPrice > 0 && (
                    <p className={cn("text-xs mt-2 font-medium", plan.recommended ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      or {plan.zerPrice.toLocaleString()} Zer/month
                    </p>
                  )}
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className={cn("h-4 w-4 mt-0.5 shrink-0", plan.recommended ? "text-primary-foreground" : "text-primary")} />
                      <span className={cn("text-sm", plan.recommended ? "text-primary-foreground/90" : "text-muted-foreground")}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "mt-8 w-full rounded-xl font-semibold",
                    plan.recommended
                      ? "bg-white text-primary hover:bg-white/90"
                      : plan.priceMonthly === 0
                        ? "bg-secondary text-foreground hover:bg-secondary/80"
                        : "bg-primary text-primary-foreground"
                  )}
                >
                  {plan.priceMonthly === 0 ? "Get Started Free" : `Get ${plan.name}`}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-center text-sm text-muted-foreground mt-10">
            All plans include a 14-day free trial. No credit card required for the free plan.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
