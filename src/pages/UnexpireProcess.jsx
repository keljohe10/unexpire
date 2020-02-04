import React from "react";
import UnexpireForm from "../components/UnexpireForm/UnexpireForm";
import Header from "../components/common/Header/Header";

class UnexpireProcess extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <UnexpireForm />
      </React.Fragment>
    );
  }
}

export default UnexpireProcess;
