import React from "react";
import useInView from "../../../hooks/useInView";
import { values } from "../../../data/AboutPageData";



const Section2 = () => {
  const [ref, inView] = useInView(0.2);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-stone-50 py-20 lg:py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-lime-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= EYEBROW ================= */}
        <div
          className={`mb-6 flex items-center gap-3 ${fadeUp}`}
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-0.5 w-10 bg-secondary" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
            Our Values
          </span>
        </div>

        {/* ================= VALUES GRID ================= */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-secondary/50 hover:shadow-xl ${fadeUp}`}
                style={{ animationDelay: `${0.3 + index * 0.15}s` }}
              >
                {/* Ghost number */}
                <span className="pointer-events-none absolute -bottom-4 right-4 select-none font-display text-9xl leading-none text-slate-900/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:text-secondary/20">
                  {item.number}
                </span>

                {/* Top accent bar */}
                <span className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <div className="relative">
                  {/* Icon + number */}
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      {/* Spinning dashed ring (visible on hover) */}
                      <span className="absolute -inset-2 animate-spin-slow rounded-full border border-dashed border-lime-600/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:animate-none" />
                      <span className="relative flex size-16 items-center justify-center rounded-full border border-lime-600/30 text-lime-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                        <Icon size={30} strokeWidth={2} />
                      </span>
                    </div>

                    {/* <span className="font-display text-lg text-secondary">
                      {item.number}
                    </span> */}
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 font-manrope text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  {/* Underline: wipes in, then grows on hover */}
                  <span
                    className={`mt-4 block h-0.5 w-10 bg-slate-900 transition-all duration-500 group-hover:w-20 group-hover:bg-secondary ${
                      inView
                        ? "animate-clip-reveal motion-reduce:animate-none"
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                  />

                  {/* Description */}
                  <p className="mt-4 font-manrope text-sm leading-[1.7] tracking-wide text-slate-600">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section2;