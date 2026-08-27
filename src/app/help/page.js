"use client";

import { useState } from "react";
import HelpHero          from "@/components/help-sections/HelpHero";
import HelpCategories    from "@/components/help-sections/HelpCategories";
import HelpFAQ           from "@/components/help-sections/HelpFAQ";
import HelpContactBanner from "@/components/help-sections/HelpContactBanner";
import { HELP_TABS } from "@/constants/helpData";

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState(HELP_TABS[0]);
  const [search, setSearch]       = useState("");

  return (
    <>
      <HelpHero
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
      />
      <HelpCategories />
      <HelpFAQ search={search} />
      <HelpContactBanner />
    </>
  );
}
