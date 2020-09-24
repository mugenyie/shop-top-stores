//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import OrdersList from '../../components/OrdersList';
import OrderAPI from '../../services/OrderAPI';
import { getData, USER_PROFILE} from '../Settings/PersistUserData';
import ProgressLoader from '../../components/ProgressLoader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class OrdersScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            orders: [],
            inProgress: false
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({inProgress:true});
            getData(USER_PROFILE)
            .then(data => {
                if(data != null){
                    this.setState({userId:data.userId});

                    OrderAPI.Get(data.userId)
                    .then(data => {
                        this.setState({inProgress:false, orders:data.body});
                    })
                    .catch(error => {
                        this.setState({inProgress:false});
                        alert(error);
                    })
                }else{
                    alert("Save profile to view your orders");
                    this.props.navigation.navigate("SettingsStack");
                }
            })
            .catch(error => console.log(error))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ProgressLoader inProgress={this.state.inProgress} />
                <OrdersList {...this.props} data={this.state.orders} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        marginTop: height*0.04
    },
});

//make this component available to the app
export default OrdersScreen;
