import React from "react";
import { SlimSkill } from "../../interface";
import LevelDetails from "./LevelDetails";

interface PropTypes {
  completedSkills: SlimSkill[];
  changeCurrentSkill: ((name: SlimSkill["name"]) => void);
}

class Levels extends React.Component<PropTypes, {}> {
  public render() {
    return (
      <div>
        {
          this.props.completedSkills.map((skill, idx) => {
            return (
              <>
                {
                  this.props.completedSkills[idx - 1] === undefined ||
                    this.props.completedSkills[idx - 1].level !== skill.level ?
                    <ul key={`${idx}_${skill.level}`}>Level {skill.level}</ul> :
                    undefined
                }
                <LevelDetails
                  key={`${skill._id}_${skill.name}`}
                  changeCurrentSkill={this.props.changeCurrentSkill}
                  skillName={skill.name}
                />
              </>
            );
          })
        }
      </div>
    );
  }
}

export default Levels;
