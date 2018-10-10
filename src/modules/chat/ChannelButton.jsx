import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LudereInput from "common/LudereInput";
import Dialog from "common/Dialog";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

class ChannelButton extends Component {
  state = {
    anchorEl: null,
    isEditingChannelName: false,
    isDeletingChannel: false,
    channelName: this.props.name,
  };

  handleClickNavMenu = event => {
    this.setState({ openNavMenu: true, anchorEl: event.currentTarget });
  };

  handleRequestCloseNavMenu = () => {
    this.setState({ openNavMenu: false });
  };

  handleClick = () => {
    this.props.actions.selectChannel(this.props.channelID);
  };

  handleUpdateChannelName = () => {
    this.setState({ isEditingChannelName: true });
    this.handleClose();
  };

  handleChannelDeleteConfirmation = () => {
    const { actions, channelID } = this.props;
    actions.deleteChannel(channelID);
    this.handleClose();
  };

  handleChannelDelete = () => {
    this.setState({ isDeletingChannel: true });
    this.handleClose();
  };

  handleMenuClick = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCloseDialog = () => {
    this.setState({ isDeletingChannel: false, isEditingChannelName: false });
  };

  handleUpdateConfirmation = () => {
    const { channelName } = this.state;
    const { actions, channelID } = this.props;
    actions.updateChannel({ name: channelName }, channelID);
    this.setState({ isEditingChannelName: false });
  };

  render() {
    const { classes, channelID, selectedChannel, notifications } = this.props;
    const {
      anchorEl,
      isEditingChannelName,
      channelName,
      isDeletingChannel,
    } = this.state;

    let channelStyle = classes.channel;
    let nameStyle = classes.name;

    if (channelID === selectedChannel) {
      channelStyle = classes.selectedChannel;
      nameStyle = classes.selectedName;
    }

    return (
      <div className={channelStyle}>
        <Typography
          className={nameStyle}
          onClick={this.handleClick}
          noWrap
          component={Link}
          to="/team/chat"
          style={notifications[channelID] ? styles.notificationText : null}
        >
          <div
            className={
              notifications[channelID] ? classes.notificationIcon : null
            }
          />
          # {this.props.name}
        </Typography>

        <MoreVertIcon
          className={classes.icon}
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={ev => this.handleMenuClick(ev)}
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={this.handleUpdateChannelName}>
            <ListItemIcon className={classes.icon}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Name" />
          </MenuItem>
          <MenuItem onClick={this.handleChannelDelete}>
            <ListItemIcon className={classes.icon}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete Channel" />
          </MenuItem>
        </Popover>

        <Dialog
          handleAction={this.handleUpdateConfirmation}
          open={isEditingChannelName}
          handleClose={this.handleCloseDialog}
          titleName="Edit channel name"
          actionButtonName="Confirm"
          color="linear-gradient(to right, rgb(167, 112, 239), rgb(207, 139, 243))"
          helperText=""
        >
          <LudereInput
            autoFocus
            label="Channel Name"
            value={channelName}
            handleChange={this.handleChange("channelName")}
            helperText=""
            onKeyPress={ev => {
              if (ev.key === "Enter" && !ev.shiftKey) {
                this.handleUpdateConfirmation();
                ev.preventDefault();
              }
            }}
          />
        </Dialog>
        <Dialog
          handleAction={this.handleChannelDeleteConfirmation}
          open={isDeletingChannel}
          handleClose={this.handleCloseDialog}
          titleName="Delete channel"
          actionButtonName="Delete"
          color="rgb(229, 115, 115)"
          helperText="Warning: this will delete channel and all messages"
        />
      </div>
    );
  }
}

// {isEditingChannelName ? (
//   <Input
//     className={classes.input}
//     value={channelName}
//     onChange={this.handleChange("channelName")}
//     autoFocus
//     fullWidth
//     disableUnderline
//     onKeyPress={ev => {
//       if (ev.key === "Enter") {
//         this.handleFieldEnter();
//         ev.preventDefault();
//       }
//     }}
//   />
// ) : (

const styles = {
  channel: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    marginLeft: 8,
    marginRight: 9,
    height: 28,
    fontSize: "14px",
    transition: "background-color 0.25s ease-out",
    borderRadius: 5,
    "&:hover": {
      borderRadius: 5,
      backgroundColor: "#424242",
      cursor: "pointer",
    },
  },
  selectedChannel: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    marginLeft: 8,
    marginRight: 9,
    height: 28,
    fontSize: "14px",
    backgroundColor: "#616161",
    borderRadius: 5,
    transition: "background-color 0.25s ease-out",
    "&:hover": {
      borderRadius: 5,
      backgroundColor: "#424242",
      cursor: "pointer",
    },
  },
  notificationIcon: {
    height: 6,
    width: 12,
    borderRadius: 5,
    left: 26,
    background: "#6FE5C9",
    position: "absolute",
  },
  name: {
    position: "relative",
    textDecoration: "none",
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingLeft: 52,
    transition: "color 0.25s ease-out",
    color: "#6f6f6f",
    "&:hover": {
      color: "#b9bbbe",
      cursor: "pointer",
    },
  },
  selectedName: {
    position: "relative",
    textDecoration: "none",
    color: "#FFFFFF",
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingLeft: 52,
  },
  icon: {
    color: "#6f6f6f",
    marginTop: 2,
    "&:hover": {
      color: "#b9bbbe",
      cursor: "pointer",
    },
  },
  input: {
    fontWeight: 500,
    marginLeft: 50,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "hidden",
    overflowX: "hidden",
    cursor: "text",
  },
  notificationText: {
    fontWeight: 500,
    color: "white",
  },
};

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
    notifications: state.userData.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChannelButton));
