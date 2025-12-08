import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CloudSun, Bot, Upload, FileText, BarChart3, SatelliteDish} from "lucide-react";
import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";
import WeatherWidget from "../components/WeatherWidget";
import heroImage from "../assets/hero-farming.jpg";
import { useToast } from "../hooks/use-toast";

//  IMPORT BACKEND API FUNCTIONS
import { enrolFarmer, submitClaim, getYield } from "../lib/api";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // ---------------- STATES FOR INSURANCE FORMS ----------------
  // const [enrol, setEnrol] = useState({
  //   farmer_name: "",
  //   aadhar_number: "",
  //   mobile_number: "",
  //   state: "",
  //   district: "",
  //   crop: "",
  //   farm_size_acres: "",
  //   season: "",
  // });

  // const [claim, setClaim] = useState({
  //   policy_id: "",
  //   farmer_name: "",
  //   damage_reason: "",
  //   loss_percentage: "",
  //   date: "",
  // });

  // const [yieldReq, setYieldReq] = useState({
  //   farm_location: "",
  //   crop_type: "",
  //   season: "",
  // });

  // const handleChange = (setter: any, field: string, value: any) => {
  //   setter((prev: any) => ({ ...prev, [field]: value }));
  // };

  // ---------------- FEATURES SECTION ----------------
  const features = [
    {
      id: "weather",
      title: "Weather Prediction",
      description: "Get detailed weather forecasts for your farm location",
      icon: CloudSun,
      gradient: "bg-gradient-to-br from-weather to-accent",
      buttonText: "View Forecast",
      onClick: () => window.open("https://weather-app-navy-nine-35.vercel.app", "_blank"),
    },
    
    {
    id: "dssat-yield",
    title: "Yield Estimator (DSSAT)",
    description: "Estimate crop yield using DSSAT-based models and farm data.",
    icon: BarChart3, // or any other icon you prefer
    gradient: "bg-gradient-to-br from-harvest to-primary",
    buttonText: "Open DSSAT",
    onClick: () => window.open("https://huggingface.co/spaces/cropdiseasedetection/dssat-detection-yield-prediction", "_blank"),
  },
    {
    id: "ndvi",
    title: "Satellite NDVI",
    description: "High-resolution NDVI insights for crop health and stress detection.",
    icon: SatelliteDish,
    gradient: "bg-gradient-to-br from-weather to-harvest",
    buttonText: "View NDVI",
    onClick: () => window.open("https://huggingface.co/spaces/cropdiseasedetection/satellite-crop-monitoring", "_blank"),
  },
    { 
      id:"soil-analysis", title:"Soil Analysis", description:"Analyze soil health & fertilizer suggestion",
      icon:Upload,
      gradient: "bg-gradient-to-br from-weather to-harvest",
      buttonText: "View Soil Analysis",
      onClick: () => window.open("https://huggingface.co/spaces/soildetect/soil-detection-app", "_blank"),
    },
    {
    id: "Jarvis",
    title: "Ask Jarvis",
    description: "Ask your Guru about anything.",
    icon: Bot,
    gradient: "bg-gradient-to-br from-weather to-harvest",
    buttonText: "Ask Jarvis",
    onClick: () => window.open("https://jarvis1-wgir.onrender.com", "_blank"),
  },
    // {
    //   id: "insurance",
    //   title: "PMFBY Insurance",
    //   description: "Enrol farmers, submit claims and get yield estimation",
    //   icon: FileText,
    //   gradient: "bg-gradient-to-br from-accent to-primary",
    //   buttonText: "Open Insurance",
    //   onClick: () => setActiveSection("insurance"),
    // },
    { id:"insurance", title:"PMFBY Insurance", description: "Enroll farmers, claim & yield",
      icon: FileText, 
      stats:"Gov Scheme",
      gradient: "bg-gradient-to-br from-accent to-primary",
      buttonText: "Open Insurance",
      onClick: () => navigate("/insurance") },
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
            Welcome to <span className="text-harvest">FASAL Guru</span>
          </h1>
          <p className="text-4xl md:text-2xl text-white mb-6">
            (Farm Advisory System for Agricultural Land)
          </p>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Smart farming solutions for soil analysis, disease detection, weather
            prediction and PMFBY insurance services.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </section>

      {/* ---------------------- INSURANCE SECTION ---------------------- */}
      {activeSection === "insurance" && (
        <section className="px-6 py-16 bg-muted/30">
          <div className="max-w-3xl mx-auto space-y-10 p-6 bg-white border rounded-xl">

            <h2 className="text-3xl font-bold mb-4">PMFBY Insurance Services</h2>

            {/* ENROLMENT */}
            <div className="border p-5 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Farmer Enrolment</h3>

              {Object.keys(enrol).map((field) => (
                <input
                  key={field}
                  className="border p-2 w-full mb-2 rounded"
                  placeholder={field}
                  value={(enrol as any)[field]}
                  onChange={(e) => handleChange(setEnrol, field, e.target.value)}
                />
              ))}

              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  const res = await enrolFarmer(enrol);
                  toast({ title: "Enrolment Response", description: JSON.stringify(res) });
                }}
              >
                Enrol Farmer
              </button>
            </div>

            {/* CLAIM SUBMISSION */}
            <div className="border p-5 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Submit Claim</h3>

              {Object.keys(claim).map((field) => (
                <input
                  key={field}
                  className="border p-2 w-full mb-2 rounded"
                  placeholder={field}
                  value={(claim as any)[field]}
                  onChange={(e) => handleChange(setClaim, field, e.target.value)}
                />
              ))}

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  const res = await submitClaim(claim);
                  toast({ title: "Claim Response", description: JSON.stringify(res) });
                }}
              >
                Submit Claim
              </button>
            </div>

            {/* YIELD PREDICTION */}
            <div className="border p-5 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Yield Estimation</h3>

              {Object.keys(yieldReq).map((field) => (
                <input
                  key={field}
                  className="border p-2 w-full mb-2 rounded"
                  placeholder={field}
                  value={(yieldReq as any)[field]}
                  onChange={(e) => handleChange(setYieldReq, field, e.target.value)}
                />
              ))}

              <button
                className="bg-orange-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  const res = await getYield(yieldReq);
                  toast({ title: "Yield Prediction", description: JSON.stringify(res) });
                }}
              >
                Get Yield Prediction
              </button>
            </div>

          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
