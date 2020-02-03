import React from "react";
import Step1 from "../Steps/Step1";
import Step2 from "../Steps/Step2";
import Step3 from "../Steps/Step3";
import Next from "../Buttons/Next";
import Previous from "../Buttons/Previous";

class UnexpireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      username: "",
      password: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, username, password } = this.state;
    alert(`Your registration detail: \n 
             Email: ${email} \n 
             Username: ${username} \n
             Password: ${password}`);
  };
  nextStep = () => {
    let { currentStep } = this.state;
    if (
      (currentStep === 1 && !this.state.email) ||
      (currentStep === 2 && !this.state.username)
    ) {
      return null;
    }
    this.setState({
      currentStep: (currentStep = currentStep >= 2 ? 3 : currentStep + 1)
    });
  };
  prevStep = () => {
    let { currentStep } = this.state;
    this.setState({
      currentStep: (currentStep = currentStep <= 1 ? 1 : currentStep - 1)
    });
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            email={this.state.email}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            username={this.state.username}
          />
          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            password={this.state.password}
          />
          <Previous
            currentStep={this.state.currentStep}
            prevStep={this.prevStep}
          />
          <Next 
            currentStep={this.state.currentStep} 
            nextStep={this.nextStep} 
          />
        </form>
        <div>
          <button type="button" onClick={this.handleSubmit}>
            save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default UnexpireForm;
