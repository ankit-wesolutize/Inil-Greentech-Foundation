import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import useInView from "../../../hooks/useInView";

// TODO: replace the dummy data below with the official, verified INIL details.
// `icon` is the small icon before the value (set it to null for none).
// `href` makes the value clickable (tel:, mailto:) - leave it null for plain text.
const contactCards = [
  {
    title: "Mobile",
    subtitle: "Free Dial Number",
    value: "+(528) 456-7592",
    href: "tel:+5284567592",
    icon: Phone,
    image:
      "https://agrezen.zozothemes.com/wp-content/uploads/elementor/thumbs/association-rqhn7cg0yooj069f4mlrktk6xz7jzyhecp47vdydmc.webp",
  },
  {
    title: "Email",
    subtitle: "Feel Free to Mail",
    value: "info@agrezen.com",
    href: "mailto:info@agrezen.com",
    icon: Mail,
    image:
      "https://agrezen.zozothemes.com/wp-content/uploads/elementor/thumbs/festivals-rqhn1zr41ncqw41bdtb8vo6p5zlb608fa7dohnw31w.webp",
  },
  {
    title: "Address",
    subtitle: "Our form Address",
    value: "132, Tic St, Kingston, NY, USA",
    href: null,
    icon: MapPin,
    image:
      "https://agrezen.zozothemes.com/wp-content/uploads/elementor/thumbs/shows-rqhn2bz0ihth31jkeglea33ovzx2y2kxnvuzq9dyt0.webp",
  },
];

// TODO: replace with the real location:
// Google Maps > Share > Embed a map > copy the src from the iframe code.
const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.7275442906825!2d73.73402437103799!3d18.586318128554264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbe78b2cd61f%3A0x8b3d1e2f71dd41d8!2sWeSolutize%20Technologies%20%7C%20Top%20AI%20Solution%20Provider%20%7C%20Top%20Software%20Development%20%7C%20Hospital%20Management%20%7C%20Company%20Pune%2C%20India.!5e0!3m2!1sen!2sin!4v1795092982786!5m2!1sen!2sin";

const titleLines = ["We’d like to hear from you."];

const fields = [
  { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone number", type: "tel", required: false, autoComplete: "tel" },
  { name: "subject", label: "Subject", type: "text", required: true, autoComplete: "off" },
];

const inputClass =
  "w-full rounded-xs border border-primary/30 bg-white/60 px-4 py-2 font-manrope text-sm text-slate-800 placeholder:text-slate-500 transition-all duration-300 hover:border-primary focus:border-secondary focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/20";

const Section2 = () => {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // TODO: send `form` to your enquiry API here, then set the status
    // to "sent" on success. This timeout only simulates the request.
    timer.current = setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 900);
  };

  const fadeUp = inView
    ? "animate-fade-up motion-reduce:animate-none"
    : "opacity-0";
  const reveal = inView
    ? "animate-reveal-up motion-reduce:animate-none"
    : "translate-y-full";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-16"
    >
      {/* Background decoration */}
      {/* <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-secondary/10 blur-3xl" /> */}
      {/* <div className="pointer-events-none absolute -right-32 bottom-20 size-96 rounded-full bg-lime-600/10 blur-3xl" /> */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= INFO CARDS ================= */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            const Value = card.href ? "a" : "span";

            return (
              <div
                key={card.title}
                className={`group rounded-xl bg-cream px-6 py-4 text-center transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-lg ${fadeUp}`}
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                {/* Image badge */}
                <div className="relative mx-auto flex size-20 items-center justify-center">
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    className="size-18 bg-lime-400 rounded-full object-cover transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 p-1.5"
                  />
                </div>

                <h3 className="mt-2.5 font-manrope text-2xl font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="mt-0.5 font-manrope text-sm text-slate-700">
                  {card.subtitle}
                </p>

                <Value
                  {...(card.href ? { href: card.href } : {})}
                  className="mt-0.5 inline-flex items-center gap-2 font-semibold font-manrope text-base text-lime-500 transition-colors duration-300"
                >
                  {Icon && <Icon size={20} className="text-lime-500" />}
                  {card.value}
                </Value>
              </div>
            );
          })}
        </div>

        {/* ================= FORM + MAP ================= */}
        <div
          className={`mx-auto mt-16 grid overflow-hidden rounded-md bg-amber-50 shadow-lg lg:grid-cols-2 ${fadeUp}`}
          style={{ animationDelay: "0.6s" }}
        >
          {/* ----- Left: heading + form ----- */}
          <div className="p-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-0.5 w-10 bg-secondary" />
              <span className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
                Start a Conversation
              </span>
            </div>

            <h2 className="font-manrope text-4xl leading-tight text-slate-900">
              {titleLines.map((line, i) => (
                <span key={line} className="-my-1 block overflow-hidden py-1">
                  <span
                    className={`block ${reveal}`}
                    style={{ animationDelay: `${0.8 + i * 0.15}s` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <p
              className={`mt-3 max-w-lg font-manrope text-sm leading-[1.8] tracking-wide text-slate-600 ${fadeUp}`}
              style={{ animationDelay: "1.1s" }}
            >
              Contact information and office address are awaiting official
              verification. Please use this enquiry form for the prototype
              experience.
            </p>

            {/* <p
              className={`mt-5 flex items-center gap-3 font-manrope text-sm text-slate-800 ${fadeUp}`}
              style={{ animationDelay: "1.2s" }}
            >
              <CircleDot size={22} className="text-secondary" />
              Response channel placeholder
            </p> */}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field, index) => (
                  <div
                    key={field.name}
                    className={fadeUp}
                    style={{ animationDelay: `${1.3 + index * 0.08}s` }}
                  >
                    <label htmlFor={field.name} className="sr-only">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={`${field.label}${field.required ? " *" : ""}`}
                      className={inputClass}
                    />
                  </div>
                ))}

                <div
                  className={`sm:col-span-2 ${fadeUp}`}
                  style={{ animationDelay: "1.65s" }}
                >
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help? *"
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              <div
                className={`mt-6 flex flex-wrap items-center gap-5 ${fadeUp}`}
                style={{ animationDelay: "1.75s" }}
              >
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative flex items-center gap-3 overflow-hidden bg-primary px-8 py-4 font-manrope text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:text-primary hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative">
                    {status === "sending" ? "Sending..." : "Send Enquiry"}
                  </span>
                  <ArrowRight
                    size={16}
                    className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </button>

                {status === "sent" && (
                  <p
                    role="status"
                    className="flex animate-fade-up items-center gap-2 font-manrope text-sm font-semibold text-lime-700 motion-reduce:animate-none"
                  >
                    <CheckCircle2 size={18} />
                    Thank you. Your enquiry has been noted.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* ----- Right: Google map ----- */}
          <div className="group relative min-h-96 lg:min-h-0">
            <iframe
              title="INIL Greentech Foundation location"
              src={MAP_SRC}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full transition-all duration-700 group-hover:grayscale-0"
            />

            {/* Floating location card */}
            {/* <div className="pointer-events-none absolute bottom-6 left-6 flex animate-float items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-2xl motion-reduce:animate-none">
              <span className="relative flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                <span className="absolute inset-0 animate-ping rounded-full bg-secondary/50 motion-reduce:animate-none" />
                <MapPin size={22} className="relative" />
              </span>
              <div>
                <p className="font-manrope text-xs font-bold uppercase tracking-widest text-primary">
                  Our Office
                </p>
                <p className="mt-1 font-manrope text-sm text-slate-600">
                  Address awaiting verification
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;