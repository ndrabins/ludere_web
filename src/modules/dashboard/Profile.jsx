import React, { Component } from "react";
// import { withStyles } from "material-ui/styles";
import { FilePond, File, registerPlugin } from "react-filepond";
import FilePondImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondImagePreview);

class AvatarUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: ["index.html"]
    };
  }

  render() {
    return (
      <div className="App">
        {/* Pass FilePond properties as attributes */}
        <FilePond allowMultiple={true} maxFiles={3} server="/api">
          {/* Set current files using the <File/> component */}
          {this.state.files.map(file => <File key={file} source={file} />)}
        </FilePond>
      </div>
    );
  }
}

const styles = {
  root: {
    fontFamily: "sans-serif",
    textAlign: "center"
  }
};

export default AvatarUpload;
