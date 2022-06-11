import React, { Component } from "react";
import GeneralInformation from "./components/GeneralInformation";
import Preview from "./components/Preview";
import EducationExperience from "./components/EducationExperience";
import PracticalExperience from "./components/PracticalExperience";
import "./index.css";
import ClearButton from "./components/ClearButton";
import Skills from "./components/Skills";
import Objective from "./components/Objective";

class App extends Component {
  constructor() {
    super();

    this.state = {
      // General Information
      generalInformation: [
        {
          name: "Sahil Nagpal",
          email: "sahil.nagpal@magna.com",
          phoneNumber: "437-770-1010",
          gitHub: "lil-sahil",
          proffessionalDesignation: "EIT (Engineer in Training)",
          id: 1,
        },
      ],

      objectiveInformation: "",

      educationInformation: [
        {
          degree: "",
          degreeDescription: "",
          schoolName: "",
          attendDates: "",
          city: "",
          stateProvince: "",
          country: "",
          id: 1,
        },
      ],

      technicalSkills: [],

      workInformation: [
        {
          jobTitle: "",
          workDates: "",
          companyName: "",
          description_1: "",
          id: 1,
        },
      ],

      projectInformation: [
        {
          projectTitle: "",
          projectDates: "",
          companyName: "",
          description_1: "",
          id: 1,
        },
      ],
    };

    this.changeField = this.changeField.bind(this);
    this.addItems = this.addItems.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.clear = this.clear.bind(this);
    this.addDescription = this.addDescription.bind(this);
    this.deleteDescription = this.deleteDescription.bind(this);
    this.addSkills = this.addSkills.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.objectiveChangeField = this.objectiveChangeField.bind(this);
  }

  // Check for change of Objective Field

  objectiveChangeField(e) {
    this.setState(
      {
        objectiveInformation: e.target.value,
      },
      () => console.log(this.state)
    );
  }

  // Check for change of fields
  changeField(e) {
    let informationBucket = e.target.parentNode.className;
    let elementId = parseInt(e.target.parentNode.parentNode.className);
    let informationType = e.target.className;

    this.setState((prevState) => {
      let filteredItem = prevState[`${informationBucket}`].filter(
        (item) => item.id === elementId
      );

      filteredItem[0][informationType] = e.target.value;

      return filteredItem;
    });
  }

  // Add items to state based on button id
  addItems(e) {
    // Determine which type of objec to add to state
    let bucket = e.target.className;
    let objectToAdd = {};
    if (bucket === "educationInformation") {
      objectToAdd = {
        degree: "",
        degreeDescription: "",
        schoolName: "",
        attendDates: "",
        city: "",
        stateProvince: "",
        country: "",
        id: 1,
      };
      bucket = "educationInformation";
    } else if (bucket === "workInformation") {
      objectToAdd = {
        jobTitle: "",
        workDates: "",
        companyName: "",
        description_1: "",
        id: 1,
      };
      bucket = "workInformation";
    } else if (bucket === "projectInformation") {
      objectToAdd = {
        projectTitle: "",
        projectDates: "",
        description_1: "",
        companyName: "",
        id: 1,
      };
    }

    // Set the state with the object
    this.setState(
      {
        [bucket]: this.state[bucket].concat(objectToAdd),
      },
      () => {
        let idNumber = 1;
        this.setState({
          [bucket]: this.state[bucket].map((item) => {
            item.id = idNumber;
            idNumber++;
            return item;
          }),
        });
      }
    );
  }

  // Delete items based on id
  deleteItems(e) {
    let itemId = parseInt(e.target.parentNode.className);
    let informationBucket = e.target.nextSibling.className;

    this.setState({
      [informationBucket]: this.state[informationBucket].filter(
        (x) => x.id !== itemId
      ),
    });
  }

