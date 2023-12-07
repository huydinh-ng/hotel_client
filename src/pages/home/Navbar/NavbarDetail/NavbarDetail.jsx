import React from "react";

import NavBarItem from "./NavbarItem/NavBarItem";
import styles from "./NavbarDetail.module.css";
//Lấy dữ liệu từ file json
import navBarArr from "../../../../data/navBar.json";

//Component navbarDetail hiển thị các thành phần của navbar
function NavbarDetail() {
  return (
    //sử dụng phương thức map để rander mảng từ file json được lấy về
    <ul className={styles.navBar}>
      {navBarArr.map((navBar, index) => (
        <li key={index}>
          <NavBarItem
            icon={navBar.icon}
            type={navBar.type}
            active={navBar.active}
          ></NavBarItem>
        </li>
      ))}
    </ul>
  );
}

export default NavbarDetail;
