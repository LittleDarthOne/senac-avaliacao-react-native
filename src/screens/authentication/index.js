import React from 'react';

import { createCustomStackNavigator } from 'components/navigation/Navigator';

import AuthenticationForm from './AuthenticationForm';

const navigatorRoutes = {
  AuthenticationForm,
};

const navigatorConfig = {
  headerMode: 'none',
};

export default createCustomStackNavigator(navigatorRoutes, navigatorConfig);