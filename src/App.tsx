import axios from "axios";
import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import SideBar from "./components/SideBar/SideBar";
import Title from "./components/Title/Title";
import { DATABYLEVEL } from "./constants";
import { Skill, SlimSkill, Update } from "./interface";

interface State {
  completed: SlimSkill[];
  unlockedFoundations: SlimSkill["name"][];
  inprogress: SlimSkill[];
  currentLevel: number;
  currentSkillName: SlimSkill["name"] | undefined;
}

class App extends React.Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.state = {
      completed: [],
      unlockedFoundations: ["NONE"],
      inprogress: [],
      currentLevel: 1,
      currentSkillName: undefined
    };

    this.updateLevel = this.updateLevel.bind(this);
    this.changeCurrentSkill = this.changeCurrentSkill.bind(this);
  }

  public componentDidMount() {
    this.getSkillsList(this.state.currentLevel, this.state.unlockedFoundations);
  }

  public render() {
    return (
      <div>
        <div>
          <Header />
          <Title />
          <MainContent
            currentLevel={this.state.currentLevel}
            updateLevel={this.updateLevel}
            currentSkillName={this.state.currentSkillName}
            changeCurrentSkill={this.changeCurrentSkill}
          />
        </div>
        <SideBar
          completedSkills={this.state.completed}
          changeCurrentSkill={this.changeCurrentSkill}
        />
      </div>
    );
  }

  private changeCurrentSkill(name: SlimSkill["name"]) {
    if (this.state.currentSkillName !== name) {
      this.setState({ currentSkillName: name });
    }
  }

  private async updateLevel(currentSkill: Skill, update: Update) {
    try {
      const newSkillLevel = update === Update.UPGRADE ? currentSkill.level + 1 : (currentSkill.level - 1 || 1);
      const unlockedFoundations = update === Update.UPGRADE ?
        [...this.state.unlockedFoundations, currentSkill.name_uppercase] :
        this.state.unlockedFoundations.filter((foundation) => {
          return foundation !== currentSkill.name_uppercase;
        });
      this.setState({
        currentLevel: newSkillLevel,
        unlockedFoundations
      });
      await this.getSkillsList(newSkillLevel, unlockedFoundations);
    } catch (error) {
      // TODO errors
      console.error(error);
      return;
    }
  }

  private async getSkillsList(level: number, unlockedSkills: string[]) {
    const unlockedSkillsString: string = unlockedSkills.join(",");
    try {
      const results = await axios.get(`${DATABYLEVEL}/${level}`, {
        params: {
          unlocked: unlockedSkillsString
        }
      });
      const skills: SlimSkill[] = results.data;
      this.setState({ completed: skills });
    } catch (error) {
      // TODO errors
      console.error(error);
      return;
    }
  }
}

export default App;
