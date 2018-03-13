import React, { Component } from "react";

import fireIcon from "../../static/teamfire.svg";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class TeamOverviewTitle extends Component {
  render() {
    const { classes, location } = this.props;
    let onTeamPage = location.pathname === '/team/';

    return (
      <div>
        <Link to='/team/' className={onTeamPage ? classes.baseFocused : classes.baseWithHover}>
          <img src={fireIcon} />
          <div className={classes.titleText}>Team Overview</div>
        </Link>
      </div>
    );
  }
}

const styles = {
  titleText: {
    marginLeft: 14,
    display: "flex",
    alignSelf: "center"
  },
  baseWithHover:{
    textDecoration: "none",
    color: "#FFF",
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 24,
    borderRadius: 5,
    margin: '1px 8px',
    "&:hover": {
      transition: 'background-color .25s ease-out',
      backgroundColor: "#424242",
      cursor: "pointer"
    }
  },
  baseFocused:{
    textDecoration: "none",
    color: "#FFF",
    display: "flex",
    alignContent: "center",
    padding: 5,
    paddingLeft: 24,
    borderRadius: 5,
    margin: '1px 8px',
    backgroundColor: '#616161',
    transition: 'background-color .25s ease-out',
    "&:hover": {
      transition: 'background-color .25s ease-out',
      backgroundColor: "#424242",
      cursor: "pointer"
    }
  },
};

export default withStyles(styles)(withRouter(TeamOverviewTitle));
