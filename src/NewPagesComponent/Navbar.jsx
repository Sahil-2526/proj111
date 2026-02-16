import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    // Entrance animation for the whole bar
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.5 }
    );

    // Staggered entrance for the buttons
    gsap.fromTo(linksRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 1 }
    );
  }, []);

  const navItems = ['HOME', 'ABOUT', 'EVENT', 'PEOPLE', 'SPONSORS'];

  return (
    <nav 
      ref={navRef}
      // Fixed to the absolute top, left, and right with no gaps
      className="fixed top-10 left-0 right-0 z-50 w-full"
    >
      <div className="bg-black/90 backdrop-blur-md border-b border-white/10 py-5 flex justify-center items-center gap-8 md:gap-16">
        {navItems.map((item, index) => (
          <button
            key={item}
            ref={(el) => (linksRef.current[index] = el)}
            className="font-oswald text-white hover:text-yellow-500 transition-colors duration-300 text-sm md:text-base tracking-widest flex items-center gap-2 group uppercase"
          >
            {/* Minimalist yellow indicator for the Black Clover vibe */}
            <span className="w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-4"></span>
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;