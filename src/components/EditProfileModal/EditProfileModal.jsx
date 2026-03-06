import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, currentUser, handleEditProfileSubmit }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name ?? "",
        avatar: currentUser.avatar ?? "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEditProfileSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Change profile data"
      buttonText="Save"
      name="edit-profile-form"
      handleSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="edit-profile-name-input" className="modal__label">
          Name
          <input
            id="edit-profile-name-input"
            type="text"
            className="modal__input"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="edit-profile-avatar-input" className="modal__label">
          Avatar URL
          <input
            id="edit-profile-avatar-input"
            type="url"
            className="modal__input"
            name="avatar"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default EditProfileModal;
