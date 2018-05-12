import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { withStyles } from "material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "material-ui/Typography";
import Menu, { MenuItem } from "material-ui/Menu";

import { Link } from "react-router-dom";

class ChannelButton extends Component {
  state = {
    anchorEl: null,
    editingChannelName: false
  };

  handleClickNavMenu = event => {
    this.setState({ openNavMenu: true, anchorEl: event.currentTarget });
  };

  handleRequestCloseNavMenu = () => {
    this.setState({ openNavMenu: false });
  };

  handleClick = () => {
    this.props.actions.selectChannel(this.props.ID);
  };

  handleUpdateChannelName = () => {
    this.setState({ editingChannelName: true });
    this.handleClose();
  };

  handleChannelDelete = (event, channelID) => {
    console.log("deleting board", channelID);
    this.handleClose();
  };

  handleMenuClick = event => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { boardID, classes, ID, selectedChannel } = this.props;
    const { anchorEl } = this.state;

    let channelStyle = classes.channel;
    let nameStyle = classes.name;

    if (ID === selectedChannel) {
      channelStyle = classes.selectedChannel;
      nameStyle = classes.selectedName;
    }

    return (
      // <Link
      //   style={channelStyle}
      //   onMouseEnter={this.handleHover}
      //   onMouseLeave={this.handleHover}
      //   onClick={this.handleClick}
      //   to="/team/chat"
      // >
      //   # {this.props.name}
      // </Link>
      <div className={channelStyle}>
        <Typography
          className={nameStyle}
          onClick={this.handleClick}
          noWrap
          component={Link}
          to="/team/chat"
        >
          {this.props.name}
        </Typography>
        <MoreVertIcon
          className={classes.icon}
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={ev => this.handleMenuClick(ev)}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleUpdateChannelName}>Edit Name</MenuItem>
          <MenuItem onClick={ev => this.handleChannelDelete(ev, ID)}>
            Delete Channel
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const styles = {
  channel: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    marginLeft: 8,
    marginRight: 9,
    marginBottom: 1,
    height: 28,
    fontSize: "14px",
    transition: "background-color 0.25s ease-out",
    borderRadius: 5,
    "&:hover": {
      borderRadius: 5,
      backgroundColor: "#424242",
      cursor: "pointer"
    }
  },
  selectedChannel: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
    marginLeft: 8,
    marginRight: 9,
    marginBottom: 1,
    height: 28,
    fontSize: "14px",
    backgroundColor: "#616161",
    borderRadius: 5,
    transition: "background-color 0.25s ease-out",
    "&:hover": {
      borderRadius: 5,
      backgroundColor: "#424242",
      cursor: "pointer"
    }
  },
  name: {
    textDecoration: "none",
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingLeft: 52,
    transition: "color 0.25s ease-out",
    color: "#6f6f6f",
    "&:hover": {
      color: "#b9bbbe",
      cursor: "pointer"
    }
  },
  selectedName: {
    textDecoration: "none",
    color: "#FFFFFF",
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingLeft: 52
  },
  icon: {
    color: "#6f6f6f",
    marginTop: 2,
    "&:hover": {
      color: "#b9bbbe",
      cursor: "pointer"
    }
  }
};

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ChannelButton)
);
