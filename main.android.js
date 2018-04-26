import React, {component} from 'react';
import {StyleSheet, View, Text, ViewPageAndroid} from 'react-native';

import Home from './home';
import More from './more';

export default class main extends React.Component {
  render() {
      return (
          <ViewPageAndroid style={styles.viewPager} initialPage={0}>
              <View style={styles.pageStyle}>
                  <Home navigation={this.props.navigation}></Home>
              </View>
              <View style={styles.pageStyle}>
                  <More navigation={this.props.navigation}></More>
              </View>
          </ViewPageAndroid>
      )
  }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1
    },
    pageStyle: {
        
    }
})
