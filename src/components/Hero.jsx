import React, { useEffect, useState } from "react";

const AnimatedLetters = ({ text, delay = 0.05, startDelay = 0, className = "" }) => {
  return (
    <>
      {text.split("").map((char, index) => {
        if (char === " ") {
          return <span key={index}>&nbsp;</span>;
        }
        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              opacity: 0,
              animation: "fadeInUp 0.5s forwards",
              animationDelay: `${startDelay + index * delay}s`,
              letterSpacing: "normal",
              color: "inherit", 
            }}
            className={className}
          >
            {char}
          </span>
        );
      })}
    </>
  );
};

const Hero = ({ language }) => {
  const [languageKey, setLanguageKey] = useState(language);

  useEffect(() => {
    // Cuando el idioma cambia, restablecemos el 'key' para forzar la re-renderización
    setLanguageKey(language);
  }, [language]);

  return (
    <div className="mt-20">
      <div className="bg-gradient-to-br from-[#8000FF] to-[#FF002D] rounded-full p-1 h-40 w-40 mx-auto">
        <img
          className="rounded-full h-full w-full"
          src="images/profile.webp"
          alt="Profile"
        />
      </div>
      <p className="text-center text-white mt-4 text-4xl">
        <span className="block font-bold">
          <AnimatedLetters text={language === 'en' ? "Hey! I'm " : "¡Hola! Soy "} startDelay={0} delay={0.05} key={languageKey}/>
          <span className="inline-block text-[#b040b4]">
            <AnimatedLetters text={language === 'en' ? "Rubén" : "Rubén"} startDelay={0.5} delay={0.05} key={languageKey}/>
          </span>
        </span>
        <span className="block font-bold text-3xl mt-2">
          <AnimatedLetters text={language === 'en' ? "Web Developer" : "Desarrollador Web"} startDelay={1} delay={0.05} key={languageKey}/>
        </span>
      </p>
      <div className="mt-8 mx-4 md:mx-20 lg:mx-80 text-xl">
        <p className="text-[#C5C5C5]">
          {language === 'en' ? (
            <>
              Hi, I'm Rubén! I've just completed my degree in{" "}
              <span className="bg-gradient-to-br from-[#8000FF] to-[#FF002D] text-transparent bg-clip-text">
                Web Development
              </span>
              , and I'm passionate about exploring new working methods. I'm always eager to learn something new and expand my skills in the ever-evolving world of technology.
            </>
          ) : (
            <>
              ¡Hola! Soy Rubén, acabo de finalizar mi grado en{" "}
              <span className="bg-gradient-to-br from-[#8000FF] to-[#FF002D] text-transparent bg-clip-text">
                Desarrollo Web
              </span>
              , y me apasiona explorar nuevas formas de trabajo. Siempre estoy ansioso por aprender algo nuevo y expandir mis habilidades en el mundo en constante evolución de la tecnología.
            </>
          )}
        </p>
      </div>

      <div className="text-white flex items-center justify-center gap-x-4 mt-8">
        <button
          onClick={() => (window.location.href = "#contact-me")}
          className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        >
          {language === 'en' ? 'Get In Touch' : 'Contactame'}
        </button>
        <button
          onClick={() => window.open("rubenMartinRuizCV.pdf", "_blank")}
          className="border border-white bg-white text-black px-4 py-2 rounded-full hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out"
        >
          {language === 'en' ? 'Download CV' : 'Descargar CV'}
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
