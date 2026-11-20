import React from "react";
import { CalendarClock, Flag, Handshake, Rocket, TrendingUp } from "lucide-react";
import useInView from "../../../hooks/useInView";

const titleLines = ["Milestones, documented with care."];

const milestones = [
  {
    number: "01",
    title: "Foundation established",
    description: "Verified milestone information to be added.",
    icon: Flag,
  },
  {
    number: "02",
    title: "First community collaboration",
    description: "Verified milestone information to be added.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Programme expansion",
    description: "Verified milestone information to be added.",
    icon: TrendingUp,
  },
  {
    number: "04",
    title: "Next chapter",
    description: "Verified milestone information to be added.",
    icon: Rocket,
    upcoming: true,
  },
];

const Section5 = () => {
  const [ref, inView] = useInView(0.15);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-emerald-50 py-16"
    >
      {/* Leaf watermark (SVG) */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-20 hidden size-160 animate-float text-emerald-900/5 motion-reduce:animate-none md:block"
        aria-hidden="true"
      >
        <path
          d="M200 20C340 60 380 200 200 380 20 220 60 60 200 20Z"
          fill="currentColor"
        />
        <path
          d="M200 372C196 280 198 170 200 40M200 300C160 270 120 220 96 160M200 250C240 220 280 170 304 110"
          fill="none"
          stroke="white"
          strokeOpacity="0.6"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <div className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div
          className={`mb-3 flex items-center gap-3 ${fadeUp}`}
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-0.5 w-10 bg-secondary" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest text-emerald-800">
            Our Journey
          </span>
        </div>

        <h2 className="font-dmserif-display text-4xl leading-tight text-slate-900">
          {titleLines.map((line, i) => (
            <span key={line} className="-my-1 block overflow-hidden py-1">
              <span
                className={`block ${reveal}`}
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        {/* ================= TIMELINE ================= */}
        <div className="relative mt-10 grid gap-12 lg:mt-8 lg:grid-cols-4 lg:gap-8">

          {/* Horizontal line (desktop): faint base + animated drawn line */}
          <div className="absolute left-3 right-0 top-3 hidden h-px bg-emerald-800/20 lg:block" />
          <div
            className={`absolute left-3 right-0 top-3 hidden h-px origin-left bg-emerald-800/60 transition-transform duration-2000 ease-out lg:block ${
              inView ? "scale-x-100" : "scale-x-0"
            }`}
          />

          {/* Vertical line (mobile and tablet) */}
          <div className="absolute bottom-2 left-3 top-2 w-px bg-emerald-800/25 lg:hidden" />

          {milestones.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="group relative pl-12 lg:pl-0"
              >
                {/* Node + stem */}
                <div
                  className={`absolute left-0 top-0 lg:static ${fadeUp}`}
                  style={{ animationDelay: `${0.8 + index * 0.25}s` }}
                >
                  <span className="relative flex size-6 items-center justify-center">
                    {item.upcoming && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-secondary/60 motion-reduce:animate-none" />
                    )}
                    <span
                      className={`relative flex size-6 items-center justify-center rounded-full border bg-white shadow-sm transition-all duration-500 group-hover:scale-125 group-hover:border-secondary ${
                        item.upcoming
                          ? "border-secondary"
                          : "border-emerald-800/30"
                      }`}
                    >
                      <span className="size-2 rounded-full bg-emerald-700 transition-colors duration-500 group-hover:bg-secondary" />
                    </span>
                  </span>

                  {/* Stem under the node (desktop) */}
                  <span
                    className={`ml-3 hidden h-10 w-px transition-all duration-500 group-hover:h-14 lg:block ${
                      item.upcoming
                        ? "border-l border-dashed border-secondary"
                        : "bg-emerald-800/40"
                    }`}
                  />
                </div>

                {/* Content */}
                <div
                  className={`lg:pt-4 ${fadeUp}`}
                  style={{ animationDelay: `${1 + index * 0.25}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-display text-6xl leading-none text-emerald-700 transition-all duration-500 group-hover:translate-x-1 group-hover:text-secondary lg:text-7xl">
                      {item.number}
                    </p>

                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-md transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-emerald-700 group-hover:text-white">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                  </div>

                  {/* <p className="mt-5 flex items-center gap-2 font-manrope text-xs font-bold uppercase tracking-widest text-slate-500">
                    <CalendarClock size={14} className="text-secondary" />
                    Date pending
                  </p> */}

                  <h3 className="mt-2 font-manrope text-xl leading-snug text-emerald-800 transition-colors duration-300 group-hover:text-emerald-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 font-manrope text-sm leading-[1.8] tracking-wide text-slate-600">
                    {item.description}
                  </p>

                  {/* Underline grows on hover */}
                  {/* <span className="mt-5 block h-0.5 w-10 bg-secondary transition-all duration-500 group-hover:w-20" /> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section5;