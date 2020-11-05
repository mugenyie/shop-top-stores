//import liraries
import React, { Component } from 'react';
import {StyleSheet, View, Dimensions, Platform, ScrollView} from 'react-native';
import StoresList from '../../components/StoresList';
import Icon from 'react-native-vector-icons/Feather';
import {Button, Text, Container} from 'native-base';
import mainStyles from '../../shared/mainStyles';
import Shimmer from '../../shared/Shimmer';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class StoresBrowserScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_list : []
        };
    }

    componentDidMount() {
        fetch('https://shoptopstores.com/APP_DATA/category_list.json')
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(responseJson => {
            this.setState({category_list:responseJson})
        })
        .catch(exp => console.log(exp))
    }

    renderStores = (visible) => {
        if(visible){
            return(
                this.state.category_list.map(c => 
                    <View key={c.id} style={styles.categoryContainer}>
                        <Text style={[mainStyles.ButtonTitle,styles.categoryTitle]}>{c.name}</Text>
                        <StoresList {...this.props} data={c.stores} />
                    </View>
                )
            )
        }else{
            return(
                [1,2,3,4].map(x => 
                    <View key={x}>
                        <Shimmer style={{margin:10}} autoRun={true} visible={false}>
                            <View />
                        </Shimmer>
                        <View style={{flexDirection:'row'}}>
                        {
                            [1,2,3].map(r => 
                                <Shimmer key={r} style={{width:width*0.5,height:140,margin:10}} autoRun={true} visible={false}>
                                    <View />
                                </Shimmer>)
                        }
                        </View>
                    </View>)
            )
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {this.renderStores(this.state.category_list.length > 0)}
            </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: height*0.05,
        backgroundColor:"#FFFFFF"
    },
    categoryTitle: {
        marginLeft:10,
        borderWidth:1,
        borderColor:"#ccc",
        padding:8,
        width:200,
        borderRadius:8
    },
    categoryContainer: {
        marginBottom:32,
        borderBottomColor:"#ccc",
        borderBottomWidth:1
    }
});

export default StoresBrowserScreen;
