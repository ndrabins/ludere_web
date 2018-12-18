import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";

import firebase from "firebase/app";
import "firebase/storage";

import { FilePond, File, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilepondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginValidateSize from "filepond-plugin-file-validate-size";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import "./filepond.css";

import Fade from "@material-ui/core/Fade";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilepondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType,
  FilePondPluginValidateSize
);

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [], //${this.props.profile.photoURL}
      displayName: this.props.profile && this.props.profile.displayName,
      openSnackbar: false,
    };
  }

  // Initialized the file
  handleInit = () => {};

  handleProcessing = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort
  ) => {
    const { user, actions } = this.props;
    const fileUpload = file;

    const profileRef = firebase.storage().ref(`images/${user.uid}/profilePic`);
    const task = profileRef.put(fileUpload, metadata);

    task.on(
      `state_changed`,
      snapshot => {
        progress(true, snapshot.bytesTransferred, snapshot.totalBytes);
      },
      error => {
        console.log("Error:", error);
        this.handleAbort();
      },
      () => {
        //Success
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          actions.updateUserProfile({ photoURL: downloadURL });
        });
        load("something");
      }
    );
    return {
      abort: () => {
        abort();
      },
    };
  };

  handleBrowse = () => {
    this.pond.browse();
  };

  // TODO: this doesn't work at the moment.
  handleAbort = (fieldName, file, metadata, load, error, progress, abort) => {
    console.log("aborting");
    return {
      abort: () => {
        // User tapped abort, cancel our ongoing actions here

        // Let FilePond know the request has been cancelled
        abort();
      },
    };
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
    const { files, displayName, openSnackbar } = this.state;
    const { classes } = this.props;

    return (
      <Fade in={true} timeout={{ enter: 800, exit: 800 }}>
        <div className={classes.root}>
          <Typography className={classes.title} variant="h6" gutterBottom>
            Profile
          </Typography>
          <div className={classes.avatar}>
            <FilePond
              instantUpload={true}
              allowRevert={false}
              allowImageTransform={true}
              maxFileSize="5MB"
              imagePreviewHeight={170}
              imageCropAspectRatio="1:1"
              imageResizeTargetWidth="300"
              imageResizeTargetHeight="300"
              stylePanelLayout="compact circle"
              styleLoadIndicatorPosition="center bottom"
              styleButtonRemoveItemPosition="center bottom"
              oninit={this.handleInit}
              labelIdle={"Drag & Drop your profile picture or Click to Browse"}
              labelTapToCancel=""
              labelFileTypeNotAllowed="Invalid filetype. Try an image file like png, jpeg or a gif"
              acceptedFileTypes={["image/*"]}
              server={{
                process: this.handleProcessing,
                abortLoad: this.handleAbort,
              }}
              ref={ref => (this.pond = ref)}
            >
              {files.map(file => (
                <File key={file} source={file} />
              ))}
            </FilePond>
          </div>
          <Typography className={classes.subheading} variant="h5" gutterBottom>
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
    paddingTop: 20,
    flexDirection: "column",
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 20,
    overflowY: "auto",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  subheading: {
    marginTop: 30,
    marginBottom: 10,
  },
  avatar: {
    width: 400,
    minWidth: 400,
    marginBottom: 20,
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
  saveButton: {
    marginTop: 30,
    color: "white",
    background: `linear-gradient(to right, #29b6f6, #796eff)`,
  },
};

// lightThemePrimary: "#303030",
// lightThemeSecondary: "6d6d6d",
// lightThemeDisabled: "B9BBBE",
// lightThemeDefault: "f9f9f9",

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
