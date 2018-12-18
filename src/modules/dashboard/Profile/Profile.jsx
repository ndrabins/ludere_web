import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";

import firebase from "firebase/app";
import "firebase/storage";

import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

const backgroundImg =
  "https://images.unsplash.com/photo-1480339066136-cbded9b457ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { displayName: "" };
    this.uploadRef = React.createRef();
  }

  uploadFile = ev => {
    ev.preventDefault();
    const file = this.uploadRef.current.files[0];
    const { user, actions } = this.props;
    const fileUpload = file;

    const profileRef = firebase.storage().ref(`images/${user.uid}/profilePic`);
    const task = profileRef.put(fileUpload);
    task.on(
      `state_changed`,
      snapshot => {},
      error => {
        console.log("Error:", error);
      },
      () => {
        //Success
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          actions.updateUserProfile({ photoURL: downloadURL });
        });
      }
    );
  };

  handleAvatarClick = () => {
    this.uploadRef.current.click();
  };

  handleUpdateProfile = () => {
    const { profile, actions } = this.props;
    const { displayName } = this.state;

    let updatedProfile = { ...profile };
    updatedProfile.displayName = displayName;
    this.setState({ openSnackbar: true });

    actions.updateUserProfile({ displayName: displayName });
  };

  handleClose = () => {
    this.setState({ openSnackbar: false });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { displayName, openSnackbar } = this.state;
    const { classes, profile } = this.props;

    return (
      <Fade in={true} timeout={{ enter: 800, exit: 800 }}>
        <div className={classes.root}>
          <div className={classes.header}>
            <img
              className={classes.headerImg}
              src={backgroundImg}
              alt="background"
            />
            <input
              className={classes.fileInput}
              id="avatar-file-upload"
              type="file"
              accept="image/*"
              onChange={this.uploadFile}
              ref={this.uploadRef}
            />
            <img
              className={classes.avatar}
              src={profile.photoURL}
              alt="Profile"
              htmlFor="avatar-file-upload"
              onClick={this.handleAvatarClick}
            />
          </div>
          <div className={classes.content}>
            <Typography
              className={classes.subheading}
              variant="h5"
              gutterBottom
            >
              Profile Information
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel
                FormLabelClasses={{
                  root: classes.label,
                  focused: classes.cssFocused,
                }}
                shrink={true}
              >
                Display Name
              </InputLabel>
              <Input
                classes={{ focused: classes.inputFocused }}
                className={classes.input}
                value={displayName}
                onChange={this.handleChange("displayName")}
                fullWidth
                disableUnderline
              />
              <FormHelperText>
                What do people in your workspace call you?
              </FormHelperText>
            </FormControl>
            <Button
              onClick={this.handleUpdateProfile}
              variant="contained"
              className={classes.saveButton}
            >
              Save Profile
            </Button>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={openSnackbar}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id",
            }}
            message={<span id="message-id">Profile Updated</span>}
          />
        </div>
      </Fade>
    );
  }
}

const styles = {
  root: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    flexDirection: "column",
    overflowY: "auto",
  },
  subheading: {
    marginBottom: 10,
  },
  content: {
    marginTop: 120,
    marginLeft: 40,
    marginRight: 40,
  },
  header: {
    position: "relative",
    height: 200,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
  },
  headerImg: {
    position: "absolute",
    height: 200,
    objectFit: "cover",
    left: 0,
    width: "100%",
    filter: "grayscale(1)",
  },
  avatar: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: "50%",
    bottom: "-50px",
    objectFit: "cover",
  },
  formControl: {
    marginBotton: 10,
    width: "100%",
  },
  label: {
    "&$cssFocused": {
      color: "#303030",
      fontWeight: 500,
    },
    color: "#303030",
  },
  cssFocused: {},
  input: {
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: 5,
    color: "#303030",
    border: "1px solid #6d6d6d",
    overflow: "hidden",
    cursor: "text",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #B9BBBE",
    },
  },
  inputFocused: {
    border: "1px solid #303030",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #303030",
    },
  },
  fileInput: {
    display: "none",
  },
  saveButton: {
    marginTop: 30,
    color: "white",
    background: `linear-gradient(to right, #29b6f6, #796eff)`,
  },
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    profile: state.profile.myUserProfile,
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
)(withStyles(styles)(Profile));
