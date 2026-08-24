"use client";
import { useState } from "react";
import Icon from "../ui/Icon";
import Toggle from "../ui/Toggle";
import Typography from "../ui/Typography";
import { Select } from "../ui/FormField";

const CATEGORIES = ["Live Music", "Comedy", "Festival", "Beach Party", "Theatre", "Sports"];

const PreferencesTab = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [categories, setCategories] = useState(["Live Music", "Festival"]);

  const toggleCategory = (cat) =>
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-sidebar-bg border border-primary-border rounded-2xl p-5 sm:p-6">
        <Typography variant="sectionTitle" className="mb-5">General Preferences</Typography>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <Select label="Language" defaultValue="English">
            <option>English</option>
            <option>Irish (Gaeilge)</option>
          </Select>
          <Select label="Currency" defaultValue="EUR (€)">
            <option>EUR (€)</option>
            <option>GBP (£)</option>
            <option>USD ($)</option>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4 py-3.5 border-t border-secondary-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Moon" width={16} height={16} className="text-primary" />
            </div>
            <div>
              <Typography variant="title" className="text-sm">Dark Mode</Typography>
              <Typography variant="body2">PulseTix looks best in the dark</Typography>
            </div>
          </div>
          <Toggle checked={darkMode} onChange={setDarkMode} />
        </div>
      </div>

      <div className="bg-sidebar-bg border border-primary-border rounded-2xl p-5 sm:p-6">
        <Typography variant="sectionTitle" className="mb-1">Favourite Categories</Typography>
        <Typography variant="body2" className="mb-5">Used to personalise your homepage and recommendations.</Typography>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-4 h-9 rounded-2xl text-sm font-medium border transition-all cursor-pointer ${
                  active
                    ? "bg-primary text-primary-text border-primary"
                    : "bg-transparent text-secondary-text border-secondary-border hover:border-primary/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;
