//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Dimensions, Image } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// create a component
class StoresList extends Component {
    _renderItem = (item) => 
    {
        return(
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate("ProductBrowser", {storeUrl:item.url})}
            key={item.id} 
            >
                <Image 
                resizeMode="contain"
                style={styles.imageContainer}
                source={{uri:item.logo}}
                />
            </TouchableOpacity>
        );
    }

    render() {
        const {data} = this.props;
        return (
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem = {({item}) => this._renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    imageContainer: {
        width:width*0.4,
        height:140,
        marginRight:10,
        marginLeft:10, 
        borderRadius: 4
    }
});

//make this component available to the app
export default StoresList;
