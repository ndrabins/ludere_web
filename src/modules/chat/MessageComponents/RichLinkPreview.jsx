import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import getUrls from "get-urls";

class RichLinkPreview extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    messageContent: PropTypes.string.isRequired
  };

  async fetchRichLink(url) {
    const response = await fetch(url, {
      method: "HEAD"
    });
    console.log(response);
  }

  renderRichLinks() {
    const { classes, messageContent } = this.props;

    const linksSet = getUrls(messageContent);
    const linksArray = [...linksSet];
    console.log(linksArray);
    this.fetchRichLink("https://api.github.com/users/chriscoyier/repos");
    return <div />;
    // let linkPreviews = Map(linksArray, (link, index) => {
    //   return (
    //     <div className={classes.richLinkContainer} key={index}>
    //       URL FOUND
    //     </div>
    //   );
    // });
    // return linkPreviews;
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>{this.renderRichLinks()}</div>;
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#303030"
  },
  richLinkContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#303030",
    padding: 10,
    margin: 4,
    backgroundColor: "#303030"
  }
});
export default withStyles(styles)(RichLinkPreview);
