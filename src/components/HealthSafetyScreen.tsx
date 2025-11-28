import { useState, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { PiHandTap } from "react-icons/pi";
import { useLanguage } from "@/lib/i18n";

interface HealthSafetyScreenProps {
  onContinue: (bgMusic: HTMLAudioElement) => void;
}

export const HealthSafetyScreen = ({ onContinue }: HealthSafetyScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useLanguage();

  const handleClick = () => {
    if (isExiting) return;
    
    // Play start sound
    audioRef.current = new Audio('/start.mp3');
    audioRef.current.play();
    
    // Start background music (low volume)
    const bgMusic = new Audio('/music.mp3');
    bgMusic.volume = 0.08;
    bgMusic.loop = true;
    bgMusic.play();
    
    setIsExiting(true);
    setTimeout(() => {
      onContinue(bgMusic);
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-[9998] flex flex-col items-center justify-center text-white transition-opacity duration-500 px-6 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClick}
    >
      {/* Warning Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0" />
          <span className="text-xl md:text-2xl font-bold tracking-wide">{t.warningTitle1}</span>
        </div>
        <span className="text-xl md:text-2xl font-bold tracking-wide">{t.warningTitle2}</span>
      </div>

      {/* Main Text */}
      <div className="text-center mb-12 text-sm leading-relaxed">
        <p className="mb-1">{t.beforePlaying1}</p>
        <p className="mb-1">{t.beforePlaying2}</p>
        <p>{t.beforePlaying3}</p>
      </div>

      {/* Press to Continue */}
      <div className="flex items-center justify-center gap-3 text-lg">
        <img 
          src="/clicktostart.webp" 
          alt="Click" 
          className="hidden md:block w-8 h-8 object-contain"
        />
        <PiHandTap className="md:hidden w-8 h-8 text-white" />
        <span className="hidden md:inline">{t.clickToContinue}</span>
        <span className="md:hidden">{t.tapToContinue}</span>
      </div>
    </div>
  );
};
