'use client';
import Icon from '../ui/Icon';
import Typography from '../ui/Typography';
import { TESTIMONIALS } from '@/constants/sectionsData';

const LovedBy = () => {
  return (
    <section className="mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 mt-12 lg:mt-16">
      <Typography variant="heading2" className="mb-8">
        Loved by <span className="text-gradient">Event Goers</span>
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.slice(0, 3).map((testimonial, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-secondary-border bg-sidebar-bg shadow-sm p-6 flex flex-col gap-5"
          >
            {/* Quote icon + text side by side */}
            <div className="flex items-start gap-5 flex-grow">
              <Icon name='Quotes' />
              <Typography variant="body2" className="text-sm text-foreground-text leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </Typography>
            </div>

            {/* Avatar + name + stars */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <Typography variant="sectionTitle" className="!text-sm font-semibold">
                  {testimonial.name}
                </Typography>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Icon name="Star" key={i} size={16} className="text-primary fill-primary" />    
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LovedBy;
