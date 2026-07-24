import Reveal from "./Reveal";
import Divider from "./Divider";

const MAP_QUERY = encodeURIComponent("Mahi Resort, Patti, Punjab");

export default function EventDetails() {
  return (
    <section id="details" className="relative z-10 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="clip" className="text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-rose-gold">
            Save the Date
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-ink sm:text-5xl">
            The Celebration
          </h2>
          <div className="my-8">
            <Divider />
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal variant="scale">
            <div className="rounded-2xl border border-rose-gold/25 bg-cream/80 p-8 text-center shadow-[0_8px_30px_-12px_rgba(183,110,121,0.25)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="font-body text-xs uppercase tracking-widest2 text-rose-gold">
                Date
              </p>
              <p className="mt-3 font-display text-2xl text-ink">
                16th January 2027
              </p>
              <p className="mt-1 font-body text-sm text-ink/60">
                Saturday
              </p>
            </div>
          </Reveal>

          <Reveal variant="scale">
            <div className="rounded-2xl border border-rose-gold/25 bg-cream/80 p-8 text-center shadow-[0_8px_30px_-12px_rgba(183,110,121,0.25)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
              <p className="font-body text-xs uppercase tracking-widest2 text-rose-gold">
                Venue
              </p>
              <p className="mt-3 font-display text-2xl text-ink">
                Mahi Resort
              </p>
              <p className="mt-1 font-body text-sm text-ink/60">
                Patti, Punjab
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-rose-gold px-8 py-3 font-body text-xs uppercase tracking-widest2 text-rose-gold transition-all duration-200 hover:bg-rose-gold hover:text-cream active:scale-95"
          >
            View on Map
          </a>
        </Reveal>
      </div>
    </section>
  );
}
