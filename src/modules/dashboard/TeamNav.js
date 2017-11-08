import React, { Component } from "react";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import Avatar from "material-ui/Avatar";
import PeopleIcon from "material-ui-icons/PeopleOutline";
import Tooltip from "material-ui/Tooltip";

import AddTeamButton from './AddTeamButton';

class TeamNav extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Tooltip id="tooltip-right-start" title="Community" placement="right">
          <Button fab style={styles.communityButton}>
            <PeopleIcon />
          </Button>
        </Tooltip>
        <Button fab style={styles.teamButton}>
          <Avatar style={styles.avatar}>H</Avatar>
        </Button>
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
    margin: "8px 0px 8px 0px"
  },

  avatar: {
    width: 36,
    height: 36
  }
};

export default TeamNav;
