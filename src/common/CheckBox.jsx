import React, { Component } from "react";
import * as animationData from "static/checked_done_.json";
import { withStyles } from "@material-ui/core/styles";
import Lottie from "lottie-web";

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.lottieRef = React.createRef();

    this.state = { isStopped: true, animation: null };
  }

  static defaultProps = {
    lodaingDelay: true,
    checked: false,
    subtaskID: "lottieCheckbox"
  };

  componentDidMount() {
    const { isChecked, subtaskID } = this.props;

    const animation = Lottie.loadAnimation({
      container: document.getElementById(subtaskID), // the dom element that will contain the animation
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: animationData // the path to the animation json
    });

    if (isChecked) {
      animation.goToAndPlay(1000);
    }

    this.setState({ animation: animation });
  }

  handleClick = () => {
    const { handleClick, isChecked } = this.props;
    const { animation } = this.state;

    if (animation !== null) {
      if (!isChecked) {
        animation.play();
      } else {
        animation.stop();
      }
    }
    handleClick();

    this.setState((prevState, props) => {
      return { isStopped: !prevState.isStopped };
    });
  };

  render() {
    const { classes, subtaskID } = this.props;

    return (
      <div className={classes.background} onClick={() => this.handleClick()}>
        <div className={classes.innerContainer}>
          <div
            ref={this.lottieRef}
            id={subtaskID}
            className={classes.checkLottie}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  background: {
    position: "absolute",
    backgroundColor: "transparent",
    display: "flex",
    height: "36px",
    width: "36px",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
    // transform: "scale(1.9)"
  },
  checkLottie: {
    position: "absolute",
    width: 72,
    height: 72
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default withStyles(styles)(CheckBox);
