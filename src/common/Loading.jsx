import React, { Component } from "react";
// import Lottie from "react-lottie";
import Lottie from "lottie-web";

import animationData from "../static/loader.json";
import Fade from "@material-ui/core/Fade";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.lottieRef = React.createRef();

    this.state = { isStopped: true, animation: null };
  }

  static defaultProps = {
    loadingDelay: true,
  };

  componentDidMount() {
    const animation = Lottie.loadAnimation({
      container: document.getElementById("loadingLottie"), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData, // the path to the animation json
    });
  }

  render() {
    const { loadingDelay } = this.props;

    return (
      <Fade
        in={true}
        timeout={{ enter: 800, exit: 800 }}
        style={{
          transitionDelay: loadingDelay ? "800ms" : "0ms",
        }}
      >
        <div style={styles.background}>
          <div ref={this.lottieRef} id="loadingLottie" style={styles.lottie} />
        </div>
      </Fade>
    );
  }
}

const styles = {
  background: {
    backgroundColor: "#FFFFFFF",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  lottie: {
    width: 400,
    height: 400,
  },
};

export default Loading;
