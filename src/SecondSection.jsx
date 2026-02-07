import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gndm from "./assets/gandam.png";
import eva from "./assets/pokemon.png";

gsap.registerPlugin(ScrollTrigger);

const SecondSection = () => {
  const sectionRef = useRef(null);
  const leftCharacterRef = useRef(null);
  const rightCharacterRef = useRef(null);
  const messageRef = useRef(null);
  

//   useLayoutEffect(() => {
    
//   const ctx = gsap.context(() => {
//     // ✅ NEW: Trigger AFTER 1st transition completes (Page 2 only)
     

//     // --- KEEP YOUR EXISTING ANIMATIONS ---

//     // 2. LEFT CHARACTER SWIPE (your original)
//     gsap.fromTo(leftCharacterRef.current, 
//       { x: "-30%", opacity: 0 }, 
//       {
//         x: 0, 
//         opacity: 1, 
//         rotation: 0,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: 2
//         }
//       }
//     );

//     // RIGHT: from RIGHT side ← FIXED!
//     gsap.fromTo(rightCharacterRef.current, 
//       { x: "30%", opacity: 0 },     // ← +30% = RIGHT side
//       {
//         x: 0, 
//         opacity: 1, 
//         rotation: 0,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: 2
//         }
//       }
//     );


//     // 4. CENTER MESSAGE (your original)
//     gsap.fromTo(messageRef.current, { opacity: 0, scale: 0.8 }, {
//       opacity: 1, scale: 1, y: 0,
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top bottom",
//         end: "senter top",
//         scrub: 1.5,
//       }
//     });

//     // ✅ INITIAL HIDDEN STATE
//     gsap.set([leftCharacterRef.current, rightCharacterRef.current], { opacity: 1 });
//   }, sectionRef);

//   return () => ctx.revert();
// }, []);


  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* --- BACKGROUND LAYER (SPACE) --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0015] via-[#1a0b2e] to-[#0d1b2a] -z-10"></div>
      {/* --- LEFT CHARACTER --- */}
      <div
        ref={leftCharacterRef}
        className="absolute top-0 left-0 h-[200vh] w-[45vw] md:w-[25vw] z-20 pointer-events-none"
      >
        <img
          src={eva}
          alt="Left Character"
          className="w-full md:h-full relative top-10 object-contain object-left-top drop-shadow-[0_0_40px_rgba(255,0,122,0.6)]"
        />
        {/* PLACEHOLDER */}
        <div className="absolute top-10 left-10 w-32 h-[80vh] bg-gradient-to-b from-[#FF007A] to-[#00F3FF] rounded-lg shadow-[0_0_50px_rgba(255,0,122,0.8)] opacity-0 md:opacity-100 "></div>
      </div>

      {/* --- RIGHT CHARACTER --- */}
      <div
        ref={rightCharacterRef}
        className="absolute top-0 md:right-[-12vh] right-[-8vh] h-full w-[75vw] md:w-[45vw] z-20 pointer-events-none"
      >
        <img
          src={gndm}
          alt="Right Character"
          className="w-[100vw] h-full bottom-10 md:bottom-0 object-contain object-right-bottom relative right-0 drop-shadow-[0_0_40px_rgba(0,243,255,0.6)]"
        />
        {/* PLACEHOLDER */}
        <div className="absolute top-10 right-40 w-32 h-[80vh] bg-gradient-to-b from-[#00F3FF] to-[#FF007A] rounded-lg shadow-[0_0_50px_rgba(0,243,255,0.8)]  opacity-0 md:opacity-100  "></div>
      </div>

      {/*...Button..*/}
      <div class="transform skew-x-[-12deg] border-2 bg-[#050b14]/85 h-[5vh] w-[5vw] p-6 relative top-[70vh] left-[15vw]  backdrop-blur-md border border-[#00F3FF]/40 shadow-[0_0_30px_rgba(0,243,255,0.2)] overflow-hidden">
       <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-[#00F3FF]"></div>
          <div className="absolute top-0 right-0 w-10 h-[2px] bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]"></div>
          <div className="absolute top-0 right-0 w-[2px] h-6 bg-[#00F3FF]"></div>
          <div className="absolute bottom-0 left-0 w-10 h-[2px] bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]"></div>
  <div class="transform skew-x-[12deg] text-white flex justify-center items-center">
    Click to see more
  </div>
</div>



      {/* --- CENTER MESSAGE CARD --- */}
      <div
        ref={messageRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 max-w-[90vw] md:w-[50vw] w-[80vw] h-[60vh] opacity-90"
      >
        <div className="relative md:h-[60vh] h-[53vh] p-8 bg-[#050b14]/85 backdrop-blur-md border border-[#00F3FF]/40 shadow-[0_0_30px_rgba(0,243,255,0.2)] overflow-hidden ">
          {/* Decorative Corner Lines */}
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#00F3FF]"></div>
          <div className="absolute top-0 left-0 w-20 h-[2px] bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]"></div>
          <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[#00F3FF]"></div>
          <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]"></div>
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 border-b border-[#00F3FF]/20 pb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#00F3FF] text-[#00F3FF] shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h2 className="text-[#00F3FF] tracking-[0.3em] text-xl md:text-2xl font-bold drop-shadow-[0_0_8px_rgba(0,243,255,0.9)]">
              EVENTS
            </h2>
          </div>

          {/* Message Content */}
          <div className="text-base md:text-lg leading-relaxed text-gray-300 font-mono space-y-4">
            <p className="text-white font-bold text-xl md:text-2xl tracking-wide">
              The journey begins here.
            </p>
            <p className="text-[#00F3FF]/90">
              You have entered the <span className="text-[#FF007A] font-bold">Event Dimension</span>.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Scroll to explore the unknown...
            </p>
          </div>

          {/* Animated Accent Bar */}
          {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F3FF] to-transparent animate-pulse"></div> */}
        </div>
      </div>

      {/* --- AMBIENT EFFECTS --- */}
     {/* --- ALWAYS GLOWING STARS --- */}
<div className="absolute inset-0 pointer-events-none z-5">
  {[...Array(25)].map((_, i) => (
    <div
      key={i}
      className="absolute w-[2px] h-[2px] md:w-1 md:h-1 bg-[#00F3FF] rounded-full shadow-[0_0_10px_#00F3FF] animate-pulse"
      style={{
        top: `${10 + Math.random() * 85}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${1.5 + Math.random() * 2.5}s`,
      }}
    />
  ))}
</div>

    </div>
  );
};

export default SecondSection;
