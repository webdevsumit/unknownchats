import React,{  } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MessageCard = ({ textUser, onClick, onDelete, isSeeker=true }) => {

    return(
        <View style={styles.feedMainContainer}>
            <View style={styles.feedSubMainContainer}>

                <View style={styles.feedHeader}>
                    <TouchableOpacity onPress={onClick}>
                        <View style={styles.feedHeaderLeft}>
                            <Image style={styles.profilePicture} source={{uri:textUser.profilePicture?.picture}}/>
                            <View style={styles.profileDescriptionContainer}>
                                
                                {isSeeker?<>
                                    <Text style={styles.profileName}>{textUser.user.username}</Text>
                                    <Text style={styles.profileDescription}>{textUser.seekerShortDescription}</Text>
                                </>:<>
                                    <Text style={styles.profileName}>{textUser.displayName}</Text>
                                    <Text style={styles.profileDescription}>{textUser.expertShortDescription}</Text>
                                </>}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.inlineContainer}>
                        {textUser.unreadMessagesCount>0 && <>
                            <View style={styles.badge}>
                                <Text style={{...styles.profileDescription, fontWeight: "bold", color: "white", fontSize: 16, paddingLeft: 0}}>{textUser.unreadMessagesCount}</Text>
                            </View>
                        </>}
                        <TouchableOpacity onPress={onDelete}>
                            <Icon name="delete" size={30} color="#888" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default MessageCard;

const styles = StyleSheet.create({
    feedMainContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        width: "97%",
        borderRadius: 20,
    },
    feedSubMainContainer: {
        alignItems: "flex-start",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
      },
    feedHeader: {
        flex:1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    inlineContainer: {
        // width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',
    },
    feedHeaderLeft: {
        flex:1,
        alignItems: "center",
        flexDirection: "row",
    },
    profilePicture:{
        width:40,
        height:40,
        backgroundColor: "#aaa",
        borderRadius:20,
    },
    profileDescriptionContainer: {
        
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
    searchTextInput : {
        flex: 1,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 2,
        padding: 2,
        paddingLeft: 15,
        paddingRight: 15,
    },
     button: {
        flex:1,
        alignItems: "center",
        flexDirection: "row",
        // justifyContent: "space-between",
      },
    buttonText: {
        fontSize: 18,
        // fontWeight: "bold",
        fontFamily: 'serif',
        color:'#555',
        paddingLeft: 20,
    },
    badge : {
        backgroundColor: '#057523',
        marginRight: 5,
        alignItems: "center",
        justifyContent: "center",
        alignContent: 'center',
        width: 25,
        height: 28,
        borderRadius: 15,
        // paddingRight: 10
    },

    // horizontalLine: {
    //     width: '93%',
    //     borderBottomColor: '#eee',
    //     borderBottomWidth: 1,
    //     margin: 10,
    // },
  });