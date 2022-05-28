import axios from 'axios';
import React, { useState } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    Keyboard,
} from 'react-native';
import HeroContainer from '../../components/heroContainer';
import UserPassInputs from '../../components/userPassInputs';
import { useSelector } from 'react-redux';

const ForgotPassword = ({navigation}) => {

    const { baseUrl } = useSelector(state=>state.state);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async (username, password)=>{
        setMessage("sending mail...")
        Keyboard.dismiss();

        await axios.post(
            `${baseUrl}accounts/sendForgotPasswordLink/`,
            {
                username: username,
                password: password,
            },
            {
                headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                }  
            }        
        ).then(res=>{
            if (res.data.status==="success"){
                setMessage(res.data.message);
                setTimeout(()=>{
                    navigation.navigate('Login');
                },1000);
            }else{
                setError(res.data.message);
                setMessage("");
            }
        }).catch(err=>{
            console.log(err); 
            setMessage("Failed");
        });
    }

    return(
        <View style={styles.container}>
            <HeroContainer/>
            <View>
                <Text style={styles.message}>{message}</Text>
            </View>
            <UserPassInputs 
            headText="Reset Password"
            buttonText="Send  Confirmation Email"
            placeholder1="Username"
            placeholder2="New Password"
            onSubmit={onSubmit}
            // link1Text="Do not have an account? Signup"
            link2Text=""
            // link1Click={()=>navigation.navigate('Signup')}
            link2Click={()=>navigation.navigate('Login')}
            error={error}
            />
        </View>
    )
}

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    message: {
        color: 'green',
    }
  });