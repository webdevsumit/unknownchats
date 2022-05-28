import axios from 'axios';
import React, { useState } from 'react';
import { 
    View, 
    StyleSheet,
} from 'react-native';
import HeroContainer from '../../components/heroContainer';
import UserPassInputs from '../../components/userPassInputs';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin, setUsername } from '../../redux/states';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const dispatch = useDispatch();
    const { baseUrl } = useSelector(state=>state.state);
    const [error, setError] = useState('');

    const onSubmit = async (username, password)=>{
        await axios.post(
            `${baseUrl}accounts/login/`,
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
                AsyncStorage.setItem('username',res.data.username);
                AsyncStorage.setItem('token',res.data.token);
                dispatch(setIsLogin(true));
                dispatch(setUsername(res.data.username));
                // navigation.navigate('AuthHome');
            }else{
                setError(res.data.error);
            }
        }).catch(err=>console.log(err));
    }

    return(
        <View style={styles.container}>
            <HeroContainer/>
            <UserPassInputs 
            headText="LOGIN"
            buttonText="LOGIN"
            placeholder1="Username"
            placeholder2="Password"
            onSubmit={onSubmit}
            // link1Text="Do not have an account? Signup"
            link2Text="Forgot Password?"
            // link1Click={()=>navigation.navigate('Signup')}
            link2Click={()=>navigation.navigate('ForgotPassword')}
            error={error}
            />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });