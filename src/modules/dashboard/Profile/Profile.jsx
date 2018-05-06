import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../actions";

import firebase from "firebase";

import { FilePond, File, registerPlugin } from "react-filepond";
import FilePondImagePreview from "filepond-plugin-image-preview";
import FilepondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginValidateSize from "filepond-plugin-file-validate-size";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//filepond-plugin-file-encode
//filepond-plugin-file-validate-size
//filepond-plugin-file-validate-type

import Input, { InputLabel } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";

registerPlugin(
  FilepondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginValidateSize
);

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      displayName: this.props.profile.displayName,
      openSnackbar: false
    };
  }

  // Initialized the file
  handleInit = () => {
    console.log("filepond now initialised");
  };

  handleProcessing = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort
  ) => {
    const { user, profile, actions } = this.props;
    const fileUpload = file;
    const profileRef = firebase.storage().ref(`images/${user.uid}/profilePic`);
    const task = profileRef.put(fileUpload, metadata);

    task.on(
      `state_changed`,
      snapshot => {
        progress(true, snapshot.bytesTransferred, snapshot.totalBytes);
      },
      error => {
        error("File couldn't be uploaded :(");
      },
      () => {
        //Success
        let downloadURL = task.snapshot.downloadURL;
        actions.updateUserProfile({ photoURL: downloadURL });
        load("something");
      }
    );
    return {
      abort: () => {
        abort();
      }
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
      }
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
    const { classes, user, profile } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="title" gutterBottom>
          Profile
        </Typography>
        <div className={classes.avatar}>
          <FilePond
            instantUpload={true}
            // imageCropAspectRatio="1:1"
            // imageResizeMode="cover"
            // imageResizeTargetWidth={200}
            // imageResizeTargetHeight={200}
            maxFileSize="5MB"
            oninit={this.handleInit}
            labelIdle={"Drag & Drop your profile picture or Click to Browse"}
            imagePreviewHeight={400}
            labelTapToCancel=""
            accept="image/*"
            server={{
              process: this.handleProcessing,
              abortLoad: this.handleAbort
            }}
            ref={ref => (this.pond = ref)}
          >
            {files.map(file => <File key={file} source={file} />)}
          </FilePond>
        </div>
        <Typography
          className={classes.subheading}
          variant="headline"
          gutterBottom
        >
          Profile Information
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel
            FormLabelClasses={{
              root: classes.label,
              focused: classes.cssFocused
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
          variant="raised"
          className={classes.saveButton}
        >
          Save Profile
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackbar}
          onClose={this.handleClose}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Profile Updated</span>}
        />
      </div>
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
    overflowY: "auto"
  },
  title: {
    fontSize: 32,
    marginBottom: 20
  },
  subheading: {
    marginTop: 20,
    marginBottom: 10
  },
  avatar: {
    width: 400,
    minWidth: 400
  },
  formControl: {
    marginBotton: 10,
    width: "100%"
  },
  label: {
    "&$cssFocused": {
      color: "#303030",
      fontWeight: 500
    },
    color: "#303030"
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
      border: "1px solid #B9BBBE"
    }
  },
  inputFocused: {
    border: "1px solid #303030",
    transition: "border 0.25s ease-out",
    "&:hover": {
      cursor: "text",
      border: "1px solid #303030"
    }
  },
  saveButton: {
    marginTop: 30,
    color: "white",
    background: `linear-gradient(to right, #29b6f6, #796eff)`
  }
};

// lightThemePrimary: "#303030",
// lightThemeSecondary: "6d6d6d",
// lightThemeDisabled: "B9BBBE",
// lightThemeDefault: "f9f9f9",

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    profile: state.profile.myUserProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Profile)
);
