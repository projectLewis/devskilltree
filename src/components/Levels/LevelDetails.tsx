import React from "react";
import { SlimSkill } from "../../interface";
import style from "./LevelDetails.module.css";

interface PropTypes {
  skillName: SlimSkill["name"];
  changeCurrentSkill: ((name: SlimSkill["name"]) => any);
  completed: boolean;
}

class LevelDetails extends React.Component<PropTypes, {}> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {

    };
  }
  public render() {
    const completed = this.props.completed;
    return (
      <>
        <li className={completed ? style.skillItemComplete : style.skillItemInprogress} onClick={this.changeCurrentSkill.bind(this)}>
          {this.props.skillName}
        </li>
      </>
    );
  }
  private changeCurrentSkill() {
    this.props.changeCurrentSkill(this.props.skillName);
  }
}

export default LevelDetails;
