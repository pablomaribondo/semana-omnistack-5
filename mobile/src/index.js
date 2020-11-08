import React from 'react';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Unrecognized WebSocket']);

import Routes from './routes';

const App = () => <Routes />;

export default App;
