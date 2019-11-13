import React from "react";
import style from "./AdditionalResource.module.css";

interface PropTypes {
  url: string;
  title: string;
}

class AdditionalResource extends React.Component<PropTypes, {}> {
  public render() {
    return (
      <>
        <li className={style.listItem}>
          <a href={this.props.url} target="_blank" rel="noopener noreferrer" className={style.resource}><h3>{this.props.title}</h3></a>
        </li>
      </>
    );
  }
}

export default AdditionalResource;
