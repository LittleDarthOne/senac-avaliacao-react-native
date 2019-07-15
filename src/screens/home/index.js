import React from 'react';

import { createCustomDrawerNavigator, createCustomStackNavigator } from 'components/navigation/Navigator';

import VisitsList   from './VisitsList';
import VisitorsList from './VisitorsList';
import VisitorForm  from './VisitorForm';
import Profile      from './Profile';
import Config       from './Config';

const drawerRoutes = {
  VisitsList,
  VisitorsList,
  Profile,
  Config,
};

const DrawerNavigator = createCustomDrawerNavigator(drawerRoutes);
DrawerNavigator.navigationOptions = { header: null };

const stackRoutes = {
  DrawerNavigator,
  VisitorForm,
}

export default createCustomStackNavigator(stackRoutes);