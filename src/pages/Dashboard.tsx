import { useState } from "react";
import { Leaf, Bug, CloudSun, Bot, Upload } from "lucide-react";
import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";
import WeatherWidget from "../components/WeatherWidget";
import UploadSection from "../components/UploadSection";
import heroImage from "../assets/hero-farming.jpg";
import { useToast } from "../hooks/use-toast";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSoilUpload = (file: File) => {
    toast({
      title: "Soil Analysis Started",
      description: "Your soil image is being analyzed for nutrient content and fertilizer recommendations.",
    });
  };

  const handleCropUpload = (file: File) => {
    toast({
      title: "Disease Detection Started", 
      description: "Your crop image is being analyzed for disease detection and treatment recommendations.",
    });
  };

  const features = [
    {
      id: "soil",
      title: "Soil Analysis",
      description: "Upload soil images for nutrient analysis and fertilizer recommendations",
      icon: Leaf,
      gradient: "bg-gradient-to-br from-soil to-harvest",
      buttonText: "Analyze Soil",
      onClick: () => setActiveSection(activeSection === "soil" ? null : "soil")
    },
    {
      id: "disease",
      title: "Disease Detection",
      description: "Detect crop diseases from images and get treatment suggestions",
      icon: Bug,
      gradient: "bg-gradient-to-br from-crop to-primary",
      buttonText: "Check Disease",
      onClick: () => setActiveSection(activeSection === "disease" ? null : "disease")
    },
{
  id: "weather",
  title: "Weather Prediction",
  description: "Get weather forecasts based on historical data analysis",
  icon: CloudSun,
  gradient: "bg-gradient-to-br from-weather to-accent",
  buttonText: "View Forecast",
  onClick: () => window.open("https://weather-app-navy-nine-35.vercel.app", "_blank")
},

{
  id: "jarvis",
  title: "Jarvis AI Assistant",
  description: "Ask farming questions through multilingual voice assistant",
  icon: Bot,
  gradient: "bg-gradient-to-br from-primary to-crop",
  buttonText: "Talk with Jarvis",
  onClick: () => window.open("https://jarvis-flask-alpha.vercel.app/", "_blank")
}




  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Agricultural landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-crop/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-harvest">FasalGuru</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your intelligent farming companion for crop yield prediction, soil analysis, 
            disease detection, and weather forecasting
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Smart Farming Tools</h2>
            <p className="text-muted-foreground">Choose a feature to get started with intelligent crop management</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
                buttonText={feature.buttonText}
                onClick={feature.onClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {activeSection && (
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            {activeSection === "soil" && (
              <div className="grid md:grid-cols-2 gap-6">
                <UploadSection
                  title="Soil Image Upload"
                  description="Upload clear images of your soil for detailed nutrient analysis"
                  type="soil"
                  onUpload={handleSoilUpload}
                />
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Soil Analysis Results</h3>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-muted-foreground">Upload a soil image to see detailed analysis including:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Nutrient levels (NPK)</li>
                      <li>• pH levels</li>
                      <li>• Organic matter content</li>
                      <li>• Fertilizer recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "disease" && (
              <div className="grid md:grid-cols-2 gap-6">
                <UploadSection
                  title="Crop Image Upload"
                  description="Upload images of affected crop leaves or plants for disease detection"
                  type="crop"
                  onUpload={handleCropUpload}
                />
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Disease Detection Results</h3>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-muted-foreground">Upload a crop image to identify:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Disease type and severity</li>
                      <li>• Treatment recommendations</li>
                      <li>• Preventive measures</li>
                      <li>• Expected recovery timeline</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "weather" && (
              <div className="grid md:grid-cols-2 gap-6">
                <WeatherWidget />
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Weather Insights</h3>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-muted-foreground">Our AI analyzes weather patterns to provide:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• 7-day weather forecasts</li>
                      <li>• Rainfall predictions</li>
                      <li>• Optimal planting times</li>
                      <li>• Harvest recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
