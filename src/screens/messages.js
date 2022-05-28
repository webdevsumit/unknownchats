import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Message = () => {

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