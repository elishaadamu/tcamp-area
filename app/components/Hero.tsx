"use client";

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function Hero() {

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-arcgis-teal">
        <Image
          src="/images/hero.png"
          alt="Aerial dark landscape"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-black/30 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center pt-24 px-6 text-white max-w-4xl">
         <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-6 text-shadow text-white drop-shadow-xl">
            Michiana Regional Overview
         </h1>
         <p className="text-xl md:text-3xl font-body italic opacity-95 text-shadow drop-shadow-lg max-w-2xl mx-auto">
            A scrollytelling journey through our changing landscape, infrastructure, and communities.
         </p>
         <div className="mt-16 text-sm uppercase tracking-[0.2em] font-heading font-semibold opacity-90 mb-12">
            Published &bull; March 2026
         </div>
      </div>

      {/* Down Arrow */}
      <button 
        onClick={() => {
          const el = document.getElementById("methodology");
          if (el) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }}
        className="absolute bottom-10 border border-white rounded-full p-4 left-1/2 -translate-x-1/2 z-20 animate-pulse hover:opacity-75 transition-opacity cursor-pointer flex items-center justify-center"
        aria-label="Scroll down to methodology"
      >
        <ArrowDown size={40} className="text-white drop-shadow-md opacity-90" />
      </button>
    </div>
  );
}
