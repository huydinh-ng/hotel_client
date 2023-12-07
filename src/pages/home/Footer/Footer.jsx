import styles from "./Footer.module.css";
//Lấy data từ file json
import footers from "../../../data/footer.json";

//Component cho phần footer
const Footer = () => {
  return (
    <div className={styles.container}>
      {footers.map((footer) => (
        <div key={footer.col_number} className={styles.col}>
          {footer.col_values.map((value, index) => (
            <p key={index} className={styles.item}>
              {value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;
