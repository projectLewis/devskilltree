import axios from "axios";
import React from "react";
import { DATABYLEVEL } from "../../constants";
import { Skill } from "../../interface";
import AdditionalResource from "../AdditionalResource/AdditionalResource";
import MainVideo from "../MainVideo/MainVideo";
import style from "./MainContent.module.css";
import MainContentMarks from "../MainContentMarks/MainContentMarks";

interface State {
  currentSkill: Skill | undefined;
}

class MainContent extends React.Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.state = {
      currentSkill: undefined
    };
  }

  public componentDidMount() {
    this.getDataByLevel(1);
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
        <MainVideo video={this.state.currentSkill.video_embed} skillName={this.state.currentSkill.name} />
        <MainContentMarks />
        <h2 className={style.additionalResourcesTitle}>Additional Resources:</h2>
        <ol>
          {this.state.currentSkill.resources.map((resource) => {
            return (<AdditionalResource key={resource[1]} url={resource[0]} title={resource[1]} />);
          })}
        </ol>
      </main>
    );
  }

  private async getDataByLevel(level: number) {
    const result = await axios.get(`${DATABYLEVEL}/${level}`);
    const skill = result.data[0];
    this.setState({ currentSkill: skill });
  }
}

export default MainContent;
