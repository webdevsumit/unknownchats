import React,{ useState } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DateDifferenceWithCurrentDate, truncateTheText } from '../commons';
import {
    getRepliesByPostIdApi,
    addNewReplyToPostApi,
} from './../apis';
import PostComment from './postComment';

const SeekerPostCard = ({ post, onLikeClick, onRejectClick, onSaveClick, onMessageClick, setRepliesCount, handleDeletePost }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [repliesOpen, setRepliesOpen] = useState(false);
    const [repliesData, setRepliesData] = useState([]);
    const [replyRefreshing, setRepliesRefreshing] = useState(false);
    const [newReply, setNewReply] = useState('');
    const [fullText, setFullText] = useState(false);
    
    const onReplyClick = async (id) => {
        await getRepliesByPostIdApi({id}).then(res=>{
            if(res.data.status==='success'){
                setRepliesOpen(true);
                setRepliesData(res.data.data);
                setRepliesCount(id, res.data.repliesCount);
            }
        });
    }

    const onReplyRefresh = () => {
        setRepliesRefreshing(true);
        onReplyClick(post.id);
    };

    const handleAddNewReply = async () => {
        await addNewReplyToPostApi({id : post.id, reply : newReply}).then(res=>{
            if(res.data.status==='success'){
                setNewReply('');
                onReplyRefresh();
            }
        });
    }

    return(
        <View style={styles.feedMainContainer}>
            <View style={styles.feedSubMainContainer}>
                <View style={styles.feedHeader}>
                    <View style={styles.feedHeaderLeft}>
                        <Image style={styles.profilePicture} source={{uri:post.owner.profilePicture?.picture}}/>
                        <View style={styles.profileDescriptionContainer}>
                            <Text style={styles.profileName}>{post.owner.user.username}</Text>
                            <Text style={styles.profileDescription}>{post.owner.shortDescription}</Text>
                            <Text style={styles.profileDescription}>{DateDifferenceWithCurrentDate(post.datetime)}</Text>
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

                                    {post.addedByUser && 
                                    <TouchableOpacity onPress={()=>{handleDeletePost(post.id); setMenuOpen(false);}}>
                                        <Text style={{...styles.menuOption, color: 'red'}}>Delete</Text>
                                    </TouchableOpacity>}

                                </View>
                            </View>
                        </TouchableOpacity>
                    }

                <View style={styles.horizontalLine}></View>

                <View style={styles.postMainDescriptionContainer}>
                    {fullText?<>
                        <Text style={styles.postMainDescription}>
                            {post.postDescription}
                        </Text>
                        <TouchableOpacity onPress={()=>{setFullText(false)}}>
                            <Text style={{...styles.postMainDescription, color: '#3279a8'}}>
                                less
                            </Text>
                        </TouchableOpacity>
                    </>:<>
                        <Text style={styles.postMainDescription}>
                            {truncateTheText(post.postDescription, 200)}
                        </Text>
                        <TouchableOpacity onPress={()=>{setFullText(true)}}>
                            <Text style={{...styles.postMainDescription, color: '#3279a8'}}>
                                more
                            </Text>
                        </TouchableOpacity>
                    </>}
                </View>

                <View style={styles.horizontalLine}></View>
                <View style={styles.feedFooter}>
                    <TouchableOpacity onPress={()=>{onLikeClick( post.id, post.likedByUser?"dislike":"like")}}>
                        <Icon name="heart" size={25} color={post.likedByUser?"#3279a8":"#ddd" }/>
                        <Text style={styles.feedCounts}>{post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onReplyClick(post.id)}}>
                        <Icon name="wechat" size={25} color="#888" />
                        <Text style={styles.feedCounts}>{post.repliesCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onMessageClick(post.id)}}>
                        <Icon name="message-plus" size={25} color={post.messagedBy?"#3279a8":"#ddd" } />
                        <Text style={styles.feedCounts}>{post.messageCounts}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onSaveClick( post.id, post.savedByUser?"remove":"save")}}>
                        <Icon name="content-save" size={25} color={post.savedByUser?"#3279a8":"#ddd" } />
                        <Text style={styles.feedCounts}>{post.savesCounts}</Text>
                    </TouchableOpacity>
                </View>

                {repliesOpen && <>
                    <View style={styles.horizontalLine}></View>
                    <View 
                        // refreshControl={
                        //     <RefreshControl
                        //       refreshing={replyRefreshing}
                        //       onRefresh={onReplyRefresh}
                        //     />}
                        style={styles.repliesBlockContainer}
                    >
                        <View style={styles.repliesBlockHeader}>
                            <Text style={styles.feedCounts}>Replies</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={()=>{setRepliesOpen(false)}}>
                                    <Icon style={{ marginLeft: 10}} name="chevron-up-circle-outline" size={20} color="#444"/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onReplyRefresh}>
                                    <Icon style={{ marginLeft: 10}} name="refresh" size={20} color="#444"/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.repliesBlock}>
                            <ScrollView nestedScrollEnabled={true} >
                                {repliesData.map(reply=><PostComment key={reply.id} comment={reply} handleRefreshComments={onReplyRefresh} />)}
                            </ScrollView>
                        </View>

                        <View style={styles.replyInputBlock}>
                            <TextInput
                                style={styles.searchTextInput}
                                value={newReply}
                                onChange={({ nativeEvent: { eventCount, target, text} })=>{setNewReply(text)}}
                                placeholder="reply..."
                                // multiline={true}
                                autoCapitalize="sentences"
                                autoCorrect={true}
                                dataDetectorTypes="all"
                                returnKeyType="send"
                                // inlineImageLeft='ic_action_name' // image location : /android/app/src/main/res/drawable
                                // autoComplete="email"
                                onSubmitEditing={handleAddNewReply}
                            />
                            <TouchableOpacity onPress={handleAddNewReply}>
                                    <Icon style={{ marginLeft: 10}} name="send-circle" size={35} color="#3279a8"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>}
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
        color:'#555',
        paddingLeft: 10,
        // textDecorationLine : 'underline'
    },
    profileDescription : {
        fontSize: 10,
        fontFamily: 'serif',
        color:'#555',
        paddingLeft: 10,
        // textDecorationLine : 'underline'
    },
    postMainDescriptionContainer : {
        padding: 10,
    },
    postMainDescription : {
        fontFamily: 'serif',
        color:'#555',
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
        color:'#555',
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
        color:'#555',
        paddingLeft: 20,
    },


    horizontalLine: {
        width: '93%',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        margin: 10,
    },
  });