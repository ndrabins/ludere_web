import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Map from "lodash/map";

import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
import PeopleIcon from "material-ui-icons/PeopleOutline";
import Tooltip from "material-ui/Tooltip";

import AddTeamButton from "./AddTeamButton";

class TeamNav extends Component {
  renderTeams() {
    if (!this.props.teams) {
      return;
    }
    let teams = Map(this.props.teams, (team, key) => {
      return (
        <div key={key} style={styles.teamButtonContainer}>
          <div style={this.props.selectedTeam === key ? styles.selectIndicator : null}/>
          <Tooltip id="tooltip-right-start" title={team.name} placement="right">
            <Button
              fab
              style={styles.teamButton}
              onClick={() => this.props.actions.selectTeam(key)}
            >
              <Avatar style={styles.avatar}>H</Avatar>
            </Button>
          </Tooltip>
        </div>
      );
    });
    return teams;
  }

  render() {
    return (
      <div style={styles.container}>
        <Tooltip id="tooltip-right-start" title="Community" placement="right">
          <Button fab style={styles.communityButton}>
            <PeopleIcon />
          </Button>
        </Tooltip>
        {this.renderTeams()}
        <AddTeamButton />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    width: 58,
    backgroundColor: "#000000",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 12
  },
  communityButton: {
    width: 36,
    height: 36,
    margin: "8px 0px 8px 0px",
    color: "#FFF",
    background: `linear-gradient(to left, #6fe5c9, #00bcd4)`
  },
  teamButton: {
    width: 36,
    height: 36,
    marginLeft: 11
  },
  avatar: {
    width: 36,
    height: 36
  },
  selectIndicator: {
    position:'absolute',
    width:4,
    height: 38,
    backgroundColor :'white',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  teamButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 38,
    margin: "4px 0px 4px 0px"
  }
};

function mapStateToProps(state) {
  return {
    teams: state.team.teams,
    selectedTeam: state.team.selectedTeam
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamNav);
