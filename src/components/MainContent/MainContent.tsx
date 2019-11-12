import React from "react";
import AdditionalResource from "../AdditionalResource/AdditionalResource";
import MainVideo from "../MainVideo/MainVideo";

class MainContent extends React.Component<{}, {}> {
  public render() {
    return (
      <main>
        <MainVideo />
        <div>
          <h3>Complete</h3><input type="checkbox"></input>
          <h3>Bookmark</h3><input type="checkbox"></input>
        </div>
        <ul>
          <AdditionalResource />
          <AdditionalResource />
        </ul>
      </main>
    );
  }
}

export default MainContent;
