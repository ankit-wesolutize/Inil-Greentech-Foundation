import React from "react";
import useInView from "../../../hooks/useInView";

import mainImg from "../../../assets/images/research.png";
import secondaryImg from "../../../assets/images/water.png";
import { guides } from "../../../data/AboutPageData";

const titleLines = ["Values that hold the work together."];



const dotGridStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(77,124,15,0.7) 2px, transparent 2px)",
  backgroundSize: "18px 18px",
};

const Section4 = () => {
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
      className="relative overflow-hidden bg-white py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-lime-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">

        {/* ================= LEFT: IMAGES + ILLUSTRATIONS ================= */}
        <div className="relative mx-auto h-136 w-full max-w-lg">

          {/* Dotted pattern (top right of the main image) */}
          <div
            className={`absolute right-18 -top-5 size-32 ${fadeUp}`}
            style={{ ...dotGridStyle, animationDelay: "0.6s" }}
          />

          {/* Main image */}
          <div
            className={`group absolute left-0 top-6 h-96 w-3/4 overflow-hidden rounded-3xl shadow-xl ${
              inView
                ? "animate-clip-reveal motion-reduce:animate-none"
                : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <img
              src={mainImg}
              alt="Community and environment at work"
              className="size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
          </div>

          {/* Secondary image (overlaps the main image) */}
          <div
            className={`absolute bottom-0 right-0 w-1/2 ${fadeUp}`}
            style={{ animationDelay: "0.7s" }}
          >
            <div className="animate-float motion-reduce:animate-none">
              <div className="group h-80 overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={secondaryImg}
                  alt="A farmer with fresh produce"
                  className="size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Leaf illustration (SVG) */}
          <div
            className={`absolute right-0 top-40 z-10 w-20 ${fadeUp}`}
            style={{ animationDelay: "1.1s" }}
          >
            <div className="animate-float motion-reduce:animate-none">
              <svg
                viewBox="0 0 120 140"
                className="w-full -rotate-12 drop-shadow-lg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="leafGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#bef264" />
                    <stop offset="55%" stopColor="#65a30d" />
                    <stop offset="100%" stopColor="#14532d" />
                  </linearGradient>
                </defs>
                <path
                  d="M60 6C100 30 114 82 62 134 12 92 16 36 60 6Z"
                  fill="url(#leafGradient)"
                />
                <path
                  d="M62 132C60 90 58 50 60 12"
                  fill="none"
                  stroke="#ecfccb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M60 100C48 92 38 84 30 72M60 80C74 72 84 62 90 50M60 62C50 56 42 48 38 38M60 48C68 42 74 36 78 28"
                  fill="none"
                  stroke="#ecfccb"
                  strokeOpacity="0.7"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Sparkle star (SVG) */}
          <div
            className={`absolute bottom-4 left-1/4 w-12 ${fadeUp}`}
            style={{ animationDelay: "1.3s" }}
          >
            <svg
              viewBox="0 0 48 48"
              className="w-full animate-spin-slow text-lime-700 motion-reduce:animate-none"
              aria-hidden="true"
            >
              <path
                d="M24 0C26 14 34 22 48 24 34 26 26 34 24 48 22 34 14 26 0 24 14 22 22 14 24 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* ================= RIGHT: CONTENT ================= */}
        <div>
          {/* Eyebrow with leaf icon */}
          <div
            className={`mb-3 flex items-center gap-2 ${fadeUp}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-0.5 w-10 bg-secondary" />
            <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
              What Guides Us
            </span>
          </div>

          {/* Heading */}
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

          {/* Paragraph - placeholder, edit or delete */}
          <p
            className={`mt-3 max-w-xl font-manrope text-sm leading-[1.8] tracking-wide text-slate-600 ${fadeUp}`}
            style={{ animationDelay: "0.6s" }}
          >
            Four principles shape how INIL listens, plans and works alongside
            communities and ecosystems.
          </p>

          {/* 2x2 values */}
          <div className="mt-7 grid gap-x-6 gap-y-8 sm:grid-cols-2">
            {guides.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className={`group flex items-start gap-4 ${fadeUp}`}
                  style={{ animationDelay: `${0.8 + index * 0.15}s` }}
                >
                  {/* Icon badge */}
                  <div className="relative shrink-0">
                    <span className="absolute -inset-1.5 animate-spin-slow rounded-full border border-dashed border-lime-700/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:animate-none" />
                    <span className="relative flex size-14 items-center justify-center rounded-full border border-lime-100 bg-white text-lime-700 shadow-md transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-lime-700 group-hover:bg-lime-700 group-hover:text-white">
                      <Icon size={26} strokeWidth={2} />
                    </span>
                  </div>

                  {/* Text */}
                  <div className="transition-transform duration-500 group-hover:translate-x-1">
                    {/* <p className="font-manrope text-xs font-bold text-secondary">
                      {value.number}
                    </p> */}
                    <h3 className="mt-1 font-manrope text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-lime-700">
                      {value.title}
                    </h3>
                    <p className="mt-2 font-manrope text-sm leading-[1.8] tracking-wide text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;