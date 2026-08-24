import Icon from "./Icon";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full h-11 rounded-xl border border-secondary-border bg-field-bg px-4 text-sm text-foreground-text placeholder:text-muted-text outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring/40 disabled:opacity-60 disabled:cursor-not-allowed";

export const Label = ({ children }) => (
  <label className="block text-xs font-medium text-muted-text mb-1.5">{children}</label>
);

export const Input = ({ label, icon, suffix, className, ...props }) => (
  <div className={className}>
    {label && <Label>{label}</Label>}
    <div className="relative">
      {icon && (
        <Icon
          name={icon}
          width={15}
          height={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-text pointer-events-none"
        />
      )}
      <input className={cn(fieldClass, icon && "pl-10", suffix && "pr-16")} {...props} />
      {suffix && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-primary">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

export const Select = ({ label, className, children, ...props }) => (
  <div className={className}>
    {label && <Label>{label}</Label>}
    <div className="relative">
      <select
        className={cn(fieldClass, "appearance-none pr-9 cursor-pointer")}
        {...props}
      >
        {children}
      </select>
      <Icon
        name="ChevronDown"
        width={14}
        height={14}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-text pointer-events-none"
      />
    </div>
  </div>
);

export const Textarea = ({ label, className, ...props }) => (
  <div className={className}>
    {label && <Label>{label}</Label>}
    <textarea
      className={cn(
        "w-full rounded-2xl border border-secondary-border bg-field-bg px-4 py-3 text-sm text-foreground-text placeholder:text-muted-text outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring/40 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
      )}
      rows={3}
      {...props}
    />
  </div>
);
