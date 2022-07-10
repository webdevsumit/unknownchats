import React from 'react';
import { 
    View, 
    StyleSheet, 
    Image,
    Text,
} from 'react-native';

const HeroContainer = ({}) => {

    return(
        <View style={styles.upperContainer}>
            <Image style={styles.logo} source={require('./../assets/images/logo.png')}/>
            <Text style={styles.mainText}>
                Unknown Chats
            </Text>
            {/* <Text style={styles.subHeadText}>
                Chat without showing your real identity.
            </Text> */}
        </View>
    )
}

export default HeroContainer;

const styles = StyleSheet.create({
    upperContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        transform: [{ scale: 1 }]
    },
    mainText: {
        fontSize: 36,
        fontWeight: "bold",
        fontFamily: 'serif',
        color:'#555',
    },
    subHeadText: {
        opacity: 0.5,
        fontFamily: 'serif',
        color:'#555',
    },
  });