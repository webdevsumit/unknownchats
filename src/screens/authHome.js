import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../localStorage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EmptyFeedsError from '../components/emptyFeedsError'
import SearchBox from '../components/serchBox'
import SeekerPostCard from '../components/seekerPostCard'

// import ConfirmDelete from '../components/confirmDelete';
// import { setFakeProfileIdToOpen } from '../redux/states';


const dummyData = [
    // {
    //     id:1,
    //     name:'Sumit',
    //     Image:'https://picsum.photos/200/300',
    //     shortDescription : 'Software Engineer | Working Hard | Only One',
    // },
    // {
    //     id:2,
    //     name:'Sumit',
    //     Image:'https://picsum.photos/200/300',
    //     shortDescription : 'Software Engineer | Working Hard | Only One',
    // },
    // {
    //     id:3,
    //     name:'Sumit',
    //     Image:'https://picsum.photos/200/300',
    //     shortDescription : 'Software Engineer | Working Hard | Only One',
    // },
    // {
    //     id:4,
    //     name:'Sumit',
    //     Image:'https://picsum.photos/200/300',
    //     shortDescription : 'Software Engineer | Working Hard | Only One',
    // },
    // {
    //     id:5,
    //     name:'Sumit',
    //     Image:'https://picsum.photos/200/300',
    //     shortDescription : 'Software Engineer | Working Hard | Only One',
    // },
]

const AuthHome = ({navigation}) => {

    const { baseUrl } = useSelector(state=>state.state);
    const dispatch = useDispatch();

    const [data, setData] = useState(dummyData);
    const [originalData, setOriginalData] = useState(dummyData);
    
    const [openConfirm, setOpenConfirm] = useState(false);
    const [toDelete, setToDelete] = useState('');
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isWholeDataLoaded, setIsWholeDataLoaded] = useState(false);

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
            console.log("batch number => ", batchNo);
            setBatchNo(prevBatchNo=>prevBatchNo+1);
            getPostsInBatch();
        }
    }

    const getPostsInBatch = async ()=>{
        console.log(currentDateTime);
        await axios.post(
            `${baseUrl}getPostsInBatch/`,
            {
                batchNo : batchNo,
                batchSize : batchSize,
                datatime : currentDateTime,
            },
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${await getData('token')}` 
                }  
            }        
        ).then(res=>{
            if (res.data.status==="success"){
                if(res.data.data.length===0) setIsWholeDataLoaded(true);
                else{
                    if(isLoadMore && !refreshing){
                        setData(tempData=>tempData.concat(res.data.data));
                        setOriginalData(tempData=>tempData.concat(res.data.data));
                    }else{
                        setData(res.data.data);
                        setOriginalData(res.data.data);
                    }
                }
            }else{
                setError(res.data.message);
                console.log(res.data.message);
            }
        }).catch(err=>console.log(err));
        setRefreshing(false);
        setIsLoadMore(false)
    }


    // Like dislieke and much more...
    const deleteFakeProfile = async ()=>{
        await axios.post(
            `${baseUrl}deleteFakeProfile/`,
            {
                id:toDelete
            },
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${await getData('token')}` 
                }  
            }        
        ).then(res=>{
            console.log(res.data);
            if (res.data.status==="success"){
                setData(data.filter(d=>d.id!==toDelete));
                setOriginalData(data.filter(d=>d.id!==toDelete));
            }else{
                setError(res.data.message);
            }
        }).catch(err=>console.log(err));
        setOpenConfirm(false);
    }

    useEffect(()=>{
        getPostsInBatch();
    },[]);

    const searchFilter=(text)=>{
        setSearch(text);
        // setData(originalData.filter(d=>d.displayName.toUpperCase().search(text.toUpperCase())>-1));
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
                {data.map((post)=>{
                    return(
                            <SeekerPostCard
                                key={post.id}
                                post={post}
                            />
                        )
                    })}

                    {isWholeDataLoaded ? <Text>You caught all</Text> : <>
                    </>}
                        {isLoadMore ? <Text>Loading...</Text> : <View style={styles.bottomEmptySpace}></View>}
                    {originalData.length===0 && <EmptyFeedsError/>}
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