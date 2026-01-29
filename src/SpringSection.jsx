import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SpringSection = () => {
  const sectionRef = useRef(null);
  const fadeOverlayRef = useRef(null);
  const blobsRef = useRef([]);
  const petalsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);
  const decorLineLeftRef = useRef(null);
  const decorLineRightRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. DRAMATIC FADE TRANSITION ---
      gsap.fromTo(
        fadeOverlayRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // --- 2. CONTINUOUS BLOB ANIMATION ---
      blobsRef.current.forEach((blob, index) => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(blob, {
          borderRadius: "45% 55% 60% 40% / 55% 45% 40% 60%",
          duration: 6,
          ease: "sine.inOut",
        })
        .to(blob, {
          borderRadius: "55% 45% 50% 50% / 60% 40% 55% 45%",
          duration: 6,
          ease: "sine.inOut",
        })
        .to(blob, {
          borderRadius: "50% 50% 45% 55% / 45% 55% 60% 40%",
          duration: 6,
          ease: "sine.inOut",
        });

        gsap.to(blob, {
          scale: 1.12,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 1,
        });

        gsap.to(blob, {
          x: `+=${gsap.utils.random(-40, 40)}`,
          y: `+=${gsap.utils.random(-30, 30)}`,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      });

      // --- 3. CONTINUOUS CHERRY BLOSSOM PETALS ---
      petalsRef.current.forEach((petal, index) => {
        const startX = gsap.utils.random(-100, window.innerWidth + 100);
        const startY = gsap.utils.random(-200, -50);
        
        gsap.set(petal, {
          x: startX,
          y: startY,
          rotation: gsap.utils.random(0, 360),
          scale: gsap.utils.random(0.7, 1.6),
          opacity: 0,
        });

        const fallAnimation = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 12) });
        
        fallAnimation.to(petal, {
          opacity: gsap.utils.random(0.7, 1),
          duration: 1,
          ease: "power1.in",
        });
        
        fallAnimation.to(petal, {
          y: window.innerHeight + 150,
          x: `+=${gsap.utils.random(-400, 400)}`,
          rotation: `+=${gsap.utils.random(360, 1080)}`,
          duration: gsap.utils.random(15, 25),
          ease: "sine.inOut",
        }, "-=0.5");
        
        fallAnimation.to(petal, {
          opacity: 0,
          duration: 2,
          ease: "power1.out",
        }, "-=3");
        
        fallAnimation.set(petal, {
          y: gsap.utils.random(-200, -50),
          x: gsap.utils.random(-100, window.innerWidth + 100),
          rotation: gsap.utils.random(0, 360),
        });

        gsap.to(petal, {
          x: `+=${gsap.utils.random(-150, 150)}`,
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 3),
        });
      });

      // --- 4. DELAYED TEXT ANIMATIONS ---
      
      gsap.fromTo(
        decorLineLeftRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        decorLineRightRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { 
          x: -200, 
          opacity: 0, 
          scale: 0.7,
          rotationY: -30,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { 
          x: 200, 
          opacity: 0,
          filter: "blur(15px)",
        },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          delay: 1.0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { 
          scale: 0.5, 
          opacity: 0, 
          y: 100,
          rotationX: 45,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.6,
          ease: "back.out(2)",
          delay: 1.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(cardRef.current, {
        boxShadow: "0 15px 60px rgba(236, 64, 122, 0.25)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* --- BASE BACKGROUND --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fce4ec] via-[#f8bbd0] to-[#f48fb1] -z-10"></div>

      {/* --- FADE OVERLAY --- */}
      <div
        ref={fadeOverlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#2e1a3e] to-[#1a0b2e] z-10 pointer-events-none"
      ></div>

      {/* --- ORGANIC BLOBS --- */}
      <div className="absolute inset-0 z-0">
        <div
          ref={(el) => (blobsRef.current[0] = el)}
          className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#f8bbd0]/50 via-[#f06292]/30 to-transparent blur-[100px]"
        ></div>
        <div
          ref={(el) => (blobsRef.current[1] = el)}
          className="absolute top-[50%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ffccbc]/60 via-[#ff8a65]/40 to-transparent blur-[110px]"
        ></div>
        <div
          ref={(el) => (blobsRef.current[2] = el)}
          className="absolute bottom-[5%] left-[40%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#e1bee7]/55 via-[#ce93d8]/35 to-transparent blur-[95px]"
        ></div>
      </div>

      {/* --- ULTRA-REALISTIC CHERRY BLOSSOMS --- */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <svg
            key={i}
            ref={(el) => (petalsRef.current[i] = el)}
            width="50"
            height="50"
            viewBox="0 0 200 200"
            className="absolute"
            style={{ 
              filter: 'drop-shadow(0 4px 8px rgba(244, 143, 177, 0.4)) drop-shadow(0 2px 3px rgba(255, 182, 193, 0.3))',
              willChange: 'transform, opacity',
            }}
          >
            <defs>
              {/* Multi-stop gradient for realistic color */}
              <radialGradient id={`mainGrad${i}`} cx="50%" cy="70%" r="65%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#ffe8f5" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#ffd6ec" stopOpacity="0.92" />
                <stop offset="75%" stopColor="#ffc1e3" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#ffb3d9" stopOpacity="0.8" />
              </radialGradient>

              {/* Base pink gradient */}
              <radialGradient id={`baseGrad${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f48fb1" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#f8bbd0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              {/* Petal vein gradient */}
              <linearGradient id={`veinGrad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f48fb1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f06292" stopOpacity="0.1" />
              </linearGradient>

              {/* Edge shine */}
              <linearGradient id={`edgeShine${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>

              {/* Inner shadow for depth */}
              <filter id={`innerShadow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="2" result="offsetblur"/>
                <feFlood floodColor="#f06292" floodOpacity="0.15"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Soft glow */}
              <filter id={`softGlow${i}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Five authentic cherry blossom petals */}
            {[0, 72, 144, 216, 288].map((angle, petalIdx) => (
              <g key={petalIdx} transform={`rotate(${angle} 100 100)`}>
                {/* Petal base shadow */}
                <ellipse
                  cx="100"
                  cy="120"
                  rx="18"
                  ry="12"
                  fill="rgba(236, 64, 122, 0.12)"
                  transform="translate(1, 2)"
                  filter="blur(3px)"
                />

                {/* Main petal body with authentic shape */}
                <path
                  d="M 100 100
                     C 90 90, 85 70, 88 50
                     C 90 35, 95 25, 97 20
                     C 98 17, 99 15, 99.5 13
                     L 98 11
                     C 98.5 10, 99 9.5, 99.5 9
                     C 99.7 8.7, 99.9 8.5, 100 8.5
                     C 100.1 8.5, 100.3 8.7, 100.5 9
                     C 101 9.5, 101.5 10, 102 11
                     L 100.5 13
                     C 101 15, 102 17, 103 20
                     C 105 25, 110 35, 112 50
                     C 115 70, 110 90, 100 100 Z"
                  fill={`url(#mainGrad${i})`}
                  filter={`url(#innerShadow${i})`}
                  opacity="0.92"
                />

                {/* Petal shine/highlight along edge */}
                <path
                  d="M 100 100 C 92 88, 87 68, 89 50 C 90.5 38, 94 28, 96 22"
                  fill="none"
                  stroke={`url(#edgeShine${i})`}
                  strokeWidth="2"
                  opacity="0.7"
                />

                {/* Opposite edge highlight */}
                <path
                  d="M 100 100 C 108 88, 113 68, 111 50 C 109.5 38, 106 28, 104 22"
                  fill="none"
                  stroke={`url(#edgeShine${i})`}
                  strokeWidth="2"
                  opacity="0.6"
                />

                {/* Central vein (primary) */}
                <line
                  x1="100" y1="100"
                  x2="100" y2="15"
                  stroke={`url(#veinGrad${i})`}
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.5"
                />

                {/* Branch veins (left side) */}
                <path
                  d="M 100 70 Q 94 60, 92 48"
                  fill="none"
                  stroke="rgba(236, 64, 122, 0.15)"
                  strokeWidth="0.6"
                />
                <path
                  d="M 100 55 Q 96 48, 95 38"
                  fill="none"
                  stroke="rgba(236, 64, 122, 0.12)"
                  strokeWidth="0.5"
                />
                <path
                  d="M 100 40 Q 97 35, 96 28"
                  fill="none"
                  stroke="rgba(236, 64, 122, 0.1)"
                  strokeWidth="0.4"
                />

                {/* Branch veins (right side) */}
                <path
                  d="M 100 70 Q 106 60, 108 48"
                  fill="none"
                  stroke="rgba(236, 64, 122, 0.15)"
                  strokeWidth="0.6"
                />
                <path
                  d="M 100 55 Q 104 48, 105 38"
                  fill="none"
                  stroke="rgba(236, 64, 122, 0.12)"
                  strokeWidth="0.5"
                />
                <path
                  d="M 100 40 Q 103 35, 104 28"
                  fill="none"
                  stroke="rgba(236, 64, 122, 0.1)"
                  strokeWidth="0.4"
                />

                {/* Characteristic notch at petal tip */}
                <path
                  d="M 98.5 11 Q 99.5 9.5, 100 8.5 Q 100.5 9.5, 101.5 11"
                  fill="rgba(255, 182, 193, 0.4)"
                  stroke="rgba(244, 143, 177, 0.3)"
                  strokeWidth="0.5"
                />

                {/* Delicate tip detail */}
                <circle
                  cx="100"
                  cy="10"
                  r="1.5"
                  fill="rgba(255, 192, 203, 0.5)"
                />

                {/* Petal texture (subtle spots) */}
                <circle cx="95" cy="50" r="1" fill="rgba(255, 182, 193, 0.2)"/>
                <circle cx="105" cy="45" r="0.8" fill="rgba(255, 182, 193, 0.15)"/>
                <circle cx="98" cy="35" r="0.7" fill="rgba(255, 182, 193, 0.18)"/>
              </g>
            ))}

            {/* Flower center base */}
            <circle
              cx="100"
              cy="100"
              r="18"
              fill={`url(#baseGrad${i})`}
            />

            {/* Receptacle (green center base) */}
            <circle
              cx="100"
              cy="100"
              r="10"
              fill="rgba(139, 195, 74, 0.3)"
              stroke="rgba(104, 159, 56, 0.2)"
              strokeWidth="0.5"
            />

            {/* Stamen cluster (authentic arrangement) */}
            <g filter={`url(#softGlow${i})`}>
              {/* Long stamen with anthers */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
                const length = 8 + Math.random() * 4;
                const x = 100 + length * Math.cos(angle * Math.PI / 180);
                const y = 100 + length * Math.sin(angle * Math.PI / 180);
                return (
                  <g key={idx}>
                    {/* Stamen filament */}
                    <line
                      x1="100"
                      y1="100"
                      x2={x}
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.6)"
                      strokeWidth="0.5"
                    />
                    {/* Anther (pollen sac) */}
                    <ellipse
                      cx={x}
                      cy={y}
                      rx="1.2"
                      ry="1.8"
                      fill="#fff59d"
                      opacity="0.9"
                      transform={`rotate(${angle} ${x} ${y})`}
                    />
                    {/* Pollen grains */}
                    <circle
                      cx={x}
                      cy={y}
                      r="0.4"
                      fill="#ffeb3b"
                      opacity="0.8"
                    />
                  </g>
                );
              })}

              {/* Central pistil */}
              <circle
                cx="100"
                cy="100"
                r="4"
                fill="#ec407a"
                opacity="0.7"
              />
              <circle
                cx="100"
                cy="100"
                r="3"
                fill="#f48fb1"
                opacity="0.8"
              />
              <circle
                cx="99"
                cy="99"
                r="1.5"
                fill="#ffffff"
                opacity="0.9"
              />
            </g>

            {/* Outer subtle glow */}
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        ))}
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center">
        <div className="flex items-center gap-6 mb-8">
          <div
            ref={decorLineLeftRef}
            className="w-24 h-[2px] bg-gradient-to-r from-transparent to-pink-400 origin-left opacity-0"
            style={{ boxShadow: '0 0 10px rgba(236, 64, 122, 0.4)' }}
          ></div>
          <div className="w-3 h-3 rounded-full bg-pink-400" style={{ boxShadow: '0 0 15px rgba(236, 64, 122, 0.6)' }}></div>
          <div
            ref={decorLineRightRef}
            className="w-24 h-[2px] bg-gradient-to-l from-transparent to-pink-400 origin-right opacity-0"
            style={{ boxShadow: '0 0 10px rgba(236, 64, 122, 0.4)' }}
          ></div>
        </div>

        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-black mb-6 opacity-0"
          style={{
            background: 'linear-gradient(135deg, #ec407a 0%, #f06292 50%, #f8bbd0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 8px 30px rgba(236, 64, 122, 0.3)',
            perspective: '1000px',
          }}
        >
          CHERRY BLOOM
        </h1>

        <p
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-pink-900/80 mb-16 max-w-3xl font-light tracking-wide opacity-0"
          style={{
            textShadow: '0 2px 10px rgba(236, 64, 122, 0.1)',
          }}
        >
          Delicate petals drift • A symphony of spring awakening
        </p>

        <div
          ref={cardRef}
          className="relative p-10 bg-white/60 backdrop-blur-md rounded-[2rem] border border-pink-200/40 max-w-2xl opacity-0"
          style={{
            boxShadow: '0 10px 50px rgba(236, 64, 122, 0.15)',
            perspective: '1000px',
          }}
        >
          <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-pink-300 rounded-tl-lg"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-pink-300 rounded-br-lg"></div>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Spring whispers softly through the air—cherry blossoms dance on gentle winds, 
            each petal a fleeting moment of beauty. Nature awakens with quiet grace.
          </p>
        </div>
      </div>

      {/* --- SOFT LIGHT GRADIENT --- */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.5) 0%, transparent 60%)',
        }}
      ></div>

      {/* --- FLOATING PARTICLES --- */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-pink-300/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: '0 0 8px rgba(236, 64, 122, 0.5)',
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default SpringSection;
