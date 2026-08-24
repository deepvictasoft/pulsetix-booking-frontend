"use client";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

const LayoutContent = ({ children }) => {

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
  return (
      <LayoutContent>{children}</LayoutContent>
  );
};

export default ClientLayout;
