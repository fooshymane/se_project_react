import { useContext } from "react";
import "./ItemCard.css";
import likeIcon from "../../assets/like.svg";
import unlikeIcon from "../../assets/unlike.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ data, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = data.likes?.some((likeUser) => {
    const likeId =
      typeof likeUser === "string" ? likeUser : likeUser?._id || likeUser?.id;
    return likeId === currentUser?._id;
  });

  function handleOpenCard() {
    onCardClick(data);
  }

  function handleLikeClick(e) {
    e.stopPropagation();
    onCardLike({ _id: data._id, isLiked });
  }

  return (
    <li className="card">
      <div className="card__top-row">
        <h2 className="card__title">{data.name}</h2>
        {currentUser && (
          <button className="card__like-button" type="button" onClick={handleLikeClick}>
            <img
              className="card__like-icon"
              src={isLiked ? likeIcon : unlikeIcon}
              alt={isLiked ? "Unlike item" : "Like item"}
            />
          </button>
        )}
      </div>
      <img
        src={data.imageUrl}
        alt={data.name}
        className="card__image"
        onClick={handleOpenCard}
      />
    </li>
  );
}

export default ItemCard;
