import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  Flag,
  HeartHandshake,
  MapPin,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import useInView from "../../../hooks/useInView";

const titleLines = ["From shared understanding to sustained outcomes."];

const stages = [
  {
    number: "01",
    title: "Local context",
    description: "Editable description",
    icon: MapPin,
  },
  {
    number: "02",
    title: "Shared priorities",
    description: "Editable description",
    icon: Target,
  },
  {
    number: "03",
    title: "Collective action",
    description: "Editable description",
    icon: Users,
  },
  {
    number: "04",
    title: "Community agency",
    description: "Editable description",
    icon: HeartHandshake,
  },
  {
    number: "05",
    title: "Sustained outcomes",
    description: "Editable description",
    icon: TrendingUp,
  },
];

const Section3 = () => {
  const [ref, inView] = useInView(0.15);
  const [flipped, setFlipped] = useState(null); // card flipped by tap/keyboard

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  const toggle = (index) =>
    setFlipped((prev) => (prev === index ? null : index));

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-amber-50 py-16"
    >
      {/* Decorative leaf blades (SVG) */}
      <svg
        viewBox="0 0 200 400"
        className="pointer-events-none absolute -left-8 bottom-0 hidden h-96 text-emerald-900/10 md:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M30 400C20 300 40 180 100 40" />
        <path d="M70 400C70 310 100 220 160 120" />
        <path d="M110 400C120 330 140 280 190 220" />
      </svg>
      <div className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div
          className={`mb-3 flex items-center gap-3 ${fadeUp}`}
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-0.5 w-10 bg-secondary" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
            Theory of Change
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

        {/* ================= FLIP CARDS ================= */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-5 lg:gap-5">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isLast = index === stages.length - 1;
            const next = stages[index + 1];

            return (
              <div
                key={stage.number}
                className={`relative ${fadeUp}`}
                style={{ animationDelay: `${0.8 + index * 0.15}s` }}
              >
                {/* Orange connector dot between cards (desktop) */}
                {!isLast && (
                  <span className="absolute -right-4 top-1/2 z-10 hidden size-3 -translate-y-1/2 rounded-full bg-secondary lg:block" />
                )}

                {/* Flip card */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={flipped === index}
                  aria-label={`${stage.title}, stage ${stage.number}`}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(index);
                    }
                  }}
                  className="group h-96 cursor-pointer perspective-distant focus:outline-none"
                >
                  <div
                    className={`relative size-full transition-transform duration-700 ease-out transform-3d group-focus-visible:rotate-y-180 lg:group-hover:rotate-y-180 motion-reduce:transition-none ${
                      flipped === index ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* ---------- FRONT ---------- */}
                    <div className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-2xl bg-white px-6 pb-8 pt-8 text-center shadow-md backface-hidden">
                      <span className="flex size-24 items-center justify-center rounded-full bg-stone-100 text-secondary">
                        <Icon size={42} strokeWidth={1.3} />
                      </span>

                      <h3 className="mt-6 font-display text-2xl leading-snug text-slate-900">
                        {stage.title}
                      </h3>
                      <p className="mt-2 font-manrope text-sm text-slate-500">
                        {stage.description}
                      </p>

                      <div className="mt-auto">
                        <p className="font-manrope text-xs font-bold uppercase tracking-widest text-slate-400">
                          Stage
                        </p>
                        <p className="font-display text-6xl leading-none text-lime-500">
                          {stage.number}
                        </p>
                      </div>

                      {/* Orange bottom bar */}
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-secondary" />
                    </div>

                    {/* ---------- BACK ---------- */}
                    <div className="absolute inset-0 flex rotate-y-180 flex-col items-center overflow-hidden rounded-2xl bg-emerald-800 px-6 pb-8 pt-8 text-center text-white shadow-2xl backface-hidden">
                      <span className="flex size-24 items-center justify-center rounded-full bg-lime-500 text-white">
                        <Icon size={42} strokeWidth={1.3} />
                      </span>

                      <h3 className="mt-6 font-display text-2xl leading-snug">
                        {stage.title}
                      </h3>
                      <p className="mt-2 font-manrope text-sm text-white/80">
                        {stage.description}
                      </p>

                      {/* Where this stage leads */}
                      <p className="mt-4 flex items-center gap-2 font-manrope text-xs font-bold uppercase tracking-wider text-secondary">
                        {isLast ? (
                          <>
                            <Check size={14} />
                            Pathway complete
                          </>
                        ) : (
                          <>
                            Next: {next.title}
                            <ArrowRight size={14} />
                          </>
                        )}
                      </p>

                      <div className="mt-auto">
                        <p className="font-manrope text-xs font-bold uppercase tracking-widest text-white/60">
                          Stage
                        </p>
                        <p className="font-display text-6xl leading-none text-white">
                          {stage.number}
                        </p>
                      </div>

                      {/* Orange bottom bar */}
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section3;