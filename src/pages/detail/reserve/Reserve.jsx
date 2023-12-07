import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import styles from "./Reserve.module.css";

const Reserve = (props) => {
  const { setOpen, hotelId } = props;
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [payment, setPayment] = useState("");
  const [bill, setBill] = useState(0);
  const [data, setData] = useState();
  const [errReserve, setErrReserver] = useState({
    isErr: false,
    message: "",
  });
  const user = JSON.parse(localStorage.getItem("user")) || "null";
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  const days = dayDifference(date[0]?.endDate, date[0]?.startDate) + 1;
  const navigate = useNavigate();
  const handleClick = async () => {
    if (user === "null") {
      setErrReserver({ isErr: true, message: "Please Login!" });
    } else if (user !== "null" && payment && selectedRooms.length > 0) {
      try {
        await axios.post(`/transactions/${user._id}`, {
          hotel: hotelId,
          room: selectedRooms,
          dateStart: date[0].startDate.setHours(0, 0, 0),
          dateEnd: date[0].endDate.setHours(23, 59, 59),
          price: bill,
          payment: payment,
          status: "Booked",
        });
        setOpen(false);
        navigate("/transaction");
      } catch (err) {
        console.log(err);
        setErrReserver({ isErr: true, message: "room Unavailable" });
        fetchData(resData);
      }
    } else {
      setErrReserver({ isErr: true, message: "Infomation is empty!" });
    }
  };
  const [info, setInfo] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    cardNumber: undefined,
  });
  function resetChecked() {
    const checkboxes = document.getElementsByName("checkRoom");
    // Lặp và thiết lập checked
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setBill(0);
    setSelectedRooms([]);
  }
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const resData = {
    hotelId: hotelId,
    dateStart: date[0].startDate.setHours(0, 0, 0),
    dateEnd: date[0].endDate.setHours(23, 59, 59),
  };
  const fetchData = async (resData) => {
    const res = await axios.post(`/hotels/time`, resData);
    setData(res.data);
  };
  useEffect(() => {
    fetchData(resData);
  }, [date]);
  return (
    <div className={styles.reserve}>
      <div className={styles.datesRInfo}>
        <div className={styles.dateContainer}>
          <h3>Dates</h3>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setDate([item.selection]);
              resetChecked();
            }}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className={styles.date}
            minDate={new Date()}
          />
        </div>
        <div className={styles.login}>
          <h3>Reserve Info</h3>
          <div className={styles.lContain}>
            <label htmlFor="fullName">Your Full Name:</label>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={info.fullName}
              onChange={handleChange}
              className={styles.lInput}
            />
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={info.email}
              onChange={handleChange}
              className={styles.lInput}
            />
            <label htmlFor="phone">Your Phone Number:</label>
            <input
              type="tel"
              placeholder="Phone Number"
              id="phone"
              value={info.phoneNumber}
              onChange={handleChange}
              className={styles.lInput}
            />
            <label htmlFor="cardNumber">Your Identity Card Number:</label>
            <input
              type="text"
              placeholder="Card Number"
              id="cardNumber"
              value={info.cardNumber}
              onChange={handleChange}
              className={styles.lInput}
            />
          </div>
        </div>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={styles.rClose}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.rContainer}>
        <h3>Select Rooms</h3>
        <div className={styles.selectedRoomsContainer}>
          {data?.map((item) => (
            <div className={styles.rItem} key={item._id}>
              <div className={styles.rItemInfo}>
                <div className={styles.rTitle}>{item.title}</div>
                <div className={styles.rDesc}>{item.desc}</div>
                <div className={styles.rMax}>
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className={styles.rPrice}>${item.price}</div>
              </div>
              <div className={styles.rSelectRooms}>
                {item.roomNumbers.map((roomNumber, index) => (
                  <div className={styles.room} key={index}>
                    <label>{roomNumber}</label>
                    <input
                      type="checkbox"
                      value={roomNumber}
                      name="checkRoom"
                      roomNumber={roomNumber}
                      price={item.price}
                      onClick={(e) => {
                        setBill(
                          e.target.checked
                            ? bill + item.price
                            : bill - item.price
                        );
                        setSelectedRooms(
                          e.target.checked
                            ? [...selectedRooms, roomNumber]
                            : selectedRooms.filter(
                                (room) => room !== roomNumber
                              )
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <h4>Total Bill: ${days * bill}</h4>
        <div className={styles.paymentContainer}>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
          </select>
          <button onClick={handleClick} className={styles.rButton}>
            Reserve Now!
          </button>
        </div>
        {errReserve.isErr && (
          <p style={{ color: "red", marginLeft: "64px", marginTop: "12px" }}>
            {errReserve.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Reserve;
