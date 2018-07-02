import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Quill from "quill";

class QuillEditor extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { myQuill } = this.state;
    if (nextProps.value !== this.props.value) {
      if (typeof value === "string") {
        myQuill.setText(nextProps.value);
      } else {
        myQuill.setContents(nextProps.value);
      }
    }
  }

  constructor(props) {
    super(props);
    this.quillRef = React.createRef();

    this.state = {
      myQuill: null
    };
  }

  componentDidMount() {
    const { value, editorName } = this.props;
    console.log(editorName);

    const options = {
      readOnly: true,
      theme: "bubble",
      modules: {
        toolbar: [["blockquote", "code-block", "image", "video"]],
        syntax: true
      }
    };

    const quill = new Quill(`#${editorName}`, options);
    if (typeof value === "string") {
      quill.setText(value);
    } else {
      quill.setContents(value);
    }

    this.setState({ myQuill: quill });
  }

  render() {
    const { classes, editorName } = this.props;
    return (
      <div className={classes.root}>
        <div
          ref={this.quillRef}
          id={editorName}
          className={classes.quillEditor}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    color: "#303030"
  },
  quillEditor: {
    fontFamily: "Roboto"
  }
});
export default withStyles(styles)(QuillEditor);
