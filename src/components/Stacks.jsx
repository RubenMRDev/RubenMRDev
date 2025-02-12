import React, { useState, useEffect } from "react";

const stacks = {
  frontend: {
    title: "Front-End",
    images: [
      "images/stacks/html5.webp",
      "images/stacks/css3.webp",
      "images/stacks/javascript.webp",
      "images/stacks/react.webp",
      "images/stacks/bootstrap.webp",
      "images/stacks/tailwind.webp",
    ],
  },
  backend: {
    title: "Back-End",
    images: [
      "images/stacks/java.webp",
      "images/stacks/php.webp",
      "images/stacks/laravel.webp",
    ],
  },
  database: {
    title: "Databases",
    images: [
      "images/stacks/mysql.webp",
    ],
  },
};

const Experience = () => {
  const [currentStack, setCurrentStack] = useState("frontend");

  useEffect(() => {
    const stackKeys = Object.keys(stacks);
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % stackKeys.length;
      setCurrentStack(stackKeys[index]);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-30">
     <p
  className="text-transparent text-center font-bold text-2xl mb-4 bg-gradient-to-br from-[#888888] to-[#AAAAAA] bg-clip-text"
>
  Stacks
</p>

      <div className="relative w-64 h-52 flex items-center justify-center">
        {Object.entries(stacks).map(([key, stack]) => (
          <div
            key={key}
            className={`absolute flex flex-col items-center justify-center transition-opacity duration-1000 ${
              key === currentStack ? "opacity-100" : "opacity-0"
            }`}
            style={{ minHeight: "130px" }} // Mantiene la altura fija
          >
            <p className="text-[#C5C5C5] text-center mb-4 text-2xl">
              {stack.title}
            </p>
            <div className="grid grid-cols-3 gap-2 w-full justify-items-center">
              {stack.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={stack.title}
                  className="w-16 h-16 object-contain"
                />
              ))}
              {/* Rellenar con imágenes vacías si hay menos de 6 */}
              {stack.images.length < 6 &&
                Array(6 - stack.images.length)
                  .fill("")
                  .map((_, idx) => <div key={`empty-${idx}`} className="w-16 h-16" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
