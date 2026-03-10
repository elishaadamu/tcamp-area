"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  containerClassName?: string;
  imageClassName?: string;
}

export default function ImageLightbox({ src, alt, width = 1400, height = 800, containerClassName = "", imageClassName = "" }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={`relative group cursor-pointer overflow-hidden ${containerClassName}`}
        onClick={() => setIsOpen(true)}
      >
        <Image 
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-transform duration-700 group-hover:scale-[1.03] ${imageClassName}`}
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 p-3 rounded-full shadow-xl text-arcgis-teal transform scale-90 group-hover:scale-100 transition-all duration-300">
            <Maximize2 size={22} className="ml-[1px]" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999999] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all z-10"
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            >
              <X size={28} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full relative cursor-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
