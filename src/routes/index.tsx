import { createFileRoute } from "@tanstack/react-router";
import ContactForm from "../components/ContactForm";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Home,
  TrendingUp,
  Settings,
  Users,
  Globe,
  BarChart2,
  Handshake,
  MapPin,
  MessageSquare,
  Search,
  CheckCircle,
  Shield,
  Zap,
  Layers,
  MessageCircle,
  Phone,
  Mail,
  Star,
  Menu,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const BUSINESS_CONFIG = {
  phone: "+91 91483 38801",
  email: "zeid.easyfind@gmail.com",
  googleMapsUrl: "https://maps.app.goo.gl/Z211hsPcT1g9ZJ9U8",
  address: "A Block, Prestige Atlanta, 1, 80 Feet Rd, 3rd Block, Koramangala 8th Block, Bengaluru 560034",
  stats: {
    clients: "500+",
    rating: "4.9★",
    years: "5+",
    deals: "1000+",
  },
};

type Service = {
  icon: LucideIcon;
  name: string;
  desc: string;
  bullets: string[];
};

const SERVICES: Service[] = [
  {
    icon: Home,
    name: "Rental Services",
    desc: "Find the right tenant faster and close with confidence.",
    bullets: [
      "Tenant sourcing & qualified leads",
      "Property listing & marketing",
      "Site visit coordination",
      "Negotiation & deal closure",
      "Rental agreement support",
    ],
  },
  {
    icon: TrendingUp,
    name: "Property Sales (Buy & Sell)",
    desc: "Buy right or sell faster with the right strategy.",
    bullets: [
      "Buyer requirement understanding",
      "Verified property sourcing",
      "Property marketing for sellers",
      "Price negotiation support",
      "End-to-end deal closure",
    ],
  },
  {
    icon: Settings,
    name: "Property Management",
    desc: "Complete property care without the daily hassle.",
    bullets: [
      "Tenant management",
      "Rent collection & tracking",
      "Maintenance coordination",
      "Property inspections",
      "Owner updates & reporting",
    ],
  },
  {
    icon: Users,
    name: "Tenant Management",
    desc: "Hassle-free tenant handling from entry to exit.",
    bullets: [
      "Tenant onboarding & verification",
      "Rent follow-ups",
      "Issue resolution handling",
      "Renewal & exit coordination",
      "Owner communication",
    ],
  },
  {
    icon: Globe,
    name: "NRI Property Assistance",
    desc: "Manage your Bangalore property from anywhere.",
    bullets: [
      "End-to-end remote management",
      "Tenant handling & rent tracking",
      "Maintenance & repairs",
      "Legal & documentation support",
      "Regular owner updates",
    ],
  },
  {
    icon: BarChart2,
    name: "Investment Advisory",
    desc: "Make smarter property decisions with the right guidance.",
    bullets: [
      "High ROI opportunities",
      "Rental yield analysis",
      "Bangalore location insights",
      "Risk evaluation",
      "Long-term planning support",
    ],
  },
  {
    icon: Handshake,
    name: "End-to-End Support",
    desc: "Support at every step — from search to closure.",
    bullets: [
      "Documentation assistance",
      "Agreement support",
      "Negotiation guidance",
      "Coordination between parties",
      "Smooth transaction execution",
    ],
  },
  {
    icon: MapPin,
    name: "Relocation Assistance",
    desc: "Move to Bangalore with ease and clarity.",
    bullets: [
      "Area guidance & shortlisting",
      "Property shortlisting",
      "Virtual & physical tours",
      "Relocation coordination",
      "Local move-in assistance",
    ],
  },
];

const REVIEWS = [
  {
    text: "They are very helpful and professional. They showed us good flats and even negotiated the rent on our behalf. They ensured all the rules and regulations of the owners were easily communicated to us before the token payment. Highly recommend them.",
    name: "Rishabh Kejariwal",
  },
  {
    text: "Excellent brokerage service. Parvez, in particular, was extremely professional and guided us impeccably to make our premises rental process smooth and hassle-free. Everything was managed in a very short time.",
    name: "Randhir Singh",
  },
  {
    text: "Parvez helped us find a flat in just 2-3 days. He was able to pick exactly what we were looking for and showed us houses that met our criteria. Appreciate the quick service!",
    name: "Kirit",
  },
  {
    text: "I just moved to Bangalore from the USA. Finding an apartment here is no easy task! After meeting several realtors and seeing MANY apartments, fate led me to Ahmed. He showed me three places and the third one was perfect.",
    name: "Greenstar Goddess",
  },
];

