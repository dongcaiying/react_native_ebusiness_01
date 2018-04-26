/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//@flow
import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';
import HomeScreen from './home';
import DetailScreen from './detail';
import MainScreen from './main';

const App = StackNavigator({
    Home: {screen: HomeScreen},
    Detail: {screen: DetailScreen},
    Main: {screen: MainScreen},
}, {
    initialRouteName: 'Main',
    navigationOptions: ({navigation}) => {
        return {
            headerTitle: 'Main',
            headerBackTitle: false,
        }
    }
});

export default App;
