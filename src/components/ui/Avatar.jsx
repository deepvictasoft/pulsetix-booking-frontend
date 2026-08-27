import Icon from "./Icon";
import { cn } from "@/lib/utils";

/**
 * size: px number for the circle. editable: show camera badge bottom-right.
 * src: image url (optional) — falls back to plain silhouette placeholder.
 */
const Avatar = ({ src, alt = "", initials, size = 64, editable = false, onEditClick, className }) => {
  return (
    <div className={cn("relative flex-shrink-0", className)} style={{ width: size, height: size }}>
      <div className="w-full h-full rounded-full border border-secondary-border flex items-center justify-center overflow-hidden bg-primary/10">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : initials ? (
          <span className="text-xs font-semibold text-primary">{initials}</span>
        ) : (
          <Icon name="User" width={size * 0.5} height={size * 0.5} className="text-muted-text" />
        )}
      </div>
      {editable && (
        <button
          type="button"
          onClick={onEditClick}
          className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary border-2 border-background flex items-center justify-center"
          aria-label="Change photo"
        >
          <Icon name="Camera" width={12} height={12} className="text-primary-text" />
        </button>
      )}
    </div>
  );
};

export default Avatar;
