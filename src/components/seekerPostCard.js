import React,{ useState } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SeekerPostCard = ({ post, onLikeClick, onRejectClick, onSaveClick, onMessageClick, setRepliesCount }) => {

    const [menuOpen, setMenuOpen] = useState(false)

    return(
        <View style={styles.feedMainContainer}>
            <View style={styles.feedSubMainContainer}>
                <View style={styles.feedHeader}>
                    <View style={styles.feedHeaderLeft}>
                        <Image style={styles.profilePicture} source={{uri:post.owner.profilePicture}}/>
                        <View style={styles.profileDescriptionContainer}>
                            <Text style={styles.profileName}>{post.owner.user.username}</Text>
                            <Text style={styles.profileDescription}>{post.owner.shortDescription}</Text>
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

                                    <TouchableOpacity onPress={()=>{onRejectClick(post.id); setMenuOpen(false);}}>
                                        <Text style={styles.menuOption}>Not Interested - ({post.rejections})</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableOpacity>
                    }

                <View style={styles.horizontalLine}></View>

                <View style={styles.postMainDescriptionContainer}>
                    <Text style={styles.postMainDescription}>
                        {post.postDescription}
                    </Text>
                </View>

                <View style={styles.horizontalLine}></View>
                <View style={styles.feedFooter}>
                    <TouchableOpacity onPress={()=>{onLikeClick( post.id, post.likedByUser?"dislike":"like")}}>
                        <Icon name="thumb-up" size={30} color={post.likedByUser?"#3279a8":"#ddd" }/>
                        <Text style={styles.feedCounts}>{post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setRepliesCount(post.id, post.repliesCount+1)}}>
                        <Icon name="wechat" size={30} color="#888" />
                        <Text style={styles.feedCounts}>{post.repliesCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onMessageClick(post.id)}}>
                        <Icon name="message-plus" size={30} color={post.messagedBy?"#3279a8":"#ddd" } />
                        <Text style={styles.feedCounts}>{post.messageCounts}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onSaveClick( post.id, post.savedByUser?"remove":"save")}}>
                        <Icon name="content-save" size={30} color={post.savedByUser?"#3279a8":"#ddd" } />
                        <Text style={styles.feedCounts}>{post.savesCounts}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SeekerPostCard;

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