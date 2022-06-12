import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    FlatList,
    VariantsBox,
} from 'react-native';

import { getMyPopularTagsApi, getTagsBySearchKeyApi } from '../apis';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddNewPost = ({ handleSubmit, cancelPost }) => {

    const [postText, setPostText] = useState('');
    const [tagList, setTagList] = useState([]);
    const [newTagText, setNewTagText] = useState("");
    const [suggestTagList, setSuggestTagList] = useState([
        {"id":1, "tagName":"add more", "useCount": 3}, 
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
        {"id":2, "tagName":"add one more", "useCount": 4},
    ]);

    var tagInputField = useRef(null);


    const fetchMyOwnTags = async () => {
        await getMyPopularTagsApi().then(res=>{
            if(res.data.status==='success'){
                setTagList(res.data.data.map(tag=>tag.tagName));
            }
        }).catch(err=>console.log(err));
    }

    useEffect(()=>{
        fetchMyOwnTags();
    },[]);

    // WILL BE IMPLEMENTED LATER TO REMOVE THE SUGGESTION LIST..
    // useEffect(()=>{
    //     if(!tagInputField?.current?.focus()){
    //         setSuggestTagList([]);
    //     }
    // },[tagInputField])
    // ...

    const handleRemoveTag = (removingTagIndex) => {
        setTagList(tagList.filter((tag, index)=>index!==removingTagIndex))
    }

    const handleNewTag = () => {
        if(tagList.filter((tag)=>tag===newTagText.toUpperCase()).length===0){
            setTagList([...tagList, newTagText.toUpperCase()]);
        }
        setNewTagText('');
        setSuggestTagList([]);
        setTimeout(()=>{
            tagInputField.current.focus();
        },0);
    }

    const handleTagFitering = async (searchKey) => {
        setNewTagText(searchKey);
        if(!!searchKey){
            await getTagsBySearchKeyApi({searchKey:searchKey}).then(res=>{
                if(res.data.status==='success'){
                    setSuggestTagList(res.data.data.filter(tag=>tag.tagName!==searchKey));
                }
            }).catch(err=>console.log(err));
        }else{
            setSuggestTagList([]);
        }
    }

    const handleTagSelectionFromList = (tagName) => {
        if(tagList.filter((tag)=>tag===tagName.toUpperCase()).length===0){
            setTagList([...tagList, tagName.toUpperCase()]);
        }
        setNewTagText('');
        setSuggestTagList([]);
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
                        onChange={({ nativeEvent: { eventCount, target, text } }) => { handleTagFitering(text) }}
                        placeholder="Add TAGS for good reach...(min 3, max 10)"
                        autoCorrect={true}
                        dataDetectorTypes="all"
                        returnKeyType="send"
                        ref={tagInputField}
                        onSubmitEditing={handleNewTag}
                    />
                    <FlatList
                        style={styles.tagInputFlatList}
                        data={suggestTagList}
                        renderItem={({item, index}) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleTagSelectionFromList(item?.tagName)}>
                                <View
                                    style={styles.tagInputFlatListItem}
                                >
                                    <Text style={styles.singleTagText}>
                                    {item?.tagName || ''}
                                    {" "}
                                    ({item?.useCount})
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item?.tagName}
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
    tagInputFlatList: {
        width: '100%',
        minHeight: 30,
        padding: 10,
        margin: 0,
        position:'absolute',
        bottom: 30,
        zIndex: 3,
        backgroundColor: '#eee',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1,
    },
    tagInputFlatListItem: {
        flexDirection: 'row',
        backgroundColor: '#00aa00',
        height: 25,
        padding: 5,
        margin: 2,
        borderRadius: 2,
        zIndex: 3,
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
        color: '#fff',
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