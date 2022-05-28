import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../localStorage';

// import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
import ConfirmDelete from '../components/confirmDelete';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setFakeProfileIdToOpen } from '../redux/states';


const Experts = ({navigation}) => {

    const { baseUrl } = useSelector(state=>state.state);
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [error, setError] = useState('');

    const [openConfirm, setOpenConfirm] = useState(false);
    const [toDelete, setToDelete] = useState('');

    const [search, setSearch] = useState('');

    const fetchFakeProfiles = async ()=>{
        await axios.get(
            `${baseUrl}getFakeProfiles/`,
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${await getData('token')}` 
                }  
            }        
        ).then(res=>{
            if (res.data.status==="success"){
                setData(res.data.earlierProfiles);
                setOriginalData(res.data.earlierProfiles);
            }else{
                setError(res.data.message);
                console.log(res.data.message);
            }
        }).catch(err=>console.log(err));
    }
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
        fetchFakeProfiles();
    },[]);

    const searchFilter=(text)=>{
        setSearch(text);
        setData(originalData.filter(d=>d.displayName.toUpperCase().search(text.toUpperCase())>-1))
    }

    return(
        <View style={styles.container}>
            {/* {openConfirm && <ConfirmDelete
                onCancel={()=>setOpenConfirm(false)}
                onDelete={deleteFakeProfile}
            />} */}
            <View style={{flex:1, width: "100%"}}>

                <View style={styles.buttonsContainer}>
                    <View style={{...styles.buttonView}}>
                        <View style={{...styles.buttonProfile, padding: 0}}>
                            <TextInput
                                style={styles.searchTextInput}
                                value={search}
                                onChange={({ nativeEvent: { eventCount, target, text} })=>{searchFilter(text)}}
                                placeholder="Search by profile name"
                                autoComplete="email"
                            />
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{...styles.buttonsContainer}}>
                {data.map((profile)=>{
                    return(
                        <View key={profile.id} style={styles.buttonView}>
                            <Text style={{...styles.buttonProfile, fontFamily: 'serif'}}>Make your first unknown profile</Text>
                        </View>
                        )
                    })}
                    {originalData.length===0 && 
                        <View style={styles.buttonView}>
                            <Text style={{...styles.buttonProfile, fontFamily: 'serif'}}>Make your first unknown profile</Text>
                        </View>
                    }
                </ScrollView>
                <TouchableOpacity style={styles.plusIconContainer} onPress={()=>navigation.navigate('PlatformSelection')}>
                        <Icon name="account-heart" size={50} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Experts;

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
    searchTextInput: {
        backgroundColor: '#fff',
        height: 40,
        margin: 5,
        // borderWidth: 1,
        padding: 10,
        paddingLeft:15,
        width: '90%',
    },
  });