import { cn } from "@/lib/utils";

const SIZES = {
  sm: { word: "text-lg", tag: "text-[9px]", dot: "w-2 h-2" },
  md: { word: "text-2xl", tag: "text-[10px]", dot: "w-2.5 h-2.5" },
  lg: { word: "text-3xl", tag: "text-xs", dot: "w-3 h-3" },
};

const Logo = ({ size = "md", className }) => {
  const s = SIZES[size] || SIZES.md;

  return (
    <div className={cn("flex flex-col leading-none select-none", className)}>
      <span className={cn("font-bold tracking-tight text-foreground-text flex items-center", s.word)}>
        org
        <span className={cn("rounded-full bg-primary inline-block mx-[1px]", s.dot)} />
        nize
      </span>
      <span className={cn("text-muted-text tracking-wide uppercase", s.tag)}>
        events &amp; entertainment
      </span>
    </div>
  );
};

export default Logo;
