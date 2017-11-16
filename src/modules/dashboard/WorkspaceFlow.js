import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class CompanyFlow extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.content} elevation={4}>
          Company ish BRAH
        </Paper>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    height: '100%',
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  content:{
    padding:16,
  }
}

export default CompanyFlow;
