//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import mainStyles from '../../shared/mainStyles';
import {storeData, getData, USER_PROFILE} from '../Settings/PersistUserData';
import { ScrollView } from 'react-native-gesture-handler';
import PaymentModel from '../../components/PaymentModel';

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
        const { order, total, cartItems } = this.state;
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
                    order.orderStatus == 1 && <PaymentModel order={order} user={this.state.userObject} amount={total} currency={order.currency} />
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
