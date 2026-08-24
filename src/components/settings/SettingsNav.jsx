"use client";
import Icon from "../ui/Icon";
import { SETTINGS_TABS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const SettingsNav = ({ active, onSelect }) => {
  return (
    <nav className="bg-sidebar-bg border border-primary-border rounded-2xl p-3 flex flex-col gap-1">
      {SETTINGS_TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onSelect(tab.key)}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-secondary-text hover:bg-white/5 hover:text-foreground-text"
            )}
          >
            <Icon name={tab.icon} width={17} height={17} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default SettingsNav;
