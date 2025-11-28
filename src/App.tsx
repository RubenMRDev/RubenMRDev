import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HealthSafetyScreen } from "./components/HealthSafetyScreen";

const queryClient = new QueryClient();

// Audio context for managing background music
interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

export const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
});

export const useAudio = () => useContext(AudioContext);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <img
      src="/cursor.webp"
      alt=""
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: position.x - 10,
        top: position.y - 2,
        width: '40px',
        height: 'auto',
      }}
    />
  );
};

const App = () => {
  const [showHealthScreen, setShowHealthScreen] = useState(true);
  const [bgMusic, setBgMusic] = useState<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const handleContinue = (music: HTMLAudioElement) => {
    setBgMusic(music);
    setShowHealthScreen(false);
  };

  const toggleMute = () => {
    if (bgMusic) {
      bgMusic.muted = !bgMusic.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AudioContext.Provider value={{ isMuted, toggleMute }}>
        <TooltipProvider>
          <CustomCursor />
          {showHealthScreen && (
            <HealthSafetyScreen onContinue={handleContinue} />
          )}
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AudioContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
