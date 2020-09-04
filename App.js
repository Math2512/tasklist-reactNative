import React from "react";
import lodash from "lodash";
import { View, ScrollView, Text, AsyncStorage } from "react-native";
import Header from "./components/header";
import TaskList from "./components/task-list";
import ButtonAddTask from "./components/button-addTask";
import MenuTask from "./components/menu-task";
import { TASK } from "./model";
import TextPrompt from "./components/text-prompt";
import { style } from "./style.js";

const storageKey = "taskList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      isMenuTaskVisible: false,
      currentTask: {},
      isAddTaskPrompt: false,
      isRenamePromptVisible: false,
      idGenerator: 0
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(storageKey).then(storeTaskList => {
      if (storeTaskList) {
        this.setState({ taskList: JSON.parse(storeTaskList) }, () => {
          this.setState({
            idGenerator:
              this.state.taskList[this.state.taskList.length - 1].id + 1
          });
        });
      }
    });
  }

  toggleMenuTaskVisibility = task => {
    let currentTask = task;
    if (this.state.isMenuTaskVisible) {
      currentTask = {};
    }

    this.setState({
      isMenuTaskVisible: !this.state.isMenuTaskVisible,
      currentTask: currentTask
    });
  };

  deleteCurrentTask = () => {
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });
    const list = this.state.taskList;
    list.splice(index, 1);
    this.setState({ taskList: list, currentTask: {} }, () => {
      this.toggleMenuTaskVisibility();
      this.saveTaskList();
    });
  };

  toggleCurrentTask = () => {
    const updatedTask = this.state.currentTask;
    updatedTask.statut =
      this.state.currentTask.statut === TASK.doneStatus
        ? TASK.todoStatus
        : TASK.doneStatus;
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });
    const updatedTaskList = this.state.taskList;

    updatedTaskList[index] = updatedTask;
    this.setState(
      {
        taskList: updatedTaskList,
        isMenuTaskVisible: false,
        currentTask: {}
      },
      () => {
        this.saveTaskList();
      }
    );
  };

  hideAddPrompt = () => {
    this.setState({
      isAddTaskPrompt: false
    });
  };
  onAddTask = value => {
    if (value != "") {
      const newTask = {
        id: this.state.idGenerator,
        content: value,
        statut: TASK.todoStatus
      };
      this.setState(
        {
          taskList: [...this.state.taskList, newTask],
          isAddTaskPrompt: false,
          idGenerator: this.state.idGenerator + 1
        },
        () => {
          this.saveTaskList();
        }
      );
    }
  };

  displayAddPrompt = () => {
    this.setState({
      isAddTaskPrompt: true
    });
  };

  displayRenameTask = task => {
    this.setState({
      currentTask: task,
      isRenamePromptVisible: true
    });
  };

  hideRenamePrompt = () => {
    this.setState({
      currentTask: {},
      isRenamePromptVisible: false
    });
  };

  onRenameTask = value => {
    const updatedTask = this.state.currentTask;
    updatedTask.content = value;
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });
    const updatedTaskList = this.state.taskList;
    updatedTaskList[index] = updatedTask;
    this.setState(
      {
        taskList: updatedTaskList
      },
      () => {
        this.hideRenamePrompt();
        this.saveTaskList();
      }
    );
  };

  saveTaskList = () => {
    AsyncStorage.setItem(storageKey, JSON.stringify(this.state.taskList));
  };

  renderTaskList = () => {
    if (this.state.taskList.length > 0) {
      return (
        <TaskList
          taskList={this.state.taskList}
          onPressCallback={this.toggleMenuTaskVisibility}
          onLongPressCallback={this.displayRenameTask}
        />
      );
    } else {
      return (
        <View style={style.notask}>
          <Text>Clique sur le bouton ajouter pour créer une tâche</Text>
        </View>
      );
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header content="Liste de tâches" />
        <ScrollView>{this.renderTaskList()}</ScrollView>
        <MenuTask
          visibility={this.state.isMenuTaskVisible}
          onDisapearCallBack={this.toggleMenuTaskVisibility}
          onDeleteCallback={this.deleteCurrentTask}
          onChangeCallback={this.toggleCurrentTask}
        />
        <TextPrompt
          visibility={this.state.isAddTaskPrompt}
          onCancelCallback={this.hideAddPrompt}
          onSubmitCallback={this.onAddTask}
          placeHolder={"Ex : Acheter du lait"}
          title={"Ajouter une nouvelle tâche"}
        />
        <TextPrompt
          visibility={this.state.isRenamePromptVisible}
          onCancelCallback={this.hideRenamePrompt}
          onSubmitCallback={this.onRenameTask}
          title={"Renommer la tâche"}
          defaultValue={this.state.currentTask.content}
        />
        <ButtonAddTask onPressCallback={this.displayAddPrompt} />
      </View>
    );
  }
}
