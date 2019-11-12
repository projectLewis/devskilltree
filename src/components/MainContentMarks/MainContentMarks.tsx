import React from "react";
import { Skill, Update } from "../../interface";
import style from "./MainContentMarks.module.css";

interface PropTypes {
  updateLevel: ((currentSkill: Skill, update: Update) => void);
  currentSkill: Skill;
}

interface State {
  completed: boolean;
  bookmarked: boolean;
}

class MainContentMarks extends React.Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      completed: false,
      bookmarked: false
    };
    this.handleComplete = this.handleComplete.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
  }
  public render() {
    return (
      <div className={style.checkboxArea}>
        <h4>Completed</h4><input onChange={this.handleComplete} type="checkbox"></input>
        <h4>Bookmark</h4><input onChange={this.handleBookmark} type="checkbox"></input>
      </div>
    );
  }

  private handleComplete() {
    if (this.state.completed) {
      this.setState({ completed: false });
      this.props.updateLevel(this.props.currentSkill, Update.DOWNGRADE);
    } else {
      this.setState({ completed: true });
      this.props.updateLevel(this.props.currentSkill, Update.UPGRADE);
    }
  }

  private handleBookmark() {
    if (this.state.bookmarked) {
      this.setState({ bookmarked: false });
      console.log("bookmarked");
    } else {
      this.setState({ bookmarked: true });
    }
  }
}

export default MainContentMarks;
