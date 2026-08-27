const BUYER_TOKEN_KEY = "pulsetix_buyer_access_token";
const BUYER_REFRESH_TOKEN_KEY = "pulsetix_buyer_refresh_token";
const BUYER_USER_KEY = "pulsetix_buyer_user";

export function getBuyerAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(BUYER_TOKEN_KEY);
}

export function getBuyerRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(BUYER_REFRESH_TOKEN_KEY);
}

export function getBuyerUser() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(BUYER_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setBuyerAccessToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BUYER_TOKEN_KEY, token);
}

export function setBuyerSession({ user, tokens }) {
  if (typeof window === "undefined") return;

  if (tokens?.access_token) {
    localStorage.setItem(BUYER_TOKEN_KEY, tokens.access_token);
  }

  if (tokens?.refresh_token) {
    localStorage.setItem(BUYER_REFRESH_TOKEN_KEY, tokens.refresh_token);
  }

  if (user) {
    localStorage.setItem(BUYER_USER_KEY, JSON.stringify(user));
  }

  window.dispatchEvent(new Event("buyer-auth-change"));
}

export function clearBuyerSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(BUYER_TOKEN_KEY);
  localStorage.removeItem(BUYER_REFRESH_TOKEN_KEY);
  localStorage.removeItem(BUYER_USER_KEY);
  window.dispatchEvent(new Event("buyer-auth-change"));
}

export function clearBuyerAccessToken() {
  clearBuyerSession();
}

export function isBuyerLoggedIn() {
  return !!getBuyerAccessToken();
}

export function getBuyerInitials(user = getBuyerUser()) {
  if (!user?.full_name) return "?";

  return user.full_name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
