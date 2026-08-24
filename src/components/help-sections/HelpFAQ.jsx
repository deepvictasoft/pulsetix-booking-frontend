"use client";
import { useState } from "react";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import { cn } from "@/lib/utils";
import { HELP_FAQS, POPULAR_ARTICLES } from "@/constants/helpData";

const INITIAL_SHOW = 7;

const HelpFAQ = ({ search }) => {
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = search.trim()
    ? HELP_FAQS.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()))
    : HELP_FAQS;

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-12">
      <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
        {/* ── FAQ accordion ─────────────────────────────── */}
        <div>
          <Typography variant="heading2" className="mb-6">
            Frequently Asked Questions
          </Typography>

          <div className="flex flex-col gap-3">
            {visible.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-2xl overflow-hidden transition-all bg-sidebar-bg",
                  open === i
                    ? "border border-primary/30"
                    : "border border-white/[0.06]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10">
                    <Icon
                      name={faq.icon}
                      width={15}
                      height={15}
                      className="text-primary"
                    />
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground-text">
                    {faq.q}
                  </span>
                  <Icon
                    name={open === i ? "Minus" : "Plus"}
                    width={16}
                    height={16}
                    className="text-muted-text flex-shrink-0"
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm text-muted-text leading-relaxed pl-16">
                    We're working on this answer. Please{" "}
                    <span className="text-primary cursor-pointer">
                      contact support
                    </span>{" "}
                    for more details.
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load more */}
          {!showAll && filtered.length > INITIAL_SHOW && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-primary cursor-pointer transition-colors hover:bg-primary/10 border border-primary/35"
              >
                <Icon name="RefreshCw" width={14} height={14} />
                Load more questions
              </button>
            </div>
          )}
        </div>

        {/* ── Popular articles sidebar ───────────────────── */}
        <div className="rounded-2xl p-5 sticky top-24 bg-sidebar-bg border border-white/[0.07]">
          <div className="flex items-center gap-2 mb-5">
            <Icon
              name="Flame"
              width={18}
              height={18}
              className="text-primary"
            />
            <Typography variant="sectionTitle" className="font-bold">Popular Articles</Typography>
          </div>

          <div className="flex flex-col gap-1">
            {POPULAR_ARTICLES.map((art, i) => (
              <button
                key={i}
                type="button"
                className="flex items-center gap-3 p-3 rounded-xl text-left cursor-pointer transition-colors hover:bg-white/5 group"
              >
                {/* Colored thumbnail */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10 transition-colors">
                  <Icon
                    name={art.icon}
                    width={22}
                    height={22}
                    className="text-primary"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Typography variant="sectionTitle" className="!text-sm mb-0.5">{art.title}</Typography>
                  <Typography variant="body2">{art.desc}</Typography>
                </div>
                <Icon
                  name="ChevronRight"
                  width={14}
                  height={14}
                  className="text-muted-text flex-shrink-0"
                />
              </button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.06]">
            <button
              type="button"
              className="w-full py-3 rounded-xl text-sm font-semibold text-primary cursor-pointer transition-colors hover:bg-primary/10 border border-primary/35"
            >
              View all articles <Icon name="ArrowRight" width={14} height={14} className="inline-block ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpFAQ;
