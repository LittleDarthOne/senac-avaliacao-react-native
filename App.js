import React                          from 'react';
import { Platform }                   from 'react-native';
import { createAppContainer }         from 'react-navigation';
import { createCustomStackNavigator } from 'components/navigation/Navigator';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab }     from '@fortawesome/free-brands-svg-icons';
import { fas }     from '@fortawesome/free-solid-svg-icons';
import { far }     from '@fortawesome/free-regular-svg-icons';

import Authentication from 'screens/authentication/';
import Home           from 'screens/home/';

import Colors from 'utils/Colors';

if(Platform.OS === 'android') { 
  // Config Intl Polyfill https://github.com/andyearnshaw/Intl.js (only android needs polyfill)
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/pt-BR'); // load the required locale details
  Intl.__disableRegExpRestore(); // for syntaxerror invalid regular expression unmatched parentheses
}

library.add(fas, fab, far);

const MainNavigator = createCustomStackNavigator(
  { Authentication, Home }, 
  { 
    headerMode: 'none',
    //defaultNavigationOptions: { header: null },
    //initialRouteName: 'Home',
  }, 
);

export default createAppContainer(MainNavigator);