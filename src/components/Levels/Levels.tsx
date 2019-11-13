import React from "react";
import { SlimSkill } from "../../interface";
import LevelDetails from "./LevelDetails";
import style from "./Levels.module.css";

interface PropTypes {
  completedSkills: SlimSkill["name"][];
  viewableSkills: SlimSkill[];
  changeCurrentSkill: ((name: SlimSkill["name"]) => void);
}

class Levels extends React.Component<PropTypes, {}> {
  public render() {
    return (
      <div>
        {
          this.props.viewableSkills.map((skill, idx) => {
            let status: boolean;
            if (this.props.completedSkills.includes(skill.name.toUpperCase())) {
              status = true;
            } else {
              status = false;
            }
            return (
              <>
                {
                  this.props.viewableSkills[idx - 1] === undefined ||
                    this.props.viewableSkills[idx - 1].level !== skill.level ?
                    <ul key={`${idx}_${skill.level}`}><h4 className={style.levelHeading}>Level {skill.level}</h4></ul> :
                    undefined
                }
                <LevelDetails
                  key={`${skill._id}_${skill.name}`}
                  completed={status}
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
