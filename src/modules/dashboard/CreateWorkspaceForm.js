import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";
import Button from "material-ui/Button";

const required = value => (value == null ? "Required" : undefined);

class CreateWorkspaceForm extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="workspaceName"
          component={TextField}
          placeholder="Workspace Name"
          validate={required}
        />

        <div>
          <Button type="submit" disabled={pristine || submitting} raised>
            Submit
          </Button>
        </div>
      </form>
    );
  };
};

CreateWorkspaceForm = reduxForm({
  form: "createWorkspaceForm"
})(CreateWorkspaceForm);

export default CreateWorkspaceForm;
