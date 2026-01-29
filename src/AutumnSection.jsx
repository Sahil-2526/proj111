import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AutumnSection = () => {
  const sectionRef = useRef(null);
  const fadeOverlayRef = useRef(null);
  const leavesRef = useRef([]);
  const windLinesRef = useRef([]);
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

      // --- 2. REALISTIC MAPLE LEAVES ---
      leavesRef.current.forEach((leaf) => {
        gsap.set(leaf, {
          x: gsap.utils.random(-50, window.innerWidth + 50),
          y: -80,
          rotation: gsap.utils.random(0, 360),
          scale: gsap.utils.random(0.6, 1.1),
        });

        // Natural tumbling fall
        gsap.to(leaf, {
          y: window.innerHeight + 120,
          x: `+=${gsap.utils.random(-350, 350)}`,
          rotation: `+=${gsap.utils.random(720, 1440)}`,
          duration: gsap.utils.random(14, 24),
          repeat: -1,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 8),
        });

        // Opacity variation
        gsap.to(leaf, {
          opacity: gsap.utils.random(0.6, 1),
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // --- 3. CONTINUOUS WIND LINES ---
      windLinesRef.current.forEach((line, index) => {
        gsap.fromTo(
          line,
          { x: -window.innerWidth * 0.3, opacity: 0 },
          {
            x: window.innerWidth * 1.3,
            opacity: 0.35,
            duration: gsap.utils.random(5, 9),
            repeat: -1,
            ease: "sine.inOut",
            delay: index * 1.5,
          }
        );
      });

      // --- 4. TEXT ANIMATIONS ---
      // Title: Slide in from bottom with rotation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotationX: 20 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Subtitle: Fade in with slight blur
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card: Slide in from right
      gsap.fromTo(
        cardRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.8,
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
      {/* --- BASE BACKGROUND (EARTHY TONES) --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#d7ccc8] via-[#bcaaa4] to-[#8d6e63] -z-10"></div>

      {/* --- FADE OVERLAY --- */}
      <div
        ref={fadeOverlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[#ffe0b2] via-[#ffcc80] to-[#fff9e6] z-10 pointer-events-none"
      ></div>

      {/* --- CONTINUOUS WIND LINES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (windLinesRef.current[i] = el)}
            className="absolute w-[110vw] h-[1.5px] rounded-full opacity-0"
            style={{
              top: `${15 + i * 8}%`,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              filter: 'blur(1px)',
            }}
          ></div>
        ))}
      </div>

      {/* --- REALISTIC MAPLE LEAVES --- */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(45)].map((_, i) => {
          const colors = [
            '#d84315', // Deep red
            '#e64a19', // Red-orange
            '#f4511e', // Orange
            '#ff6f00', // Amber
            '#ffab00', // Golden
            '#8d6e63', // Brown
          ];
          const color = colors[i % colors.length];
          
          return (
            <svg
              key={i}
              ref={(el) => (leavesRef.current[i] = el)}
              width="28"
              height="28"
              viewBox="0 0 28 28"
              className="absolute opacity-0"
              style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' }}
            >
              {/* Maple leaf shape */}
              <path
                d="M14 2 L16 8 L20 6 L18 12 L24 14 L18 16 L20 22 L16 20 L14 26 L12 20 L8 22 L10 16 L4 14 L10 12 L8 6 L12 8 Z"
                fill={color}
                opacity="0.9"
              />
              <path
                d="M14 2 L16 8 L20 6 L18 12 L24 14 L18 16 L20 22 L16 20 L14 26 L12 20 L8 22 L10 16 L4 14 L10 12 L8 6 L12 8 Z"
                fill="rgba(0,0,0,0.1)"
                transform="translate(1, 1)"
              />
              {/* Veins */}
              <line x1="14" y1="6" x2="14" y2="22" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
              <line x1="14" y1="14" x2="8" y2="10" stroke="rgba(0,0,0,0.15)" strokeWidth="0.4"/>
              <line x1="14" y1="14" x2="20" y2="10" stroke="rgba(0,0,0,0.15)" strokeWidth="0.4"/>
            </svg>
          );
        })}
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-black mb-6 opacity-0"
          style={{
            background: 'linear-gradient(135deg, #d84315 0%, #ff6f00 50%, #ffab00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 5px 20px rgba(216, 67, 21, 0.2)',
          }}
        >
          MAPLE DANCE
        </h1>

        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-brown-900/70 mb-16 max-w-3xl font-light tracking-wide opacity-0"
        >
          Crimson leaves descend • A gentle waltz of transformation
        </p>

        <div
          ref={cardRef}
          className="relative p-10 bg-white/50 backdrop-blur-md rounded-[2rem] shadow-[0_12px_50px_rgba(216,67,21,0.18)] border border-orange-300/40 max-w-2xl opacity-0"
        >
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
            Autumn arrives with quiet elegance—maple leaves spiral downward in a graceful ballet, 
            painting the world in warm amber and crimson. Change flows like a gentle river.
          </p>
        </div>
      </div>

      {/* --- SOFT VIGNETTE --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(141, 110, 99, 0.25) 100%)',
        }}
      ></div>
    </div>
  );
};

export default AutumnSection;
