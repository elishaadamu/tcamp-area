import { useEffect, useState } from "react";
import { Maximize2, Minimize2, Home, Layers } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MapContainer, TileLayer, GeoJSON, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function HomeButton() {
  const map = useMap();
  return (
    <div className="leaflet-bottom leaflet-right mb-24 mr-3 pointer-events-auto">
      <button 
        onClick={() => map.setView([41.6764, -86.2520], 11)}
        className="bg-white p-2.5 rounded-md shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors mb-2"
        title="Reset Map"
      >
        <Home size={18} className="text-gray-800" />
      </button>
    </div>
  );
}

export default function MapWidgetInner({ indicator }: { indicator?: string }) {
  const [dataIndicator, setDataIndicator] = useState<string | undefined>(indicator);
  const [geoData, setGeoData] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Load specific geojson file based on indicator
    const targetIndicator = indicator;
    const fileName = targetIndicator ? `${targetIndicator.toLowerCase()}.geojson` : 'map_data.geojson';
    
    fetch(`/data/${fileName}`)
      .then(res => {
        if (!res.ok) return fetch('/data/map_data.geojson'); // Fallback
        return res;
      })
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
        setDataIndicator(targetIndicator);
      })
      .catch(err => console.error("Error loading GeoJSON", err));
  }, [indicator]);

  const styleGeoJson = (feature: any) => {
    const level = feature.properties?.level || feature.properties?.ipdLevel;
    let fillColor = "#e5e7eb"; 
    let fillOpacity = 0.3;
    let color = "#cbd5e1"; 
    let weight = 0.5;
    let dashArray = "";

    if (level === 'high') {
      fillColor = "#b91c1c";
      color = "#ffffff";
      fillOpacity = 0.8;
      weight = feature.geometry.type === "LineString" ? 4 : 0.5;
    } else if (level === 'medium') {
      fillColor = "#f87171";
      color = "#ffffff";
      fillOpacity = 0.6;
      weight = feature.geometry.type === "LineString" ? 3 : 0.5;
      dashArray = feature.geometry.type === "LineString" ? "5, 5" : "";
    }

    return {
      fillColor,
      fillOpacity,
      color: feature.geometry.type === "LineString" ? (level === 'high' ? '#b91c1c' : '#f87171') : color,
      weight,
      dashArray,
    };
  };

  const renderMapBox = (expanded: boolean) => (
    <div className={`w-full h-full relative group bg-[#f3f4f6]`} style={expanded ? {} : { minHeight: "400px" }}>
      <MapContainer 
        key={expanded ? "expanded" : "normal"}
        center={[41.6764, -86.2520]}
        zoom={expanded ? 12 : 11} 
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
            key={dataIndicator}
            data={geoData} 
            style={styleGeoJson}
            pointToLayer={(feature, latlng) => {
              const level = feature.properties?.level || feature.properties?.ipdLevel;
              const color = level === 'high' ? "#b91c1c" : (level === 'medium' ? "#f87171" : "#94a3b8");
              return L.circleMarker(latlng, {
                radius: 10,
                fillColor: color,
                color: "#ffffff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
              });
            }}
          />
        )}
        <ZoomControl position="bottomright" />
        <HomeButton />
        
        <div className="leaflet-bottom leaflet-left ml-3 mb-6 pointer-events-auto">
          <button className="bg-white p-2.5 rounded-md shadow-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
            <Layers size={18} className="text-gray-800" />
          </button>
        </div>
      </MapContainer>

      {!expanded && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="absolute top-6 right-6 z-[400] bg-white p-2.5 rounded-md shadow-lg border border-gray-200 text-gray-800 hover:bg-gray-50 flex items-center justify-center translate-y-0 hover:-translate-y-1 transition-all duration-300"
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
            <div className="absolute top-4 right-10 z-[1000] flex items-center space-x-6">
              <span className="font-heading font-black text-xl text-gray-900 tracking-tight uppercase">
                IPD Concentration Map
              </span>
              <button 
                onClick={() => setIsExpanded(false)}
                className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 p-2.5 rounded-md shadow-lg transition-all flex items-center justify-center"
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
