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

import {
    getPostsInBatchApi,
    likePostByUserIdApi
} from '../apis';


const AuthHome = ({navigation}) => {
    
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isWholeDataLoaded, setIsWholeDataLoaded] = useState(false);
    const [error, setError] = useState('');

    const [batchNo, setBatchNo] = useState(1);
    const [batchSize, setBatchSize] = useState(25);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

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
                setData(tempData=>{
                    tempData.map(post=>{
                        if(post.id===id){
                            return {
                                ...post,
                                likes : type==='like'?post.likes+1:post.likes-1,
                                likeByUser: type==='like'
                            };
                        }else return post;
                    })
                });
            }
        }).catch(err=>console.log(err));
        setOpenConfirm(false);
    }

    useEffect(()=>{
        getPostsInBatch();
    },[]);

    const searchFilter=(text)=>{
        setSearch(text);
    }

    return(
        <View style={styles.container}>
            {/* {openConfirm && <ConfirmDelete
                onCancel={()=>setOpenConfirm(false)}
                onDelete={deleteFakeProfile}
            />} */}
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
                {data.filter(post=>{
                    if(!!search){
                        return (
                                (!!post.postDescription && post.postDescription?.toUpperCase().indexOf(search.toUpperCase())!==-1) || 
                                (!!post.owner.shortDescription && post.owner.shortDescription?.toUpperCase().indexOf(search.toUpperCase())!==-1) || 
                                post.owner.user.username.toUpperCase().indexOf(search.toUpperCase())!==-1 ||
                                post.tags.filter(tag=>(!!tag.tagName && tag.tagName?.toUpperCase().indexOf(search.toUpperCase())!==-1)).length!==0
                            );
                    }else{
                        return true;
                    }
                }).map((post)=>{
                    return(
                            <SeekerPostCard
                                key={post.id}
                                post={post}
                                onLikeClick={onLikeClick}
                            />
                        )
                    })}

                    {isWholeDataLoaded ? <Text>You caught all</Text> : <>
                    </>}
                        {isLoadMore ? <Text>Loading...</Text> : <View style={styles.bottomEmptySpace}></View>}
                    {data.length===0 && <EmptyFeedsError/>}
                </ScrollView>
                <TouchableOpacity style={styles.plusIconContainer} onPress={()=>navigation.navigate('PlatformSelection')}>
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