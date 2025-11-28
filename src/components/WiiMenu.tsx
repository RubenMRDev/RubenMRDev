import { useState } from "react";
import { WiiTile } from "./WiiTile";
import { WiiBottomBar } from "./WiiBottomBar";
import { ProgramModal } from "./ProgramModal";
import { useAudio } from "@/App";
import { useLanguage } from "@/lib/i18n";

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
  tileId?: "aboutMe" | "skills";
}

// ============================================
// 🎮 AGREGA TUS PROYECTOS AQUÍ
// ============================================
// Cada proyecto aparecerá como un "juego" en el menú de la Wii
// - image: Pon la imagen en /public/projects/ (como carátula del juego)
// - Las primeras 2 tiles son las secciones del portfolio
// - Los proyectos empiezan desde la tile 3

interface TileConfig {
  id: number;
  type: "empty" | "blue" | "green" | "white";
  labelKey?: "aboutMe" | "skills";
  image?: string;
  isProject?: boolean;
  projectKey?: "onlyOneEscapes" | "hotelJohnnieWalker" | "chordia";
  projectData?: {
    name: string;
    technologies: string[];
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
  };
}

const tilesConfig: TileConfig[] = [
  // Secciones principales del portfolio
  { id: 1, type: "white", labelKey: "aboutMe" },
  { id: 2, type: "white", labelKey: "skills" },
  
  // 🎮 PROYECTOS - Agrega tus proyectos aquí como "juegos"
  { 
    id: 3, 
    type: "white", 
    image: "/projects/onlyoneescapestitle.png",
    isProject: true,
    projectKey: "onlyOneEscapes",
    projectData: {
      name: "Only One Escapes",
      technologies: ["React", "Tailwind"],
      image: "/projects/onlyoneescapestitle.png",
      liveUrl: "https://only-one-escapes-project.vercel.app/",
      githubUrl: "https://github.com/RubenMRDev/OnlyOneEscapes",
    }
  },
  { 
    id: 4, 
    type: "white", 
    image: "/projects/hoteljohnniewalker.png",
    isProject: true,
    projectKey: "hotelJohnnieWalker",
    projectData: {
      name: "Hotel Johnnie Walker",
      technologies: ["React", "Tailwind", "JSON"],
      image: "/projects/hoteljohnniewalker.png",
      liveUrl: "https://hoteljohnniewalker.vercel.app/",
      githubUrl: "https://github.com/RubenMRDev/hotelJohnnieWalker",
    }
  },
  { 
    id: 5, 
    type: "white", 
    image: "/projects/chordia.png",
    isProject: true,
    projectKey: "chordia",
    projectData: {
      name: "Chordia",
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
const getMobileTiles = (tiles: TileData[]) => tiles.slice(0, 10);

export const WiiMenu = () => {
  const { isMuted, toggleMute } = useAudio();
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Convertir tilesConfig a tiles con traducciones
  const tiles: TileData[] = tilesConfig.map(tile => {
    // Si es un proyecto, añadir la descripción traducida
    let projectData: ProjectData | undefined;
    if (tile.isProject && tile.projectData && tile.projectKey) {
      projectData = {
        ...tile.projectData,
        description: t.projects[tile.projectKey].description,
      };
    }

    return {
      ...tile,
      label: tile.labelKey ? t[tile.labelKey] : tile.projectData?.name,
      tileId: tile.labelKey,
      projectData,
    };
  });

  const mobileTiles = getMobileTiles(tiles);

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
              tileId={tile.tileId}
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
              tileId={tile.tileId}
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
