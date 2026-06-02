import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { playlists, playlistUpgrades } from "@/data/mock";
import { Music, PlayCircle, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPlaylists() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Music & Playlists</h1>
          <p className="text-muted-foreground mt-1">Manage your premium audio experience.</p>
        </div>

        {/* Upgrades Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Purchase Playlist Capacity</h2>
            <p className="text-sm text-muted-foreground mt-1">Buy capacity slots using Zer to create massive playlists.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {playlistUpgrades.map((upgrade) => (
              <Card key={upgrade.id} className={`border-border/50 relative overflow-hidden ${upgrade.popular ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
                {upgrade.popular && <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>}
                <CardHeader>
                  <CardTitle>{upgrade.name}</CardTitle>
                  <CardDescription>Up to {upgrade.songs} songs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-foreground">{upgrade.zerCost}</span>
                    <span className="text-sm font-medium text-muted-foreground">Zer</span>
                  </div>
                  <div className="space-y-3 mb-6">
                     <p className="text-sm flex items-center gap-2 text-muted-foreground"><ShieldCheck className="h-4 w-4 text-green-500"/> One-time purchase</p>
                     <p className="text-sm flex items-center gap-2 text-muted-foreground"><ShieldCheck className="h-4 w-4 text-green-500"/> {upgrade.cashback}% Cashback</p>
                  </div>
                  <Button className="w-full" variant={upgrade.popular ? "default" : "outline"}>Purchase</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* My Playlists (Mock View) */}
        <section className="pt-8 border-t border-border/50">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Music className="h-5 w-5 text-primary" /> Featured YekBûn Curations</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all">
                  <img src={playlist.cover} alt={playlist.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="icon" className="h-12 w-12 rounded-full bg-primary text-primary-foreground scale-90 group-hover:scale-100 transition-transform shadow-xl border-none">
                      <PlayCircle className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight truncate">{playlist.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">By {playlist.curator} • {playlist.tracks} tracks</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
