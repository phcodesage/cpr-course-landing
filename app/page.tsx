"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartPulse,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

type ProgramOption = {
  option: string;
  name: string;
  price: string;
  duration: string;
  time: string;
  description: string;
  certificate: string;
  includes: string[];
  checkoutUrl: string;
  icon: LucideIcon;
  featured?: boolean;
};

type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const quickStats: Stat[] = [
  { label: "Next Date", value: "May 30", icon: CalendarDays },
  { label: "Start time", value: "10:00 AM", icon: Clock3 },
  { label: "Ages", value: "Teens and adults", icon: Users },
];

const upcomingDates = ["May 30", "June 20", "July 18"];

const programOptions: ProgramOption[] = [
  {
    option: "Option 1",
    name: "CPR — No Certificate",
    price: "$100",
    duration: "2 hours",
    time: "10:00 AM - 12:00 PM",
    description:
      "A focused CPR AED training session for anyone who wants to learn life-saving skills without the certification card.",
    certificate: "No certification card — training only",
    includes: [
      "Adult CPR AED",
      "Adult choking",
      "Child CPR AED",
      "Child and infant choking",
    ],
    checkoutUrl: "https://buy.stripe.com/00wbIUf4E7k66FX2SfdfG0j",
    icon: HeartPulse,
  },
  {
    option: "Option 2",
    name: "CPR — With Certificate",
    price: "$150",
    duration: "2 hours",
    time: "10:00 AM - 12:00 PM",
    description:
      "The same CPR AED training plus an accredited American Heart Association certification card valid for 2 years.",
    certificate: "2-year AHA CPR certification card included",
    includes: [
      "Adult CPR AED",
      "Adult choking",
      "Child CPR AED",
      "Child and infant choking",
      "AHA certification card (valid 2 years)",
    ],
    checkoutUrl: "https://buy.stripe.com/4gMfZabSs9se4xPakHdfG0k",
    icon: BadgeCheck,
    featured: true,
  },
];

const credibilityPoints = [
  "Receive an accredited American Heart Association certification card that is valid for 2 years.",
  "Designed for job responsibilities, workplace readiness, family safety, and community response.",
  "Course content follows the 2025 American Heart Association Guidelines for CPR and ECC.",
];

const courseAudience = [
  "Individuals who must respond to a cardiac emergency because of job responsibilities or regulatory requirements.",
  "Lay rescuers who may need to respond to an emergency in the workplace.",
  "Family members of patients at high risk for sudden cardiac death.",
  "Teens and adults who want practical, life-saving confidence.",
];

const cprCourseCoverage = [
  "Adult CPR AED",
  "Adult choking",
  "Child CPR AED",
  "Child and infant choking",
];

