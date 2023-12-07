import { Link } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import styles from "./Hotel.module.css";

//Component hiển thị phần hình ảnh của hotel
const Hotel = () => {
  const { data, loading } = useFetch("/hotels/topRateHotel");
  // console.log(data);
  return (
    <div>
      <h2 className={styles.title}>Homes guests love</h2>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.container}>
            {data.map((hotel) => (
              <div key={hotel._id} className={styles.containerItem}>
                <img
                  src={hotel.photos[0]}
                  alt={hotel.name}
                  className={styles.img}
                ></img>
                <Link to={`/detail/${hotel._id}`} className={styles.name}>
                  {hotel.name}
                </Link>
                <p>{hotel.city}</p>
                {hotel.rooms?.length > 0 && (
                  <p className={styles.price}>
                    Starting from $
                    {hotel.rooms
                      ?.map((r) => r.price)
                      ?.reduce((minPrice, currentPrice) => {
                        if (currentPrice < minPrice) minPrice = currentPrice;
                        return minPrice;
                      })}
                  </p>
                )}
                <div>
                  <span className={styles.rate}>{hotel.rating}</span>
                  {hotel.type}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;
