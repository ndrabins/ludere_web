import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as Actions from "../../../actions";

import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import SectionDivider from "../../../common/SectionDivider";
import CommentList from "./CommentList";

class CommentSection extends Component {
  state = {
    commentText: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCreateComment = () => {
    const { commentText } = this.state;
    if (commentText === "") {
      return;
    }

    this.props.actions.createComment(commentText);
    this.setState({ commentText: "" });
  };

  // handleDelete = removeIndex => {
  //   const { task } = this.props;
  //   let { subtasks } = task;
  //   subtasks = subtasks.splice(removeIndex, 1);
  //   this.props.actions.updateTask(task);
  // };

  // updatecommentText = (index, commentText) => {
  //   const { task } = this.props;
  //   let { subtasks } = task;
  //   subtasks[index].content = commentText;
  //   this.props.actions.updateTask(task);
  // };

  render() {
    const { classes, task, comments } = this.props;
    const { commentText } = this.state;

    return (
      <div className={classes.root}>
        <SectionDivider content={"Comments"} />
        <CommentList comments={comments} />
        <div className={classes.entryWrapper}>
          <FormControl className={classes.formControl}>
            <Input
              className={classes.input}
              classes={{ focused: classes.inputFocused }}
              value={commentText}
              onChange={this.handleChange("commentText")}
              multiline
              fullWidth
              rows="2"
              rowsMax="5"
              placeholder="Comments..."
              disableUnderline
              onKeyPress={ev => {
                if (ev.key === "Enter" && !ev.shiftKey) {
                  this.handleCreateComment();
                  ev.preventDefault();
                }
              }}
            />
          </FormControl>
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "column"
  },
  entryWrapper: {
    display: "flex",
    marginTop: -8
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    border: "transparent 2px solid",
    transition: "border .25s ease-out",
    "&:hover": {
      border: "#B0B2B6 2px solid"
    }
  },
  inputFocused: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    transition: "border .25s ease-out",
    border: "2px solid #6d6d6d",
    "&:hover": {
      border: "2px solid #6d6d6d"
    }
  },
  formControl: {
    width: "100%",
    marginTop: 3
  }
};

function mapStateToProps(state) {
  return {
    comments: state.workflow.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CommentSection)
);
