import React from 'react'; 

function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          required
          placeholder="Enter password"
          value={props.password}
          onChange={props.handleChange}
          />      
      </div>
      </React.Fragment>
    );
  }

  export default Step3;