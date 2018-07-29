import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import GifIcon from "@material-ui/icons/Gif";
import TextField from "@material-ui/core/TextField";
import Debounce from "lodash/debounce";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import GphApiClient from "giphy-js-sdk-core";
const client = GphApiClient("70Srj0AeBXYJwYfoax7jLWEEyv53EWf7");

class GiphyButton extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      giphySearchName: "",
      gifs: []
    };
    // debounce the passed in dispatch method, so not to fetch gifs each key
  }

  fetchGifsRequest = () => {
    client
      .trending("gifs", {})
      .then(response => {
        console.log(response.data);
        this.setState({ gifs: response.data });
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  openGifPicker = event => {
    this.setState({ anchorEl: event.currentTarget });
    this.fetchGifsRequest();
  };

  addGif = event => {
    console.log("adding gif");
  };

  handleClose = () => {
    this.setState({ anchorEl: null, giphySearchName: "" });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, open } = this.props;
    const { anchorEl, giphySearchName, gifs } = this.state;

    if (!open) {
      return <span />;
    }

    return (
      <div className={classes.container}>
        {/* <GifIcon onClick={this.openGifPicker} className={classes.gifIcon} /> */}
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
            // <GridListTile key={gif.url} cols={1}>
            //   <img src={gif.url} alt={gif.title} />
            // </GridListTile>
            <img
              src={`http://media.giphy.com/media/${gif.id}/giphy.gif`}
              alt={gif.title}
              key={gif.title}
            />
          ))}
        </GridList>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    position: "absolute",
    display: "flex",
    width: "100%",
    flexDirection: "column"
  },
  gifIcon: {
    position: "absolute",
    width: 28,
    height: 28,
    cursor: "pointer",
    top: 7,
    fontSize: 46,
    right: 46,
    color: "#b9bbbe",
    transition: "color 0.25s ease-out",
    "&:hover": {
      color: "#303030"
    }
  },
  gifContainer: {
    display: "flex",
    width: "800",
    maxWidth: 800,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
export default withStyles(styles)(GiphyButton);
