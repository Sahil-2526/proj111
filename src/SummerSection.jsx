import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SummerSection = () => {
  const sectionRef = useRef(null);
  const fadeOverlayRef = useRef(null);
  const sunRef = useRef(null);
  const raysRef = useRef(null);
  const heatWavesRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. FADE TRANSITION ---
      gsap.fromTo(
        fadeOverlayRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // --- 2. GENTLE SUN PULSE ---
      gsap.to(sunRef.current, {
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // --- 3. SLOW ROTATING RAYS ---
      gsap.to(raysRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      // --- 4. CONTINUOUS HEAT WAVES ---
      heatWavesRef.current.forEach((wave, index) => {
        gsap.fromTo(
          wave,
          { y: window.innerHeight + 50, opacity: 0 },
          {
            y: -150,
            opacity: 0.5,
            duration: gsap.utils.random(12, 20),
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 2,
          }
        );

        // Horizontal wave motion
        gsap.to(wave, {
          x: `+=${gsap.utils.random(-80, 80)}`,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // --- 5. TEXT ANIMATIONS ---
      // Title: Fade in with scale
      gsap.fromTo(
        titleRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtitle: Slide up with fade
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card: Slide up with bounce
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "back.out(1.3)",
          delay: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* --- BASE BACKGROUND (WARM SUNSET) --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff9e6] via-[#ffe0b2] to-[#ffcc80] -z-10"></div>

      {/* --- FADE OVERLAY --- */}
      <div
        ref={fadeOverlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[#f8bbd0] via-[#f48fb1] to-[#fce4ec] z-10 pointer-events-none"
      ></div>

      {/* --- SOFTER SUN --- */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-0">
        <div
          ref={sunRef}
          className="w-[280px] h-[280px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #fff9e6 0%, #ffe082 40%, #ffb74d 70%, #ffa726 100%)',
            boxShadow: '0 0 60px 25px rgba(255, 193, 7, 0.3), 0 0 100px 50px rgba(255, 167, 38, 0.15)',
          }}
        ></div>

        {/* Gentle Sun Rays */}
        <div
          ref={raysRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px]"
        >
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-[350px] h-[4px] origin-left"
              style={{
                background: 'linear-gradient(90deg, rgba(255,224,178,0.5) 0%, transparent 100%)',
                transform: `rotate(${i * 22.5}deg)`,
                filter: 'blur(2px)',
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* --- HEAT WAVES --- */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (heatWavesRef.current[i] = el)}
            className="absolute left-1/2 -translate-x-1/2 w-[70%] h-[2px] rounded-full opacity-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,167,38,0.4), transparent)',
              filter: 'blur(1.5px)',
            }}
          ></div>
        ))}
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-black mb-6 opacity-0"
          style={{
            background: 'linear-gradient(135deg, #ff8a65 0%, #ffb74d 50%, #ffe082 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 4px 20px rgba(255, 138, 101, 0.2)',
          }}
        >
          GOLDEN HOUR
        </h1>

        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-orange-900/70 mb-16 max-w-3xl font-light tracking-wide opacity-0"
        >
          Warmth embraces all • The zenith of light and life
        </p>

        <div
          ref={cardRef}
          className="relative p-10 bg-white/55 backdrop-blur-md rounded-[2rem] shadow-[0_10px_50px_rgba(255,138,101,0.15)] border border-orange-200/40 max-w-2xl opacity-0"
        >
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
            Summer glows with gentle radiance—golden rays cascade softly across the horizon. 
            The world basks in warmth, suspended in a moment of perfect tranquility.
          </p>
        </div>
      </div>

      {/* --- AMBIENT GLOW --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(255,224,178,0.5) 0%, transparent 55%)',
        }}
      ></div>
    </div>
  );
};

export default SummerSection;
