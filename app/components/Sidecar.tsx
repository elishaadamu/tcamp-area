"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import MapWidget from "./MapWidget";
import ChartWidget, { ChartType } from "./ChartWidget";

export interface SidecarPanel {
  id: string;
  title: string;
  content: string;
  threshold?: string;
  source?: string;
  extraInfo?: string;
  image?: string;
  useMap?: boolean;
  chartType?: ChartType;
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
    <div ref={containerRef} className="relative flex flex-col md:flex-row-reverse w-full bg-arcgis-dark text-gray-100 border-y border-gray-800 z-10 isolate justify-between">
      {/* Right side: sticky media */}
      <div className="hidden md:block w-full md:w-1/2 lg:w-7/12 xl:w-3/5 h-screen sticky top-0 overflow-hidden bg-gray-900 shadow-2xl z-0">
        {/* Map Layer (Persistent) */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${panels.find(p => p.id === activeId)?.useMap ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <MapWidget indicator={activeId} />
        </div>

        {/* Non-Map Media Layer */}
        <AnimatePresence mode="popLayout">
          {panels.map((panel) => {
            if (activeId !== panel.id || panel.useMap) return null;
            return (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full bg-gray-900"
              >
                <div className="flex flex-col h-full relative">
                  {!panel.useMap && !panel.chartType && panel.image && (
                    <Image
                      src={panel.image}
                      alt={panel.title}
                      fill
                      className="object-cover opacity-80"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mobile background (fixed when active) */}
      <div className="md:hidden fixed top-0 left-0 w-full h-screen -z-10 bg-black">
         {/* Mobile Map Layer (Persistent) */}
         <div className={`absolute inset-0 w-full h-full opacity-40 transition-opacity duration-700 pointer-events-none ${panels.find(p => p.id === activeId)?.useMap ? 'opacity-40' : 'opacity-0'}`}>
            <MapWidget indicator={activeId} />
         </div>

         {/* Mobile Non-Map Media Layer */}
         <AnimatePresence mode="popLayout">
          {panels.map((panel) => {
            if (activeId !== panel.id || panel.useMap) return null;
            return (
              <motion.div
                key={panel.id + "-mobile"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="w-full h-full opacity-40 pointer-events-none bg-black">
                   {/* Mobile images could go here if needed */}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Scrolling text panels (Single column, better centered) */}
      <div className="w-full md:w-1/2 lg:w-5/12 xl:w-2/5 flex z-20 relative mix-blend-normal">
        <div className="flex-1 px-4 md:px-8 lg:px-10 py-24 space-y-[60vh]">
          <div className="pt-[10vh]"></div>
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
            className="fixed bottom-6 right-8 md:bottom-10 md:right-12 z-[100] pointer-events-none"
          >
            <div className="bg-gray-900/90 backdrop-blur-xl shadow-2xl border-l-[6px] border-accent-yellow text-white px-8 py-5 rounded-xl flex items-center gap-6 ring-1 ring-white/10">
              <div className="flex flex-col">
                <span className="font-heading font-black text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-1">
                  Indicator
                </span>
                <div className="font-heading font-black text-3xl tracking-tighter">
                  {displayIndex.toString().padStart(2, '0')} <span className="opacity-20 font-light mx-2">/</span> {panels.length.toString().padStart(2, '0')}
                </div>
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
      id={`panel-${panel.id}`}
      ref={ref}
      className={`p-10 md:p-14 bg-gray-900/80 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-[32px] transition-all duration-700 border border-white/5 pointer-events-auto transform ring-1 ring-white/10 ${
        isActive ? "opacity-100 scale-100 translate-y-0" : "opacity-20 scale-[0.95] translate-y-12"
      }`}
    >
      <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-8 tracking-tighter leading-tight">
        {panel.title}
      </h3>
      {panel.threshold && (
        <div className="mb-8 inline-block bg-accent-yellow/10 text-accent-yellow border border-accent-yellow/20 px-4 py-2 font-heading font-black rounded-full text-xs uppercase tracking-widest">
          Threshold: {panel.threshold}
        </div>
      )}
      <p className="font-body text-xl leading-relaxed text-gray-300 mb-10">
        {panel.content}
      </p>
      <div className="pt-8 border-t border-gray-800 space-y-4">
        {panel.extraInfo && (
          <p className="font-body text-sm italic text-gray-500">
            {panel.extraInfo}
          </p>
        )}
        {panel.source && (
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-gray-700"></span>
            <p className="font-body text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
              Source: {panel.source}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
