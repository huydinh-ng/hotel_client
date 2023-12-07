import { Link } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import styles from "./Title.module.css";

//Component title ở trên của navbar có chưa chữ 'booking website' và phần đăng nhập
function Title() {
  return (
    <div className={styles.header}>
      <Link to={"/"} className={styles.title}>
        Booking Website
      </Link>
      <LoginRegister></LoginRegister>
    </div>
  );
}
export default Title;
