import React, {component} from 'react';
import {TabBarIOS} from 'react-native';

import Home from './home';
import More from './more';

const Item = TabBarIOS.Item;

export default class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
    }

    render() {
        return (
            <TabBarIOS unselectedTintColor="gray"
                tintColor="white"
                barTintColor="orange">
                <Item title="首页"
                    systemIcon="favorites"
                    selected={this.state.selectedTab === 'home'}
                    onPress={() => {
                        this.setState({selectedTab: 'home'});
                    }}>
                    <Home navigation={this.props.navigation}></Home>
                </Item>
                <Item systemIcon="more"
                    badge={2}
                    selected={this.state.selectedTab === 'more'}
                    onPress={() => {
                        this.setState({selectedTab: 'more'});
                    }}>
                    <More navigation={this.props.navigation}></More>
                </Item>
            </TabBarIOS>
        )
    }
}
