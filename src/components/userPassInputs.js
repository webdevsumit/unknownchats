import React, {useState} from 'react';
import { 
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';

const UserPassInputs = ({
    headText,
    buttonText,
    placeholder1, 
    placeholder2, 
    onSubmit,
    link1Text,
    link2Text,
    link1Click,
    link2Click,
    error,
}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View  style={styles.lowerContainer}>
            <View  style={styles.loginContainer}>
                {/* <Text style={styles.subContainer}>
                    {headText}
                </Text> */}
                <TextInput
                    style={styles.usenameTextInput}
                    value={username}
                    onChange={({ nativeEvent: { eventCount, target, text} })=>{setUsername(text)}}
                    placeholder={placeholder1}
                    autoComplete="username"
                    autoFocus={true}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.usenameTextInput}
                    value={password}
                    onChange={({ nativeEvent: { eventCount, target, text} })=>{setPassword(text)}}
                    placeholder={placeholder2}
                    autoComplete="password"
                    textContentType="password"
                    secureTextEntry={true}
                />
                <View style={styles.errorsView}>
                    <Text style={styles.error}>{error}</Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableHighlight onPress={()=>onSubmit(username, password)}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{buttonText}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.linkView}>
                    {/* <TouchableOpacity onPress={link1Click}>
                        <View style={styles.link}>
                            <Text style={styles.linkText}>{link1Text}</Text>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={link2Click}>
                        <View style={styles.link}>
                            <Text style={styles.linkText}>{link2Text}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default UserPassInputs;

const styles = StyleSheet.create({
    lowerContainer: {
      flex: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
    },
    loginContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: "80%",
    //   height: "80%",
      borderRadius: 20,
      borderColor:"#aaa",
    //   borderWidth:1,
    },
    subContainer: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: 'serif',
        color: '#fff',
        paddingBottom: 20,
        paddingTop: 20,
    },
    usenameTextInput: {
        backgroundColor: '#fff',
        height: 40,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        width: '80%',
        borderBottomWidth:1,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
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
        width: "80%",
    },
    linkView: {
        // paddingTop: 20,
        paddingBottom: 20,
        // flexDirection: 'row',
        justifyContent: "space-between",
        width:'80%',
    },
    linkText: {
        fontSize: 14,
        fontFamily: 'serif',
        color:'#555',
        marginBottom: 5,
    },
    error: {
        color: 'red',
        textAlign: 'left',
    },
    errorsView: {
        width: '80%'
    },
  });