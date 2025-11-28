import { User, Code, Briefcase, Mail, Gamepad2 } from "lucide-react";

interface WiiTileProps {
  type: "empty" | "blue" | "green" | "white";
  label?: string;
  image?: string;
  isProject?: boolean;
  onClick?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Skills": Code,
  "Proyectos": Briefcase,
  "Contacto": Mail,
};

const imageMap: Record<string, string> = {
  "Sobre Mí": "/aboutme.webp",
  "Skills": "/skills.webp",
};

export const WiiTile = ({ type, label, image, isProject, onClick }: WiiTileProps) => {
  const isEmpty = type === "empty";

  const playHoverSound = () => {
    if (isEmpty) return;
    const audio = new Audio('/hover.mp3');
    audio.volume = 1;
    audio.play();
  };

  const handleClick = () => {
    if (isEmpty) return;
    const audio = new Audio('/select.mp3');
    audio.volume = 1;
    audio.play();
    if (onClick) onClick();
  };

  const getBackgroundStyle = () => {
    switch (type) {
      case "blue":
        return "bg-wii-blue hover:bg-wii-blue-dark text-white";
      case "green":
        return "bg-wii-green hover:bg-wii-green-dark text-white";
      case "white":
        return "bg-card hover:bg-card/80 text-foreground";
      default:
        return "bg-tile-empty text-foreground";
    }
  };

  const IconComponent = label ? iconMap[label] : null;
  const tileImage = isProject ? image : (label ? imageMap[label] : null);

  return (
    <div
      className={`
        aspect-[1.4/1] 
        border-[3px] border-tile-border transition-all duration-200 
        flex flex-col items-center justify-center
        ${tileImage ? "" : "p-4"} shadow-sm overflow-hidden
        ${isEmpty ? "" : "cursor-pointer hover:shadow-md hover:scale-105"}
        ${getBackgroundStyle()}
      `}
      style={{ borderRadius: '40px / 30px' }}
      onMouseEnter={playHoverSound}
      onClick={handleClick}
    >
      {/* Proyecto con imagen de portada */}
      {isProject ? (
        <div className="w-full h-full relative">
          {/* Imagen de portada del proyecto - estilo carátula de juego */}
          {image ? (
            <img 
              src={image} 
              alt={label} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          {/* Fallback si no hay imagen */}
          <div 
            className="w-full h-full bg-gradient-to-b from-[#5ac8fa] to-[#0099cc] flex flex-col items-center justify-center"
            style={{ display: image ? 'none' : 'flex' }}
          >
            <Gamepad2 className="w-12 h-12 text-white mb-2" />
            <span className="text-white font-semibold text-center px-2">{label}</span>
          </div>
        </div>
      ) : tileImage ? (
        <div className="w-full h-full relative flex items-end justify-center">
          <div className="absolute top-2 md:top-4 left-0 right-0 text-sm md:text-lg font-semibold text-center text-gray-600">
            {label}
          </div>
          <img 
            src={tileImage} 
            alt={label} 
            className="max-h-[70%] md:max-h-[80%] w-auto object-contain"
          />
        </div>
      ) : (
        <>
          {IconComponent && (
            <div className="w-16 h-16 rounded-full bg-[#5ac8fa] flex items-center justify-center mb-3">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          )}
          {label && (
            <div className="text-lg font-semibold text-center text-gray-600">
              {label}
            </div>
          )}
        </>
      )}
    </div>
  );
};
