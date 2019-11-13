import React from "react";
import { SlimSkill } from "../../interface";
import Levels from "../Levels/Levels";
import style from "./SideBar.module.css";

interface PropTypes {
  viewableSkills: SlimSkill[];
  changeCurrentSkill: ((name: SlimSkill["name"]) => void);
  completedSkills: SlimSkill["name"][];
}

class SideBar extends React.Component<PropTypes, {}> {
  public render() {
    // TODO add SideBarClosed
    return (
      <section className={style.sideBarOpen}>
        <h3 className={style.unlockedHeading}>Unlocked Skills</h3>
        <Levels
          completedSkills={this.props.completedSkills}
          viewableSkills={this.props.viewableSkills}
          changeCurrentSkill={this.props.changeCurrentSkill}
        />
      </section>
    );
  }
}

export default SideBar;
