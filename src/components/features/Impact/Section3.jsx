import React, { useEffect, useState } from "react";
import useInView from "../../../hooks/useInView";
import { stats } from "../../../data/ImpactPageData";

const titleLines = ["Change across connected systems.",];

const dotStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};



const CountUp = ({ value, run, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    let frame;
    const start = performance.now();
    const duration = 1800;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value]);

  return (
    <>
      {count.toLocaleString("en-IN")}
      {suffix}
    </>
  );
};

const Section3 = () => {
  const [ref, inView] = useInView(0.2);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-lime-900 py-20 lg:py-16"
    >
      {/* Background: dots, glows, ring */}
      <div className="absolute inset-0 -z-10 opacity-70" style={dotStyle} />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/20 via-transparent to-black/30" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 -z-10 size-160 rounded-full border border-white/10">
        <div className="absolute inset-12 animate-spin-slow rounded-full border-2 border-dashed border-white/10 motion-reduce:animate-none" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER (centered) ================= */}
        <div className="mx-auto max-w-4xl text-center">
          <div
            className={`mb-3 flex items-center justify-center gap-3 ${fadeUp}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-0.5 w-10 bg-secondary" />
            <span className="font-manrope text-xs font-bold uppercase tracking-widest text-white/80">
              Generalized outcomes
            </span>
            {/* <span className="h-0.5 w-10 bg-secondary" /> */}
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
        </div>

        {/* ================= CHEVRON CARDS ================= */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:gap-0">
          {stats.map((item, index) => {
            const Icon = item.icon;
            const hasValue = item.value !== null;

            return (
              <div
                key={item.number}
                className={`group transition-all duration-500 hover:-translate-y-2 hover:drop-shadow-2xl lg:flex-1 ${
                  index > 0 ? "lg:-ml-5" : ""
                } ${
                  inView
                    ? "animate-slide-in motion-reduce:animate-none"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${1 + index * 0.18}s` }}
              >
                <article
                  className={`relative h-full overflow-hidden rounded-2xl p-6 lg:rounded-none lg:pr-10 ${
                    index === 0 ? "lg:pl-8" : "lg:pl-12"
                  } ${item.clip} ${item.card}`}
                >
                  {/* Top accent bar sweeps in on hover */}
                  <span className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100" />

                  {/* Hover light */}
                  <span className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/40 lg:group-hover:bg-white/30" />

                  <div className="relative">
                    {/* Icon + number */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex size-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${item.iconBox}`}
                      >
                        <Icon size={20} strokeWidth={2} />
                      </span>
                      {/* <span
                        className={`font-manrope text-sm font-bold ${item.numberColor}`}>
                        {item.number}
                      </span> */}
                    </div>

                    {/* Status label with pulsing dot */}
                    {/* <div
                      className={`mt-8 flex items-center gap-2 font-manrope text-xs font-bold uppercase tracking-widest ${item.label}`}
                    >
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75 motion-reduce:animate-none" />
                        <span className="relative inline-flex size-2 rounded-full bg-secondary" />
                      </span>
                      {hasValue ? "Verified data" : "Awaiting verified data"}
                    </div> */}

                    {/* Big number (only when verified data is supplied) */}
                    {hasValue && (
                      <p
                        className={`mt-4 font-display text-5xl ${item.heading}`}
                      >
                        <CountUp
                          value={item.value}
                          run={inView}
                          suffix={item.suffix}
                        />
                      </p>
                    )}

                    {/* Title */}
                    <h3
                      className={`mt-3 font-manrope text-xl font-extrabold ${item.heading}`}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`mt-4 font-manrope text-sm leading-[1.9] tracking-wide ${item.text}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section3;