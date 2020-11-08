import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './pages/Login';
import HeaderRight from './components/HeaderRight';
import New from './pages/New';
import Timeline from './pages/Timeline';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    App: createStackNavigator({
      Timeline: {
        screen: Timeline,
        navigationOptions: ({navigation}) => ({
          title: 'Início',
          headerRight: () => <HeaderRight navigation={navigation} />,
        }),
      },
      New: {
        screen: New,
        navigationOptions: ({navigation}) => ({
          headerShown: false,
        }),
      },
    }),
  }),
);

export default Routes;
