import React from "react";

interface PropTypes {
  index: number;
  resource: string;
}

class AdditionalResource extends React.Component<PropTypes, {}> {
  public render() {
    return (
      <>
        <li>
          <a href={this.props.resource}><h3>Additional Reading{this.props.index !== 0 ? ` ${this.props.index + 1}` : null}</h3></a>
        </li>
      </>
    );
  }
}

export default AdditionalResource;
