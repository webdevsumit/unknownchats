import React, { useEffect, useState } from 'react';
import { 
    View, 
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Text,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EmptyFeedsError from '../components/emptyFeedsError'
import SearchBox from '../components/serchBox'
import ExpertsPostCard from '../components/expertsPostCard';
import FullExpertProfile from '../components/fullExpertProfile';
import { useDispatch } from 'react-redux';
import { setMessageBoxIdToOpenToOpen } from '../redux/states';


import {
    getExpertsProfilesInBatchApi,
    getSavedExpertsProfilesInBatchApi,
    starAnExpertPostByUserIdApi,
    messageCountToExpertPostByUserIdApi,
    addExpertToFavouriteListApi,
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
    const [getSavedProfile, setSavedProfileToggle] = useState(false);

    const [fullProfileId, setFullProfileId] = useState(0);
    const [showFullProfile, setShowFullProfile] = useState(false);

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
            searchKey: !!search? search: '',
            batchNo,
            batchSize,
            datatime : currentDateTime,
        }

        var api;

        if(getSavedProfile) api = getSavedExpertsProfilesInBatchApi;
        else api = getExpertsProfilesInBatchApi;

        await api(body).then(res=>{
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
        console.log("Id : ",id);
        await starAnExpertPostByUserIdApi({id, type}).then(res=>{
            console.log(res.data);
            if(res.data.status==='success'){
                let tempData = !!data? data : [];
                setData(
                    tempData.map(post=>{
                        if(post.id===id){
                            return {
                                ...post,
                                stars : type==='star'? post.stars+1 : post.stars-1,
                                staredByUser: type==='star'? true : false
                            };
                        }else return post;
                    })
                );
            }
        }).catch(err=>console.log(err));
    }

    const onSaveClick = async (id) => {
        await addExpertToFavouriteListApi({id}).then(res=>{
            if(res.data.status==='success'){
                let tempData = !!data? data : [];
                setData(
                    tempData.map(post=>{
                        if(post.id===id){
                            return {
                                ...post,
                                favouriteExpertCount : res.data.type==='added'? post.favouriteExpertCount+1 : post.favouriteExpertCount-1,
                                savedByUser: res.data.type==='added'? true : false
                            };
                        }else return post;
                    })
                );
            }
        }).catch(err=>console.log(err));
    }
    
    const onMessageClick = async (id) => {
        await messageCountToExpertPostByUserIdApi({id}).then(res=>{
            console.log(res.data);
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
            }else{
                Alert.alert("Fee is required...");
            }
        });
    }

    const handleMessageOnExpertProfile = (id) => {
        console.log("id : ", id);
        onMessageClick(id);
    }

    useEffect(()=>{
        getPostsInBatch();
    },[]);

    useEffect(()=>{
        onRefresh();
    },[getSavedProfile]);

    const searchFilter=(text)=>{
        setSearch(text);
    }

    return(
        <View style={styles.container}>
            <View style={{flex:1, width: "100%"}}>
                {showFullProfile && <>
                    <FullExpertProfile expertPostId={fullProfileId} closeFullProfile={()=>setShowFullProfile(false)} handleMessage={handleMessageOnExpertProfile} />
                </>}
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
                {data?.map((post)=>{
                    return(
                            <ExpertsPostCard
                                key={post.id}
                                post={post}
                                onLikeClick={onLikeClick}
                                onMessageClick={onMessageClick}
                                onSaveClick={onSaveClick}
                                openProfile={(id)=>{setFullProfileId(id); setShowFullProfile(true);}}
                            />
                        )
                    })}

                    {isWholeDataLoaded ? <Text>You caught all</Text> : <>
                    </>}
                        {isLoadMore ? <Text>Loading...</Text> : <View style={styles.bottomEmptySpace}></View>}
                    {data?.length===0 && <EmptyFeedsError/>}
                </ScrollView>
                <TouchableOpacity style={styles.plusIconContainer} onPress={()=>{setSavedProfileToggle(!getSavedProfile); setSearch('');}}>
                        {getSavedProfile?
                            <Icon name="account-supervisor-circle" size={40} color="#000" />
                        :
                            <Icon name="heart-circle" size={40} color="#000" />
                        }
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
        color:'#555',
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