import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, ChevronsUp } from "lucide-react";
import { FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const exploreLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Approach", href: "/approach" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Our Impact", href: "/impact" },
  { label: "Projects", href: "/projects" },
];

const focusAreas = [
  { label: "Research & Development", href: "/initiatives" },
  { label: "Smart Agriculture", href: "/initiatives" },
  { label: "Water Management", href: "/initiatives" },
  { label: "Circular Economy", href: "/initiatives" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Transparency", href: "/transparency" },
];

const socials = [
  { label: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { label: "Email", icon: FaRegEnvelope, href: "mailto:info@example.com" },
];

const textureStyle = {
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
};

const headingClass =
  "mb-6 border-b border-white/10 pb-4 text-xl font-semibold text-white";

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: connect newsletter API here
    setEmail("");
  };

  return (
    <footer
      className="relative bg-neutral-800 font-manrope text-neutral-300"
      style={textureStyle}
    >
      {/* ============ WAVY TOP BUMP + SCROLL TO TOP ============ */}
      <svg
        className="absolute -top-6 left-1/2 h-6 w-40 -translate-x-1/2 text-neutral-800"
        viewBox="0 0 160 24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 24 C30 24 40 0 80 0 C120 0 130 24 160 24 Z"
          fill="currentColor"
        />
      </svg>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="absolute -top-5 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center text-lime-400 transition-transform duration-300 hover:-translate-y-1"
      >
        <ChevronsUp size={20} />
      </button>

      {/* ============ MAIN FOOTER ============ */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Logo, about, socials */}
          <div>
            <Link
              to="/"
              className="inline-block rounded-sm bg-white p-2"
              aria-label="INIL Greentech Foundation Home"
            >
              <img
                src={logo}
                alt="INIL Greentech Foundation"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 text-sm leading-7 text-neutral-300">
              Advancing scientific research, smart agriculture and circular
              rural systems for communities and ecosystems to thrive together.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center border border-white/20 text-sm text-white transition-colors duration-300 hover:border-secondary hover:bg-secondary hover:text-neutral-900"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className={headingClass}>Explore</h3>
            <ul className="space-y-3 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="transition-colors duration-300 hover:text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Focus Areas */}
          <div>
            <h3 className={headingClass}>Focus Areas</h3>
            <ul className="space-y-3 text-sm">
              {focusAreas.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="group flex items-center gap-2 transition-colors duration-300 hover:text-secondary"
                  >
                    <ChevronRight
                      size={14}
                      className="text-white transition-colors duration-300 group-hover:text-secondary"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div>
            <h3 className={headingClass}>Stay Connected</h3>
            <p className="text-sm leading-7 text-neutral-300">
              Receive field updates, research notes and opportunities to
              collaborate.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex items-center border-b border-white/20 transition-colors duration-300 focus-within:border-secondary"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                className="w-full bg-transparent py-3 text-sm text-white placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="shrink-0 p-2 text-white transition-colors duration-300 hover:text-secondary"
              >
                <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-neutral-400 sm:flex-row">
          <p>© {new Date().getFullYear()} INIL Greentech Foundation</p>

          <div className="flex items-center gap-1">
            {legalLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <span aria-hidden="true">·</span>}
                <Link
                  to={item.href}
                  className="px-1 transition-colors duration-300 hover:text-secondary"
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;