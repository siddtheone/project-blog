"use client";
import React from "react";
import clsx from "clsx";
import Cookie from "js-cookie";
import { Rss, Sun, Moon } from "react-feather";
import { LIGHT_COLORS, DARK_COLORS } from "@/constants";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";

function Header({ theme: initialtheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialtheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    // Update the state variable.
    // This causes the Sun/Moon icon to flip.
    setTheme(nextTheme);

    // Write the cookie for future visits
    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    // Apply the new colors to the root HTML tag.
    // const COLORS = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    const root = document.documentElement;

    root.setAttribute("data-color-theme", nextTheme);

    // Object.entries(COLORS).forEach(([key, value]) => {
    //   root.style.setProperty(key, value);
    // });
  }
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleClick}>
          {theme === "dark" ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
