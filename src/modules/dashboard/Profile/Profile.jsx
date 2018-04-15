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
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";

registerPlugin(
  FilepondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
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

  render() {
    const { files } = this.state;
    const { classes, user, profile } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.avatar}>
          <FilePond
            instantUpload={false}
            // imageCropAspectRatio={"1:1"}
            // imageResizeTargetWidth={200}
            // imageResizeTargetHeight={200}
            oninit={this.handleInit}
            labelIdle={"Drag & Drop your profile picture or Click to Browse"}
            imagePreviewHeight={400}
            labelTapToCancel=""
            accept="image/png, image/jpeg, image/gif"
            server={{
              process: this.handleProcessing,
              abortLoad: this.handleAbort
            }}
            ref={ref => (this.pond = ref)}
          >
            {files.map(file => <File key={file} source={file} />)}
          </FilePond>
          {/* <Button onClick={this.handleBrowse}> Browse </Button> */}
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingTop: 20
  },
  avatar: {
    width: 400,
    height: 400,
    minHeight: 400,
    minWidth: 400
  },
  avatarPhoto: {
    position: "absolute",
    width: 400,
    height: 400
  }
};

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
