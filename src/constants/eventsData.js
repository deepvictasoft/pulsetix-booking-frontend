import { deriveEventSchedule } from "@/lib/utils";

// Placeholder cards for the Events listing grid
// each event also carries a slugified `id`, used for the /events/[id] detail route
export const EVENTS_LIST = [
  {
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=500&q=80",
    category: "Live Music",
    title: "Sam Fender",
    id: "sam-fender",
    subtitle: "Live in Dublin",
    date: "3 Aug 2026 · 7:30 PM",
    venue: "3Arena, Dublin",
    price: "€55.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=500&q=80",
    category: "Festival",
    title: "Electric Fields",
    id: "electric-fields",
    subtitle: "Summer Festival",
    date: "9 Aug 2026 · 1:00 PM",
    venue: "Marlay Park, Dublin",
    price: "€49.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=500&q=80",
    category: "Comedy",
    title: "Comedy Night",
    id: "comedy-night",
    subtitle: "Stand-up Special",
    date: "12 Aug 2026 · 8:00 PM",
    venue: "Vicar St, Dublin",
    price: "€22.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    category: "Festival",
    title: "The Script",
    id: "the-script",
    subtitle: "Greatest Hits Tour",
    date: "15 Aug 2026 · 8:00 PM",
    venue: "3Arena, Dublin",
    price: "€65.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
    category: "Beach Party",
    title: "Reggae Sunday",
    id: "reggae-sunday",
    subtitle: "Beach Party",
    date: "17 Aug 2026 · 5:00 PM",
    venue: "Portmarnock Beach",
    price: "€19.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    category: "Nightlife",
    title: "Neon Nights",
    id: "neon-nights",
    subtitle: "Summer Club Series",
    date: "22 Aug 2026 · 10:00 PM",
    venue: "The Button Factory, Dublin",
    price: "€15.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=500&q=80",
    category: "Food & Drink",
    title: "Dublin Food Fest",
    id: "dublin-food-fest",
    subtitle: "Taste the City",
    date: "24 Aug 2026 · 12:00 PM",
    venue: "St Stephen's Green, Dublin",
    price: "€12.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=500&q=80",
    category: "Arts & Culture",
    title: "Modern Art",
    id: "modern-art",
    subtitle: "Exhibition Opening",
    date: "28 Aug 2026 · 6:00 PM",
    venue: "IMMA, Dublin",
    price: "€10.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=500&q=80",
    category: "Live Music",
    title: "Wild Waves Fest",
    id: "wild-waves-fest",
    subtitle: "Coastal Concert Series",
    date: "2 Sep 2026 · 6:30 PM",
    venue: "Bray Seafront, Dublin",
    price: "€38.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=500&q=80",
    category: "Nightlife",
    title: "Rooftop Sessions",
    id: "rooftop-sessions",
    subtitle: "City Skyline Party",
    date: "4 Sep 2026 · 9:00 PM",
    venue: "The Marker Hotel, Dublin",
    price: "€28.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=500&q=80",
    category: "Live Music",
    title: "Indie Nights",
    id: "indie-nights",
    subtitle: "New Wave Showcase",
    date: "6 Sep 2026 · 8:00 PM",
    venue: "Whelan's, Dublin",
    price: "€18.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?auto=format&fit=crop&w=500&q=80",
    category: "Live Music",
    title: "Jazz on the Quay",
    id: "jazz-on-the-quay",
    subtitle: "Riverside Sessions",
    date: "8 Sep 2026 · 7:00 PM",
    venue: "Bord Gáis Energy Theatre, Dublin",
    price: "€32.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=500&q=80",
    category: "Comedy",
    title: "Open Mic Comedy",
    id: "open-mic-comedy",
    subtitle: "New Talent Night",
    date: "10 Sep 2026 · 8:30 PM",
    venue: "The Sugar Club, Dublin",
    price: "€8.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1696264615104-5e5c76ebd386?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Nightlife",
    title: "Techno Underground",
    id: "techno-underground",
    subtitle: "Warehouse Rave",
    date: "12 Sep 2026 · 11:00 PM",
    venue: "Wigwam, Dublin",
    price: "€25.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=500&q=80",
    category: "Sports",
    title: "Dublin Marathon Party",
    id: "dublin-marathon-party",
    subtitle: "Finish Line Celebration",
    date: "14 Sep 2026 · 2:00 PM",
    venue: "Merrion Square, Dublin",
    price: "Free",
  },
  {
    image:
      "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=500&q=80",
    category: "Food & Drink",
    title: "Craft Beer Fest",
    id: "craft-beer-fest",
    subtitle: "Tasting & Live Music",
    date: "16 Sep 2026 · 3:00 PM",
    venue: "RDS Arena, Dublin",
    price: "€20.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80",
    category: "Arts & Culture",
    title: "Poetry Slam",
    id: "poetry-slam",
    subtitle: "Spoken Word Night",
    date: "18 Sep 2026 · 7:30 PM",
    venue: "Smock Alley Theatre, Dublin",
    price: "€9.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=500&q=80",
    category: "Nightlife",
    title: "Silent Disco",
    id: "silent-disco",
    subtitle: "Three Channel Party",
    date: "20 Sep 2026 · 9:30 PM",
    venue: "Fumbally Exchange, Dublin",
    price: "€16.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=500&q=80",
    category: "Arts & Culture",
    title: "Retro Cinema Night",
    id: "retro-cinema-night",
    subtitle: "Classic Film Screening",
    date: "22 Sep 2026 · 8:00 PM",
    venue: "Light House Cinema, Dublin",
    price: "€11.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1778587614913-6da39ec4012a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Food & Drink",
    title: "Street Food Carnival",
    id: "street-food-carnival",
    subtitle: "Global Flavours",
    date: "24 Sep 2026 · 12:00 PM",
    venue: "Smithfield Square, Dublin",
    price: "€14.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=500&q=80",
    category: "Live Music",
    title: "Battle of the Bands",
    id: "battle-of-the-bands",
    subtitle: "Local Talent Contest",
    date: "26 Sep 2026 · 7:00 PM",
    venue: "Academy, Dublin",
    price: "€13.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=500&q=80",
    category: "Arts & Culture",
    title: "Gospel Choir Live",
    id: "gospel-choir-live",
    subtitle: "Voices of Dublin",
    date: "28 Sep 2026 · 6:00 PM",
    venue: "Christ Church Cathedral, Dublin",
    price: "€17.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    category: "Arts & Culture",
    title: "Vinyl Fair",
    id: "vinyl-fair",
    subtitle: "Record Collectors Market",
    date: "30 Sep 2026 · 11:00 AM",
    venue: "Rediscovery Centre, Dublin",
    price: "€5.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=500&q=80",
    category: "Comedy",
    title: "Improv Showdown",
    id: "improv-showdown",
    subtitle: "Unscripted Comedy",
    date: "2 Oct 2026 · 8:00 PM",
    venue: "International Bar, Dublin",
    price: "€12.00",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1669050940658-c84fe8bbd98c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Beach Party",
    title: "Sunset Sessions",
    id: "sunset-sessions",
    subtitle: "Chillout Beach Set",
    date: "4 Oct 2026 · 6:00 PM",
    venue: "Dollymount Strand, Dublin",
    price: "€21.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    category: "Live Music",
    title: "Winter Warmer Gig",
    id: "winter-warmer-gig",
    subtitle: "Acoustic Fireside Set",
    date: "6 Oct 2026 · 7:30 PM",
    venue: "The Grand Social, Dublin",
    price: "€19.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=500&q=80",
    category: "Comedy",
    title: "Comedy Roast Night",
    id: "comedy-roast-night",
    subtitle: "Roast the Headliner",
    date: "8 Oct 2026 · 9:00 PM",
    venue: "Vicar St, Dublin",
    price: "€24.00",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664367985837-923430cfb913?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Live Music",
    title: "Folk & Fire",
    id: "folk-fire",
    subtitle: "Traditional Irish Session",
    date: "10 Oct 2026 · 7:00 PM",
    venue: "The Cobblestone, Dublin",
    price: "€15.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1508973379184-7517410fb0bc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Nightlife",
    title: "Hip Hop Cypher",
    id: "hip-hop-cypher",
    subtitle: "Freestyle Battle Night",
    date: "12 Oct 2026 · 10:00 PM",
    venue: "The Workman's Club, Dublin",
    price: "€17.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Arts & Culture",
    title: "Chamber Orchestra",
    id: "chamber-orchestra",
    subtitle: "Evening of Classics",
    date: "14 Oct 2026 · 7:30 PM",
    venue: "National Concert Hall, Dublin",
    price: "€35.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&q=80",
    category: "Nightlife",
    title: "K-Pop Night",
    id: "k-pop-night",
    subtitle: "Dance Party Special",
    date: "16 Oct 2026 · 9:00 PM",
    venue: "The Academy, Dublin",
    price: "€20.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=500&q=80",
    category: "Food & Drink",
    title: "Drag Brunch",
    id: "drag-brunch",
    subtitle: "Cabaret & Cocktails",
    date: "18 Oct 2026 · 1:00 PM",
    venue: "Pantibar, Dublin",
    price: "€30.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&w=500&q=80",
    category: "Live Music",
    title: "Trad Music Session",
    id: "trad-music-session",
    subtitle: "Traditional Irish Night",
    date: "20 Oct 2026 · 8:00 PM",
    venue: "O'Donoghue's, Dublin",
    price: "€10.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?auto=format&fit=crop&w=500&q=80",
    category: "Arts & Culture",
    title: "Cabaret Nights",
    id: "cabaret-nights",
    subtitle: "Vintage Variety Show",
    date: "22 Oct 2026 · 8:30 PM",
    venue: "The Sugar Club, Dublin",
    price: "€26.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=500&q=80",
    category: "Nightlife",
    title: "Latin Dance Party",
    id: "latin-dance-party",
    subtitle: "Salsa & Bachata Social",
    date: "24 Oct 2026 · 9:00 PM",
    venue: "Wigwam, Dublin",
    price: "€14.00",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1738016969350-a4e9ce1c1bcd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Food & Drink",
    title: "Beer Garden Sessions",
    id: "beer-garden-sessions",
    subtitle: "Live Music & Craft Beer",
    date: "26 Oct 2026 · 4:00 PM",
    venue: "The Barge, Dublin",
    price: "€12.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516575334481-f85287c2c82d?auto=format&fit=crop&w=500&q=80",
    category: "Live Music",
    title: "Acoustic Sundays",
    id: "acoustic-sundays",
    subtitle: "Unplugged Evening",
    date: "28 Oct 2026 · 6:00 PM",
    venue: "Bello Bar, Dublin",
    price: "€9.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=500&q=80",
    category: "Arts & Culture",
    title: "Vintage Market & Music",
    id: "vintage-market-music",
    subtitle: "Retro Fair",
    date: "30 Oct 2026 · 11:00 AM",
    venue: "Point Square, Dublin",
    price: "€6.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=500&q=80",
    category: "Family",
    title: "Fireworks Festival",
    id: "fireworks-festival",
    subtitle: "Autumn Lights Show",
    date: "1 Nov 2026 · 7:00 PM",
    venue: "Phoenix Park, Dublin",
    price: "€8.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=500&q=80",
    category: "Arts & Culture",
    title: "Comic Con Meetup",
    id: "comic-con-meetup",
    subtitle: "Pop Culture Expo",
    date: "3 Nov 2026 · 10:00 AM",
    venue: "RDS Arena, Dublin",
    price: "€23.00",
  },
];


