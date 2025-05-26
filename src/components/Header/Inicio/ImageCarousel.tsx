import { useState } from "react";

interface Props {
  imagenes: string[];
}

export default function ImageCarousel({ imagenes }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const duplicatedImages = [...imagenes, ...imagenes]; // duplicación para efecto infinito

  return (
    <div className="w-full overflow-hidden mb-20 relative">
      <div
        className="flex w-max animate-scroll"
        style={{
          animationPlayState: hoveredIndex !== null ? "paused" : "running",
        }}
      >
        {duplicatedImages.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-72 h-48 mx-4 rounded-lg shadow-md"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transform: hoveredIndex === idx ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <img
              src={src}
              alt={`Imagen ${idx + 1}`}
              className={`object-contain w-full h-full rounded-lg transition-all duration-300 ${
                hoveredIndex === idx ? "filter-none" : "grayscale"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
