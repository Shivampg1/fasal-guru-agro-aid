import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Cloud, Sun, Thermometer, Droplets, Wind } from "lucide-react";

const WeatherWidget = () => {
  // Mock weather data - in real app, this would come from API
  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Today", high: 32, low: 24, condition: "sunny" },
      { day: "Tomorrow", high: 30, low: 22, condition: "cloudy" },
      { day: "Wed", high: 29, low: 23, condition: "sunny" },
      { day: "Thu", high: 27, low: 21, condition: "rainy" },
    ]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-6 h-6 text-harvest" />;
      case "cloudy":
        return <Cloud className="w-6 h-6 text-weather" />;
      case "rainy":
        return <Droplets className="w-6 h-6 text-weather" />;
      default:
        return <Sun className="w-6 h-6 text-harvest" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-weather/10 to-accent/20 border-weather/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Cloud className="w-5 h-5 text-weather" />
          <span>Weather Forecast</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">{currentWeather.temperature}°C</div>
            <div className="text-muted-foreground">{currentWeather.condition}</div>
          </div>
          <Cloud className="w-12 h-12 text-weather" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-weather" />
            <span className="text-sm">Humidity: {currentWeather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-weather" />
            <span className="text-sm">Wind: {currentWeather.windSpeed} km/h</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">4-Day Forecast</h4>
          <div className="grid grid-cols-4 gap-2">
            {currentWeather.forecast.map((day, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-white/50">
                <div className="text-xs text-muted-foreground">{day.day}</div>
                <div className="my-1 flex justify-center">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-xs">
                  <span className="font-medium">{day.high}°</span>
                  <span className="text-muted-foreground">/{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;