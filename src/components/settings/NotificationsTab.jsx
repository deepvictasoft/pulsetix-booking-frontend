"use client";
import { useState } from "react";
import Icon from "../ui/Icon";
import Toggle from "../ui/Toggle";
import Typography from "../ui/Typography";

const Card = ({ title, subtitle, children }) => (
  <div className="bg-sidebar-bg border border-primary-border rounded-2xl p-5 sm:p-6">
    <Typography variant="sectionTitle" className="mb-1">{title}</Typography>
    {subtitle && <Typography variant="body2" className="mb-5">{subtitle}</Typography>}
    {children}
  </div>
);

const Row = ({ icon, title, subtitle, checked, onChange }) => (
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
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const NotificationsTab = () => {
  const [prefs, setPrefs] = useState({
    ticketConfirm: true,
    eventReminders: true,
    priceDrops: false,
    newEvents: true,
    promotions: false,
    smsReminders: true,
  });

  const toggle = (key) => (val) => setPrefs((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="flex flex-col gap-5">
      <Card title="Email Notifications">
        <Row icon="Ticket" title="Ticket Confirmations" subtitle="Receipts and e-tickets after booking" checked={prefs.ticketConfirm} onChange={toggle("ticketConfirm")} />
        <Row icon="Calendar" title="Event Reminders" subtitle="Reminders before events you've booked" checked={prefs.eventReminders} onChange={toggle("eventReminders")} />
        <Row icon="Tag" title="Price Drops" subtitle="When a wishlisted event drops in price" checked={prefs.priceDrops} onChange={toggle("priceDrops")} />
        <Row icon="PartyPopper" title="New Events Near You" subtitle="Fresh events matching your interests" checked={prefs.newEvents} onChange={toggle("newEvents")} />
        <Row icon="Mail" title="Promotions & Offers" subtitle="Discounts and partner offers" checked={prefs.promotions} onChange={toggle("promotions")} />
      </Card>

      <Card title="SMS Notifications">
        <Row icon="Smartphone" title="Event Day Reminders" subtitle="Text reminders on the day of your event" checked={prefs.smsReminders} onChange={toggle("smsReminders")} />
      </Card>
    </div>
  );
};

export default NotificationsTab;
