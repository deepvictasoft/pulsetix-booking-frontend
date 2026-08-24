// "use client";
// import { useRef } from "react";
// import Icon from "../ui/Icon";
// import Typography from "../ui/Typography";
// import { EVENT_FILTER_CATEGORIES } from "@/constants/eventsData";

// const CARD_W = 176; // px — matches w-44
// const SCROLL_AMOUNT = CARD_W * 5 + 12 * 5; // 3.5 cards + gaps

// const EventsCategorySlider = ({ onSelect, selectedCategory }) => {
//   const scrollRef = useRef(null);

//   const scroll = (dir) => {
//     scrollRef.current?.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: "smooth" });
//   };

//   const handleSelect = (label) => {
//     if (onSelect) {
//       onSelect(selectedCategory === label ? "All Categories" : label);
//     }
//   };

//   return (
//     <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 t-12 lg:mt-16">
//       {/* Header row */}
//       <div className="flex items-center justify-between mb-5">
//         <div>
//           <Typography variant="body2" className="uppercase tracking-widest mb-1">Browse by category</Typography>
//           <Typography variant="sectionTitle">
//             All <span className="text-gradient">Categories</span>
//           </Typography>
//         </div>
//         {/* Arrow buttons */}
//         <div className="flex gap-2">
//           <button
//             type="button"
//             onClick={() => scroll(-1)}
//             className="w-9 h-9 rounded-full border border-primary-border bg-sidebar-bg flex items-center justify-center text-muted-text hover:border-primary hover:text-primary transition-colors cursor-pointer"
//           >
//             <Icon name="ChevronLeft" width={18} height={18}/>
//           </button>
//           <button
//             type="button"
//             onClick={() => scroll(1)}
//             className="w-9 h-9 rounded-full border border-primary-border bg-sidebar-bg flex items-center justify-center text-muted-text hover:border-primary hover:text-primary transition-colors cursor-pointer"
//           >
//             <Icon name="ChevronRight" width={18} height={18} />
//           </button>
//         </div>
//       </div>

//       {/* Scrollable card row */}
//       <div
//         ref={scrollRef}
//         className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden "
//       >
//         {EVENT_FILTER_CATEGORIES.map((cat) => {
//           const isSelected = selectedCategory === cat.label;
//           return (
//           <button
//             key={cat.label}
//             type="button"
//             onClick={() => handleSelect(cat.label)}
//             className="flex-shrink-0 w-50 group text-left cursor-pointer"
//             style={{ outline: "none" }}
//           >
//             {/* Card — same exact style as homepage CategoryStrip */}
//             <div
//               className="relative rounded-2xl overflow-hidden transition-all duration-200 group-hover:scale-[1.02]"
//               style={{ border: `1px solid ${cat.color}33` }}
//             >
//               {/* Image */}
//               <div className="relative h-44 overflow-hidden">
//                 <img
//                   src={cat.image}
//                   alt={cat.label}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 {/* Dark gradient */}
//                 <div
//                   className="absolute inset-0"
//                   style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)" }}
//                 />
//                 {/* Color glow */}
//                 <div
//                   className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity"
//                   style={{ background: `radial-gradient(ellipse at bottom, ${cat.color}88 0%, transparent 70%)` }}
//                 />
//                 {/* Icon circle */}
//                 <div
//                   className="absolute bottom-3 left-3 w-9 h-9 rounded-full flex items-center justify-center"
//                   style={{ background: "rgba(0,0,0,0.55)", border: `1.5px solid ${cat.color}` }}
//                 >
//                   <Icon name={cat.icon} width={16} height={16} style={{ color: cat.color }} />
//                 </div>
//               </div>

//               {/* Text */}
//               <div className="px-3 pt-3 pb-4 bg-sidebar-bg">
//                 <Typography variant="heading" className="!text-sm mb-1">{cat.label}</Typography>
//                 <p className="text-xs text-muted-text leading-snug mb-3 whitespace-pre-line">{cat.sub}</p>
//                 <p className="text-xs font-semibold flex items-center gap-1" style={{ color: cat.color }}>
//                   {cat.count} Events <span className="text-sm"><Icon name="ArrowRight" width={16} height={16} /></span>
//                 </p>
//               </div>

//               {/* Bottom accent line */}
//               <div
//                 className="absolute bottom-0 left-0 right-0 h-[2px]"
//                 style={{ background: cat.color }}
//               />
//               {/* Selected ring */}
//               {isSelected && (
//                 <div
//                   className="absolute inset-0 rounded-2xl pointer-events-none"
//                   style={{ boxShadow: `0 0 0 2px ${cat.color}`, border: `1px solid ${cat.color}60` }}
//                 />
//               )}
//             </div>
//           </button>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default EventsCategorySlider;


"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import { EVENT_FILTER_CATEGORIES } from "@/constants/eventsData";

const CARD_W = 176;
const SCROLL_AMOUNT = CARD_W * 5 + 12 * 5;

function toSlug(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const EventsCategorySlider = ({ onSelect, selectedCategory }) => {
  const scrollRef = useRef(null);
  const router = useRouter();

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: "smooth" });
  };

  const handleSelect = (cat) => {
    router.push(`/events/category/${toSlug(cat.label)}`);
  };

  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 t-12 lg:mt-16">
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <Typography variant="body2" className="uppercase tracking-widest mb-1">Browse by category</Typography>
          <Typography variant="sectionTitle">
            All <span className="text-gradient">Categories</span>
          </Typography>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-full border border-primary-border bg-sidebar-bg flex items-center justify-center text-muted-text hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <Icon name="ChevronLeft" width={18} height={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-full border border-primary-border bg-sidebar-bg flex items-center justify-center text-muted-text hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <Icon name="ChevronRight" width={18} height={18} />
          </button>
        </div>
      </div>

      {/* Scrollable card row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {EVENT_FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            type="button"
            onClick={() => handleSelect(cat)}
            className="flex-shrink-0 w-50 group text-left cursor-pointer"
            style={{ outline: "none" }}
          >
            <div
              className="relative rounded-2xl overflow-hidden transition-all duration-200 group-hover:scale-[1.02]"
              style={{ border: `1px solid ${cat.color}33` }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)" }}
                />
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity"
                  style={{ background: `radial-gradient(ellipse at bottom, ${cat.color}88 0%, transparent 70%)` }}
                />
                <div
                  className="absolute bottom-3 left-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.55)", border: `1.5px solid ${cat.color}` }}
                >
                  <Icon name={cat.icon} width={16} height={16} style={{ color: cat.color }} />
                </div>
              </div>

              {/* Text */}
              <div className="px-3 pt-3 pb-4 bg-sidebar-bg">
                <Typography variant="heading" className="!text-sm mb-1">{cat.label}</Typography>
                <p className="text-xs text-muted-text leading-snug mb-3 whitespace-pre-line">{cat.sub}</p>
                <p className="text-xs font-semibold flex items-center gap-1" style={{ color: cat.color }}>
                  {cat.count} Events <span className="text-sm"><Icon name="ArrowRight" width={16} height={16} /></span>
                </p>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: cat.color }}
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default EventsCategorySlider;