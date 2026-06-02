import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex p-4 rounded-full bg-destructive/10 text-destructive mb-6">
          <AlertCircle className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg" className="px-8 rounded-full">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
