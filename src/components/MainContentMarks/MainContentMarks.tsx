import React from "react";
import { Skill, Update } from "../../interface";
import style from "./MainContentMarks.module.css";

interface PropTypes {
  currentSkill: Skill;
  updateLevel: ((currentSkill: Skill, update: Update) => void);
  markCompleted: ((skill: Skill["name"]) => void);
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

  public componentDidUpdate(prevProps: PropTypes) {
    if (prevProps.currentSkill.name !== this.props.currentSkill.name) {
      this.setState({
        completed: false,
        bookmarked: false
      });
    }
  }

  public render() {
    return (
      <div className={style.checkboxArea}>
        <h4>Completed:</h4><input onChange={this.handleComplete} checked={this.state.completed} type="checkbox"></input>
        <h4>Bookmark:</h4><input onChange={this.handleBookmark} type="checkbox"></input>
      </div>
    );
  }

  private handleComplete() {
    if (this.state.completed) {
      this.setState({ completed: false });
      this.props.updateLevel(this.props.currentSkill, Update.DOWNGRADE);
    } else {
      this.props.markCompleted(this.props.currentSkill.name);
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
