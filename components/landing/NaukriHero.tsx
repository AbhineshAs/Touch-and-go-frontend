"use client";

import React, { useRef, useEffect } from "react";

interface NaukriHeroProps {
  show3DCanvas?: boolean;
}

export function NaukriHero({}: NaukriHeroProps = {}) {
  const landscapeVideoRef = useRef<HTMLVideoElement | null>(null);
  const portraitVideoRef = useRef<HTMLVideoElement | null>(null);

  // Guarantee seamless video playback across mobile browsers & orientation swaps
  useEffect(() => {
    const startPlay = (video: HTMLVideoElement | null) => {
      if (video && video.paused) {
        video.play().catch(() => {
          // Autoplay policy fallback (silent catch)
        });
      }
    };
    startPlay(landscapeVideoRef.current);
    startPlay(portraitVideoRef.current);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F8FB] border-b border-[#B9D7EA]/60 flex items-center justify-center aspect-[9/16] sm:aspect-video max-h-[calc(100vh-70px)] sm:max-h-[85vh] min-h-[380px] sm:min-h-[500px]">
      {/* Landscape (16:9) Video: Displayed on Desktop, Laptops & Landscape orientation */}
      <video
        ref={landscapeVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
        tabIndex={-1}
        aria-hidden="true"
        poster="/video/herosection-poster.jpg"
        className="hidden landscape:block md:block md:portrait:hidden lg:portrait:block w-full h-full object-cover object-center pointer-events-none select-none"
      >
        <source src="/video/herosection.mp4" type="video/mp4" />
        <source src="/herosection.mp4" type="video/mp4" />
      </video>

      {/* Portrait (9:16) Video: Displayed on Mobile Phones & Portrait viewports */}
      <video
        ref={portraitVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
        tabIndex={-1}
        aria-hidden="true"
        poster="/video/herosection-portrait-poster.jpg"
        className="block landscape:hidden md:hidden md:portrait:block lg:portrait:hidden w-full h-full object-cover object-center pointer-events-none select-none"
      >
        <source src="/video/herosection-portrait.mp4" type="video/mp4" />
        <source src="/video/herosection%20portrait.mp4" type="video/mp4" />
        <source src="/herosection-portrait.mp4" type="video/mp4" />
        <source src="/herosection portrait.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
