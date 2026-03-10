"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Share2, Info } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("methodology");

  const navLinks = [
    { id: "methodology", label: "Methodology" },
    { id: "demographics", label: "Demographics" },
    { id: "index", label: "Index" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > 300); // Trigger secondary nav earlier

      // Determine active section based on scroll position
      const sections = navLinks.map(link => document.getElementById(link.id));
      let current = "";
      
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust threshold so active class updates correctly as we scroll
          if (rect.top <= 250 && rect.bottom >= 150) {
            current = section.id;
          }
        }
      });
      
      if (current) setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; // Height of both headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Primary Header */}
      <div 
        className={`w-full transition-all duration-300 ${
          scrolled 
            ? "bg-arcgis-dark/95 backdrop-blur-md border-b border-gray-800 py-2 shadow-2xl" 
            : "bg-arcgis-dark py-4"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
             <Image 
               src="/Logo.png" 
               alt="Logo" 
               width={600} 
               height={100} 
               className={`w-auto transition-all duration-300 ${scrolled ? 'h-10' : 'h-16'}`} 
             />
             <div className="h-10 border-l border-gray-700 hidden md:block"></div>
             <span className="font-heading font-black text-2xl tracking-tighter text-white hidden md:block italic">
               
             </span>
          </div>
          
          <div className="flex items-center gap-4">
             <h1 className="text-white font-heading font-bold text-xl md:text-3xl tracking-tight opacity-90">
               TCAMPO Area
             </h1>
          </div>

          <div className="flex flex-row items-center gap-4">
             <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
                <Menu size={24} />
             </button>
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar - Styled like the screenshot tabs */}
      <div 
        className={`w-full bg-[#111827]/90 backdrop-blur-sm border-b border-gray-800 transition-all duration-500 overflow-hidden ${
          pastHero ? "h-[80px] opacity-100 translate-y-0" : "h-0 opacity-0 -translate-y-4"
        }`}
      >
        <nav className="flex items-center gap-3 px-6 h-full max-w-7xl mx-auto justify-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => scrollToSection(link.id, e)}
              className={`px-6 py-2.5 rounded-lg text-sm font-heading font-bold transition-all duration-300 transform ${
                activeSection === link.id
                  ? "bg-accent-yellow text-arcgis-dark shadow-[0_0_15px_rgba(250,204,21,.4)] scale-105"
                  : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
