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
import { setData } from '../../localStorage';

const Signup = ({navigation}) => {

    const dispatch = useDispatch();
    const { baseUrl } = useSelector(state=>state.state);
    const [error, setError] = useState('');

    const onSubmit = async (username, password)=>{
        await axios.post(
            `${baseUrl}accounts/signup/`,
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
        ).then(async res=>{
            console.log(res.data);
            if (res.data.status==="success"){
                await setData('username',res.data.username);
                await setData('token',res.data.token);
                dispatch(setIsLogin(true))
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
            headText="SIGNUP"
            buttonText="SIGNUP"
            placeholder1="Username"
            placeholder2="Create Password"
            onSubmit={onSubmit}
            // link1Text="Already have an account? Login"
            link2Text=""
            // link1Click={()=>navigation.navigate('Login')}
            link2Click={()=>console.log('Do nothing')}
            error={error}
            />
        </View>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });