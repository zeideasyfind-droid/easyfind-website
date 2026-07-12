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

type Neighborhood = {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  avgRent: string;
  demand: string;
  yieldRange: string;
  connectivity: number;
  socialScore: number;
  demandScore: number;
  parks: string[];
  perks: string[];
  typicalPrice: number;
  typicalRent: number;
  typicalMaint: number;
};

const EAST_BANGALORE_NEIGHBORHOODS: Neighborhood[] = [
  {
    id: "whitefield",
    name: "Whitefield",
    tagline: "The Crown Jewel of Bengaluru's Tech Economy",
    badge: "The Original IT Hub",
    avgRent: "₹38,000 - ₹48,000",
    demand: "Very High",
    yieldRange: "4.5% - 5.2%",
    connectivity: 92,
    socialScore: 94,
    demandScore: 95,
    parks: ["ITPL", "GR Tech Park", "Sigma Tech Park", "Brigade Tech Gardens"],
    perks: [
      "Seamless purple line metro connectivity directly into office sectors",
      "Proximity to high-end social spots: Phoenix Marketcity & VR Bengaluru",
      "Home to elite international schools and premium gated townships",
    ],
    typicalPrice: 11000000,
    typicalRent: 42000,
    typicalMaint: 36000,
  },
  {
    id: "bellandur-orr",
    name: "Bellandur / Outer Ring Road (ORR)",
    tagline: "The Hyper-Growth Business Corridor",
    badge: "The High-Density Tech Belt",
    avgRent: "₹45,000 - ₹58,000",
    demand: "Extremely High",
    yieldRange: "4.8% - 5.5%",
    connectivity: 95,
    socialScore: 90,
    demandScore: 98,
    parks: ["RMZ Ecospace", "Embassy TechVillage", "Cessna Business Park", "Prestige Tech Park"],
    perks: [
      "Highest rental demand density in India with minimal vacancy cycles",
      "Immediate, walking-distance access to multinational tech giants",
      "Upcoming ORR metro line to provide unprecedented connectivity",
    ],
    typicalPrice: 13500000,
    typicalRent: 52000,
    typicalMaint: 48000,
  },
  {
    id: "sarjapur-road",
    name: "Sarjapur Road",
    tagline: "The Premier Premium Residential & Education Hub",
    badge: "Families & Elite School Belt",
    avgRent: "₹35,000 - ₹44,000",
    demand: "High",
    yieldRange: "4.3% - 5.0%",
    connectivity: 88,
    socialScore: 96,
    demandScore: 90,
    parks: ["Wipro Campus", "RGA Tech Park", "Exora Business Park"],
    perks: [
      "Access to Bangalore's finest educational institutes (Greenwood, TISB)",
      "Excellent cross-corridor connectivity linking Electronic City, ORR, and HSR Layout",
      "Wide, spacious luxury villa communities and premium green layout projects",
    ],
    typicalPrice: 9500000,
    typicalRent: 38000,
    typicalMaint: 30000,
  },
  {
    id: "marathahalli",
    name: "Marathahalli",
    tagline: "The Central Transit and Commercial Core",
    badge: "The Transit Hub",
    avgRent: "₹30,000 - ₹38,000",
    demand: "Very High",
    yieldRange: "4.4% - 5.1%",
    connectivity: 94,
    socialScore: 88,
    demandScore: 92,
    parks: ["Prestige Tech Park", "JP Morgan Campus", "Salarpuria Hallmark"],
    perks: [
      "Unmatched geographic centrality connecting East and South Bangalore seamlessly",
      "Extremely robust local commerce, markets, and hypermarket options",
      "High rentability across both mid-income and luxury categories",
    ],
    typicalPrice: 8500000,
    typicalRent: 34000,
    typicalMaint: 24000,
  },
  {
    id: "hoodi-brookfield",
    name: "Hoodi & Brookfield",
    tagline: "The Modern Mid-Premium Residential Oasis",
    badge: "Strategic Tech Slices",
    avgRent: "₹32,000 - ₹40,000",
    demand: "High",
    yieldRange: "4.2% - 4.9%",
    connectivity: 90,
    socialScore: 92,
    demandScore: 88,
    parks: ["SAP Labs", "Vydehi Hospital & Research", "SJR I-Park"],
    perks: [
      "Quiet, peaceful residential communities with abundant green pockets",
      "Direct Metro transit convenience (Hoodi Junction station nearby)",
      "Highly attractive price points relative to primary Whitefield sectors",
    ],
    typicalPrice: 9000000,
    typicalRent: 35000,
    typicalMaint: 28000,
  },
];

