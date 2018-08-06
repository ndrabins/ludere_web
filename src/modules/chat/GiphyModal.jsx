import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Input from "@material-ui/core/Input";
import GiphyLogo from "static/GiphyLogo.png";
import Fade from "@material-ui/core/Fade";

import GphApiClient from "giphy-js-sdk-core";
const client = GphApiClient("azVscOW5d6t3LzyJE1rwD3cnu0DwB1vH");

class GiphyModal extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      giphySearchName: "",
      gifs: []
    };
  }

  componentDidMount() {
    // this throws a warning in the console but as far as I know it shouldn't...
    client
      .trending("gifs", { rating: "pg", limit: 24 })
      .then(response => {
        this.setState({ gifs: response.data });
      })
      .catch(err => {
        console.log("error", err);
      });
  }

  fetchGifsRequest = () => {
    const { giphySearchName } = this.state;

    client
      .search("gifs", { q: giphySearchName, limit: 24, rating: "pg" })
      .then(response => {
        // console.log(response.data);
        this.setState({ gifs: response.data });
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  handleClose = () => {
    this.setState({ giphySearchName: "" });
    this.props.handleClickAwayGiphy();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
    this.fetchGifsRequest();
  };

  handleLocalSendGif = (gifURL, gifTitle) => {
    this.props.handleSendGif(gifURL, gifTitle);
    this.handleClose();
  };

  renderColumn(columnNumber, numberOfColumns) {
    const { classes } = this.props;
    const { gifs } = this.state;
    const numberOfGifs = gifs.length;

    const columnGifs = gifs.slice(
      (numberOfGifs / numberOfColumns) * columnNumber,
      (numberOfGifs / numberOfColumns) * (columnNumber + 1)
    );

    return columnGifs.map(gif => (
      <div
        key={gif.url}
        className={classes.gridTile}
        style={{
          height: gif.images.preview_gif.height
        }}
      >
        <video
          src={gif.images.downsized_small.mp4_url}
          key={gif.url}
          alt={gif.title}
          muted
          autoPlay
          loop
          className={classes.image}
          onClick={() =>
            this.handleLocalSendGif(
              gif.images.original.gif_url,
              gif.title + ".gif"
            )
          }
        />
      </div>
    ));
  }

  render() {
    const { classes, open, small } = this.props;
    const { giphySearchName } = this.state;

    return (
      <ClickAwayListener onClickAway={this.handleClose}>
        <Fade in={open} timeout={{ enter: 200, exit: 200 }}>
          <Paper
            className={classes.container}
            style={{ zIndex: open ? 0 : -10 }} // hide content behind chat so that we can have fade animation
          >
            <div className={classes.inputContainer}>
              <Input
                className={classes.input}
                classes={{ focused: classes.inputFocused }}
                value={giphySearchName}
                onChange={this.handleChange("giphySearchName")}
                fullWidth
                placeholder="Showing Trending Gifs. Type here to search for more!"
                disableUnderline
                autoFocus
              />
              <img
                src={GiphyLogo}
                alt="giphy logo"
                className={classes.giphyLogo}
              />
            </div>
            <div className={classes.masonry}>
              {!small && (
                <React.Fragment>
                  <div className={classes.column}>
                    {this.renderColumn(0, 3)}
                  </div>
                  <div className={classes.column}>
                    {this.renderColumn(1, 3)}
                  </div>
                  <div className={classes.column}>
                    {this.renderColumn(2, 3)}
                  </div>
                </React.Fragment>
              )}
              {small && (
                <React.Fragment>
                  <div className={classes.column}>
                    {this.renderColumn(0, 2)}
                  </div>
                  <div className={classes.column}>
                    {this.renderColumn(1, 2)}
                  </div>
                </React.Fragment>
              )}
            </div>
          </Paper>
        </Fade>
      </ClickAwayListener>
    );
  }
}

const styles = theme => ({
  container: {
    position: "absolute",
    display: "flex",
    width: "calc(100% - 36px)",
    flexDirection: "column",
    top: "-405px",
    margin: "0px 2px",
    height: 400,
    overflowX: "hidden",
    transition: "z-index 0.25s ease-out"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
    zIndex: 5,
    padding: 8
  },
  masonry: {
    display: "flex",
    width: "100%",
    height: 400,
    overflowX: "hidden",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "stretch"
  },
  column: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexGrow: 1,
    margin: 2
  },
  gridTile: {
    transition: "transform .2s ease-out, z-index 0.2s ease-out",
    margin: 2,
    flex: "auto",
    width: "100%",
    cursor: "pointer",
    borderRadius: "8px",

    "&:hover": {
      zIndex: 10,
      transform: "scale(1.1)"
    }
  },
  image: {
    width: "100%",
    borderRadius: 8
  },
  input: {
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    marginRight: "8px",
    border: "transparent 2px solid",
    transition: "border .25s ease-out",
    "&:hover": {
      border: "#B0B2B6 2px solid"
    }
  },
  inputFocused: {
    backgroundColor: "#EEEEEE",
    borderRadius: 5,
    padding: 5,
    color: "black",
    overflowY: "auto",
    overflowX: "hidden",
    cursor: "text",
    marginRight: "8px",
    transition: "border .25s ease-out",
    border: "2px solid #6d6d6d",
    "&:hover": {
      border: "2px solid #6d6d6d"
    }
  },
  giphyLogo: {
    width: 100,
    height: 38
  }
});
export default withStyles(styles)(GiphyModal);
