"use client";
import { useState } from "react";
import Icon from "../ui/Icon";
import Toggle from "../ui/Toggle";
import Typography from "../ui/Typography";
import { Select } from "../ui/FormField";

const Card = ({ title, subtitle, children }) => (
  <div className="bg-sidebar-bg border border-primary-border rounded-2xl p-5 sm:p-6">
    <Typography variant="sectionTitle" className="mb-1">{title}</Typography>
    {subtitle && <Typography variant="body2" className="mb-5">{subtitle}</Typography>}
    {children}
  </div>
);

const Row = ({ icon, title, subtitle, right }) => (
  <div className="flex items-center justify-between gap-4 py-3.5 border-b border-secondary-border last:border-b-0">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon name={icon} width={16} height={16} className="text-primary" />
      </div>
      <div>
        <Typography variant="title" className="text-sm">{title}</Typography>
        <Typography variant="body2">{subtitle}</Typography>
      </div>
    </div>
    {right}
  </div>
);

const PrivacyTab = () => {
  const [showAttendance, setShowAttendance] = useState(true);
  const [showWishlist, setShowWishlist] = useState(false);
  const [personalisedAds, setPersonalisedAds] = useState(true);

  return (
    <div className="flex flex-col gap-5">
      <Card title="Profile Visibility">
        <Select label="Who can see your profile" defaultValue="Everyone" className="mb-5">
          <option>Everyone</option>
          <option>Followers Only</option>
          <option>Only Me</option>
        </Select>
        <Row
          icon="PartyPopper"
          title="Show Events I'm Attending"
          subtitle="Visible on your public profile"
          right={<Toggle checked={showAttendance} onChange={setShowAttendance} />}
        />
        <Row
          icon="Heart"
          title="Show My Wishlist"
          subtitle="Let others see events you've saved"
          right={<Toggle checked={showWishlist} onChange={setShowWishlist} />}
        />
      </Card>

      <Card title="Data & Advertising">
        <Row
          icon="Sparkle"
          title="Personalised Recommendations"
          subtitle="Use activity to tailor event suggestions"
          right={<Toggle checked={personalisedAds} onChange={setPersonalisedAds} />}
        />
      </Card>

      <Card title="Danger Zone" subtitle="These actions are permanent and cannot be undone.">
        <button className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors cursor-pointer">
          Delete My Account
        </button>
      </Card>
    </div>
  );
};

export default PrivacyTab;
