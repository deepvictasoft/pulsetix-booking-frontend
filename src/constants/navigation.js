export const HOME_NAV_ITEM = { label: "Home", to: "/" };

// Items shown inside the Sidebar (hamburger dropdown)
export const NAV_ITEMS = [
    { label: "Events", to: "/events", icon: "PartyPopper" },
];

export const AUTH_NAV_ITEM = { label: "Login / Signup", to: "/login" };
export const GET_APP_ITEM = { label: "Get App", to: "/get-app" };

export const IS_LOGGED_IN = true; // TODO: wire to real auth state

// Second group inside the Sidebar (hamburger dropdown), below NAV_ITEMS
export const ACCOUNT_NAV_ITEMS = [
    { label: "Wishlist", to: "/wishlist", icon: "Heart" },
    { label: "My Events", to: "/my-events", icon: "Ticket" },
    { label: "Notifications", to: "/notifications", icon: "Bell", badge: 2 },
    { label: "Account & Settings", to: "/settings", icon: "Settings" },
];

export const HELP_NAV_ITEM = { label: "Help & Support", to: "/help", icon: "HelpCircle" };
export const LOGOUT_NAV_ITEM = { label: "Logout", to: "/logout", icon: "LogOut" };

// Mock signed-in user shown at the top of the Sidebar / Settings pages.
// Swap for real auth data once wired to the backend.
export const CURRENT_USER = {
    initials: "JD",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    emailVerified: true,
    phone: "+353 87 123 4567",
    countryCode: "IE",
    dob: "04 Aug, 2010",
    gender: "Male",
    location: "Dublin, Ireland",
    about: "Live for music and good vibes.",
    social: {
        youtube: "youtube.com/johndoe",
        instagram: "instagram.com/johndoe",
        linkedin: "linkedin.com/in/johndoe",
        facebook: "facebook.com/johndoe",
        twitter: "x.com/johndoe",
    },
};

// Left-hand tab list on the /settings page
export const SETTINGS_TABS = [
    { key: "general", label: "General", icon: "User" },
    { key: "security", label: "Security", icon: "Shield" },
    { key: "privacy", label: "Privacy", icon: "Lock" },
    { key: "notifications", label: "Notifications", icon: "Bell" },
    { key: "connected-accounts", label: "Connected Accounts", icon: "Link2" },
    { key: "payments", label: "Payments", icon: "CreditCard" },
    { key: "preferences", label: "Preferences", icon: "Palette" },
];

export const FOOTER_ITEMS = [
    {
        heading: "Explore",
        items: [
            { label: "Events", to: "/events" },
            { label: "Competitions", to: "/competitions" },
        ],
    },
    {
        heading: "Organise",
        items: [
            { label: "Become an Organiser", to: "/become-organiser" },
            { label: "Log in / Signup", to: "/signup" },
            { label: "Get the App", to: "/get-app" },
        ],
    },
    {
        heading: "Support",
        items: [
            { label: "Help", to: "/help" },
            { label: "Contact Support", to: "/contact" },
            { label: "Terms & Conditions", to: "/terms-and-conditions" },
            { label: "Privacy Policy", to: "/privacy-policy" },
        ],
    },
];

export const SOCIAL_ITEMS = [
    { label: "Facebook", icon: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", icon: "TikTok", href: "https://tiktok.com" },
    { label: "Instagram", icon: "Instagram", href: "https://instagram.com" },
    { label: "Linkedin", icon: "Linkedin", href: "https://linkedin.com" },
];