const WHY_US = [
  { icon: MapPin, title: "Local Expertise in Bangalore", body: "Deep knowledge of Bangalore's micro-markets, localities, and pricing." },
  { icon: Shield, title: "Verified Clients & Genuine Requirements", body: "We work only with serious buyers, tenants, and owners." },
  { icon: Zap, title: "Fast Response & Quick Turnaround", body: "No waiting around — we respond fast and close faster." },
  { icon: Layers, title: "End-to-End Handling", body: "One team for the entire journey — no hand-offs, no confusion." },
  { icon: Settings, title: "Property Management Support", body: "We stay involved after the deal — managing your property long-term." },
  { icon: MessageCircle, title: "Transparent Communication", body: "You're always in the loop — no surprises, no hidden steps." },
];

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const NAVY = "#1A3A5C";
const GOLD = "#C9A84C";
const SURFACE = "#F8F9FB";
const TEXT = "#1A1A2E";
const MUTED = "#6B7280";
const BORDER = "#E5E7EB";

function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        scrollToId("#hero");
      }}
      className="flex items-center"
      aria-label="EasyFind Property Solutions home"
    >
      <span
        className="flex items-center justify-center overflow-hidden"
        style={{
          background: light ? "#ffffff" : "transparent",
          borderRadius: light ? 10 : 0,
          padding: light ? "6px 10px" : 0,
        }}
      >
        <img
          src="/easyfind-logo.jpg"
          alt="EasyFind Property Solutions"
          style={{ height: light ? 44 : 48, width: "auto", display: "block" }}
          loading="eager"
        />
      </span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 bg-white transition-shadow"
      style={{
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.href);
              }}
              className="text-sm font-medium transition-colors"
              style={{ color: NAVY }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, "")}`}
            aria-label="Call EasyFind"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: GOLD, color: NAVY }}
          >
            <Phone size={14} />
            Call
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-1.5"
            style={{ color: NAVY }}
          >
            <Menu size={26} />
          </button>
        </div>
        <a
          href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, "")}`}
          className="hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold md:inline-flex"
          style={{ background: GOLD, color: NAVY }}
        >
          <Phone size={16} />
          {BUSINESS_CONFIG.phone}
        </a>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <Logo />
            <button aria-label="Close menu" onClick={() => setOpen(false)} style={{ color: NAVY }}>
              <X size={26} />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  setTimeout(() => scrollToId(l.href), 50);
                }}
                className="text-2xl font-semibold"
                style={{ color: NAVY, borderBottom: `2px solid transparent` }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="mb-4 text-center text-xs font-semibold uppercase"
      style={{ color: GOLD, letterSpacing: "0.2em" }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      className="text-center font-bold tracking-tight"
      style={{
        color: light ? "#fff" : NAVY,
        fontFamily: "'Playfair Display', Inter, serif",
        fontSize: "clamp(28px, 4vw, 40px)",
        lineHeight: 1.15,
      }}
    >
      {children}
    </h2>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[90vh] items-center pt-24 md:pt-32" style={{ background: NAVY }}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:grid-cols-2 md:px-8">
        <div className="flex flex-col justify-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/90">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Bangalore's Trusted Property Partner
          </div>
          <h1
            className="font-bold text-white"
            style={{
              fontFamily: "'Playfair Display', Inter, serif",
              fontSize: "clamp(34px, 5.5vw, 60px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Find. Own. Manage.
            <br />
            <span style={{ color: GOLD }}>All Under One Roof.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
            From finding the right home to managing and selling your property, EasyFind Property Solutions handles it all across Bangalore. We help owners and clients move faster, avoid delays, and make the right decisions.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => scrollToId("#lead-form")}
              className="rounded-lg px-6 py-3 font-bold transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY }}
            >
              Talk to Us
            </button>
            <button
              onClick={() => scrollToId("#how-it-works")}
              className="rounded-lg px-6 py-3 font-semibold transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#fff", background: "transparent" }}
            >
              How It Works
            </button>
          </div>
        </div>
        <div className="md:pt-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function TrackRecord() {
  const stats = [
    { n: BUSINESS_CONFIG.stats.clients, l: "Happy Clients" },
    { n: BUSINESS_CONFIG.stats.rating, l: "Google Rating" },
    { n: BUSINESS_CONFIG.stats.years, l: "Years in Bangalore" },
    { n: BUSINESS_CONFIG.stats.deals, l: "Deals Closed" },
  ];
  return (
    <section id="track-record" className="py-16 md:py-24" style={{ background: SURFACE }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>Our Track Record</SectionLabel>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="mx-auto mb-3 h-px w-10" style={{ background: GOLD }} />
              <div
                className="font-extrabold"
                style={{ color: NAVY, fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                {s.n}
              </div>
              <div className="mt-2 text-sm md:text-base" style={{ color: MUTED }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:p-8">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 text-navy/40 hover:text-navy">
          <X size={24} />
        </button>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface text-navy">
          <service.icon size={28} />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-navy">{service.name}</h3>
        <p className="mt-3 text-muted leading-relaxed">{service.desc}</p>
        <div className="mt-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-navy/40">Key Deliverables</h4>
          <ul className="mt-4 space-y-3">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm font-medium text-navy/80">
                <CheckCircle size={18} className="mt-0.5 shrink-0 text-gold" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            onClose();
            scrollToId("#lead-form");
          }}
          className="mt-10 w-full rounded-xl bg-gold py-4 font-bold text-navy transition-transform hover:scale-[1.02]"
        >
          Enquire About This Service
        </button>
      </div>
    </div>
  );
}

function Services() {
  const [active, setActive] = useState<Service | null>(null);
  return (
    <section id="services" className="py-16 md:py-24" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>What We Do</SectionLabel>
        <SectionTitle>End-to-End Property Services</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base" style={{ color: MUTED }}>
          Everything you need — from finding a home to managing your investment.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.name}
                onClick={() => setActive(s)}
                className="group text-left rounded-xl bg-white p-6 transition-all hover:-translate-y-1"
                style={{
                  border: `1px solid ${BORDER}`,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,58,92,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)")}
                aria-label={`View details for ${s.name}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg" style={{ background: SURFACE, color: NAVY }}>
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-base font-bold" style={{ color: NAVY }}>{s.name}</h3>
                <p className="mt-2 text-sm" style={{ color: MUTED, lineHeight: 1.55 }}>{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: GOLD }}>
                  View Details <ArrowRight size={14} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {active && <ServiceModal service={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: MessageSquare, n: "01", t: "Share Your Requirement", b: "Tell us what you need — property type, area, budget, and timeline." },
    { icon: Search, n: "02", t: "We Understand Your Need", b: "Our team listens, asks the right questions, and maps a clear plan for you." },
    { icon: CheckCircle, n: "03", t: "We Handle Everything Till Closure", b: "From shortlisting and visits to negotiation, paperwork, and handover." },
  ];
  return (
    <section id="how-it-works" className="py-16 md:py-24" style={{ background: SURFACE }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>The Process</SectionLabel>
        <SectionTitle>Simple. Clear. Handled.</SectionTitle>
        <div className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16%] right-[16%] top-8 hidden h-px md:block"
            style={{ backgroundImage: `linear-gradient(to right, ${GOLD} 40%, transparent 40%)`, backgroundSize: "12px 1px", opacity: 0.4 }}
          />
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative text-center">
                <span
                  className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white"
                  style={{ border: `1px solid ${BORDER}`, color: NAVY }}
                >
                  <Icon size={26} />
                </span>
                <div className="mt-4 font-bold" style={{ color: GOLD, letterSpacing: "0.1em" }}>{s.n}</div>
                <h3 className="mt-1 text-lg font-bold" style={{ color: NAVY }}>{s.t}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm" style={{ color: MUTED, lineHeight: 1.6 }}>{s.b}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-choose-us" className="py-16 md:py-24" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>Why EasyFind</SectionLabel>
        <SectionTitle>Built on Trust. Driven by Results.</SectionTitle>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-x-10 md:gap-y-10">
          {WHY_US.map((w) => {
            const Icon = w.icon;
            return (
              <div key={w.title} className="flex gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: SURFACE, color: NAVY }}>
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-base font-bold" style={{ color: NAVY }}>{w.title}</h3>
                  <p className="mt-1 text-sm" style={{ color: MUTED, lineHeight: 1.6 }}>{w.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24" style={{ background: SURFACE }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>What Our Clients Say</SectionLabel>
        <SectionTitle>4.9★ Rating with 110+ Reviews</SectionTitle>
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-6 md:p-7"
              style={{ border: `1px solid ${BORDER}`, boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
            >
              <div className="flex gap-0.5" aria-label="5 star rating">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={16} fill={GOLD} stroke={GOLD} />
                ))}
              </div>
              <p className="mt-3 italic" style={{ color: MUTED, lineHeight: 1.65 }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-4">
                <div className="text-sm font-bold" style={{ color: NAVY }}>{r.name}</div>
                <div className="text-xs" style={{ color: MUTED }}>Google Review</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={BUSINESS_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors"
            style={{ border: `1.5px solid ${GOLD}`, color: NAVY, background: "transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GOLD;
              e.currentTarget.style.color = NAVY;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            View All Reviews on Google <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const handle = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="lead-form" className="py-16 md:py-24" style={{ background: NAVY }}>
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionTitle light>Tell Us What You&apos;re Looking For</SectionTitle>
        <p className="mt-3 text-center" style={{ color: "rgba(255,255,255,0.75)" }}>
          Fill in the form and our team will reach out shortly.
        </p>
        <form
          onSubmit={handle}
          className="mt-10 rounded-2xl bg-white p-6 md:p-8"
          style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.25)" }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-navy/40">Name</label>
              <input required name="name" className="rounded-lg border border-border bg-surface px-4 py-3 text-navy focus:border-gold focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-navy/40">Phone Number</label>
              <input required type="tel" name="phone" className="rounded-lg border border-border bg-surface px-4 py-3 text-navy focus:border-gold focus:outline-none" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-navy/40">Requirement Type</label>
              <select required name="requirement" className="rounded-lg border border-border bg-surface px-4 py-3 text-navy focus:border-gold focus:outline-none">
                <option>Looking to Rent</option>
                <option>Looking to Buy</option>
                <option>Looking to Sell</option>
                <option>Property Management</option>
                <option>Tenant Support</option>
                <option>Investment Advisory</option>
                <option>Relocation Help</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-navy/40">Preferred Location</label>
              <input name="location" placeholder="e.g. Koramangala, HSR Layout" className="rounded-lg border border-border bg-surface px-4 py-3 text-navy focus:border-gold focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-navy/40">Budget</label>
              <input name="budget" placeholder="e.g. ₹30,000/month or ₹80 Lakhs" className="rounded-lg border border-border bg-surface px-4 py-3 text-navy focus:border-gold focus:outline-none" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-navy/40">Additional Details</label>
              <textarea name="details" rows={3} placeholder="Anything else we should know?" className="rounded-lg border border-border bg-surface px-4 py-3 text-navy focus:border-gold focus:outline-none" />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-lg py-3.5 text-base font-bold transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY }}
          >
            Submit Requirement
          </button>
          {submitted && (
            <p className="mt-4 text-center text-sm font-medium" style={{ color: "#0a7f3f" }}>
              ✅ Thank you! We will get back to you shortly.
            </p>
          )}
          <p className="mt-4 text-center text-xs" style={{ color: MUTED }}>
            We will get back to you shortly. No spam. No sharing of your data.
          </p>
        </form>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>Get In Touch</SectionLabel>
        <SectionTitle>We're Just a Message Away</SectionTitle>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center" style={{ border: `1px solid ${BORDER}` }}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: SURFACE, color: NAVY }}>
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>Call Us</h3>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>Available 10 AM - 7 PM</p>
            <a href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, "")}`} className="mt-3 block font-bold" style={{ color: GOLD }}>{BUSINESS_CONFIG.phone}</a>
          </div>
          <div className="rounded-xl bg-white p-6 text-center" style={{ border: `1px solid ${BORDER}` }}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: SURFACE, color: NAVY }}>
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>Email Us</h3>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>We'll reply within 24h</p>
            <a href={`mailto:${BUSINESS_CONFIG.email}`} className="mt-3 block font-bold" style={{ color: GOLD }}>{BUSINESS_CONFIG.email}</a>
          </div>
          <div className="rounded-xl bg-white p-6 text-center" style={{ border: `1px solid ${BORDER}` }}>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: SURFACE, color: NAVY }}>
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>Visit Us</h3>
            <p className="mt-2 text-sm" style={{ color: MUTED }}>Koramangala, Bangalore</p>
            <a href={BUSINESS_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block font-bold" style={{ color: GOLD }}>View on Maps</a>
          </div>
        </div>
        <div className="mt-16 overflow-hidden rounded-2xl shadow-xl" style={{ border: `1px solid ${BORDER}` }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3888.312688467123!2d77.61629347576562!3d12.93877578737338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15229e6c1a61%3A0x26a05f018e301661!2sEasyFind%20Property%20Solutions!5e0!3m2!1sen!2sin!4v1720658700000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12" style={{ background: SURFACE, borderTop: `1px solid ${BORDER}` }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Logo />
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(l.href);
                }}
                className="text-sm font-medium transition-colors"
                style={{ color: NAVY }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row" style={{ borderColor: BORDER }}>
          <p className="text-sm" style={{ color: MUTED }}>
            © {new Date().getFullYear()} EasyFind Property Solutions. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: MUTED }}>
            Built with trust in Bangalore.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#C9A84C]/30 selection:text-[#1A3A5C]">
      <Nav />
      <Hero />
      <TrackRecord />
      <Services />
      <HowItWorks />
      <WhyUs />
      <Reviews />
      <LeadForm />
      <Contact />
      <Footer />
    </main>
  );
}
