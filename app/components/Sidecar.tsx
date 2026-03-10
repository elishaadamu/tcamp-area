"use client";

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full bg-arcgis-dark min-h-screen flex text-gray-100">
      
      {/* 1. SIDEBAR Navigation - Headers Only */}
      <aside className="hidden lg:flex w-96 h-screen sticky top-2 flex-col border-r border-white/10 bg-arcgis-dark z-30">
        <div className="p-10 space-y-12 overflow-y-auto custom-scrollbar flex-1">
          <div>
            <h2 className="font-heading font-black text-[11px] uppercase tracking-[0.4em] text-gray-500 mb-10 px-2">Categories</h2>
            
            <div className="space-y-8">
              <div>
                 <div className="flex items-center gap-3 mb-6 px-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                   <span className="font-heading font-black text-[11px] uppercase tracking-[0.2em] text-gray-600">Demographic Indicators</span>
                 </div>
                 
                 <nav className="flex flex-col gap-2.5">
                   {panels.map((panel, idx) => (
                     <button
                       key={panel.id}
                       onClick={() => {
                         document.getElementById(`panel-${panel.id}`)?.scrollIntoView({ behavior: 'smooth' });
                       }}
                       className={`group w-full text-left px-6 py-5 rounded-xl transition-none font-heading font-black text-sm leading-snug flex items-start gap-5 ${
                         activeId === panel.id 
                         ? "bg-[#4ade80] text-emerald-950 shadow-[0_15px_35px_rgba(74,222,128,0.25)]" 
                         : "text-gray-400 hover:text-white hover:bg-white/5"
                       }`}
                     >
                       <span className={`text-base ${activeId === panel.id ? "text-emerald-900/40" : "text-gray-700"}`}>
                         {idx + 1}.
                       </span>
                       <span className="uppercase tracking-[0.12em] pt-0.5">{panel.title}</span>
                     </button>
                   ))}
                 </nav>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA - Vertical Stacking */}
      <main className="flex-1 px-6 md:px-12 lg:px-16 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {panels.map((panel, idx) => (
            <Panel 
              key={panel.id}
              panel={panel}
              index={idx}
              onBecomeActive={() => setActiveId(panel.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function Panel({
  panel,
  index,
  onBecomeActive,
}: {
  panel: SidecarPanel;
  index: number;
  onBecomeActive: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Observer to update the sidebar active state based on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onBecomeActive();
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onBecomeActive]);

  return (
    <section id={`panel-${panel.id}`} ref={ref} className="min-h-[60vh] flex flex-col justify-center space-y-4 group">
      {/* Number and Title on Top */}
      <header>
        <h3 className="text-2xl md:text-4xl font-heading font-black text-[#4ade80] tracking-tighter leading-tight flex items-baseline gap-4 mb-6">
          <span className="opacity-20  text-xl md:text-2xl">{index + 1}.</span>
          {panel.title}
        </h3>
      </header>

      <div className="space-y-6">
        {/* Description/Content beneath the Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 mb-2">
            {panel.threshold && (
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-[#4ade80] border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.2em]">
                Regional Average: {panel.threshold}
              </div>
            )}
            
          </div>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-body tracking-tight max-w-4xl">
            {panel.content}
          </p>
          {panel.source && (
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-emerald-500/30" />
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 whitespace-nowrap">
                  Source: {panel.source}
                </p>
              </div>
            )}
        </div>

        {/* Map beneath the Content - Wider Aspect Ratio */}
        {panel.useMap && (
          <div className="aspect-21/9 w-full rounded-3xl overflow-hidden border border-white/10 bg-gray-900 shadow-xl relative">
             <MapWidget indicator={panel.id} />
          </div>
        )}

        <footer className="pt-4 border-t border-white/5">
           {panel.extraInfo && (
             <p className="text-xs text-gray-500 font-body leading-relaxed">{panel.extraInfo}</p>
           )}
        </footer>
      </div>
    </section>
  );
}
