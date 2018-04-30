import React, {Component} from 'react';
import {ScrollView, Dimensions, StyleSheet, View, Text,
    ActivityIndicator, Picker, Slider, Switch, WebView} from 'react-native';

export default class more extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'java',
            sliderValue: 5,
            isOn: false
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <WebView source={{uri: 'https://sina.cn/'}}
                    style={styles.web}></WebView>
                <Switch onTintColor='blue'
                    thumbTintColor='green'
                    tintColor='black'
                    onValueChange={() => this.setState({
                        isOn: !this.state.isOn
                    })}
                    value={this.state.isOn === true}/>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.language}
                    onValueChange={(lang) => this.setState({language: lang})}>
                        <Picker.Item label="Java" value="java"/>
                        <Picker.Item label="JavaScript" value="javascript"/>
                </Picker>
                <Slider minimumValue={0}
                    style={styles.slider}
                    step={1}
                    maximumTrackTintColor="red"
                    minimumTrackTintColor="blue"
                    maximumValue={10}
                    value={this.state.sliderValue}
                    onValueChange={(value) => this.setState({sliderValue: value})}/>
                <Text>Slider值：{this.state.sliderValue}</Text>
            </ScrollView>
        );
    }

    _onRegionChange = (region) => {
        this.setState({mapRegion: region});
    }

    _onRegionChangeComplete = (region) => {
        if (this.state.isFirstLoad) {
            this.setState({mapRegionInput: region,
                annotations: this._getAnnotations(region),
                isFirstLoad: false})
        }
    }

    _getAnnotations = (region) => {
        return [
            {
                longitude: region.longitude,
                latitude: region.latitude,
                title: '你的位置'
            }
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        alignSelf: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignSelf: 'center'
    },
    picker: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    web: {
        width: 300,
        height: 300,
        alignSelf: 'center'
    },
    slider: {
        width: 200,
        alignSelf: 'center'
    }
});
