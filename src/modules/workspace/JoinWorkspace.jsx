import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import Loading from "../../common/Loading";

class joinWorkspace extends Component {
  componentDidMount() {
    const { workspaceID } = this.props.match.params;
    this.props.actions.joinWorkspace(workspaceID, this.props.history);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        Joining Workspace!
        <div> something </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(joinWorkspace)
);
