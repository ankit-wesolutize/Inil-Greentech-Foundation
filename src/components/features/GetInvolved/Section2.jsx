import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
} from "lucide-react";
import useInView from "../../../hooks/useInView";
import { ways } from "../../../data/GetInvolvedData";

const titleLines = ["Find your way to contribute."];

const description =
  "Connect with INIL to explore a responsible, goal-aligned way to contribute.";


const dotStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

// const bannerDotStyle = {
//   backgroundImage:
//     "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
//   backgroundSize: "24px 24px",
// };

// Moves the hover light to follow the cursor
const handleMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

const spotlightStyle = {
  background:
    "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.16), transparent 60%)",
};

const Section2 = () => {
  const [ref, inView] = useInView(0.1);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-stone-50 py-16"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={dotStyle} />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 -z-10 size-96 rounded-full bg-lime-600/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER (remove if your page already has one) ================= */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={`mb-3 flex items-center justify-center gap-3 ${fadeUp}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-0.5 w-10 bg-secondary" />
            <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
              Ways to Get Involved
            </span>
            {/* <span className="h-0.5 w-10 bg-secondary" /> */}
          </div>

          <h2 className="font-dmserif-display text-4xl leading-tight text-slate-800">
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

        {/* ================= CARDS ================= */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {ways.map((way, index) => {
            const Icon = way.icon;

            return (
              <Link
                key={way.title}
                to="/contact"
                onMouseMove={handleMove}
                className={`group relative isolate flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl ${fadeUp}`}
                style={{ animationDelay: `${0.6 + index * 0.12}s` }}
              >
                {/* Dark green fill grows from inside the card on hover */}
                <span className="absolute -bottom-40 -left-40 -z-10 size-200 scale-0 rounded-full bg-primary transition-transform duration-700 ease-out group-hover:scale-100" />

                {/* Cursor-following light */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={spotlightStyle}
                />

                {/* Big faint icon in the background */}
                <Icon
                  className="pointer-events-none absolute -right-4 -top-4 -z-10 size-40 text-slate-900/5 transition-all duration-700 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-white/10"
                  strokeWidth={1}
                />

                {/* Badge + number */}
                <div className="flex items-start justify-between">
                  <span
                    className={`flex size-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary ${way.tint}`}
                  >
                    <Icon size={26} strokeWidth={1.6} />
                  </span>
                  {/* <span className="font-display text-lg text-secondary">
                    {way.number}
                  </span> */}
                </div>

                {/* Title */}
                <h3 className="mt-4 font-manrope text-2xl font-medium leading-snug text-slate-900 transition-colors duration-500 group-hover:text-white">
                  {way.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 font-manrope text-sm leading-[1.8] tracking-wide text-slate-600 transition-colors duration-500 group-hover:text-white/75">
                  {description}
                </p>

                {/* Link text */}
                <span className="relative mt-auto inline-flex items-center gap-2 self-start pb-2 pt-6 font-manrope text-xs font-bold uppercase tracking-wider text-primary transition-colors duration-500 group-hover:text-secondary">
                  Make an Enquiry
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-px bg-primary/30 transition-colors duration-500 group-hover:bg-white/30" />
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 group-hover:scale-x-100" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section2;