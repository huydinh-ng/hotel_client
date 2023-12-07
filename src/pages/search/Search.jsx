import Navbar from "../home/Navbar/Navbar";
import Footer from "../home/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "./searchItem/SearchItem";
import axios from "axios";

import styles from "./Search.module.css";

//Component trang Search
const Search = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const changeDestination = (event) => {
    setDestination(event.target.value);
    setOpenDestination(openDestination === false ? true : false);
  };
  const changeRoom = (event) => {
    options.room = event.target.value;
  };
  const changeAdult = (event) => {
    options.adult = event.target.value;
  };
  const changeChildren = (event) => {
    options.children = event.target.value;
  };

  const fetchData = async (dataPost) => {
    setLoading(true);
    const { data } = await axios.post("/hotels/search", dataPost);
    setLoading(false);
    setData(data);
  };

  useEffect(() => {
    const dataPost = {
      people: Number(options.adult) + Number(options.children),
      room: options.room,
      city: destination,
      min: min || 0,
      max: max || 999,
      dateStart: dates[0].startDate,
      dateEnd: dates[0].endDate,
    };
    fetchData(dataPost);
  }, []);

  const handleClick = () => {
    const dataPost = {
      people: Number(options.adult) + Number(options.children),
      room: options.room,
      city: destination,
      min: min || 0,
      max: max || 999,
      dateStart: dates[0].startDate,
      dateEnd: dates[0].endDate,
    };
    fetchData(dataPost);
  };
  return (
    <div>
      <Navbar />
      <div className={styles.listContainer}>
        <div className={styles.listWrapper}>
          <div className={styles.listSearch}>
            <h1 className={styles.lsTitle}>Search</h1>
            <div className={styles.lsItem}>
              <label>Destination</label>
              <select id="destination" onChange={changeDestination}>
                {destination && !openDestination && (
                  <option value={destination}>{destination}</option>
                )}
                <option value={""}>Select Destination</option>
                <option value={"Ha Noi"}>Ha Noi</option>
                <option value={"Ho Chi Minh"}>Ho Chi Minh</option>
                <option value={"Da Nang"}>Da Nang</option>
              </select>
            </div>
            <div className={styles.lsItem}>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {`
                ${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className={styles.lsItem}>
              <label>Options</label>
              <div className={styles.lsOptions}>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className={styles.lsOptionInput}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className={styles.lsOptionInput}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className={styles.lsOptionInput}
                    placeholder={options.adult}
                    onChange={changeAdult}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Children</span>
                  <input
                    type="number"
                    min={0}
                    className={styles.lsOptionInput}
                    placeholder={options.children}
                    onChange={changeChildren}
                  />
                </div>
                <div className={styles.lsOptionItem}>
                  <span className={styles.lsOptionText}>Room</span>
                  <input
                    type="number"
                    min={1}
                    className={styles.lsOptionInput}
                    placeholder={options.room}
                    onChange={changeRoom}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className={styles.listResult}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
