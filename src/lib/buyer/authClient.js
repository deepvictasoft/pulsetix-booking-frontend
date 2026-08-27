import { setBuyerSession } from "@/lib/buyer/authStorage";

async function postBuyerAuth(path, payload) {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.status) {
    throw new Error(json?.message ?? "Something went wrong. Please try again.");
  }

  return json.data;
}

export async function loginBuyer({ email, password }) {
  const data = await postBuyerAuth("/api/buyers/login", { email, password });

  setBuyerSession({
    user: data.user,
    tokens: data.tokens,
  });

  return data;
}

export async function registerBuyer({ full_name, email, mobile_number, password }) {
  const data = await postBuyerAuth("/api/buyers/register", {
    full_name,
    email,
    mobile_number,
    password,
  });

  setBuyerSession({
    user: data.user,
    tokens: data.tokens,
  });

  return data;
}
