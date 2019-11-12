import React from "react";
import style from "./MainContentMarks.module.css";

class MainContentMarks extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={style.checkboxArea}>
        <h4>Complete</h4><input type="checkbox"></input>
        <h4>Bookmark</h4><input type="checkbox"></input>
      </div>
    );
  }
}

export default MainContentMarks;
