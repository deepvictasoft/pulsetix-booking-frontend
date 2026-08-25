'use client';
import Dropdown from "../ui/Dropdown";
import DatePickerDropdown from "../ui/DatePickerDropdown";
import Icon from "../ui/Icon";

const LOCATIONS = [
    "All Locations",
    "3Arena, Dublin",
    "Academy, Dublin",
    "Bello Bar, Dublin",
    "Bord Gáis Energy Theatre, Dublin",
    "Bray Seafront, Dublin",
    "Christ Church Cathedral, Dublin",
    "Dollymount Strand, Dublin",
    "Fumbally Exchange, Dublin",
    "IMMA, Dublin",
    "International Bar, Dublin",
    "Light House Cinema, Dublin",
    "Marlay Park, Dublin",
    "Merrion Square, Dublin",
    "National Concert Hall, Dublin",
    "Phoenix Park, Dublin",
    "Portmarnock Beach",
    "RDS Arena, Dublin",
    "Vicar Street, Dublin",
];

const CATEGORIES = [
    "All Categories",
    "Live Music",
    "Comedy",
    "Arts & Culture",
    "Sports",
    "Food & Drink",
    "Festival",
    "Beach Party",
    "Nightlife",
    "Family",
];

const PRICES = [
    "Any Price",
    "Free",
    "Under €15",
    "Under €30",
    "Under €50",
    "€50+",
];

const EventFilters = ({ filters, onChange }) => {
    const { location, date, price } = filters;

    const set = (key) => (val) => onChange({ ...filters, [key]: val });

    const activeCount = [
        location !== "All Locations",
        !!date,
        price !== "Any Price",
    ].filter(Boolean).length;

    const clearAll = () =>
        onChange({ ...filters, location: "All Locations", date: null, price: "Any Price" });

    return (
        <section className="max-w-9xl mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-8 lg:mt-10">
            <div className="flex flex-wrap items-center gap-3">
                <Dropdown
                    icon="MapPin"
                    label="All Locations"
                    options={LOCATIONS}
                    value={location}
                    onChange={set("location")}
                    defaultValue="All Locations"
                />
                <DatePickerDropdown
                    value={date}
                    onChange={set("date")}
                />
                <Dropdown
                    icon="Tag"
                    label="Any Price"
                    options={PRICES}
                    value={price}
                    onChange={set("price")}
                    defaultValue="Any Price"
                />

                {activeCount > 0 && (
                    <button
                        type="button"
                        onClick={clearAll}
                        className="inline-flex items-center bg-sidebar-bg gap-1.5 h-10 px-3 rounded-2xl text-sm text-muted-text hover:text-foreground-text border border-primary-border hover:border-primary/40 transition-all cursor-pointer"
                    >
                        <Icon name="X" width={13} height={13} />
                        Clear all
                        <span className="ml-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-semibold">
                            {activeCount}
                        </span>
                    </button>
                )}
            </div>
        </section>
    );
};

export default EventFilters;
export { LOCATIONS, CATEGORIES, PRICES };