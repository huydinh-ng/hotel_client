import useFetch from "../../../../hooks/useFetch";
import styles from "./TypeHotel.module.css";
import image1 from "../../../../images/type_1.webp";
import image2 from "../../../../images/type_2.jpg";
import image3 from "../../../../images/type_3.jpg";
import image4 from "../../../../images/type_4.jpg";
import image5 from "../../../../images/type_5.jpg";

//Coponent hiển thị các loại khách sạn
const TypeHotel = () => {
  const { data, loading } = useFetch("/hotels/countByType");

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          {data && (
            <div>
              <h2 className={styles.title}>Browse by propety type</h2>
              <div className={styles.container}>
                <div className={styles.containerItem}>
                  <img src={image1} alt={data[0]?.type}></img>
                  <h4>{data[0]?.type}</h4>
                  <p>{data[0]?.count} hotels</p>
                </div>

                <div className={styles.containerItem}>
                  <img src={image2} alt={data[1]?.type}></img>
                  <h4>{data[1]?.type}</h4>
                  <p>{data[1]?.count} apartments</p>
                </div>

                <div className={styles.containerItem}>
                  <img src={image3} alt={data[2]?.type}></img>
                  <h4>{data[2]?.type}</h4>
                  <p>{data[2]?.count} resorts</p>
                </div>

                <div className={styles.containerItem}>
                  <img src={image4} alt={data[3]?.type}></img>
                  <h4>{data[3]?.type}</h4>
                  <p>{data[3]?.count} villas</p>
                </div>

                <div className={styles.containerItem}>
                  <img src={image5} alt={data[4]?.type}></img>
                  <h4>{data[4]?.type}</h4>
                  <p>{data[4]?.count} cabins</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TypeHotel;
