import React from "react";
import Step1 from "../Steps/Step1";
import Step2 from "../Steps/Step2";
import Step3 from "../Steps/Step3";
import Next from "../Buttons/Next";
import Previous from "../Buttons/Previous";
import "../../index.css";

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
      <div className="container app__form">
        <div className="row">
          <div className="col-6">
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
          </div>
          <div className="col-5 ml-4">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.{" "}
          </p>
        </div>
        </div>       
      </div>
    );
  }
}

export default UnexpireForm;
