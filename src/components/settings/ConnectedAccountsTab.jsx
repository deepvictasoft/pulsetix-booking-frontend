"use client";
import { useState } from "react";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import Typography from "../ui/Typography";

const PROVIDERS = [
  { key: "google", label: "Google", icon: "Mail", connected: true, detail: "john.doe@gmail.com" },
  { key: "facebook", label: "Facebook", icon: "Facebook", connected: false },
  { key: "instagram", label: "Instagram", icon: "Instagram", connected: false },
  { key: "spotify", label: "Spotify", icon: "Music", connected: true, detail: "johndoe" },
];

const ConnectedAccountsTab = () => {
  const [providers, setProviders] = useState(PROVIDERS);

  const toggleProvider = (key) =>
    setProviders((prev) =>
      prev.map((p) => (p.key === key ? { ...p, connected: !p.connected } : p))
    );

  return (
    <div className="bg-sidebar-bg border border-primary-border rounded-2xl p-5 sm:p-6">
      <Typography variant="sectionTitle" className="mb-1">Connected Accounts</Typography>
      <Typography variant="body2" className="mb-5">
        Link accounts to speed up sign-in and share what you're attending.
      </Typography>

      <div className="flex flex-col">
        {providers.map((p) => (
          <div
            key={p.key}
            className="flex items-center justify-between gap-4 py-3.5 border-b border-secondary-border last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={p.icon} width={16} height={16} className="text-primary" />
              </div>
              <div>
                <Typography variant="title" className="text-sm">{p.label}</Typography>
                <Typography variant="body2">
                  {p.connected ? p.detail || "Connected" : "Not connected"}
                </Typography>
              </div>
            </div>
            <Button
              variant={p.connected ? "outline" : "primary"}
              size="sm"
              onClick={() => toggleProvider(p.key)}
            >
              {p.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedAccountsTab;
