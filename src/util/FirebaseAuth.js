import React from 'react';

//WRAPPER FOR FIREBASE-UI
//https://github.com/nicolasgarnier/friendlypix-web-react/blob/master/frontend/components/FirebaseAuth.jsx

// Global ID for the element.
const ELEMENT_ID = 'firebaseui_container';

/**
 * React Component wrapper for the FirebaseUI Auth widget.
 */
export default class FirebaseAuth extends React.Component {

  /**
   * Constructor  Firebase Auth UI component
   *
   * @param {Object} props - Additional object properties.
   * @constructor
   */
  constructor(props) {
    super(props);

    this.uiConfig = props.uiConfig;
    this.firebaseAuth = props.firebaseAuth;
    this.elementId = props.elementId || ELEMENT_ID;
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    require('firebaseui/dist/firebaseui.css'); // import globally and only on the client.

    // Firebase UI only works on the Client. So we're loading in a `componentDidMount`.
    const firebaseui = require('firebaseui');
    this.firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.firebaseAuth);
    this.firebaseUiWidget.reset();
    this.firebaseUiWidget.start('#' + this.elementId, this.uiConfig);
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.firebaseUiWidget.reset();
  }

  /**
   * Properties types.
   */
  props: {
    uiConfig: Object, // The Firebase UI Web UI Config object. See: https://github.com/firebase/firebaseui-web#configuration
    firebaseAuth: Object, // The Firebase App auth instance to use.
    elementId?: String // The ID of the underlying container that we'll generate. Use this if you use more than one instance at a time in your app.
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div id={this.elementId}/>
    )
  }
}
