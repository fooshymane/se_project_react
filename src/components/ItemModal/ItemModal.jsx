import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";


function ItemModal({ card, isOpen, onClose, onOpenDeleteConfirmation }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;

  return (
    <div className={`modal${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container">
        <button type="button" className="modal__close-btn" onClick={onClose}>
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__text">{card.weather}</p>
          {isOwn && (
            <button
              onClick={onOpenDeleteConfirmation}
              className="modal__delete-button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;