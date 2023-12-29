"use client";
import React from "react";
import clsx from "clsx";
import Cookie from "js-cookie";
import { Rss, Sun, Moon } from "react-feather";
import Link from "next/link";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";

function Header({ theme: initialtheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialtheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;

    root.setAttribute("data-color-theme", nextTheme);
  }
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <Link className={styles.action} href="/rss.xml">
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Link>
        <button className={styles.action} onClick={handleClick}>
          {theme === "dark" ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
