import React, { Component } from 'react';

import firebase from 'firebase';
//import firebaseUI from 'firebaseui';
import FirebaseAuth from '../../util/FirebaseAuth';

class SocialSignIn extends Component {
  constructor(props) {
    super(props);
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    };
  }

  render() {
    return (
      <FirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
    );
  }
}

const styles = {
  firebaseUI: {
    minWidth: "250px"
  }
}

export default SocialSignIn;
