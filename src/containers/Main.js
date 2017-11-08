import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";

import {Route} from 'react-router-dom';

import NavBar from "../modules/dashboard/NavBar";
import SideNav from "../modules/dashboard/SideNav";

//Modules?
import Dashboard from './Dashboard';
import Calendar from './Calendar';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerVisible: true
    };
  }

  componentDidMount(){
    this.props.actions.loadAppData();
    this.props.actions.fetchTeams();
  }

  toggleDrawer(){
    this.setState({drawerVisible: !this.state.drawerVisible});
  }

  render() {
    return (
      <div style={styles.container}>
        <SideNav toggleDrawer={() => this.toggleDrawer()} drawerVisible={this.state.drawerVisible} />
        <div style={styles.content}>
          <NavBar toggleDrawer={() => this.toggleDrawer()} drawerVisible={this.state.drawerVisible}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/calendar" component={Calendar}/>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: '100%'
  },
  content: {
    display:"flex",
    flexDirection:"column",
    width:"100%",
  }
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
