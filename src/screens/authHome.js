import React, { useEffect, useState } from 'react';
import { 
    View, 
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EmptyFeedsError from '../components/emptyFeedsError'
import SearchBox from '../components/serchBox'
import SeekerPostCard from '../components/seekerPostCard'
import AddNewPost from '../components/addNewPost'
import { useDispatch } from 'react-redux';
import { setMessageBoxIdToOpenToOpen } from '../redux/states';


import {
    getPostsInBatchApi,
    likePostByUserIdApi,
    messageCountToPostByUserIdApi,
    rejectionCountToPostByUserIdApi,
    savePostByUserIdApi,
    deletePostByIdApi,
} from '../apis';


const AuthHome = ({ navigation }) => {
    
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isWholeDataLoaded, setIsWholeDataLoaded] = useState(false);
    const [error, setError] = useState('');

    const [batchNo, setBatchNo] = useState(1);
    const [batchSize, setBatchSize] = useState(25);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [addingNewPost, setAddingNewPost] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setCurrentDateTime(new Date());
        setBatchNo(1);
        getPostsInBatch();
        setIsWholeDataLoaded(false);
    };

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 1;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const loadMore = () => {
        if(!isWholeDataLoaded){
            setIsLoadMore(true);
            // console.log("batch number => ", batchNo);
            setBatchNo(prevBatchNo=>prevBatchNo+1);
            getPostsInBatch();
        }
    }

    const getPostsInBatch = async ()=>{
        let body = {
            batchNo,
            batchSize,
            datatime : currentDateTime,
        }
        await getPostsInBatchApi(body).then(res=>{
            if (res.data.status==="success"){
                if(res.data.data.length===0) setIsWholeDataLoaded(true);
                else{
                    if(isLoadMore && !refreshing){
                        setData(tempData=>tempData.concat(res.data.data));
                    }else{
                        setData(res.data.data);
                    }
                }
            }else{
                setError(res.data?.message);
            }
        }).catch(err=>console.log(err));
        setRefreshing(false);
        setIsLoadMore(false)
    }

    const onLikeClick = async (id, type) => {
        await likePostByUserIdApi({id, type}).then(res=>{
            if(res.data.status==='success'){
                let tempData = !!data? data : [];
                setData(
                    tempData.map(post=>{
                        if(post.id===id){
                            return {
                                ...post,
                                likes : type==='like'? post.likes+1 : post.likes-1,
                                likedByUser: type==='like'? true : false
                            };
                        }else return post;
                    })
                );
            }
        }).catch(err=>console.log(err));
    }
    const onSaveClick = async (id, type) => {
        await savePostByUserIdApi({id, type}).then(res=>{
            if(res.data.status==='success'){
                let tempData = !!data? data : [];
                setData(
                    tempData.map(post=>{
                        if(post.id===id){
                            return {
                                ...post,
                                savesCounts : type==='save'? post.savesCounts+1 : post.savesCounts-1,
                                savedByUser: type==='save'? true : false
                            };
                        }else return post;
                    })
                );
            }
        }).catch(err=>console.log(err));
    }

    const onRejectClick = async (id) => {
        await rejectionCountToPostByUserIdApi({id}).then(res=>{
            if(res.data.status==='success'){
                let tempData = !!data? data : [];
                setData(
                    tempData.map(post=>{
                        if(post.id===id){
                            return {
                                ...post,
                                rejections : post.rejections+1,
                                rejectedByUser: true,
                            };
                        }else return post;
                    })
                );
            }
        }).catch(err=>console.log(err));
    }
    const handleDeletePost = async (id) => {
        await deletePostByIdApi({id}).then(res=>{
            if(res.data.status==='success'){
                let tempData = !!data? data : [];
                setData(tempData.map(post=>post.id!==id));
            }
        }).catch(err=>console.log(err));
    }
    
    const onMessageClick = async (id) => {
        await messageCountToPostByUserIdApi({id}).then(res=>{
            if(res.data.status==='success'){
                let tempData = !!data? data : [];
                setData(
                    tempData.map(post=>{
                        if(post.id===id){
                            return {
                                ...post,
                                messageCounts : res.data.messageCounts,
                                messagedByUser: true,
                            };
                        }else return post;
                    })
                );
                dispatch(setMessageBoxIdToOpenToOpen(res.data.messageBoxId));
                navigation.navigate('Messages');
            }
        });
    }

    const setRepliesCount = (id, repliesCount) => {
        let tempData = !!data? data : [];
        setData(
            tempData.map(post=>{
                if(post.id===id){
                    return {
                        ...post,
                        repliesCount : repliesCount,
                    };
                }else return post;
            })
        );
    }

    useEffect(()=>{
        getPostsInBatch();
    },[]);

    const searchFilter=(text)=>{
        setSearch(text);
    }

    const handleAddNewPost=(text)=>{
        console.log(text);
        setAddingNewPost(false);
    }

    return(
        <View style={styles.container}>
            {addingNewPost && <AddNewPost
                handleSubmit={handleAddNewPost}
            />}
            <View style={{flex:1, width: "100%"}}>

                <SearchBox onChange={searchFilter} value={search}/>

                <ScrollView contentContainerStyle={{...styles.buttonsContainer}}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />}
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            loadMore();
                        }
                        }}
                        scrollEventThrottle={400}
                >
                {data?.filter(post=>{
                    if(!!search){
                        return (
                                ((!!post.postDescription && post.postDescription?.toUpperCase().indexOf(search.toUpperCase())!==-1) || 
                                (!!post.owner.shortDescription && post.owner.shortDescription?.toUpperCase().indexOf(search.toUpperCase())!==-1) || 
                                post.owner.user.username.toUpperCase().indexOf(search.toUpperCase())!==-1 ||
                                post.tags.filter(tag=>(!!tag.tagName && tag.tagName?.toUpperCase().indexOf(search.toUpperCase())!==-1)).length!==0) && 
                                post.rejectedByUser===false
                            );
                    }else{
                        return post.rejectedByUser===false;
                    }
                }).map((post)=>{
                    return(
                            <SeekerPostCard
                                key={post.id}
                                post={post}
                                onRejectClick={onRejectClick}
                                handleDeletePost={handleDeletePost}
                                onLikeClick={onLikeClick}
                                onMessageClick={onMessageClick}
                                onSaveClick={onSaveClick}
                                setRepliesCount={setRepliesCount}
                            />
                        )
                    })}

                    {isWholeDataLoaded ? <Text>You caught all</Text> : <>
                    </>}
                        {isLoadMore ? <Text>Loading...</Text> : <View style={styles.bottomEmptySpace}></View>}
                    {data?.length===0 && <EmptyFeedsError/>}
                </ScrollView>
                <TouchableOpacity style={styles.plusIconContainer} onPress={()=>setAddingNewPost(true)}>
                        <Icon name="plus-circle" size={50} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AuthHome;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#eee',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    buttonsContainer: {
        // flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonView: {
        paddingTop: 5,
        paddingBottom: 5,
        width: "90%",
        borderRadius: 20,
    },
    buttonProfile: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
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
    profilePicture:{
        width:40,
        height:40,
        backgroundColor: "#aaa",
        borderRadius:20,
    },
    plusIconContainer:{
        position:'absolute',
        bottom: 20,
        right:20,
        backgroundColor:"rgba(0,0,0,0)"
    },
    bottomEmptySpace:{
        height: 20,
    },
  });