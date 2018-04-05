import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

class Loading extends Component {
  static defaultProps = {
    size: 50,
  }

  render() {
    const { size } = this.props;
    return (
      <div>
        <CircularProgress size={size} />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    height: '100%',
  }
});

export default withStyles(styles)(Loading);

