import React, { useEffect, useState } from 'react'

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DateDifferenceWithCurrentDate, truncateTheText } from '../commons';
import { getFullExpertsProfileByIdApi } from '../apis';

function FullExpertProfile({ expertPostId, closeFullProfile, handleMessage }) {

    const [profile, setProfile] = useState(null);

    useEffect(()=>{
        getProfile(expertPostId);
    },[]);

    const getProfile = async (id) => {
        await getFullExpertsProfileByIdApi({id}).then(res=>{
            if(res.data.status==='success'){
                setProfile(res.data.data);
            }
        }).catch(err=>console.log(err));
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainBox}>
                <View style={styles.innerBox}>
                    <View style={styles.innerBoxTop}>
                        {!profile?<>
                            <Text>
                                Not Able to load data!
                            </Text>
                        </>:<>
                        <View>
                            <View style={styles.feedHeader}>
                                <Image style={styles.profilePicture} source={{uri:profile.profilePicture}}/>
                                <View style={styles.profileDescriptionContainer}>
                                    <Text style={styles.profileName}>{profile.displayName}</Text>
                                    <Text style={styles.profileDescription}>{profile.expertsShortDescription}</Text>
                                    <View style={styles.inlineContainer}>
                                        <Text style={styles.profileDescription}>{DateDifferenceWithCurrentDate(profile.createdAt)}</Text>
                                        <Text style={{...styles.profileDescription, color:'green', fontWeight: '900'}}>{profile.ratings}</Text>
                                        <Icon name="star" size={12} color="green" />
                                    </View>
                                </View>
                            </View>
                            <ScrollView style={styles.longDescriptionBoxScroll}>
                                <View style={styles.longDescriptionBox}>
                                    <Text style={styles.longDescriptionText}>
                                        {profile.expertsLongDescription}
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                        </>}
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={closeFullProfile}>
                            <Text style={styles.cancelButtonText}>CLOSE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleMessage(profile.id)}>
                            <Text style={styles.buttonText}>MESSAGE</Text>
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
        height: "80%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 20,
    },
    innerBox: {
        width: '100%',
        height: "100%",
        // backgroundColor: '#aaa',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    innerBoxTop: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingTop: 5,
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
    inlineContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',
    },
    feedHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePicture:{
        width:40,
        height:40,
        backgroundColor: "#aaa",
        borderRadius:20,
    },
    profileDescriptionContainer: {
        // marginLeft: 20,
        alignItems: "flex-start",
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: 'serif',
        color:'#555',
        paddingLeft: 10,
        // textDecorationLine : 'underline'
    },
    profileDescription : {
        fontSize: 10,
        fontFamily: 'serif',
        paddingLeft: 10,
        color:'#555',
        // textDecorationLine : 'underline'
    },
    longDescriptionBoxScroll: {
        // backgroundColor: '#aaa',
        fontFamily: 'serif',
        color:'#555',
        marginTop: 10,
        borderTopColor: "#aaa",
        borderBottomColor: "#aaa",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: '80%'
    },
    longDescriptionBox: {
        marginTop: 10,
        marginBottom: 10,
    },
    longDescriptionText: {
        fontFamily: 'serif',
        color:'#222',
    },
});