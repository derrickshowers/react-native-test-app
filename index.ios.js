/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PhotoGrid from './app/components/PhotoGrid'

class ReactNativeTestProject extends Component {
  render() {
    return (
      <PhotoGrid />
    );
  }
}

const styles = StyleSheet.create({});

AppRegistry.registerComponent('ReactNativeTestProject', () => ReactNativeTestProject);
