import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Beaker,
  Droplets,
  Microscope,
  Recycle,
  Search,
  SearchX,
  Sprout,
  Users,
  X,
} from "lucide-react";
import useInView from "../../../hooks/useInView";

import researchImg from "../../../assets/images/research.png";
import agricultureImg from "../../../assets/images/agriculture.png";
import waterImg from "../../../assets/images/water.png";
import circularImg from "../../../assets/images/circular.png";
import agritechImg from "../../../assets/images/agritech.png";
import communityImg from "../../../assets/images/community.png";

const tabs = [
  { id: "all", label: "All" },
  { id: "research", label: "Research" },
  { id: "agriculture", label: "Agriculture" },
  { id: "water", label: "Water" },
];

const categoryLabels = {
  research: "Research",
  agriculture: "Agriculture",
  water: "Water",
};

const initiatives = [
  {
    number: "01",
    title: "Scientific Research & Development",
    slug: "scientific-research-development",
    categories: ["research"],
    icon: Microscope,
    image: researchImg,
  },
  {
    number: "02",
    title: "Smart Agriculture & Training",
    slug: "smart-agriculture-training",
    categories: ["agriculture"],
    icon: Sprout,
    image: agricultureImg,
  },
  {
    number: "03",
    title: "Water Management",
    slug: "water-management",
    categories: ["water"],
    icon: Droplets,
    image: waterImg,
  },
  {
    number: "04",
    title: "Circular Economy",
    slug: "circular-economy",
    categories: ["agriculture", "water"],
    icon: Recycle,
    image: circularImg,
  },
  {
    number: "05",
    title: "Agri-Tech Advancement",
    slug: "agri-tech-advancement",
    categories: ["research", "agriculture"],
    icon: Beaker,
    image: agritechImg,
  },
  {
    number: "06",
    title: "Community Capacity",
    slug: "community-capacity",
    categories: ["agriculture"],
    icon: Users,
    image: communityImg,
  },
].map((item) => ({
  ...item,
  description:
    "Explore the objectives, field approach, activities and evidence associated with this area.",
}));

const FADE_MS = 250;

const Section2 = () => {
  const [ref, inView] = useInView(0.1);
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [fading, setFading] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Fade the grid out, swap the filter, then fade back in
  const handleTab = (id) => {
    if (id === activeTab) return;
    clearTimeout(timer.current);
    setFading(true);
    timer.current = setTimeout(() => {
      setActiveTab(id);
      setFading(false);
    }, FADE_MS);
  };

  const countFor = (id) =>
    id === "all"
      ? initiatives.length
      : initiatives.filter((item) => item.categories.includes(id)).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initiatives.filter((item) => {
      const matchesTab =
        activeTab === "all" || item.categories.includes(activeTab);
      const matchesSearch =
        q === "" ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categories.some((c) => categoryLabels[c].toLowerCase().includes(q));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, query]);

  const clearFilters = () => {
    setQuery("");
    if (activeTab !== "all") handleTab("all");
  };

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-stone-50 py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= TABS + SEARCH ================= */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="tablist"
            aria-label="Filter initiatives"
            className={`flex flex-wrap gap-3 ${fadeUp}`}
            style={{ animationDelay: "0.1s" }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTab(tab.id)}
                  className={`flex items-center gap-2 border px-5 py-3 font-manrope text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
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

          {/* Search */}
          <div
            className={`group relative w-full border-b border-slate-300 transition-colors duration-300 focus-within:border-secondary lg:w-80 ${fadeUp}`}
            style={{ animationDelay: "0.25s" }}
          >
            <Search
              size={18}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-secondary"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search initiatives"
              className="w-full bg-transparent py-3 pl-8 pr-8 font-manrope text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 hover:text-primary"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {/* <p
          aria-live="polite"
          className={`mt-8 font-manrope text-sm text-slate-500 ${fadeUp}`}
          style={{ animationDelay: "0.35s" }}
        >
          Showing{" "}
          <span className="font-bold text-primary">{filtered.length}</span> of{" "}
          {initiatives.length} programme areas
        </p> */}

        {/* ================= GRID ================= */}
        <div
          className={`mt-8 transition-all ease-out ${
            fading
              ? "translate-y-2 opacity-0 duration-200"
              : "translate-y-0 opacity-100 duration-500"
          }`}
        >
          {filtered.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={`${activeTab}-${item.slug}`}
                    to={`/initiatives/${item.slug}`}
                    className={`group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-xl ${fadeUp}`}
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-60 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Category chips */}
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {item.categories.map((c) => (
                          <span
                            key={c}
                            className="rounded-xs px-2 py-1 font-manrope text-[10px] font-bold uppercase tracking-wider text-white bg-primary backdrop-blur-md"
                          >
                            {categoryLabels[c]}
                          </span>
                        ))}
                      </div>

                      {/* Round arrow on hover */}
                      <span className="absolute right-4 top-4 flex size-11 scale-0 items-center justify-center rounded-full bg-secondary text-primary shadow-lg transition-transform duration-500 group-hover:scale-100">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative flex flex-1 flex-col px-5 pb-6">
                      {/* Icon chip overlapping the image + number */}
                      <div className="-mt-7 ">
                        <span className="flex size-14 items-center justify-center rounded-xl bg-primary text-white shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:bg-secondary group-hover:text-primary">
                          <Icon size={24} strokeWidth={1.6} />
                        </span>
                        {/* <span className="font-display text-lg text-secondary">
                          {item.number}
                        </span> */}
                      </div>

                      <p className="mt-4 font-manrope text-[11px] font-semibold uppercase tracking-widest text-blue-700">
                        Programme Area
                      </p>

                      <h3 className="mt-3 font-manrope text-xl font-medium text-slate-900 transition-colors duration-300 group-hover:text-primary">
                        {item.title}
                      </h3>

                      <p className="mt-3 font-manrope text-sm leading-[1.8] tracking-wide text-slate-600">
                        {item.description}
                      </p>

                      {/* Footer */}
                      <div className="mt-auto pt-3">
                        <span className="relative inline-flex items-center gap-2 pb-2 font-manrope text-xs font-bold uppercase tracking-wider text-primary transition-colors duration-300 group-hover:text-secondary">
                          View Details
                          <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                          />
                          <span className="absolute inset-x-0 bottom-0 h-px bg-primary/30" />
                          <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 group-hover:scale-x-100" />
                        </span>
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  </Link>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <div className="animate-fade-up rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center motion-reduce:animate-none">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <SearchX size={28} />
              </span>
              <h3 className="mt-6 font-display text-2xl text-slate-900">
                No initiatives found
              </h3>
              <p className="mx-auto mt-3 max-w-md font-manrope text-sm leading-7 text-slate-600">
                We couldn&apos;t find a programme area matching your search.
                Try a different word or clear the filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-8 bg-primary px-6 py-3 font-manrope text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:bg-secondary hover:text-primary hover:shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section2;