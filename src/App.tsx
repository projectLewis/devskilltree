import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import SideBar from "./components/SideBar/SideBar";
import Title from "./components/Title/Title";
import { ApiResult } from "./interface";

interface State {
  completed: ApiResult[];
  inprogress: ApiResult[];
}

class App extends React.Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.state = {
      completed: [],
      inprogress: [],
    };
  }
  public render() {
    return (
      <div>
        <div>
          <Header />
          <Title />
          <MainContent />
        </div>
        <SideBar />
      </div>
    );
  }
}

export default App;
