import styles from "./FormRegister.module.css";

//Component cho phần form đăng ký
const FormRegister = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Save time, save money!</h2>
      <p>Sign up and we'll send the best deals to you</p>
      <form className={styles.form}>
        <input
          type="email"
          placeholder="Your Email"
          className={styles.input}
        ></input>
        <button className={styles.btn}>Subscribe</button>
      </form>
    </div>
  );
};

export default FormRegister;
