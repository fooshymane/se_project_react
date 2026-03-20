import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import "./App.css";
import { getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken, updateProfile } from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const isLoggedIn = !!currentUser;

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment-modal");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register-modal");
  }

  function handleOpenLoginModal() {
    setActiveModal("login-modal");
  }

  function handleOpenDeleteConfirmation() {
    setActiveModal("delete-card");
  }

  function handleOpenEditProfileModal() {
    setActiveModal("edit-profile-modal");
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
    const token = localStorage.getItem("jwt");
    addItem(inputValues, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem(item) {
    const token = localStorage.getItem("jwt");
    deleteItem(item._id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        closeActiveModal();
      })
      .catch(console.error);
  }

  function handleCardLike({ _id, isLiked }) {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    const likeRequest = isLiked ? removeCardLike : addCardLike;

    likeRequest(_id, token)
      .then((updatedItem) => {
        setClothingItems((prev) =>
          prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );
      })
      .catch(console.error);
  }

  function handleRegisterSubmit(values) {
    signup(values)
      .then(() => signin({ email: values.email, password: values.password }))
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
        return Promise.reject(new Error("No token in response"));
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  }

  function handleLoginSubmit(values) {
    signin(values)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
        return Promise.reject(new Error("No token in response"));
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  }

  function handleEditProfileSubmit({ name, avatar }) {
    const token = localStorage.getItem("jwt");
    updateProfile({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsCheckingToken(false);
      return;
    }
    checkToken(token)
      .then((user) => setCurrentUser(user))
      .catch(() => localStorage.removeItem("jwt"))
      .finally(() => setIsCheckingToken(false));
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
            weatherData={weatherData}
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            handleOpenRegisterModal={handleOpenRegisterModal}
            handleOpenLoginModal={handleOpenLoginModal}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isCheckingToken={isCheckingToken}
                >
                  <Profile
                    clothingItems={clothingItems}
                    handleOpenItemModal={handleOpenItemModal}
                    handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                    onCardLike={handleCardLike}
                    onSignOut={handleSignOut}
                    onEditProfile={handleOpenEditProfileModal}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "item-modal"}
            onClose={closeActiveModal}
            onOpenDeleteConfirmation={handleOpenDeleteConfirmation}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment-modal"}
            onClose={closeActiveModal}
            handleAddItemSubmit={handleAddItemSubmit}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-card"}
            onClose={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
            itemToDelete={selectedCard}
          />
          <RegisterModal
            isOpen={activeModal === "register-modal"}
            onClose={closeActiveModal}
            handleRegisterSubmit={handleRegisterSubmit}
            onSwitchToLogin={handleOpenLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login-modal"}
            onClose={closeActiveModal}
            handleLoginSubmit={handleLoginSubmit}
            onSwitchToRegister={handleOpenRegisterModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile-modal"}
            onClose={closeActiveModal}
            currentUser={currentUser}
            handleEditProfileSubmit={handleEditProfileSubmit}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
