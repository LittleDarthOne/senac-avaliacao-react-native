import React from 'react';

import { createCustomDrawerNavigator } from 'components/navigation/Navigator';

import Visits  from './Visits';
import Whitelist from './Whitelist';
import Profile from './Profile';

const navigatorRoutes = {
  Visits,
  Whitelist,
  Profile,
};

export default createCustomDrawerNavigator(navigatorRoutes);