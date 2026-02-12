import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";
import { apiKey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../../utils/api";






function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleOpenDeleteConfirmation() {
    setActiveModal("delete-card");
  }

  function closeActiveModal() {
    setActiveModal("");
  }

  function handleTempUnitChange() {
    if (currentTempUnit == "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }


function handleAddItemSubmit(inputValues) {
  addItem(inputValues)
  .then((data) => {
  setClothingItems([data, ...clothingItems]);
  closeActiveModal();
})
}


 function handleDeleteItem(item) {
    deleteItem(item._id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        closeActiveModal();
      })
      .catch(console.error);
  }









  

useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  
  
  
  useEffect(() => {
    getItems()
    .then((items) => setClothingItems([...items].reverse()))
    .catch(console.error);
  
  }, []);

  
  
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <div className="app">
        <Header
          weatherData={weatherData}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          ></Route>
          <Route path="/profile" 
          element={<Profile 
            clothingItems={clothingItems} 
             handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            />}
            
          ></Route>
        </Routes>

        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          onClose={closeActiveModal}
          onOpenDeleteConfirmation={handleOpenDeleteConfirmation}
        />
        <AddItemModal isOpen={activeModal === "add-garment-modal"}
        onClose={closeActiveModal}
        handleAddItemSubmit={handleAddItemSubmit}
      />
      <DeleteConfirmationModal
        isOpen={activeModal === "delete-card"}
        onClose={closeActiveModal}
        handleDeleteItem={handleDeleteItem}
        itemToDelete={selectedCard}
      />
      
      
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
