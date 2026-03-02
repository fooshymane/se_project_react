import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, handleOpenItemModal, handleOpenAddGarmentModal }) {
  const currentUser = useContext(CurrentUserContext);
  const currentUserItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <section className="clothes-section">
      <div className="clothes-section__row clothes-section__text">
        Your items
        <button
          onClick={handleOpenAddGarmentModal}
          className="clothes-section__btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {currentUserItems.map((item) => (
          <ItemCard
            key={item._id}
            data={item}
            onCardClick={handleOpenItemModal}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;