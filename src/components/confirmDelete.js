import React from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity,
    Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ConfirmDelete = ({ text, onDelete, onCancel}) => {

    return(
        <View style={styles.mainContainer}>
            <View style={styles.mainBox}>
                <View style={styles.textBox}>
                    <MaterialIcons name="delete" size={50} color="red" />
                    <Text style={styles.mainText}>
                        {text?text:"Confirm Delete"}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.deleteButton} onPress={onDelete}>
                        <Text style={styles.deleteButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ConfirmDelete;

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
    mainBox: {
      width: "80%",
      height: "30%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 20,
      paddingTop:40,
      paddingBottom:30,
    },
    textBox: {
      alignItems: "center",
      justifyContent: "center",
    },
    buttonContainer: {
      width: "80%",
      justifyContent:'space-between',
      flexDirection: 'row',
    },
    mainText: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: 'serif',
        color:'#555',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin:10,
    },
    deleteButton: {
        alignItems: "center",
        backgroundColor: "red",
        
        padding: 10,
        margin:10,
    },
    buttonText: {
        fontFamily: 'serif',
        color:'#555',
    },
    deleteButtonText: {
        fontFamily: 'serif',
        color: "#FFF",
    },
  });