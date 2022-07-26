/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppContainer from './AppContainer';
import 'react-native-gesture-handler';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppContainer);
