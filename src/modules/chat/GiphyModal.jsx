import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Input from "@material-ui/core/Input";
import GiphyLogo from "static/GiphyLogo.png";

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
      .search("gifs", { q: giphySearchName, limit: 12, rating: "pg" })
      .then(response => {
        console.log(response.data);
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

  render() {
    const { classes, open } = this.props;
    const { giphySearchName, gifs } = this.state;

    if (!open) {
      return <span />;
    }

    return (
      <ClickAwayListener onClickAway={this.handleClose}>
        <Paper className={classes.container}>
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
          <GridList
            cellHeight={200}
            className={classes.gridList}
            cols={3}
            spacing={8}
          >
            {gifs.map(gif => (
              <GridListTile key={gif.url} cols={1} className={classes.gridTile}>
                <img
                  src={gif.images.preview_gif.gif_url}
                  key={gif.url}
                  alt={gif.title}
                  onClick={() =>
                    this.handleLocalSendGif(
                      gif.images.original.gif_url,
                      gif.title + ".gif"
                    )
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Paper>
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
    overflowX: "hidden"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "10px",
    zIndex: 5,
    padding: 8
  },
  gridList: {
    display: "flex",
    width: "100%",
    height: 400,
    overflowX: "hidden",
    zIndex: 1
  },
  gridTile: {
    transition: "transform .2s ease-out, z-index 0.2s ease-out",
    // padding: 4,
    cursor: "pointer",
    "&:hover": {
      zIndex: 10,
      transform: "scale(1.1)"
    }
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
