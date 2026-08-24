const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=80`;

export const WISHLIST_EVENTS = [
    { id: "imagine-dragons", image: img("photo-1470225620780-dba8ba36b745"), dateMonth: "OCT", dateDay: "15", title: "Imagine Dragons", subtitle: "Loom World Tour", venue: "Aviva Stadium, Dublin", time: "Wed, 15 Oct 2026 · 6:00 PM" },
    { id: "creamfields-dublin", image: img("photo-1516450360452-9312f5e86fc7"), dateMonth: "NOV", dateDay: "08", title: "Creamfields Dublin", subtitle: "Music Festival", venue: "Royal Hospital Kilmainham", time: "Sat, 8 Nov 2026 · 1:00 PM" },
    { id: "man-utd-vs-arsenal", image: img("photo-1459749411175-04bf5292ceea"), dateMonth: "DEC", dateDay: "05", title: "Manchester United vs Arsenal", subtitle: "Premier League", venue: "Aviva Stadium, Dublin", time: "Fri, 5 Dec 2026 · 8:00 PM" },
    { id: "electric-fields", image: img("photo-1470229722913-7c0e2dbbafd3"), dateMonth: "JAN", dateDay: "18", title: "Electric Fields", subtitle: "Winter Warm-Up", venue: "Marlay Park, Dublin", time: "Sun, 18 Jan 2027 · 5:00 PM" },
];
