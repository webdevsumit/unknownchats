import React, { useEffect } from 'react'

import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
    Image,
    Alert,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { DateDifferenceWithCurrentDate, truncateTheText } from '../commons';

function FullExpertProfile({expertPostId, closeFullProfile}) {
  return (
    <View style={styles.mainContainer}>
            <View style={styles.mainBox}>
                <View>
                    <View>
                        <Text>
                            What's up!
                        </Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={closeFullProfile}>
                            <Text style={styles.cancelButtonText}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>handleSubmit(postText, tagList)}>
                            <Text style={styles.buttonText}>POST NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
  )
}

export default FullExpertProfile;


const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 11,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBox: {
        width: "80%",
        minHeight: "80%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 20,
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    buttonText: {
        fontSize: 14,
        backgroundColor: '#3279a8',
        fontFamily: 'serif',
        color: '#fff',
        padding: 5,
        margin: 2,
        borderRadius: 2,
    },
    cancelButtonText: {
        fontSize: 14,
        backgroundColor: '#888',
        fontFamily: 'serif',
        color: '#fff',
        padding: 5,
        margin: 2,
        borderRadius: 2,
    },
  });