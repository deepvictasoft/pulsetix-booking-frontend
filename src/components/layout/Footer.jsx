"use client";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import {
  FOOTER_ITEMS,
  SOCIAL_ITEMS,
  HOME_NAV_ITEM,
} from "@/constants/navigation";
import Typography from "../ui/Typography";

const Footer = () => {
  return (
    <footer className="bg-[#11202E] border-t border border-secondary-border px-8 lg:px-14 2xl:px-20">
      <div className="mx-auto pt-10 pb-4 lg:pt-14 lg:pb-6">
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
          <div className="max-w-xs">
            <Link href={HOME_NAV_ITEM.to} className="inline-block mb-4 text-gradient">
              {/* <Icon name="Logo" size="lg" /> */}
              PULSETIX
            </Link>
            <Typography variant="subtitle" className="text-primary-text">
              {" "}
              Bringing people together through unforgettable experiences.
            </Typography>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-10 sm:gap-16 lg:gap-24">
            {FOOTER_ITEMS.map((column) => (
              <FooterColumn
                key={column.heading}
                heading={column.heading}
                items={column.items}
              />
            ))}

            <div>
              <Typography variant="body2" as="h3" className="mb-4 text-gradient font-bold uppercase tracking-wide">
                Follow Us
              </Typography>
              <div className="flex gap-3">
                {SOCIAL_ITEMS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-primary-text hover:scale-110 transition-colors"
                  >
                    <Icon name={social.icon} width={16} height={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#454545] text-center">
          <p className="text-sm text-primary-text">
            © 2026 Pulsetix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const FooterColumn = ({ heading, items }) => {
  return (
    <div>
      <Typography variant="heading2" className="text-gradient mb-4 !text-sm uppercase tracking-wide">
        {heading}
      </Typography>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.to}
              className="text-sm text-primary-text hover:text-background transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
