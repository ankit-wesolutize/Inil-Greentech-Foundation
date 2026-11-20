import React from "react";
import { Leaf} from "lucide-react";
import useInView from "../../../hooks/useInView";
import { panels } from "../../../data/HomePageData";



const dotStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const Panel = ({ item, index }) => {
  const [ref, inView] = useInView();
  const Icon = item.icon;
  const base = index * 0.2;

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  return (
    <div
      ref={ref}
      className={`group relative isolate overflow-hidden ${item.bg}`}
    >
      {/* Texture + light gradient */}
      <div className="absolute inset-0 -z-10 opacity-60" style={dotStyle} />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-white/10 via-transparent to-black/25" />

      {/* Concentric rings (top-right) */}
      <div className="pointer-events-none absolute -right-28 -top-28 -z-10 transition-transform duration-700 ease-out group-hover:scale-110">
        <div className="flex size-96 items-center justify-center rounded-full bg-white/5">
          <div className="flex size-72 items-center justify-center rounded-full bg-white/5">
            <div className="size-48 rounded-full border border-white/20" />
          </div>
        </div>
        <div className="absolute -inset-6 animate-spin-slow rounded-full border-2 border-dashed border-white/15 motion-reduce:animate-none" />
      </div>

      {/* Large faint number */}
      <span className="pointer-events-none absolute bottom-4 right-6 -z-10 select-none font-display text-9xl text-white/5 transition-colors duration-700 group-hover:text-white/10">
        {item.number}
      </span>

      {/* Content */}
      <div className="px-6 py-20 sm:px-12 lg:px-20 lg:py-16">

        {/* Icon with pulse */}
        <div
          className={`relative mb-10 flex size-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${fadeUp}`}
          style={{ animationDelay: `${base + 0.1}s` }}
        >
          <span className="absolute inset-0 animate-ping rounded-full border border-white/30 motion-reduce:animate-none" />
          <Icon size={24} strokeWidth={1.5} />
        </div>

        {/* Eyebrow */}
        <div
          className={`flex items-center gap-3 mb-4 ${fadeUp}`}
          style={{ animationDelay: `${base + 0.2}s` }}
        >
          <span className="h-0.5 w-8 bg-secondary" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest text-white/80">
            {item.eyebrow}
          </span>
        </div>

        {/* Statement - line by line reveal */}
        <h2 className="max-w-xl font-dmserif-display text-2xl leading-snug text-white tracking-wide">
          {item.lines.map((line, i) => (
            <span key={line} className="-my-1 block overflow-hidden py-1">
              <span
                className={`block ${reveal}`}
                style={{ animationDelay: `${base + 0.3 + i * 0.12}s` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        {/* Divider that wipes in */}
        <span
          className={`mt-10 block h-0.5 w-20 bg-secondary ${
            inView
              ? "animate-clip-reveal motion-reduce:animate-none"
              : "opacity-0"
          }`}
          style={{ animationDelay: `${base + 1.1}s` }}
        />
      </div>

      {/* Bottom accent bar on hover */}
      <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-secondary transition-transform duration-700 ease-out group-hover:scale-x-100" />
    </div>
  );
};

const Section3 = () => {
  return (
    <section className="relative grid md:grid-cols-2">
      {panels.map((item, index) => (
        <Panel key={item.id} item={item} index={index} />
      ))}

      {/* Center badge where the two panels meet */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-2xl md:flex">
        <div className="absolute -inset-2 animate-spin-slow rounded-full border-2 border-dashed border-white/70 motion-reduce:animate-none" />
        <Leaf size={28} className="text-lime-700" strokeWidth={1.5} />
      </div>
    </section>
  );
};

export default Section3;