import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Quill from "quill";

class QuillEditor extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    helperText: PropTypes.string,
    handleBlur: PropTypes.func,
    onChange: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    const { myQuill } = this.state;
    if (nextProps.value !== this.props.value) {
      myQuill.setContents(nextProps.value);
    }
  }

  static defaultProps = {
    helperText: "",
    handleBlur: () => {},
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    this.quillRef = React.createRef();

    this.state = {
      myQuill: null
    };
  }

  componentDidMount() {
    const { value } = this.props;

    const toolbarOptions = [
      "bold",
      "italic",
      "underline",
      "strike",
      "code-block",
      "blockquote"
    ];

    const options = {
      theme: "snow",
      placeholder: this.props.helperText,
      modules: {
        toolbar: toolbarOptions,
        syntax: true
      }
    };

    const quill = new Quill("#editor", options);
    quill.setContents(value);
    this.setState({ myQuill: quill });
  }

  handleEditorBlur = () => {
    const { handleBlur } = this.props;
    const { myQuill } = this.state;
    const quillContent = myQuill.getContents();

    handleBlur(quillContent);
    //save here
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div
          ref={this.quillRef}
          id="editor"
          className={classes.quillEditor}
          onBlur={this.handleEditorBlur}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#303030"
  },
  quillEditor: {
    fontFamily: "Roboto",
    overflowY: "auto"
  }
});
export default withStyles(styles)(QuillEditor);
