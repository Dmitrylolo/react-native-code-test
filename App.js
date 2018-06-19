import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import axios from 'axios';

import store from './store';

import Users from './Users';

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
        <View>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'lightgrey',
              paddingVertical: 20
            }}
          >
            <Text style={styles.text}>Users</Text>
          </View>
          <Users />
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
