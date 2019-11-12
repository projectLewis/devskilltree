import React from "react";
import { Skill } from "../../interface";

interface PropTypes {
  video: Skill["video"];
  category: Skill["name"];
}

class MainVideo extends React.Component<PropTypes, {}> {
  public render() {
    return (
      <>
        {/* default width - 560, height 315. Current is * 1.25 */}
        <iframe title={`${this.props.category} video`} width="700" height="394" src={`${this.props.video}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <h4>{this.props.category}</h4>
      </>
    );
  }
}

export default MainVideo;
