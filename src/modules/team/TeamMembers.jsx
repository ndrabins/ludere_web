import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import Map from "lodash/map";
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';

class TeamMembers extends Component {
  render() {
    const { classes, workspaceMembers, teams, selectedTeam } = this.props;
    const teamMembers = teams[selectedTeam];

    return (
      <div className={classes.root}>
        <List className={classes.listRoot}>
          {[0, 1, 2, 3].map(value => (
            <ListItem key={value} dense button className={classes.listItem}>
              <Avatar alt="Remy Sharp" src="https://scontent.ford1-1.fna.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/22089762_10212994040620494_6391197030639313727_n.jpg?oh=3c0e14ac86a4edf2ad51c7bd32319402&oe=5B051ABF" />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    overflowY: 'auto',
    display:'flex',
  },
  listRoot: {
    paddingTop: 0,
    width: '100%',
    display:'flex',
    flexDirection: 'column',
    height: '100%',
  },
  listItem: {
    width: '100%',
  }
});

function mapStateToProps(state) {
  return {
    workspaceMembers: state.workspace.workspaceUsers,
    teams: state.team.teams,
    selectedTeam: state.team.selectedTeam,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(TeamMembers)
);
