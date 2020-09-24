//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions,ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Item, Input, Button, Label, Textarea, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

// create a component
class PaymentModel extends Component {
    render() {
        const {amount, currency, order, user} = this.props;
        return (
            <View>
                <PayWithFlutterwave
                onComplete={() => alert("Transaction success")}
                onAbort={() => alert("Transaction aborted")}
                onRedirect={() => {}}
                options={{
                    tx_ref: uuidv4(),
                    authorization: 'FLWSECK-d3c1911720d2144c52ceec7357ddf6c5-X',
                    customer: {
                    email: user.email,
                    phone: user.phone
                    },
                    meta: {
                        orderId: order.orderId
                    },
                    amount: amount,
                    currency: currency,
                    payment_options: 'card'
                }}
                customButton={(props) => (
                    <Button
                    disabled={props.disabled}
                    style={{backgroundColor:"#212121",marginTop:height*0.04}}
                    onPress={props.onPress}
                    block
                    >
                        <Text style={[{color:'#fff',paddingRight:10},mainStyles.ButtonTitle]}>Pay {currency} {amount}</Text>
                        <Icon name="credit-card" size={22} color="#fff" />
                    </Button>
                  )}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20
    },
});

//make this component available to the app
export default PaymentModel;
