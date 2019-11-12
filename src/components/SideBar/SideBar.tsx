import React from "react";
import { SlimSkill } from "../../interface";
import Levels from "../Levels/Levels";
import style from "./SideBar.module.css";

interface PropTypes {
  completedSkills: SlimSkill[];
  changeCurrentSkill: ((name: SlimSkill["name"]) => void);
}

class SideBar extends React.Component<PropTypes, {}> {
  public render() {
    // TODO add SideBarClosed
    return (
      <section className={style.sideBarOpen}>
        <h3>Unlocked Skills</h3>
        <Levels
          completedSkills={this.props.completedSkills}
          changeCurrentSkill={this.props.changeCurrentSkill}
        />
      </section>
    );
  }
}

export default SideBar;
