import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import Header from './components/Header';
import UserCard from './components/UserCard';
import Loading from './components/Loading';

class UsersWithoutRedux extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRequest = () => {
        const { page } = this.state;
        const url = `https://reqres.in/api/users?page=${page}`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.data.length === 0) return null;
                this.setState({
                    data: page === 1 ? res.data : [...this.state.data, ...res.data],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    handleRefresh = () => {
        this.setState(
            {
                page: 1,
                refreshing: true,
            },
            () => {
                this.makeRequest();
            }
        );
    };

    handleMoreUsers = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.makeRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%'
                }}
            />
        );
    };

    renderHeader = () => {
        return <Header>Pull to refresh</Header>;
    };

    renderFooter = () => {
        console.log(this.state.loading);
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE'
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        return (
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <UserCard data={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh}
                refreshing={this.state.refresh}
                onEndReached={this.handleMoreUsers}
                onEndReachedThreshold={0.5}
            />
        );
    }
}

export default UsersWithoutRedux;
