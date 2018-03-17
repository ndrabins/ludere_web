import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

class SectionDivider extends Component {
  render() {
    const { content, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.divider} />
        <Typography variant="subheading" className={classes.content}>{content}</Typography>
        <div className={classes.divider} />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  content:{
    marginLeft: 10,
    marginRight: 10,
  },
  divider: {
    display: 'flex',
    height: 1,
    backgroundColor: '#B9BBBE',
    width: '100%',
    // margin: 10,
  }
});

export default withStyles(styles)(SectionDivider);

