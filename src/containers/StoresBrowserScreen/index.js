//import liraries
import React, { Component } from 'react';
import {StyleSheet, View, Dimensions, Platform} from 'react-native';
import StoresList from '../../components/StoresList';
import Icon from 'react-native-vector-icons/Feather';
import {Button, Text, Container} from 'native-base';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const retailStores = [
    {
        "id":3,
        "name":"Amazon",
        "logo": "https://shoptopstores.s3.eu-west-2.amazonaws.com/wp-content/uploads/2020/09/04222452/amazon.png",
        "url": "https://www.amazon.com"
    },
    {
        "id":5,
        "name":"Walmart",
        "logo": "https://shoptopstores.s3.eu-west-2.amazonaws.com/wp-content/uploads/2020/08/15151714/walmart.jpg",
        "url": "https://www.walmart.com"
    },
    {
        "id":4,
        "name":"eBay",
        "logo": "https://shoptopstores.s3.eu-west-2.amazonaws.com/wp-content/uploads/2020/09/04222819/ebay.png",
        "url": "https://www.ebay.com"
    },
    {
        "id":6,
        "name":"Apple",
        "logo": "https://shoptopstores.s3.eu-west-2.amazonaws.com/wp-content/uploads/2020/09/04113300/apple.png",
        "url": "https://www.apple.com"
    },
    {
        "id":2,
        "name":"GAP",
        "logo": "https://shoptopstores.s3.eu-west-2.amazonaws.com/wp-content/uploads/2020/09/20184251/gap.png",
        "url": "https://www.gap.com"
    },
    {
        "id":1,
        "name":"FashionNova",
        "logo": "https://shoptopstores.s3.eu-west-2.amazonaws.com/wp-content/uploads/2020/09/13035540/fashionnova.png",
        "url": "https://www.fashionnova.com"
    },
    {
        "id":7,
        "name":"Victorias Secret",
        "logo": "https://shoptopstores.s3.eu-west-2.amazonaws.com/wp-content/uploads/2020/09/13144942/victorias.png",
        "url": "https://www.victoriassecret.com"
    },
    {
        "id":8,
        "name":"FOREVER 21",
        "logo": "https://shoptopstores.s3.eu-west-2.amazonaws.com/wp-content/uploads/2020/09/13142952/forever21.png",
        "url": "https://www.forever21.com/us/shop"
    }
]
// create a component
class StoresBrowserScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StoresList {...this.props} data={retailStores} />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
        marginTop: height*0.02
    },
});

export default StoresBrowserScreen;
