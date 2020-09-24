//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Dimensions, Image } from 'react-native';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// create a component
class OrdersList extends Component {
    _renderItem = (item) => 
    {
        return(
            <TouchableOpacity 
            style={{marginBottom:20,paddingBottom:20,borderBottomWidth:1,borderBottomColor:'#ccc'}}
            onPress={() => this.props.navigation.navigate("OrderStatus", {order:item})}
            key={item.id} 
            >
                <View style={{flexDirection:'row',justifyContent:'space-between', paddingLeft:10,paddingRight:10}}>
                    <View style={{flexDirection:'column'}}>
                        <Text style={mainStyles.ButtonTitle}>{item.orderNumber}</Text>
                        <Text style={mainStyles.TextRegular}>{item.createdOnUTC}</Text>
                    </View>
                    <View>
                        <Text style={[mainStyles.TextRegular,{fontWeight:'bold',textAlign:'right'}]}>{item.currency} {item.itemValue}</Text>
                        <View
                        style={{height:28,backgroundColor:'#212121',borderRadius:4}}>
                            <Text style={{color:'#fff',fontWeight:'bold',padding:4,paddingLeft:8,paddingRight:8,textAlign:'center'}}>{item.orderStatusString}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const {data} = this.props;
        return (
            <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem = {({item}) => this._renderItem(item)}
            keyExtractor={(item) => item.orderId}
            contentContainerStyle={{flex:1}}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default OrdersList;
