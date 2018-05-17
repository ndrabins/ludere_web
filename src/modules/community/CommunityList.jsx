import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Map from "lodash/map";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Avatar from "@material-ui/core/Avatar";

class CommunityList extends Component {
  handleUserSelect(uid, user) {
    this.props.history.push("/community/chat");
    this.props.actions.startDirectMessage(uid, user);
  }

  // isSelected = id => this.state.selected[id] === true;

  renderUsers() {
    let users = Map(this.props.workspaceUsers, (user, uid) => {
      // if(this.props.myID === uid){
      //   return; // don't render my own name in the list of users
      // }
      return (
        <TableRow
          key={uid}
          hover
          style={{ cursor: "pointer" }}
          onClick={() => this.handleUserSelect(uid, user)}
        >
          <TableCell>
            <Avatar src={user.photoURL} />
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
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell numeric>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderUsers()}</TableBody>
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
};

function mapStateToProps(state) {
  return {
    workspaceUsers: state.workspace.workspaceUsers,
    loading: state.workspace.loadingUsers,
    myID: state.auth.user.uid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityList);
