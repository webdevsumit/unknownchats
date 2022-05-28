import React from 'react';
import { 
    View, 
    StyleSheet,
    Text,
} from 'react-native';

const EmptyFeedsError = ({ post }) => {

    return(
        <View style={styles.feedErrorView}>
            <Text 
                style={{...styles.feedErrorText, 
                    fontFamily: 'serif', 
                    backgroundColor:"red",
                    color: 'white'
                }}>
                SORRY! We are unable to load data.
            </Text>
        </View>
    )
}

export default EmptyFeedsError;

const styles = StyleSheet.create({
    feedErrorView: {
        paddingTop: 5,
        paddingBottom: 5,
        width: "90%",
        borderRadius: 20,
    },
    feedErrorText: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      },
  });