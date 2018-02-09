import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";

class TeamDashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={0} className={classes.teamContainer}>
          <Grid item xs={12}>
            <Grid container spacing={0} className={classes.teamContainer}>
              <Grid item xs={6} className={classes.teamContainerItem}>
                <Paper className={classes.paperContainer} elevation={8} />
              </Grid>
              <Grid item xs={6} className={classes.teamContainerItem}>
                <Paper className={classes.paperContainer} elevation={8}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.teamContainerItem}>
            <Paper className={classes.paperContainer} elevation={8}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    // flexGrow: 1,
    height:'100%',
    minHeight: 500,
  },
  teamContainer: {
    height: '100%',
  },
  paperContainer: {
    height: '100%',
  },
  teamContainerItem: {
    padding: 10,
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
