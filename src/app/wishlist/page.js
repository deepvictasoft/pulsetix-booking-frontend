import Typography from "@/components/ui/Typography";
import TicketCard from "@/components/ui/TicketCard";
import { WISHLIST_EVENTS } from "@/constants/wishlistData";

export default function WishlistPage() {
  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 py-8 sm:py-10">
      <Typography variant="heading2">Wishlist</Typography>
      <Typography variant="subtitle" className="mt-1 mb-1">
        Events you've saved
      </Typography>
      <Typography variant="body2" className="mb-6">{WISHLIST_EVENTS.length} events</Typography>

      {WISHLIST_EVENTS.length === 0 ? (
        <div className="border border-dashed border-secondary-border rounded-2xl py-16 text-center">
          <Typography variant="body2">You haven't saved any events yet.</Typography>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WISHLIST_EVENTS.map((event) => (
            <TicketCard key={event.id} event={event} variant="wishlist" />
          ))}
        </div>
      )}
    </section>
  );
}
