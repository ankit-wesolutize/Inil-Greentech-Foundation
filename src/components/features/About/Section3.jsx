import React from "react";
import useInView from "../../../hooks/useInView";
import { team } from "../../../data/AboutPageData";


const titleLines = ["People committed to practical change."];

const Section3 = () => {
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
      className="relative overflow-hidden bg-amber-50 py-20 lg:py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-0 size-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/2 size-160 -translate-y-1/2 rounded-full border border-primary/10">
        <div className="absolute inset-12 animate-spin-slow rounded-full border-2 border-dashed border-primary/10 motion-reduce:animate-none" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">

        {/* ================= LEFT: HEADER ================= */}
        <div className="lg:col-span-5">
          <div
            className={`mb-3 flex items-center gap-3 ${fadeUp}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="h-0.5 w-10 bg-secondary" />
            <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
              Leadership &amp; Team
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

          <p
            className={`mt-3 max-w-md font-manrope text-sm leading-[1.8] tracking-wide text-slate-600 ${fadeUp}`}
            style={{ animationDelay: "0.7s" }}
          >
            Meet the people helping INIL connect research, field knowledge and
            practical action for sustainable agriculture.
          </p>
        </div>

        {/* ================= RIGHT: TEAM CARDS ================= */}
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
          {team.map((member, index) => (
            <article
              key={member.name}
              className={`group ${index === 1 ? "sm:mt-14" : ""} ${fadeUp}`}
              style={{ animationDelay: `${0.5 + index * 0.2}s` }}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden rounded-3xl shadow-lg transition-shadow duration-500 group-hover:shadow-2xl ${
                  inView
                    ? "animate-clip-reveal motion-reduce:animate-none"
                    : "opacity-0"
                }`}
                style={{ animationDelay: `${0.6 + index * 0.2}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-96 w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Green gradient fades in on hover */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-emerald-900 via-emerald-900/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Pill badge: glass at rest, lime on hover */}
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2 font-manrope text-sm font-semibold text-white backdrop-blur-md transition-all duration-500 group-hover:bg-lime-500">
                  <span className="size-1.5 rounded-full bg-lime-400 transition-colors duration-500 group-hover:bg-white" />
                  {member.tag}
                </span>
              </div>

              {/* Name, role and socials */}
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl text-emerald-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-manrope text-sm text-slate-500">
                    {member.role}
                  </p>
                </div>

                {/* Social icons slide in on hover (always visible on touch screens) */}
                <div className="flex items-center gap-3 pt-2">
                  {member.socials.map(({ label, icon: Icon, href }, i) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={`${member.name} on ${label}`}
                      className="text-lg text-slate-400 transition-all duration-500 hover:-translate-y-1 hover:text-primary lg:translate-x-4 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;