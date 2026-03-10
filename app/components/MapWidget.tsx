"use client";

import dynamic from "next/dynamic";

const MapWidgetInner = dynamic(() => import("./MapWidgetInner"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading map...</div> 
});

export default function MapWidget({ indicator }: { indicator?: string }) {
  return <MapWidgetInner indicator={indicator} />;
}
