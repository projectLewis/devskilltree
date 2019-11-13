import axios from "axios";
import React from "react";
import Modal from "react-modal";
import "./App.css";
import MainContent from "./components/MainContent/MainContent";
import Options from "./components/Options/Options";
import SideBar from "./components/SideBar/SideBar";
import Title from "./components/Title/Title";
import { DATABYLEVEL } from "./constants";
import { Skill, SlimSkill, Update } from "./interface";

interface State {
  viewable: SlimSkill[];
  completed: SlimSkill["name"][];
  unlockedFoundations: SlimSkill["name"][];
  inprogress: SlimSkill[];
  currentLevel: number;
  currentSkillName: SlimSkill["name"] | undefined;
  skillAlert: boolean;
  modalIsOpen: boolean;
  newSkillOptions: SlimSkill["name"][];
}

Modal.setAppElement("#root");

class App extends React.Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.state = {
      viewable: [],
      completed: [],
      unlockedFoundations: ["NONE"],
      inprogress: [],
      currentLevel: 1,
      currentSkillName: undefined,
      skillAlert: false,
      modalIsOpen: false,
      newSkillOptions: []
    };

    this.updateLevel = this.updateLevel.bind(this);
    this.changeCurrentSkill = this.changeCurrentSkill.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
    this.toggleSkillAlert = this.toggleSkillAlert.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public componentDidMount() {
    this.getSkillsList(this.state.currentLevel, this.state.unlockedFoundations);
  }

  public componentDidUpdate(prevProps: never, prevState: State) {
    if (this.state.currentLevel !== prevState.currentLevel) {
      const newSkills: SlimSkill["name"][] = [];
      this.state.viewable.forEach((skill) => {
        if (skill.level === this.state.currentLevel) {
          newSkills.push(skill.name);
        }
      });
      if (newSkills.length > 1) {
        this.setState({ newSkillOptions: newSkills });
        this.openModal();
      }
    }
  }

  public render() {
    return (
      <div>
        <div className="mainPage">
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <Options newSkillOptions={this.state.newSkillOptions} closeModal={this.closeModal} />
          </Modal>
          <Title />
          <MainContent
            markCompleted={this.markCompleted}
            currentLevel={this.state.currentLevel}
            updateLevel={this.updateLevel}
            currentSkillName={this.state.currentSkillName}
            changeCurrentSkill={this.changeCurrentSkill}
          />
        </div>
        <SideBar
          skillAlert={this.state.skillAlert}
          toggleSkillAlert={this.toggleSkillAlert}
          completedSkills={this.state.completed}
          viewableSkills={this.state.viewable}
          changeCurrentSkill={this.changeCurrentSkill}
        />
      </div>
    );
  }

  private openModal() {
    this.setState({ modalIsOpen: true });
  }

  private closeModal() {
    this.setState({ modalIsOpen: false });
  }

  private toggleSkillAlert() {
    this.setState({ skillAlert: !this.state.skillAlert });
  }

  private changeCurrentSkill(name: SlimSkill["name"]) {
    if (this.state.currentSkillName !== name) {
      this.setState({ currentSkillName: name });
    }
  }

  private async updateLevel(currentSkill: Skill, update: Update) {
    this.toggleSkillAlert();
    try {
      let newSkillLevel: number;
      let unlockedFoundations: string[];
      if (update === Update.UPGRADE) {
        newSkillLevel = currentSkill.level + 1;
        unlockedFoundations = [...this.state.unlockedFoundations, currentSkill.name_uppercase];
      } else {
        newSkillLevel = currentSkill.level - 1 || 1;
        unlockedFoundations = this.state.unlockedFoundations.filter((foundation) => {
          return foundation !== currentSkill.name_uppercase;
        });
      }
      await this.getSkillsList(newSkillLevel, unlockedFoundations);
      this.setState({
        currentLevel: newSkillLevel,
        unlockedFoundations
      });
    } catch (error) {
      // TODO errors
      console.error(error);
      return;
    }
  }

  private markCompleted(skill: Skill["name"]) {
    this.setState({ completed: [...this.state.completed, skill.toUpperCase()] });
  }

  private async getSkillsList(level: Skill["level"], unlockedSkills: string[]) {
    const unlockedSkillsString: string = unlockedSkills.join(",");
    try {
      const results = await axios.get(`${DATABYLEVEL}/${level}`, {
        params: {
          unlocked: unlockedSkillsString
        }
      });
      const skills: SlimSkill[] = results.data;
      this.setState({ viewable: skills });
    } catch (error) {
      // TODO errors
      console.error(error);
      return;
    }
  }
}

export default App;
