import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherConditionImages } from "../../utils/constants";
import "./weatherCard.css";

function WeatherCard({weatherData}) {
  const contextValue = useContext(CurrentTemperatureUnitContext);
  
  return (
    <section className="weather-card">
      <img 
        src={weatherConditionImages["day"][weatherData.weatherCondition]?.image ?? weatherConditionImages["day"].clouds.image} 
        alt="Weather" 
        className="weather-card_image" 
      />
      <p className="weather-card__temp">
        {weatherData.temp[contextValue.currentTempUnit]}&deg; {" "}
        {contextValue.currentTempUnit}

      </p>
    </section>
  );
}

export default WeatherCard;
