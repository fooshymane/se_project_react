import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, handleLoginSubmit, onSwitchToRegister }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoginSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log in"
      buttonText="Log in"
      name="login-form"
      handleSubmit={handleSubmit}
      secondaryButtonText="Sign up"
      onSecondaryClick={onSwitchToRegister}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="login-email-input" className="modal__label">
          Email
          <input
            id="login-email-input"
            type="email"
            className="modal__input"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="login-password-input" className="modal__label">
          Password
          <input
            id="login-password-input"
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

export default LoginModal;
