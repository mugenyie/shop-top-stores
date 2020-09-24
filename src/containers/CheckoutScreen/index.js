//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {emptyCart} from '../../redux/actions';
import { View, Text, StyleSheet, Dimensions,ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Item, Input, Button, Label, Textarea} from 'native-base';
import {storeData, getData, USER_PROFILE} from '../Settings/PersistUserData';
import Icon from 'react-native-vector-icons/Feather';
import {SendMail} from '../../services/SendMailService';
import mainStyles from '../../shared/mainStyles';
import OrderAPI from '../../services/OrderAPI';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

const isValidStateIput = stateData => {
    if(stateData.fullName == ""){
        alert("Full Name cannot be empty!");
        return false;
    }
    if(stateData.phone == ""){
        alert("Phone number cannot be empty!");
        return false;
    }
    if(stateData.email == ""){
        alert("Email cannot be empty!\nWe shall send an invoice to your email address");
        return false;
    }
    return true;
}

// create a component
class CheckoutScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phone: "",
            email: "",
            userId: "",
            shippingCountry: "",
            shippingAddress: "",
            comments: "",
            cartItems: [],
            inProgress: false
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({cartItems:this.props.cartItems});
            if(this.props.cartItems < 1){
                this.props.navigation.navigate("BrowseStores");
            }else{
                getData(USER_PROFILE)
                .then(data => {
                    this.setState({
                        userId: data.userId,
                        fullName: data.fullName,
                        phone: data.phone,
                        email: data.email,
                        shippingCountry: data.shippingCountry,
                        shippingAddress: data.shippingAddress
                    })
                })
                .catch(error => console.log(error))
            }
        });
    }
    
    sendProductData = (message, userEmail) => {
        if(this.state.userId != ""){
            this.setState({inProgress:true})

            var orderObject = {
                items: this.state.cartItems,
                comments: this.state.comments
            }
            OrderAPI.Save(orderObject, this.state.userId)
            .then(data => {
                SendMail(message, userEmail)
                .then((response) => {
                    this.props.emptyCart();
                    this.props.navigation.navigate("QuotationSent");
                }).catch((error) =>{
                    alert(error)
                    this.setState({inProgress:false})
                });
            })
            .catch(error => alert(error))
        }else{
            alert("Please add shipping information")
        }
    }

    render() {
        const {fullName,phone,email,comments,cartItems,shippingCountry,shippingAddress} = this.state;

        let cartMessageData = cartItems.map(element => (`Product Name: ${element.name}\nProduct Link: ${element.id} \n\n`))
        let formatedMessage = `
        Full Name: ${fullName}\n
        phone: ${phone}\n
        Email: ${email}\n
        Country: ${shippingCountry}\n
        Address: ${shippingAddress}\n
        Comments: \n${comments}\n
        Cart Data: \n${cartMessageData}`;

        return (
            <ScrollView>
                <View style={{padding:10,marginTop:height*0.02}}>
                {this.state.inProgress && (
                    <ActivityIndicator 
                    style={styles.activityLoader}
                    size={width*0.15} color="#212121" />
                )}
                <Text style={mainStyles.TextRegular}>Cart Items</Text>
                {
                    cartItems.map(element => (
                        <Item key={element.id}>
                            <Input 
                            disabled
                            value={`${truncateString(element.name,15)} - (${truncateString(element.id,20)})`}
                            style={{}} />
                        </Item>
                    ))
                }
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("ReviewCart")}
                style={{alignSelf:'flex-end', top:8,height:28,backgroundColor:'#212121',borderRadius:4}}>
                    <Text style={{color:'#fff',fontWeight:'bold',padding:4,paddingLeft:8,paddingRight:8,textAlign:'center'}}>Review cart items</Text>
                </TouchableOpacity>
                <View style={{margin:10}}></View>
                {
                    email != "" ? (
                        <>
                        <Text style={mainStyles.TextRegular}>User Info.</Text>
                        <Text style={mainStyles.TextRegular}><Text style={{fontWeight:'bold'}}>Name:</Text> {fullName}</Text>
                        <Text style={mainStyles.TextRegular}><Text style={{fontWeight:'bold'}}>Phone:</Text> {phone}</Text>
                        <Text style={mainStyles.TextRegular}><Text style={{fontWeight:'bold'}}>Email:</Text> {email}</Text>
                        <Text style={mainStyles.TextRegular}><Text style={{fontWeight:'bold'}}>Country:</Text> {shippingCountry}</Text>
                        <Text style={mainStyles.TextRegular}><Text style={{fontWeight:'bold'}}>Address:</Text> {shippingAddress}</Text>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate("UserProfile")}
                        style={{alignSelf:'flex-end', top:8,height:28,backgroundColor:'#212121',borderRadius:4}}>
                            <Text style={{color:'#fff',fontWeight:'bold',padding:4,paddingLeft:8,paddingRight:8,textAlign:'center'}}>Edit my info</Text>
                        </TouchableOpacity>
                        </>
                    ) : (
                        <>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate("SettingsStack")}
                        style={{alignSelf:'flex-start', top:8,height:28,backgroundColor:'#212121',borderRadius:4}}>
                            <Text style={[mainStyles.ButtonTitle,{color:'#fff',padding:4,paddingLeft:8,paddingRight:8,textAlign:'center'}]}>ADD SHIPPING INFO.</Text>
                        </TouchableOpacity>
                        </>
                    )
                }
                <View style={{margin:10}}></View>
                    <Textarea 
                    style={{marginTop:20}}
                    onChangeText={text => this.setState({comments:text})}
                    rowSpan={5} bordered placeholder="Comments" />
                    <Button
                    style={{backgroundColor:"#212121",marginTop:height*0.04}}
                    onPress={() => this.sendProductData(formatedMessage, email)}
                    block
                    >
                        <Text style={[{color:'#fff',paddingRight:15},mainStyles.ButtonTitle]}>REQUEST ITEM QUOTATION</Text>
                        <Icon name="send" size={22} color="#fff" />
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    viewAddToCart : {
        flex:0.3,
        alignContent:'center',
        textAlignVertical:'center',
        backgroundColor:'#212121'
    },
    buttonAddToCart: {

    },
    webContainer:{
        flex:1
    },
    textBold : {
        color:'#fff',
        textAlign:'center'
    },
    activityLoader:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4
    }
});

const mapStateToProps = (state) => {
    return {cartItems : state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart: () => dispatch(emptyCart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckoutScreen);