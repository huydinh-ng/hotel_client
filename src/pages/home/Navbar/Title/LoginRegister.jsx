import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import styles from "./LoginRegister.module.css";
//Component đăng nhập chứa 2 thành phần là đăng ký và đăng nhập
const LoginRegister = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className={styles.loginregister}>
      {user ? (
        <div className={styles.loginContainer}>
          <p className={styles.name}>{user.username}</p>
          <Link to={"/transaction"} className={styles.register}>
            Transactions
          </Link>
          <div className={styles.register} onClick={handleLogout}>
            Logout
          </div>
        </div>
      ) : (
        <>
          <Link to={"/register"} className={styles.register}>
            Sign Up
          </Link>
          <Link to={"/login"} className={styles.login}>
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default LoginRegister;
