import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Sprout,
} from "lucide-react";
import logo from "../../assets/images/logo.png"
import { navigation } from "../../data/navLinks";

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // desktop dropdown (label)
  const [mobileDropdown, setMobileDropdown] = useState(null); // mobile accordion (label)
  const { pathname: activePath } = useLocation();
  const navRef = useRef(null);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close dropdowns whenever the route changes
  useEffect(() => {
    setOpenDropdown(null);
    setMobileDropdown(null);
  }, [activePath]);

  // Close the desktop dropdown when clicking outside the nav
  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const closeMenu = () => {
    setIsMobileOpen(false);
  };

  const isActive = (href) => {
    if (href === "/") return activePath === "/";
    return activePath === href || activePath.startsWith(`${href}/`);
  };

  // A parent item (with children) is active when any child is active
  const isParentActive = (item) =>
    item.children?.some((child) => isActive(child.href)) ?? false;

  return (
    <header className="sticky top-0 z-50 w-full bg-white">

      {/* ================= ABSOLUTE LOGO (CENTER LEFT) ================= */}
      <div className="pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="pointer-events-auto flex shrink-0 items-center"
          aria-label="INIL Greentech Foundation Home"
        >
          <img
            src={logo}
            alt="INIL Greentech Foundation"
            className="h-12 w-auto max-w-xs object-contain lg:h-18"
          />
        </Link>

        <div className="ml-1 hidden lg:block">
          <p className="text-primary uppercase text-4xl font-manrope font-extrabold">Inil.</p>
          <p className="text-slate-600 text-sm font-manrope">Greentech Foundation.</p>
        </div>
      </div>

      {/* ================= TOP UTILITY BAR ================= */}
      <div className="relative hidden h-12 lg:block">

        {/* Lime Border Layer (top-left line + diagonal + bottom line) */}
        <div
          className="absolute inset-0 bg-lime-400"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, 28.75% 100%, 25% 7%, 0 7%)",
          }}
        />

        {/* Angled Green Background */}
        <div
          className="absolute inset-y-0 right-0 w-3/4 bg-[#102F1D]"
          style={{
            clipPath: "polygon(0.3% 0, 100% 0, 100% 93%, 5.2% 93%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-end px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.16em] text-white">
            <Sprout size={15} className="text-secondary" />
            <span>SCIENCE</span>
            <span className="text-secondary">•</span>
            <span>SUSTAINABILITY</span>
            <span className="text-secondary">•</span>
            <span>COMMUNITY</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <div className="border-b border-[#EDF0EA]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">

          {/* DESKTOP NAVIGATION */}
          <nav
            ref={navRef}
            className="hidden xl:flex h-full flex-1 items-center justify-end gap-4 2xl:gap-5"
            aria-label="Main navigation"
          >
            {navigation.map((item) => {
              /* ---------- Item with dropdown ---------- */
              if (item.children) {
                const isOpen = openDropdown === item.label;
                const highlighted = isParentActive(item) || isOpen;

                return (
                  <div
                    key={item.label}
                    className="relative flex h-full shrink-0 items-center"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setOpenDropdown(null);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      className={`group relative flex h-full shrink-0 items-center gap-1 whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.015em] transition-colors duration-300 2xl:text-sm ${
                        highlighted
                          ? "text-lime-400"
                          : "text-primary hover:text-lime-400"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />

                      {/* Active / Hover Underline */}
                      <span
                        className={`absolute bottom-0 left-0 h-0.75 bg-lime-400 transition-all duration-300 ${
                          highlighted ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className={`absolute left-0 top-full z-50 w-56 border-t-2 border-lime-400 bg-white shadow-xl transition-all duration-200 ${
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-2 opacity-0"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className={`group/item flex items-center justify-between border-b border-green-50 px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.015em] transition-all duration-200 last:border-b-0 hover:bg-green-50 hover:pl-6 ${
                            isActive(child.href)
                              ? "text-lime-500"
                              : "text-primary hover:text-lime-500"
                          }`}
                        >
                          {child.label}
                          <ArrowUpRight
                            size={15}
                            className="-translate-x-2 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              /* ---------- Normal item ---------- */
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`group relative flex h-full shrink-0 items-center whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.015em] transition-colors duration-300 2xl:text-sm ${
                    isActive(item.href)
                      ? "text-lime-400"
                      : "text-primary hover:text-lime-400"
                  }`}
                >
                  {item.label}

                  {/* Active / Hover Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.75 bg-lime-400 transition-all duration-300 ${
                      isActive(item.href)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            {/* DESKTOP CTA */}
            <Link
              to="/get-involved"
              className="group ml-3 flex shrink-0 items-center gap-3 bg-secondary px-3.5 py-2.5 text-[12px] font-bold tracking-[0.06em] text-[#203B2A] transition-all duration-300 hover:bg-[#D9972E] hover:shadow-lg"
            >
              GET INVOLVED
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="ml-auto flex h-11 w-11 items-center justify-center border border-[#E5EBE5] text-primary transition-colors hover:bg-[#F1F6F0] xl:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isMobileOpen}
          >
            <Menu size={25} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-x-0 bottom-0 top-20 z-60 bg-black/45 transition-opacity duration-300 xl:hidden ${
          isMobileOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ================= RIGHT SIDE MOBILE DRAWER ================= */}
      <aside
        className={`fixed right-0 top-20 bottom-0 z-70 flex w-80 max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          isMobileOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
        aria-label="Mobile navigation menu"
        aria-hidden={!isMobileOpen}
      >

        {/* DRAWER HEADER */}
        <div className="flex h-20.5 shrink-0 items-center justify-between border-b border-[#EDF0EA] px-5">
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <img
              src={logo}
              alt="INIL Greentech Foundation"
              className="h-12 w-auto max-w-40 object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center text-primary transition-colors hover:bg-[#F1F6F0]"
            aria-label="Close navigation menu"
          >
            <X size={25} strokeWidth={1.7} />
          </button>
        </div>

        {/* DRAWER NAVIGATION */}
        <nav
          className="flex-1 overflow-y-auto px-5 py-3"
          aria-label="Mobile navigation links"
          inert={!isMobileOpen}
        >
          {navigation.map((item) => {
            /* ---------- Accordion item ---------- */
            if (item.children) {
              const isOpen = mobileDropdown === item.label;
              const parentActive = isParentActive(item);

              return (
                <div key={item.label} className="border-b border-[#EAEFE9]">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileDropdown((prev) =>
                        prev === item.label ? null : item.label
                      )
                    }
                    aria-expanded={isOpen}
                    className={`flex min-h-13.75 w-full items-center justify-between text-[15px] font-medium transition-colors duration-200 ${
                      parentActive || isOpen
                        ? "text-primary"
                        : "text-[#26372D] hover:text-primary"
                    }`}
                  >
                    {item.label}

                    <span className="flex items-center gap-3">
                      {parentActive && (
                        <span className="h-5 w-0.75 bg-secondary" />
                      )}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="animate-fade-up pb-2 pl-4 motion-reduce:animate-none">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={closeMenu}
                          className={`flex min-h-12 items-center justify-between border-l-2 pl-4 text-[14px] font-medium transition-colors duration-200 ${
                            isActive(child.href)
                              ? "border-secondary text-primary"
                              : "border-[#EAEFE9] text-[#26372D] hover:border-lime-400 hover:text-primary"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* ---------- Normal item ---------- */
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={closeMenu}
                className={`group flex min-h-13.75 items-center justify-between border-b border-[#EAEFE9] text-[15px] font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-[#26372D] hover:text-primary"
                }`}
              >
                {item.label}

                {isActive(item.href) && (
                  <span className="h-5 w-0.75 bg-secondary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DRAWER CTA */}
        <div className="shrink-0 border-t border-[#EDF0EA] p-5">
          <Link
            to="/get-involved"
            onClick={closeMenu}
            className="group flex w-full items-center justify-center gap-3 bg-secondary px-5 py-4 text-[12px] font-bold tracking-[0.06em] text-[#203B2A] transition-colors duration-300 hover:bg-[#D9972E]"
          >
            GET INVOLVED
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </aside>
    </header>
  );
};

export default Header;