import React from "react";
import heroBg from "../../../assets/images/get_involved_bg.png"; // your ChatGPT image goes here

const titleLines = [
    [{ text: "Moments" }, { text: "of learning," }],
    [{ text: "action,", accent: true }, { text: "and shared" }],
    [{text: "progress."}]
];

const Section1 = () => {
    let wordIndex = 0;

    const scrollToNext = () => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    };

    return (
        <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-primary">

            {/* ================= BACKGROUND IMAGE (slow zoom) ================= */}
            <div className="absolute inset-0 -z-20">
                <img
                    src={heroBg}
                    alt=""
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

                {/* TITLE - each word slides up from behind its line */}
                <div
                    className={`mb-4 flex items-center gap-3`}
                    style={{ animationDelay: "0.15s" }}
                >
                    <span className="h-0.5 w-8 bg-secondary" />
                    <span className="font-manrope text-xs font-bold uppercase tracking-widest text-white/70">
                        In the field
                    </span>
                </div>
                <h1 className="max-w-4xl font-dmserif-display text-4xl leading-[1.15] text-white sm:text-5xl">
                    {titleLines.map((line, lineIdx) => (
                        <span key={lineIdx} className="-my-1 block overflow-hidden py-1">
                            {line.map((word) => {
                                const delay = 0.15 + wordIndex++ * 0.12;
                                return (
                                    <span
                                        key={word.text}
                                        className={`mr-3 inline-block animate-reveal-up motion-reduce:animate-none lg:mr-4 ${word.accent ? "italic text-secondary" : ""
                                            }`}
                                        style={{ animationDelay: `${delay}s` }}
                                    >
                                        {word.text}
                                    </span>
                                );
                            })}
                        </span>
                    ))}
                </h1>

                {/* DESCRIPTION */}
                <p
                    className="mt-6 max-w-2xl animate-fade-up font-manrope text-base leading-8 text-white/90 motion-reduce:animate-none"
                    style={{ animationDelay: "1.1s" }}
                >
                    A visual collection representing field activities, agricultural communities, environmental work and collaborative learning.
                </p>
            </div>
        </section>
    );
};

export default Section1;