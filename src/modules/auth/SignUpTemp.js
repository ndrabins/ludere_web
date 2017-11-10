import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

class SignUpTemp extends Component {
  render() {
    return (
      <div style={styles.moduleSignUpClosed} onClick={this.props.focusSignUp}>
        <p style={styles.header}>GET STARTED</p>
      </div>
    );
  }
}

const styles = {
  moduleSignUpClosed: {
    width: "150px",
    minHeight: "300px",

    display: "flex",    
    flexDirection: "row",
    overflow: "auto",    
   
    alignSelf: "center",
    
    padding: "50px",
    backgroundColor: 'rgba(48, 48, 48, 0.5)',
    borderRadius: "6px 0px 0px 6px",
    color: "white",

    position: "relative",    
    transition: "width 0.75s ease",
  },
  header: {
    color: "white",
    fontSize: "22px",
    alignSelf: "center",
  },
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpTemp);
