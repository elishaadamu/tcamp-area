"use client";

import { useEffect, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapWidgetInner() {
  const [geoData, setGeoData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetch('/data/map_data.geojson')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Error loading GeoJSON", err));
  }, []);

  const styleGeoJson = (feature: any) => {
    const level = feature.properties?.ipdLevel;
    let fillColor = "transparent";
    let fillOpacity = 0;

    if (level === 'high') {
      fillColor = "#b91c1c"; // dark red
      fillOpacity = 0.8;
    } else if (level === 'medium') {
      fillColor = "#ef4444"; // medium red
      fillOpacity = 0.6;
    } else if (level === 'low') {
      fillColor = "#fca5a5"; // light red
      fillOpacity = 0.4;
    }

    return {
      fillColor,
      fillOpacity,
      color: level && level !== 'none' ? "#ffffff" : "transparent",
      weight: 1,
    };
  };

  const renderMapBox = (expanded: boolean) => (
    <div className={`w-full h-full relative group ${expanded ? 'bg-white' : ''}`} style={expanded ? {} : { minHeight: "400px" }}>
      <MapContainer 
        key={expanded ? "expanded-map" : "normal-map"}
        center={[37.2279, -77.4019]} // Petersburg, VA
        zoom={expanded ? 11 : 10} 
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
        className="z-0"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        />
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={styleGeoJson} 
          />
        )}
        <ZoomControl position="bottomright" />
      </MapContainer>

      {!expanded && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="absolute top-4 right-4 z-[400] bg-white p-2 rounded shadow-md text-gray-700 hover:text-arcgis-teal hover:bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          title="View Large Map"
        >
          <Maximize2 size={20} />
        </button>
      )}
    </div>
  );

  return (
    <>
      {renderMapBox(false)}

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-white flex flex-col pt-16"
          >
            <div className="absolute top-4 right-6 z-[1000] flex items-center space-x-4">
              <span className="font-heading font-medium text-lg text-gray-800 tracking-wide">
                Interactive IPD Map
              </span>
              <button 
                onClick={() => setIsExpanded(false)}
                className="bg-white border hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-lg transition-colors flex items-center justify-center"
                title="Close Map"
              >
                <Minimize2 size={24} />
              </button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-grow relative h-full w-full"
            >
              {renderMapBox(true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
