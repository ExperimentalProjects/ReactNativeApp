/**
 * Created by deepaksisodiya on 27/05/16.
 */


import React, {Component} from 'react';
import {
  Text,
  View,
  Navigator,
  StyleSheet
} from 'react-native';

import Home from "./Pages/Home";
import One from "./Pages/One";
import Two from "./Pages/Two";

export let APP_ROUTES = {
  HOME: {name: 'homePage' , title:'home'},
  ONE: {name: 'pageOne' , title:'pageOne'},
  TWO: {name: 'pageTwo' , title:'pageTwo'}
};

export default class Routes extends Component {

  constructor(props) {
    super(props);
  }


  configureScene = (route, routeStack) => {
    return Navigator.SceneConfigs.FloatFromRight;
  };

  renderScene = (route, navigator) =>{
    console.log("route   " , route);
    switch(route.name) {
      case APP_ROUTES.HOME.name:
        return (<Home  navigator={navigator} onLogin={this._onLogin} route={route} />);
      case APP_ROUTES.ONE.name:
        return (<One  navigator={navigator} onLogout={this._onLogout} route={route}/>);
      case APP_ROUTES.TWO.name:
        return (<Two  navigator={navigator} route={route}/>);
    }
  };

  render() {
    return (
          <Navigator
            initialRoute={APP_ROUTES.HOME}
            renderScene={this.renderScene}
            ref={(nav) => this.navigator = nav}
            configureScene={this.configureScene}
          />
    );
  }

}
const styles = StyleSheet.create({
  appView: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#327ab9'
  }
});
