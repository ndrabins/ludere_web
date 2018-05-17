import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";

import * as Actions from "../../../actions";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/PersonOutline";
import IconButton from "@material-ui/core/IconButton";

class AssignUser extends Component {
  state = {
    showAssignUser: false
  };

  assignUserClick = event => {
    const { showAssignUser } = this.state;
    event.stopPropagation();
    this.setState({ showAssignUser: !showAssignUser });
    console.log("assigning user");
  };

  render() {
    const { task, taskID, classes } = this.props;

    return (
      <div style={styles.container} onClick={this.assignUserClick}>
        <IconButton className={classes.iconButton}>
          <PersonIcon className={classes.icon} />
        </IconButton>
      </div>
    );
  }
}

const styles = {
  iconButton: {
    width: 40,
    height: 40
  },
  icon: {
    fontSize: 30
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(AssignUser)
);
