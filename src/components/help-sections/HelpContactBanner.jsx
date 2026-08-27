import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { Link } from "lucide-react";

const HelpContactBanner = () => {
  return (
    <section className="mx-auto px-6 lg:px-10 pb-16">
      <div
        className="relative flex flex-col sm:flex-row items-center gap-6 rounded-2xl px-8 py-8 overflow-hidden bg-white"
      >
        {/* Headphone illustration */}
        <div
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 bg-primary/10"
        >
          <Icon
            name="Headphones"
            width={40}
            height={40}
            className="text-primary"
          />
        </div>

        <div className="relative flex-1 text-center sm:text-left">
          <Typography variant="sectionTitle" className="mb-1">
            Can&apos;t find what you&apos;re looking for?
          </Typography>

          <Typography variant="subtitle">
            Our support team is here to help you.
          </Typography>
        </div>
       <a href="/contact">
        <Button
          variant="primary"
          icon="ArrowRight"
          iconPosition="right"
          className="relative flex-shrink-0"
        >
          Contact Support
        </Button>
        </a>
      </div>
    </section>
  );
};

export default HelpContactBanner;
