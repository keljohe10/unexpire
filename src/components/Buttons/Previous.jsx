import React from 'react';

class Previous extends React.Component {
 
  _prev = (e) => {    
    e.preventDefault()
    this.props.prevStep()
  };
  render(){
    let {currentStep} = this.props;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-secondary" 
          type="button" onClick={this._prev}>
        Previous
        </button>
      )
    }
    return null;
  }
  
}

export default Previous;