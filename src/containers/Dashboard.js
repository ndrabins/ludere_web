import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import Button from "material-ui/Button";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Button raised color="primary">
          Dashboard
        </Button>
        <Button raised color="primary" onClick={() => this.props.actions.signOutUser()}>
          Sign out
        </Button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
