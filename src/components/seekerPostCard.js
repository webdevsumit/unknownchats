import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SeekerPostCard = ({ post }) => {

    return(
        <View style={styles.feedMainContainer}>
            <View style={styles.feedSubMainContainer}>
                <View style={styles.feedHeader}>
                    <Image style={styles.profilePicture} source={{uri:post.Image}}/>
                    <View style={styles.profileDescriptionContainer}>
                        <Text style={styles.profileName}>{post.name}</Text>
                        <Text style={styles.profileDescription}>{post.shortDescription}</Text>
                    </View>
                </View>

                <View style={styles.horizontalLine}></View>

                <View style={styles.posrMainDescriptionContainer}>
                    <Text style={styles.posrMainDescription}>
                        If you want to achieve this behavior, see the guide for screen options 
                        with nested navigators. this could be useful if you are rendering a tab navigator 
                        inside a stack navigator and want to show the title of the active screen inside the tab 
                        navigator in the header of the stack navigator.
                        {post.name}
                    </Text>
                </View>

                <View style={styles.horizontalLine}></View>
                <View style={styles.feedFooter}>
                    <TouchableOpacity onPress={()=>{console.log(post.Image)}}>
                        <Icon name="thumb-up" size={30} color="#000" />
                        <Text style={styles.feedCounts}>100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{console.log(post.Image)}}>
                        <Icon name="chat" size={30} color="#000" />
                        <Text style={styles.feedCounts}>100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{console.log(post.Image)}}>
                        <Icon name="content-save" size={30} color="#000" />
                        <Text style={styles.feedCounts}>100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{console.log(post.Image)}}>
                        <Icon name="delete" size={30} color="#000" />
                        <Text style={styles.feedCounts}>100</Text>
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
    posrMainDescriptionContainer : {
        padding: 10,
    },
    posrMainDescription : {
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