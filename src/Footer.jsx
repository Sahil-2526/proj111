import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    // Wrapper takes full screen height, but is transparent to show what's behind
    <div className="relative w-full h-screen flex flex-col justify-end bg-transparent">
      
      {/* Black overlay covering the upper area (50% opacity) */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* --- FOOTER START (Takes up exactly bottom half of the page) --- */}
      <footer className="relative w-full bg-[#3586ff] h-[50vh] px-[20px] py-[50px] flex flex-col justify-center items-center">
        
        {/* WAVE ANIMATION LAYER */}
        <div className="absolute top-[-100px] left-0 w-full h-[100px] overflow-hidden leading-[0]">
          {/* Wave 1 - Front */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://i.imgur.com/ZAts69f.png')] bg-[length:1000px_100px] animate-wave1 opacity-100 z-[10]" />
          {/* Wave 2 - Middle */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://i.imgur.com/ZAts69f.png')] bg-[length:1000px_100px] animate-wave2 opacity-50 z-[9]" />
          {/* Wave 3 - Back */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://i.imgur.com/ZAts69f.png')] bg-[length:1000px_100px] animate-wave3 opacity-20 z-[8]" />
          {/* Wave 4 - Deep */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://i.imgur.com/ZAts69f.png')] bg-[length:1000px_100px] animate-wave4 opacity-70 z-[7]" />
        </div>

        {/* FOOTER CONTENT */}
        
        {/* 1. Social Icons */}
        <ul className="relative flex justify-center items-center gap-[10px] my-[10px] flex-wrap z-20">
          {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
            <li key={i} className="list-none">
              <a 
                href="#" 
                className="text-white text-[2rem] mx-[10px] inline-block transition-transform duration-500 hover:-translate-y-[10px]"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>

        {/* 2. Menu Links */}
        <ul className="relative flex justify-center items-center gap-[10px] my-[20px] flex-wrap z-20">
          {['Home', 'About', 'Services', 'Team', 'Contact'].map((item, i) => (
            <li key={i} className="list-none mx-[10px]">
              <a 
                href="#" 
                className="text-white text-[1.1rem] md:text-[1.2rem] font-[300] no-underline opacity-75 hover:opacity-100 transition-opacity duration-300 inline-block"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* 3. Copyright */}
        <p className="text-white font-[300] text-[0.9rem] md:text-[1rem] mt-[15px] mb-[10px] opacity-75 text-center z-20">
          &copy;2026 Sahil | All Rights Reserved
        </p>
      </footer>

      {/* --- CSS ANIMATIONS --- */}
      <style jsx="true">{`
        @keyframes wave {
          0% { background-position-x: 1000px; }
          100% { background-position-x: 0px; }
        }

        @keyframes wave-reverse {
          0% { background-position-x: 0px; }
          100% { background-position-x: 1000px; }
        }

        .animate-wave1 { animation: wave 4s linear infinite; bottom: 0; }
        .animate-wave2 { animation: wave-reverse 4s linear infinite; bottom: 10px; }
        .animate-wave3 { animation: wave 3s linear infinite; bottom: 15px; }
        .animate-wave4 { animation: wave-reverse 3s linear infinite; bottom: 20px; }
      `}</style>
    </div>
  );
};

export default Footer;