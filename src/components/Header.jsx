import React from "react";

const Header = ({ toggleLanguage, language }) => {
  const smoothScrollTo = (targetY, duration = 600) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      window.scrollTo(0, startY + distance * easedProgress);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 50;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementPosition - offset;

      smoothScrollTo(targetPosition, 600);

      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  const handleHomeScroll = (event) => {
    event.preventDefault();
    smoothScrollTo(0, 600);
    window.history.pushState(null, "", "#");
  };

  return (
    <div className="relative">
      <header className="bg-[#222222] text-white flex items-center justify-between p-4">
        {/* Menú central */}
        <ul className="flex items-center justify-center space-x-6 flex-grow">
          <li>
            <a
              href="#"
              onClick={handleHomeScroll}
              className="inline-block hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF002D] hover:text-transparent hover:bg-clip-text"
            >
              {language === 'en' ? 'Home' : 'Inicio'}
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "projects")}
              className="inline-block hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF002D] hover:text-transparent hover:bg-clip-text"
            >
              {language === 'en' ? 'Projects' : 'Proyectos'}
            </a>
          </li>
          <li>
            <a
              href="#experience"
              onClick={(e) => handleScroll(e, "experience")}
              className="inline-block hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF002D] hover:text-transparent hover:bg-clip-text"
            >
              {language === 'en' ? 'Experience' : 'Experiencia'}
            </a>
          </li>
          <li>
            <a
              href="#contact-me"
              onClick={(e) => handleScroll(e, "contact-me")}
              className="inline-block hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF002D] hover:text-transparent hover:bg-clip-text"
            >
              {language === 'en' ? 'Contact' : 'Contacto'}
            </a>
          </li>
        </ul>
      </header>

      {/* Contenedor de botones */}
      <div className="absolute right-4 top-full mt-2 flex gap-2">
        <button
          onClick={toggleLanguage}
          className="border border-white bg-transparent text-white px-3 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        >
          {language === 'en' ? 'ES' : 'EN'}
        </button>
        
        
      </div>
    </div>
  );
};

export default Header;