  // Delete all items and reset fields.
  clear() {
    this.setState({
      // General Information
      generalInformation: [
        {
          name: "",
          email: "",
          phoneNumber: "",
          gitHub: "",
          proffessionalDesignation: "",
          id: 1,
        },
      ],

      objectiveInformation: "",

      educationInformation: [
        {
          degree: "",
          degreeDescription: "",
          schoolName: "",
          attendDates: "",
          city: "",
          stateProvince: "",
          country: "",
          id: 1,
        },
      ],

      technicalSkills: [],

      workInformation: [
        {
          jobTitle: "",
          workDates: "",
          companyName: "",
          description_1: "",
          id: 1,
        },
      ],

      projectInformation: [
        {
          projectTitle: "",
          projectDates: "",
          companyName: "",
          description_1: "",
          id: 1,
        },
      ],
    });
  }

  // Add button for description
  addDescription(e) {
    let itemId = parseInt(e.target.parentNode.className);
    let bucket = e.target.className;

    this.setState({
      [bucket]: this.state[bucket].map((x) => {
        if (x.id === itemId) {
          // Count the number of descriptions already present
          let keys = Object.keys(x);
          let descriptionCount = 1;

          keys.forEach((k) => {
            if (k.includes("description_")) {
              descriptionCount += 1;
            }
          });
          // add another description
          x[`description_${descriptionCount}`] = "";
        }
        return x;
      }),
    });
  }

  // Delete description
  deleteDescription(e) {
    let bucket = e.target.parentNode.className;
    let itemId = parseInt(e.target.parentNode.parentNode.className);
    let descriptionId = e.target.className;

    this.setState({
      [bucket]: this.state[bucket].map((x) => {
        if (x.id === itemId) {
          x = Object.fromEntries(
            Object.entries(x).filter(([key]) => key !== descriptionId)
          );
        }
        return x;
      }),
    });
  }

  // Add Skills
  addSkills(e) {
    let fieldValue = e.target.previousElementSibling.value;
    // When button is presses the skill is appended to the state.
    this.setState(
      {
        technicalSkills: this.state.technicalSkills.concat(fieldValue),
      },
      () => (e.target.previousElementSibling.value = "")
    );
  }

  // DeleteSkills
  deleteSkill(e) {
    let skillToDelete = e.target.id;
    console.log(skillToDelete);

    this.setState(
      {
        technicalSkills: this.state.technicalSkills.filter(
          (skill) => skill !== skillToDelete
        ),
      },
      () => console.log(this.state)
    );
  }

  render() {
    return (
      <div className="container-row">
        <div id="information-enter-screen">
          <h1>Enter your Objective</h1>

          <Objective checkChange={this.objectiveChangeField}></Objective>

          <h1>Enter Your Information</h1>
          <GeneralInformation
            checkChange={this.changeField}
            currentState={this.state}
          ></GeneralInformation>

          <h1>Enter Your Educational Experience</h1>

          <EducationExperience
            checkChange={this.changeField}
            currentState={this.state}
            addExperience={this.addItems}
            deleteItems={this.deleteItems}
          ></EducationExperience>

          <h1>Enter Your Work Experience</h1>

          <PracticalExperience
            bucket="workInformation"
            checkChange={this.changeField}
            currentState={this.state}
            addExperience={this.addItems}
            deleteItems={this.deleteItems}
            addDescription={this.addDescription}
            deleteDescription={this.deleteDescription}
          ></PracticalExperience>

          <h1>Enter your relevant Projects</h1>

          <PracticalExperience
            bucket="projectInformation"
            checkChange={this.changeField}
            currentState={this.state}
            addExperience={this.addItems}
            deleteItems={this.deleteItems}
            addDescription={this.addDescription}
            deleteDescription={this.deleteDescription}
          ></PracticalExperience>

          <h1>Enter your skills</h1>
          <Skills
            currentState={this.state}
            addSkills={this.addSkills}
            deleteSkill={this.deleteSkill}
          ></Skills>

          <ClearButton clear={this.clear}></ClearButton>
        </div>

        <div id="preview-screen" className="container-col">
          <Preview currentState={this.state}></Preview>
        </div>
      </div>
    );
  }
}

export default App;
