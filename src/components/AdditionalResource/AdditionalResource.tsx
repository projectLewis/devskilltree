import React from "react";

interface PropTypes {
  url: string;
  title: string;
}

class AdditionalResource extends React.Component<PropTypes, {}> {
  public render() {
    return (
      <>
        <li>
          <a href={this.props.url} target="_blank" rel="noopener noreferrer"><h3>{this.props.title}</h3></a>
        </li>
      </>
    );
  }
}

export default AdditionalResource;
