import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const playSelectSound = () => {
  const audio = new Audio('/select.mp3');
  audio.volume = 1;
  audio.play();
};

const playHoverSound = () => {
  const audio = new Audio('/hover.mp3');
  audio.volume = 1;
  audio.play();
};

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  // Resetear animación cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    playSelectSound();
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleLanguageChange = (lang: "es" | "en") => {
    playSelectSound();
    setLanguage(lang);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50">
      <div 
        className={`bg-[hsl(210,15%,94%)] rounded-[30px] p-6 md:p-8 w-[90%] max-w-md shadow-2xl transition-all duration-300 ${
          isAnimating ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b-2 border-[#5ac8fa] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5ac8fa] flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-600">{t.settings}</h2>
          </div>
          <button
            onClick={handleClose}
            onMouseEnter={playHoverSound}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-100 to-gray-300 flex items-center justify-center border-2 border-gray-400 hover:scale-105 transition-transform"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Language Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">{t.language}</h3>
          <div className="flex gap-4">
            <button
              onClick={() => handleLanguageChange("es")}
              onMouseEnter={playHoverSound}
              className={`flex-1 py-3 px-4 rounded-full text-lg font-semibold transition-all border-2 ${
                language === "es"
                  ? "bg-[#5ac8fa] text-white border-[#5ac8fa]"
                  : "bg-gradient-to-b from-gray-100 to-gray-300 text-gray-600 border-gray-400 hover:scale-105"
              }`}
            >
              🇪🇸 {t.spanish}
            </button>
            <button
              onClick={() => handleLanguageChange("en")}
              onMouseEnter={playHoverSound}
              className={`flex-1 py-3 px-4 rounded-full text-lg font-semibold transition-all border-2 ${
                language === "en"
                  ? "bg-[#5ac8fa] text-white border-[#5ac8fa]"
                  : "bg-gradient-to-b from-gray-100 to-gray-300 text-gray-600 border-gray-400 hover:scale-105"
              }`}
            >
              🇬🇧 {t.english}
            </button>
          </div>
        </div>

        {/* Close button */}
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            onMouseEnter={playHoverSound}
            className="px-8 py-3 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full text-lg font-semibold text-gray-600 shadow-lg hover:scale-105 transition-transform border-2 border-gray-400"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