function SectionIntro({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow: string;
  title: string;
  description: string;
  light?: boolean;
}) {
  return (
    <div className={light ? "text-white" : "text-brand-ink"}>
      <p
        className={`text-sm font-semibold uppercase tracking-[0.24em] ${
          light ? "text-white/72" : "text-brand-red"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl [text-wrap:balance]">
        {title}
      </h2>
      <p className={`mt-4 max-w-2xl text-base leading-8 ${light ? "text-white/80" : "text-brand-ink/72"}`}>
        {description}
      </p>
    </div>
  );
}

function calcCardPrice(priceStr: string): string {
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  return "$" + (num * 1.04).toFixed(2);
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<(typeof programOptions)[0] | null>(null);

  function openModal(option: (typeof programOptions)[0]) {
    setSelectedOption(option);
    setModalOpen(true);
  }

  return (
    <main className="pb-16 sm:pb-24">
      {selectedOption && (
        <PaymentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          courseName={selectedOption.name}
          cashPrice={selectedOption.price}
          cardPrice={calcCardPrice(selectedOption.price)}
          stripeLink={selectedOption.checkoutUrl}
        />
      )}
      <SiteHeader />

      <section id="overview" className="section-shell scroll-mt-28 pt-1 sm:scroll-mt-32 sm:pt-2">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(340px,1.02fr)] lg:gap-10">
          <div className="fade-up fade-up-delay-1 rounded-[38px] border border-white/75 bg-white/82 px-6 py-8 shadow-[0_30px_90px_rgba(5,38,77,0.12)] backdrop-blur sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-brand-red/16 bg-brand-red/8 px-4 py-2 text-sm font-semibold text-brand-red">
                Every 3rd Saturday
              </span>
              <span className="rounded-full border border-brand-navy/12 bg-brand-navy/5 px-4 py-2 text-sm font-semibold text-brand-navy">
                For teens and adults
              </span>
              <span className="rounded-full border border-brand-gold/22 bg-brand-gold/14 px-4 py-2 text-sm font-semibold text-brand-ink">
                AHA-aligned certification
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.02] text-brand-ink sm:text-5xl lg:text-6xl [text-wrap:balance]">
              CPR AND FIRST AID TRAINING
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-ink/74 sm:text-lg">
              Classes run every 3rd Saturday of the month — May 30, June 20, and July 18 — starting
              at 10:00 AM. Choose the $100 training-only option or the $150 option that includes
              your 2-year AHA certification card. Both are built to help you respond calmly in the
              first critical minutes of an emergency.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-navy/92"
              >
                View Course Options
              </a>
              <a
                href="#syllabus"
                className="inline-flex items-center justify-center rounded-full border border-brand-navy/12 bg-white px-6 py-3.5 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy/5"
              >
                See What You Learn
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {programOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => openModal(option)}
                  aria-label={`Enroll now in ${option.name} for ${option.price}`}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 ${
                    option.featured
                      ? "bg-brand-red text-white hover:bg-brand-red/92"
                      : "border border-brand-navy/12 bg-white text-brand-navy hover:bg-brand-navy/5"
                  }`}
                >
                  Enroll Now
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {quickStats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-[28px] border border-brand-navy/10 bg-brand-cream/72 p-5 shadow-[0_18px_45px_rgba(5,38,77,0.08)]"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-red shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink/48">
                    {label}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold text-brand-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up fade-up-delay-2 relative pb-0 sm:pb-22">
            <div className="absolute left-6 right-6 top-8 h-[78%] rounded-[40px] bg-brand-red/16 blur-3xl" />
            <div className="absolute right-0 top-10 h-24 w-24 rounded-full bg-brand-gold/54 blur-2xl" />

            <div className="relative overflow-hidden rounded-[40px] border border-white/70 bg-white/55 p-3 shadow-[0_34px_90px_rgba(5,38,77,0.22)] backdrop-blur">
              <div className="relative h-[480px] overflow-hidden rounded-[32px] sm:h-[530px]">
                <Image
                  src="/cpr-training.jpg"
                  alt="CPR training mannequin used for emergency response instruction"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,38,77,0.18)_0%,rgba(5,38,77,0.36)_44%,rgba(5,38,77,0.92)_100%)]" />

                <div className="absolute left-5 right-5 top-5 flex items-start sm:left-6 sm:right-6 sm:top-6">
                  <div className="rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                    Every 3rd Saturday · 10:00 AM
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="max-w-lg">
                    <p className="inline-flex rounded-full border border-brand-gold/45 bg-brand-navy/58 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd8a2] shadow-[0_10px_28px_rgba(5,38,77,0.45)] backdrop-blur-sm">
                      CPR certification course
                    </p>
                    <h2 className="mt-3 font-display text-[1.9rem] font-semibold leading-tight text-white drop-shadow-[0_8px_20px_rgba(5,38,77,0.55)] sm:text-4xl">
                      Two options, one high-trust CPR course every 3rd Saturday.
                    </h2>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {programOptions.map(({ option, name, price, time, certificate, featured }) => (
                      <div
                        key={name}
                        className={`rounded-[26px] border px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.14)] backdrop-blur ${
                          featured
                            ? "border-brand-gold/30 bg-white text-brand-ink"
                            : "border-white/16 bg-white/12 text-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p
                              className={`text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${
                                featured ? "text-brand-red" : "text-white/68"
                              }`}
                            >
                              {option}
                            </p>
                            <p className="mt-2 font-display text-2xl font-semibold">{name}</p>
                          </div>
                          <p className="font-display text-3xl font-semibold">{price}</p>
                        </div>
                        <p className={`mt-3 text-sm font-semibold ${featured ? "text-brand-ink/70" : "text-white/76"}`}>
                          {time}
                        </p>
                        <p className={`mt-1 text-sm leading-6 ${featured ? "text-brand-ink/72" : "text-white/78"}`}>
                          {certificate}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 w-full rounded-[30px] border border-white/70 bg-white p-3 shadow-[0_24px_60px_rgba(5,38,77,0.18)] sm:float-soft sm:absolute sm:-bottom-1 sm:right-4 sm:mt-0 sm:w-[72%] sm:max-w-[320px]">
              <div className="relative h-44 overflow-hidden rounded-[24px]">
                <Image
                  src="/first-aid-kit.jpg"
                  alt="First aid equipment laid out for emergency response training"
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_22%,rgba(5,38,77,0.48)_100%)]" />
                <div className="absolute left-4 top-4 rounded-full bg-white/84 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-navy">
                  CPR Training
                </div>
              </div>

              <div className="p-2 pb-1 pt-4">
                <p className="font-display text-xl font-semibold text-brand-ink">
                  Add your AHA cert card for just $50 more.
                </p>
                <p className="mt-2 text-sm leading-7 text-brand-ink/72">
                  The $150 option includes everything in the training plus a 2-year American Heart
                  Association certification card recognized by employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="section-shell scroll-mt-28 pt-10 sm:scroll-mt-32 sm:pt-14">
        <SectionIntro
          eyebrow="Programs"
          title="Simple pricing, clear options — no cert or with cert."
          description="Classes run every 3rd Saturday: May 30, June 20, and July 18. Pick the option that fits your needs."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(320px,0.95fr)]">
          {programOptions.map(
            ({ option, name, price, duration, time, description, certificate, includes, checkoutUrl, icon: Icon, featured }) => (
              <article
                key={name}
                className={`fade-up overflow-hidden rounded-[34px] border p-6 shadow-[0_25px_70px_rgba(5,38,77,0.12)] ${
                  featured
                    ? "border-brand-red/12 bg-brand-red text-white"
                    : "border-white/70 bg-white/82 text-brand-ink backdrop-blur"
                }`}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                        featured ? "bg-white/14 text-white" : "bg-brand-navy/6 text-brand-red"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <p
                      className={`mt-5 text-xs font-semibold uppercase tracking-[0.18em] ${
                        featured ? "text-white/72" : "text-brand-red"
                      }`}
                    >
                      {option}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-semibold">{name}</h3>
                    <p className={`mt-2 text-sm font-semibold ${featured ? "text-white/72" : "text-brand-ink/62"}`}>
                      {duration} | {time}
                    </p>
                  </div>

                  <div
                    className={`rounded-[24px] px-4 py-3 text-right ${
                      featured ? "bg-white/12" : "bg-brand-cream"
                    }`}
                  >
                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                        featured ? "text-white/72" : "text-brand-ink/48"
                      }`}
                    >
                      Tuition
                    </p>
                    <p className="mt-1 font-display text-4xl font-semibold">{price}</p>
                  </div>
                </div>

                <p className={`mt-5 text-base leading-8 ${featured ? "text-white/86" : "text-brand-ink/74"}`}>
                  {description}
                </p>

                <div
                  className={`mt-5 rounded-[24px] border px-4 py-4 ${
                    featured ? "border-white/14 bg-white/10" : "border-brand-navy/10 bg-brand-cream/70"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold uppercase tracking-[0.18em] ${
                      featured ? "text-brand-gold" : "text-brand-red"
                    }`}
                  >
                    Certificate
                  </p>
                  <p className={`mt-2 text-sm leading-7 ${featured ? "text-white/84" : "text-brand-ink/72"}`}>
                    {certificate}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  {includes.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`mt-0.5 h-5 w-5 shrink-0 ${featured ? "text-brand-gold" : "text-brand-red"}`}
                      />
                      <p className={`text-sm leading-7 ${featured ? "text-white/84" : "text-brand-ink/72"}`}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => openModal({ option, name, price, duration, time, description, certificate, includes, checkoutUrl, icon: Icon, featured })}
                  aria-label={`Enroll now in ${name} for ${price}`}
                  className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5 ${
                    featured
                      ? "bg-white text-brand-red hover:bg-white/92"
                      : "bg-brand-navy text-white hover:bg-brand-navy/92"
                  }`}
                >
                  Enroll Now — Choose Payment
                </button>
              </article>
            ),
          )}

          <aside className="fade-up fade-up-delay-1 overflow-hidden rounded-[34px] bg-brand-navy text-white shadow-[0_28px_70px_rgba(5,38,77,0.25)]">
            <div className="relative h-44">
              <Image
                src="/first-aid-kit.jpg"
                alt="First aid kit and emergency supplies used during training"
                fill
                sizes="(max-width: 1280px) 100vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,38,77,0.08)_0%,rgba(5,38,77,0.72)_100%)]" />
              <div className="absolute left-6 top-6 rounded-full bg-white/84 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-navy">
                What you receive
              </div>
            </div>

            <div className="px-6 py-5">
              <SectionIntro
                eyebrow="Why enroll"
                title="Recognized certification with practical emergency-response value."
                description="This course is positioned for clarity, trust, and real usefulness after the session ends."
                light
              />

              <div className="mt-7 space-y-4">
                {credibilityPoints.map((point) => (
                  <div key={point} className="rounded-[24px] border border-white/10 bg-white/8 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                      <p className="text-sm leading-7 text-white/86">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="syllabus" className="section-shell scroll-mt-28 pt-16 sm:scroll-mt-32 sm:pt-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="fade-up overflow-hidden rounded-[36px] border border-brand-red/10 bg-brand-red text-white shadow-[0_28px_80px_rgba(213,48,51,0.22)]">
            <div className="relative h-58">
              <Image
                src="/cpr-training.jpg"
                alt="Close-up of CPR training setup for emergency response practice"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,38,77,0.18)_0%,rgba(5,38,77,0.82)_100%)]" />
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-9">
              <SectionIntro
                eyebrow="Syllabus"
                title="Training content built for the first minutes of an emergency."
                description="The course supports people who may need to act quickly at work, at home, or in the community when emergency medical services have not arrived yet."
                light
              />

              <div className="mt-8 rounded-[28px] border border-white/14 bg-white/8 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/68">
                  This course is intended for
                </p>
                <div className="mt-4 space-y-3">
                  {courseAudience.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                      <p className="text-sm leading-7 text-white/88">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <article className="fade-up fade-up-delay-1 rounded-[36px] border border-white/70 bg-white/84 px-6 py-7 shadow-[0_25px_70px_rgba(5,38,77,0.11)] backdrop-blur sm:px-8 sm:py-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">
                    Heartsaver CPR AED course
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-brand-ink">
                    Core CPR coverage
                  </h3>
                </div>
                <div className="rounded-full bg-brand-cream px-4 py-2 text-sm font-semibold text-brand-ink">
                  Included in both options
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {cprCourseCoverage.map((item) => (
                  <div
                    key={item}
                    className="rounded-[28px] border border-brand-navy/8 bg-brand-cream/78 p-5"
                  >
                    <HeartPulse className="h-5 w-5 text-brand-red" />
                    <p className="mt-4 text-lg font-semibold text-brand-ink">{item}</p>
                    <p className="mt-2 text-sm leading-7 text-brand-ink/70">
                      Presented in simple, practical steps that support fast recall in an emergency.
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="fade-up fade-up-delay-2 rounded-[36px] border border-brand-navy/8 bg-brand-navy px-6 py-7 text-white shadow-[0_28px_80px_rgba(5,38,77,0.22)] sm:px-8 sm:py-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-gold">
                    AHA Certification
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold">
                    Upcoming class dates
                  </h3>
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/82">
                  Every 3rd Saturday
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {upcomingDates.map((date) => (
                  <div key={date} className="rounded-[28px] border border-white/10 bg-white/8 p-5">
                    <CalendarDays className="h-5 w-5 text-brand-gold" />
                    <p className="mt-4 text-lg font-semibold">{date}</p>
                    <p className="mt-2 text-sm leading-7 text-white/78">10:00 AM · 2 hours</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[28px] border border-brand-gold/20 bg-brand-gold/10 p-5">
                <p className="text-sm leading-7 text-white/86">
                  Add your 2-year American Heart Association certification card for $150 — just $50
                  more than the $100 training-only option. The cert is recognized by employers and
                  valid for 2 years.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell pt-16 sm:pt-20">
        <div className="fade-up fade-up-delay-3 overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#05264d_0%,#0a396f_42%,#d53033_100%)] px-6 py-9 text-white shadow-[0_32px_90px_rgba(5,38,77,0.24)] sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/72">
                CPR course — every 3rd Saturday
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl [text-wrap:balance]">
                Train once and leave with skills that matter at home, at work, and in the community.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/82">
                Upcoming dates: May 30, June 20, July 18. Choose $100 for training only or $150
                to include your 2-year AHA certification card.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-brand-navy transition-transform hover:-translate-y-0.5"
              >
                Compare Class Options
              </a>
              <a
                href="#syllabus"
                className="inline-flex items-center justify-center rounded-full border border-white/22 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/8"
              >
                Review Full Syllabus
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
