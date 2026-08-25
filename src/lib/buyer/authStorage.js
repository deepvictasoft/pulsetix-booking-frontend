const BUYER_TOKEN_KEY = "pulsetix_buyer_access_token";

export function getBuyerAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(BUYER_TOKEN_KEY);
}

export function setBuyerAccessToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BUYER_TOKEN_KEY, token);
}

export function clearBuyerAccessToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(BUYER_TOKEN_KEY);
}
