import React from "react";
import style from "./Title.module.css";

class Title extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={style.titleWrapper}>
        <h1 className={style.titleH1}>
          Developer Skills Tree
        </h1>
      </div>
    );
  }
}

export default Title;
