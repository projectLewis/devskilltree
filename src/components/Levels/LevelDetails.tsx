import React from "react";
import { SlimSkill } from "../../interface";

interface PropTypes {
  skillName: SlimSkill["name"];
  changeCurrentSkill: ((name: SlimSkill["name"]) => any);
}

class LevelDetails extends React.Component<PropTypes, {}> {
  public render() {
    return (
      <>
        <li onClick={this.changeCurrentSkill.bind(this)}>
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
