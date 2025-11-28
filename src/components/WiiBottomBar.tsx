import { Settings, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { SettingsModal } from "./SettingsModal";

interface WiiBottomBarProps {
  isMuted?: boolean;
  onToggleMute?: () => void;
}

const playHoverSound = () => {
  const audio = new Audio('/hover.mp3');
  audio.volume = 1;
  audio.play();
};

const playSelectSound = () => {
  const audio = new Audio('/select.mp3');
  audio.volume = 1;
  audio.play();
};

export const WiiBottomBar = ({ isMuted = false, onToggleMute }: WiiBottomBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return { time: `${displayHours}:${displayMinutes}`, ampm };
  };

  const formatDate = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[date.getDay()];
    const month = date.getMonth() + 1;
    const dateNum = date.getDate();
    return `${day} ${month}/${dateNum}`;
  };

  const { time, ampm } = formatTime(currentTime);

  return (
    <div className="relative">
      {/* Time display - positioned at the top of the dip */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[4px] md:top-[8px] flex items-baseline gap-1 md:gap-2 z-30">
        <span className="text-2xl md:text-5xl font-light text-foreground/60 tracking-[0.15em]" style={{ fontFamily: "'DSEG7 Classic', 'Segment7', monospace" }}>
          {time}
        </span>
        <span className="hidden md:inline text-xl font-light text-foreground/40">
          {ampm}
        </span>
      </div>
      
      {/* Date display - positioned in the middle of the lowered section */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[45px] md:top-[95px] z-30">
        <div className="text-sm md:text-2xl font-semibold text-muted-foreground">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Bottom bar with curved center dip */}
      <div className="relative h-20 md:h-40">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          {/* Main bar shape with smooth curved dip in center - flat bottom section */}
          <path
            d="M 0 4 
               L 380 4 
               C 420 4, 450 70, 480 70 
               L 720 70 
               C 750 70, 780 4, 820 4 
               L 1200 4 
               L 1200 150 
               L 0 150 
               Z"
            fill="hsl(var(--bottom-bar))"
          />
          {/* Blue border line that follows the curve */}
          <path
            d="M 0 4 
               L 380 4 
               C 420 4, 450 70, 480 70 
               L 720 70 
               C 750 70, 780 4, 820 4 
               L 1200 4"
            fill="none"
            stroke="hsl(var(--bottom-bar-border))"
            strokeWidth="4"
          />
        </svg>

        {/* Bottom bar content */}
        <div className="absolute inset-0 flex items-center justify-between px-3 md:px-12 pt-1 md:pt-4">
          {/* Left icon */}
          <div className="flex items-center">
            <a 
              href="https://github.com/RubenMRDev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-card border-2 md:border-4 border-bottom-bar-border flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
              onMouseEnter={playHoverSound}
              onClick={playSelectSound}
            >
              <span className="text-muted-foreground font-bold text-[10px] md:text-base">RMR</span>
            </a>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => {
                playSelectSound();
                if (onToggleMute) onToggleMute();
              }}
              onMouseEnter={playHoverSound}
              className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-card border-2 md:border-4 border-bottom-bar-border flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 md:w-9 md:h-9 text-foreground/70" />
              ) : (
                <Volume2 className="w-5 h-5 md:w-9 md:h-9 text-foreground/70" />
              )}
            </button>
            <button 
              className="w-10 h-10 md:w-20 md:h-20 rounded-full bg-card border-2 md:border-4 border-bottom-bar-border flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playSelectSound();
                setShowSettings(true);
              }}
            >
              <Settings className="w-5 h-5 md:w-9 md:h-9 text-foreground/70" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};
