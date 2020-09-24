//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;

// create a component
class SumbitCustomLinkScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeUrl: "",
        };
    }

    render() {
        const {storeUrl} = this.state;
        return (
            <View style={styles.container}>
                <Item style={{width:width*0.8}}>
                    <Icon active name='search' size={25} />
                    <Input
                    keyboardType="url"
                    onChangeText={text => this.setState({storeUrl:text})}
                    style={{paddingLeft:20}} 
                    placeholder='e.g. Zara or Amazon.com'/>
                </Item>
                <Button
                onPress={() => this.props.navigation.navigate("ProductBrowser", {storeUrl})}
                block
                style={{width:width*0.8,alignSelf:'center',marginTop:50,backgroundColor:"#212121",borderRadius:0}}
                >
                    <Text style={[{color:'#fff', paddingRight:10},mainStyles.ButtonTitle]}>BROWSE STORE / PRODUCT</Text>
                </Button>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default SumbitCustomLinkScreen;
