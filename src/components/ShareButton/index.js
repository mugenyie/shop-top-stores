//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import mainStyles from '../../shared/mainStyles';

const iosLink = 'bit.ly/sts-ios';
const androidLink = 'bit.ly/sts-android';

// create a component
class ShareButton extends Component {
    onShare = async () => {
        try {
          const result = await Share.share({
              title:'Download SHOP TOP STORES (STS)',
              message:`Enjoy the best global shopping experience from top stores across the globe with SHOP TOP STORES. Download now 👇\niOS: ${iosLink}\nAndroid: ${androidLink}`,
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    render() {
        return (
            <TouchableOpacity
            style={{flexDirection:'row',paddingLeft:15}}
             {...this.props} onPress={this.onShare}>
                <Icon name="share-2" size={20} color="#000"/>
                <Text style={[mainStyles.ButtonTitle,{paddingLeft:20}]}>share sts app</Text>
            </TouchableOpacity>
        );
    }
}

//make this component available to the app
export default ShareButton;
