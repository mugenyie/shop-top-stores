import React, { Component } from 'react';
import {connect} from 'react-redux';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;

// create a component
class ShoppingCartScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={{position:'absolute',top:2,right:-16,width:20,height:20,borderRadius:10,backgroundColor:"#000"}}>
                    <Text style={{fontSize:16,fontWeight:"bold",color:"#fff",textAlign:"center",top:-1}}>{this.props.cartItems.length}</Text>
                    </View>
                    <Icon name="shopping-cart" color="#000" size={width*0.2} />
                </View>
                <Button
                onPress={() => this.props.navigation.navigate("BrowseStores")}
                block
                style={{width:width*0.8,alignSelf:'center',marginTop:20,backgroundColor:"#FFFFFF",borderRadius:0, borderColor:"#ccc",borderWidth:0.5}}
                >
                    <Text style={[{color:'#000', paddingRight:10},mainStyles.ButtonTitle]}>CONTINUE SHOPPING</Text>
                </Button>
                {
                    this.props.cartItems.length > 0 && (
                        <Button
                        onPress={() => this.props.navigation.navigate("Checkout")}
                        block
                        style={{width:width*0.8,alignSelf:'center',marginTop:20,backgroundColor:"#212121",borderRadius:0}}
                        >
                            <Text style={[{color:'#fff', paddingRight:10},mainStyles.ButtonTitle]}>CHECKOUT</Text>
                        </Button>
                    )
                }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const mapStateToProps = (state) => {
    return {cartItems : state}
}

export default connect(mapStateToProps)(ShoppingCartScreen);
