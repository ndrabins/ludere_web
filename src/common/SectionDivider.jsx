import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

class SectionDivider extends Component {
  render() {
    const { content, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.divider1} />
        <Typography variant="subheading" className={classes.content}>{content}</Typography>
        <div className={classes.divider2} />
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
    marginTop: 5,
    fontColor: "#303030",
  },
  content:{
    marginLeft: 10,
    marginRight: 10,
    fontColor: "#303030",
  },
  divider1: {
    display: 'flex',
    height: 2,
    background: "linear-gradient(to right, #29b6f6, #6f86d6)",
    width: '100%',
  },
  divider2: {
    display: 'flex',
    height: 2,
    background: "linear-gradient(to left, #29b6f6, #6f86d6)",
    width: '100%',
  }
});
export default withStyles(styles)(SectionDivider);

