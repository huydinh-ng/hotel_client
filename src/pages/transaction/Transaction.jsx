import React, { useContext } from "react";
import Navbar from "../home/Navbar/Navbar";
import styles from "./Transaction.module.css";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const Transaction = () => {
  const { user } = useContext(AuthContext);

  const { data: transactions } = useFetch(`/transactions/${user._id}`) || "";
  // const { data: rooms } = useFetch("/rooms");

  const convertFormatDate = (d) => {
    const newDate = new Date(d);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    return `${date}/${month}/${year}`;
  };

  const stylestatus = (status) => {
    if (status === "Booked") {
      return styles.booked;
    } else if (status === "Checkin") {
      return styles.checkin;
    } else {
      return styles.checkout;
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.tContainer}>
        <h2>Your Transactions</h2>
        <table className={styles.tTable}>
          <tbody>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
            {transactions.map((d, index) => (
              <tr key={d._id}>
                <td>0{index + 1}</td>
                <td>{d.hotel.name}</td>
                <td>{d.room.join(", ")}</td>
                <td>
                  {convertFormatDate(d.dateStart)} -{" "}
                  {convertFormatDate(d.dateEnd)}
                </td>
                <td>${d.price}</td>
                <td>{d.payment}</td>
                <td>
                  <span className={stylestatus(d.status)}>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
