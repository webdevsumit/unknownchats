import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, getData } from '../localStorage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { setIsLogin, setUsername } from '../redux/states';

const Account = ({navigation}) => {

    const dispatch = useDispatch();
    const { baseUrl } = useSelector(state=>state.state);

    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [email, setEmail] = useState("");

    const fetchProfile = async ()=>{
        await axios.get(
            `${baseUrl}getProfile/`,
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${await getData('token')}` 
                }  
            }        
        ).then(res=>{
            if (res.data.status==="success"){
                setData(res.data.data);
                setLoading(false);
            }else{
                setError(res.data.message);
            }
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        fetchProfile();
    },[]);

    const logout= async ()=>{
        await clearData(Platform.OS);
        dispatch(setIsLogin(false));
        dispatch(setUsername(''));
        navigation.navigate('Home');
    }

    const verifyEmail= async ()=>{
        await axios.get(
            `${baseUrl}sendEmailVerificationLink/`,
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${await getData('token')}` 
                }  
            }        
        ).then(res=>{
            if (res.data.status==="success"){
                setMessage("Email sent")
            }else{
                setError(res.data.message);
            }
        }).catch(err=>console.log(err));
    }

    const updateEmail= async ()=>{
        await axios.post(
            `${baseUrl}updateEmail/`,{
                email:email
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
                setMessage("Please check email and confirm your email id.");
                fetchProfile();
                setEdit(false);
            }else{
                setError(res.data.message);
            }
        }).catch(err=>console.log(err));
    }

    return(
        <View style={styles.container}>
            {!loading?
                <View style={styles.mainContainer}>
                    <MaterialCommunityIcons name="account-circle" size={70} color="black" />
                    <Text style={styles.usernameText}>{data?.user?.username}</Text>

                    {edit?
                    <View style={styles.bodyContainer}>
                        <TextInput
                            style={styles.emailTextInput}
                            value={email}
                            onChange={({ nativeEvent: { eventCount, target, text} })=>{setEmail(text)}}
                            placeholder="example@gmail.com"
                            autoComplete="email"
                        />
                        <View style={{...styles.emailContainer, justifyContent:"space-between", alignContent: 'space-between'}}>
                            <TouchableOpacity  style={styles.button} onPress={()=>setEdit(false)}>
                                <Text style={{...styles.logoutButtonText, color: "black", marginLeft:10, marginRight:10}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  style={styles.button} onPress={updateEmail}>
                                <Text style={{...styles.logoutButtonText, color: "black", marginLeft:10, marginRight:10}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.bodyContainer}>
                        <View style={styles.emailContainer}>
                            <Text style={styles.emailText}>{data?.user?.email?data?.user?.email:"Please add email. We send forgot password link just on email."}</Text>
                            {data?.isEmailVerified && <Ionicons name="md-checkmark-circle" size={25} color="green" />}
                        </View>
                        {!!error && <Text style={styles.error}>{error}</Text>}
                        {!!message && <Text style={styles.message}>{message}</Text>}
                        <View style={{...styles.emailContainer, justifyContent:"space-between", alignContent: 'space-between'}}>
                            {!(data?.isEmailVerified) && 
                                <TouchableOpacity  style={styles.verifyButton} onPress={verifyEmail}>
                                    <Text style={styles.logoutButtonText}>Verify Email ID</Text>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity  style={styles.button} onPress={()=>setEdit(true)}>
                                <Text style={{...styles.logoutButtonText, color: "black", marginLeft:10, marginRight:10}}>{!!data?.user?.email?"Edit":"Add"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }

                    <TouchableOpacity  style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutButtonText}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            :
            <View style={styles.mainContainer}>
                <Text>loading...</Text>
                <TouchableOpacity  style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutButtonText}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    )
}

export default Account;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      backgroundColor: '#eee',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    mainContainer: {
      flex: 1,
      width: '100%',
    //   height: '100%',
      marginTop: 40,
      marginBottom: 40,
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bodyContainer: {
      flex: 1,
      width: '90%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      padding: 30,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDD",
        padding: 10,
        margin:10,
    },
    logoutButton: {
        alignItems: "center",
        backgroundColor: "red",
        padding: 10,
        margin:10,
    },
    verifyButton: {
        alignItems: "center",
        backgroundColor: "green",
        padding: 10,
        margin:10,
    },
    buttonText: {
        fontFamily: 'serif'
    },
    error: {
        fontFamily: 'serif',
        color: "red",
    },
    message: {
        fontFamily: 'serif',
        color: "green",
    },
    usernameText: {
        fontFamily: 'serif',
        fontSize: 28,
        marginBottom: 20,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailText: {
        fontFamily: 'serif',
        // fontSize: 28,
        marginRight: 10,

    },
    logoutButtonText: {
        fontFamily: 'serif',
        color: "#FFF",
    },
    emailTextInput: {
        backgroundColor: '#fff',
        height: 40,
        margin: 12,
        // borderWidth: 1,
        padding: 10,
        width: '80%',
        borderBottomWidth:1,
    },
  });