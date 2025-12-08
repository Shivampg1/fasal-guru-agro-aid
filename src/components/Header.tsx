import { Mic, MicOff, User, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceAssistant = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 1500);

    const url = "https://jarvis-flask-alpha.vercel.app/";
    const win = window.open(url, "_blank", "noopener,noreferrer");

    if (!win) {
      window.location.href = url;
    }
  };

  const getLocation = () => {
    const url = "https://coordinates-app.netlify.app/";
    const win = window.open(url, "_blank", "noopener,noreferrer");

    if (!win) {
      window.location.href = url;
    }
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-crop rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">FG</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">FasalGuru</h1>
            <p className="text-sm text-muted-foreground">Smart Farming Assistant</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={toggleVoiceAssistant}
            className="flex items-center space-x-2"
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span>{isListening ? "Listening..." : "Ask Jarvis"}</span>
          </Button>

          
        </div>
      </div>
    </header>
  );
};

export default Header;
