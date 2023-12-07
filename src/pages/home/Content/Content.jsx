import ShowCity from "./ShowCity/ShowCity";
import TypeHotel from "./TypeHotel/TypeHotel";
import Hotel from "./Hotel/Hotel";
import styles from "./Content.module.css";

//Component nội dung chính trong trang home
function Content() {
  return (
    <div className={styles.container}>
      <ShowCity />
      <TypeHotel />
      <Hotel></Hotel>
    </div>
  );
}

export default Content;
