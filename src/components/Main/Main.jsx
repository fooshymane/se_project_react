import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";




function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  const contextValue = useContext(CurrentTemperatureUnitContext);
 
console.log (weatherData);
  
  
   const filteredClothingItems = clothingItems.filter(
     (item) => item.weather === weatherData.weatherType)


return (
    <main className="main">
      <WeatherCard weatherData={weatherData}/>
      <p className="main__text">Today is  {weatherData.temp[contextValue.currentTempUnit]}&deg; {" "}
        {contextValue.currentTempUnit} / You may want to wear:</p>
      <ul className="main__card-list">
         {filteredClothingItems.map((item) => {
          return(
          <ItemCard 
          key={item._id} 
          data={item} 
          onCardClick={handleOpenItemModal}
          />
         )})}
      </ul>
    </main>
  );
}

export default Main;
