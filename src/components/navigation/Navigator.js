import React                                                               from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import LateralMenu from './LateralMenu';

export function createCustomStackNavigator (navigatorRoutes, navigatorConfig) {
  const Navigator = createStackNavigator(navigatorRoutes, navigatorConfig);
  return createAppContainer(Navigator);
};

export function createCustomDrawerNavigator (navigatorRoutes, navigatorConfig = {}) {

  const contentComponent = (props) => <LateralMenu navigation={props.navigation} />;

  const Navigator = createDrawerNavigator(navigatorRoutes, { contentComponent, ...navigatorConfig });
  return createAppContainer(Navigator);
};