import React from "react";
import { Skill } from "../../interface";
import style from "./MainVideo.module.css";

interface PropTypes {
  video_embed: Skill["video"];
  skillName: Skill["name"];
}

class MainVideo extends React.Component<PropTypes, {}> {
  public render() {
    return (
      <>
        {/* default width - 560, height 315. Current is * 1.25 */}
        <iframe title={`${this.props.skillName} video`} width="800" height="494" src={`${this.props.video_embed}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <h2 className={style.subtitle}>Skill: {this.props.skillName}</h2>
      </>
    );
  }
}

export default MainVideo;
