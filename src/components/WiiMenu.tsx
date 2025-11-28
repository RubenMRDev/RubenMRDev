import { useState } from "react";
import { WiiTile } from "./WiiTile";
import { WiiBottomBar } from "./WiiBottomBar";
import { ProgramModal } from "./ProgramModal";
import { useAudio } from "@/App";

interface ProjectData {
  name: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface TileData {
  id: number;
  type: "empty" | "blue" | "green" | "white";
  label?: string;
  image?: string;
  isProject?: boolean;
  projectData?: ProjectData;
}

// ============================================
// 🎮 AGREGA TUS PROYECTOS AQUÍ
// ============================================
// Cada proyecto aparecerá como un "juego" en el menú de la Wii
// - image: Pon la imagen en /public/projects/ (como carátula del juego)
// - Las primeras 3 tiles son las secciones del portfolio
// - Los proyectos empiezan desde la tile 4

const tiles: TileData[] = [
  // Secciones principales del portfolio
  { id: 1, type: "white", label: "Sobre Mí" },
  { id: 2, type: "white", label: "Skills" },
  
  // 🎮 PROYECTOS - Agrega tus proyectos aquí como "juegos"
  { 
    id: 3, 
    type: "white", 
    label: "Only One Escapes",
    image: "/projects/onlyoneescapestitle.png",
    isProject: true,
    projectData: {
      name: "Only One Escapes",
      description: "Only One Escapes is a dynamic web-based project inspired by the Wheel of Doom concept. Players' fates are decided through dice rolls, and the participant with the highest score wins the combat.",
      technologies: ["React", "Tailwind"],
      image: "/projects/onlyoneescapestitle.png",
      liveUrl: "https://only-one-escapes-project.vercel.app/",
      githubUrl: "https://github.com/RubenMRDev/OnlyOneEscapes",
    }
  },
  { 
    id: 4, 
    type: "white", 
    label: "Hotel Johnnie Walker",
    image: "/projects/hoteljohnniewalker.png",
    isProject: true,
    projectData: {
      name: "Hotel Johnnie Walker",
      description: "Hotel Johnnie Walker is a fully front-end project that showcases a hotel booking system with a seamless and user-friendly interface. The application allows users to make reservations for hotel rooms as well as book tables at the hotel's restaurant.",
      technologies: ["React", "Tailwind", "JSON"],
      image: "/projects/hoteljohnniewalker.png",
      liveUrl: "https://hoteljohnniewalker.vercel.app/",
      githubUrl: "https://github.com/RubenMRDev/hotelJohnnieWalker",
    }
  },
  { 
    id: 5, 
    type: "white", 
    label: "Chordia",
    image: "/projects/chordia.png",
    isProject: true,
    projectData: {
      name: "Chordia",
      description: "Chordia is a chord progression management platform. Create, explore, and manage your musical ideas with our intuitive interface, designed for musicians of all levels.",
      technologies: ["React", "Tailwind", "AI"],
      image: "/projects/chordia.png",
      liveUrl: "https://chordiamusic.vercel.app/",
      githubUrl: "https://github.com/RubenMRDev/Chordia",
    }
  },
  
  // Tiles vacías
  { id: 6, type: "empty" },
  { id: 7, type: "empty" },
  { id: 8, type: "empty" },
  { id: 9, type: "empty" },
  { id: 10, type: "empty" },
  { id: 11, type: "empty" },
  { id: 12, type: "empty" },
];

// Solo mostrar 10 tiles en móvil
const mobileTiles = tiles.slice(0, 10);

export const WiiMenu = () => {
  const { isMuted, toggleMute } = useAudio();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleTileClick = (tile: TileData) => {
    if (tile.type !== "empty") {
      if (tile.isProject && tile.projectData) {
        setSelectedProject(tile.projectData);
        setSelectedProgram("__PROJECT__");
      } else {
        setSelectedProject(null);
        setSelectedProgram(tile.label || "Program");
      }
      setModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main grid area */}
      <div className="flex-1 flex items-start md:items-center justify-center px-4 pt-4 md:py-4 md:px-8">
        {/* Grid móvil - 10 tiles */}
        <div className="grid grid-cols-2 gap-3 w-full md:hidden">
          {mobileTiles.map((tile) => (
            <WiiTile 
              key={tile.id} 
              type={tile.type} 
              label={tile.label}
              image={tile.image}
              isProject={tile.isProject}
              onClick={() => handleTileClick(tile)}
            />
          ))}
        </div>
        {/* Grid desktop - 12 tiles */}
        <div className="hidden md:grid grid-cols-4 gap-6 max-w-6xl w-full">
          {tiles.map((tile) => (
            <WiiTile 
              key={tile.id} 
              type={tile.type} 
              label={tile.label}
              image={tile.image}
              isProject={tile.isProject}
              onClick={() => handleTileClick(tile)}
            />
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <WiiBottomBar isMuted={isMuted} onToggleMute={toggleMute} />

      {/* Program Modal */}
      <ProgramModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        programId={selectedProgram}
        projectData={selectedProject}
      />
    </div>
  );
};
