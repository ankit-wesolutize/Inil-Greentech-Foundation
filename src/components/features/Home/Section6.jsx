import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import useInView from "../../../hooks/useInView";
import { projects } from "../../../data/HomePageData";



const titleLines = ["Ideas designed for the realities of the field."];



const Section6 = () => {
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
      className="relative overflow-hidden bg-stone-50 py-20 lg:py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className={`mb-1 flex items-center gap-3 ${fadeUp}`}
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-0.5 w-10 bg-secondary" />
              <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
                Featured Work
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

          {/* View all projects */}
          <div className={fadeUp} style={{ animationDelay: "0.6s" }}>
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-3 pb-2 font-manrope text-xs font-bold uppercase tracking-wider text-primary transition-colors duration-300 hover:text-secondary"
            >
              View All Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
              <span className="absolute inset-x-0 bottom-0 h-px bg-primary/30" />
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.title}
              to={project.href}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3.5 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl ${fadeUp}`}
              style={{ animationDelay: `${0.5 + index * 0.18}s` }}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden rounded-xl ${
                  inView
                    ? "animate-clip-reveal motion-reduce:animate-none"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${0.6 + index * 0.18}s` }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-45 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Category badge */}
                <span className="absolute left-3 top-3 rounded-md bg-secondary px-3 py-1.5 font-manrope text-[10px] font-semibold uppercase tracking-wider text-white shadow-md transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                  {project.category}
                </span>

                {/* Round arrow button appears on hover */}
                <span className="absolute bottom-4 right-4 flex size-12 scale-0 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform duration-500 group-hover:scale-100">
                  <ArrowUpRight size={20} />
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-2 pb-3 pt-3">
                {/* Meta line */}
                <div className="flex items-center gap-2 font-manrope text-sm text-slate-500">
                  <MapPin size={15} className="text-secondary" />
                  {project.location}
                </div>

                {/* Title */}
                <h3 className="mt-2.5 font-manrope font-semibold text-xl text-slate-900 transition-colors duration-300 group-hover:text-secondary">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-3 font-manrope text-sm leading-[1.8] tracking-wide text-slate-600">
                  {project.description}
                </p>

                {/* Read more */}
                <span className="mt-auto inline-flex items-center gap-2 pt-4 font-manrope text-sm font-bold text-primary transition-colors duration-300 group-hover:text-secondary">
                  Read More
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </span>
              </div>

              {/* Bottom accent bar */}
              <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section6;