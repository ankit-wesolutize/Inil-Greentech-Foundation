import React, { useState } from "react";
import {
  ClipboardCheck,
  HeartHandshake,
  Info,
  Rocket,
  Users,
} from "lucide-react";
import useInView from "../../../hooks/useInView";

const titleLines = ["Data with context"];

// Placeholder shapes only (percent of chart height). Replace with validated data later.
const metrics = [
  {
    id: "communities",
    label: "Communities reached",
    icon: Users,
    values: [30, 48, 70, 92],
  },
  {
    id: "people",
    label: "People impacted",
    icon: HeartHandshake,
    values: [22, 40, 66, 84],
  },
  {
    id: "projects",
    label: "Projects completed",
    icon: ClipboardCheck,
    values: [36, 52, 62, 88],
  },
  {
    id: "initiatives",
    label: "Initiatives conducted",
    icon: Rocket,
    values: [18, 44, 58, 76],
  },
];

const years = ["Year 1", "Year 2", "Year 3", "Year 4"];

const gridLines = [0, 1, 2, 3];

// Diagonal stripes on each bar to signal that the data is a placeholder
const stripeStyle = {
  backgroundImage:
    "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 6px, transparent 6px, transparent 12px)",
};

const Section4 = () => {
  const [ref, inView] = useInView(0.2);
  const [activeId, setActiveId] = useState(metrics[0].id);

  const active = metrics.find((metric) => metric.id === activeId);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-lime-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">

        {/* ================= LEFT: CONTENT ================= */}
        <div className="lg:col-span-5">
          <div
            className={`mb-3 flex items-center gap-3 ${fadeUp}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-0.5 w-10 bg-secondary" />
            <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
              Year-wise Progress
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

          <p
            className={`mt-3 max-w-md font-manrope text-sm leading-[1.8] tracking-wide text-slate-600 ${fadeUp}`}
            style={{ animationDelay: "0.6s" }}
          >
            Charts will become active when validated annual data and
            methodology are supplied.
          </p>

          {/* Metric tabs */}
          <div
            role="tablist"
            aria-label="Choose a measure"
            className="mt-8 flex flex-wrap gap-3"
          >
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              const isActive = activeId === metric.id;

              return (
                <button
                  key={metric.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(metric.id)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2.5 font-manrope text-xs font-bold uppercase tracking-wider transition-all duration-300 ${fadeUp} ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-lg"
                      : "border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  }`}
                  style={{ animationDelay: `${0.75 + index * 0.1}s` }}
                >
                  <Icon size={14} />
                  {metric.label}
                </button>
              );
            })}
          </div>

          {/* Status note */}
          {/* <p
            className={`mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-100/70 px-4 py-3 font-manrope text-sm text-slate-700 ${fadeUp}`}
            style={{ animationDelay: "1.2s" }}
          >
            <Info size={16} className="shrink-0 text-secondary" />
            Awaiting validated data
          </p> */}
        </div>

        {/* ================= RIGHT: CHART ================= */}
        <div
          className={`lg:col-span-7 ${fadeUp}`}
          style={{ animationDelay: "0.5s" }}
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">

            {/* Chart header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 font-manrope text-sm font-bold text-slate-900">
                <span className="size-2.5 rounded-full bg-secondary" />
                {active.label}
              </p>
              <p className="font-manrope text-xs italic text-slate-500">
                Placeholder visualisation
              </p>
            </div>

            {/* Chart area */}
            <div
              role="img"
              aria-label="Placeholder bar chart. Validated data will replace it."
              className="relative mt-8 h-72 border-b border-l border-slate-200 sm:h-80"
            >
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {gridLines.map((line) => (
                  <span
                    key={line}
                    className={`h-px w-full border-t border-dashed border-slate-200 transition-opacity duration-1000 ${
                      inView ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              {/* Bars */}
              <div className="absolute inset-0 flex items-end justify-around px-4 sm:px-8">
                {active.values.map((value, index) => (
                  <div
                    key={years[index]}
                    className="group relative flex h-full w-1/5 items-end"
                  >
                    {/* Tooltip */}
                    <span
                      className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 font-manrope text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100"
                      style={{ bottom: `${value}%` }}
                    >
                      Awaiting data
                    </span>

                    {/* Bar */}
                    <div
                      aria-hidden="true"
                      className={`relative w-full rounded-t-md transition-all duration-1000 ease-out group-hover:bg-secondary group-hover:shadow-xl motion-reduce:transition-none ${
                        index % 2 === 0 ? "bg-emerald-200" : "bg-emerald-800"
                      }`}
                      style={{
                        height: inView ? `${value}%` : "0%",
                        transitionDelay: `${0.8 + index * 0.15}s`,
                      }}
                    >
                      <span
                        className="absolute inset-0 rounded-t-md"
                        style={stripeStyle}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* X axis labels */}
            <div className="flex justify-around px-4 pt-3 sm:px-8">
              {years.map((year) => (
                <span
                  key={year}
                  className="w-1/5 text-center font-manrope text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;