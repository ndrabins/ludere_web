import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import GphApiClient from "giphy-js-sdk-core";
const client = GphApiClient("70Srj0AeBXYJwYfoax7jLWEEyv53EWf7");

class GiphyButton extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      giphySearchName: "",
      gifs: []
    };
    // debounce the passed in dispatch method, so not to fetch gifs each key
  }

  componentDidMount() {
    client
      .trending("gifs", { rating: "pg-13", limit: 24 })
      .then(response => {
        console.log(response.data);
        this.setState({ gifs: response.data });
      })
      .catch(err => {
        console.log("error", err);
      });
  }

  fetchGifsRequest = () => {
    const { giphySearchName } = this.state;

    client
      .search("gifs", { q: giphySearchName, limit: 12, rating: "pg-13" })
      .then(response => {
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
          <TextField
            required
            id="required"
            label="Required"
            onChange={this.handleChange("giphySearchName")}
            className={classes.textField}
            margin="none"
          />
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {gifs.map(gif => (
              <GridListTile key={gif.url} cols={1} className={classes.gridTile}>
                <img
                  src={`http://media3.giphy.com/media/${
                    gif.id
                  }/giphy-downsized.gif`}
                  key={gif.url}
                  alt={gif.title}
                  onClick={() =>
                    this.handleLocalSendGif(
                      `http://media3.giphy.com/media/${gif.id}/giphy.gif`,
                      gif.title
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
    margin: "0px 10px",
    padding: 5,
    height: 400,
    overflowX: "hidden"
  },
  gridList: {
    display: "flex",
    width: "100%",
    height: 400,
    padding: 10,
    overflowX: "hidden"
  },
  gridTile: {
    transition: "transform .2s ease-out, z-index 0.2s ease-out",
    cursor: "pointer",
    "&:hover": {
      zIndex: 10,
      transform: "scale(1.1)"
    }
  }
});
export default withStyles(styles)(GiphyButton);
