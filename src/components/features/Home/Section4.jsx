import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useInView from "../../../hooks/useInView";
import { focusAreas } from "../../../data/HomePageData";

const titleLines = [
  "Creating Change Across Communities and Ecosystems.",
];


const AUTOPLAY_MS = 4000;

const Section4 = () => {
  const [sectionRef, inView] = useInView(0.15);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  // One step = the width of one card
  const getStep = () => trackRef.current?.firstElementChild?.offsetWidth ?? 0;

  const next = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= max - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" }); // loop back
    } else {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    }
  }, []);

  const prev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft <= 4) {
      track.scrollTo({ left: max, behavior: "smooth" }); // loop to end
    } else {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    }
  }, []);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
  };

  // Auto scroll (paused on hover/focus, disabled for reduced motion)
  useEffect(() => {
    if (!inView || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [inView, paused, next]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-green-50 py-20 lg:py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 size-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div>
            <div
              className={`mb-4 flex items-center gap-3 ${fadeUp}`}
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-0.5 w-10 bg-secondary" />
              <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
                Our Focus Areas
              </span>
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

          <div className="max-w-md">
            <p
              className={`font-manrope text-[15px] leading-[1.9] tracking-wide text-slate-600 ${fadeUp}`}
              style={{ animationDelay: "0.8s" }}
            >
              Three connected pillars—research, smart agriculture and circular
              resource management—shape our work from insight to measurable
              field action.
            </p>

            {/* Carousel buttons */}
            <div
              className={`mt-6 flex justify-end gap-3 ${fadeUp}`}
              style={{ animationDelay: "1s" }}
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Previous focus area"
                className="flex size-11 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 hover:-translate-x-1 hover:border-primary hover:bg-primary hover:text-white"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next focus area"
                className="flex size-11 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 hover:translate-x-1 hover:border-primary hover:bg-primary hover:text-white"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= CAROUSEL ================= */}
        <div
          className="mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="no-scrollbar -mx-3 -my-6 flex snap-x snap-mandatory overflow-x-auto py-6"
          >
            {focusAreas.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className={`shrink-0 basis-full snap-start px-3 sm:basis-1/2 lg:basis-1/3 ${fadeUp}`}
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <article className="group relative flex h-full flex-col rounded-2xl border-2 border-lime-400 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:bg-primary hover:shadow-xl">

                    {/* Number */}
                    {/* <span className="absolute right-8 top-8 font-display text-lg text-secondary">
                      {item.number}
                    </span> */}

                    {/* Title */}
                    <h3 className="font-manrope font-extrabold text-[20px] text-primary transition-colors duration-500 group-hover:text-white">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 font-manrope text-sm leading-[1.9] tracking-wide text-slate-600 transition-colors duration-500 group-hover:text-white/80">
                      {item.description}
                    </p>

                    {/* Link */}
                    <Link
                      to={item.href}
                      className="mt-6 inline-flex items-center gap-2 self-start font-manrope text-sm font-bold uppercase tracking-wider text-primary transition-colors duration-500 group-hover:text-secondary"
                    >
                      Explore More
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </Link>

                    {/* Pill image + icon badge */}
                    <div className="relative mt-auto pt-8">
                      <div className="h-44 overflow-hidden rounded-full">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </div>

                      <span className="absolute -bottom-2 -right-2 flex size-14 items-center justify-center rounded-full border-4 border-white bg-secondary text-primary shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:border-primary">
                        <Icon size={22} strokeWidth={1.8} />
                      </span>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-12 h-0.5 w-full bg-primary/10">
            <div
              className="h-full bg-secondary transition-all duration-300"
              style={{ width: `${10 + progress * 90}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;