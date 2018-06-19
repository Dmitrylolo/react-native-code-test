import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    FlatList
} from 'react-native';

import * as acions from './actions';

import Header from './components/Header';
import UserCard from './components/UserCard';
import Loading from './components/Loading';

class Users extends Component {
    state = {
        page: this.props.page,
        refreshing: false,
        loading: this.props.loading
    }

    componentWillMount() {
        this.fetchUsers(this.props.page);
    }


    fetchUsers = (page) => {
        this.props.makeRequest(page);
    }

    handleMoreUsers = () => {
        this.setState(
            {
                page: this.state.page + 1
            },
            () => {
                this.fetchUsers(this.state.page);
            }
        );
    }

    handleRefreshing = () => {
        this.props.isRefreshing();
        this.setState(
            {
                page: 1
            },
            () => {
                this.fetchUsers(1);
            }
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '80%',
                    backgroundColor: 'grey',
                    marginLeft: '10%'
                }}
            />
        );
    };

    renderHeader = () => {
        return <Header>Pull to refresh</Header>;
    };

    renderFooter = () => {
        if (!this.props.loading) return null;

        return (
            <Loading />
        );
    };

    render() {
        return (
            <FlatList
                data={this.props.users}
                renderItem={({ item }) => {
                    console.log('user', item);
                    return (
                        <UserCard data={item} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefreshing}
                refreshing={this.props.refresh}
                onEndReached={this.handleMoreUsers}
                onEndReachedThreshold={0.5}
            />
        );
    }
}

function mapStateToProps({ fetchUsers }) {
    const { loading, users, page, refresh } = fetchUsers;
    return { loading, users, page, refresh };
}

export default connect(mapStateToProps, acions)(Users);
