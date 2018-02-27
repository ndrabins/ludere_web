import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";

import TeamMembers from "./TeamMembers";
import TeamCard from "./TeamCard";

class TeamDashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.teamContainer}>
          <Grid item xs={12} className={classes.teamContainer}>
            <Grid container spacing={0} className={classes.teamContainer}>
              <Grid item xs={6} className={classes.teamContainerItem}>
                <TeamCard
                  title={"Team Members"}
                  background={`linear-gradient(to left, #6fe5c9, #00bcd4)`}
                >
                  <TeamMembers />
                </TeamCard>
              </Grid>
              <Grid item xs={6} className={classes.teamContainerItem}>
                <TeamCard
                  title={"Notifications"}
                  background={`linear-gradient(to right, #e57373, #ee8d68)`}
                >
                  <TeamMembers />
                </TeamCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.teamContainerItem}>
            <TeamCard
              title={"Activity"}
              background={`linear-gradient(to right, #29b6f6, #6f86d6)`}
            >
              <TeamMembers />
            </TeamCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    // flexGrow: 1,
    height: "100%",
    minHeight: 500,
    display:'flex',
  },
  teamContainer: {

  },
  teamContainerItem: {
    padding: 10,
    flex: 1,
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
