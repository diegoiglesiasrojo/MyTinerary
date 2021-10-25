import React from "react"
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import {Linking} from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const Footer = () => {
    return (
        <View style={styles.footer}>
            <View style={styles.logoFooter}>
                <Text style={styles.logoFooterText}><FontAwesome5 style={styles.logoIcon} name="paper-plane" size={24} color="#EDEDED"/> MyTinerary</Text>
                <Text style={styles.logoFooterText}>in Europe</Text>
            </View>
            <View>
                <Text style={styles.copyrightFooter}>Powered by Diego Iglesias</Text>
                <Text style={styles.copyrightFooter}><AntDesign name="copyright" size={12} color="#EDEDED" /> All Right Reserved</Text>
            </View>
            <View style={styles.socialMediaFooter}>
                <TouchableOpacity style={styles.socialMediaButtom} onPress={() => {Linking.openURL("https://www.facebook.com/")}}>
                    <View>
                        <Entypo style={styles.socialMediaFacebook} name="facebook" color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialMediaButtom} onPress={() => {Linking.openURL("https://twitter.com/")}}>
                    <View>
                        <AntDesign style={styles.socialMediaTwitter} name="twitter" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialMediaButtom} onPress={() => {Linking.openURL("https://www.instagram.com/")}}>
                    <View>
                        <AntDesign style={styles.socialMediaInstagram} name="instagram" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialMediaButtom} onPress={() => {Linking.openURL("https://www.youtube.com/")}}>
                    <View>
                        <AntDesign style={styles.socialMediaYoutube} name="youtube" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Footer

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#171717",
        height: 80,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    logoFooter: {
        marginLeft: 10
    },
    logoFooterText: {
        color: "#EDEDED",
        fontSize: 24,
        fontWeight: "bold"
    },
    copyrightFooter: {
        fontSize: 12,
        color: "#EDEDED",
        textAlign: "center"
    },
    socialMediaFooter: {
        width: 80,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    },
    socialMediaButtom: {
        width: 34,
        height: 34,
        margin: 3
    },
    socialMediaView: {
        width: "100%",
        height: "100%"
    },
    socialMediaFacebook: {
        fontSize: 34,
        color: "#3b5998"
    },
    socialMediaTwitter: {
        fontSize: 34,
        color: "#00acee"
    },
    socialMediaInstagram: {
        fontSize: 34,
        color: "#833AB4"
    },
    socialMediaYoutube: {
        fontSize: 34,
        color: "#c4302b"
    }
})