import axios from "axios";
import React from "react";
import { DATABYLEVEL, DATABYNAME } from "../../constants";
import { Skill, Update } from "../../interface";
import AdditionalResource from "../AdditionalResource/AdditionalResource";
import MainContentMarks from "../MainContentMarks/MainContentMarks";
import MainVideo from "../MainVideo/MainVideo";
import style from "./MainContent.module.css";

interface PropTypes {
  currentLevel: number;
  currentSkillName: Skill["name"] | undefined;
  updateLevel: ((currentSkill: Skill, update: Update) => void);
  changeCurrentSkill: ((name: Skill["name"]) => void);
  markCompleted: ((skill: Skill["name"]) => void);
}

interface State {
  currentSkill: Skill | undefined;
}

class MainContent extends React.Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      currentSkill: undefined
    };
  }

  public componentDidMount() {
    if (this.props.currentSkillName === undefined) {
      this.getDataByLevel(this.props.currentLevel);
    } else {
      this.getDataByName(this.props.currentSkillName);
    }
  }

  public componentDidUpdate(prevProps: PropTypes) {
    if (prevProps.currentSkillName !== this.props.currentSkillName && this.props.currentSkillName) {
      this.getDataByName(this.props.currentSkillName);
    }
  }

  public render() {
    if (this.state.currentSkill === undefined) {
      return (
        <div>
          loading...
        </div>
      );
    }
    return (
      <main className={style.mainContent}>
        <MainVideo
          video_embed={this.state.currentSkill.video_embed}
          skillName={this.state.currentSkill.name}
        />
        <MainContentMarks
          currentSkill={this.state.currentSkill}
          updateLevel={this.props.updateLevel}
          markCompleted={this.props.markCompleted}
        />
        <h2 className={style.additionalResourcesTitle}>Additional Resources:</h2>
        <ol>
          {this.state.currentSkill.resources.map((resource) => {
            return (
              <AdditionalResource
                key={resource[1]}
                url={resource[0]}
                title={resource[1]}
              />
            );
          })}
        </ol>
      </main>
    );
  }

  private async getDataByLevel(level: Skill["level"]) {
    const result = await axios.get(`${DATABYLEVEL}/${level}`);
    const skill: Skill = result.data[0];
    this.setState({ currentSkill: skill });
  }

  private async getDataByName(name: Skill["name"]) {
    const result = await axios.get(`${DATABYNAME}/${name}`);
    const skill: Skill = result.data;
    this.setState({ currentSkill: skill });
  }
}

export default MainContent;
