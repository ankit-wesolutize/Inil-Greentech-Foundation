import React, { useEffect, useState } from "react";
import { Repeat } from "lucide-react";
import useInView from "../../../hooks/useInView";
import { steps } from "../../../data/ApproachPageData";

const titleLines = ["A connected path to", "sustainable outcomes."];



const dotStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const STEP_MS = 3500;

const Section2 = () => {
  const [ref, inView] = useInView(0.2);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  // Highlight travels along the steps (paused on hover, off for reduced motion)
  useEffect(() => {
    if (!inView || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(
      () => setActive((prev) => (prev + 1) % steps.length),
      STEP_MS
    );
    return () => clearInterval(id);
  }, [inView, paused]);

  const current = steps[active];

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-emerald-950 py-20 lg:py-16"
    >
      {/* ===== Background ===== */}
      <div className="absolute inset-0 -z-10 opacity-70" style={dotStyle} />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-emerald-900/60 via-transparent to-black/40" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-160 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-48 -z-10 size-160 rounded-full border border-white/10">
        <div className="absolute inset-12 animate-spin-slow rounded-full border-2 border-dashed border-white/10 motion-reduce:animate-none" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={`mb-6 flex items-center justify-center gap-3 ${fadeUp}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-0.5 w-10 bg-secondary" />
            <span className="font-manrope text-xs font-bold uppercase tracking-widest text-white/80">
              Development Model
            </span>
            <span className="h-0.5 w-10 bg-secondary" />
          </div>

          <h2 className="font-dmserif-display text-4xl leading-tight text-white">
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

          <p
            className={`mx-auto mt-3 max-w-2xl font-manrope text-sm leading-[1.8] tracking-wide text-white/75 ${fadeUp}`}
            style={{ animationDelay: "0.7s" }}
          >
            Participation and evidence are built into every stage. Monitoring
            is not a final step—it informs the work throughout.
          </p>
        </div>

        {/* ================= DESKTOP: ARC PATH ================= */}
        <div
          className="hidden lg:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto h-90 max-w-5xl">

            {/* Path + feedback loop */}
            <svg
              className="absolute inset-0 size-full"
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              {/* faint base path */}
              <path
                d="M100,210 C133.3,195 233.3,142.5 300,120 C366.7,97.5 433.3,75 500,75 C566.7,75 633.3,97.5 700,120 C766.7,142.5 866.7,195 900,210"
                className="stroke-white/15"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* drawn path */}
              <path
                d="M100,210 C133.3,195 233.3,142.5 300,120 C366.7,97.5 433.3,75 500,75 C566.7,75 633.3,97.5 700,120 C766.7,142.5 866.7,195 900,210"
                className={`stroke-secondary ${
                  inView ? "animate-draw motion-reduce:animate-none" : "opacity-0"
                }`}
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength="1"
                strokeDasharray="1"
              />
              {/* feedback loop: Measure back to Understand */}
              <path
                d="M900,232 C900,300 100,300 100,232"
                className={`stroke-white/35 ${
                  inView
                    ? "animate-dash-flow motion-reduce:animate-none"
                    : "opacity-0"
                }`}
                strokeWidth="2"
                strokeDasharray="6 6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Loop label */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 ${fadeUp}`}
              style={{ top: "92%", animationDelay: "3s" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-emerald-900 px-4 py-2 font-manrope text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                <Repeat size={14} className="text-secondary" />
                Monitoring informs every stage
              </span>
            </div>

            {/* Nodes */}
            {steps.map((step, index) => {
              const isActive = active === index;

              return (
                <div
                  key={step.number}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 ${fadeUp}`}
                  style={{
                    left: `${step.left}%`,
                    top: `${step.top}%`,
                    animationDelay: `${1 + index * 0.35}s`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    aria-label={`${step.number} ${step.title}`}
                    className="group relative flex flex-col items-center"
                  >
                    {/* Pulse + dashed ring */}
                    <span className="relative flex size-16 items-center justify-center">
                      {isActive && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-secondary/40 motion-reduce:animate-none" />
                      )}
                      <span
                        className={`absolute -inset-3 animate-spin-slow rounded-full border border-dashed transition-opacity duration-500 motion-reduce:animate-none ${
                          isActive
                            ? "border-secondary opacity-100"
                            : "border-white/40 opacity-0 group-hover:opacity-100"
                        }`}
                      />
                      <span
                        className={`relative flex size-16 items-center justify-center rounded-full border-2 font-display text-xl transition-all duration-500 ${
                          isActive
                            ? "scale-110 border-secondary bg-secondary text-primary shadow-2xl"
                            : "border-white/30 bg-emerald-900 text-white group-hover:border-secondary"
                        }`}
                      >
                        {step.number}
                      </span>
                    </span>

                    {/* Label */}
                    <span
                      className={`mt-4 font-manrope text-base font-bold transition-colors duration-500 ${
                        isActive ? "text-secondary" : "text-white"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Detail card for the active step */}
          <div
            className={`mx-auto mt-6 max-w-2xl ${fadeUp}`}
            style={{ animationDelay: "2.2s" }}
          >
            <div
              key={current.number}
              className="animate-fade-up rounded-2xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-md motion-reduce:animate-none"
            >
              <p className="font-manrope text-xs font-bold uppercase tracking-widest text-secondary">
                Step {current.number}
              </p>
              <h3 className="mt-3 font-display text-3xl text-white">
                {current.title}
              </h3>
              <p className="mt-3 font-manrope text-base leading-7 text-white/80">
                {current.description}
              </p>

              {/* Progress dots */}
              <div className="mt-6 flex items-center justify-center gap-2">
                {steps.map((step, index) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Go to ${step.title}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      active === index
                        ? "w-8 bg-secondary"
                        : "w-3 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE / TABLET: VERTICAL PATH ================= */}
        <div className="relative mx-auto mt-14 max-w-xl lg:hidden">
          <span className="absolute bottom-0 left-6 top-0 w-px bg-white/20" />

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`group relative pl-20 ${
                  inView
                    ? "animate-slide-in motion-reduce:animate-none"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${0.8 + index * 0.15}s` }}
              >
                <span className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border-2 border-secondary bg-emerald-900 font-display text-lg text-secondary transition-all duration-500 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary">
                  {step.number}
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-500 group-hover:bg-white/10">
                  <h3 className="font-display text-2xl text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-manrope text-sm leading-7 text-white/75">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            <div
              className={`pl-20 ${fadeUp}`}
              style={{ animationDelay: "1.8s" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/50 px-4 py-2 font-manrope text-xs font-bold uppercase tracking-widest text-white">
                <Repeat size={14} className="text-secondary" />
                Monitoring informs every stage
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;