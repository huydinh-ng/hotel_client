import useFetch from "../../../../hooks/useFetch";
import styles from "./ShowCity.module.css";
import imageHN from "../../../../dataAssignment02/City Image/Ha Noi.jpg";
import imageHCM from "../../../../dataAssignment02/City Image/HCM.jpg";
import imageDN from "../../../../dataAssignment02/City Image/Da Nang.jpg";

//Component phần hiển thị hình ảnh city
const ShowCity = () => {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=Ha Noi,Ho Chi Minh,Da Nang"
  );

  return (
    <>
      {loading ? (
        <p>Loading please wait</p>
      ) : (
        <div className={styles.container}>
          <div className={styles.containerItem}>
            <img src={imageHN} alt="Ha Noi" className={styles.item}></img>
            <h3>Ha Noi</h3>
            <p>{data[0]} properties</p>
          </div>

          <div className={styles.containerItem}>
            <img src={imageHCM} alt="Ho Chi Minh" className={styles.item}></img>
            <h3>Ho Chi Minh</h3>
            <p>{data[1]} properties</p>
          </div>

          <div className={styles.containerItem}>
            <img src={imageDN} alt="Da Nang" className={styles.item}></img>
            <h3>Da Nang</h3>
            <p>{data[2]} properties</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowCity;
