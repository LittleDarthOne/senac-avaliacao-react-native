import React from 'react';

import { createCustomDrawerNavigator, createCustomStackNavigator } from 'components/navigation/Navigator';

import VisitsList   from './VisitsList';
import VisitorsList from './VisitorsList';
import VisitorForm  from './VisitorForm';
import ProfileForm  from './ProfileForm';
import Config       from './Config';

const drawerRoutes = {
  VisitsList,
  VisitorsList,
  ProfileForm,
  Config,
};

const DrawerNavigator = createCustomDrawerNavigator(drawerRoutes);
DrawerNavigator.navigationOptions = { header: null };

const stackRoutes = {
  DrawerNavigator,
  VisitorForm,
}

export default createCustomStackNavigator(stackRoutes);