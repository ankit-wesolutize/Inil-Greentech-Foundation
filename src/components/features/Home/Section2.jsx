import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import aboutImg from "../../../assets/images/about-people.png"; // your Figma image
import useInView from "../../../hooks/useInView";

const titleLines = [
  "Building a Future Where People and Nature Thrive Together.",
];

const dotStyle = {
  backgroundImage:
    "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)",
  backgroundSize: "16px 16px",
};


const Section2 = () => {
  const [ref, inView] = useInView();

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-stone-50 py-20 lg:py-16"
    >
      {/* Soft background glows */}
      <div className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 size-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">

        {/* ================= LEFT: IMAGE COMPOSITION ================= */}
        <div className="relative pb-10 pr-4 sm:pr-10">

          {/* Offset outline frame */}
          <div
            className={`absolute -left-3 -top-3 size-full border-2 border-secondary ${fadeUp}`}
            style={{ animationDelay: "0.4s" }}
          />

          {/* Dotted pattern */}
          <div
            className={`absolute -bottom-2 -left-6 hidden size-28 text-primary/30 sm:block ${fadeUp}`}
            style={{ ...dotStyle, animationDelay: "0.8s" }}
          />

          {/* Image (wipes in from the left, zooms on hover) */}
          <div
            className={`group relative overflow-hidden shadow-2xl ${
              inView
                ? "animate-clip-reveal motion-reduce:animate-none"
                : "opacity-0"
            }`}
          >
            <img
              src={aboutImg}
              alt="Women farmers working in a green field"
              className="h-96 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/30 via-transparent to-transparent" />
          </div>

          {/* Floating blue card */}
          <div
            className={`absolute bottom-0 right-0 w-52 ${fadeUp}`}
            style={{ animationDelay: "1s" }}
          >
            <div className="animate-float bg-blue-700 p-4 shadow-2xl motion-reduce:animate-none">
              <Leaf size={28} className="text-white/80" strokeWidth={2} />
              <p className="mt-2 font-manrope text-base text-white font-medium">
                People and nature, progressing together.
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: CONTENT ================= */}
        <div>
          {/* Eyebrow */}
          <div
            className={`mb-4 flex items-center gap-3 ${fadeUp}`}
            style={{ animationDelay: "0.1s" }}>
            <span
              className={`h-0.5 w-10 origin-left bg-secondary ${
                inView ? "animate-clip-reveal" : "opacity-0"
              }`}
            />
            <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
              Who We Are
            </span>
          </div>

          {/* Title - line by line reveal */}
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

          {/* Paragraphs */}
          <div className="mt-4 space-y-4 font-manrope text-[15px] leading-[1.9] tracking-wide text-slate-600">
            <p className={fadeUp} style={{ animationDelay: "0.9s" }}>
              INIL Greentech Foundation works at the intersection of science,
              agriculture and community action. We develop practical pathways
              for climate-resilient farming, smarter resource use and stronger
              rural livelihoods.
            </p>
            <p className={fadeUp} style={{ animationDelay: "1.05s" }}>
              Our work is grounded in research, shared knowledge and the belief
              that lasting change is built with communities—not simply
              delivered to them.
            </p>
          </div>

          {/* Link */}
          <div className={fadeUp} style={{ animationDelay: "1.2s" }}>
            <Link
              to="/about"
              className="group relative mt-8 inline-flex items-center gap-3 pb-2 font-manrope text-xs font-bold uppercase tracking-wider text-primary transition-colors duration-300 hover:text-secondary"
            >
              Explore Our Story
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
              <span className="absolute inset-x-0 bottom-0 h-px bg-primary/30" />
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;