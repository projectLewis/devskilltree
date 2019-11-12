import React from "react";
import Level from "../Level/Level";

class SideBar extends React.Component<{}, {}> {
  public render() {
    return (
      <section>
        <h3>Unlocked Skills</h3>
        <ul>
          <Level />
        </ul>
      </section>
    );
  }
}

export default SideBar;
