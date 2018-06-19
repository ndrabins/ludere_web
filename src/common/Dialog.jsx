import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

class DeleteDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleAction: PropTypes.func.isRequired,
    titleName: PropTypes.string.isRequired,
    actionButtonName: PropTypes.string.isRequired,
    color: PropTypes.string,
    helperText: PropTypes.string
  };

  render() {
    const {
      classes,
      handleClose,
      handleAction,
      open,
      titleName,
      actionButtonName,
      color,
      helperText
    } = this.props;
    return (
      <Dialog onClose={handleClose} aria-labelledby="dialog" open={open}>
        <div className={classes.root}>
          <IconButton className={classes.closeIcon} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography className={classes.title}>{titleName}</Typography>
          <div className={classes.dialogDividerContainer}>
            <div
              className={classes.dialogDividerColored}
              style={{ backgroundColor: color }}
            />
          </div>
          <Typography className={classes.helperText}>{helperText}</Typography>
          {this.props.children}
          <div className={classes.buttonContainer}>
            <Button onClick={handleClose} className={classes.backButton}>
              Back
            </Button>
            <Button
              onClick={handleAction}
              className={classes.actionButton}
              style={{ backgroundColor: color }}
            >
              {actionButtonName}
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#303030",
    minWidth: 300,
    padding: 24,
    position: "relative"
  },
  title: {
    fontSize: 24,
    margin: "8px 0px"
  },
  closeIcon: {
    position: "absolute",
    top: 2,
    right: 2
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  actionButton: {
    color: "#FFF"
  },
  backButton: {
    color: "#B9BBBE"
  },
  helperText: {
    fontSize: "14px",
    marginBottom: 8
  },
  dialogDividerContainer: {
    width: "100%",
    backgroundColor: "rgba(185,187,190,0.15)",
    marginBottom: 24,
    height: 4
  },
  dialogDividerColored: {
    width: "40%",
    borderRadius: 5,
    marginBottom: 24,
    height: 4
  }
});
export default withStyles(styles)(DeleteDialog);
