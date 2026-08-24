"use client";
import { useState } from "react";
import Typography from "@/components/ui/Typography";
import SettingsNav from "@/components/settings/SettingsNav";
import GeneralTab from "@/components/settings/GeneralTab";
import SecurityTab from "@/components/settings/SecurityTab";
import PrivacyTab from "@/components/settings/PrivacyTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import ConnectedAccountsTab from "@/components/settings/ConnectedAccountsTab";
import PaymentsTab from "@/components/settings/PaymentsTab";
import PreferencesTab from "@/components/settings/PreferencesTab";

const TAB_COMPONENTS = {
  general: GeneralTab,
  security: SecurityTab,
  privacy: PrivacyTab,
  notifications: NotificationsTab,
  "connected-accounts": ConnectedAccountsTab,
  payments: PaymentsTab,
  preferences: PreferencesTab,
};

export default function SettingsPage() {
  const [active, setActive] = useState("general");
  const ActiveTab = TAB_COMPONENTS[active] || GeneralTab;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
      <Typography variant="heading2">Account Settings</Typography>
      <Typography variant="subtitle" className="mt-1 mb-8">
        Manage your account preferences and privacy
      </Typography>

      <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
        <SettingsNav active={active} onSelect={setActive} />
        <ActiveTab />
      </div>
    </section>
  );
}
