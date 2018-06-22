import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Quill from "quill";

class QuillTextEntry extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.quillRef = React.createRef();
  }

  componentDidMount() {
    const toolbarOptions = [
      "bold",
      "italic",
      "underline",
      "strike",
      "code-block"
    ];

    const options = {
      theme: "snow",
      placeholder: "Updates for the team",
      modules: {
        toolbar: toolbarOptions,
        syntax: true
      }
    };

    const quill = new Quill("#editor", options);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div ref={this.quillRef} id="editor" className={classes.quillEditor} />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 5,
    color: "#303030"
  },
  quillEditor: {
    // display: "flex",
    minWidth: 400,
    overflowY: "auto"
    // maxHeight: 300
  }
});
export default withStyles(styles)(QuillTextEntry);
