"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/Icon";
import { Input, Label } from "@/components/ui/FormField";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Typography from "../ui/Typography";
import { registerBuyer } from "@/lib/buyer/authClient";

/* ── helpers ─────────────────────────────────────────── */
function PasswordStrength({ password }) {
  const len = password.length;
  if (!len) return null;

  const level = len < 6 ? 0 : len < 8 ? 1 : len < 12 ? 2 : 3;
  const labels = ["Too short", "Weak", "Good", "Strong"];
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
  ];
  const widths = ["w-1/4", "w-2/4", "w-3/4", "w-full"];

  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex-1 h-1 bg-secondary-border rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            colors[level],
            widths[level],
          )}
        />
      </div>
      <span className="text-[11px] text-muted-text">{labels[level]}</span>
    </div>
  );
}

/* ── Social button ───────────────────────────────────── */
function SocialBtn({ icon, label }) {
  return (
    <button
      type="button"
      className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border border-primary-border bg-white hover:bg-field-bg text-sm font-medium text-foreground-text transition-colors"
    >
      {/* inline SVG icons so we don't need extra deps */}
      {icon === "google" && (
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>
      )}
      {icon === "apple" && (
        <svg width="18" height="18" viewBox="0 0 814 1000">
          <path
            fill="#000"
            d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.2-58.1-155.7-127.3c-48.6-66.5-91.5-164.1-91.5-255.8 0-174.2 113.4-266.2 224.8-266.2 59.2 0 108.7 38.8 147 38.8 36.8 0 94.5-41.2 164.1-41.2 26.9 0 108.3 2.3 168.9 80.1zm-198.2-79.6c-28.2-32.8-44.7-78-44.7-123.2 0-6.4.4-12.8 1.3-19.1 44.3 1.7 98.1 29.5 131.4 67.3 26.1 30.1 44.7 74.4 44.7 120.3 0 6.7-.6 13.5-1.8 20-1.8.3-3.6.5-5.4.5-39.5 0-90.1-27-125.5-65.8z"
          />
        </svg>
      )}
      {label}
    </button>
  );
}

/* ── Main ────────────────────────────────────────────── */
export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    agreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (k) => (e) =>
    setForm((p) => ({
      ...p,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const full_name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();

    try {
      await registerBuyer({
        full_name,
        email: form.email.trim().toLowerCase(),
        mobile_number: form.mobileNumber.trim(),
        password: form.password,
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message ?? "Could not create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex mx-auto">
      {/* ── LEFT PANEL ─────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col overflow-hidden">
        {/* Hero image */}
        <img
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"
          alt="Concert crowd"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-8 xl:p-10">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-lg tracking-wide">
            PULSETIX
          </Link>

          {/* Centered content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Middle text */}
            <div className="mb-10">
              {/* Icon badge */}
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6">
                <Icon
                  name="UserPlus"
                  width={20}
                  height={20}
                  className="text-white"
                />
              </div>

              <h1 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
                Join the <span className="text-gradient">PulseTix</span>
                <br />
                Community
              </h1>

              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                Create your account and start exploring the world's best events.
              </p>
            </div>

            {/* Social proof */}
            <div className="mt-20 flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3 w-fit">
              <Icon
                name="Users"
                width={18}
                height={18}
                className="text-white/70"
              />
              <div>
                <p className="text-white font-semibold text-sm">500K+</p>
                <p className="text-white/60 text-xs">
                  Happy users already joined PulseTix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────── */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-white">
        {/* Scrollable content */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20 relative z-10">
          {/* Mobile logo */}
          <Link
            href="/"
            className="lg:hidden text-gradient font-bold text-lg tracking-wide mb-8 self-start"
          >
            PULSETIX
          </Link>

          {/* Heading */}
          <div className="w-full max-w-md mb-8">
            <Typography variant="heading2" className="flex items-center gap-2">
              Create Account
              <Icon name="Sparkles" size={20} className="text-primary" />
            </Typography>

            <Typography variant="body2" className="!text-sm mt-1">
              Sign up to get started
            </Typography>
          </div>

          {error ? (
            <div className="w-full max-w-md mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            {/* Name row */}
            <div className="flex gap-3">
              <Input
                label="FIRST NAME"
                placeholder="Deep"
                value={form.firstName}
                onChange={set("firstName")}
                required
                className="flex-1"
              />
              <Input
                label="LAST NAME"
                placeholder="Chikani"
                value={form.lastName}
                onChange={set("lastName")}
                required
                className="flex-1"
              />
            </div>

            {/* Email */}
            <Input
              label="EMAIL"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              required
              autoComplete="email"
            />

            {/* Mobile */}
            <Input
              label="MOBILE NUMBER"
              type="tel"
              placeholder="+35312345678"
              value={form.mobileNumber}
              onChange={set("mobileNumber")}
              required
              autoComplete="tel"
            />

            {/* Password */}
            <div>
              <Label>PASSWORD</Label>
              <input
                type="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={set("password")}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full h-11 rounded-xl border border-secondary-border bg-field-bg px-4 text-sm text-foreground-text placeholder:text-muted-text outline-none transition-all focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
              <PasswordStrength password={form.password} />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={set("agreed")}
                  required
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded border-2 border-primary-border peer-checked:border-primary peer-checked:bg-primary transition-colors flex items-center justify-center">
                  {form.agreed && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path
                        d="M1 3.5L3.5 6L8 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <Typography variant="body2">
                {" "}
                I agree to the pulsetix{" "}
                <Link
                  href="/terms-and-conditions"
                  className="text-primary hover:underline"
                >
                  terms & conditions
                </Link>
                .
              </Typography>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !form.agreed}
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "w-full rounded-xl disabled:opacity-60 disabled:cursor-not-allowed",
              )}
            >
              {loading ? "Creating account..." : "CREATE ACCOUNT"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-secondary-border" />
              <span className="text-xs text-muted-text font-medium">OR</span>
              <div className="flex-1 h-px bg-secondary-border" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <SocialBtn icon="google" label="Continue with Google" />
              <SocialBtn icon="apple" label="Continue with Apple" />
            </div>
          </form>

          {/* Login link */}
          <p className="w-full max-w-md mt-6 text-sm text-muted-text">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
