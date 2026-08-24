"use client";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import Typography from "../ui/Typography";
import { Input, Select } from "../ui/FormField";

const CARDS = [
  { id: 1, brand: "Visa", last4: "4242", expiry: "08/28", primary: true },
  { id: 2, brand: "Mastercard", last4: "8891", expiry: "01/27", primary: false },
];

const PaymentsTab = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-sidebar-bg border border-primary-border rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <Typography variant="sectionTitle">Saved Payment Methods</Typography>
          <Button variant="ghost" size="sm" icon="Plus" iconPosition="left">Add Card</Button>
        </div>

        <div className="flex flex-col gap-3">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-secondary-border px-4 py-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="CreditCard" width={16} height={16} className="text-primary" />
                </div>
                <div>
                  <Typography variant="title" className="text-sm">
                    {card.brand} •••• {card.last4}
                    {card.primary && <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide text-primary">Primary</span>}
                  </Typography>
                  <Typography variant="body2">Expires {card.expiry}</Typography>
                </div>
              </div>
              <button className="text-muted-text hover:text-red-400 transition-colors cursor-pointer" aria-label="Remove card">
                <Icon name="Trash2" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-sidebar-bg border border-primary-border rounded-2xl p-5 sm:p-6">
        <Typography variant="sectionTitle" className="mb-5">Billing Address</Typography>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue="John Doe" className="sm:col-span-2" />
          <Input label="Address Line 1" defaultValue="14 Grafton Street" className="sm:col-span-2" />
          <Input label="City" defaultValue="Dublin" />
          <Input label="Eircode / Postal Code" defaultValue="D02 F892" />
          <Select label="Country" defaultValue="Ireland" className="sm:col-span-2">
            <option>Ireland</option>
            <option>United Kingdom</option>
            <option>United States</option>
          </Select>
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="primary">Save Billing Details</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTab;
