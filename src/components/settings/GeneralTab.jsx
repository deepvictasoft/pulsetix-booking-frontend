"use client";
import { useState } from "react";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import Typography from "../ui/Typography";
import { Input, Select, Textarea } from "../ui/FormField";
import { CURRENT_USER } from "@/constants/navigation";

const SOCIAL_FIELDS = [
  { key: "youtube", icon: "Youtube", placeholder: "youtube.com/username" },
  { key: "instagram", icon: "Instagram", placeholder: "instagram.com/username" },
  { key: "linkedin", icon: "Linkedin", placeholder: "linkedin.com/in/username" },
  { key: "facebook", icon: "Facebook", placeholder: "facebook.com/username" },
  { key: "twitter", icon: "Twitter", placeholder: "x.com/username" },
];

const GeneralTab = () => {
  const [editing, setEditing] = useState(false);
  const user = CURRENT_USER;

  return (
    <div className="bg-sidebar-bg border border-primary-border rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="sectionTitle">General Information</Typography>
        <Button
          variant="ghost"
          size="sm"
          icon="Edit2"
          iconPosition="left"
          onClick={() => setEditing((prev) => !prev)}
        >
          {editing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {/* Profile photo */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar size={64} editable={editing} />
        <div className="flex-1">
          <Typography variant="title" className="text-sm sm:text-base">Profile Photo</Typography>
          <Typography variant="body2">JPG, PNG or GIF. Max size 2MB.</Typography>
        </div>
        <Button variant="outline" size="sm" disabled={!editing}>
          Change Photo
        </Button>
      </div>

      {/* Fields */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        <Input label="First Name" defaultValue={user.firstName} disabled={!editing} />
        <Input label="Last Name" defaultValue={user.lastName} disabled={!editing} />

        <Input
          label="Email Address"
          defaultValue={user.email}
          disabled={!editing}
          suffix={user.emailVerified ? "Verified" : undefined}
        />
        <Input label="Mobile Number" icon="Smartphone" defaultValue={user.phone} disabled={!editing} />

        <Input label="Date of Birth" icon="Calendar" defaultValue={user.dob} disabled={!editing} />
        <Select label="Gender" defaultValue={user.gender} disabled={!editing}>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Prefer not to say</option>
        </Select>

        <Input label="Location" icon="MapPin" defaultValue={user.location} disabled={!editing} className="sm:col-span-2" />
        <Textarea label="About You (Optional)" defaultValue={user.about} disabled={!editing} className="sm:col-span-2" />
      </div>

      {/* Social links */}
      <div className="mt-8">
        <Typography variant="title" className="text-sm sm:text-base mb-4">Social Media Links (Optional)</Typography>
        <div className="grid sm:grid-cols-2 gap-4">
          {SOCIAL_FIELDS.map((field) => (
            <Input
              key={field.key}
              icon={field.icon}
              placeholder={field.placeholder}
              defaultValue={user.social[field.key]}
              disabled={!editing}
            />
          ))}
        </div>
      </div>

      {editing && (
        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setEditing(false)}>Discard</Button>
          <Button variant="primary" onClick={() => setEditing(false)}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};

export default GeneralTab;
