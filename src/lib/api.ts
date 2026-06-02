import axios from "axios";

/**
 * Shared axios client for the YekBun end-user web app.
 *
 * Talks to the same Laravel backend that powers the admin dashboard
 * (api.appdash.yekbun.org). Auth lives in localStorage under TOKEN_KEY — a Bearer
 * header is attached automatically on each request. A 401 from the server clears the
 * token and bounces the user to /login so a stale session can't be revived silently.
 *
 * Configure the base URL via `VITE_API_URL` in `.env.local`. Example:
 *   VITE_API_URL=https://api.appdash.yekbun.org/api
 */
export const TOKEN_KEY = "yekbun_user_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Don't force "Content-Type: application/json" — axios picks the right one based on the
  // request body (JSON vs FormData), and the browser sets the multipart boundary itself.
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired / invalid → clear it and bounce to login. Skip the redirect when the
    // user is ALREADY on /login (otherwise the failed login attempt would refresh the page
    // and the error toast would never get a chance to render).
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
