import React, { Component } from 'react';
import { withStyles } from "material-ui/styles";

class TaskDetailTodoList extends Component {
  render() {
    const {classes }= this.props;
    return (
      <div>
        <div className={classes.header}>

        </div>
      </div>
    );
  }
}

const styles = {
  header: {
    display:'flex',
  }
}

export default 
  withStyles(styles)(TaskDetailTodoList);