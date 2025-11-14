import { Sleigh } from "@/components/Sleigh";
import { StarField } from "@/components/StarField";
import SnowCanvas from "@/components/SnowCanvas";

const highlights = [
  {
    title: "Elf-Guided Sleigh School",
    description:
      "Practice steering enchanted sleighs, learn reindeer care, and earn your Junior Pilot badge.",
    icon: "🛷",
  },
  {
    title: "Cookie Lab with Mrs. Claus",
    description:
      "Whisk, bake, and decorate peppermint swirls while sipping sparkling aurora cocoa.",
    icon: "🍪",
  },
  {
    title: "Aurora Storytime",
    description:
      "Bundle up in the starlit observatory as Santa reads legendary tales of the Northern Lights.",
    icon: "📚",
  },
];

const itinerary = [
  {
    time: "4:30 PM",
    title: "Glowing Welcome Parade",
    description:
      "March in with the twinkling toy soldiers and meet your personal elf concierge.",
  },
  {
    time: "6:00 PM",
    title: "Reindeer Flight Training",
    description:
      "Harness Dasher & friends for a mini-flight across the Polar Plaza sky dome.",
  },
  {
    time: "7:45 PM",
    title: "Secret Workshop Quest",
    description:
      "Solve frosty riddles to unlock Santa’s treasure vault—exclusive souvenirs await.",
  },
  {
    time: "9:15 PM",
    title: "Stardust Slumber Finale",
    description:
      "Snuggle into heated moon pods while snowflakes paint bedtime lullabies on the dome.",
  },
];

const perks = [
  "Luxurious Polar Suite passes for the whole family",
  "Chef-curated gourmet dinners with child-approved magic",
  "Private meet-and-greet with Santa and the Council of Reindeer",
  "Keepsake photo book and customizable gifting trunk",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.55),rgba(2,6,23,0.9)_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(15,23,42,0.45),rgba(2,6,23,0.95)_55%,rgba(15,23,42,0.98))]" />

      <div className="pointer-events-none absolute left-[8%] top-[6%] h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(248,250,252,0.95)_0%,rgba(226,232,240,0.4)_45%,rgba(15,23,42,0)_70%)] shadow-[0_0_50px_rgba(226,232,240,0.45)] md:h-44 md:w-44 lg:h-56 lg:w-56" />

      <StarField />
      <Sleigh />
      <SnowCanvas />

      <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-24 pt-24 sm:px-10 md:pb-32 lg:px-16">
        <header className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-sky-100/80 backdrop-blur">
            North Pole Express
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-sky-50 drop-shadow-[0_10px_25px_rgba(14,116,144,0.35)] sm:text-5xl lg:text-6xl">
            A Moonlit Holiday Escape to Santa’s Secret Quarters
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200/90 sm:text-xl">
            Designed for curious adventurers ages 7–11, this overnight itinerary
            wraps the magic of the North Pole in cozy luxury—glowing sleigh
            rides, frosted workshops, and sparkling star shows included.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 text-base font-medium">
            <a
              href="#reserve"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-6 py-3 text-lg font-semibold text-slate-900 shadow-[0_12px_30px_rgba(14,116,144,0.45)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(59,130,246,0.45)]"
            >
              Book Your Sleigh
            </a>
            <a
              href="#highlights"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-lg font-semibold text-white backdrop-blur transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
            >
              Peek at the Magic
            </a>
          </div>
        </header>

        <section
          id="highlights"
          className="mt-16 grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:grid-cols-3"
        >
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.35)] transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="text-xl font-semibold text-sky-100">
                {item.title}
              </h3>
              <p className="text-sm text-slate-200/80">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="text-3xl font-semibold text-sky-100">
              Snowglobe Schedule
            </h2>
            <p className="mt-3 text-slate-200/80">
              Every moment is choreographed to surprise and delight—yet we mix
              in mindful breathing breaks and warm treats to keep energy high
              and spirits brighter.
            </p>
            <div className="mt-8 space-y-6">
              {itinerary.map((slot) => (
                <div
                  key={slot.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/70 to-indigo-500/70 text-base font-semibold text-slate-900 shadow-[0_12px_30px_rgba(59,130,246,0.35)]">
                    {slot.time}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-sky-100">
                      {slot.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-200/80">
                      {slot.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(148,197,255,0.25),rgba(15,23,42,0.85))] p-8 backdrop-blur-xl">
              <h2 className="text-3xl font-semibold text-sky-100">
                Polar Perks
              </h2>
              <ul className="mt-6 space-y-3 text-sm text-slate-200/85">
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/10 px-4 py-3"
                  >
                    <span className="mt-0.5 text-sky-300">✧</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-[0_25px_60px_rgba(2,132,199,0.25)]">
              <h3 className="text-2xl font-semibold text-sky-100">
                Parent Peace-of-Mind
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200/85">
                <li>• Dedicated elves-to-child ratio of 1:3</li>
                <li>• Certified Polar wellness team on-site 24/7</li>
                <li>• Cozy heated domes with customizable bedtime playlists</li>
                <li>• Secure direct sleigh transfers from Anchorage charter</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <h2 className="text-3xl font-semibold text-sky-100">
            Voices from Last Year’s Junior Explorers
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-sm text-slate-200/85 shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
              <p>
                “The reindeers actually remembered me! I still wear my aurora
                pilot pin every day.”
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-300/70">
                Harper, age 9
              </footer>
            </blockquote>
            <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-sm text-slate-200/85 shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
              <p>
                “Mrs. Claus said my cocoa art was museum-worthy. I’m practicing
                for next year!”
              </p>
              <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-300/70">
                Milo, age 8
              </footer>
            </blockquote>
          </div>
        </section>

        <section
          id="reserve"
          className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-sky-400/30 via-indigo-500/25 to-blue-700/30 p-10 backdrop-blur-xl"
        >
          <div className="absolute -right-40 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(224,242,254,0.55),rgba(56,189,248,0)_70%)] blur-3xl md:block" />
          <div className="relative z-10 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-slate-50">
              Ready for a Moonlit Departure?
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-200/85">
              Our concierge elves tailor every itinerary to your family’s winter
              dreams. Secure your sleigh in under five minutes—holiday magic is
              just a wish away.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="https://northpoleexpress.example.com/book"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-slate-900 shadow-[0_20px_40px_rgba(255,255,255,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,255,255,0.4)]"
              >
                Reserve My Sleigh
              </a>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-200/80">
                Limited Holiday Windows • VIP Only
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
