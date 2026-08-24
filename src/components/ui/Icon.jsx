import { LUCIDE_ICONS, ICONS_MAP } from "../icons/utils";

const Icon = ({ name, ...props }) => {
  const CustomIconComponent = ICONS_MAP[name];
  const LucideIconComponent = LUCIDE_ICONS[name];

  if (CustomIconComponent) {
    return <CustomIconComponent {...props} />;
  }
  if (LucideIconComponent) {
    return <LucideIconComponent {...props} />;
  }

  return null;
};

export default Icon;
