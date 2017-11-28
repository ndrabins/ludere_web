import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import Avatar from 'material-ui/Avatar';

class CommunityList extends Component {
  render() {
    let id = 0;
    function createData(name, calories, fat, carbs, protein) {
      id += 1;
      return { id, name, calories, fat, carbs, protein };
    }

    const data = [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    //added tablecells are for styling the spacing lol. Probs can be refactored.
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell padding="checkbox">Avatar</TableCell>
              <TableCell numeric>Name</TableCell>
              <TableCell numeric>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id} hover>
                  <TableCell padding="checkbox">
                    <Avatar> N </Avatar>
                  </TableCell>
                  <TableCell numeric>{n.name}</TableCell>
                  <TableCell numeric>{n.fat}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaceUsers: state.workspace.workspaceUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityList);
