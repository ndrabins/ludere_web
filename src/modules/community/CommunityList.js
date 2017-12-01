import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Map from "lodash/map";

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import PersonOutlineIcon from 'material-ui-icons/PersonOutline';

class CommunityList extends Component {

  renderUsers() {
    let users = Map(this.props.workspaceUsers, (user, uid) => {
      return (
        <TableRow key={uid} hover>
          <TableCell padding="checkbox">
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
      <div>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell padding="checkbox">Avatar</TableCell>
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

function mapStateToProps(state) {
  return {
    workspaceUsers: state.workspace.workspaceUsers,
    loading : state.workspace.loadingUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityList);
