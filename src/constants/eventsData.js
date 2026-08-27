export function getMoreEventsByHost(id, limit = 4) {
  return EVENTS_LIST.filter((e) => e.id !== id).slice(0, limit);
}
// Used by EventCategoryFilter pills AND EventsCategorySlider cards
export const EVENT_FILTER_CATEGORIES = [
  {
    label: "Music",
    icon: "Music",
    color: "#818CF8",
    sub: "Concerts, gigs\nand live shows",
    count: 128,
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Comedy",
    icon: "Smile",
    color: "#FB923C",
    sub: "Stand-up, improv\nand hilarious nights",
    count: 56,
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Arts & Culture",
    icon: "Palette",
    color: "#34D399",
    sub: "Exhibitions, museums\nand creative experiences",
    count: 92,
    image:
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Sports",
    icon: "Trophy",
    color: "#38BDF8",
    sub: "Games, matches\nand tournaments",
    count: 74,
    image:
      "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=849&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "Food & Drink",
    icon: "UtensilsCrossed",
    color: "#FBBF24",
    sub: "Foodies, tastings\nand night outs",
    count: 63,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Workshops",
    icon: "Lightbulb",
    color: "#F472B6",
    sub: "Learn, create\nand grow",
    count: 35,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Festivals",
    icon: "Sparkles",
    color: "#A78BFA",
    sub: "Outdoor stages\nand big crowds",
    count: 41,
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Theatre",
    icon: "Drama",
    color: "#E879F9",
    sub: "Stage shows\nand performances",
    count: 29,
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Nightlife",
    icon: "Moon",
    color: "#6366F1",
    sub: "Clubs, bars\nand late nights",
    count: 88,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Family",
    icon: "Baby",
    color: "#4ADE80",
    sub: "Kids, families\nand fun for all",
    count: 22,
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Wellness",
    icon: "Heart",
    color: "#F87171",
    sub: "Yoga, mindfulness\nand wellbeing",
    count: 18,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Business",
    icon: "Briefcase",
    color: "#94A3B8",
    sub: "Networking, talks\nand conferences",
    count: 31,
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Outdoors",
    icon: "TreePine",
    color: "#86EFAC",
    sub: "Hikes, markets\nand open-air events",
    count: 47,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
  },
];