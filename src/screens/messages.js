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
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setMessageBoxIdToOpen } from '../redux/states';
import { 
    getSeekerMessageBoxesApi,
    getExpertMessageBoxesApi,
    getMessagesByMessageBoxIdApi,
    deleteMessagesBoxByIdApi
} from '../apis';
import EmptyFeedsError from '../components/emptyFeedsError';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageCard from '../components/messageCard';

const Message = () => {

    const { messageBoxIdToOpen } = useSelector(state=>state.state);
    const dispatch = useDispatch();
    const [seekerMessageBoxes, setSeekerMessageBoxes] = useState([]);
    const [expertMessageBoxes, setExpertMessageBoxes] = useState([]);
    const [opendMessages, setOpenedMessages] = useState([]);
    const [isMessageBoxOpened, setIsMessageBoxOpened] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isSeekerTab, setIsSeekerTab] = useState(true);

    const getSeekerMessageBoxes = async () => {
        await getSeekerMessageBoxesApi().then(res=>{
            // console.log("getSeekerMessageBoxesApi", res.data.data);
            if(res.data.status==='success'){
                setSeekerMessageBoxes(res.data.data);
            }else{
                Alert.alert(res.data.message);
            }
        });
    }

    const getExpertMessageBoxes = async () => {
        await getExpertMessageBoxesApi().then(res=>{
            // console.log("getExpertMessageBoxesApi", res.data.data);
            if(res.data.status==='success'){
                setExpertMessageBoxes(res.data.data);
            }else{
                Alert.alert(res.data.message);
            }
        });
    }

    const getMessages = async (id) => {
        await getMessagesByMessageBoxIdApi({id}).then(res=>{
            // console.log("getMessagesByMessageBoxIdApi", res.data.data);
            if(res.data.status==='success'){
                setOpenedMessages(res.data.data);
            }else{
                Alert.alert(res.data.message);
            }
        });
    }

    const deleteMessageBox = async (id) => {
        await deleteMessagesBoxByIdApi({id}).then(res=>{
            if(res.data.status==='success'){
                console.log("deleteMessagesBoxByIdApi", res.data);
                setSeekerMessageBoxes(boxes=>boxes.filter(box=>box.id!=id));
                setExpertMessageBoxes(boxes=>boxes.filter(box=>box.id!=id));
            }else{
                Alert.alert(res.data.message);
            }
        });
    }

    useEffect(()=>{
        if(isSeekerTab) getSeekerMessageBoxes();
        else getExpertMessageBoxes();
    },[]);

    useEffect(()=>{
        if(!!messageBoxIdToOpen){
            getMessages(messageBoxIdToOpen);
            dispatch(setMessageBoxIdToOpen(null));
        }
    },[messageBoxIdToOpen]);

    const onSeekerRefresh = () => {
        getSeekerMessageBoxes();
    };

    const onExpertRefresh = () => {
        getExpertMessageBoxes();
    };

    return(
        <View style={styles.container}>
            <View style={{flex:1, width: "100%"}}>
                {isMessageBoxOpened && <>
                    {/* <FullExpertProfile expertPostId={fullProfileId} closeFullProfile={()=>setShowFullProfile(false)} handleMessage={handleMessageOnExpertProfile} /> */}
                </>}
                {/* <SearchBox onChange={searchFilter} value={search}/> */}


                {isSeekerTab ? 
                    <ScrollView contentContainerStyle={{...styles.buttonsContainer}}
                        refreshControl={
                            <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onSeekerRefresh}
                            />}
                        // onScroll={({nativeEvent}) => {
                        //         if (isCloseToBottom(nativeEvent)) {
                        //             loadMore();
                        //         }
                        //     }
                        // }
                        // scrollEventThrottle={400}
                    >
                    {seekerMessageBoxes?.map((msgBox)=>{
                        return(
                                <MessageCard
                                    key={msgBox.id}
                                    textUser={msgBox.seeker}
                                    onClick={()=>console.log(msgBox.id)}
                                    onDelete={()=>deleteMessageBox(msgBox.id)}
                                />
                            )
                        })}

                        {/* {isWholeDataLoaded ? <Text>You caught all</Text> : <>
                        </>} */}
                        {/* {isLoadMore ? <Text>Loading...</Text> : <View style={styles.bottomEmptySpace}></View>} */}
                        {seekerMessageBoxes?.length===0 && <EmptyFeedsError/>}
                    </ScrollView>
                :
                    <ScrollView contentContainerStyle={{...styles.buttonsContainer}}
                        refreshControl={
                            <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onExpertRefresh}
                            />}
                        // onScroll={({nativeEvent}) => {
                        //         if (isCloseToBottom(nativeEvent)) {
                        //             loadMore();
                        //         }
                        //     }
                        // }
                        // scrollEventThrottle={400}
                    >
                    {expertMessageBoxes?.map((msgBox)=>{
                        return(
                            <MessageCard
                                key={msgBox.id}
                                isSeeker={false}
                                textUser={msgBox.expert}
                                onClick={()=>console.log(msgBox.id)}
                                onDelete={()=>deleteMessageBox(msgBox.id)}
                            />
                            )
                        })}

                        {/* {isWholeDataLoaded ? <Text>You caught all</Text> : <>
                        </>} */}
                        {/* {isLoadMore ? <Text>Loading...</Text> : <View style={styles.bottomEmptySpace}></View>} */}
                        {expertMessageBoxes?.length===0 && <EmptyFeedsError/>}
                    </ScrollView>
                }
                {/* <TouchableOpacity style={styles.plusIconContainer} onPress={()=>{setSavedProfileToggle(!getSavedProfile); setSearch('');}}>
                        {getSavedProfile?
                            <Icon name="account-supervisor-circle" size={40} color="#000" />
                        :
                            <Icon name="heart-circle" size={40} color="#000" />
                        }
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default Message;

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
      buttonText: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      },
  });