import React, { useState } from "react";

const GlitchMenu = ({ onClick, isOpen }) =>{
  //const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     // Add your menu opening logic here (e.g., set a global state)
//   };

  return (
    <>
      {/* INJECTING CUSTOM KEYFRAMES FOR THE GLITCH */}
      <style>{`
        @keyframes glitch-anim-1 {
          0% { transform: scaleX(1); opacity: 1; }
          10% { transform: scaleX(0.8); opacity: 0.8; }
          20% { transform: scaleX(1); opacity: 1; }
          40% { transform: scaleX(1); opacity: 1; }
          50% { transform: scaleX(0.6); opacity: 0.5; }
          60% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes glitch-anim-2 {
          0% { transform: translateX(0); }
          30% { transform: translateX(0); }
          35% { transform: translateX(4px); }
          40% { transform: translateX(-2px); }
          45% { transform: translateX(0); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* BUTTON CONTAINER 
          fixed: Keeps it on screen.
          top-8 right-8: Positioned top right (adjust spacing as needed).
          z-[60]: Higher than the navbar (z-50) so it's always clickable.
      */}
      <button
        onClick={onClick}
        className="fixed top-8 right-8 z-[60] group flex flex-col items-end gap-[6px] p-2 cursor-pointer focus:outline-none"
      >
        
        {/* BAR 1: Top Bar */}
        <span
          className={`h-[4px] bg-[#FF007A] transition-colors duration-0
                     ${isOpen ? "w-8 rotate-45 translate-y-[10px]" : "w-10"}
                     group-hover:bg-[#F0F600] group-hover:shadow-[0_0_8px_#F0F600]
                     /* Apply Glitch Animation 1 */
                     [animation:glitch-anim-1_3s_infinite_linear_alternate]`}
        ></span>

        {/* BAR 2: Middle Bar (The shortest one) */}
        <span
          className={`h-[4px] bg-[#FF007A] transition-all duration-0
                     ${isOpen ? "w-0 opacity-0" : "w-7"}
                     group-hover:bg-[#00F3FF] group-hover:shadow-[0_0_8px_#00F3FF]
                     /* Apply Glitch Animation 2 (Lateral Shift) */
                     [animation:glitch-anim-2_2.5s_infinite_steps(2)_reverse]`}
        ></span>

        {/* BAR 3: Bottom Bar */}
        <span
          className={`h-[4px] bg-[#FF007A] transition-colors duration-0
                     ${isOpen ? "w-8 -rotate-45 -translate-y-[10px]" : "w-10"}
                     group-hover:bg-[#F0F600] group-hover:shadow-[0_0_8px_#F0F600]
                     /* Apply Glitch Animation 1 with a slight delay */
                     [animation:glitch-anim-1_4s_infinite_linear_alternate-reverse]`}
        ></span>
        
        {/* OPTIONAL: "MENU" TEXT LABEL (Cyberpunk Style) */}
        <span className="text-[10px] font-['Orbitron'] tracking-widest text-[#FF007A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-4 right-1 shadow-black drop-shadow-sm">
          MENU
        </span>
      </button>
    </>
  );
};

export default GlitchMenu;