import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const defaultLogin = async (e) => {
    e.preventDefault();

    await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    closeModal();
  };

  return (
    <div className="login-container">
      <div className="login-top">
        <h1>Log In</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-bottom">
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && (
            <p style={{ margin: "0", fontSize: "12px", color: "#ff00bb" }}>
              {errors.email}
            </p>
          )}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && (
            <p style={{ margin: "0", fontSize: "12px", color: "#ff00bb" }}>
              {errors.password}
            </p>
          )}
          <div className="login-button-container">
            <button type="submit" className="login-button1">Log In</button>
            <button onClick={defaultLogin} className="login-button2">Demo User</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
