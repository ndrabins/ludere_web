import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";

class TeamCard extends Component {
  static defaultProps = {
    background: `linear-gradient(to left, #6fe5c9, #00bcd4)`
  }

  render() {
    const { classes, title, background } = this.props;
    return (
      <Paper className={classes.paperContainer} elevation={8}>
        <div style={{...inlineStyles.heading, background: background}}>
          <Typography className={classes.title} variant="headline"> {title} </Typography>
        </div>
        <div className={classes.root}>
          {this.props.children}
        </div>
      </Paper>
    );
  }
}

const inlineStyles = {
  heading: {
    height: 50,
    width: '100%',
    display: 'flex',
    borderRadius: "7px 7px 0px 0px",
    alignItems: 'center',
  },
}

const styles = theme => ({
  root: {
    display:'flex',
  },
  title:{
    color: '#fff',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    flex: 1,
  },
});

export default withStyles(styles)(TeamCard);
