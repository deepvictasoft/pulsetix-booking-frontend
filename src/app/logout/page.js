"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearBuyerSession } from "@/lib/buyer/authStorage";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    clearBuyerSession();
    router.replace("/login");
    router.refresh();
  }, [router]);

  return null;
}
