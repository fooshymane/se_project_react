import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ ClothingItems }) {
  return (
    <main className="main">
      <WeatherCard />
      <p className="main__text">Today is 75 F / You may want to wear:</p>
      <ul className="main__card-list">
        {ClothingItems.map((item) => {
          return <ItemCard key={item._id} data={item} />;
        })}
      </ul>
    </main>
  );
}

export default Main;
