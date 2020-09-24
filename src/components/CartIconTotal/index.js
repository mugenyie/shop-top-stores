import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Text } from 'react-native';

class CartIconTotal extends Component {
    render() {
        const {style} = this.props;
        return (
            <Text style={[{fontSize:11,fontWeight:'bold',color:"#fff",textAlign:"center",},style]}>{this.props.cartItems.length}</Text>
        );
    }
}

const mapStateToProps = (state) => {
    return {cartItems : state}
}

export default connect(mapStateToProps)(CartIconTotal);
