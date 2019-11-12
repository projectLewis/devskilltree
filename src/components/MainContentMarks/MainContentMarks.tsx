import React from "react";

class MainContentMarks extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <div>
          <h3>Complete</h3><input type="checkbox"></input>
          <h3>Bookmark</h3><input type="checkbox"></input>
        </div>
      </div>
    );
  }
}

export default MainContentMarks;
