import Icon from "../ui/Icon";
import { HELP_CATEGORIES } from "@/constants/helpData";
import Typography from "../ui/Typography";

const HelpCategories = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {HELP_CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            type="button"

            className="text-left rounded-2xl p-5 transition-all duration-200 cursor-pointer group bg-sidebar-bg border border-secondary-border hover:border-primary/40 hover:shadow-[0_0_16px_rgba(45,212,191,0.13)]"
          >
            {/* Icon circle */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-primary/10"
            >
              <Icon name={cat.icon} width={22} height={22} className="text-primary" />
            </div>

            <Typography variant="body" className="!text-sm font-bold mb-1.5">{cat.label}</Typography>
            <Typography variant="body2" className="mb-4">{cat.desc}</Typography>
            
            <p className="text-xs font-semibold flex items-center gap-1 text-primary">
              {cat.count} articles <Icon name="ArrowRight" width={14} height={14} />
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default HelpCategories;
