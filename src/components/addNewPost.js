import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
} from 'react-native';

import { getMyPopularTagsApi } from '../apis';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddNewPost = ({ handleSubmit, cancelPost }) => {

    const [postText, setPostText] = useState('');
    const [tagList, setTagList] = useState(["ADD", "NEW", "ONE MORE", "ONE MORE", "ONE MORE", "ONE MORE"]);
    const [newTagText, setNewTagText] = useState("");

    var tagInputField = useRef(null);

    const fetchMyOwnTags = async () => {
        await getMyPopularTagsApi().then(res=>{
            if(res.data.status==='success'){
                setTagList(res.data.data);
            }
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        fetchMyOwnTags();
    },[])

    const handleRemoveTag = (removingTagIndex) => {
        setTagList(tagList.filter((tag, index)=>index!==removingTagIndex))
    }

    const handleNewTag = () => {
        if(tagList.filter((tag)=>tag===newTagText.toUpperCase()).length===0){
            setTagList([...tagList, newTagText.toUpperCase()]);
        }
        setNewTagText('');
        setTimeout(()=>{
            tagInputField.current.focus();
        },0);
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainBox}>

                <TextInput
                    style={styles.postInput}
                    value={postText}
                    onChange={({ nativeEvent: { eventCount, target, text } }) => { setPostText(text) }}
                    placeholder="Try to express all your emotions here..."
                    multiline={true}
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    dataDetectorTypes="all"
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                />
                <View style={styles.tagBox}>
                    <ScrollView nestedScrollEnabled={true} >
                        <View style={styles.addedTags}>
                            {tagList.map((tag, index)=><View key={index} style={styles.singleTag}>
                                <Text style={styles.singleTagText}>{tag}</Text>

                                <TouchableOpacity onPress={()=>handleRemoveTag(index)}>
                                    <Icon style={{ marginLeft: 4 }} name="delete-circle-outline" size={15} color="#aaa" />
                                </TouchableOpacity>

                            </View>)}
                        </View>
                    </ScrollView>
                    <TextInput
                        style={styles.tagInput}
                        value={newTagText}
                        onChange={({ nativeEvent: { eventCount, target, text } }) => { setNewTagText(text) }}
                        placeholder="Add TAGS for good reach...(min 3, max 10)"
                        autoCorrect={true}
                        dataDetectorTypes="all"
                        returnKeyType="send"
                        ref={tagInputField}
                        onSubmitEditing={handleNewTag}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={cancelPost}>
                        <Text style={styles.cancelButtonText}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleSubmit(postText, tagList)}>
                        <Text style={styles.buttonText}>POST NOW</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default AddNewPost;

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 11,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBox: {
        width: "80%",
        minHeight: "80%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 20,
    },
    postInput: {
        flex: 1,
        width: "100%",
        borderColor: 'grey',
        borderWidth: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        padding: 10,
        minHeight: 100,
        textAlignVertical: 'top',
        textAlign: 'left',
        marginBottom: 5,
    },
    tagBox: {
        flex: 1,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 1,
        minHeight: 50,
    },
    addedTags: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    tagInput: {
        width: '100%',
        minHeight: 30,
        padding: 0,
        margin: 0,
        borderTopColor: 'grey',
        borderTopWidth: 1,
    },
    singleTag: {
        flexDirection: 'row',
        backgroundColor: '#555',
        height: 25,
        padding: 5,
        margin: 2,
        borderRadius: 2,
    },
    singleTagText: {
        fontSize: 10,
        fontFamily: 'serif',
        color: '#fff'
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    buttonText: {
        fontSize: 14,
        backgroundColor: '#3279a8',
        fontFamily: 'serif',
        color: '#fff',
        padding: 5,
        margin: 2,
        borderRadius: 2,
    },
    cancelButtonText: {
        fontSize: 14,
        backgroundColor: '#888',
        fontFamily: 'serif',
        color: '#fff',
        padding: 5,
        margin: 2,
        borderRadius: 2,
    },
});