import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import useInView from "../../../hooks/useInView";

import communityFieldwork from "../../../assets/images/community.png";
import farmLearning from "../../../assets/images/about-people.png";
import harvestingKnowledge from "../../../assets/images/agritech.png";
import waterSmart from "../../../assets/images/water.png";
import collectiveAction from "../../../assets/images/circular.png";
import womenInAgriculture from "../../../assets/images/agriculture.png";
import plantResearch from "../../../assets/images/research.png";
import ruralEcosystems from "../../../assets/images/get_involved_bg.png";

const categories = [
  { id: "all", label: "All" },
  { id: "field-activities", label: "Field Activities" },
  { id: "community", label: "Community" },
  { id: "agriculture", label: "Agriculture" },
  { id: "environmental-activities", label: "Environmental Activities" },
  { id: "environment", label: "Environment" },
  { id: "research", label: "Research" },
];

const categoryLabel = (id) => categories.find((c) => c.id === id)?.label;

const photos = [
  {
    title: "Community fieldwork",
    category: "field-activities",
    image: communityFieldwork,
  },
  { title: "Farm learning", category: "community", image: farmLearning },
  {
    title: "Harvesting knowledge",
    category: "agriculture",
    image: harvestingKnowledge,
  },
  {
    title: "Water-smart agriculture",
    category: "environmental-activities",
    image: waterSmart,
  },
  {
    title: "Collective action",
    category: "field-activities",
    image: collectiveAction,
  },
  {
    title: "Women in agriculture",
    category: "community",
    image: womenInAgriculture,
  },
  { title: "Plant research", category: "research", image: plantResearch },
  {
    title: "Rural ecosystems",
    category: "environment",
    image: ruralEcosystems,
  },
];

const FADE_MS = 250;

const Section2 = () => {
  const [ref, inView] = useInView(0.1);
  const [activeTab, setActiveTab] = useState("all");
  const [fading, setFading] = useState(false);
  const [lightbox, setLightbox] = useState(null); // index in `filtered`, or null
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Fade the grid out, switch the filter, then the cards fly back in
  const handleTab = (id) => {
    if (id === activeTab) return;
    clearTimeout(timer.current);
    setFading(true);
    timer.current = setTimeout(() => {
      setActiveTab(id);
      setFading(false);
    }, FADE_MS);
  };

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? photos
        : photos.filter((photo) => photo.category === activeTab),
    [activeTab]
  );

  const countFor = (id) =>
    id === "all"
      ? photos.length
      : photos.filter((photo) => photo.category === id).length;

  // ===== Lightbox =====
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const showNext = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length]
  );
  const showPrev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, showNext, showPrev]);

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  const current = lightbox !== null ? filtered[lightbox] : null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-stone-50 py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div
              className={`mb-2 flex items-center gap-3 ${fadeUp}`}
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-0.5 w-10 bg-secondary" />
              <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
                Photo Gallery
              </span>
            </div>

            <h2 className="font-display text-4xl leading-tight text-slate-800 ">
              <span className="-my-1 block overflow-hidden py-1">
                <span
                  className={`block ${reveal}`}
                  style={{ animationDelay: "0.2s" }}
                >
                  A window into the work.
                </span>
              </span>
            </h2>
          </div>

          <p
            className={`max-w-md font-manrope text-sm leading-[1.8] tracking-wide text-slate-600 ${fadeUp}`}
            style={{ animationDelay: "0.5s" }}
          >
            Demonstration photography representing INIL&apos;s programme
            themes. Replace with official field images as they become
            available.
          </p>
        </div>

        {/* ================= CATEGORY TABS ================= */}
        <div
          role="tablist"
          aria-label="Filter gallery by category"
          className={`mt-8 flex flex-wrap gap-3 ${fadeUp}`}
          style={{ animationDelay: "0.6s" }}
        >
          {categories.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTab(tab.id)}
                className={`flex items-center gap-2 rounded-md border px-4 py-2 font-manrope text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-primary text-white shadow-lg"
                    : "border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                }`}
              >
                {tab.label}
                {/* <span
                  className={`rounded-full px-2 py-0.5 text-xs transition-colors duration-300 ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {countFor(tab.id)}
                </span> */}
              </button>
            );
          })}
        </div>

        {/* ================= GRID ================= */}
        <div
          className={`mt-10 grid gap-6 transition-all ease-out sm:grid-cols-2 lg:grid-cols-3 ${
            fading
              ? "scale-95 opacity-0 duration-200"
              : "scale-100 opacity-100 duration-300"
          }`}
        >
          {filtered.map((photo, index) => (
            <button
              key={`${activeTab}-${photo.title}`}
              type="button"
              onClick={() => setLightbox(index)}
              aria-label={`View ${photo.title}`}
              className={`group relative aspect-square overflow-hidden rounded-sm bg-slate-200 shadow-sm transition-shadow duration-500 hover:shadow-2xl ${
                inView
                  ? "animate-card-in motion-reduce:animate-none"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={photo.image}
                alt={photo.title}
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Always-visible caption on touch screens */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-5 text-left lg:hidden">
                <p className="font-manrope text-xs font-bold uppercase tracking-widest text-secondary">
                  {categoryLabel(photo.category)}
                </p>
                <p className="mt-1 font-display text-xl text-white">
                  {photo.title}
                </p>
              </div>

              {/* Hover overlay: inset dark panel with centered title */}
              <div className="absolute inset-3 hidden scale-95 flex-col items-center justify-center border border-white/30 bg-black/60 p-6 text-center opacity-0 backdrop-blur-[2px] transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 lg:flex">
                <span className="font-manrope text-xs font-bold uppercase tracking-widest text-secondary">
                  {categoryLabel(photo.category)}
                </span>
                <span className="mt-3 font-manrope text-lg font-bold uppercase tracking-wider text-white">
                  {photo.title}
                </span>
                <span className="mt-5 h-0.5 w-8 bg-secondary transition-all duration-500 group-hover:w-14" />
                <span className="mt-5 flex size-11 translate-y-3 items-center justify-center rounded-full bg-secondary text-primary opacity-0 transition-all delay-100 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Maximize2 size={18} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-secondary hover:text-primary"
          >
            <X size={22} />
          </button>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-secondary hover:text-primary"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-secondary hover:text-primary"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            key={current.title}
            className="h-4/5 w-full max-w-5xl animate-fade-up motion-reduce:animate-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image}
              alt={current.title}
              className="size-full object-contain"
            />
          </div>

          <div
            key={`${current.title}-caption`}
            className="mt-5 animate-fade-up text-center motion-reduce:animate-none"
          >
            <p className="font-manrope text-xs font-bold uppercase tracking-widest text-secondary">
              {categoryLabel(current.category)}
            </p>
            <p className="mt-1 font-display text-2xl text-white">
              {current.title}
            </p>
            <p className="mt-1 font-manrope text-xs text-white/60">
              {lightbox + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section2;