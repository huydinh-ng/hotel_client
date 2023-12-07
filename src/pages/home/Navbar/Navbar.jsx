import React from "react";

import NavbarDetail from "./NavbarDetail/NavbarDetail";
import Title from "./Title/Title";
import styles from "./Navbar.module.css";

//Component chung của navbar có chứa title và navbarDetail
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Title></Title>
      <NavbarDetail></NavbarDetail>
    </div>
  );
};

export default Navbar;
