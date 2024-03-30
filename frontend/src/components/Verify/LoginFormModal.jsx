import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
      );
      
      if (serverResponse.errors) {
        setErrors(serverResponse.errors);
    } else {
      closeModal();
    }
  };


  const loginDemoUser = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogin({ email:"demo@user.io", password: "password"})).then(() => closeModal())
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className="login-label">
          Email
          <input className="login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-label">
          Password
          <input className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        {errors.credential && <p className="error">{errors.credential}</p>}
        {errors.credential && <p className="error">{errors.password}</p>}
        <button className='login-button' type="submit">Log In</button>
        <div className="login-button" onClick={(e) => loginDemoUser(e)}>
      {`Login Demo User`}
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
