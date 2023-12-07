import { Link } from "react-router-dom";
import styles from "./SearchItem.module.css";

const SearchItem = ({ item }) => {
  const getMinPriceFromRooms = (RoomArr) => {
    return RoomArr.sort((a, b) => a.price - b.price)[0].price;
  };
  return (
    <div className={styles.searchItem}>
      <img src={item.photos[0]} alt="" className={styles.siImg} />
      <div className={styles.siDesc}>
        <h1 className={styles.siTitle}>{item.name}</h1>
        <span className={styles.siDistance}>{item.distance}m from center</span>
        <span className={styles.siTaxiOp}>Free airport taxi</span>
        <span className={styles.siSubtitle}>
          Studio Apartment with Air conditioning
        </span>
        <span className={styles.siFeatures}>{item.desc}</span>
        <span className={styles.siCancelOp}>Free cancellation </span>
        <span className={styles.siCancelOpSubtitle}>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={styles.siDetails}>
        <div className={styles.siRating}>
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>

        <div className={styles.siDetailTexts}>
          <span className={styles.siPrice}>
            ${getMinPriceFromRooms(item.rooms)}
          </span>
          <span className={styles.siTaxOp}>Includes taxes and fees</span>
          <Link to={`/detail/${item._id}`}>
            <button className={styles.siCheckButton}>See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
