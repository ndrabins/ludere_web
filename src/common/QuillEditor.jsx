import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Quill from "quill";
import Debounce from "lodash/debounce";

class QuillEditor extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    helperText: PropTypes.string,
    handleBlur: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    helperText: "",
    handleBlur: () => {},
    onChange: () => {} // do nothing on onChange unless we give a prop
  };

  constructor(props) {
    super(props);
    this.quillRef = React.createRef();

    this.state = {
      myQuill: null,
      selectedIndex: 0,
      selectedRange: 0
    };
    this.onChange = Debounce(this.props.onChange, 3000); // debounce changes to not send too many network updates
  }

  componentWillReceiveProps(nextProps) {
    const { myQuill, selectedIndex, selectedRange } = this.state;

    if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
      if (typeof value === "string") {
        myQuill.setText(nextProps.value);
      } else {
        myQuill.setContents(nextProps.value);
      }
      myQuill.setSelection(selectedIndex, selectedRange);
    }
  }

  componentDidMount() {
    const { value } = this.props;

    const options = {
      theme: "snow",
      placeholder: this.props.helperText,
      modules: {
        toolbar: [
          [{ header: 1 }, { header: 2 }],
          ["bold", "italic"],
          ["blockquote", "code-block", "video"],
          [{ list: "ordered" }, { list: "bullet" }]
        ],
        syntax: true
      }
    };

    const quill = new Quill("#editor", options);
    if (typeof value === "string") {
      quill.setText(value);
    } else {
      quill.setContents(value);
    }

    this.setState({ myQuill: quill });

    quill.on("editor-change", (eventName, ...args) => {
      if (eventName === "text-change") {
        this.handleEditorChange();
      }
    });
  }

  handleEditorChange = () => {
    const { myQuill } = this.state;
    // TODO: May need to do some refactoring on this code.. calls twicces
    this.onChange(myQuill.getContents());
  };

  handleEditorBlur = () => {
    const { handleBlur } = this.props;
    const { myQuill } = this.state;
    const quillContent = myQuill.getContents();

    handleBlur(quillContent);
    //save here
  };

  onClick = () => {
    const { myQuill } = this.state;

    var range = myQuill.getSelection();
    if (range) {
      if (range.length === 0) {
        this.setState({
          selectedIndex: range.index,
          selectedRange: 0
        });
      } else {
        this.setState({
          selectedIndex: range.index,
          selectedRange: range.length
        });
      }
    } else {
      console.log("User cursor is not in editor");
    }
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
          onClick={this.onClick}
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
    minHeight: 100,
    fontFamily: "Roboto",
    overflowY: "auto"
  }
});
export default withStyles(styles)(QuillEditor);
