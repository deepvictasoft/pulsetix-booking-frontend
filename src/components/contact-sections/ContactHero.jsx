import Link from "next/link";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import { CONTACT_CHANNELS, CONTACT_TRUST } from "@/constants/helpData";
import Image from "next/image";
import headphone from "@/assets/headphone.png";

const ContactHero = () => {
  return (
    <section className="relative overflow-hidden bg-background px-6 lg:px-10 xl:px-14 2xl:px-20">

      <div className="relative max-w-9xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-4">
            Contact Us
          </p>
          <Typography variant="heading" className="mb-4">
            We&apos;re here to <span className="text-primary">help.</span>
          </Typography>
          <Typography variant="subtitle" className="mb-8 max-w-sm">
            Got a question, feedback or need support? Our team is ready to
            assist you.
          </Typography>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-6 mb-10">
            {CONTACT_TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20">
                  <Icon
                    name={t.icon}
                    width={15}
                    height={15}
                    className="text-primary"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-text leading-none mb-0.5">
                    {t.label}
                  </p>
                  <p className="text-xs text-muted-text">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <Image
            src={headphone}
            alt="Contact Hero"
            className="w-full h-full object-contain"
             priority
          />
        </div>
      </div>

      {/* Channel cards */}
      <div className="grid grid-cols-4 gap-3 mt-10">
        {CONTACT_CHANNELS.map((ch) => (
          <div
            key={ch.title}
            className="rounded-2xl border border-primary-border bg-sidebar-bg p-4 flex gap-3"
          >
            {/* Icon */}
            <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20">
              <Icon
                name={ch.icon}
                width={18}
                height={18}
                className="text-primary"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0 h-full">
              <div>
                <Typography variant="sectionTitle" className="!text-sm mb-1">
                  {ch.title}
                </Typography>

                <Typography variant="body2">{ch.desc}</Typography>
              </div>

              {ch.action && (
                <div className="flex items-center justify-between mt-auto mt-3">
                  {ch.href ? (
                    <Link
                      href={ch.href}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      {ch.action}
                    </Link>
                  ) : (
                    <span className="text-xs font-semibold text-primary">
                      {ch.action}
                    </span>
                  )}

                  <div className="w-7 h-7 shrink-0 rounded-full border border-primary-border flex items-center justify-center">
                    <Icon
                      name="ArrowRight"
                      width={13}
                      height={13}
                      className="text-muted-text"
                    />
                  </div>
                </div>
              )}

              {!ch.action && (
                <div className="flex justify-end mt-3">
                  <div className="w-7 h-7 shrink-0 rounded-full border border-primary-border flex items-center justify-center">
                    <Icon
                      name="ArrowRight"
                      width={13}
                      height={13}
                      className="text-muted-text"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactHero;
