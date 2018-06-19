import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import axios from 'axios';

import store from './store';

import Users from './Users';
import UsersWithoutRedux from './UsersWithoutRedux';
import Loading from './components/Loading';

export default class App extends React.Component {
  componentDidMount() {
  }


  axiosGet = async (url) => {
    const data = await axios.get(url);
    console.log('axios get -> ', data);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.15,
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'lightgrey',
              paddingVertical: 20
            }}
          >
            <Text style={styles.text}>Users</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Users />
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = {
  text: {
    fontSize: 28,
    color: 'black',

  }
};
