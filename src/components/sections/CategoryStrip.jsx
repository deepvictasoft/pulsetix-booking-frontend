"use client";
import Link from "next/link";
import Icon from "../ui/Icon";
import { CATEGORIES } from "@/constants/sectionsData";
import Typography from "../ui/Typography";

// Slice categories so last visible slot is always "More"
// Full list has "More" at index 6 already
const MORE_CAT = CATEGORIES[CATEGORIES.length - 1]; // the "More" entry
const REAL_CATS = CATEGORIES.slice(0, CATEGORIES.length - 1); // Music..Workshops (6 items)

function getSlice(maxVisible) {
  // maxVisible includes the "More" slot
  if (maxVisible >= REAL_CATS.length + 1) return CATEGORIES; // show all 7
  return [...REAL_CATS.slice(0, maxVisible - 1), MORE_CAT];
}

const LG_CATS  = getSlice(4); // 3 real + More
const XL_CATS  = getSlice(5); // 4 real + More
const XXL_CATS = getSlice(7); // all 7

const CategoryCard = ({ cat }) => (
  <div
    className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group h-full"
    style={{ border: `1px solid ${cat.color}33` }}
  >
    {/* Image */}
    <div className="relative h-44 overflow-hidden flex-shrink-0">
      <img
        src={cat.image}
        alt={cat.label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)",
        }}
      /> */}
      <div
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
        style={{
          background: `radial-gradient(ellipse at bottom, ${cat.color}88 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-3 left-3 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.55)", border: `1.5px solid ${cat.color}` }}
      >
        <Icon name={cat.icon} width={16} height={16} style={{ color: cat.color }} />
      </div>
    </div>

    {/* Text — flex-grow so all cards same height */}
    <div className="px-3 pt-3 pb-4 bg-sidebar-bg flex flex-col flex-grow">
      <p className="font-bold text-foreground-text text-sm mb-1">{cat.label}</p>
      <Typography variant="body2" className="mb-3 leading-snug text-xs flex-grow">{cat.sub}</Typography>
      <p className="text-xs font-semibold flex items-center gap-1" style={{ color: cat.color }}>
        {cat.count !== null ? `${cat.count} Events` : "View all"}
        <span className="text-sm">
          <Icon name="ArrowRight" width={13} height={13} />
        </span>
      </p>
    </div>

    {/* Bottom accent */}
    <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: cat.color }} />
  </div>
);

const CatGrid = ({ cats, cols }) => (
  <div className={`grid gap-3 ${cols}`}>
    {cats.map((cat) => {
      const isMore = cat.label === "More";
      return isMore ? (
        <Link key={cat.label} href="/events" className="block h-full">
          <CategoryCard cat={cat} />
        </Link>
      ) : (
        <Link
          key={cat.label}
          href={`/events?category=${encodeURIComponent(cat.label)}`}
          className="block h-full"
        >
          <CategoryCard cat={cat} />
        </Link>
      );
    })}
  </div>
);

const CategoryStrip = () => {
  return (
    <section className="max-w-9xl mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-16 lg:mt-20">
      <div className="inline-flex gap-3 items-center text-sm font-semibold text-foreground-text mb-2">
        <Icon name="Sparkle" size={18} className="text-primary" />
        <Typography variant="body2" className="uppercase text-sm tracking-widest">
          Explore by category
        </Typography>
      </div>
      <Typography variant="heading2" className="mb-2">
        What are you <span className="text-gradient">into?</span>
      </Typography>
      <Typography variant="body2" className="mb-8">
        Find events that match your vibe. Explore categories you love.
      </Typography>

      {/* Mobile: horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:hidden">
        {CATEGORIES.map((cat) => {
          const isMore = cat.label === "More";
          return (
            <div key={cat.label} className="flex-shrink-0 w-44">
              {isMore ? (
                <Link href="/events" className="block h-full">
                  <CategoryCard cat={cat} />
                </Link>
              ) : (
                <Link
                  href={`/events?category=${encodeURIComponent(cat.label)}`}
                  className="block h-full"
                >
                  <CategoryCard cat={cat} />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* lg: 4 cols (3 real + More) */}
      <div className="hidden lg:block xl:hidden">
        <CatGrid cats={LG_CATS} cols="grid-cols-4" />
      </div>

      {/* xl: 5 cols (4 real + More) */}
      <div className="hidden xl:block 2xl:hidden">
        <CatGrid cats={XL_CATS} cols="grid-cols-5" />
      </div>

      {/* 2xl: 7 cols (all) */}
      <div className="hidden 2xl:block">
        <CatGrid cats={XXL_CATS} cols="grid-cols-7" />
      </div>
    </section>
  );
};

export default CategoryStrip;