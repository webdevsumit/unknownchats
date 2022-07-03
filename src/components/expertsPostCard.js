import React,{ useState } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
    Image,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DateDifferenceWithCurrentDate, truncateTheText } from '../commons';

const ExpertsPostCard = ({ post, onLikeClick, onSaveClick, onMessageClick, openProfile }) => {

    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <View style={styles.feedMainContainer}>
            <View style={styles.feedSubMainContainer}>
                <View style={styles.feedHeader}>
                    <View style={styles.feedHeaderLeft}>
                        <Image style={styles.profilePicture} source={{uri:post.profilePicture}}/>
                        <View style={styles.profileDescriptionContainer}>
                            <Text style={styles.profileName}>{post.displayName}</Text>
                            <Text style={styles.profileDescription}>{post.expertsShortDescription}</Text>
                            <View style={styles.inlineContainer}>
                                <Text style={styles.profileDescription}>{DateDifferenceWithCurrentDate(post.createdAt)}</Text>
                                <Text style={{...styles.profileDescription, color:'green', fontWeight: '900'}}>{post.ratings}</Text>
                                <Icon name="star" size={12} color="green" />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={()=>{setMenuOpen(true)}}>
                        <Icon name="dots-vertical" size={30} color="#888" />
                    </TouchableOpacity>

                </View>

                    {menuOpen && 
                        <TouchableOpacity style={styles.menuOptions} onPress={()=>{setMenuOpen(false)}}>
                            <View style={styles.menuOptions}>
                                <View style={styles.menuOptionsBlock}>

                                    <TouchableOpacity onPress={()=>{setMenuOpen(false);}}>
                                        <Text style={styles.menuOption}>Close</Text>
                                    </TouchableOpacity>

                                    {/* {post.addedByUser && 
                                    <TouchableOpacity onPress={()=>{handleDeletePost(post.id); setMenuOpen(false);}}>
                                        <Text style={{...styles.menuOption, color: 'red'}}>Delete</Text>
                                    </TouchableOpacity>} */}

                                </View>
                            </View>
                        </TouchableOpacity>
                    }

                <View style={styles.horizontalLine}></View>

                <View style={styles.postMainDescriptionContainer}>
                    <Text style={styles.postMainDescription}>
                        {truncateTheText(post.expertsLongDescription, 200)}
                    </Text>
                </View>

                <View style={styles.horizontalLine}></View>
                <View style={styles.feedFooter}>
                    <TouchableOpacity onPress={()=>{onLikeClick( post.id, post.staredByUser?"unstar":"star")}}>
                        <Icon name="account-heart" size={25} color={post.staredByUser?"#3279a8":"#ddd" }/>
                        <Text style={styles.feedCounts}>{post.stars}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onMessageClick(post.id)}}>
                        <Icon name="message-plus" size={25} color={post.messagedByUser?"#3279a8":"#ddd" } />
                        <Text style={styles.feedCounts}>{post.messageCounts}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onSaveClick( post.id )}}>
                        <Icon name="content-save" size={25} color={post.savedByUser?"#3279a8":"#ddd" } />
                        <Text style={styles.feedCounts}>{post.favouriteExpertCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{openProfile(post.id)}}>
                        <Icon name="eye-circle" size={25} color="#3279a8" />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default ExpertsPostCard;

const styles = StyleSheet.create({
    feedMainContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        width: "90%",
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
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',
    },
    feedHeaderLeft: {
        flex:1,
        alignItems: "center",
        flexDirection: "row",
    },
    menuOptions: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: 'transparent',
    },
    menuOptionsBlock: {
        position: 'absolute',
        right: 35,
        top: 15,
        padding: 10,
        width: 170,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: '#aaa',
    },
    profilePicture:{
        width:40,
        height:40,
        backgroundColor: "#aaa",
        borderRadius:20,
    },
    menuOption:{
        padding: 10,
        // borderBottomColor: '#aaa',
        // borderBottomWidth: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    profileDescriptionContainer: {
        
    },
    profileName: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: 'serif',
        paddingLeft: 10,
        // textDecorationLine : 'underline'
    },
    profileDescription : {
        fontSize: 10,
        fontFamily: 'serif',
        paddingLeft: 10,
        // textDecorationLine : 'underline'
    },
    postMainDescriptionContainer : {
        padding: 10,
    },
    postMainDescription : {
        fontFamily: 'serif',
    },
    feedFooter: {
        flex:1,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    feedCounts : {
        fontFamily: 'serif',
        textAlign:'center'
    },
    repliesBlockContainer : {
        width: '100%',
    },
    repliesBlockHeader : {
        width: '100%',
        maxHeight: 30,
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    repliesBlock : {
        width: '100%',
        maxHeight: 300,
        // paddingLeft: 15,
        // paddingRight: 15,
        padding: 20
    },
    replyInputBlock : {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
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
        paddingLeft: 20,
    },


    horizontalLine: {
        width: '93%',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        margin: 10,
    },
  });