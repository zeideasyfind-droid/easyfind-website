import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";
import { submitLead } from "../lib/submitLead";
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
  CheckCircle2,
  Building,
  Calculator,
  HelpCircle,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const BUSINESS_CONFIG = {
  phone: "+91 91483 38801",
  email: "info@easyfindprops.com",
  googleMapsUrl: "https://maps.app.goo.gl/Z211hsPcT1g9ZJ9U8",
  address:
    "A Block, Prestige Atlanta, 1, 80 Feet Rd, 3rd Block, Koramangala 8th Block, Bengaluru 560034",
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
  {
    icon: MapPin,
    title: "Local Expertise in Bangalore",
    body: "Deep knowledge of Bangalore's micro-markets, localities, and pricing.",
  },
  {
    icon: Shield,
    title: "Verified Clients & Genuine Requirements",
    body: "We work only with serious buyers, tenants, and owners.",
  },
  {
    icon: Zap,
    title: "Fast Response & Quick Turnaround",
    body: "No waiting around — we respond fast and close faster.",
  },
  {
    icon: Layers,
    title: "End-to-End Handling",
    body: "One team for the entire journey — no hand-offs, no confusion.",
  },
  {
    icon: Settings,
    title: "Property Management Support",
    body: "We stay involved after the deal — managing your property long-term.",
  },
  {
    icon: MessageCircle,
    title: "Transparent Communication",
    body: "You're always in the loop — no surprises, no hidden steps.",
  },
];

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "East Bangalore Hotspots", href: "#east-bangalore" },
  { label: "Yield Calculator", href: "#yield-calculator" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const NAVY = "#1A3A5C";
export const GOLD = "#C9A84C";
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
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>EasyFind Property Solutions | Bangalore's Trusted Property Partner</title>
        <meta
          name="description"
          content="Bangalore's most trusted property partner for rental services, sales, management, and NRI assistance. Find, own, and manage properties with ease."
        />
        <meta
          name="keywords"
          content="Bangalore real estate, property management Bangalore, rental services Bangalore, NRI property assistance, buy sell property Bangalore"
        />
        <meta
          property="og:title"
          content="EasyFind Property Solutions | Bangalore's Trusted Property Partner"
        />
        <meta
          property="og:description"
          content="Find. Own. Manage. All under one roof. Expert property services across Bangalore."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://easyfindproperties.in" />
      </Helmet>
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
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `1px solid ${BORDER}` }}
            >
              <Logo />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                style={{ color: NAVY }}
              >
                <X size={26} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8 px-5">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => scrollToId(l.href), 50);
                  }}
                  className="w-full text-center text-2xl font-semibold py-2"
                  style={{ color: NAVY, borderBottom: `2px solid transparent` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, "")}`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-lg font-bold shadow-lg"
                style={{ background: GOLD, color: NAVY }}
                onClick={() => setOpen(false)}
              >
                <Phone size={20} />
                {BUSINESS_CONFIG.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
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
    <section
      id="hero"
      className="relative flex min-h-[90vh] items-center pt-24 md:pt-32"
      style={{ background: NAVY }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-2 md:px-8">
        <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
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
          <p
            className="mt-5 max-w-xl text-base md:text-lg"
            style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}
          >
            From finding the right home to managing and selling your property, EasyFind Property
            Solutions handles it all across Bangalore. We help owners and clients move faster, avoid
            delays, and make the right decisions.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <button
              onClick={() => scrollToId("#lead-form")}
              className="rounded-lg px-8 py-4 text-base font-bold shadow-lg transition-transform hover:-translate-y-1"
              style={{ background: GOLD, color: NAVY }}
            >
              Talk to Us
            </button>
            <button
              onClick={() => scrollToId("#how-it-works")}
              className="rounded-lg border-2 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              How It Works
            </button>
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
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
    <section className="py-12 md:py-16" style={{ background: SURFACE }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>Our Track Record</SectionLabel>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="mx-auto mb-3 h-px w-10" style={{ background: GOLD }} />
              <div
                className="font-extrabold"
                style={{
                  color: NAVY,
                  fontSize: "clamp(32px, 4vw, 48px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.n}
              </div>
              <div className="mt-2 text-sm md:text-base" style={{ color: MUTED }}>
                {s.l}
              </div>
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
    <>
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ background: "rgba(26, 58, 92, 0.6)" }}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-2xl bg-white p-6 shadow-2xl md:p-8 pointer-events-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-navy/40 hover:text-navy"
          >
            <X size={24} />
          </button>
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface text-navy">
            <service.icon size={28} />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-navy">{service.name}</h3>
          <p className="mt-3 text-muted leading-relaxed">{service.desc}</p>
          <div className="mt-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy/40">
              Key Deliverables
            </h4>
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
    </>
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,58,92,0.12)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)")
                }
                aria-label={`View details for ${s.name}`}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ background: SURFACE, color: NAVY }}
                >
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-base font-bold" style={{ color: NAVY }}>
                  {s.name}
                </h3>
                <p className="mt-2 text-sm" style={{ color: MUTED, lineHeight: 1.55 }}>
                  {s.desc}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: GOLD }}
                >
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
    {
      icon: MessageSquare,
      n: "01",
      t: "Share Your Requirement",
      b: "Tell us what you need — property type, area, budget, and timeline.",
    },
    {
      icon: Search,
      n: "02",
      t: "We Understand Your Need",
      b: "Our team listens, asks the right questions, and maps a clear plan for you.",
    },
    {
      icon: CheckCircle,
      n: "03",
      t: "We Handle Everything Till Closure",
      b: "From shortlisting and visits to negotiation, paperwork, and handover.",
    },
  ];
  return (
    <section id="how-it-works" className="py-16 md:py-24" style={{ background: SURFACE }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>The Process</SectionLabel>
        <SectionTitle>Simple. Clear. Handled.</SectionTitle>
        <div className="relative mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative z-10 flex flex-col items-center text-center">
                <div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg"
                  style={{ background: "#fff", color: GOLD }}
                >
                  <Icon size={32} />
                </div>
                <div className="mb-2 text-sm font-bold" style={{ color: GOLD }}>
                  {s.n}
                </div>
                <h3 className="mb-3 text-xl font-bold" style={{ color: NAVY }}>
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  {s.b}
                </p>
                {idx < 2 && (
                  <div className="absolute left-full top-10 hidden w-full border-t-2 border-dashed border-gray-200 lg:block" />
                )}
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
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w) => {
            const Icon = w.icon;
            return (
              <div key={w.title} className="flex gap-5">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: SURFACE, color: GOLD }}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: NAVY }}>
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                    {w.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type Cluster = {
  id: string;
  name: string;
  positioning: string;
  localities: string[];
  anchors: string[];
  brokerNote: string;
  span: string; // asymmetric bento sizing
};

// NOTE: Rent scenarios, demand profile, yield estimates and broker feedback
// are intentionally left as placeholders. Cluster names, locality groupings
// and anchors are structural — the owner should confirm & replace copy below
// with real, verified data before publishing quantitative claims.
const EAST_BLR_CLUSTERS: Cluster[] = [
  {
    id: "whitefield-itpl",
    name: "Whitefield & ITPL Corridor",
    positioning: "Established IT township — mature social infrastructure, premium gated societies.",
    localities: ["Whitefield Main", "ITPL", "Kundalahalli", "Varthur Road"],
    anchors: ["ITPL", "Brigade Tech Gardens", "Sigma Tech Park"],
    brokerNote: "To be confirmed by EasyFind ground team.",
    span: "sm:col-span-4",
  },
  {
    id: "orr-tech-belt",
    name: "ORR Tech Belt",
    positioning: "Bangalore's densest office corridor — walk-to-work rentals, high tenant churn.",
    localities: ["Bellandur", "Kadubeesanahalli", "Marathahalli", "Kaikondrahalli"],
    anchors: ["Embassy TechVillage", "RMZ Ecospace", "Prestige Tech Park"],
    brokerNote: "To be confirmed by EasyFind ground team.",
    span: "sm:col-span-2",
  },
  {
    id: "sarjapur-corridor",
    name: "Sarjapur Road Corridor",
    positioning: "Family & school belt — newer townships, villa communities, growing tech hubs.",
    localities: ["Sarjapur Road", "Kasavanahalli", "Harlur", "Haralur Road"],
    anchors: ["Wipro Sarjapur", "RGA Tech Park", "International Schools cluster"],
    brokerNote: "To be confirmed by EasyFind ground team.",
    span: "sm:col-span-3",
  },
  {
    id: "hoodi-mahadevapura",
    name: "Hoodi & Mahadevapura",
    positioning: "Mid-premium residential pockets adjacent to Whitefield — value-focused tenants.",
    localities: ["Hoodi", "Brookefield", "Mahadevapura", "KR Puram"],
    anchors: ["SAP Labs", "Prestige Shantiniketan", "Purple Line Metro"],
    brokerNote: "To be confirmed by EasyFind ground team.",
    span: "sm:col-span-3",
  },
  {
    id: "indiranagar-domlur",
    name: "Indiranagar & Old Airport Road",
    positioning: "Established central-east — heritage neighbourhoods, F&B destinations, boutique inventory.",
    localities: ["Indiranagar", "Domlur", "Old Airport Road", "CV Raman Nagar"],
    anchors: ["Diamond District", "Embassy Golf Links", "Purple Line Metro"],
    brokerNote: "To be confirmed by EasyFind ground team.",
    span: "sm:col-span-6",
  },
];

function TBCChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60 border-white/20">
      <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]/70" />
      {children}
    </span>
  );
}

function EastBangaloreBento({
  onSelectFormPrefill,
}: {
  onSelectFormPrefill: (type: string, location: string, details: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string>(EAST_BLR_CLUSTERS[0].id);
  const selected = EAST_BLR_CLUSTERS.find((c) => c.id === selectedId) || EAST_BLR_CLUSTERS[0];

  return (
    <section id="east-bangalore" className="py-20 md:py-28" style={{ background: SURFACE }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>East Bengaluru Focus</SectionLabel>
        <SectionTitle>The East Bangalore Rental Map</SectionTitle>
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-sm md:text-base leading-relaxed"
          style={{ color: MUTED }}
        >
          Five curated clusters we work in every day. Rent scenarios, demand profiles and broker
          feedback are being verified with our ground team — pick a cluster to preview the
          structure.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Bento of clusters */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 lg:col-span-7">
            {EAST_BLR_CLUSTERS.map((c) => {
              const isSelected = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`group relative flex flex-col justify-between rounded-2xl p-6 text-left transition-all duration-300 ${c.span} ${
                    isSelected
                      ? "bg-[#1A3A5C] text-white shadow-xl ring-1 ring-[#C9A84C]/60"
                      : "bg-white hover:-translate-y-0.5 text-[#1A1A2E] shadow-sm hover:shadow-md"
                  }`}
                  style={{ border: isSelected ? "none" : `1px solid ${BORDER}` }}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
                          isSelected ? "text-[#C9A84C]" : "text-gray-400"
                        }`}
                      >
                        Cluster
                      </span>
                      <MapPin
                        size={16}
                        className={
                          isSelected
                            ? "text-[#C9A84C]"
                            : "text-gray-400 group-hover:text-[#C9A84C] transition-colors"
                        }
                      />
                    </div>
                    <h3
                      className="mt-4 text-lg md:text-xl font-extrabold tracking-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 text-xs leading-relaxed line-clamp-2 ${
                        isSelected ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      {c.positioning}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {c.localities.slice(0, 3).map((l) => (
                      <span
                        key={l}
                        className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                          isSelected
                            ? "bg-white/10 text-white/80 border border-white/10"
                            : "bg-[#F8F9FB] text-gray-500 border border-gray-100"
                        }`}
                      >
                        {l}
                      </span>
                    ))}
                    {c.localities.length > 3 && (
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                          isSelected ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        +{c.localities.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Cluster detail panel */}
          <div
            className="rounded-2xl p-6 md:p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden lg:col-span-5"
            style={{ background: NAVY }}
          >
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60">
                  Cluster Profile
                </span>
              </div>
              <h3
                className="mt-3 text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {selected.name}
              </h3>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                {selected.positioning}
              </p>

              {/* Localities */}
              <div className="mt-6">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 mb-2">
                  Locality Grouping
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.localities.map((l) => (
                    <span
                      key={l}
                      className="bg-white/8 text-white/90 text-xs font-medium px-2.5 py-1 rounded-md border border-white/10"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Anchors */}
              <div className="mt-6">
                <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50 mb-2">
                  Nearby Anchors
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.anchors.map((a) => (
                    <span
                      key={a}
                      className="text-white/70 text-[11px] font-medium px-2 py-0.5 rounded border border-white/10"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data placeholders — to be confirmed */}
              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                      Rent Scenarios
                    </span>
                    <TBCChip>To be confirmed</TBCChip>
                  </div>
                  <p className="mt-1 text-[11px] text-white/50 leading-relaxed">
                    Typical 2BHK / 3BHK bands to be published once verified with EasyFind's live
                    listings.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                      Demand Profile
                    </span>
                    <TBCChip>To be confirmed</TBCChip>
                  </div>
                  <p className="mt-1 text-[11px] text-white/50 leading-relaxed">
                    Tenant mix, average days-on-market and seasonality — pending internal data.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                      Broker Feedback
                    </span>
                    <TBCChip>To be confirmed</TBCChip>
                  </div>
                  <p className="mt-1 text-[11px] text-white/50 leading-relaxed">
                    {selected.brokerNote}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() =>
                  onSelectFormPrefill(
                    "Looking to Rent",
                    selected.name,
                    `Hi, I'm interested in verified rental options in the ${selected.name} cluster (${selected.localities.join(", ")}). Please share curated listings.`,
                  )
                }
                className="w-full text-center py-3 px-4 rounded-lg font-bold text-sm transition-transform hover:scale-[1.01] cursor-pointer"
                style={{ background: GOLD, color: NAVY }}
              >
                Talk to a specialist for this cluster
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function YieldCalculator({
  onSelectFormPrefill,
}: {
  onSelectFormPrefill: (type: string, location: string, details: string) => void;
}) {
  // All inputs are user-provided. No fabricated benchmarks, no fake presets.
  const [propertyValue, setPropertyValue] = useState(12000000); // ₹1.2 Cr — illustrative default
  const [monthlyRent, setMonthlyRent] = useState(45000); // illustrative default
  const [maintenance, setMaintenance] = useState(36000); // annual outgoings — illustrative default

  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  // Transparent math — nothing hidden, no market claims.
  const annualRent = monthlyRent * 12;
  const netAnnual = annualRent - maintenance;
  const grossYield = propertyValue > 0 ? (annualRent / propertyValue) * 100 : 0;
  const netYield = propertyValue > 0 ? (netAnnual / propertyValue) * 100 : 0;

  return (
    <section
      id="yield-calculator"
      className="py-20 md:py-28 bg-white border-t border-b border-gray-100"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>Landlord Tools</SectionLabel>
        <SectionTitle>Landlord Rental Yield Calculator</SectionTitle>
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-sm md:text-base leading-relaxed"
          style={{ color: MUTED }}
        >
          A transparent way to check the gross and net rental yield of your property. Enter your
          own numbers — we don't inject market averages or estimates.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12">
          {/* Left Column: Sliders (lg:col-span-6) */}
          <div className="space-y-8 rounded-2xl bg-gray-50 p-6 md:p-8 border border-gray-200/60 lg:col-span-6">
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: NAVY }}>
              <Calculator size={20} className="text-[#C9A84C]" /> Your property numbers
            </h3>

            {/* Slider 1: Property Value */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold" style={{ color: NAVY }}>
                  Property market value
                </span>
                <span className="text-base font-extrabold text-[#C9A84C]">
                  {formatINR(propertyValue)}
                </span>
              </div>
              <input
                type="range"
                min="3000000"
                max="30000000"
                step="250000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-gray-200 accent-[#C9A84C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                <span>30 Lakhs</span>
                <span>1.5 Crores</span>
                <span>3 Crores</span>
              </div>
            </div>

            {/* Slider 2: Monthly Rent */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold" style={{ color: NAVY }}>
                  Expected monthly rent
                </span>
                <span className="text-base font-extrabold text-[#C9A84C]">
                  ₹{monthlyRent.toLocaleString("en-IN")} / mo
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="1000"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-gray-200 accent-[#C9A84C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                <span>₹10,000</span>
                <span>₹80,000</span>
                <span>₹1,50,000</span>
              </div>
            </div>

            {/* Slider 3: Annual Maintenance */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold" style={{ color: NAVY }}>
                  Annual maintenance & outgoings
                </span>
                <span className="text-base font-extrabold text-gray-600">
                  ₹{maintenance.toLocaleString("en-IN")} / yr
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="2500"
                value={maintenance}
                onChange={(e) => setMaintenance(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-gray-200 accent-[#C9A84C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                <span>₹5,000 / yr</span>
                <span>₹75,000 / yr</span>
                <span>₹1,50,000 / yr</span>
              </div>
            </div>

            {/* Assumptions */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 text-xs leading-relaxed text-gray-500">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle size={16} className="text-gray-400" />
                <span className="font-bold uppercase tracking-[0.14em] text-[11px] text-gray-500">
                  Assumptions
                </span>
              </div>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>All three inputs are provided by you. Nothing is auto-filled from market data.</li>
                <li>Yields assume 12 months of occupancy (no vacancy loss).</li>
                <li>
                  Excludes one-time costs (registration, brokerage), home-loan interest, and
                  income tax on rental income.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Calculations & Projections (lg:col-span-6) */}
          <div className="space-y-8 lg:col-span-6">
            {/* Headline Yield Card */}
            <div className="rounded-2xl p-6 md:p-8 text-white" style={{ background: NAVY }}>
              <div className="grid grid-cols-2 gap-4 divide-x divide-white/10 text-center">
                <div>
                  <div className="text-[11px] text-white/60 uppercase tracking-[0.14em]">
                    Gross Rental Yield
                  </div>
                  <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    {grossYield.toFixed(2)}%
                  </div>
                  <span className="text-[10px] text-white/50 block mt-1">
                    Annual rent ÷ property value
                  </span>
                </div>
                <div>
                  <div className="text-[11px] text-white/60 uppercase tracking-[0.14em]">
                    Net Rental Yield
                  </div>
                  <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-[#C9A84C]">
                    {netYield.toFixed(2)}%
                  </div>
                  <span className="text-[10px] text-white/50 block mt-1">
                    (Annual rent − outgoings) ÷ property value
                  </span>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="rounded-2xl border border-gray-200/80 p-6 md:p-8">
              <h4
                className="text-[11px] font-bold uppercase tracking-[0.14em] mb-5"
                style={{ color: NAVY }}
              >
                Calculation breakdown
              </h4>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3">
                  <dt className="text-gray-500">Annual rent</dt>
                  <dd className="font-bold text-gray-900">
                    ₹{annualRent.toLocaleString("en-IN")}
                    <span className="ml-2 text-[11px] font-normal text-gray-400">
                      = ₹{monthlyRent.toLocaleString("en-IN")} × 12
                    </span>
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3">
                  <dt className="text-gray-500">Annual maintenance & outgoings</dt>
                  <dd className="font-bold text-gray-900">
                    − ₹{maintenance.toLocaleString("en-IN")}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3">
                  <dt className="text-gray-500">Net annual income</dt>
                  <dd className="font-bold text-gray-900">
                    ₹{netAnnual.toLocaleString("en-IN")}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Property value</dt>
                  <dd className="font-bold text-gray-900">{formatINR(propertyValue)}</dd>
                </div>
              </dl>
            </div>

            {/* CTA */}
            <div className="bg-[#1A3A5C]/5 rounded-2xl p-6 border border-[#1A3A5C]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-md">
                <h4 className="font-extrabold text-sm text-[#1A3A5C] mb-1">
                  Want a specialist to review these numbers?
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Share your inputs with an EasyFind advisor — we'll pressure-test the rent
                  assumption against comparable listings and walk you through outgoings.
                </p>
              </div>
              <button
                onClick={() =>
                  onSelectFormPrefill(
                    "Yield Review",
                    "East Bangalore",
                    `Hi, I ran the yield calculator with: Property value ${formatINR(propertyValue)}, expected rent ₹${monthlyRent.toLocaleString("en-IN")}/mo, annual outgoings ₹${maintenance.toLocaleString("en-IN")}. Please review these assumptions with me.`,
                  )
                }
                className="shrink-0 rounded-lg py-2.5 px-5 text-xs font-bold shadow-sm hover:scale-[1.02] transition-transform text-center cursor-pointer"
                style={{ background: GOLD, color: NAVY }}
              >
                Request a yield review
              </button>
            </div>
          </div>
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
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl bg-white p-8 shadow-sm"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={GOLD} color={GOLD} />
                ))}
              </div>
              <p className="text-base italic leading-relaxed" style={{ color: TEXT }}>
                “{r.text}”
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="font-bold" style={{ color: NAVY }}>
                  {r.name}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Google Review
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={BUSINESS_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3 font-bold transition-colors"
            style={{ borderColor: GOLD, color: NAVY }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GOLD;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            View All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

function LeadForm({
  prefill,
  clearPrefill,
}: {
  prefill?: { type: string; location: string; details: string } | null;
  clearPrefill?: () => void;
}) {
  // Independent state — never reads from or writes to the hero form.
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Looking to Rent");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (prefill) {
      setType(prefill.type);
      setLocation(prefill.location);
      setDetails(prefill.details);
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 2500);
      if (clearPrefill) clearPrefill();
      return () => clearTimeout(timer);
    }
  }, [prefill, clearPrefill]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = name.trim();
    const digits = phone.replace(/\D/g, "");
    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }
    if (digits.length < 10) {
      setError("Please enter a valid mobile number.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await submitLead({
        name: trimmedName,
        phone: digits.length === 10 ? `+91 ${digits}` : phone,
        requirement: type,
        location,
        budget,
        details,
        source: "Website Bottom Enquiry Form",
      });
      setSucceeded(true);
      setName("");
      setPhone("");
      setType("Looking to Rent");
      setLocation("");
      setBudget("");
      setDetails("");
    } catch (err) {
      console.error("Bottom form submission failed:", err);
      setError("Something went wrong. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: `1px solid ${BORDER}`,
    background: "#fff",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <section id="contact" className="py-16 md:py-24" style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div id="lead-form">
            <SectionLabel>Contact Us</SectionLabel>
            <h2
              className="mb-6 font-bold"
              style={{ color: NAVY, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15 }}
            >
              Tell Us What You're Looking For
            </h2>
            <p className="mb-8 text-base" style={{ color: MUTED }}>
              Fill in the form and our team will reach out shortly.
            </p>
            {succeeded ? (
              <div
                className="rounded-2xl border p-8 text-center"
                role="status"
                aria-live="polite"
                style={{ borderColor: BORDER, background: SURFACE }}
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "#ECFDF5", color: "#059669" }}
                >
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="text-lg font-bold" style={{ color: NAVY }}>
                  Thank you! We'll call you shortly.
                </h3>
                <p className="mt-2 text-sm text-gray-500">Our team will get back to you shortly.</p>
                <button
                  type="button"
                  onClick={() => setSucceeded(false)}
                  className="mt-6 rounded-lg px-5 py-2 text-sm font-semibold"
                  style={{ background: GOLD, color: NAVY }}
                >
                  Submit another requirement
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className={`space-y-4 transition-all duration-700 ${
                  highlight
                    ? "ring-4 ring-[#C9A84C]/50 rounded-xl p-4 bg-[#C9A84C]/5 shadow-xl"
                    : ""
                }`}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    style={inputStyle}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => setName(e.target.value.trim())}
                    disabled={isSubmitting}
                    autoComplete="name"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    style={inputStyle}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d+ ]/g, ""))}
                    disabled={isSubmitting}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
                <select
                  style={inputStyle}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option>Looking to Rent</option>
                  <option>Looking to Buy</option>
                  <option>Looking to Sell</option>
                  <option>Property Management</option>
                  <option>Tenant Support</option>
                  <option>Investment Advisory</option>
                  <option>Relocation Help</option>
                </select>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Preferred Location"
                    style={inputStyle}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <input
                    type="text"
                    placeholder="Budget"
                    style={inputStyle}
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <textarea
                  placeholder="Additional Details"
                  rows={4}
                  style={inputStyle}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg py-4 text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  style={{ background: GOLD, color: NAVY }}
                >
                  {isSubmitting ? "Sending..." : "Submit Requirement"}
                </button>
                <p className="text-center text-xs font-medium text-gray-400">
                  We will get back to you shortly. No spam. No sharing of your data.
                </p>
              </form>
            )}
          </div>
          <div>
            <SectionLabel>Get In Touch</SectionLabel>
            <h2
              className="mb-10 font-bold"
              style={{ color: NAVY, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.15 }}
            >
              We're Just a Message Away
            </h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: SURFACE, color: NAVY }}
                >
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    Call Us
                  </div>
                  <div className="mt-1 text-sm text-gray-500">Available 10 AM - 7 PM</div>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, "")}`}
                    className="mt-2 block text-xl font-bold"
                    style={{ color: NAVY }}
                  >
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: SURFACE, color: NAVY }}
                >
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    Email Us
                  </div>
                  <div className="mt-1 text-sm text-gray-500">We'll reply within 24h</div>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="mt-2 block text-xl font-bold"
                    style={{ color: NAVY }}
                  >
                    {BUSINESS_CONFIG.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: SURFACE, color: NAVY }}
                >
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    Visit Us
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-gray-500">
                    Prestige Atlanta, 1, 80 Feet Rd,
                    <br />
                    Koramangala 8th Block,
                    <br />
                    Bengaluru, Karnataka 560034
                  </div>
                  <a
                    href={BUSINESS_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block font-bold"
                    style={{ color: GOLD }}
                  >
                    View Our Google Business Profile
                  </a>
                </div>
              </div>
            </div>
            <div
              className="mt-16 overflow-hidden rounded-2xl shadow-xl"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.4847368668495!2d77.62215847587636!3d12.94079861555562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15229e6c1a61%3A0x26a05f018e301661!2sEasyFind%20Property%20Solutions!5e0!3m2!1sen!2sin!4v1710321234567!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="pt-20 pb-10 text-white"
      style={{ background: NAVY, borderTop: `4px solid ${GOLD}` }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">
          {/* Column 1: Brand & Hours */}
          <div className="flex flex-col space-y-6">
            <div>
              <Logo light={true} />
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Bengaluru's premier independent property consulting agency. We simplify property
              search, management, and transactions with verified listings and professional trust.
            </p>
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                Office Hours
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />
                  <span>Mon - Sat: 9:00 AM - 7:30 PM</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  <span>Sunday: 10:00 AM - 5:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-lg font-bold tracking-tight" style={{ color: GOLD }}>
              Our Services
            </h3>
            <ul className="flex flex-col space-y-3 text-sm text-white/70">
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#services");
                  }}
                  className="transition-colors hover:text-white"
                >
                  Premium Rental Services
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#services");
                  }}
                  className="transition-colors hover:text-white"
                >
                  Property Buy & Sell
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#services");
                  }}
                  className="transition-colors hover:text-white"
                >
                  Property Management
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#services");
                  }}
                  className="transition-colors hover:text-white"
                >
                  Tenant Management
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("#services");
                  }}
                  className="transition-colors hover:text-white"
                >
                  Legal Handover Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Prime Localities */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-lg font-bold tracking-tight" style={{ color: GOLD }}>
              Service Areas
            </h3>
            <ul className="grid grid-cols-1 gap-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: GOLD }} />
                <span>Koramangala</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: GOLD }} />
                <span>HSR Layout</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: GOLD }} />
                <span>Indiranagar</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: GOLD }} />
                <span>Bellandur</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: GOLD }} />
                <span>Sarjapur Road</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} style={{ color: GOLD }} />
                <span>Whitefield</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Reach Us */}
          <div className="flex flex-col space-y-5">
            <h3 className="text-lg font-bold tracking-tight" style={{ color: GOLD }}>
              Contact Us
            </h3>
            <div className="flex flex-col space-y-4 text-sm text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  A Block, Prestige Atlanta, 1, 80 Feet Rd, Koramangala, Bengaluru 560034
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0" style={{ color: GOLD }} />
                <a
                  href={`tel:${BUSINESS_CONFIG.phone.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {BUSINESS_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0" style={{ color: GOLD }} />
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Quick Links / Menu */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-white/50">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(l.href);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Real Estate Trust Disclaimer */}
        <div
          className="mt-16 border-t pt-6 text-center text-xs text-white/40 leading-relaxed"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="max-w-4xl mx-auto">
            Disclaimer: EasyFind Property Solutions is an independent real estate advisory firm.
            While we strive to provide accurate, verified, and up-to-date information regarding
            property rentals, sales, and management in Bengaluru, all transactions and agreements
            are subject to direct verification between parties. Service operations are compliant
            with local Karnataka state real estate regulations.
          </p>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="text-xs font-medium text-white/50">
            © 2026 EasyFind Property Solutions. All rights reserved.
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/30">
            Designed for trust in Bengaluru
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  const [formPrefill, setFormPrefill] = useState<{
    type: string;
    location: string;
    details: string;
  } | null>(null);

  const handleSelectFormPrefill = (type: string, location: string, details: string) => {
    setFormPrefill({ type, location, details });
    scrollToId("#contact");
  };

  return (
    <div className="min-h-screen bg-white" style={{ color: TEXT, fontFamily: "Inter, sans-serif" }}>
      <Nav />
      <main>
        <Hero />
        <TrackRecord />
        <Services />
        <HowItWorks />
        <WhyUs />
        <EastBangaloreBento onSelectFormPrefill={handleSelectFormPrefill} />
        <YieldCalculator onSelectFormPrefill={handleSelectFormPrefill} />
        <Reviews />
        <LeadForm prefill={formPrefill} clearPrefill={() => setFormPrefill(null)} />
      </main>
      <Footer />
    </div>
  );
}
