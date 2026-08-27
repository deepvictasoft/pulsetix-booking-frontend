"use client";

import Icon from "../ui/Icon";
import TabSwitch from "../ui/TabSwitch";
import Typography from "../ui/Typography";
import { HELP_TABS } from "@/constants/helpData";

const HelpHero = ({ activeTab, setActiveTab, search, setSearch }) => {
  return (
    <section className="relative overflow-hidden py-16 px-6 text-center ">
      {/* Glow blobs */}
      {/* Glow blobs */}
      {/* Glow blobs */}
      <div className="absolute top-8 left-16 w-32 h-32 rounded-full opacity-20 pointer-events-none bg-[radial-gradient(circle,_#7C3AED_0%,_transparent_70%)]" />

      <div className="absolute top-4 right-20 w-40 h-40 rounded-full opacity-[0.15] pointer-events-none bg-[radial-gradient(circle,_#2DD4BF_0%,_transparent_70%)]" />
      
      <div className="relative max-w-2xl mx-auto">
        <Typography variant="heading" className="mb-3">
          How can we help?
        </Typography>
        <Typography variant="subtitle" className="mb-8">
          Everything you need to know about Organize
        </Typography>

        {/* Search bar */}
        <div className="relative mb-8">
          <Icon
            name="Search"
            width={18}
            height={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type your question here..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl text-foreground-text placeholder:text-muted-text outline-none  text-sm border border-secondary-border bg-field-bg focus:border-primary focus:ring-2 focus:ring-ring/60 transition-all"
          />
          <Icon
            name="Search"
            width={16}
            height={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
          />
        </div>

        {/* Tabs */}
        <TabSwitch
          tabs={HELP_TABS}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>
    </section>
  );
};

export default HelpHero;
