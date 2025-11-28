import { useEffect, useState } from "react";
import { Code, User, Mail, ExternalLink, Github, Play, Info, X } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaCss3Alt, FaHtml5, FaJs, FaLaravel, FaPhp, FaDocker, FaFigma } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiMysql, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

interface ProjectData {
  name: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  programId?: string;
  projectData?: ProjectData | null;
}

const sections = [
  { id: "about", title: "Sobre Mí", icon: User },
  { id: "skills", title: "Mis Skills", icon: Code },
];

const sectionMap: Record<string, number> = {
  "Sobre Mí": 0,
  "Skills": 1,
};

export const ProgramModal = ({ isOpen, onClose, programId, projectData }: ProgramModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"exit-left" | "exit-right" | "enter-left" | "enter-right" | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (isOpen && programId) {
      const sectionIndex = sectionMap[programId];
      if (sectionIndex !== undefined) {
        setCurrentSection(sectionIndex);
      }
      setIsAnimating(true);
    }
  }, [isOpen, programId]);

  const handleClose = () => {
    const audio = new Audio('/select.mp3');
    audio.volume = 1;
    audio.play();
    
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const nextSection = () => {
    if (isSliding) return;
    const audio = new Audio('/select.mp3');
    audio.volume = 1;
    audio.play();
    setIsSliding(true);
    setSlideDirection("exit-left");
    setTimeout(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
      setSlideDirection("enter-left");
      setTimeout(() => {
        setSlideDirection(null);
        setIsSliding(false);
      }, 300);
    }, 300);
  };

  const prevSection = () => {
    if (isSliding) return;
    const audio = new Audio('/select.mp3');
    audio.volume = 1;
    audio.play();
    setIsSliding(true);
    setSlideDirection("exit-right");
    setTimeout(() => {
      setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
      setSlideDirection("enter-right");
      setTimeout(() => {
        setSlideDirection(null);
        setIsSliding(false);
      }, 300);
    }, 300);
  };

  if (!isOpen) return null;

  // Si es un proyecto, mostrar la vista del proyecto con fondo de portada
  if (programId === "__PROJECT__" && projectData) {
    return (
      <ProjectModal 
        projectData={projectData} 
        isAnimating={isAnimating} 
        handleClose={handleClose} 
      />
    );
  }

  const CurrentIcon = sections[currentSection].icon;

  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center">
      {/* Modal - Full screen */}
      <div 
        className={`absolute inset-0 overflow-hidden transition-all duration-300 ${
          isAnimating ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{ backgroundColor: 'hsl(210 15% 94%)' }}
      >
        {/* Content area */}
        <div className="h-[calc(100%-80px)] md:h-[calc(100%-120px)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-center px-4 py-3 md:px-8 md:py-6 border-b-4 border-[#5ac8fa]">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#5ac8fa] flex items-center justify-center">
                <CurrentIcon className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <h1 className="text-xl md:text-4xl font-bold text-gray-600">{sections[currentSection].title}</h1>
            </div>
          </div>

          {/* Section content with navigation arrows inside */}
          <div className="flex-1 p-4 md:p-8 relative overflow-hidden">
            {/* Left arrow - oculto en móvil */}
            <div className="hidden md:block absolute left-8 top-1/2 z-10" style={{ transform: 'translateY(-50%)' }}>
              <button 
                onClick={prevSection}
                className="block"
              >
                <div 
                  className="w-0 h-0 border-t-[20px] border-t-transparent border-r-[30px] border-r-[#5ac8fa] border-b-[20px] border-b-transparent hover:border-r-[#3db8ea] transition-colors"
                  style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))' }}
                />
              </button>
            </div>

            {/* Right arrow - oculto en móvil */}
            <div className="hidden md:block absolute right-8 top-1/2 z-10" style={{ transform: 'translateY(-50%)' }}>
              <button 
                onClick={nextSection}
                className="block"
              >
                <div 
                  className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[30px] border-l-[#5ac8fa] border-b-[20px] border-b-transparent hover:border-l-[#3db8ea] transition-colors"
                  style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))' }}
                />
              </button>
            </div>

            {/* Section content */}
            <div className={`px-2 md:px-20 h-full transition-all duration-300 ${
              slideDirection === "exit-left" ? "translate-x-[-100%] opacity-0" : 
              slideDirection === "exit-right" ? "translate-x-[100%] opacity-0" : 
              slideDirection === "enter-left" ? "translate-x-0 opacity-100" :
              slideDirection === "enter-right" ? "translate-x-0 opacity-100" :
              "translate-x-0 opacity-100"
            }`}
            style={{
              transform: slideDirection === "exit-left" ? "translateX(-100%)" :
                         slideDirection === "exit-right" ? "translateX(100%)" :
                         slideDirection === "enter-left" ? "translateX(0)" :
                         slideDirection === "enter-right" ? "translateX(0)" : "translateX(0)"
            }}>
              {currentSection === 0 && <AboutSection />}
              {currentSection === 1 && <SkillsSection />}
            </div>
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 md:gap-12 py-4 md:py-8 border-t-4 border-gray-500" style={{ backgroundColor: 'hsl(210 15% 88%)' }}>
          <button
            onClick={handleClose}
            className="px-8 py-3 md:px-16 md:py-5 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full text-lg md:text-2xl font-semibold text-gray-600 shadow-lg hover:scale-105 transition-transform border-2 border-gray-400"
          >
            Wii Menu
          </button>
        </div>
      </div>
    </div>
  );
};

// Sección Sobre Mí
const AboutSection = () => (
  <div className="h-full flex items-center justify-center overflow-y-auto">
    {/* Layout móvil: vertical */}
    <div className="flex flex-col items-center gap-4 md:hidden px-4 py-2">
      <img 
        src="/PROFILE.webp" 
        alt="Profile" 
        className="w-40 h-40 object-cover rounded-lg shadow-lg"
      />
      <div className="flex-1">
        <p className="text-sm text-gray-600 leading-relaxed mb-2">
          I'm a Web Developer with a passion for building clean, efficient, and scalable code. I thrive on solving complex problems, learning new technologies, and collaborating with teams to create awesome digital experiences.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          I'm open to new opportunities! Whether it's a full-time role, freelance work, or an exciting project, I'm looking for a place where I can contribute my skills in React and Laravel and grow as a developer.
        </p>
        <div className="flex justify-start">
          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 border-2 border-gray-600 text-sm font-semibold text-gray-600 hover:bg-gray-600 hover:text-white transition-colors"
          >
            View Resume
          </a>
        </div>
      </div>
    </div>
    {/* Layout desktop: horizontal */}
    <div className="hidden md:flex items-center gap-20 max-w-5xl">
      <img 
        src="/PROFILE.webp" 
        alt="Profile" 
        className="w-64 h-64 object-cover rounded-lg shadow-lg"
      />
      <div className="flex-1">
        <p className="text-xl text-gray-600 leading-relaxed mb-4">
          I'm a Web Developer with a passion for building clean, efficient, and scalable code. I thrive on solving complex problems, learning new technologies, and collaborating with teams to create awesome digital experiences.
        </p>
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          I'm open to new opportunities! Whether it's a full-time role, freelance work, or an exciting project, I'm looking for a place where I can contribute my skills in React and Laravel and grow as a developer.
        </p>
        <div className="flex justify-end">
          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border-2 border-gray-600 text-xl font-semibold text-gray-600 hover:bg-gray-600 hover:text-white transition-colors"
          >
            View Resume
          </a>
        </div>
      </div>
    </div>
  </div>
);

// Sección Skills
const SkillsSection = () => {
  const categories = [
    {
      title: "Front End",
      skills: [
        { name: "React", icon: FaReact, color: "#61DAFB" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "HTML/CSS", icon: FaHtml5, color: "#E34F26" },
        { name: "JavaScript", icon: FaJs, color: "#F7DF1E" }
      ]
    },
    {
      title: "Back End", 
      skills: [
        { name: "Laravel", icon: FaLaravel, color: "#FF2D20" },
        { name: "Node.js", icon: FaNodeJs, color: "#339933" },
        { name: "PHP", icon: FaPhp, color: "#777BB4" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        { name: "REST APIs", icon: FaCss3Alt, color: "#5ac8fa" }
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "#F05032" },
        { name: "VS Code", icon: VscVscode, color: "#007ACC" },
        { name: "Figma", icon: FaFigma, color: "#F24E1E" },
        { name: "Postman", icon: SiPostman, color: "#FF6C37" },
        { name: "Docker", icon: FaDocker, color: "#2496ED" }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto h-full flex items-center py-3 md:py-0">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 px-2">
        {categories.map((category) => (
          <div 
            key={category.title}
            className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg hover:scale-105 transition-transform border-2 border-[#5ac8fa]"
          >
            <h3 className="text-lg md:text-2xl font-bold text-[#5ac8fa] mb-2 md:mb-4 text-center border-b-2 border-gray-200 pb-2 md:pb-3">
              {category.title}
            </h3>
            <ul className="space-y-1 md:space-y-3">
              {category.skills.map((skill) => (
                <li 
                  key={skill.name}
                  className="flex items-center gap-2 md:gap-3 text-sm md:text-lg text-gray-700"
                >
                  <skill.icon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" style={{ color: skill.color }} />
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};



// Componente ProjectModal para vista de proyectos
const ProjectModal = ({ 
  projectData, 
  isAnimating, 
  handleClose 
}: { 
  projectData: ProjectData; 
  isAnimating: boolean; 
  handleClose: () => void;
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const playSelectSound = () => {
    const audio = new Audio('/select.mp3');
    audio.volume = 1;
    audio.play();
  };

  const openInfo = () => {
    playSelectSound();
    setShowInfo(true);
  };

  const closeInfo = () => {
    playSelectSound();
    setShowInfo(false);
  };

  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center">
      <div 
        className={`absolute inset-0 overflow-hidden transition-all duration-300 ${
          isAnimating ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* MOBILE: Fondo completo con imagen */}
        <div 
          className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: projectData.image ? `url(${projectData.image})` : 'linear-gradient(to bottom, #5ac8fa, #0099cc)',
          }}
        >
          {/* Header móvil */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center px-4 py-3 bg-[hsl(210,15%,94%)] border-b-2 border-[#5ac8fa]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5ac8fa] flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-600">{projectData.name}</h1>
            </div>
          </div>

          {/* Botón Info móvil - estilo Wii */}
          <button
            onClick={openInfo}
            className="absolute top-16 right-4 w-12 h-12 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center shadow-lg border-2 border-gray-400 hover:scale-105 transition-transform"
          >
            <Info className="w-6 h-6 text-gray-600" />
          </button>

          {/* Popup de Info */}
          {showInfo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 p-4">
              <div className="bg-[hsl(210,15%,94%)] rounded-[30px] p-5 max-w-sm w-full shadow-2xl relative">
                <button
                  onClick={closeInfo}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center border-2 border-gray-400 hover:scale-105 transition-transform"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-700 mb-3">{projectData.name}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {projectData.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectData.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-[#5ac8fa]/20 text-[#5ac8fa] text-sm rounded-full font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP: Vista original */}
        <div className="hidden md:block h-full" style={{ backgroundColor: 'hsl(210 15% 94%)' }}>
          {/* Header desktop */}
          <div className="relative flex items-center justify-center px-8 py-6 border-b-4 border-[#5ac8fa]" style={{ backgroundColor: 'hsl(210 15% 94%)' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#5ac8fa] flex items-center justify-center">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-600">{projectData.name}</h1>
            </div>
          </div>

          {/* Área de contenido con bordes laterales */}
          <div className="relative h-[calc(100%-220px)] flex">
            {/* Borde izquierdo */}
            <div className="w-64" style={{ backgroundColor: 'hsl(210 15% 94%)' }} />
            
            {/* Screenshot del proyecto */}
            <div 
              className="flex-1 bg-cover bg-center bg-no-repeat relative"
              style={{ 
                backgroundImage: projectData.image ? `url(${projectData.image})` : 'linear-gradient(to bottom, #5ac8fa, #0099cc)',
              }}
            >
              {/* Recuadro semi-transparente abajo */}
              <div className="absolute bottom-16 left-8 right-8">
                <div className="max-w-4xl w-full mx-auto backdrop-blur-md bg-black/40 rounded-3xl p-8 shadow-2xl">
                  <p className="text-xl text-white leading-relaxed text-center mb-6">
                    {projectData.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {projectData.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-base rounded-full font-semibold border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Borde derecho */}
            <div className="w-64" style={{ backgroundColor: 'hsl(210 15% 94%)' }} />
          </div>
        </div>

        {/* Bottom buttons - responsive */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-3 md:gap-8 py-4 md:py-8 border-t-4 border-gray-500" style={{ backgroundColor: 'hsl(210 15% 88%)' }}>
          {projectData.liveUrl && (
            <a
              href={projectData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playSelectSound}
              className="px-6 py-2 md:px-12 md:py-5 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full text-base md:text-2xl font-semibold text-gray-600 shadow-lg hover:scale-105 transition-transform border-2 border-gray-400"
            >
              Start
            </a>
          )}
          
          <button
            onClick={handleClose}
            className="px-6 py-2 md:px-12 md:py-5 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full text-base md:text-2xl font-semibold text-gray-600 shadow-lg hover:scale-105 transition-transform border-2 border-gray-400"
          >
            Wii Menu
          </button>
          
          {projectData.githubUrl && (
            <a
              href={projectData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playSelectSound}
              className="px-6 py-2 md:px-12 md:py-5 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full text-base md:text-2xl font-semibold text-gray-600 shadow-lg hover:scale-105 transition-transform border-2 border-gray-400"
            >
              Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
