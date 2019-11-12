import React from "react";
import Level from "../Level/Level";
import style from "./SideBar.module.css";

class SideBar extends React.Component<{}, {}> {
  public render() {
    // TODO add SideBarClosed
    return (
      <section className={style.sideBarOpen}>
        <h3>Unlocked Skills</h3>
        <ul>
          <Level />
        </ul>
      </section>
    );
  }
}

export default SideBar;
