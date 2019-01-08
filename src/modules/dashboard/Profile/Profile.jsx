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
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import ResetPassword from "./components/ResetPassword";
import SectionDivider from "common/SectionDivider";

const backgroundImg =
  "https://images.unsplash.com/photo-1480339066136-cbded9b457ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      uploadingInProgress: false,
      uploadError: false,
      openSnackbar: false,
    };
    this.uploadRef = React.createRef();
  }

  uploadFile = ev => {
    ev.preventDefault();
    const file = this.uploadRef.current.files[0];
    const { user, actions } = this.props;
    const fileUpload = file;

    const profileRef = firebase.storage().ref(`images/${user.uid}/profilePic`);
    const task = profileRef.put(fileUpload);
    this.setState({ uploadingInProgress: true, uploadError: false });

    task.on(
      `state_changed`,
      snapshot => {},
      error => {
        console.log("Error:", error);
        this.setState({ uploadingInProgress: false, uploadError: true });
      },
      () => {
        //Success
        this.setState({ uploadingInProgress: false, uploadError: false });
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
    const {
      displayName,
      openSnackbar,
      uploadingInProgress,
      uploadError,
    } = this.state;
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
            <Fade in={uploadingInProgress} timeout={{ enter: 500, exit: 500 }}>
              <CircularProgress className={classes.avatarAdornment} />
            </Fade>
          </div>
          <div className={classes.content}>
            <Fade in={uploadError} timeout={{ enter: 500, exit: 500 }}>
              <div className={classes.errorContainer}>
                <ErrorIcon
                  className={classes.avatarAdornment}
                  style={{ color: "rgb(213, 0, 0)" }}
                />
                <Typography className={classes.errorText}>
                  Error: File is too large. (Max 5mb)
                </Typography>
              </div>
            </Fade>
            <Typography
              className={classes.subheading}
              variant="h5"
              gutterBottom
            >
              Profile Information
            </Typography>
            <ResetPassword />

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
    marginTop: "64px",
    marginBottom: 10,
  },
  content: {
    marginTop: 8,
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
    filter: "grayscale(50%)",
    borderBottom: "3px solid #6d6d6d",
  },
  avatarAdornment: {
    position: "absolute",
    left: "100px",
    bottom: "-70px",
    pointerEvents: "none",
  },
  avatar: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: "50%",
    bottom: "-80px",
    objectFit: "cover",
    border: "3px solid #6d6d6d",
    transition: "border 0.25s ease-out, transform 0.25s ease-out",
    cursor: "pointer",
    "&:hover": {
      border: "3px solid #29b6f6",
      transform: "scale(1.1)",
    },
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
  errorText: {
    color: "rgb(213, 0, 0)",
    marginLeft: "170px",
  },
  errorContainer: {
    display: "flex",
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
