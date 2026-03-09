"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Share2, Info } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("process");

  const navLinks = [
    { id: "process", label: "Process" },
    { id: "regional-demographics", label: "Regional Demographics" },
    { id: "Overall Regional IPD", label: "Overall Regional IPD" },
    { id: "conclusion", label: "Conclusion" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setPastHero(window.scrollY > window.innerHeight - 100);

      // Determine active section based on scroll position
      const sections = navLinks.map(link => document.getElementById(link.id));
      let current = "";
      
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust threshold so active class updates correctly as we scroll
          if (rect.top <= 200 && rect.bottom >= 100) {
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

  const scrollToSection = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 120; // Height of both headers approx
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
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm border-gray-200 shadow-sm text-gray-900" 
          : "bg-white border-transparent text-gray-900"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-24'}`}>
        <div className="flex items-center gap-4">
           <Image src="/images/Logo.png" alt="Michiana StoryMap Logo" width={600} height={200} className={`w-auto transition-all duration-300 ${scrolled ? 'h-10' : 'h-14'}`} />
           <div className="h-8 border-l-2 border-gray-300 hidden md:block"></div>
           <span className="font-heading font-bold text-xl tracking-tight text-[#0f343a] hidden md:block">
             TCAMPO Area
           </span>
        </div>
        
        <div className="flex flex-row items-center gap-6">
           <button 
             onClick={() => window.print()}
             className="hidden sm:flex items-center gap-2 hover:opacity-75 transition-opacity font-heading text-sm font-medium"
           >
             <Share2 size={16} />
             Share
           </button>
           <button className="hidden sm:flex items-center gap-2 hover:opacity-75 transition-opacity font-heading text-sm font-medium">
             <Info size={16} />
             About
           </button>
           <button className="hover:opacity-75 transition-opacity sm:ml-4">
              <Menu size={24} />
           </button>
        </div>
      </div>

      {/* Secondary Nav Bar */}
      <div 
        className={`w-full bg-[#f8f9fa] border-t border-gray-200 transition-all duration-300 overflow-hidden flex justify-center shadow-md ${
          pastHero ? "h-[60px] opacity-100" : "h-0 opacity-0 border-transparent"
        }`}
      >
        <nav className="flex items-center gap-8 px-6 overflow-x-auto h-full max-w-7xl w-full justify-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(link.id, e)}
              className={`h-full flex items-center text-[17px] font-body transition-colors whitespace-nowrap px-1 border-b-[3px] ${
                activeSection === link.id
                  ? "border-arcgis-teal text-arcgis-teal font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
