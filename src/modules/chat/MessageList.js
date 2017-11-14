import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

import moment from "moment";
import Map from "lodash/map";

import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
class MessageList extends Component {
  renderMessages(){
    let messages = Map(this.props.messages, (message, key) => {

      let diff = moment(message.dateCreated).diff(moment(), 'minutes');
      let timestamp = moment().add(diff, 'minutes').calendar();
      //normal message with avatar
      return (
        <div style={styles.messageContainer} key={key}>
          <Avatar style={{margin:10}}>
            <FolderIcon />
          </Avatar>
          <div style={styles.messageContent}>
            <div style={styles.messageHeader}>
              <div> {message.sentBy} </div>
              <div> {timestamp} </div>
            </div>
            <p style={styles.messageText}>
               {message.messageText}
            </p>
          </div>
        </div>
     )
    });
    return messages;
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.messages}>
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

const styles = {
  container:{
    display:'flex',
    flex:1,
    flexDirection: "column",
  },
  messages:{
    height: "100%",
    overflow: "auto",
  },
  messageContainer:{
    border:"1px solid black",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    display:'flex',
    wordWrap: "break-word",
  },
  messageContent:{
    width:"95%",
    margin:10,
    display:'flex',
    flexDirection:'column',
  },
  messageHeader:{
    display:'flex',
    flexDirection:'row'
  },
  messageText: {
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    marginBottom: "3px",
    marginTop: "0px",
  }
}

function mapStateToProps(state) {
  return {
    selectedChannel: state.chat.selectedChannel,
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
