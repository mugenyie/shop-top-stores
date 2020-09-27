//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from 'native-base';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// create a component
class QuotationSentScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon name="check-circle" size={50} color="green"/>
        <Text style={[{textAlign:'center',padding:10},mainStyles.TextRegular]}>Your order has been received and is being processed{"\n"}Check your orders to confirm when it is done processing and ready for payment.</Text>
                <Button
                    style={{backgroundColor:"#212121",marginTop:50,width:width*0.8,alignSelf:'center'}}
                    onPress={() => this.props.navigation.navigate("Orders")}
                    block
                    >
                        <Text style={[{color:'#fff',paddingRight:10},mainStyles.ButtonTitle]}>VIEW ORDERS</Text>
                        <Icon name="file-text" size={22} color="#fff" />
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
        backgroundColor: '#ffffff',
    },
});

//make this component available to the app
export default QuotationSentScreen;
