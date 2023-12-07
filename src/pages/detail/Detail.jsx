import { useContext, useState } from "react";
import Navbar from "../home/Navbar/Navbar";
import FormRegister from "../home/FormRegister/FormRegister";
import Footer from "../home/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import styles from "./Detail.module.css";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "./reserve/Reserve";

//Component trang Detail
const Detail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const getMinPriceFromRooms = (RoomArr) => {
    return RoomArr?.sort((a, b) => a.price - b.price)[0].price;
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.hotelContainer}>
          {open && (
            <div className={styles.slider}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={styles.close}
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className={styles.arrow}
                onClick={() => handleMove("l")}
              />
              <div className={styles.sliderWrapper}>
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className={styles.sliderImg}
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className={styles.arrow}
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className={styles.hotelWrapper}>
            <button className={styles.bookNow} onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className={styles.hotelTitle}>{data.name}</h1>
            <div className={styles.hotelAddress}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className={styles.hotelDistance}>
              Excellent location – {data.distance}m from center
            </span>
            <span className={styles.hotelPriceHighlight}>
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className={styles.hotelImages}>
              {data.photos?.map((photo, i) => (
                <div className={styles.hotelImgWrapper} key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className={styles.hotelImg}
                  />
                </div>
              ))}
            </div>
            <div className={styles.hotelDetails}>
              <div className={styles.hotelDetailsTexts}>
                <h1 className={styles.hotelTitle}>{data.title}</h1>
                <p className={styles.hotelDesc}>{data.decs}</p>
              </div>
              <div className={styles.hotelDetailsPrice}>
                <h1>Perfect for a 1-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${getMinPriceFromRooms(data.rooms)}</b> (1 nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      <FormRegister />
      <Footer />
    </div>
  );
};

export default Detail;
