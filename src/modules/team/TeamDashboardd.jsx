import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FireIcon from "../../static/teamfire.svg";

import ModuleHeader from "../../common/ModuleHeader";

import TeamMembers from "./TeamMembers";
import TeamCard from "./TeamCard";

class TeamDashboard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    selectedTeam: PropTypes.string.isRequired,
    teams: PropTypes.object.isRequired
  };
  render() {
    const { classes, selectedTeam, teams } = this.props;

    const team = teams[selectedTeam];
    return (
      <div className={classes.root}>
        <ModuleHeader>
          <Typography variant="headline" className={classes.header}>
            <img src={FireIcon} className={classes.icon} alt="team icon" />
            {team.name}
          </Typography>
        </ModuleHeader>
        <div className={classes.row}>
          <div className={classes.column}>
            <TeamCard
              title={"Team Members"}
              background={`linear-gradient(to right, #00BCD4, #26d0ce)`}
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
    flexDirection: "column"
  },
  row: {
    paddingTop: 5,
    height: "50%",
    display: "flex"
  },
  column: {
    display: "flex",
    height: "100%",
    width: "100%"
  },
  header: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    filter: "invert(100%)",
    marginRight: 8
  }
});

function mapStateToProps(state) {
  return {
    selectedTeam: state.team.selectedTeam,
    teams: state.team.teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(TeamDashboard)
);
