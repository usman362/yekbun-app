import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { PwaInstallBanner } from "@/components/PwaInstallBanner";

// Public Pages
import Landing from "@/pages/Landing";
import PricingPage from "@/pages/Pricing";
import LoginPage from "@/pages/Login";
import NotFound from "@/pages/not-found";

// Dashboard Pages
import DashboardOverview from "@/pages/dashboard/Overview";
import DashboardWallet from "@/pages/dashboard/Wallet";
import DashboardPlans from "@/pages/dashboard/Plans";
import DashboardShops from "@/pages/dashboard/PartnerShops";
import DashboardPlaylists from "@/pages/dashboard/Playlists";
import DashboardStreaming from "@/pages/dashboard/Streaming";
import DashboardProfile from "@/pages/dashboard/Profile";
import DashboardSettings from "@/pages/dashboard/Settings";

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground mb-6">This page is a placeholder for the flow.</p>
      <a href="/" className="text-primary hover:underline">Go back home</a>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="yekbun-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/charge-zer" element={<PlaceholderPage title="Charge Zer Flow" />} />
            <Route path="/upgrade-account" element={<PlaceholderPage title="Upgrade Account Flow" />} />
            <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
            <Route path="/legal-notice" element={<PlaceholderPage title="Legal Notice" />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
            <Route path="/register" element={<PlaceholderPage title="Register" />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/dashboard/profile" element={<DashboardProfile />} />
            <Route path="/dashboard/plans" element={<DashboardPlans />} />
            <Route path="/dashboard/wallet" element={<DashboardWallet />} />
            <Route path="/dashboard/partner-shops" element={<DashboardShops />} />
            <Route path="/dashboard/playlists" element={<DashboardPlaylists />} />
            <Route path="/dashboard/streaming" element={<DashboardStreaming />} />
            <Route path="/dashboard/settings" element={<DashboardSettings />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <PwaInstallBanner />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
