"use client";

import { useEffect, useRef, useState } from "react";
import EnvelopeHero from "@/components/EnvelopeHero";
import BackgroundMusic, { BackgroundMusicHandle } from "@/components/BackgroundMusic";
import FloralCanvas from "@/components/FloralCanvas";
import CoupleIntro from "@/components/CoupleIntro";
import OurStory from "@/components/OurStory";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import Gallery from "@/components/Gallery";
import GiftBank from "@/components/GiftBank";
import Footer from "@/components/Footer";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const musicRef = useRef<BackgroundMusicHandle>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  return (
    <>
      <FloralCanvas />
      <BackgroundMusic ref={musicRef} />
      <EnvelopeHero
        onComplete={() => setOpened(true)}
        onBegin={() => musicRef.current?.play()}
      />
      <main className="relative">
        <CoupleIntro />
        <OurStory />
        <Countdown />
        <EventDetails />
        <Gallery />
        <GiftBank />
        <Footer />
      </main>
    </>
  );
}
