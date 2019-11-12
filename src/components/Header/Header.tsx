import React from "react";
import style from "./Header.module.css";

class Header extends React.Component<{}, {}> {
  public render() {
    return (
      <header className={style.header}>
        <nav className={style.nav}>
          <div className={style.userName} title="user name"><strong>Phife Dawg</strong></div>
          <div className={style.logout}>Logout</div>
        </nav>
      </header>
    );
  }
}

export default Header;
