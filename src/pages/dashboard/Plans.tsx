import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/data/mock";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CheckCircle2, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function DashboardPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  // Same shape as the old `userProfile` mock — JSX is untouched.
  const userProfile = useCurrentUser();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Plans & Upgrades</h1>
            <p className="text-muted-foreground mt-1">You are currently on the <strong className="text-foreground">{userProfile.plan}</strong> plan.</p>
          </div>
          <div className="bg-secondary p-1 rounded-lg flex items-center shadow-inner">
            <button 
              onClick={() => setBillingCycle("monthly")}
              className={cn("px-4 py-2 text-sm font-semibold rounded-md transition-all", billingCycle === "monthly" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle("yearly")}
              className={cn("px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-2", billingCycle === "yearly" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              Yearly <Badge variant="default" className="text-[10px] h-4 px-1 shadow-none">Save 20%</Badge>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 pt-4">
          {plans.map((plan) => {
            const isCurrent = userProfile.plan === plan.name;
            const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
            
            return (
              <Card key={plan.id} className={cn(
                "relative flex flex-col transition-all duration-300",
                plan.recommended ? "border-primary shadow-xl shadow-primary/10 lg:-translate-y-2 scale-[1.02]" : "border-border/50",
                isCurrent ? "bg-secondary/30" : "bg-card"
              )}>
                {plan.recommended && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                    Recommended
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-muted-foreground text-background text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                    Current Plan
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl font-display">{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.id === 'cultivated' ? 'Perfect for getting started.' : plan.id === 'educated' ? 'Everything you need.' : 'The ultimate premium experience.'}
                  </CardDescription>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  {plan.id !== 'cultivated' && (
                    <div className="mt-1 text-sm font-medium text-primary">
                      Or pay {plan.zerPrice} Zer / yr
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm text-muted-foreground leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full h-12 text-base rounded-xl"
                    variant={isCurrent ? "outline" : plan.recommended ? "default" : "secondary"}
                    disabled={isCurrent}
                  >
                    {isCurrent ? "Active Plan" : "Upgrade via Card"}
                  </Button>
                  {!isCurrent && plan.id !== 'cultivated' && (
                    <Button variant="ghost" className="w-full mt-2 text-primary hover:text-primary hover:bg-primary/10">
                      <Zap className="mr-2 h-4 w-4" /> Pay with Zer
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

      </div>
    </DashboardLayout>
  );
}
