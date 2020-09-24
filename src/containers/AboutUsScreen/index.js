//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Share } from 'react-native';
import mainStyles from '../../shared/mainStyles';

// create a component
class AboutUsScreen extends Component {
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <Text style={[mainStyles.Header]}>About STS</Text>
                <Text style={[mainStyles.TextRegular,styles.bodyText]}>
                    SHOP TOP STORES (STS) enables you to shop from top stores globally. 
                    You will be able to browse through hundreds of official 
                    stores worldwide to make a purchase and then receive your 
                    items at your door step.
                    Payment is seamless through the app using card or mobile 
                    money and customer service is exceptional. {"\n"}
                    Enjoy shopping with STS! {"\n"}
                    Shop Globally with Ease.
                </Text>
                <View style={styles.spaceBar} />
                <Text style={[mainStyles.Header]}>How To Use the App</Text>
                <Text style={[mainStyles.TextRegular,styles.bodyText,{paddingBottom:100}]}>
                    <Text style={{fontWeight:'bold'}}>0.</Text> First save your user profile {"&"} shipping information by clicking "User profile {"&"} shipping"{"\n"}
                    <Text style={{fontWeight:'bold'}}>1.</Text> Click our recommended stores to browse products or use our in-app browser to search for your preffered store or to submit a link.{"\n"}
                    <Text style={{fontWeight:'bold'}}>2.</Text> Once you have identified your item, click "ADD TO CART" red at the bottom of the screen.{"\n"}
                    <Text style={{fontWeight:'bold'}}>3.</Text> You can continue shopping to add more items or checkout for your items to be processed and shipping costs calculated{"\n"}
                    <Text style={{fontWeight:'bold'}}>4.</Text> You can view orders to check order status of your items{"\n"}
                    <Text style={{fontWeight:'bold'}}>5.</Text> Once your order has finished processing, it will be in a status "pending_payment" which you can then go a head to make the payment in-app using card or mobile money{"\n"}
                    <Text style={{fontWeight:'bold'}}>6.</Text> You will be notified of all order status changes via the app.
                </Text>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
        backgroundColor:"#fff",
        paddingTop:40,
    },
    bodyText: {
        textAlign: "justify",
        lineHeight:25
    },
    spaceBar: {
        padding:10
    }
});

//make this component available to the app
export default AboutUsScreen;
