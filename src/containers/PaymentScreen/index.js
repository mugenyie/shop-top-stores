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

const isValidStateIput = stateData => {
    if(stateData.invoiceNumber == ""){
        alert("Invoice Number cannot be empty!\nN.B: This is sent to your email after requesting a quotation");
        return false;
    }
    if(stateData.amount < 1){
        alert("Please enter valid Amount to proceed\nN.B: Amount as shown on the quotation");
        return false;
    }
    if(stateData.email == ""){
        alert("Email cannot be empty!\nWe shall send a receipt of payment to your email address");
        return false;
    }
    if(stateData.tel == ""){
        alert("Phone number cannot be empty");
        return false;
    }
    return true;
}

// create a component
class PaymentScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currencySelected: "UGX",
            invoiceNumber: "",
            amount: 0,
            email: "",
            tel: ""
        };
      }
      onValueChange2(value: string) {
        this.setState({
            currencySelected: value
        });
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[mainStyles.TextRegular,{marginBottom:20}]}>Please fill all fields before proceeding to pay {"\n"}N.B: Invoice Number, Amount and Currency should be entered as displayed on the invoice received</Text>
                <Item>
                    <Icon active name='hash' size={25} />
                    <Input 
                    onChangeText={text => this.setState({invoiceNumber:text})}
                    style={{paddingLeft:20}} 
                    placeholder='Invoice Number'/>
                </Item>
                <Item picker>
                <Text style={mainStyles.TextRegular}>Currency</Text>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: width*0.7 }}
                    placeholder="Select Currency"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.currencySelected}
                    onValueChange={this.onValueChange2.bind(this)}
                >
                    <Picker.Item label="UGX" value="UGX" />
                    <Picker.Item label="USD" value="USD" />
                </Picker>
                </Item>
                <Item>
                    <Text style={mainStyles.TextRegular}>Amount</Text>
                    <Input 
                    keyboardType="numeric"
                    onChangeText={text => this.setState({amount:text})}
                    style={{paddingLeft:20}} 
                    placeholder='500'/>
                </Item>
                <Item>
                    <Icon active name='mail' size={25} />
                    <Input 
                    keyboardType="email-address"
                    onChangeText={text => this.setState({email:text})}
                    style={{paddingLeft:20}} 
                    placeholder='example@email.com'/>
                </Item>
                <Item>
                    <Icon active name='phone' size={25} />
                    <Input
                    onChangeText={text => this.setState({tel:text})}
                    style={{paddingLeft:20}} 
                    placeholder='+25600000000'/>
                </Item>

                <PayWithFlutterwave
                onComplete={() => alert("Transaction success")}
                onAbort={() => alert("Transaction aborted")}
                onRedirect={() => {}}
                options={{
                    tx_ref: uuidv4(),
                    authorization: 'FLWSECK-d3c1911720d2144c52ceec7357ddf6c5-X',
                    customer: {
                    email: this.state.email,
                    phone: this.state.tel
                    },
                    meta: {
                        invoiceNumber: this.state.invoiceNumber
                    },
                    amount: this.state.amount,
                    currency: this.state.currencySelected,
                    payment_options: 'card'
                }}
                customButton={(props) => (
                    <Button
                    disabled={props.disabled}
                    style={{backgroundColor:"#212121",marginTop:height*0.04}}
                    onPress={props.onPress}
                    block
                    >
                        <Text style={[{color:'#fff',paddingRight:10},mainStyles.ButtonTitle]}>Pay {this.state.currencySelected} {this.state.amount}</Text>
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
export default PaymentScreen;
