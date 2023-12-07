import React from "react";
import styles from "./NavBarItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../Icon/IconLib";

//Component navbaritem của từng item trong navbar
const NavBarItem = (props) => {
  //trường hợp item đang active
  if (props.active)
    return (
      <div className={styles.navBarItemActive}>
        <div>
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <p>{props.type}</p>
      </div>
    );
  //trường hợp item không active
  else
    return (
      <div className={styles.navBarItem}>
        <div>
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <p>{props.type}</p>
      </div>
    );
};

export default NavBarItem;
