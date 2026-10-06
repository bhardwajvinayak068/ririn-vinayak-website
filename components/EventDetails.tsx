"use client";

import Reveal from "./Reveal";
import Divider from "./Divider";

const MAP_QUERY = encodeURIComponent("Mahi Resort, Patti, Punjab");

const SCHEDULE = [
  {
    time: "10:30 AM",
    title: "Baraat Agaman & Shahi Swagat",
    sanskrit: "बारात आगमन एवं शाही स्वागत",
    desc: "The grand royal procession of the groom with traditional dhol rhythms, greeted with the auspicious Milni family welcome.",
  },
  {
    time: "11:45 AM",
    title: "Shubh Jaimala Ceremony",
    sanskrit: "शुभ जयमाला महोत्सव",
    desc: "The sacred exchange of fragrant floral garlands under the palatial Mandap, showered with rose petals and Vedic shlokas.",
  },
  {
    time: "12:30 PM",
    title: "Vedic Vivah & Saptapadi (Saat Phere)",
    sanskrit: "सप्तपदी एवं वैदिक विवाह संस्कार",
    desc: "The Seven Sacred Vows around the holy Agni fire, Kanyadaan, and solemn promises of lifelong devotion and companionship.",
  },
  {
    time: "02:00 PM",
    title: "Shahi Preeti Bhoj (Royal Banquet)",
    sanskrit: "शाही प्रीतिभोज",
    desc: "A celebratory feast of authentic royal Punjabi culinary heritage, aromatic delicacies, and celebratory sweets.",
  },
  {
    time: "04:00 PM",
    title: "Aashirwaad & Vidai",
    sanskrit: "आशीर्वाद एवं विदाई",
    desc: "Cherished blessings from elders, heartfelt farewells, and the beginning of the bride and groom's eternal new chapter.",
  },
];

export default function EventDetails() {
  function downloadICS() {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Vinayak & Ririn Royal Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:royal-wedding-vinayak-ririn-2027@vinayakbhardwaj.com",
      "DTSTAMP:20261003T000000Z",
      "DTSTART:20270116T050000Z",
      "DTEND:20270116T120000Z",
      "SUMMARY:Shubh Vivah: Vinayak & Ririn",
      "DESCRIPTION:Witness the royal wedding ceremony of Vinayak & Ririn at Mahi Resort, Patti, Punjab.",
      "LOCATION:Mahi Resort, Patti, Punjab",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vinayak-ririn-royal-wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Shubh Vivah: Vinayak & Ririn's Royal Wedding"
  )}&dates=20270116T050000Z/20270116T120000Z&details=${encodeURIComponent(
    "Witness the royal Hindu wedding ceremony of Vinayak & Ririn at Mahi Resort, Patti, Punjab."
  )}&location=${encodeURIComponent("Mahi Resort, Patti, Punjab")}`;

  return (
    <section id="details" className="relative z-10 px-6 py-24 sm:py-32 overflow-hidden bg-[#FAF6F0]">
      <div className="relative mx-auto max-w-4xl">
        <Reveal variant="clip" className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-50/70 px-5 py-1 text-xs text-amber-800 shadow-sm">
            <span>🪷</span>
            <span className="font-serif tracking-widest font-semibold uppercase">
              ॥ विवाह संस्कार ॥
            </span>
            <span>🪷</span>
          </div>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl italic text-ink font-normal">
            Sacred Rites &amp; Celebrations
          </h2>
          <div className="my-6">
            <Divider variant="kamal" />
          </div>
          <p className="mx-auto max-w-md font-body text-sm sm:text-base text-ink/75">
            The auspicious timeline of ceremonies celebrating the union of Vinayak &amp; Ririn.
          </p>
        </Reveal>

        {/* Date & Venue Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal variant="scale">
            <div className="h-full rounded-2xl border border-amber-400/40 bg-white/80 p-8 text-center shadow-[0_8px_30px_-12px_rgba(212,175,55,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60">
              <span className="text-2xl">🪔</span>
              <p className="mt-3 font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
                Auspicious Date &amp; Muhurat
              </p>
              <p className="mt-2 font-display text-3xl text-ink font-medium">
                16th January 2027
              </p>
              <p className="mt-1 font-body text-sm text-ink/75">
                Saturday &middot; Baraat Welcome at 10:30 AM
              </p>
            </div>
          </Reveal>

          <Reveal variant="scale">
            <div className="h-full rounded-2xl border border-amber-400/40 bg-white/80 p-8 text-center shadow-[0_8px_30px_-12px_rgba(212,175,55,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60">
              <span className="text-2xl">🏛️</span>
              <p className="mt-3 font-body text-xs uppercase tracking-widest2 text-amber-800 font-semibold">
                Royal Wedding Grounds
              </p>
              <p className="mt-2 font-display text-3xl text-ink font-medium">
                Mahi Resort
              </p>
              <p className="mt-1 font-body text-sm text-ink/75">
                Patti, Punjab, India
              </p>
            </div>
          </Reveal>
        </div>

        {/* Timeline Order of Rites */}
        <div className="mt-14 space-y-4">
          {SCHEDULE.map((item, idx) => (
            <Reveal key={item.title} variant="scale">
              <div className="flex flex-col gap-3 rounded-2xl border border-amber-400/30 bg-white/85 p-6 shadow-[0_4px_20px_-8px_rgba(212,175,55,0.15)] backdrop-blur-sm transition-all duration-300 hover:border-amber-500/60 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start sm:items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-amber-50/80 font-serif text-sm font-semibold italic text-amber-800 shadow-inner">
                    0{idx + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h4 className="font-display text-lg text-ink font-semibold">{item.title}</h4>
                      <span className="font-serif text-xs text-amber-800/80 italic">{item.sanskrit}</span>
                    </div>
                    <p className="mt-1 font-body text-xs sm:text-sm text-ink/70 leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
                <span className="shrink-0 font-body text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-300/50 self-start sm:self-center">
                  {item.time}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Action Buttons: Directions, Google Calendar, Apple iCal */}
        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-amber-600 bg-amber-600 px-7 py-3 font-body text-xs uppercase tracking-widest2 text-white shadow-md transition-all duration-200 hover:bg-amber-700 active:scale-95 font-semibold"
          >
            <span>📍 Venue Map &amp; Directions</span>
          </a>

          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-white px-7 py-3 font-body text-xs uppercase tracking-widest2 text-ink/80 transition-all duration-200 hover:border-amber-500 hover:bg-amber-50 active:scale-95 font-medium"
          >
            <span>📅 Add to Google Calendar</span>
          </a>

          <button
            onClick={downloadICS}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-white px-7 py-3 font-body text-xs uppercase tracking-widest2 text-ink/80 transition-all duration-200 hover:border-amber-500 hover:bg-amber-50 active:scale-95 font-medium"
          >
            <span>🍏 Apple / iCal (.ics)</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
