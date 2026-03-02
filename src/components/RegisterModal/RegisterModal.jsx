import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, handleRegisterSubmit, onSwitchToLogin }) {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegisterSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      buttonText="Sign up"
      name="register-form"
      handleSubmit={handleSubmit}
      secondaryButtonText="Log in"
      onSecondaryClick={onSwitchToLogin}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="register-name-input" className="modal__label">
          Name
          <input
            id="register-name-input"
            type="text"
            className="modal__input"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="register-avatar-input" className="modal__label">
          Avatar URL
          <input
            id="register-avatar-input"
            type="url"
            className="modal__input"
            name="avatar"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="register-email-input" className="modal__label">
          Email
          <input
            id="register-email-input"
            type="email"
            className="modal__input"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="register-password-input" className="modal__label">
          Password
          <input
            id="register-password-input"
            type="password"
            className="modal__input"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default RegisterModal;
