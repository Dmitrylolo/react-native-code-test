import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


export default class UserCard extends React.Component {
    render() {
        const { avatar, first_name, last_name } = this.props.data;
        return (
            <View style={styles.container}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <Text style={styles.userName}>{/* eslint-disable */first_name} {last_name/* eslint-enable */}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    userName: {
        color: 'black',
        fontSize: 24
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginHorizontal: 30
    }
});
