import { Navigate, useLocation } from "react-router-dom";
import { TOKEN_KEY } from "@/lib/api";

/**
 * Gate for authenticated-only pages. Wraps a route element and bounces unauthed
 * visitors to /login while preserving the original destination in the URL so we
 * can deep-link them back after they sign in.
 *
 * Token presence is the only check — if it's stale the API itself will return
 * 401 and the axios interceptor will clear the token + redirect anyway, so we
 * don't need a server round-trip just to render a dashboard page.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

  if (!token) {
    // Stash the attempted URL so the post-login flow can return here.
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
