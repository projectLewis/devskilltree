import React from "react";
import { SlimSkill } from "../../interface";
import style from "./Options.module.css";

interface PropTypes {
  newSkillOptions: SlimSkill["name"][];
  closeModal: (() => void);
}

interface State {
  suggestion: string;
}

class Options extends React.Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      suggestion: ""
    };
    this.suggestNextSkill = this.suggestNextSkill.bind(this);
  }
  public render() {
    return (
      <div>
        <p style={{ fontSize: "18px" }}>
          You've come across some options for the next level:
    {<span className={style.optionsList}> {this.props.newSkillOptions.join(", ")}</span>}. If you know what you wnat to learn next. Close this window, and continue your journey. If you're not sure. Let us suggest something for you.
      
                Note: Either way you'll still have access to whatever path you don't choose. So you'll always be able to return to the alternate path later.
        </p>
        {this.state.suggestion ? <h3 className={style.suggestion}>{this.state.suggestion}</h3> : undefined}
        <button className={style.button} onClick={this.suggestNextSkill}>Help Me Decide</button>
        <button className={style.button} onClick={this.props.closeModal}>Close</button>
      </div>
    );
  }

  private suggestNextSkill() {
    if (!this.state.suggestion) {
      const lastIdx = this.props.newSkillOptions.length - 1;
      const firstIdx = 0;
      const selectionIdx = Math.floor(Math.random() * (lastIdx - firstIdx + 1)) + firstIdx;
      this.setState({ suggestion: this.props.newSkillOptions[selectionIdx] });
    }
  }
}

export default Options;
