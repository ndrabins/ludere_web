import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";

class InviteMembersCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="title" gutterBottom>
          Invite Members
        </Typography>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    padding:10,
  },
});

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(InviteMembersCard)
);
