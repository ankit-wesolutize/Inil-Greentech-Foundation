import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Phone,
} from "lucide-react";
import heroBg from "../../../assets/images/stories_bg.png";
import { stories } from "../../../data/StoriesPageData";

// Sidebar entries. Each `id` matches a section id in the content below.
const sections = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "The context" },
  { id: "response", label: "Our response" },
  { id: "activities", label: "Activities" },
  { id: "outcomes", label: "Outcomes" },
  { id: "gallery", label: "Gallery" },
];

// Steps from the Our Approach page
const processSteps = [
  { number: "01", title: "Understand" },
  { number: "02", title: "Collaborate" },
  { number: "03", title: "Act" },
];

// TODO: replace with the verified INIL contact details
const contact = {
  phone: "+(528) 456-7592",
  email: "info@agrezen.com",
};

// Scroll-reveal classes (animation starts when [data-reveal] enters the screen)
const reveal =
  "translate-y-8 opacity-0 transition-all duration-700 ease-out data-visible:translate-y-0 data-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

const dotStyle = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

const StoriesDetails = () => {
  const { id } = useParams();
  const story = stories.find((item) => item.slug === id);

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  // Start at the top whenever the story changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  // Scroll-reveal for every [data-reveal] block
  useEffect(() => {
    if (!story) return;

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => el.removeAttribute("data-visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [story]);

  // Highlight the sidebar item for the section currently on screen
  useEffect(() => {
    if (!story) return;

    const onScroll = () => {
      const offset = 220;
      let current = sections[0].id;

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = section.id;
        }
      });

      // At the very bottom, the last item is active
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = sections[sections.length - 1].id;
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [story]);

  const goToSection = (sectionId) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(sectionId);
  };

  // ===== Gallery slider =====
  const nextSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const step = track.firstElementChild?.offsetWidth ?? 0;
    if (track.scrollLeft >= max - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step, behavior: "smooth" });
    }
  }, []);

  const prevSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const step = track.firstElementChild?.offsetWidth ?? 0;
    if (track.scrollLeft <= 4) {
      track.scrollTo({ left: max, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -step, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!story || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [story, paused, nextSlide]);

  // ===== Story not found =====
  if (!story) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-24 text-center">
        <div>
          <p className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
            Story not found
          </p>
          <h1 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
            We couldn’t find that story.
          </h1>
          <Link
            to="/stories"
            className="mt-8 inline-flex items-center gap-3 bg-primary px-8 py-4 font-manrope text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:bg-secondary hover:text-primary"
          >
            Back to Stories
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  const words = story.title.split(" ");
  const gallery = story.gallery;

  return (
    <>
      {/* ==================================================================== */}
      {/* SECTION 1 - BANNER                                                   */}
      {/* ==================================================================== */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-primary">

        {/* ================= BACKGROUND IMAGE (slow zoom) ================= */}
        <div className="absolute inset-0 -z-20">
          <img
            src={story.image}
            alt={story.title}
            className="size-full animate-slow-zoom object-cover motion-reduce:animate-none"
          />
        </div>

        {/* ================= OVERLAYS ================= */}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-primary/90 via-primary/50 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-primary/60 via-transparent to-transparent" />

        {/* ================= DECORATIVE BARS (top center) ================= */}
        <div className="absolute left-1/2 top-0 hidden items-start gap-6 lg:flex">
          <span
            className="h-1.5 w-40 animate-bar-in bg-secondary motion-reduce:animate-none"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="mt-1.5 h-1.5 w-28 animate-bar-in bg-blue-600 motion-reduce:animate-none"
            style={{ animationDelay: "0.45s" }}
          />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

          <div
            className="mb-4 flex items-center gap-3"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="h-0.5 w-8 bg-secondary" />
            <span className="font-manrope text-xs font-bold uppercase tracking-widest text-white/70">
              Stories from the field
            </span>
          </div>

          {/* TITLE (dynamic) - each word slides up from behind its mask */}
          <h1
            key={story.slug}
            className="max-w-4xl font-dmserif-display text-4xl leading-[1.15] text-white sm:text-5xl"
          >
            {words.map((word, index) => {
              const isLast = index === words.length - 1;
              return (
                <span
                  key={`${word}-${index}`}
                  className="-my-1 mr-3 inline-block overflow-hidden py-1 lg:mr-4"
                >
                  <span
                    className={`inline-block animate-reveal-up motion-reduce:animate-none ${
                      isLast ? "italic text-secondary" : ""
                    }`}
                    style={{ animationDelay: `${0.15 + index * 0.12}s` }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </h1>

          {/* DESCRIPTION (dynamic) */}
          <p
            key={`${story.slug}-description`}
            className="max-w-2xl animate-fade-up font-manrope text-base leading-8 text-white/90 motion-reduce:animate-none"
            style={{ animationDelay: "1.1s" }}
          >
            {story.description}
          </p>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2 - DETAILS (no overflow-hidden here, it would break sticky)  */}
      {/* ==================================================================== */}
      <section className="bg-stone-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">

            {/* ================= LEFT: STICKY SIDEBAR ================= */}
            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-28">

                {/* On this page */}
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center gap-3">
                    <Leaf size={22} className="text-lime-700" />
                    <h2 className="font-manrope text-2xl font-bold text-slate-900">
                      On This Page
                    </h2>
                  </div>

                  <nav aria-label="On this page">
                    {sections.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => goToSection(section.id)}
                          aria-current={isActive ? "true" : undefined}
                          className={`group relative flex w-full items-center justify-between border-b border-slate-200 py-3 pl-3 pr-1 text-left font-manrope text-base transition-all duration-300 last:border-b-0 ${
                            isActive
                              ? "font-bold text-lime-700"
                              : "font-semibold text-slate-600 hover:pl-4 hover:text-lime-700"
                          }`}
                        >
                          <span
                            className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-secondary transition-transform duration-300 ${
                              isActive ? "scale-y-100" : "scale-y-0"
                            }`}
                          />
                          {section.label}
                          <ArrowRight
                            size={16}
                            className={`transition-all duration-300 ${
                              isActive
                                ? "translate-x-1 text-secondary"
                                : "text-slate-500 group-hover:translate-x-1"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Contact card */}
                <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-8 text-center shadow-lg">
                  <div className="absolute inset-0 -z-10" style={dotStyle} />
                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/30 via-transparent to-white/5" />
                  <div className="absolute -right-12 -top-12 -z-10 size-40 rounded-full border border-white/10">
                    <div className="absolute inset-4 animate-spin-slow rounded-full border border-dashed border-white/10 motion-reduce:animate-none" />
                  </div>

                  <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-lime-700">
                    <Phone size={26} strokeWidth={1.5} />
                  </span>
                  <p className="mt-4 font-manrope text-xl font-bold text-secondary">
                    {contact.phone}
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 inline-block font-manrope text-sm font-semibold text-white underline underline-offset-4 transition-colors duration-300 hover:text-secondary"
                  >
                    {contact.email}
                  </a>

                  <Link
                    to="/contact"
                    className="group relative mt-6 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-lime-700 px-6 py-3 font-manrope text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:text-primary hover:shadow-xl"
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    <span className="relative">Contact Us</span>
                    <ArrowRight
                      size={16}
                      className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </Link>
                </div>
              </div>
            </aside>

            {/* ================= RIGHT: CONTENT ================= */}
            <div className="space-y-14 lg:col-span-8">

              {/* Large image */}
              <div
                data-reveal
                className={`group overflow-hidden rounded-3xl shadow-lg ${reveal}`}
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-72 w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 sm:h-96 lg:h-120"
                />
              </div>

              {/* ----- Overview ----- */}
              <div id="overview" className="scroll-mt-32">
                <div data-reveal className={reveal}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-0.5 w-8 bg-secondary" />
                    <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
                      Overview
                    </span>
                  </div>
                  <h2 className="font-display text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                    {story.overviewHeading}
                  </h2>
                  <p className="mt-6 font-display text-xl leading-9 text-lime-800">
                    {story.overviewIntro}
                  </p>
                </div>
              </div>

              {/* ----- The context ----- */}
              <div id="context" className="scroll-mt-32">
                <div data-reveal className={reveal}>
                  <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">
                    The context
                  </h2>
                  <p className="mt-4 font-manrope text-base leading-8 text-slate-600">
                    {story.context}
                  </p>
                </div>
              </div>

              {/* ----- Our response (text + 3-step image row) ----- */}
              <div id="response" className="scroll-mt-32">
                <div data-reveal className={reveal}>
                  <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">
                    Our response
                  </h2>
                  <p className="mt-4 font-manrope text-base leading-8 text-slate-600">
                    {story.response}
                  </p>
                </div>

                <div className="mt-10 flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-0">
                  {processSteps.map((step, index) => (
                    <React.Fragment key={step.number}>
                      <div
                        data-reveal
                        className={`group w-full max-w-60 flex-1 text-center ${reveal}`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                        <div className="relative">
                          <div className="overflow-hidden rounded-3xl shadow-md">
                            <img
                              src={gallery[index % gallery.length]}
                              alt={step.title}
                              className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                          </div>
                          <span className="absolute -bottom-3 -left-3 flex size-14 items-center justify-center rounded-full border-4 border-stone-50 bg-lime-700 font-manrope text-lg font-bold text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary">
                            {step.number}
                          </span>
                        </div>
                        <h3 className="mt-6 font-display text-2xl text-slate-900 transition-colors duration-300 group-hover:text-lime-700">
                          {step.title}
                        </h3>
                      </div>

                      {index < processSteps.length - 1 && (
                        <svg
                          viewBox="0 0 60 40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-16 hidden w-16 shrink-0 text-slate-300 md:block"
                          aria-hidden="true"
                        >
                          <path d="M4 28c8-14 20-18 26-8s-8 14-12 4 14-20 36-12" />
                          <path d="M46 6l8 6-9 5" />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* ----- Activities (text + checklist + two images) ----- */}
              <div id="activities" className="scroll-mt-32">
                <div data-reveal className={reveal}>
                  <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">
                    Activities
                  </h2>

                  <div className="mt-4 grid gap-8 md:grid-cols-2">
                    <p className="font-manrope text-base leading-8 text-slate-600">
                      {story.activities}
                    </p>
                    <ul className="space-y-3">
                      {story.activityPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-3 font-manrope text-base font-semibold text-slate-900"
                        >
                          <Check
                            size={18}
                            strokeWidth={3}
                            className="shrink-0 text-lime-700"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {[gallery[3] ?? gallery[0], gallery[4] ?? gallery[1]].map(
                    (src, index) => (
                      <div
                        key={index}
                        data-reveal
                        className={`group overflow-hidden rounded-3xl shadow-md ${reveal}`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                        <img
                          src={src}
                          alt={`${story.title} activity ${index + 1}`}
                          className="h-64 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ----- Outcomes ----- */}
              <div id="outcomes" className="scroll-mt-32">
                <div data-reveal className={reveal}>
                  <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">
                    Outcomes
                  </h2>
                  <p className="mt-4 font-manrope text-base leading-8 text-slate-600">
                    {story.outcomes}
                  </p>
                </div>
              </div>

              {/* ----- Gallery slider ----- */}
              <div id="gallery" className="scroll-mt-32">
                <div
                  data-reveal
                  className={`flex items-center justify-between gap-4 ${reveal}`}
                >
                  <h2 className="font-display text-3xl text-slate-900 sm:text-4xl">
                    Gallery
                  </h2>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Previous image"
                      className="flex size-12 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 hover:-translate-x-1 hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Next image"
                      className="flex size-12 items-center justify-center rounded-full border border-primary/30 text-primary transition-all duration-300 hover:translate-x-1 hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div
                  data-reveal
                  className={`mt-8 ${reveal}`}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  <div
                    ref={trackRef}
                    className="no-scrollbar -mx-2 flex snap-x snap-mandatory overflow-x-auto"
                  >
                    {gallery.map((src, index) => (
                      <div
                        key={index}
                        className="shrink-0 basis-full snap-start px-2 sm:basis-1/2 lg:basis-1/3"
                      >
                        <div className="group overflow-hidden rounded-3xl shadow-md">
                          <img
                            src={src}
                            alt={`${story.title} gallery ${index + 1}`}
                            className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoriesDetails;