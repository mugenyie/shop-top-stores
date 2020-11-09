//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removeFromCart} from '../../redux/actions';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// create a component
class ReviewCartScreen extends Component {
    render() {
        const {cartItems,removeItem} = this.props;
        return (
            <ScrollView showsHorizontalScrollIndicator={false} style={{paddingLeft:10,marginTop:height*0.05}}>
                {
                    cartItems.map(element => (
                        <View key={element.id}>
                            <View style={{flexDirection:'row',width:width*0.88}}>
                                <View style={{paddingRight:10,width:width*0.85}}>
                                    <Text style={mainStyles.ButtonTitle}>{element.name}</Text>
                                    <Text style={mainStyles.TextRegular}>{element.id}</Text>
                                    <Image 
                                    resizeMode="cover"
                                    style={{width:200,height:200,padding:10,marginTop:10}}
                                    source={{uri:element.screenShotUrl}}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => removeItem(element)}>
                                    <Icon name="trash" size={25} />
                                </TouchableOpacity>
                            </View>
                            <View style={{borderBottomWidth:1,borderBottomColor:'#ccc',marginTop:20,marginBottom:20,marginRight:10}}/>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

const mapStateToProps = (state) => {
    return {cartItems : state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: item => dispatch(removeFromCart(item))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCartScreen);