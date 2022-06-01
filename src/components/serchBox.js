import React from 'react';
import { 
    View, 
    StyleSheet,
    TextInput,
} from 'react-native';

const SearchBox = ({ onChange, value }) => {

    return(
        <View style={styles.searchBoxContainer}>
            <View style={styles.searchBoxView}>
                <View style={styles.searchBoxOuterView}>
                    <TextInput
                        style={styles.searchTextInput}
                        value={value}
                        onChange={({ nativeEvent: { eventCount, target, text} })=>{onChange(text)}}
                        placeholder="Search from loaded posts"
                        // autoComplete="email"
                        // onSubmitEditing={()=>console.log("submit")}
                    />
                </View>
            </View>
        </View>
    )
}

export default SearchBox;

const styles = StyleSheet.create({
    searchBoxContainer: {
        // flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBoxView: {
        paddingTop: 5,
        paddingBottom: 5,
        width: "90%",
        borderRadius: 20,
    },
    searchBoxOuterView: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 0,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    searchTextInput: {
        backgroundColor: '#fff',
        height: 30,
        margin: 5,
        // borderWidth: 1,
        padding: 5,
        paddingLeft:15,
        width: '90%',
    },
  });