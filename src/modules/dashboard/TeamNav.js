import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import { Link } from "react-router-dom";
import Map from "lodash/map";

import Button from "material-ui/Button";
import Avatar from "material-ui/Avatar";
import PeopleIcon from "material-ui-icons/PeopleOutline";
import Tooltip from "material-ui/Tooltip";

import AddTeamButton from "./AddTeamButton";

class TeamNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indicatorHeight: 50
    };
  }

  handleTeamSelect(key) {
    // this.setState({indicatorHeight: this.state.indicatorHeight * 2});
    this.props.history.push("/team/");
    this.props.actions.selectTeam(key);
  }

  handleCommunitySelect() {
    this.props.history.push("/community/");
    this.props.actions.selectTeam(null);
  }

  renderTeams() {
    if (!this.props.teams) {
      return;
    }
    let teams = Map(this.props.teams, (team, key) => {
      return (
        <div key={key} style={styles.teamButtonContainer}>
          <div style={this.props.selectedTeam === key ? styles.selectIndicator : null} />
          <Tooltip id="tooltip-right-start" title={team.name} placement="right">
            <Button
              fab
              style={styles.teamButton}
              onClick={() => this.handleTeamSelect(key)}
            >
              <Avatar style={styles.avatar}>{team.name[0]}</Avatar>
            </Button>
          </Tooltip>
        </div>
      );
    });
    return teams;
  }

  // />
  render() {
    return (
      <div style={styles.containerWrapper} >
        <div style={styles.container}>
          <div style={{ ...styles.teamButtonContainer, paddingTop: 12 }}>
            <div style={this.props.selectedTeam === null ? styles.selectIndicator : null} />
            <Tooltip id="tooltip-right-start" title="Community" placement="right">
              <Button fab style={{ ...styles.teamButton, ...styles.communityButton }} onClick={() => this.handleCommunitySelect()}>
                <PeopleIcon />
              </Button>
            </Tooltip>
          </div>
          <div style={{ width: "40px", borderBottom: "#6f6f6f 2px solid", marginTop: 5, marginBottom: 5, }} />
          {this.renderTeams()}
          <AddTeamButton />
        </div>
      </div>
    );
  }
}

const styles = {
  containerWrapper: {
    height: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    width: 58,
  },
  container: {
    display: "flex",
    width: 58, //add 18 for
    paddingRight: 18,
    backgroundColor: "#000000",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 5.5px 5px 0 rgba(0, 0, 0, 0.24), 0 9px 18px 0 rgba(0, 0, 0, 0.18)",
    height: "100%",
    // overflowY: 'auto',
    // overflowX: 'hidden',
    // paddingRight: 18,
  },
  communityButton: {
    color: "#FFF",
    background: `linear-gradient(to left, #6fe5c9, #00bcd4)`,
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
    // position: 'absolute',
    width: 4,
    height: 38,
    backgroundColor: 'white',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: 'flex-start',
    display: 'flex',
    // transition: "top 0.25s linear",  },
  },
  teamButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    minHeight: 38,
    margin: "4px 0px 4px 0px"
  },
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
