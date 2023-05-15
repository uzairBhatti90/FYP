import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Header } from '../../../components/feeds/header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colors, fontFamily } from '../../../globals/utilities'
import { Icon } from 'react-native-elements'
import { AppButton } from '../../../components/gerenal/appButton'
import Toast from 'react-native-simple-toast'
import { getData, saveData } from '../../../services/Backend/utility'
import authContext from '../../../context/auth/authContext'
import Spinner from 'react-native-spinkit'


const Booking = ({ navigation, route }) => {
    const AuthContext = useContext(authContext)
    const { data } = AuthContext
    const { shopData } = route.params
    console.log(shopData);
    const [flag, setFlag] = useState(false)
    const [userData, setuserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [buttonLoader, setButtonLoader] = useState(false)

    useEffect(() => {
        getuserData()
    }, [])

    const getuserData = async () => {
        await getData("userData", data.id).then((e) => {
            console.log(e);
            setuserData(e)
        }).catch(err => {
            console.log(err);
        }).finally(() => { setLoading(false) })
    }


    function alert() {
        if (flag === false) {
            Toast.show("Please Accept Terms & conditions", Toast.LONG)
        }
        else {
            Alert.alert(
                "Instant Service",
                'Press OK for instant Serivce',
                [
                    {
                        text: 'OK', onPress: () => {
                            handleInstantDialog()
                            console.log('OK Pressed')
                        }
                    },
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') }
                ]
            )
        }
    }

    const handleInstantDialog = async () => {
        setButtonLoader(true)
        await saveData('InstantService', shopData.shop_id, {
            shopData,
            userData: {
                address: userData?.address,
                category: "Rider",
                name: userData?.name,
                userID: userData?.userID,
                userImage: userData?.image
            },
            instantFlag: true,
            timeStamp: Date.now()
        }).then(() => {
            Toast.show(`Request sent to ${shopData.shop}`, Toast.LONG)
            navigation.navigate("HomeStackScreens", {
                screen: "Home"
            })
        }).catch(err => {
            console.log(err)
            setButtonLoader(false)
        }).finally(() => {
            setButtonLoader(false)
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'transparent'}
                translucent={true}
            />
            <Header
                onPress={() => navigation.goBack()}
                title={'Instant Serive'}
            />
            {loading ? (
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Spinner
                        type="Pulse"
                        size={responsiveFontSize(10)}
                        color={colors.PROVIDER_DEFAULT}
                    />
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.wrapper}>
                    <Text style={styles.heading}>{'Terms and Conditions '}</Text>
                    <Text style={styles.paraText}>Welcome to our instant service for automobile app . The following terms and conditions govern your use of the App and the services provided through the App.{'\n\n'}
                        By downloading, installing, accessing or using the App, you agree to be bound by these Terms. If you do not agree with these Terms, you may not use the App.{'\n\n'}
                        The App provides a platform for automobile services, such as roadside assistance, maintenance and repair services, and other related services. The services are provided by third-party service providers <Text style={{
                            fontFamily: fontFamily.appTextMedium,
                            color: "black",
                            fontSize: responsiveFontSize(1.8)
                        }}>{data.shop}</Text>. The App does not provide the services directly.{'\n\n'}
                        You may use the App to request services from Service Providers. You are responsible for providing accurate and complete information when using the App. You may not use the App for any illegal or unauthorized purpose. You must comply with all applicable laws when using the App.{'\n\n'}
                        The Service Providers are independent contractors and are not employees or agents of the App. The App does not control, endorse, or guarantee the quality, suitability, safety, or availability of the services provided by the Service Providers. You acknowledge and agree that your interactions with the Service Providers are solely between you and the Service Providers. The App shall not be responsible or liable for any loss or damage of any kind incurred as a result of such interactions.{'\n\n'}
                        You are responsible for paying for the services provided by the Service Providers through the App. The App does not process payments directly. Payment processing is provided by third-party payment processors ("Payment Processors").
                        You agree to pay all charges incurred in connection with your use of the services. All payments made through the App are final and non-refundable.{'\n\n'}
                        The App is provided on an "as is" and "as available" basis. The App makes no representations or warranties of any kind, express or implied, as to the operation of the App or the information, content, materials, or products included on the App. The App disclaims all warranties, express or implied, including but not limited to, implied warranties of merchantability and fitness for a particular purpose. The App does not warrant that the App, its servers, or email sent from the App are free of viruses or other harmful components.{'\n\n'}
                        The App shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the App or the services provided by the Service Providers. The App shall not be liable for any damages resulting from the loss of use, data, or profits, whether in an action of contract, negligence, or other tortious action, arising out of or in connection with the use or performance of the App.
                        {'\n\n'}You agree to indemnify, defend, and hold harmless the App, its officers, directors, employees, agents, and affiliates, from and against any claims, actions, demands, damages, liabilities, and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of the App or the services provided by the Service Providers.
                        {'\n\n'}The App reserves the right to modify these Terms at any time without prior notice. Your continued use of the App after the modified Terms have been posted constitutes your acceptance of the modified Terms.
                        {'\n\n'}These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where the App is offered without giving effect to any principles of conflicts of law.{'\n\n'}
                        Any dispute arising out of or in connection with these Terms shall be resolved through binding arbitration in accordance with the rules of the jurisdiction where the App is offered. The arbitration shall take place in the jurisdiction where the App is offered. Any award rendered by the arbitrator shall be final and binding on the parties, and judgment may be entered thereon in any court of competent jurisdiction. The prevailing party in any such arbitration shall be entitled to recover its reasonable attorneys' fees and costs.{'\n\n'}
                        The App reserves the right to terminate these Terms and your use of the App at any time without prior notice. Upon termination, you shall immediately cease all use of the App.{'\n\n'}
                        These Terms constitute the entire agreement between you and the App with respect to the use of the App and supersede all prior or contemporaneous communications and proposals, whether oral or written, between you and the App.{'\n\n'}
                        The failure of the App to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. If any provision of these Terms is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties' intentions as reflected in the provision, and the other provisions of these Terms shall remain in full force and effect.{'\n\n'}
                        If you have any questions or concerns about these Terms, please contact us at uzibhai890@gmail.com.
                        {'\n\n'}

                    </Text>
                    <TouchableOpacity style={styles.iconView}
                        onPress={() => {
                            setFlag(!flag)
                        }}
                    >
                        <Icon
                            name={flag == true ? 'check-box' : 'check-box-outline-blank'}
                            type={'material-icon'}
                            color={colors.primary}
                            size={responsiveFontSize(2.5)}
                        />
                        <Text style={styles.termText}>I accept <Text style={{
                            color: 'black',
                            fontFamily: fontFamily.appTextMedium
                        }}>Term & conditions</Text></Text>
                    </TouchableOpacity>
                    <AppButton
                        activity={buttonLoader}
                        title={'Continue'}
                        myStyles={styles.button}
                        itsTextstyle={styles.buttonText}
                        onPress={() => alert()}
                    />
                    <View style={{ height: responsiveHeight(10) }} />
                </ScrollView>
            )}
        </View>
    )
}

export default Booking

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    wrapper: {
        width: responsiveWidth(90),
        alignSelf: "center",
        marginTop: responsiveHeight(2)
    },
    heading: {
        fontSize: responsiveFontSize(2.4),
        fontFamily: fontFamily.appTextMedium,
        color: "black",
        alignSelf: "center"
    },
    paraText: {
        fontFamily: fontFamily.appTextRegular,
        marginTop: 10,
        fontSize: responsiveFontSize(1.6),
        color: "grey",
        textAlign: "left"
    },
    iconView: {
        flexDirection: "row",
        alignItems: "center",
    },
    termText: {
        marginLeft: responsiveWidth(3),
        fontFamily: fontFamily.appTextRegular,
        fontSize: responsiveFontSize(1.5),

    },
    button: {
        width: responsiveWidth(90),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: responsiveWidth(3),
        height: responsiveHeight(7)
    },
    buttonText: {
        fontSize: responsiveFontSize(2),
        fontFamily: fontFamily.appTextMedium,
        color: colors.white
    },
})