import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { usePartnerShops } from "@/hooks/use-landing";
import { MapPin, Search, Star, Store, Map } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardShops() {
  // Same shape as the old `partnerShops` mock — JSX below is untouched. Falls back to the
  // mock if the backend has no shops yet, so the page never looks empty.
  const partnerShops = usePartnerShops();
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Partner Shops</h1>
            <p className="text-muted-foreground mt-1">Discover premium locations and earn ZerCash.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search shops..." className="pl-9 bg-card border-border/50 rounded-full" />
            </div>
            <Button variant="outline" size="icon" className="rounded-full shrink-0"><Map className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Categories / Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Button variant="default" className="rounded-full shrink-0">All Shops</Button>
          <Button variant="outline" className="rounded-full bg-card shrink-0">Fashion</Button>
          <Button variant="outline" className="rounded-full bg-card shrink-0">Cafe & Dining</Button>
          <Button variant="outline" className="rounded-full bg-card shrink-0">Tech</Button>
          <Button variant="outline" className="rounded-full bg-card shrink-0">Art & Culture</Button>
          <Button variant="outline" className="rounded-full bg-card shrink-0">Health</Button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partnerShops.map((shop, i) => (
            <motion.div 
              key={shop.id}
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: i * 0.05}}
            >
              <Card className="overflow-hidden group h-full flex flex-col border-border/50 hover:border-primary/50 transition-colors">
                <div className="h-48 relative overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <Badge variant={shop.isOpen ? "default" : "secondary"} className={shop.isOpen ? "bg-green-500 hover:bg-green-600 text-white border-transparent" : ""}>
                      {shop.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-3 right-3 z-20 bg-background/90 backdrop-blur text-foreground px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" /> {shop.rating}
                  </div>

                  <div className="absolute bottom-3 left-3 z-20 right-3">
                    <h3 className="text-white font-bold text-lg leading-tight shadow-sm truncate">{shop.name}</h3>
                    <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {shop.region}
                    </p>
                  </div>
                </div>
                
                <CardContent className="p-4 flex flex-col justify-between flex-1 bg-card">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">{shop.category}</span>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-muted-foreground">Earn up to</span>
                        <span className="font-bold text-primary">{shop.cashback}% Back</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-auto" variant="outline">View Details</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
