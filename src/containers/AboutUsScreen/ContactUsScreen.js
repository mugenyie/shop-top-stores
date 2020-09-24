//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// create a component
class ContactUsScreen extends Component {
    _pressCall=()=>{
        const url='tel://+256705122812'
        Linking.openURL(url)
    }

    _pressWhatsApp=()=>{
        const url='https://wa.me/256705122812'
        Linking.openURL(url)
    }

    _pressEmail=()=>{
        const url='mailto:sales@shoptopstores.com?Subject=STS%20Support'
        Linking.openURL(url)
    }

    _pressWebsite=()=>{
        const url='https://www.shoptopstores.com'
        Linking.openURL(url)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[mainStyles.Header,{textAlign:'center',marginBottom:40}]}>
                    we are here to help
                </Text>

                <View style={{alignItems:'center'}}>
                    <View style={{flexDirection:'row',paddingTop:height*0.01}}>
                        <View style={{flex:0.1}}>
                            <Icon size={20} name="phone" />
                        </View>
                        <TouchableOpacity onPress={() => this._pressCall()} style={[{flex:0.8}]}>
                            <Text style={mainStyles.ButtonTitle}>(+256) 705 122812</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row',marginTop:40}}>
                        <View style={{flex:0.1}}>
                            <FontAwesome size={20} name="whatsapp" />
                        </View>
                        <TouchableOpacity onPress={() => this._pressWhatsApp()} style={[{flex:0.8}]}>
                            <Text style={mainStyles.ButtonTitle}>(+256) 705 122812</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row',marginTop:40}}>
                        <View style={{flex:0.1}}>
                            <Icon size={20} name="mail" />
                        </View>
                        <TouchableOpacity onPress={() => this._pressEmail()} style={[{flex:0.8}]}>
                            <Text style={mainStyles.ButtonTitle}>sales@shoptopstores.com</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection:'row',marginTop:40}}>
                        <View style={{flex:0.1}}>
                            <Icon size={20} name="globe" />
                        </View>
                        <TouchableOpacity onPress={() => this._pressWebsite()} style={[{flex:0.8}]}>
                            <Text style={mainStyles.ButtonTitle}>www.shoptopstores.com</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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

//make this component available to the app
export default ContactUsScreen;