function EastBangaloreBento({
  onSelectYieldPreset,
  onSelectFormPrefill,
}: {
  onSelectYieldPreset: (price: number, rent: number, maintenance: number) => void;
  onSelectFormPrefill: (type: string, location: string, details: string) => void;
}) {
  const [selectedId, setSelectedId] = useState("whitefield");
  const selected =
    EAST_BANGALORE_NEIGHBORHOODS.find((n) => n.id === selectedId) ||
    EAST_BANGALORE_NEIGHBORHOODS[0];

  return (
    <section id="east-bangalore" className="py-16 md:py-24" style={{ background: SURFACE }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>East Bengaluru Hotspots</SectionLabel>
        <SectionTitle>Interactive Neighborhood Bento Grid</SectionTitle>
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-sm md:text-base leading-relaxed"
          style={{ color: MUTED }}
        >
          Click on any neighborhood block below to explore real-time rental trends, nearby tech
          parks, yields, and connectivity indices in East Bangalore.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Bento Grid of 5 neighborhoods (lg:col-span-7) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 lg:col-span-7">
            {EAST_BANGALORE_NEIGHBORHOODS.map((n) => {
              const isSelected = n.id === selectedId;

              // Let's vary the span classes for an asymmetrical "bento" feel
              let spanClass = "sm:col-span-3";
              if (n.id === "sarjapur-road") spanClass = "sm:col-span-4";
              if (n.id === "marathahalli") spanClass = "sm:col-span-2";
              if (n.id === "hoodi-brookfield") spanClass = "sm:col-span-6";

              return (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  className={`group relative flex flex-col justify-between rounded-2xl p-6 text-left transition-all duration-300 ${spanClass} ${
                    isSelected
                      ? "bg-[#1A3A5C] text-white shadow-xl scale-[1.02] ring-2 ring-[#C9A84C]"
                      : "bg-white hover:bg-gray-50 text-[#1A1A2E] shadow-sm hover:shadow-md"
                  }`}
                  style={{ border: isSelected ? "none" : `1px solid ${BORDER}` }}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? "bg-white/15 text-[#C9A84C]" : "bg-[#F8F9FB] text-gray-500"
                        }`}
                      >
                        {n.badge}
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
                    <h3 className="mt-4 text-lg font-extrabold tracking-tight">{n.name}</h3>
                    <p
                      className={`mt-2 text-xs line-clamp-2 ${isSelected ? "text-white/70" : "text-gray-500"}`}
                    >
                      {n.tagline}
                    </p>
                  </div>

                  <div className="mt-6 w-full pt-4 border-t border-dashed border-current/10 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider opacity-60">
                        Avg 2BHK Rent
                      </div>
                      <div className="text-xs font-bold mt-0.5">{n.avgRent.split(" - ")[0]}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase tracking-wider opacity-60">Demand</div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${
                          isSelected
                            ? "bg-white/10 text-white"
                            : "bg-[#F8F9FB] text-emerald-600 font-semibold"
                        }`}
                      >
                        {n.demand}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Area Intelligence Portal (lg:col-span-5) */}
          <div
            className="rounded-2xl p-6 md:p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden lg:col-span-5"
            style={{ background: "#1A3A5C" }}
          >
            {/* Background Accent */}
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-wider uppercase text-white/60">
                  Live Area Intelligence
                </span>
              </div>
              <h3
                className="mt-3 text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {selected.name}
              </h3>
              <p className="mt-2 text-sm text-[#C9A84C] font-semibold tracking-wide">
                {selected.tagline}
              </p>

              {/* Stats Highlights */}
              <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-white/5 p-4 border border-white/10">
                <div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">
                    Avg 2BHK Rent
                  </div>
                  <div className="text-base font-bold text-white mt-1">{selected.avgRent}</div>
                  <div className="text-[9px] text-[#C9A84C] font-medium mt-0.5">
                    MoM Trend Focus
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">
                    Rental Yield
                  </div>
                  <div className="text-base font-bold text-[#C9A84C] mt-1">
                    {selected.yieldRange}
                  </div>
                  <div className="text-[9px] text-white/50 font-medium mt-0.5">
                    Top Tier in India
                  </div>
                </div>
              </div>

              {/* Interactive Metrics Scores */}
              <div className="mt-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/60">
                  Local Market Scores
                </h4>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">Connectivity Index (Metro/ORR)</span>
                    <span className="font-bold text-[#C9A84C]">{selected.connectivity}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${selected.connectivity}%`, backgroundColor: GOLD }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">Tenant Demand Density</span>
                    <span className="font-bold text-[#C9A84C]">{selected.demandScore}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${selected.demandScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">Social Infrastructure Score</span>
                    <span className="font-bold text-[#C9A84C]">{selected.socialScore}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-400 transition-all duration-500"
                      style={{ width: `${selected.socialScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Major Tech Parks Nearby */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                  Primary IT Corridors
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selected.parks.map((p) => (
                    <span
                      key={p}
                      className="bg-white/10 text-white/90 text-[10px] font-medium px-2 py-0.5 rounded border border-white/5"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why We Recommend It */}
              <div className="mt-6 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                  EasyFind Expert Notes
                </h4>
                {selected.perks.map((perk, i) => (
                  <div key={i} className="flex gap-2 text-xs text-white/80 leading-relaxed">
                    <div className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#C9A84C]" />
                    <p>{perk}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  onSelectFormPrefill(
                    "Looking to Rent",
                    selected.name,
                    `Hi, I am interested in viewing verified premium apartments or societies in ${selected.name}. Please contact me with curated options.`,
                  )
                }
                className="w-full text-center py-2.5 px-3 rounded-lg font-bold text-xs transition-colors cursor-pointer"
                style={{ background: GOLD, color: NAVY }}
              >
                Explore Properties
              </button>
              <button
                onClick={() =>
                  onSelectYieldPreset(
                    selected.typicalPrice,
                    selected.typicalRent,
                    selected.typicalMaint,
                  )
                }
                className="w-full text-center py-2.5 px-3 rounded-lg font-bold text-xs bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calculator size={12} /> Calculate Yield
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function YieldCalculator({
  preset,
  clearPreset,
  onSelectFormPrefill,
}: {
  preset: { price: number; rent: number; maintenance: number } | null;
  clearPreset: () => void;
  onSelectFormPrefill: (type: string, location: string, details: string) => void;
}) {
  const [propertyValue, setPropertyValue] = useState(12000000); // 1.2 Cr default
  const [monthlyRent, setMonthlyRent] = useState(45000); // 45k default
  const [maintenance, setMaintenance] = useState(36000); // 36k default
  const [animatePulse, setAnimatePulse] = useState(false);

  // Sync with preset trigger
  useEffect(() => {
    if (preset) {
      setPropertyValue(preset.price);
      setMonthlyRent(preset.rent);
      setMaintenance(preset.maintenance);
      setAnimatePulse(true);
      const timer = setTimeout(() => setAnimatePulse(false), 2000);
      clearPreset();
      return () => clearTimeout(timer);
    }
  }, [preset, clearPreset]);

  // Formatter helpers
  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  // Math calculations
  const annualRent = monthlyRent * 12;
  const grossYield = (annualRent / propertyValue) * 100;
  const netYield = ((annualRent - maintenance) / propertyValue) * 100;

  // Projection values (8% escalation YoY)
  const projection = Array.from({ length: 5 }, (_, idx) => {
    const year = idx + 1;
    const factor = Math.pow(1.08, idx);
    const mRent = monthlyRent * factor;
    const aRent = mRent * 12;
    return {
      year,
      monthly: Math.round(mRent),
      annual: Math.round(aRent),
    };
  });

  const cumulativeEarnings = projection.reduce((sum, item) => sum + item.annual, 0);

  // Preset Buttons for landlords
  const presets = [
    { label: "Whitefield Average", val: 11000000, rent: 42000, maint: 36000 },
    { label: "Bellandur Elite", val: 13500000, rent: 52000, maint: 48000 },
    { label: "Sarjapur Family", val: 9500000, rent: 38000, maint: 30000 },
    { label: "Koramangala Premium", val: 15000000, rent: 55000, maint: 42000 },
    { label: "HSR Executive", val: 11500000, rent: 45000, maint: 32000 },
  ];

  return (
    <section
      id="yield-calculator"
      className="py-16 md:py-24 bg-white border-t border-b border-gray-100"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionLabel>Earning Intelligence</SectionLabel>
        <SectionTitle>Landlord Rental Yield Calculator</SectionTitle>
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-sm md:text-base leading-relaxed"
          style={{ color: MUTED }}
        >
          Determine the gross and net investment yields of your Bengaluru asset. Adjust variables or
          load standard micro-market indexes instantly.
        </p>

        {/* Quick presets row */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setPropertyValue(p.val);
                setMonthlyRent(p.rent);
                setMaintenance(p.maint);
                setAnimatePulse(true);
                setTimeout(() => setAnimatePulse(false), 1200);
              }}
              className="rounded-full border px-4 py-1.5 text-xs font-semibold hover:border-[#C9A84C] hover:text-[#1A3A5C] transition-all bg-gray-50 text-gray-600 hover:bg-white cursor-pointer"
              style={{ borderColor: BORDER }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Sliders (lg:col-span-6) */}
          <div className="space-y-8 rounded-2xl bg-gray-50 p-6 md:p-8 border border-gray-200/60 lg:col-span-6">
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: NAVY }}>
              <Calculator size={20} className="text-[#C9A84C]" /> Customize Property Financials
            </h3>

            {/* Slider 1: Property Value */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold" style={{ color: NAVY }}>
                  Property Market Value
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
                  Expected Monthly Rent
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
                  Annual Outgoings & Maintenance
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

            {/* Helper Info */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 flex gap-3 text-xs leading-relaxed text-gray-500">
              <HelpCircle size={18} className="shrink-0 text-gray-400 mt-0.5" />
              <p>
                <strong>Gross Yield</strong> measures the total rental return on purchase price
                before costs. <strong>Net Yield</strong> factors in recurring costs like association
                maintenance, landlord taxes, and minor repairs — giving you the true, bottom-line
                return rate.
              </p>
            </div>
          </div>

          {/* Right Column: Calculations & Projections (lg:col-span-6) */}
          <div className="space-y-8 lg:col-span-6">
            {/* Realtime Yield Gauges */}
            <div
              className={`rounded-2xl p-6 md:p-8 text-white transition-all duration-500 ${
                animatePulse ? "ring-4 ring-[#C9A84C] scale-[1.01]" : ""
              }`}
              style={{ background: "#1A3A5C" }}
            >
              <div className="grid grid-cols-2 gap-4 divide-x divide-white/10 text-center">
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">
                    Gross Rental Yield
                  </div>
                  <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    {grossYield.toFixed(2)}%
                  </div>
                  <span className="text-[10px] text-[#C9A84C] font-semibold uppercase tracking-wider block mt-1">
                    Industry Average: 3.2%
                  </span>
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">
                    True Net Yield
                  </div>
                  <div className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-[#C9A84C]">
                    {netYield.toFixed(2)}%
                  </div>
                  <span className="text-[10px] text-[#C9A84C] font-semibold uppercase tracking-wider block mt-1">
                    Bangalore Lead Range
                  </span>
                </div>
              </div>

              {/* Dynamic feedback quote */}
              <div className="mt-6 border-t border-white/10 pt-4 text-center text-xs text-white/70">
                {netYield >= 4.5 ? (
                  <p>
                    🔥 <strong>Excellent yield profile!</strong> Your property is performing in the
                    top 5% of Bangalore assets. Demand in this tier is extremely resilient.
                  </p>
                ) : netYield >= 3.5 ? (
                  <p>
                    📈 <strong>Healthy average return!</strong> Typical of high-demand gated
                    apartments in premium East Bangalore corridors.
                  </p>
                ) : (
                  <p>
                    💡 <strong>Standard return.</strong> We can help optimize your maintenance
                    outlays and reduce vacancy gaps to push your yield past 4.5%!
                  </p>
                )}
              </div>
            </div>

            {/* 5-Year Rental Accumulation Bar projections */}
            <div className="rounded-2xl border p-6 md:p-8 border-gray-200/80">
              <h4
                className="text-sm font-extrabold tracking-tight uppercase mb-6 flex items-center justify-between"
                style={{ color: NAVY }}
              >
                <span>5-Year Cumulative Cashflow Forecast</span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Avg 8% Annual Hike
                </span>
              </h4>

              {/* Pure HTML Bar Chart */}
              <div className="space-y-4">
                {projection.map((proj) => {
                  const maxWidth = projection[4].annual;
                  const pct = (proj.annual / maxWidth) * 100;

                  return (
                    <div key={proj.year} className="flex items-center gap-4 text-xs">
                      <div className="w-12 font-bold text-gray-500">Year {proj.year}</div>
                      <div className="flex-1">
                        <div className="flex justify-between font-semibold mb-1 text-gray-700">
                          <span>₹{proj.monthly.toLocaleString("en-IN")}/mo</span>
                          <span className="font-bold text-gray-900">
                            ₹{proj.annual.toLocaleString("en-IN")}/yr
                          </span>
                        </div>
                        <div className="h-4 w-full bg-gray-100 rounded-md overflow-hidden relative">
                          <div
                            className="h-full bg-[#1A3A5C]/80 rounded-md transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-500">Cumulative 5-Yr Earnings:</span>
                <span className="text-base font-extrabold text-[#C9A84C]">
                  ₹{cumulativeEarnings.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* CTA action cards */}
            <div className="bg-[#1A3A5C]/5 rounded-2xl p-6 border border-[#1A3A5C]/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-md">
                <h4 className="font-extrabold text-sm text-[#1A3A5C] mb-1">
                  Ready to Maximize Your Real Estate Revenue?
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  EasyFind manages premium assets for over 500 owners with guaranteed rent
                  transfers, 100% verified corporate tenants, and low maintenance fees.
                </p>
              </div>
              <button
                onClick={() =>
                  onSelectFormPrefill(
                    "Property Management",
                    "Koramangala / East Bangalore",
                    `Hi, I calculated my property yield using your online tool (Market Value: ${formatINR(propertyValue)}, expected rent: ₹${monthlyRent.toLocaleString()}/mo). Please contact me for a premium asset management yield audit!`,
                  )
                }
                className="shrink-0 rounded-lg py-2.5 px-5 text-xs font-bold shadow-md hover:scale-105 transition-all text-center cursor-pointer"
                style={{ background: GOLD, color: NAVY }}
              >
                Request Free Yield Audit
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
  const [calcPreset, setCalcPreset] = useState<{
    price: number;
    rent: number;
    maintenance: number;
  } | null>(null);
  const [formPrefill, setFormPrefill] = useState<{
    type: string;
    location: string;
    details: string;
  } | null>(null);

  const handleSelectYieldPreset = (price: number, rent: number, maintenance: number) => {
    setCalcPreset({ price, rent, maintenance });
    scrollToId("#yield-calculator");
  };

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
        <EastBangaloreBento
          onSelectYieldPreset={handleSelectYieldPreset}
          onSelectFormPrefill={handleSelectFormPrefill}
        />
        <YieldCalculator
          preset={calcPreset}
          clearPreset={() => setCalcPreset(null)}
          onSelectFormPrefill={handleSelectFormPrefill}
        />
        <Reviews />
        <LeadForm prefill={formPrefill} clearPrefill={() => setFormPrefill(null)} />
      </main>
      <Footer />
    </div>
  );
}
