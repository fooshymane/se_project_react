import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/defaultClothingItems";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";
import { apiKey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({"name": "", temp: "0"});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function closeActiveModal() {
    setActiveModal("");
  }



    function handleTempUnitChange() {
    if (currentTempUnit == "F") {
        setCurrentTempUnit ("C");
    } else {
        setCurrentTempUnit("F");
    }
}


useEffect(() => {
  getWeatherData()
  .then((data) => {
    setWeatherData(data);
  })
  .catch(console.error);
}, []);




useEffect(() => {
setClothingItems(defaultClothingItems);
}, []);




  return (
    <CurrentTemperatureUnitContext.Provider 
    value={{currentTempUnit, handleTempUnitChange}}>
    <div className="app">
      <Header 
      weatherData={weatherData}
      handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
      />
      <Footer />
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "item-modal"}
        onClose={closeActiveModal}
      />
      <ModalWithForm
        isOpen={activeModal === "add-garment-modal"}
        onClose={closeActiveModal}
        title={"New garment"}
        buttonText={"Add garment"}
        name={"add-garment-form"}
      >
        <label className="modal__label">Name</label>
        <input type="text" placeholder="Name" className="modal__input" />
        <label className="modal__label">Image URL</label>
        <input type="url" placeholder="Image URL" className="modal__input" />
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <div className="modal__radio-group">
            <input
              className="modal__radio-input"
              type="radio"
              id="hot"
              name="weather"
              value="hot"
            />
            <label className="modal__label" htmlFor="hot">
              Hot
            </label>
            <input
              className="modal__radio-input"
              type="radio"
              id="warm"
              name="weather"
              value="warm"
            />
            <label className="modal__label" htmlFor="warm">
              Warm
            </label>
            <input
              className="modal__radio-input"
              type="radio"
              id="cold"
              name="weather"
              value="cold"
            />
            <label className="modal__label" htmlFor="cold">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
