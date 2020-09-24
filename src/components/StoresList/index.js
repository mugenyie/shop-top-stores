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
                style={styles.image}
                source={{uri:item.logo}}
                />
            </TouchableOpacity>
        );
    }

    render() {
        const {data} = this.props;
        return (
            <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={data}
            renderItem = {({item}) => this._renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{flex:1}}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    image: {
        width:width*0.48,
        height:height*0.18,
        flexDirection: 'column',
        borderRadius: height*0.008,
        margin:width*0.01,
    },
    imageContainer: {
    },
    storeBackgroundImage: {
    }
});

//make this component available to the app
export default StoresList;
