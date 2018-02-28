import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Map from "lodash/map";
import Has from "lodash/has";

class TeamMembers extends Component {
  render() {
    const { classes, workspaceMembers, teams, selectedTeam } = this.props;
    const teamMembers = teams[selectedTeam];

    return (
      <div className={classes.root}>
        <List className={classes.listRoot} dense>
            {Map(workspaceMembers, (member, key) => {
              return (
                <ListItem key={key} button className={classes.listItem}>
                  <Avatar className={classes.avatar} src="https://scontent.ford1-1.fna.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/22089762_10212994040620494_6391197030639313727_n.jpg?oh=3c0e14ac86a4edf2ad51c7bd32319402&oe=5B051ABF" />
                  <ListItemText primary={`${member.displayName}`} />
                  <ListItemSecondaryAction>
                    { Has(teamMembers, key) &&
                      <Button variant="raised" size="medium" color="primary" className={classes.button}>
                        Add To Team
                      </Button>
                    }
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    display:'flex',
    height: '100%',
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
  },
  avatar:{
    height: 40,
    width: 40,
  },
  button:{
    marginTop: 6,
    color: 'white',
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
