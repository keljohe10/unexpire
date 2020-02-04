import React from "react";
import "./App.css";
import UnexpireProcess from "./pages/UnexpireProcess";
import swal from 'sweetalert';
import helperUtil from './helpers/utils/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }  
  async componentDidMount(){
    if(await helperUtil.isAuthorized()){
      this.setState({
        auth: true
      })
    }
    if (!this.state.auth) {
      swal({
        title: 'Warning!',
        text: 'unauthorized',
        icon: 'warning',
        button: true
      }).then(value => {
        if (value) {
          window.location = "https://cebroker.com/";
        }
      });
    }
  }
  render(){
    return (
      <>
       {this.state.auth && <UnexpireProcess /> } 
      </>
    );
  }
}

export default App;
