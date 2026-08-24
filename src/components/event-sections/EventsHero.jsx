import Typography from "../ui/Typography";

const EventsHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[320px]">
        <img
           src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80"
          alt="Crowd enjoying a live event in Dublin"
          className="absolute inset-0 w-full h-full object-cover"
        />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />

        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-center">
          <Typography variant="heading" className="mb-2 text-foreground-text">
            Events in <span className="text-gradient">Dublin</span>
          </Typography>

          <Typography variant="subtitle" className="max-w-[250px] lg:max-w-md text-foreground-text">
            Discover unforgettable experiences happening around you.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
