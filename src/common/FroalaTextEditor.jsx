import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";

import FroalaEditor from "react-froala-wysiwyg";

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

class FroalaTextEditor extends Component {
  static defaultProps = {
    helperText: "Edit Your Content Here!",
    onChange: () => {},
    value: "",
  };

  config = {
    placeholderText: this.props.helperText,
    charCounterCount: false,
    events: {
      "froalaEditor.focus": () => {},
    },
    heightMin: 100,
    tabSpaces: 4,
    toolbarInline: true,
    toolbarButtons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "color",
      "-",
      "fontSize",
      "insertLink",
      "align",
      "insertTable",
      "clearFormatting",
      "-",
      "undo",
      "redo",
    ],
  };

  state = {
    model: this.props.value,
  };

  componentDidMount() {
    //remove warning from froala.. sorry guys. I will buy this when this app makes money
    const wrapper = document.querySelector(".fr-wrapper a");
    if (wrapper) {
      wrapper.remove();
    }
  }

  componentDidUpdate() {
    const wrapper = document.querySelector(".fr-wrapper a");
    if (wrapper) {
      wrapper.remove();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (nextProps.value !== value) {
      this.setState({ model: nextProps.value });
    }
  }

  handleModelChange = model => {
    this.setState({
      model: model,
    });
    this.props.onChange(model);
  };

  render() {
    const { classes, taskID } = this.props;
    const { model } = this.state;
    let formattedModel = model;

    if (taskID === undefined) {
      return null;
    }

    if (typeof model === "object") {
      formattedModel = JSON.stringify(model);
    }

    // to delete froalas warning.. we will pay eventually
    return (
      <div className={classes.root}>
        <FroalaEditor
          tag={"textarea"}
          config={this.config}
          model={formattedModel}
          onModelChange={this.handleModelChange}
        />
      </div>
    );
  }
}

const styles = {
  root: {},
};

export default withStyles(styles)(FroalaTextEditor);
