/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./app/components/main');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

var reactnative = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'WebDev Phoenix',
          component: Main
        }} />
    );
  }
});

AppRegistry.registerComponent('webdevphx', () => reactnative);
