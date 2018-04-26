import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class detail extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '商品详情页面',
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._pressBackButton.bind(this)}>
                    <Text style={styles.back}>返回</Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    {this.props.navigation.state.params.productTitle}
                </Text>
            </View>
        );
    }

    _pressBackButton() {
        const {navigation} = this.props;
        if (navigation) {
            navigation.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    },
    back: {
        fontSize: 20,
        color: 'blue'
    }
})
