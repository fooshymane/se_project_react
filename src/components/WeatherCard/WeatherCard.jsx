import cloudy from "../../assets/cloudy.svg";
import "./weatherCard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <img src={cloudy} alt="Cloudy weather" className="weather-card_image" />
      <p className="weather-card__temp">75&deg; F</p>
    </section>
  );
}

export default WeatherCard;
