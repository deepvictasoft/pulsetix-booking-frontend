"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearBuyerSession,
  getBuyerAccessToken,
  getBuyerInitials,
  getBuyerUser,
} from "@/lib/buyer/authStorage";

export function useBuyerAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const syncAuthState = useCallback(() => {
    setIsLoggedIn(!!getBuyerAccessToken());
    setUser(getBuyerUser());
  }, []);

  useEffect(() => {
    syncAuthState();

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("buyer-auth-change", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("buyer-auth-change", syncAuthState);
    };
  }, [syncAuthState]);

  const logout = useCallback(() => {
    clearBuyerSession();
    syncAuthState();
  }, [syncAuthState]);

  return {
    isLoggedIn,
    user,
    initials: getBuyerInitials(user),
    logout,
  };
}