function toNumber(price) {
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

function toPrice(value) {
  return `€${value.toFixed(2)}`;
}

/**
 * Builds the full set of fields the detail page (/events/[id]) needs from a
 * base EVENTS_LIST entry - ticket tiers, schedule, gallery, host, etc.
 */
export function getEventDetail(id) {
  const event = EVENTS_LIST.find((e) => e.id === id);
  if (!event) return null;

  const schedule = deriveEventSchedule(event.date);
  const basePrice = toNumber(event.price);
  const venueName = event.venue.split(",")[0].trim();

  return {
    ...event,
    category: event.category,
    about: `Join us for ${event.title} — ${event.subtitle.toLowerCase()}. Expect a full evening of entertainment at one of Dublin's best-loved venues, with easy transport links and a great atmosphere for all attendees.`,
    schedule,
    venueName,
    venueAddress: `${event.venue}, Ireland`,
    gallery: [
      "https://www.image2url.com/r2/default/videos/1785913083594-07bdbe20-9254-40f5-9344-45fe2344d854.mp4",
      event.image,
      ...EVENTS_LIST.filter((e) => e.id !== id)
        .slice(0, 10)
        .map((e) => e.image),
    ],
    host: {
      name: venueName,
      website: "#",
      contact: "#",
    },
    ticketTiers: [
      { id: "adult", label: "Adult (16+)", price: toPrice(basePrice) },
      {
        id: "child",
        label: "Child (4-15)",
        price: toPrice(+(basePrice * 0.6).toFixed(2)),
      },
      {
        id: "family",
        label: "Family (2 Adults + 2 Children)",
        price: toPrice(+(basePrice * 2.6).toFixed(2)),
      },
      {
        id: "senior",
        label: "Senior (60+)",
        price: toPrice(+(basePrice * 0.75).toFixed(2)),
      },
    ],
  };
}

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