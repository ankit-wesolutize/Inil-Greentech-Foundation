import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sprout,
} from "lucide-react";
import useInView from "../../../hooks/useInView";
import approachImg from "../../../assets/images/approach.png"; // your ChatGPT image
import { steps } from "../../../data/HomePageData";

const titleLines = ["From insight to lasting ownership."];

const dotStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const STEP_MS = 3500;

const Section7 = () => {
  const [ref, inView] = useInView(0.15);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  // Highlight cycles through the steps (paused on hover, off for reduced motion)
  useEffect(() => {
    if (!inView || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(
      () => setActive((prev) => (prev + 1) % steps.length),
      STEP_MS
    );
    return () => clearInterval(id);
  }, [inView, paused]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-emerald-900 py-20 lg:py-16"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-70" style={dotStyle} />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-white/5 via-transparent to-black/30" />
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 size-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* ================= LEFT: CONTENT ================= */}
        <div>
          {/* Logo mark + vertical line + heading block */}
          <div className="flex gap-6">
            <div
              className={`shrink-0 border-r border-white/20 pr-6 ${fadeUp}`}
              style={{ animationDelay: "0.1s" }}
            >
              <Sprout size={44} className="text-lime-400" strokeWidth={1.8} />
            </div>

            <div>
              <div
                className={`mb-4 flex items-center gap-3 ${fadeUp}`}
                style={{ animationDelay: "0.15s" }}
              >
                <span className="h-0.5 w-8 bg-secondary" />
                <span className="font-manrope text-xs font-bold uppercase tracking-widest text-white/70">
                  Our Approach
                </span>
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
                className={`mt-5 max-w-lg font-manrope text-sm leading-[1.8] tracking-wide text-white/75 ${fadeUp}`}
                style={{ animationDelay: "0.6s" }}
              >
                A practical model that starts by listening and ends with
                communities equipped to carry progress forward.
              </p>
            </div>
          </div>

          {/* Steps list */}
          <div
            className="mt-10 border-b border-white/15"
            onMouseLeave={() => setPaused(false)}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = active === index;

              return (
                <div
                  key={step.number}
                  onMouseEnter={() => {
                    setActive(index);
                    setPaused(true);
                  }}
                  className={`relative flex cursor-default items-start gap-4 border-t border-white/15 px-4 py-4 transition-colors duration-500 ${
                    isActive ? "bg-white/10" : "bg-transparent"
                  } ${
                    inView
                      ? "animate-slide-in motion-reduce:animate-none"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.7 + index * 0.12}s` }}
                >
                  {/* Left accent bar */}
                  <span
                    className={`absolute left-0 top-0 h-full w-1 origin-top bg-secondary transition-transform duration-500 ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  {/* Icon box */}
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-lg transition-all duration-500 ${
                      isActive
                        ? "rotate-6 scale-110 bg-secondary text-primary"
                        : "bg-white/10 text-green-300"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.7} />
                  </span>

                  {/* Text */}
                  <div
                    className={`flex-1 transition-transform duration-500 ${
                      isActive ? "translate-x-1" : ""
                    }`}
                  >
                    <h3 className="font-manrope text-lg font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 font-manrope text-sm leading-6 text-white/70">
                      {step.description}
                    </p>
                  </div>

                  {/* Number */}
                  {/* <span
                    className={`font-display text-lg transition-colors duration-500 ${
                      isActive ? "text-secondary" : "text-white/30"
                    }`}
                  >
                    {step.number}
                  </span> */}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT: IMAGE ================= */}
        <div className="relative min-h-128 lg:min-h-0">
          <div
            className={`group absolute inset-0 overflow-hidden rounded-3xl shadow-2xl ${
              inView
                ? "animate-clip-reveal motion-reduce:animate-none"
                : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <img
              src={approachImg}
              alt="Community-led agriculture in the field"
              className="size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Green tint, stronger at the bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-emerald-900/90 via-emerald-900/10 to-transparent" />
          </div>

          {/* Rotating badge */}
          <div
            className={`absolute -left-4 top-8 hidden size-28 items-center justify-center rounded-full bg-secondary shadow-2xl sm:flex ${fadeUp}`}
            style={{ animationDelay: "1.1s" }}
          >
            <span className="absolute -inset-2 animate-spin-slow rounded-full border-2 border-dashed border-secondary/70 motion-reduce:animate-none" />
            <div className="text-center text-primary">
              <p className="font-display text-4xl leading-none">05</p>
              <p className="mt-1 font-manrope text-xs font-bold uppercase tracking-widest">
                Steps
              </p>
            </div>
          </div>

          {/* White card overlapping the bottom */}
          <div
            className={`absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6 ${fadeUp}`}
            style={{ animationDelay: "1.3s" }}
          >
            <div className="animate-float rounded-2xl bg-white p-6 shadow-2xl motion-reduce:animate-none">
              <p className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
                How We Work
              </p>
              <p className="mt-3 font-manrope text-sm leading-7 text-slate-600">
                Understand, collaborate, act, empower, measure: a cycle that
                keeps learning from outcomes and improving what works.
              </p>
              <Link
                to="/approach"
                className="group/link relative mt-5 inline-flex items-center gap-3 pb-2 font-manrope text-xs font-bold uppercase tracking-wider text-primary transition-colors duration-300 hover:text-secondary"
              >
                How We Work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/link:translate-x-2"
                />
                <span className="absolute inset-x-0 bottom-0 h-px bg-primary/30" />
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 group-hover/link:scale-x-100" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section7;