import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { FilePond, File, registerPlugin } from "react-filepond";
import FilePondImagePreview from "filepond-plugin-image-preview";
import FilepondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import firebase from "firebase";
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

  componentDidMount() {}
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
    // handle file upload here
    console.log(" handle file upload here");
    console.log(file);

    this.setState({ files: [file] });

    const fileUpload = file;
    const storageRef = firebase.storage().ref(`filepond/${file.name}`);
    const task = storageRef.put(fileUpload, metadata);

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
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.avatar}>
          <FilePond
            ref={ref => (this.pond = ref)}
            oninit={this.handleInit()}
            labelIdle={"Drag & Drop your picture or Click to Browse"}
            imagePreviewHeight={400}
            accept="image/png, image/jpeg, image/gif"
            // imageCropAspectRatio={"1:1"}
            // imageResizeTargetWidth={200}
            // imageResizeTargetHeight={200}
            server={{
              process: this.handleProcessing,
              abortLoad: this.handleAbort
            }}
          >
            {files.map(file => <File key={file} source={file} />)}
          </FilePond>
          <Button onClick={this.handleBrowse}> Browse </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
    width: "100%",
    height: "100%"
  },
  avatar: {
    width: 400,
    height: 400,
    minHeight: 400,
    minWidth: 400
  }
};

export default withStyles(styles)(Profile);
