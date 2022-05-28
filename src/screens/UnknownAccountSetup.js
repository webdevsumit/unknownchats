import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableHighlight,
    TextInput,
    Image,
    Platform,
} from 'react-native';
import Navbar from '../components/navbar';
import { getData } from '../localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { setFakeProfileIdToOpen } from '../redux/states';
import * as ImagePicker from 'expo-image-picker';

const UnknownAccountSetup = ({navigation}) => {

    const dispatch = useDispatch();

    const { baseUrl } = useSelector(state=>state.state);

    const [data, setData] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [displayImage, setDisplayImage] = useState(null);
    const [error, setError] = useState('');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setDisplayImage({
                ...result,
                uri: Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri,
            });
        }
      };


    const onSubmit = async () =>{
        console.log("submit");

        const formData = new FormData();

        formData.append('displayName', displayName);
        formData.append('profilePicture', displayImage);


        await axios.post(
                `${baseUrl}setFakeProfile/`,
                formData,
                {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        // 'Accept': 'multipart/form-data',
                        // 'Content-Type': 'application/json',
                        // 'Accept': "application/json",
                        'Authorization': `Token ${await getData('token')}` 
                    }  
                }        
            ).then(res=>{
                if (res.data.status==="success"){
                    dispatch(setFakeProfileIdToOpen(res.data.id));
                    navigation.navigate('FakeAccount');
                }else{
                    setError(res.data.message);
                    console.log(res.data.message);
                }
            }).catch(err=>console.log(err));
    }

    return(
        <View style={styles.container}>
            <Navbar navigation={navigation} />
            <View  style={styles.lowerContainer}>
                <View  style={styles.loginContainer}>
                    <View style={styles.profileContainer}>
                        {displayImage?.uri && <Image source={{ uri: displayImage.uri }} style={styles.profilePicture} />}
                        <View style={styles.buttonView}>
                            <TouchableHighlight onPress={pickImage}>
                                <View style={styles.button}>
                                    <Text style={styles.profileImageBtnText}>Select Image</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <TextInput
                        style={styles.displayName}
                        value={displayName}
                        onChange={({ nativeEvent: { eventCount, target, text} })=>{setDisplayName(text)}}
                        placeholder="Display Name"
                        autoComplete="username"
                        autoFocus={true}
                        autoCapitalize='none'
                    />
                    <View style={styles.errorsView}>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableHighlight onPress={onSubmit}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>SET</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UnknownAccountSetup;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#eee',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    lowerContainer: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        marginTop: 70,
      },
    loginContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%",
      //   height: "80%",
        borderRadius: 20,
        borderColor:"#aaa",
      //   borderWidth:1,
      },
      subContainer: {
          fontSize: 28,
          fontWeight: "bold",
          fontFamily: 'serif',
          color: '#fff',
          paddingBottom: 20,
          paddingTop: 20,
      },
      displayName: {
          backgroundColor: '#fff',
          height: 40,
          margin: 12,
          // borderWidth: 1,
          padding: 10,
          width: '80%',
          borderBottomWidth:1,
      },
      button: {
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10,
        },
      buttonText: {
          fontSize: 16,
          fontWeight: "bold",
          fontFamily: 'serif',
      },
      profileContainer: {
          width:"100%",
          justifyContent:"center",
          alignItems: "center",
          marginTop: 20,
      },
      profilePicture:{
        width:100,
        height:100,
        backgroundColor: "#aaa",
        borderRadius:50,
    },
      profileImageBtnText: {
          fontSize: 12,
          fontWeight: "bold",
          fontFamily: 'serif',
      },
      buttonView: {
          paddingTop: 10,
          paddingBottom: 20,
          width: "80%",
      },
      error: {
          color: 'red',
          textAlign: 'left',
      },
      errorsView: {
          width: '80%'
      },
    });