"use client";
import { useState } from "react";
import Icon from "../ui/Icon";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { Input, Select, Textarea, Label } from "../ui/FormField";
import { CONTACT_FAQS, CONTACT_SUBJECTS } from "@/constants/helpData";
import { cn } from "@/lib/utils";

const ContactForm = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="max-w-9xl mx-auto px-6 lg:px-10 xl:px-14 2xl:px-20 py-12">
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        {/* ── Left: form ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-6 lg:p-8">
          <Typography variant="heading2" className="mb-1">
            Send us a message
          </Typography>
          <Typography variant="body2" className="mb-6">
            Fill out the form below and we&apos;ll get back to you soon.
          </Typography>

          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                icon="User"
                placeholder="Your full name"
              />
              <Input
                label="Email Address"
                icon="Mail"
                placeholder="you@example.com"
                type="email"
              />
            </div>

            <Select label="Subject">
              <option value="">How can we help?</option>
              {CONTACT_SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>

            <Select label="Category">
              <option value="">Select a category</option>
              <option value="general">General Enquiry</option>
              <option value="billing">Billing & Payments</option>
              <option value="technical">Technical Issue</option>
              <option value="feedback">Feedback</option>
            </Select>

            <Textarea
              label="Message"
              placeholder="Type your message here..."
              rows={5}
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-xs text-muted-text hover:text-foreground-text transition-colors cursor-pointer"
              >
                <Icon name="Paperclip" width={14} height={14} />
                Add attachment (optional)
              </button>

              <Button
                icon="ArrowRight"
                size="lg"
                variant="primary"
                className="rounded-full px-8 "
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right: FAQ + Help Centre ───────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* FAQ */}
          <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-5">
            <Typography variant="sectionTitle" className="mb-4 font-bold">
              Frequently Asked Questions
            </Typography>

            <div className="flex flex-col gap-2">
              {CONTACT_FAQS.map((faq, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-xl border transition-all",
                    open === i ? "border-primary/30" : "border-white/[0.06]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10">
                      <Icon
                        name={faq.icon}
                        width={14}
                        height={14}
                        className="text-primary"
                      />
                    </div>
                    <span className="flex-1 text-sm text-foreground-text">
                      {faq.q}
                    </span>
                    <Icon
                      name={open === i ? "Minus" : "Plus"}
                      width={15}
                      height={15}
                      className="text-primary flex-shrink-0"
                    />
                  </button>
                  {open === i && (
                    <div className="px-4 pb-3 pl-[3.25rem] text-xs text-muted-text leading-relaxed">
                      Please{" "}
                      <span className="text-primary cursor-pointer">
                        contact our support team
                      </span>{" "}
                      for detailed assistance with this query.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Help Centre banner */}
          <div className="rounded-2xl border border-primary-border bg-sidebar-bg p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20 flex-shrink-0">
              <Icon
                name="BookOpen"
                width={26}
                height={26}
                className="text-primary"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Typography variant="sectionTitle" className="!text-sm mb-0.5">
                Looking for help with an event?
              </Typography>
              <Typography variant="body2">
                Visit our Help Centre for articles and guides.
              </Typography>
            </div>
          </div>
          <a href="/help">
            <Button
              variant="outline"
              icon="ArrowRight"
              className="w-full justify-center"
            >
              Go to Help Centre
            </Button>
          </a>
        </div>
      </div>

      {/* Bottom help centre banner */}
      <div className="mt-6 rounded-2xl border border-primary-border bg-sidebar-bg p-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20 flex-shrink-0">
          <Icon
            name="BookOpen"
            width={30}
            height={30}
            className="text-primary"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <Typography variant="sectionTitle" className="!text-base mb-1">
            Explore our Help Centre
          </Typography>
          <Typography variant="body2">
            Find answers to common questions, guides, and everything you need to
            know.
          </Typography>
        </div>
        <a href="/help">
          <Button
            variant="primary"
            icon="ArrowRight"
            size="lg"
            className="flex-shrink-0"
          >
            Visit Help Centre
          </Button>
        </a>
      </div>
    </section>
  );
};

export default ContactForm;
