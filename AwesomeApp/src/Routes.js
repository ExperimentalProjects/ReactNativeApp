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

import Navbar from 'react-native-navbar';
import Menu from 'react-native-navbar/Menu'

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
    this.state = {
      hasBack : false,
      menuOpen : false
    };
  }

  componentDidMount = () => {
    this.navigator.navigationContext.addListener('didfocus', () => {
      this._checkBackButton();
    });
  };

  _checkBackButton = () => {
    setTimeout(() => {
      this.setState({
        hasBack: this.navigator.getCurrentRoutes().length > 1
      });
    }, 0);
  };

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

  _back = () => {
    console.log(this.navigator);
    this.navigator.pop();
  };
  _openMenu = () => {
    this.setState({menuOpen: true})
  };

  _closeMenu = () => {
    this.setState({menuOpen: false})
  };

  render() {
    return (
      <View style={styles.appView}>
          <Navigator
            navigationBar=
              {
                <Navbar
                        hasBack={this.state.hasBack}
                        backPressed={this._back}
                        show={true}
                        title={"Awesome navbar"}
                        openMenu={this._openMenu}
                />
              }
            initialRoute={APP_ROUTES.HOME}
            renderScene={this.renderScene}
            ref={(nav) => this.navigator = nav}
            configureScene={this.configureScene}
          />

          { this.state.menuOpen ?
            <Menu closeMenu={this._closeMenu} onItemSelected={this._menuItemSelected }/> : null}
        </View>
    );
  }

}
const styles = StyleSheet.create({
  appView: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
