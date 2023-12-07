import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../home/Navbar/Title/Title";
import styles from "./Register.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    fullName: undefined,
    phoneNumber: undefined,
    email: undefined,
    isAdmin: false,
  });
  const [isErr, setIsErr] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setIsErr(false);
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", credentials);
      console.log(res);
      if (res.status === 200) {
        const { isAdmin, ...other } = credentials;
        navigate("/login");
      }
    } catch (err) {
      setIsErr(true);
    }
  };
  return (
    <div className={styles.Container}>
      <div className={styles.navbar}>
        <Title />
      </div>
      <div className={styles.login}>
        <h2>Sign Up</h2>
        <div className={styles.Contain}>
          <input
            type="text"
            placeholder="username*"
            id="username"
            onChange={handleChange}
            className={styles.Input}
          />
          <input
            type="password"
            placeholder="password*"
            id="password"
            onChange={handleChange}
            className={styles.Input}
          />
          <input
            type="text"
            placeholder="Full Name"
            id="fullName"
            onChange={handleChange}
            className={styles.Input}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            id="phoneNumber"
            onChange={handleChange}
            className={styles.Input}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className={styles.Input}
          />
          <button onClick={handleClick} className={styles.Button}>
            Create Account
          </button>
          {isErr &&
            (((!credentials.password || !credentials.username) && (
              <p style={{ color: "red" }}>
                username & password not empty! Please check infomation on
                inputs!
              </p>
            )) ||
              (credentials.username && (
                <p style={{ color: "red" }}>This user has already existed!</p>
              )))}
        </div>
      </div>
    </div>
  );
};

export default Login;
