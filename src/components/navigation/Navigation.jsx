/* eslint-disable react/prop-types */
import { Children } from "react";
import { NavLink } from "react-router-dom";

import * as Icons from "@heroicons/react/16/solid";

import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.linkContainer} container--1200`}>
        <NavLink to="/" className={styles.homeLink}>
          WeebWeb
        </NavLink>
        <ul className={styles.navList}>
          <NavItem>
            <DropdownMenu name="anime">
              <NavLink to="anime">all anime</NavLink>
              <NavLink to="anime/top">top anime</NavLink>
              <NavLink to="anime/search">search anime</NavLink>
            </DropdownMenu>
          </NavItem>
          <NavItem>
            <DropdownMenu name="manga">
              <NavLink to="manga/top">all manga</NavLink>
              <NavLink to="manga/top">top manga</NavLink>
              <NavLink to="manga/search">search manga</NavLink>
            </DropdownMenu>
          </NavItem>
          <NavItem>
            <NavLink>profle</NavLink>
          </NavItem>
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ children }) {
  return <li className={styles.navItem}>{children}</li>;
}

function DropdownMenu({ name, children }) {
  return (
    <>
      <p className={styles.dropdownControl}>
        <span>{name}</span>
        <Icons.ChevronDownIcon />
      </p>
      <div className={styles.dropdown}>
        <ul>
          {children &&
            Children.map(children, (child) => (
              <DropdownItem key={child.props.to}>{child}</DropdownItem>
            ))}
        </ul>
      </div>
    </>
  );
}

function DropdownItem({ children }) {
  return <li className={styles.dropdownItem}>{children}</li>;
}

export default Navigation;
