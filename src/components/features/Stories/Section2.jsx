import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInView from "../../../hooks/useInView";
import { TbLeaf2 } from "react-icons/tb";
import { RiArrowRightLongLine } from "react-icons/ri";
import { stories } from "../../../data/StoriesPageData";



// Add new stories at the end of this array. The grid shows 3 per row.


const Section2 = () => {
    const [ref, inView] = useInView(0.1);
    const [sort, setSort] = useState("newest"); // newest | oldest

    // "Newest first" keeps the order above, "Oldest first" reverses it
    const sorted = sort === "newest" ? stories : [...stories].reverse();

    const fadeUp = inView
        ? "animate-fade-up motion-reduce:animate-none"
        : "opacity-0";

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
                <div
                    className={`flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6 ${fadeUp}`}
                    style={{ animationDelay: "0.1s" }}
                >
                    <div className="flex items-center gap-3">
                        <span className="h-0.5 w-10 bg-secondary" />
                        <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
                            Explore Stories
                        </span>
                    </div>

                    <div className="flex items-center gap-3 font-manrope text-xs font-semibold">
                        <button
                            type="button"
                            className="rounded-full bg-primary px-4 py-2 text-white shadow-md"
                        >
                            All
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setSort((prev) => (prev === "newest" ? "oldest" : "newest"))
                            }
                            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                        >
                            {sort === "newest" ? "Newest first ↓" : "Oldest first ↑"}
                        </button>
                    </div>
                </div>

                {/* ================= CARDS ================= */}
                <div className="mt-10 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                    {sorted.map((story, index) => {
                        const Icon = story.icon;

                        return (
                            <Link
                                key={`${sort}-${story.slug}`}
                                to={`/stories/${story.slug}`}
                                aria-label={`Read more: ${story.title}`}
                                className={`group block ${fadeUp}`}
                                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                            >
                                {/* Image */}
                                <div className="mr-8 overflow-hidden rounded-3xl">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="h-80 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-84"
                                    />
                                </div>

                                {/* White card overlapping the image, offset to the right */}
                                <div className="relative -mt-24 ml-9 min-h-44 overflow-hidden rounded-3xl bg-white px-6 pb-5 pt-4 shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">

                                    {/* Arrow tab hanging from the top-right edge */}

                                    <span className="absolute right-8 top-0 flex h-14 w-14 items-center justify-center rounded-b-3xl bg-primary text-white transition-colors duration-500 group-hover:bg-secondary group-hover:text-primary">
                                        <RiArrowRightLongLine
                                            size={20}
                                            className="transition-transform duration-500"
                                        />
                                    </span>


                                    {/* Background Circle (Lower z-index) */}
                                    <span className="absolute left-9 top-7.5 z-0 h-9 w-9 rounded-full bg-gray-100"></span>

                                    {/* Faint watermark */}
                                    <TbLeaf2
                                        className="pointer-events-none absolute -bottom-6 -right-6 z-0 size-40 text-gray-100/50 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110"
                                        strokeWidth={1}
                                    />

                                    {/* Icon (Needs 'relative' so z-index works) */}
                                    <Icon size={44} strokeWidth={2} className="relative z-10 text-green-600" />


                                    {/* Title */}
                                    <h3 className="relative mt-3 font-manrope text-xl font-semibold leading-tight text-slate-900 transition-colors duration-500 group-hover:text-green-500">
                                        {story.title}
                                    </h3>

                                    {/* Description (max 2 lines) */}
                                    <p className="relative mt-3 line-clamp-2 font-manrope text-sm leading-[1.8] tracking-wide text-slate-600">
                                        {story.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Section2;