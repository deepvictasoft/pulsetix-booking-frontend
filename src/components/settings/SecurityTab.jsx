"use client";
import { useState } from "react";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import Toggle from "../ui/Toggle";
import Typography from "../ui/Typography";
import { Input } from "../ui/FormField";

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

const SecurityTab = () => {
  const [twoFA, setTwoFA] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <div className="flex flex-col gap-5">
      <Card title="Change Password" subtitle="Use a strong password you don't use elsewhere.">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Current Password" type="password" icon="Lock" placeholder="••••••••" className="sm:col-span-2" />
          <Input label="New Password" type="password" icon="Lock" placeholder="••••••••" />
          <Input label="Confirm New Password" type="password" icon="Lock" placeholder="••••••••" />
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="primary">Update Password</Button>
        </div>
      </Card>

      <Card title="Account Protection">
        <Row
          icon="ShieldCheck"
          title="Two-Factor Authentication"
          subtitle="Add an extra layer of security to your account"
          right={<Toggle checked={twoFA} onChange={setTwoFA} />}
        />
        <Row
          icon="Bell"
          title="New Login Alerts"
          subtitle="Get notified when a new device logs in"
          right={<Toggle checked={loginAlerts} onChange={setLoginAlerts} />}
        />
      </Card>

      <Card title="Active Sessions" subtitle="Devices currently signed in to your account.">
        <Row
          icon="Smartphone"
          title="iPhone 15 · Dublin, Ireland"
          subtitle="Current session"
          right={<span className="text-xs font-medium text-primary">This device</span>}
        />
        <Row
          icon="Smartphone"
          title="Chrome on Windows · Cork, Ireland"
          subtitle="Active 2 days ago"
          right={<Button variant="outline" size="sm">Log Out</Button>}
        />
      </Card>
    </div>
  );
};

export default SecurityTab;
