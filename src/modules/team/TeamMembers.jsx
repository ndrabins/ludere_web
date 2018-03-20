import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import PersonIcon from 'material-ui-icons/AccountCircle'
import Map from "lodash/map";
import Has from "lodash/has";

class TeamMembers extends Component {
  componentDidMount(){
    this.props.actions.fetchWorkspaceUsers();
  }

  handleAddClick = (userID) => {
    const {selectedTeam} = this.props;
    this.props.actions.joinTeam(selectedTeam, userID)
  }

  render() {
    const { classes, workspaceMembers, teams, selectedTeam, loading } = this.props;

    if(loading){
      return <div> loading </div>
    }

    const teamMembers = teams[selectedTeam].members;

    return (
      <div className={classes.root}>
        <List className={classes.listRoot} dense>
            {Map(workspaceMembers, (member, userID) => {
              return (
                <ListItem key={userID} button className={classes.listItem}>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                  <ListItemText primary={`${member.displayName}`} />
                  <ListItemSecondaryAction>
                    {!Has(teamMembers, userID) &&
                      <Button variant="raised" size="medium" color="primary" onClick={() => this.handleAddClick(userID)} className={classes.button}>
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
    loading: state.team.loading,
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
