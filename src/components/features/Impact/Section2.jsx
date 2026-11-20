import React, { useEffect, useState } from "react";
import { GraduationCap, Info, MapPin, Sprout, Users } from "lucide-react";
import useInView from "../../../hooks/useInView";

// Generalized demonstration figures from the design - replace with official INIL data
const stats = [
  {
    value: 35,
    suffix: "+",
    label: "Community touchpoints",
    icon: Users,
  },
  {
    value: 12,
    suffix: "",
    label: "Training programmes",
    icon: GraduationCap,
  },
  {
    value: 8,
    suffix: "",
    label: "Field initiatives",
    icon: Sprout,
  },
  {
    value: 4,
    suffix: "",
    label: "Focus regions",
    icon: MapPin,
  },
];

// Counts from 0 to `value`. Runs when `run` turns true and again when `replayKey` changes.
const CountUp = ({ value, run, replayKey }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    let frame;
    const start = performance.now();
    const duration = replayKey === 0 ? 2200 : 1200;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value, replayKey]);

  return <>{count.toLocaleString("en-IN")}</>;
};

const StatCard = ({ stat, index, inView }) => {
  const [replayKey, setReplayKey] = useState(0);
  const Icon = stat.icon;

  return (
    <div
      onMouseEnter={() => inView && setReplayKey((k) => k + 1)}
      className={`group relative bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
        inView
          ? "animate-fade-up motion-reduce:animate-none"
          : "opacity-0"
      }`}
      style={{ animationDelay: `${0.5 + index * 0.15}s` }}
    >
      {/* Corner brackets: grow into a full frame on hover */}
      <span className="absolute left-0 top-0 size-14 border-l-2 border-t-2 border-secondary transition-all duration-500 ease-out group-hover:size-full group-hover:border-lime-700" />
      <span className="absolute bottom-0 right-0 size-14 border-b-2 border-r-2 border-secondary transition-all duration-500 ease-out group-hover:size-full group-hover:border-lime-700" />

      {/* Faint background icon */}
      <Icon
        className="pointer-events-none absolute bottom-6 right-6 size-28 text-slate-900/5 transition-all duration-700 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-secondary/20"
        strokeWidth={1.2}
      />

      <div className="relative">
        {/* Number */}
        <p className="font-dmserif-display text-5xl leading-none text-lime-800 transition-colors duration-500 group-hover:text-primary lg:text-6xl">
          <CountUp value={stat.value} run={inView} replayKey={replayKey} />
          <span className="text-secondary">{stat.suffix}</span>
        </p>

        {/* Label */}
        <h3 className="mt-5 font-manrope text-sm font-bold uppercase tracking-wider text-slate-900">
          {stat.label}
        </h3>

        {/* Muted note + animated underline */}
        <span className="mt-4 block h-0.5 w-8 bg-secondary transition-all duration-500 group-hover:w-16" />
        <p className="mt-3 font-manrope text-xs text-slate-400">
          Generalized example
        </p>
      </div>
    </div>
  );
};

const Section2 = () => {
  const [ref, inView] = useInView(0.25);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-stone-50 py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-lime-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= EYEBROW ================= */}
        <div
          className={`flex items-center gap-3 ${fadeUp}`}
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-0.5 w-10 bg-secondary" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
            Impact at a Glance
          </span>
        </div>

        {/* ================= DEMO DATA NOTICE ================= */}
        {/* Remove this block once official INIL measurements are in place */}
        {/* <div
          className={`flex max-w-3xl items-start gap-4 border-l-4 border-secondary bg-amber-100/70 px-6 py-5 ${fadeUp}`}
          style={{ animationDelay: "0.25s" }}
        >
          <Info size={20} className="mt-0.5 shrink-0 text-secondary" />
          <p className="font-manrope text-sm leading-7 text-slate-700">
            These figures are generalized demonstration data for website layout
            purposes. Replace them with official INIL measurements when
            available.
          </p>
        </div> */}

        {/* ================= STATS ================= */}
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;