//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {Item, Input, Button, Label, Textarea, Picker} from 'native-base';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import mainStyles from '../../shared/mainStyles';
import {storeData, getData, USER_PROFILE} from '../Settings/PersistUserData';
import { ScrollView } from 'react-native-gesture-handler';
import PaymentModel from '../../components/PaymentModel';
import Icon from 'react-native-vector-icons/Feather';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }
  
// create a component
class OrderStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            cartItems: [],
            total: 0,
            userObject: {},
            fullName: "",
            phone: "",
            email: "",
            userId: "",
            shippingCountry: "",
            shippingAddress: ""
        };
    }

    componentDidMount(){
        getData(USER_PROFILE)
        .then(data => {
        this.setState({
            userObject: data,
            fullName: data.fullName,
            phone: data.phone,
            email: data.email,
            userId: data.userId,
            shippingCountry: data.shippingCountry,
            shippingAddress: data.shippingAddress
        })
        })
        .catch(error => console.log(error))
        const { order } = this.props.route.params;
        this.setState({order, cartItems: order.orderMetaData.items});
        this.setState({total: order.itemValue + order.shippingCharge + order.handlingFee})
    }
    
    render() {
        const { order, total, cartItems, userObject } = this.state;
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:10}}>
                    <Text style={mainStyles.ButtonTitle}>Order No: <Text style={[mainStyles.TextRegular,{fontWeight:'normal'}]}>{order.orderNumber}</Text></Text>
                    <Text>{order.createdOnUTC}</Text>
                </View>
                <Text style={mainStyles.ButtonTitle}>Order Status: <Text style={[mainStyles.TextRegular,{fontWeight:'normal'}]}>{order.orderStatusString}</Text></Text>
                <View style={styles.separator}/>
                <Text style={mainStyles.ButtonTitle}>Items</Text>
                <Text>Items Cost: {order.currency} {order.itemValue}</Text>
                <Text>Shipping Charge: {order.currency} {order.shippingCharge}</Text>
                <Text>Handling Fee: {order.currency} {order.handlingFee}</Text>
                <Text style={mainStyles.ButtonTitle}>Total: <Text style={[mainStyles.TextRegular,{fontWeight:'normal'}]}>{order.currency} {total}</Text></Text>
                <View style={styles.separator}/>
                <Text style={mainStyles.ButtonTitle}>Shipping</Text>
                <Text>{this.state.fullName}</Text>
                <Text>{this.state.shippingCountry}</Text>
                <Text>{this.state.shippingAddress}</Text>
                <Text>{this.state.phone}</Text>
                <View style={styles.separator}/>
                <Text style={mainStyles.ButtonTitle}>ITEMS IN YOUR ORDER</Text>
                {
                    cartItems.map(x => (
                        <View key={x.id} style={{marginTop:10,borderBottomWidth:1,borderBottomColor:'#ccc',paddingBottom:10}}>
                            <Text>{x.name}</Text>
                            <Text>{truncateString(x.id, 40)}</Text>
                        </View>
                    ))
                }
                {
                    order.orderStatus == 1 && (
                        <PayWithFlutterwave
                        onComplete={() => alert("Transaction success")}
                        onAbort={() => alert("Transaction aborted")}
                        onRedirect={() => {}}
                        options={{
                            tx_ref: uuidv4(),
                            authorization: 'FLWSECK-d3c1911720d2144c52ceec7357ddf6c5-X',
                            customer: {
                            email: userObject.email,
                            phone: userObject.phone
                            },
                            meta: {
                                orderId: order.orderId
                            },
                            amount: total,
                            currency: order.currency,
                            payment_options: 'card'
                        }}
                        customButton={(props) => (
                            <Button
                            disabled={props.disabled}
                            style={{backgroundColor:"#212121",marginTop:height*0.04}}
                            onPress={props.onPress}
                            block
                            >
                                <Text style={[{color:'#fff',paddingRight:10},mainStyles.ButtonTitle]}>Pay {order.currency} {total}</Text>
                                <Icon name="credit-card" size={22} color="#fff" />
                            </Button>
                        )}
                        />
                    )
                }
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:10,
        paddingRight:10,
        marginTop:20
    },
    separator: {
        margin:10
    }
});

//make this component available to the app
export default OrderStatus;
