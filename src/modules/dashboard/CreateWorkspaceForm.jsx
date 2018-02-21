import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";
import Button from "material-ui/Button";

const required = value => (value == null ? "Required" : undefined);

class CreateWorkspaceForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3> CREATE A WORKSPACE </h3>
        <Field
          name="workspaceName"
          component={TextField}
          placeholder="Workspace Name"
          validate={required}
        />

        <div>
          <Button type="submit" disabled={pristine || submitting} raised color="primary" style={styles.button}>
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

CreateWorkspaceForm = reduxForm({
  form: "createWorkspaceForm"
})(CreateWorkspaceForm);

export default CreateWorkspaceForm;
