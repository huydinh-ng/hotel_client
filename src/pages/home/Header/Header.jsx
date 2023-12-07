import React, { useContext } from "react";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { SearchContext } from "../../../context/SearchContext";
import { AuthContext } from "../../../context/AuthContext";

//Component header chứa 2 component là input và background
const Header = () => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const changeDestination = (event) => {
    setDestination(event.target.value);
  };
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "up" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/search", { state: { destination, dates, options } });
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerTitle}>
          A lifetime of discounts? It's Genius.
        </h1>
        <p className={styles.headerDesc}>
          Get rewarded for your travels – unlock instant savings of 10% or more
          with a free account
        </p>
        {!user && (
          <Link to={"/login"}>
            <button className={styles.headerBtn}>Sign in / Register</button>
          </Link>
        )}
        <div className={styles.headerSearch}>
          <div className={styles.headerSearchItem}>
            <FontAwesomeIcon icon={faBed} className={styles.headerIcon} />
            <select
              className={styles.headerSearchInput}
              onChange={changeDestination}
            >
              <option value={""}>Where are you going?</option>
              <option value={"Ha Noi"}>Ha Noi</option>
              <option value={"Ho Chi Minh"}>Ho Chi Minh</option>
              <option value={"Da Nang"}>Da Nang</option>
            </select>
          </div>
          <div className={styles.headerSearchItem}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              className={styles.headerIcon}
            />
            <span
              onClick={() => setOpenDate(!openDate)}
              className={styles.headerSearchText}
            >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className={styles.date}
                minDate={new Date()}
              />
            )}
          </div>
          <div className={styles.headerSearchItem}>
            <FontAwesomeIcon icon={faPerson} className={styles.headerIcon} />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className={styles.headerSearchText}
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            {openOptions && (
              <div className={styles.options}>
                <div className={styles.optionItem}>
                  <span className={styles.optionText}>Adult</span>
                  <div className={styles.optionCounter}>
                    <button
                      disabled={options.adult <= 1}
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("adult", "down")}
                    >
                      -
                    </button>
                    <span className={styles.optionCounterNumber}>
                      {options.adult}
                    </span>
                    <button
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("adult", "up")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.optionItem}>
                  <span className={styles.optionText}>Children</span>
                  <div className={styles.optionCounter}>
                    <button
                      disabled={options.children <= 0}
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("children", "down")}
                    >
                      -
                    </button>
                    <span className={styles.optionCounterNumber}>
                      {options.children}
                    </span>
                    <button
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("children", "up")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.optionItem}>
                  <span className={styles.optionText}>Room</span>
                  <div className={styles.optionCounter}>
                    <button
                      disabled={options.room <= 1}
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("room", "down")}
                    >
                      -
                    </button>
                    <span className={styles.optionCounterNumber}>
                      {options.room}
                    </span>
                    <button
                      className={styles.optionCounterButton}
                      onClick={() => handleOption("room", "up")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.headerSearchItem}>
            <button className={styles.headerBtn} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
