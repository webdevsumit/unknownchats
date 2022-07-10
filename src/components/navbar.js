import React from 'react';
import { 
    View, 
    StyleSheet, 
    Image,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Navbar = ({navigation}) => {

    const { username } = useSelector(state=>state.state);

    return(
        <View style={styles.upperContainer}>
            <View style={styles.navContainer}>
                <Image style={styles.logo} source={require('./../assets/images/logo.png')}/>
                <Text style={styles.mainText}>
                   Hello, {username}
                </Text>
            </View>
            <View style={styles.navContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate('Account')}>
                    <View style={styles.button}>
                        <MaterialCommunityIcons name="account-circle" size={30} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Navbar;

const styles = StyleSheet.create({
    upperContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '10.5%',
      width: "100%",
      flexDirection: 'row',
      paddingTop: StatusBar.currentHeight,
      position: 'absolute',
      top: 0,
      left: 0,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottomColor: '#aaa',
      borderBottomWidth: 0.5,
    },
    navContainer: {
    //   flex: 1,
    //   backgroundColor: '#fff',
      alignItems: 'center',
    //   justifyContent: 'center',
      flexDirection: 'row',
    },
    logo: {
        transform: [{ scale: 1 }],
        height: 30,
        width: 30,
    },
    mainText: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: 'serif',
        color:'#555',
        marginLeft: 10,
    },
    accountLogo: {
        transform: [{ scale: 1 }],
        height: 30,
        width: 30,
    },
  });