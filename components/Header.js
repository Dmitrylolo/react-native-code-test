import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>{this.props.children}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        height: '14%'
    },
    headerText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontSize: 12
    }
});
