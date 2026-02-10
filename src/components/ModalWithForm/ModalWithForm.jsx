import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  children,
  handleSubmit,
  onClose,
  title,
  buttonText,
  name,
}) {
  return (
    <div className={`modal ${isOpen ? " modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="modal__close-btn modal__close-btn_type_form"
        ></button>
        <form onSubmit={handleSubmit} name={name} className="modal__form">
          {children}

          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
