"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];

const LayoutContent = ({ children }) => {
  const pathname = usePathname();
  const isAuth = AUTH_ROUTES.some((r) => pathname?.startsWith(r));

  if (isAuth) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

const ClientLayout = ({ children }) => {
  return <LayoutContent>{children}</LayoutContent>;
};

export default ClientLayout;