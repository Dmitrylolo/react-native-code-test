import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native';

import * as acions from './actions';

import Header from './components/Header';
import UserCard from './components/UserCard';
import Loading from './components/Loading';

class Users extends Component {
    state = {
        page: 1,
        refreshing: false,
        loading: false,
        noMoreUsers: false,
    }

    componentDidMount() {
        if (this.state.page === 1) {
            this.fetchUsers();
        }
    }

    fetchUsers = async () => {
        this.setState({ loading: true });
        await this.props.makeRequest(this.state.page);
    }

    handleMoreUsers = () => {
        this.setState(
            {
                page: this.state.page + 1,
                loading: true
            },
            () => {
                this.fetchUsers();
            }
        );
        this.setState({ loading: false });
    }

    handleRefreshing = () => {
        this.props.isRefreshing();
        this.setState(
            {
                page: 1,
                noMoreUsers: false
            },
            () => {
                this.fetchUsers();
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
        console.log('loading ->', this.props.loading);


        if (!this.state.loading) {
            return null;
        }

        return (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 100,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE'
                }}
            >
                <Loading />
            </View>
        );
    };

    renderFlatList = () => {
        if (this.props.users) {
            return (
                <FlatList
                    data={this.props.users}
                    renderItem={({ item }) => {
                        return (
                            <UserCard data={item} />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    onRefresh={this.handleRefreshing}
                    refreshing={this.props.refresh}
                    onEndReached={this.handleMoreUsers}
                    onEndReachedThreshold={0.1}
                />
            );
        }
    }

    render() {
        return (
            <View>
                {this.renderFlatList()}
                {this.renderFooter()}
            </View>
        );
    }
}

function mapStateToProps({ fetchUsers }) {
    const { loading, users, page, refresh, noMoreUsers } = fetchUsers;
    return { loading, users, page, refresh, noMoreUsers };
}

export default connect(mapStateToProps, acions)(Users);
