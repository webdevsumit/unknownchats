import React from 'react';
import { 
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';

const NormalButton = ({
    buttonText,
    onPress,
    bgColor,
    fgColor,
    extendedStyle
}) => {
    return(
        <View style={styles.buttonView}>
            <TouchableHighlight onPress={onPress} style={{width: 220, borderRadius: 220, ...extendedStyle}}>
                <View style={{...styles.button, ...extendedStyle}}>
                    <Text style={{...styles.buttonText, color: extendedStyle.color}}>{buttonText}</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

export default NormalButton;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 20,
        width: 220,
        borderRadius: 220,
        borderWidth: 2,
        borderColor: "#DDDDDD",
      },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'serif',
        color:'#555',
    },
    buttonView: {
        paddingTop: 10,
        paddingBottom: 20,
        // width: "80%",
    },
  });