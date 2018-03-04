import React, { Component } from "react";
import Button from "material-ui/Button";

const required = value => (value == null ? "Required" : undefined);

class JoinWorkspaceForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3> JOIN A WORKSPACE </h3>
        <div>
          <Button type="submit" disabled={pristine || submitting} variant="raised" color="primary" style={styles.button}>
            Submit
          </Button>
        </div>
      </form>
    );
  };
};

const styles = {
  form:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    width: "100%",
    height: "100%",
  },
  button :{
    // background: "linear-gradient(to left, #6fe5c9, #00bcd4)",
    color:"white",
    margin: 10,
  }
}

export default JoinWorkspaceForm;
