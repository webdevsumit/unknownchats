import React, { useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setMessageBoxIdToOpen } from '../redux/states';

const Message = () => {

    const { messageBoxIdToOpen } = useSelector(state=>state.state);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!!messageBoxIdToOpen){
            console.log("Opening True messageBoxIdToOpen : ",messageBoxIdToOpen);
            dispatch(setMessageBoxIdToOpen(null));
        }
    },[messageBoxIdToOpen]);

    return(
        <View>
                <Text>Messages</Text>
        </View>
    )
}

export default Message;

const styles = StyleSheet.create({
    mainContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex:11,
      width: "100%",
      height: "100%",
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });