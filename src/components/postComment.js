import React from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DateDifferenceWithCurrentDate } from '../commons';

const PostComment = ({ comment }) => {

    return(
        <View style={styles.commentBoxContainer}>
            <View style={styles.commentBox}>
                <View style={{...styles.commentInnerBox, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 10}}>
                    <View style={styles.commentInnerBox}>
                        <Text style={{...styles.comment, fontWeight: 'bold', paddingRight: 5, fontSize: 16 }}>{comment.user.username}</Text>
                        <Text style={{...styles.comment, fontSize: 10 }}>{DateDifferenceWithCurrentDate(comment.datetime)}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{setMenuOpen(true)}}>
                            <Icon name="delete" size={15} color="#888" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{...styles.comment, width: "100%",}}>{comment.reply}</Text>
            </View>
        </View>
    )
}

export default PostComment;

const styles = StyleSheet.create({
    commentBoxContainer: {
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    commentBox: {
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 0.2,
        shadowColor: '#aaa',
        // shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 10,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5
    },
    commentInnerBox: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    comment: {
        fontFamily: 'serif',
        textAlign: 'left',
    }
  });