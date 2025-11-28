import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "en";

interface Translations {
  // HealthSafetyScreen
  warningTitle1: string;
  warningTitle2: string;
  beforePlaying1: string;
  beforePlaying2: string;
  beforePlaying3: string;
  clickToContinue: string;
  tapToContinue: string;

  // WiiMenu tiles
  aboutMe: string;
  skills: string;

  // ProgramModal
  mySkills: string;
  viewResume: string;
  wiiMenu: string;
  start: string;
  repo: string;
  frontEnd: string;
  backEnd: string;
  tools: string;

  // About section
  aboutText1: string;
  aboutText2: string;

  // Settings
  settings: string;
  language: string;
  spanish: string;
  english: string;
  close: string;

  // Projects
  projects: {
    onlyOneEscapes: {
      description: string;
    };
    hotelJohnnieWalker: {
      description: string;
    };
    chordia: {
      description: string;
    };
  };
}

const translations: Record<Language, Translations> = {
  es: {
    // HealthSafetyScreen
    warningTitle1: "AVISO - SALUD Y",
    warningTitle2: "SEGURIDAD",
    beforePlaying1: "ANTES DE JUGAR, MUCHAS GRACIAS",
    beforePlaying2: "POR VISITAR MI PORTFOLIO. ESPERO",
    beforePlaying3: "QUE DISFRUTES LA EXPERIENCIA!",
    clickToContinue: "Haz click para continuar.",
    tapToContinue: "Toca la pantalla para continuar.",

    // WiiMenu tiles
    aboutMe: "Sobre Mí",
    skills: "Habilidades",

    // ProgramModal
    mySkills: "Mis Habilidades",
    viewResume: "Ver CV",
    wiiMenu: "Wii Menu",
    start: "Iniciar",
    repo: "Repo",
    frontEnd: "Front End",
    backEnd: "Back End",
    tools: "Herramientas",

    // About section
    aboutText1: "Soy un Desarrollador Web apasionado por crear código limpio, eficiente y escalable. Me encanta resolver problemas complejos, aprender nuevas tecnologías y colaborar con equipos para crear experiencias digitales increíbles.",
    aboutText2: "¡Estoy abierto a nuevas oportunidades! Ya sea un puesto a tiempo completo, trabajo freelance o un proyecto emocionante, busco un lugar donde pueda aportar mis habilidades en React y Laravel y crecer como desarrollador.",

    // Settings
    settings: "Ajustes",
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
    close: "Cerrar",

    // Projects
    projects: {
      onlyOneEscapes: {
        description: "Only One Escapes es un proyecto web dinámico inspirado en el concepto de la Rueda de la Muerte. El destino de los jugadores se decide mediante tiradas de dados, y el participante con la puntuación más alta gana el combate.",
      },
      hotelJohnnieWalker: {
        description: "Hotel Johnnie Walker es un proyecto completamente front-end que muestra un sistema de reservas de hotel con una interfaz fluida y fácil de usar. La aplicación permite a los usuarios hacer reservas de habitaciones de hotel así como reservar mesas en el restaurante del hotel.",
      },
      chordia: {
        description: "Chordia es una plataforma de gestión de progresiones de acordes. Crea, explora y gestiona tus ideas musicales con nuestra interfaz intuitiva, diseñada para músicos de todos los niveles.",
      },
    },
  },
  en: {
    // HealthSafetyScreen
    warningTitle1: "WARNING - HEALTH AND",
    warningTitle2: "SAFETY",
    beforePlaying1: "BEFORE PLAYING, THANKS FOR VISITING",
    beforePlaying2: "MY PORTFOLIO. HOPE YOU ENJOY THE",
    beforePlaying3: "EXPERIENCE AND HAVE FUN EXPLORING!",
    clickToContinue: "Click to continue.",
    tapToContinue: "Tap the screen to continue.",

    // WiiMenu tiles
    aboutMe: "About Me",
    skills: "Skills",

    // ProgramModal
    mySkills: "My Skills",
    viewResume: "View Resume",
    wiiMenu: "Wii Menu",
    start: "Start",
    repo: "Repo",
    frontEnd: "Front End",
    backEnd: "Back End",
    tools: "Tools",

    // About section
    aboutText1: "I'm a Web Developer with a passion for building clean, efficient, and scalable code. I thrive on solving complex problems, learning new technologies, and collaborating with teams to create awesome digital experiences.",
    aboutText2: "I'm open to new opportunities! Whether it's a full-time role, freelance work, or an exciting project, I'm looking for a place where I can contribute my skills in React and Laravel and grow as a developer.",

    // Settings
    settings: "Settings",
    language: "Language",
    spanish: "Spanish",
    english: "English",
    close: "Close",

    // Projects
    projects: {
      onlyOneEscapes: {
        description: "Only One Escapes is a dynamic web-based project inspired by the Wheel of Doom concept. Players' fates are decided through dice rolls, and the participant with the highest score wins the combat.",
      },
      hotelJohnnieWalker: {
        description: "Hotel Johnnie Walker is a fully front-end project that showcases a hotel booking system with a seamless and user-friendly interface. The application allows users to make reservations for hotel rooms as well as book tables at the hotel's restaurant.",
      },
      chordia: {
        description: "Chordia is a chord progression management platform. Create, explore, and manage your musical ideas with our intuitive interface, designed for musicians of all levels.",
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
