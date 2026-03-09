"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import MapWidget from "./MapWidget";

export interface SidecarPanel {
  id: string;
  title: string;
  content: string;
  threshold?: string;
  source?: string;
  extraInfo?: string;
  image?: string;
  useMap?: boolean;
}

interface SidecarProps {
  panels: SidecarPanel[];
}

export default function Sidecar({ panels }: SidecarProps) {
  const [activeId, setActiveId] = useState(panels[0]?.id);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeIndex = panels.findIndex((p) => p.id === activeId);
  const displayIndex = activeIndex >= 0 ? activeIndex + 1 : 1;

  return (
    <div ref={containerRef} className="relative flex flex-col md:flex-row-reverse w-full bg-arcgis-gray text-gray-900 border-y border-gray-200 z-10 isolate justify-between">
      {/* Right side: sticky media (First in DOM so text scrolls over it on mobile if absolute) */}
      {/* Using flex-row-reverse puts this first DOM element on the right side on desktop */}
      <div className="hidden md:block w-full md:w-7/12 lg:w-2/3 h-screen sticky top-0 overflow-hidden shadow-inner z-0">
        <AnimatePresence mode="wait">
          {panels.map((panel) => {
            if (activeId !== panel.id) return null;
            return (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-slate-200"
              >
                {panel.useMap ? (
                  <MapWidget />
                ) : panel.image ? (
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mobile background (fixed when active) */}
      <div className="md:hidden fixed top-0 left-0 w-full h-screen -z-10">
         <AnimatePresence mode="wait">
          {panels.map((panel) => {
            if (activeId !== panel.id) return null;
            return (
              <motion.div
                key={panel.id + "-mobile"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
              >
                {panel.useMap ? (
                  <div className="w-full h-full opacity-60 pointer-events-none">
                     <MapWidget />
                  </div>
                ) : panel.image ? (
                  <Image
                    src={panel.image}
                    alt={panel.title}
                    fill
                    className="object-cover opacity-60 grayscale"
                  />
                ) : null}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Left side: scrolling text panels */}
      <div className="w-full md:w-5/12 lg:w-1/3 px-4 md:px-8 lg:px-12 pb-24 space-y-[40vh] z-20 relative mix-blend-normal">
        {/* Padding so the first/last items can be nicely centered without scrolling past */}
        <div className="pt-[20vh] md:pt-[30vh]"></div>
        {panels.map((panel) => (
          <Panel
            key={panel.id}
            panel={panel}
            onBecomeActive={() => setActiveId(panel.id)}
            isActive={panel.id === activeId}
          />
        ))}
        <div className="pb-[40vh]"></div>
      </div>

      {/* Floating Page Indicator */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="page-indicator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-8 left-8 md:bottom-12 md:left-12 z-[100] pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-sm shadow-2xl border-l-[6px] border-arcgis-teal text-arcgis-dark px-6 py-4 rounded-sm flex items-center gap-4">
              <span className="font-heading font-medium text-xs tracking-[0.2em] uppercase text-gray-400">Map</span>
              <div className="font-heading font-extrabold text-2xl tracking-tighter">
                {displayIndex} <span className="opacity-30 font-light mx-1">/</span> {panels.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Panel({
  panel,
  onBecomeActive,
  isActive
}: {
  panel: SidecarPanel;
  onBecomeActive: () => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Observe when panel is in middle of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onBecomeActive();
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" } 
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onBecomeActive]);

  return (
    <div
      ref={ref}
      className={`p-8 md:p-12 bg-white shadow-2xl rounded-sm transition-all duration-700 border-l-4 border-arcgis-teal pointer-events-auto ${
        isActive ? "opacity-100 scale-100 translate-y-0" : "opacity-30 scale-[0.98] translate-y-4"
      }`}
    >
      <h3 className="text-3xl font-heading font-extrabold text-arcgis-teal mb-6 tracking-tight">
        {panel.title}
      </h3>
      {panel.threshold && (
        <div className="mb-6 inline-block bg-arcgis-teal text-white px-3 py-1 font-heading font-medium rounded-sm text-sm">
          Above Average Threshold: {panel.threshold}
        </div>
      )}
      <p className="font-body text-xl leading-relaxed text-gray-800 mb-6">
        {panel.content}
      </p>
      {panel.extraInfo && (
        <p className="font-body text-sm italic text-gray-600 mb-6">
          {panel.extraInfo}
        </p>
      )}
      {panel.source && (
        <p className="font-body text-sm italic font-semibold text-gray-500 uppercase tracking-wider">
          Source: {panel.source}
        </p>
      )}
    </div>
  );
}
