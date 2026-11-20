import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Cpu,
  Droplets,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  Leaf,
  Library,
  Microscope,
  Network,
  ShieldCheck,
  Sprout,
  Sun,
  Users,
  Wheat,
} from "lucide-react";
import useInView from "../../../hooks/useInView";

const titleLines = ["Verified relationships, presented with clarity."];

// Placeholder logos. To use a real logo, add `image: importedLogo` to the entry
// and the image will replace the icon and name.
const groups = [
  {
    number: "01",
    title: "Institutional partners",
    icon: Landmark,
    watermark: Landmark,
    block: "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200",
    numberColor: "text-secondary",
    chip: "bg-green-50 text-green-800",
    tile: "bg-stone-50 hover:bg-white",
    tileName: "text-slate-900",
    tileNote: "text-slate-500",
    logos: [
      { name: "State University", icon: GraduationCap },
      { name: "Rural Development Institute", icon: Building2 },
      { name: "Policy Council", icon: Landmark },
      { name: "Research Centre", icon: Microscope },
    ],
  },
  {
    number: "02",
    title: "Corporate partners",
    icon: Factory,
    watermark: Factory,
    block: "bg-green-100 text-slate-900",
    numberColor: "text-secondary",
    chip: "bg-white/70 text-green-900",
    tile: "bg-white/80 hover:bg-white",
    tileName: "text-slate-900",
    tileNote: "text-slate-500",
    logos: [
      { name: "Green Industries", icon: Factory },
      { name: "AgriTech Co.", icon: Cpu },
      { name: "Harvest Foods", icon: Wheat },
      { name: "Solar Works", icon: Sun },
    ],
  },
  {
    number: "03",
    title: "Implementation partners",
    icon: Handshake,
    watermark: Handshake,
    block: "bg-amber-100 text-slate-900",
    numberColor: "text-secondary",
    chip: "bg-white/70 text-amber-900",
    tile: "bg-white/80 hover:bg-white",
    tileName: "text-slate-900",
    tileNote: "text-slate-500",
    logos: [
      { name: "Village Council", icon: Users },
      { name: "Farmers’ Collective", icon: Sprout },
      { name: "Field Network", icon: Network },
      { name: "Water Users Group", icon: Droplets },
    ],
  },
  {
    number: "04",
    title: "Knowledge partners",
    icon: BookOpen,
    watermark: Library,
    block: "bg-emerald-900 text-white",
    numberColor: "text-secondary",
    chip: "bg-white/10 text-white",
    tile: "bg-white/10 hover:bg-white/20",
    tileName: "text-white",
    tileNote: "text-white/60",
    dark: true,
    logos: [
      { name: "Open Science Lab", icon: Microscope },
      { name: "Soil Institute", icon: Leaf },
      { name: "Climate Academy", icon: Globe },
      { name: "Learning Hub", icon: BookOpen },
    ],
  },
];

// Colour of each logo mark, cycled by position
const markTints = [
  "bg-lime-100 text-lime-700",
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
];

const dotStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
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

        {/* ================= HEADER ================= */}
        <div
          className={`mb-3 flex items-center gap-3 ${fadeUp}`}
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-0.5 w-10 bg-secondary" />
          <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
            Collaboration Directory
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
          className={`mt-2 max-w-2xl font-manrope text-sm leading-[1.8] tracking-wide text-slate-600 ${fadeUp}`}
          style={{ animationDelay: "0.6s" }}
        >
          Partner marks and descriptions will only be published after
          confirmation and permission.
        </p>

        {/* ================= PARTNER GROUPS ================= */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-8">
          {groups.map((group, groupIndex) => {
            const Icon = group.icon;
            const Watermark = group.watermark;

            return (
              <div
                key={group.number}
                className={`relative isolate overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-6 ${group.block} ${fadeUp}`}
                style={{ animationDelay: `${0.7 + groupIndex * 0.15}s` }}
              >
                {/* Faint watermark icon */}
                <Watermark
                  className={`pointer-events-none absolute -bottom-8 -right-8 -z-10 size-56 ${
                    group.dark ? "text-white/5" : "text-slate-900/5"
                  }`}
                  strokeWidth={1}
                />

                {/* Rotating ring (dark block only) */}
                {group.dark && (
                  <div className="absolute -right-20 -top-20 -z-10 size-64 rounded-full border border-white/10">
                    <div className="absolute inset-6 animate-spin-slow rounded-full border-2 border-dashed border-white/10 motion-reduce:animate-none" />
                  </div>
                )}

                {/* Number + icon chip */}
                <div className="flex items-start justify-between">
                  <span
                    className={`font-manrope text-sm font-bold ${group.numberColor}`}
                  >
                    {group.number}
                  </span>
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${group.chip}`}
                  >
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`font-manrope text-2xl sm:text-3xl font-medium ${
                    group.dark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {group.title}
                </h3>

                {/* <p
                  className={`mt-3 inline-flex items-center gap-2 font-manrope text-xs font-semibold uppercase tracking-widest ${
                    group.dark ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  <ShieldCheck size={14} className="text-secondary" />
                  Pending confirmation
                </p> */}

                {/* Logos */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {group.logos.map((logo, logoIndex) => {
                    const LogoIcon = logo.icon;

                    return (
                      <div
                        key={logo.name}
                        className={`group flex items-center gap-4 rounded-2xl p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${group.tile} ${fadeUp}`}
                        style={{
                          animationDelay: `${
                            1 + groupIndex * 0.15 + logoIndex * 0.1
                          }s`,
                        }}
                      >
                        {logo.image ? (
                          <img
                            src={logo.image}
                            alt={logo.name}
                            className="h-12 w-auto max-w-full object-contain grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                          />
                        ) : (
                          <>
                            <span
                              className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                                group.dark
                                  ? "bg-white/15 text-white"
                                  : markTints[logoIndex % markTints.length]
                              }`}
                            >
                              <LogoIcon size={24} strokeWidth={1.6} />
                            </span>
                            <span>
                              <span
                                className={`block font-manrope text-sm font-bold leading-snug ${group.tileName}`}
                              >
                                {logo.name}
                              </span>
                              <span
                                className={`mt-0.5 block font-manrope text-xs ${group.tileNote}`}
                              >
                                Logo placeholder
                              </span>
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section2;