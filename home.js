/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  Dimensions,
  ListView,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image,
  RefreshControl
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const circleSize = 8;
const circleMargin = 5;

const ds = new ListView.DataSource({ //创建ListView.DataSource数据源
    rowHasChanged: (r1, r2) => r1 !== r2
});
export default class Home extends Component<Props> {

    static navigationOptions = {
        title: 'welcome',
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            isRefreshing: false,
            dataSource: ds.cloneWithRows([
                {
                    image: require('./images/product-image-01.png'),
                    title: '商品1',
                    subTitle: '描述1'
                }, {
                    image: require('./images/product-image-01.png'),
                    title: '商品2',
                    subTitle: '描述2'
                }, {
                    image: require('./images/product-image-01.png'),
                    title: '商品3',
                    subTitle: '描述3'
                }, {
                    image: require('./images/product-image-01.png'),
                    title: '商品4',
                    subTitle: '描述4'
                }, {
                    image: require('./images/product-image-01.png'),
                    title: '商品5',
                    subTitle: '描述5'
                }, {
                    image: require('./images/product-image-01.png'),
                    title: '商品6',
                    subTitle: '描述6'
                }, {
                    image: require('./images/product-image-01.png'),
                    title: '商品7',
                    subTitle: '描述7'
                }, {
                    image: require('./images/product-image-01.png'),
                    title: '商品8',
                    subTitle: '描述8'
                }, {
                    image: require('./images/product-image-01.png'),
                    title: '商品9',
                    subTitle: '描述9'
                }, {
                    image: require('./images/product-image-02.jpg'),
                    title: '商品10',
                    subTitle: '描述10'
                }
            ]),
            advertisements: [
                {
                    title: '广告1',
                    backgroundColor: 'gray',
                    image: require('./images/advertisement-image-01.jpg')
                }, {
                    title: '广告2',
                    backgroundColor: 'orange',
                    image: require('./images/advertisement-image-02.jpg')
                }, {
                    title: '广告3',
                    backgroundColor: 'yellow',
                    image: require('./images/advertisement-image-03.jpg')
                }
            ],
            searchText: '',
        };
    }

    render() {
        const advertisementContent = this.state.advertisements.length;
        const indicatorWidth = circleSize * advertisementContent +
            circleMargin * advertisementContent * 2;
        const left = (Dimensions.get('window').width - indicatorWidth)/2;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'blue'}
                    barStyle={'default'}
                    networkActivityIndicatorVisible={true}>
                </StatusBar>
                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder='搜索商品'
                        onChangeText={(text) => {
                            this.setState({searchText: text});
                    }}></TextInput>
                    <Button style={styles.button} title='搜索'
                        onPress={() => {
                            Alert.alert('搜索内容' + this.state.searchText,
                            null, null);
                    }}></Button>
                </View>
                <View style={styles.advertisement}>
                    <ScrollView
                        ref="scrollView"  //可以使用this.refs.scrollView来获取该组件
                        horizontal={true}  //横向滚动
                        showsHorizontalScrollIndicator={false} //不显示横向滚动条
                        pagingEnabled={true}>//分页
                        {this.state.advertisements.map((advertisement, index) => {
                            return (
                                <TouchableHighlight
                                    key={index}
                                    onPress={() => Alert.alert('你单击了轮播图', null, null)}>
                                        <Image style={styles.advertisementContent}
                                            source={advertisement.image}>
                                        </Image>
                                </TouchableHighlight>
                            );
                        })}
                    </ScrollView>
                    <View style={[
                        styles.indicator, {
                            left: left
                        }
                    ]}>
                        {this.state.advertisements.map((advertisement, index) => {
                            return (<View key={index}
                                style={(index === this.state.currentPage) ?
                                styles.circleSelected : styles.circle}/>);
                        })}
                    </View>
                </View>
                <View style={styles.products}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        renderSeparator={this._renderSeperator}
                        refreshControl={this._renderRefreshControl()}/>
                </View>
            </View>
        );
    }

    componentDidMount() {
        this._startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <TouchableHighlight onPress={() => {
                const {navigation} = this.props;
                if (navigation) {
                    navigation.navigate('Detail', {
                        productTitle: rowData.title
                    }
                    );
                }
            }}>
                <View style={styles.row}>
                    <Image source={rowData.image}
                        style={styles.productImage}>
                    </Image>
                    <View style={styles.productText}>
                        <Text style={styles.productTitle}>{rowData.title}</Text>
                        <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    _renderSeperator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View key={`${sectionID}-${rowID}`} style={styles.divider}>
            </View>
        );
    }

    _renderRefreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                tintColor={'#FF0000'}
                title={'正在刷新数据，请稍后...'}
                titleColor={'#0000FF'}>
            </RefreshControl>
        )
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            const products = Array.from(new Array(10)).map((value, index) => ({
                image: require('./images/product-image-01.png'),
                title: '新商品' + index,
                subTitle: '新商品的描述' + index
            }));
            this.setState({isRefreshing: false, dataSource: ds.cloneWithRows(products)});
        }, 2000);
    }

    _startTimer() {
        this.interval = setInterval(() => {
            nextPage = this.state.currentPage + 1;
            if (nextPage >= 3) {
                nextPage = 0;
            }
            this.setState({currentPage: nextPage});
            const offSetX = nextPage * Dimensions.get('window').width;
            this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animated: true});
        }, 2000);
    }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  searchbar: {
      marginTop: Platform.OS === 'ios' ? 20 : 0,
      height: 40,
      flexDirection: 'row'
  },
  input: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 6,
      backgroundColor: '#eee'
  },
  button: {
      flex: 1
  },
  advertisement: {
      height: 180
  },
  advertisementContent: {
      width: Dimensions.get('window').width,
      height: 180,
  },
  products: {
      flex: 1
  },
  row: {
      height: 60,
      flexDirection: 'row',
      backgroundColor: 'white'
  },
  productImage: {
      width: 40,
      height: 40,
      marginLeft: 10,
      marginRight: 10,
      alignSelf: 'center'
  },
  productText: {
      flex: 1,
      marginTop: 10,
      marginBottom: 10
  },
  productTitle: {
      flex: 3,
      fontSize: 16
  },
  productSubTitle: {
      flex: 2,
      fontSize: 14,
      color: 'gray'
  },
  indicator : {
      position: 'absolute',
      top: 160,
      flexDirection: 'row'
  },
  circle: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      backgroundColor: 'gray',
      marginHorizontal: circleMargin
  },
  circleSelected: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      backgroundColor: 'white',
      marginHorizontal: circleMargin
  },
  divider: {
      height: 1,
      width: Dimensions.get('window').width - 5,
      marginLeft: 5,
      backgroundColor: 'lightgray'
  },
});
