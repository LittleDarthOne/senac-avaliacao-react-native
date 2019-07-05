import React from 'react';

import { createCustomDrawerNavigator } from 'components/navigation/Navigator';

import Visits   from './Visits';
import Visitors from './Visitors';
import Profile  from './Profile';

const navigatorRoutes = {
  Visits,
  Visitors,
  Profile,
};

export default createCustomDrawerNavigator(navigatorRoutes);