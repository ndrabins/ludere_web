import React, { Component } from "react";
import Lottie from "react-lottie";
import * as animationData from "../static/loader.json";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData
    };

    return (
      <div style={styles.background}>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
      </div>
    );
  }
}

const styles = {
  background: {
    backgroundColor: "#FFF",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
};

export default Loading;
