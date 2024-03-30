import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import './SignupFormModal.css'

function SignupFormModal() {
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        password,
        username
      })
    );

    // if (serverResponse.errors) {
    //   setErrors(serverResponse.errors);
    //   return
    // } 
    // closeModal();

    if (serverResponse.errors) {
      setErrors(serverResponse.errors);
  } else {
    closeModal();
  }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Sign Up</h1>
      {errors.undefined && <p className="error">{errors.undefined}</p>}
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
        {errors.email && <p className="error">{errors.email}</p>}
        <label className="login-label">
          Username
          <input className="login-input"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label className="login-label">
          Password
          <input className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label className="login-label">
          Confirm Password
          <input className="login-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button className='login-button' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
