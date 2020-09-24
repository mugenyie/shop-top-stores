import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    StatusBar,
    Linking,
    View
} from 'react-native';
import mainStyles from '../../shared/mainStyles';

class ScanQRCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }

    onSuccess = (e) => {
        const client = e.data.substring(0, 4);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (e.data.startsWith("https://www.shoptopstores.com")) {
            Linking
                .openURL(e.data)
                .catch(err => console.error('An error occured', err));

        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }

    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    scanAgain = () => {
        this.setState({
            scan: true,
            ScanResult: false
        })
    }
    render() {
        const { scan, ScanResult, result } = this.state
        const desccription = 'Scan a product and submit a request to purchase it from our recommended official retail stores.'
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <StatusBar barStyle="dark-content" />
                    <Text style={[styles.textTitle,mainStyles.Header]}>Welcome To SHOP TOP STORES {"\n"}Product QR/Barcode Scanner</Text>
                    {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Text style={[styles.descText,mainStyles.TextRegular]}>{desccription}</Text>

                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
                                <Text style={[styles.buttonTextStyle,mainStyles.ButtonTitle]}>Click to Scan !</Text>
                            </TouchableOpacity>

                        </View>
                    }

                    {ScanResult &&
                        <Fragment>
                            <Text style={[mainStyles.Header,{textAlign:'center',color:'#fff'}]}>Result !</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text style={[{textAlign:'center'},mainStyles.TextRegular]}>
                                    <Text>Type : {result.type}</Text>{"\n"}
                                    <Text>Result : {result.data}</Text>{"\n"}
                                    {/* <Text numberOfLines={1}>RawData: {result.rawData}</Text>{"\n"} */}
                                </Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
                                    <Text style={[styles.buttonTextStyle,mainStyles.ButtonTitle]}>Click to Scan again!</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => {
                                    this.props.addItemToCart({
                                      id: result.data,
                                      name: result.type
                                    });
                                    this.props.navigation.navigate("ShoppingCart");
                                }}
                                style={styles.buttonTouchable}>
                                    <Text style={[styles.buttonTextStyle,mainStyles.ButtonTitle]}>Request Product Quotation</Text>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    }


                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            bottomContent={
                                <View>
                                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
                                        <Text style={[styles.buttonTextStyle,mainStyles.ButtonTitle]}>OK. Got it !</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                                        <Text style={[styles.buttonTextStyle,mainStyles.ButtonTitle]}>Stop Scan</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    }
                </Fragment>
            </View>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItemToCart: item => dispatch(addToCart(item))
    }
}

export default connect(null, mapDispatchToProps)(ScanQRCodeScreen);