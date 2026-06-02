import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { streamingUpgrades } from "@/data/mock";
import { Radio, Zap, Clock, Tv } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function DashboardStreaming() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Video & Streaming</h1>
          <p className="text-muted-foreground mt-1">Manage your high-quality video streaming limits.</p>
        </div>

        {/* Current Usage */}
        <Card className="bg-secondary/30 border-border/50">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 w-full">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Current Cycle Usage</h3>
              <p className="text-sm text-muted-foreground mb-4">You have used 45 minutes of your 60-minute free allocation.</p>
              <Progress value={75} className="h-3 bg-secondary" />
              <div className="flex justify-between text-xs font-medium text-muted-foreground mt-2">
                <span>0 min</span>
                <span>45 min used</span>
                <span>60 min limit</span>
              </div>
            </div>
            <div className="shrink-0 text-center md:text-right border-t md:border-t-0 md:border-l border-border/50 pt-6 md:pt-0 md:pl-8 w-full md:w-auto">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Status</p>
              <p className="text-2xl font-bold text-amber-500 mb-4">Nearing Limit</p>
              <Button>Buy More Time</Button>
            </div>
          </CardContent>
        </Card>

        {/* Upgrades Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Purchase Streaming Packages</h2>
            <p className="text-sm text-muted-foreground mt-1">Unlock high-definition, ad-free video channels using Zer.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {streamingUpgrades.map((pkg) => (
              <Card key={pkg.id} className={`border-border/50 relative overflow-hidden ${pkg.popular ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
                {pkg.popular && <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>}
                <CardHeader>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>Ad-free high quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      <Tv className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-foreground block leading-none mb-1">{pkg.minutes}</span>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{typeof pkg.minutes === 'number' ? 'Minutes' : 'Access'}</span>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-3 rounded-lg flex justify-between items-center mb-6 border border-border/50">
                    <span className="text-sm font-medium text-muted-foreground">Price</span>
                    <span className="font-bold text-primary">{pkg.zerCost} Zer</span>
                  </div>

                  <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>Purchase</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
