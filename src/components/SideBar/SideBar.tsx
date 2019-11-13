import React from "react";
import { SlimSkill } from "../../interface";
import Levels from "../Levels/Levels";
import style from "./SideBar.module.css";

interface PropTypes {
  viewableSkills: SlimSkill[];
  changeCurrentSkill: ((name: SlimSkill["name"]) => void);
  completedSkills: SlimSkill["name"][];
}

interface State {
  expanded: boolean;
}

class SideBar extends React.Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      expanded: false
    };
    this.expandSidebar = this.expandSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
  }

  public render() {
    return (
      <section
        onMouseEnter={this.expandSidebar}
        onMouseLeave={this.closeSidebar}
        onFocus={this.expandSidebar}
        onBlur={this.closeSidebar}
        className={style.sideBar}
      >
        <h3 className={style.unlockedHeading}>Unlocked Skills</h3>
        {this.state.expanded ?
          <Levels
            completedSkills={this.props.completedSkills}
            viewableSkills={this.props.viewableSkills}
            changeCurrentSkill={this.props.changeCurrentSkill}
          />
          : null
        }
      </section>
    );
  }

  private expandSidebar() {
    if (this.state.expanded !== true) {
      const transitionTime = 300;
      setTimeout(() => {
        this.setState({ expanded: true });
      }, transitionTime);
    }
  }
  private closeSidebar() {
    if (this.state.expanded !== false) {
      this.setState({ expanded: false });
    }
  }
}

export default SideBar;
