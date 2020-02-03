import React from 'react';

class Next extends React.Component {
 
  _next = (e) => {    
    e.preventDefault()
    this.props.nextStep()
  };
  render(){
    let {currentStep} = this.props;
    if(currentStep <3){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={this._next}>
        Next test
        </button>        
      )
    }
    return null;
  }
  
}

export default Next;