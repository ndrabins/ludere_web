import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";

import TeamMembers from "./TeamMembers";
import TeamCard from "./TeamCard";

class TeamDashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <div className={classes.column}>
            <TeamCard
              title={"Team Members"}
              background={`linear-gradient(to left, #6fe5c9, #00bcd4)`}
            >
              <TeamMembers />
            </TeamCard>
            <TeamCard
              title={"Notifications"}
              background={`linear-gradient(to right, #e57373, #ee8d68)`}
            >
              <div> coming soon </div>
            </TeamCard>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            <TeamCard
              title={"Activity"}
              background={`linear-gradient(to right, #29b6f6, #53C6F7)`}
            >
              <div> coming soon </div>
            </TeamCard>
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    height: "100%",
    minHeight: 500,
    display: "flex",
    flexDirection: "column",
    padding: 5
  },
  row: {
    paddingToz: 10,
    height: "50%",
    display: "flex"
  },
  column: {
    display: "flex",
    height: "100%",
    width: "100%"
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(TeamDashboard)
);
