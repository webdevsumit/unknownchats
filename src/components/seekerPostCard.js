import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SeekerPostCard = ({ post, onLikeClick }) => {

    return(
        <View style={styles.feedMainContainer}>
            <View style={styles.feedSubMainContainer}>
                <View style={styles.feedHeader}>
                    <Image style={styles.profilePicture} source={{uri:post.owner.profilePicture}}/>
                    <View style={styles.profileDescriptionContainer}>
                        <Text style={styles.profileName}>{post.owner.user.username}</Text>
                        <Text style={styles.profileDescription}>{post.owner.shortDescription}</Text>
                    </View>
                </View>

                <View style={styles.horizontalLine}></View>

                <View style={styles.postMainDescriptionContainer}>
                    <Text style={styles.postMainDescription}>
                        {post.postDescription}
                    </Text>
                </View>

                <View style={styles.horizontalLine}></View>
                <View style={styles.feedFooter}>
                    <TouchableOpacity onPress={()=>{onLikeClick( post.id, post.likedByUser?"dislike":"like")}}>
                        <Icon name="thumb-up" size={30} color={post.likedByUser?"#ff0000":"#ddd" }/>
                        <Text style={styles.feedCounts}>{post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{console.log(post.tags)}}>
                        <Icon name="chat" size={30} color={post.messagedBy?"#ff0000":"#ddd" } />
                        <Text style={styles.feedCounts}>{post.messageCounts}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{console.log(post.tags)}}>
                        <Icon name="delete" size={30} color={post.rejectedBy?"#ff0000":"#ddd" } />
                        <Text style={styles.feedCounts}>{post.rejections}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{console.log(post.tags)}}>
                        <Icon name="content-save" size={30} color={post.savedBy?"#ff0000":"#ddd" } />
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