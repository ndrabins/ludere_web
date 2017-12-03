import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Map from "lodash/map";

import Table, { TableBody, TableCell, TableHead, TableRow, } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import Avatar from 'material-ui/Avatar';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';

class CommunityList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      // order: 'asc',
      // orderBy: 'calories',
      // selected
    }
  }

  handleUserSelect(uid, user) {
    this.props.history.push("/community/chat");
    this.props.actions.startDirectMessage(uid, user);
  }

  // isSelected = id => this.state.selected[id] === true;

  renderUsers() {
    let users = Map(this.props.workspaceUsers, (user, uid) => {

      return (
        <TableRow key={uid} hover style={{ cursor: "pointer" }} onClick={() => this.handleUserSelect(uid, user)} >
          <TableCell>
            <Avatar>
              <PersonOutlineIcon />
            </Avatar>
          </TableCell>
          <TableCell> {user.displayName} </TableCell>
          <TableCell numeric>true</TableCell>
        </TableRow>
      );
    });

    return users;
  }

  render() {
    return (
      <div style={styles.container}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell numeric>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderUsers()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flex: 1
  }
}

function mapStateToProps(state) {
  return {
    workspaceUsers: state.workspace.workspaceUsers,
    loading: state.workspace.loadingUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityList);
