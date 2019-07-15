import React                                           from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { defaultHeaderOptions } from './Header';
import LateralMenu              from './LateralMenu';

import Colors from 'utils/Colors';

export function createCustomStackNavigator (navigatorRoutes, navigatorConfig = {}) {
  const { defaultNavigationOptions, ...otherConfigs } = navigatorConfig;
  const defaultConfig = {
    defaultNavigationOptions: {
      ...defaultHeaderOptions,
      ...defaultNavigationOptions,
    },
    ...otherConfigs,
  };
  
  return createStackNavigator(navigatorRoutes, defaultConfig);
};

export function createCustomDrawerNavigator (navigatorRoutes, navigatorConfig = {}) {
  const defaultConfig = {
    contentComponent: (props) => <LateralMenu navigation={props.navigation} />,
    ...navigatorConfig,
  }

  return createDrawerNavigator(navigatorRoutes, defaultConfig);
};