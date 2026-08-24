"use client";
import Icon from "../ui/Icon";
import { cn } from "@/lib/utils";

const Pagination = ({ totalPages = 1, page = 1, onChange }) => {
  const goTo = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange?.(p);
  };

  if (totalPages <= 1) return null;

  // Build a sliding window of page numbers around the current page,
  // always keeping first + last visible with ellipses when needed.
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  let end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, Math.min(start, end - windowSize + 1));

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const showLeadingEllipsis = start > 1;
  const showTrailingEllipsis = end < totalPages;

  const pageBtnClass = (p) =>
    cn(
      "w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors cursor-pointer",
      page === p
        ? "border border-primary text-gradient"
        : "text-muted-text hover:text-foreground-text hover:bg-white/5"
    );

  return (
    <div className="flex items-center justify-center gap-1 mx-auto w-fit rounded-full border border-secondary-border bg-sidebar-bg px-2 py-2">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full text-muted-text hover:text-foreground-text hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <Icon name="ChevronLeft" width={16} height={16} className="text-primary"/>
      </button>

      {showLeadingEllipsis && (
        <>
          <button type="button" onClick={() => goTo(1)} className={pageBtnClass(1)}>1</button>
          <span className="w-8 h-8 flex items-center justify-center text-muted-text text-sm">...</span>
        </>
      )}

      {pages.map((p) => (
        <button key={p} type="button" onClick={() => goTo(p)} className={pageBtnClass(p)}>
          {p}
        </button>
      ))}

      {showTrailingEllipsis && (
        <>
          <span className="w-8 h-8 flex items-center justify-center text-muted-text text-sm">...</span>
          <button type="button" onClick={() => goTo(totalPages)} className={pageBtnClass(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        aria-label="Next page"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full text-muted-text hover:text-foreground-text hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        <Icon name="ChevronRight" width={16} height={16} className="text-primary"/>
      </button>
    </div>
  );
};

export default Pagination;
