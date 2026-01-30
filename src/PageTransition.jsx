import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CircleRevealTransition Component
 * ALL transitions work identically - only origin position changes
 * Same animation as 4th transition (bottom-left) applied to all positions
 */
const CircleRevealTransition = ({ 
  color1, 
  color2, 
  triggerRef, 
  currentSectionRef,
  nextSectionRef,
  originPosition = "center",
  isDual = false,
  dualOrigins = null,
  delay = 0.25
}) => {
  const containerRef = useRef(null);
  const nextPageOverlayRef = useRef(null);
  const outerRingRef = useRef(null);
  
  const outerCircleRef = useRef(null);
  const innerCircleRef = useRef(null);
  const circles1Ref = useRef({ outer: null, inner: null });
  const circles2Ref = useRef({ outer: null, inner: null });

  const [outerSize, setOuterSize] = useState(0);
  const [innerSize, setInnerSize] = useState(0);
  const [circlePos, setCirclePos] = useState({ x: 50, y: 50 });
  
  const [outer2Size, setOuter2Size] = useState(0);
  const [inner2Size, setInner2Size] = useState(0);
  const [circle2Pos, setCircle2Pos] = useState({ x: 50, y: 50 });

  const [nextPageContent, setNextPageContent] = useState("");

  // Convert position name to coordinates
  const getOriginCoordinates = (position) => {
    const positions = {
      "top-left": { x: 5, y: 5 },
      "bottom-right": { x: 95, y: 95 },
      "top-right": { x: 95, y: 5 },
      "bottom-left": { x: 5, y: 95 },
      "center": { x: 50, y: 50 },
    };
    return positions[position] || positions.center;
  };

  // Update content when next section changes
  useEffect(() => {
    if (nextSectionRef?.current) {
      setNextPageContent(nextSectionRef.current.innerHTML);
    }
  }, [nextSectionRef, nextSectionRef?.current]);

  useEffect(() => {
    if (!triggerRef?.current || !nextSectionRef?.current || !currentSectionRef?.current) return;

    const ctx = gsap.context(() => {
      const maxSizePx = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 3;
      const maxSizeVw = (maxSizePx / window.innerWidth) * 100;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            if (progress > 0 && progress < 1) {
              // Update content every frame
              if (nextSectionRef?.current) {
                setNextPageContent(nextSectionRef.current.innerHTML);
              }
              
              gsap.set(containerRef.current, { display: "block" });
              gsap.set(nextPageOverlayRef.current, { display: "block" });
              gsap.set(outerRingRef.current, { display: "block" });
              gsap.set(nextSectionRef.current, { opacity: 1, zIndex: 5 });
              gsap.set(currentSectionRef.current, { opacity: 1, zIndex: 10 });
            }
            
            if (progress > 0.7) {
              const fadeProgress = (progress - 0.7) / 0.3;
              gsap.set(currentSectionRef.current, { opacity: 1 - fadeProgress });
            }
          },
          onLeave: () => {
            gsap.set(currentSectionRef.current, { opacity: 0, zIndex: 1 });
            gsap.set(nextSectionRef.current, { opacity: 1, zIndex: 10 });
            gsap.set(containerRef.current, { display: "none" });
            gsap.set(nextPageOverlayRef.current, { display: "none" });
            gsap.set(outerRingRef.current, { display: "none" });
          },
          onEnterBack: () => {
            if (nextSectionRef?.current) {
              setNextPageContent(nextSectionRef.current.innerHTML);
            }
            
            gsap.set(containerRef.current, { display: "block" });
            gsap.set(nextPageOverlayRef.current, { display: "block" });
            gsap.set(outerRingRef.current, { display: "block" });
            gsap.set(currentSectionRef.current, { opacity: 1, zIndex: 10 });
            gsap.set(nextSectionRef.current, { opacity: 1, zIndex: 5 });
          },
          onLeaveBack: () => {
            gsap.set(nextSectionRef.current, { opacity: 0, zIndex: 1 });
            gsap.set(currentSectionRef.current, { opacity: 1, zIndex: 10 });
            gsap.set(containerRef.current, { display: "none" });
            gsap.set(nextPageOverlayRef.current, { display: "none" });
            gsap.set(outerRingRef.current, { display: "none" });
          },
        },
      });

      // DUAL MODE - Two circles
      if (isDual && dualOrigins && dualOrigins.length === 2) {
        const origin1 = { x: parseFloat(dualOrigins[0].x), y: parseFloat(dualOrigins[0].y) };
        const origin2 = { x: parseFloat(dualOrigins[1].x), y: parseFloat(dualOrigins[1].y) };

        setCirclePos(origin1);
        setCircle2Pos(origin2);

        // Outer circles animation
        tl.to({}, {
          duration: 1,
          ease: "power1.inOut",
          onUpdate: function() {
            const progress = this.progress();
            const size = progress * maxSizeVw;
            setOuterSize(size);
            setOuter2Size(size);
          }
        }, 0);

        // Inner circles animation (delayed)
        tl.to({}, {
          duration: 1,
          ease: "power1.inOut",
          onUpdate: function() {
            const progress = this.progress();
            const size = progress * maxSizeVw;
            setInnerSize(size);
            setInner2Size(size);
          }
        }, delay);

        gsap.set([circles1Ref.current.outer, circles1Ref.current.inner], {
          left: `${origin1.x}%`,
          top: `${origin1.y}%`,
          xPercent: -50,
          yPercent: -50,
        });

        gsap.set([circles2Ref.current.outer, circles2Ref.current.inner], {
          left: `${origin2.x}%`,
          top: `${origin2.y}%`,
          xPercent: -50,
          yPercent: -50,
        });

        tl.fromTo(
          circles1Ref.current.outer,
          { width: 0, height: 0 },
          { width: maxSizePx, height: maxSizePx, duration: 1, ease: "power1.inOut" },
          0
        )
        .fromTo(
          circles1Ref.current.inner,
          { width: 0, height: 0 },
          { width: maxSizePx, height: maxSizePx, duration: 1, ease: "power1.inOut" },
          delay
        )
        .fromTo(
          circles2Ref.current.outer,
          { width: 0, height: 0 },
          { width: maxSizePx, height: maxSizePx, duration: 1, ease: "power1.inOut" },
          0
        )
        .fromTo(
          circles2Ref.current.inner,
          { width: 0, height: 0 },
          { width: maxSizePx, height: maxSizePx, duration: 1, ease: "power1.inOut" },
          delay
        );

      } 
      // SINGLE MODE - One circle (SAME AS 4TH TRANSITION)
      else {
        const origin = getOriginCoordinates(originPosition);
        setCirclePos(origin);

        // Outer circle animation (starts immediately)
        tl.to({}, {
          duration: 1,
          ease: "power1.inOut",
          onUpdate: function() {
            const progress = this.progress();
            setOuterSize(progress * maxSizeVw);
          }
        }, 0);

        // Inner circle animation (delayed - creates gap)
        tl.to({}, {
          duration: 1,
          ease: "power1.inOut",
          onUpdate: function() {
            const progress = this.progress();
            setInnerSize(progress * maxSizeVw);
          }
        }, delay);

        gsap.set([outerCircleRef.current, innerCircleRef.current], {
          left: `${origin.x}%`,
          top: `${origin.y}%`,
          xPercent: -50,
          yPercent: -50,
        });

        tl.fromTo(
          outerCircleRef.current,
          { width: 0, height: 0 },
          { width: maxSizePx, height: maxSizePx, duration: 1, ease: "power1.inOut" },
          0
        )
        .fromTo(
          innerCircleRef.current,
          { width: 0, height: 0 },
          { width: maxSizePx, height: maxSizePx, duration: 1, ease: "power1.inOut" },
          delay
        );
      }
    });

    return () => ctx.revert();
  }, [triggerRef, currentSectionRef, nextSectionRef, originPosition, isDual, dualOrigins, delay]);

  // Generate clip-path for outer circle(s)
  const getOuterClipPath = () => {
    if (isDual) {
      return `circle(${outerSize}vw at ${circlePos.x}% ${circlePos.y}%), circle(${outer2Size}vw at ${circle2Pos.x}% ${circle2Pos.y}%)`;
    }
    return `circle(${outerSize}vw at ${circlePos.x}% ${circlePos.y}%)`;
  };

  // Generate clip-path for inner circle(s)
  const getInnerClipPath = () => {
    if (isDual) {
      return `circle(${innerSize}vw at ${circlePos.x}% ${circlePos.y}%), circle(${inner2Size}vw at ${circle2Pos.x}% ${circle2Pos.y}%)`;
    }
    return `circle(${innerSize}vw at ${circlePos.x}% ${circlePos.y}%)`;
  };

  return (
    <>
      {/* OUTER RING - Blurred preview (SAME AS 4TH) */}
      <div
        ref={outerRingRef}
        className="fixed inset-0 z-[98]"
        style={{
          display: "none",
          clipPath: getOuterClipPath(),
          WebkitClipPath: getOuterClipPath(),
          willChange: "clip-path",
        }}
      >
        <div 
          className="w-full h-full"
          style={{
            filter: "blur(8px) brightness(0.7)",
            opacity: 0.6,
          }}
          dangerouslySetInnerHTML={{ __html: nextPageContent }}
        />
      </div>

      {/* INNER CIRCLE - Clear content (SAME AS 4TH) */}
      <div
        ref={nextPageOverlayRef}
        className="fixed inset-0 z-[99]"
        style={{
          display: "none",
          clipPath: getInnerClipPath(),
          WebkitClipPath: getInnerClipPath(),
          willChange: "clip-path",
        }}
      >
        <div 
          className="w-full h-full"
          key={nextPageContent}
          dangerouslySetInnerHTML={{ __html: nextPageContent }}
        />
      </div>

      {/* BORDER CIRCLES (SAME AS 4TH) */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{ display: "none" }}
      >
        {isDual && dualOrigins ? (
          <>
            <div
              ref={(el) => (circles1Ref.current.outer = el)}
              className="absolute rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                border: `5px solid ${color1}`,
                backgroundColor: "transparent",
                boxShadow: `0 0 40px rgba(0,0,0,0.3)`,
                willChange: "width, height",
              }}
            />
            <div
              ref={(el) => (circles1Ref.current.inner = el)}
              className="absolute rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                border: `3px solid ${color1}`,
                backgroundColor: "transparent",
                boxShadow: `inset 0 0 30px rgba(0,0,0,0.5)`,
                willChange: "width, height",
              }}
            />
            <div
              ref={(el) => (circles2Ref.current.outer = el)}
              className="absolute rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                border: `5px solid ${color1}`,
                backgroundColor: "transparent",
                boxShadow: `0 0 40px rgba(0,0,0,0.3)`,
                willChange: "width, height",
              }}
            />
            <div
              ref={(el) => (circles2Ref.current.inner = el)}
              className="absolute rounded-full"
              style={{ 
                transform: "translate(-50%, -50%)",
                border: `3px solid ${color1}`,
                backgroundColor: "transparent",
                boxShadow: `inset 0 0 30px rgba(0,0,0,0.5)`,
                willChange: "width, height",
              }}
            />
          </>
        ) : (
          <>
            <div
              ref={outerCircleRef}
              className="absolute rounded-full"
              style={{
                transform: "translate(-50%, -50%)",
                border: `6px solid ${color1}`,
                backgroundColor: "transparent",
                boxShadow: `0 0 50px rgba(0,0,0,0.4)`,
                willChange: "width, height",
              }}
            />
            <div
              ref={innerCircleRef}
              className="absolute rounded-full"
              style={{
                transform: "translate(-50%, -50%)",
                border: `4px solid ${color1}`,
                backgroundColor: "transparent",
                boxShadow: `inset 0 0 40px rgba(0,0,0,0.6)`,
                willChange: "width, height",
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default CircleRevealTransition;
