import React                from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation }   from 'react-navigation';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Colors from 'utils/Colors';

export const DrawerButton = withNavigation(({ navigation }) => {
  return(
    <TouchableOpacity style={{marginHorizontal: 16}} onPress={() => navigation.openDrawer()}>
      <FontAwesomeIcon size={22} icon="bars" color={Colors.WHITE} />
    </TouchableOpacity>
  );
});

export const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: Colors.PRIMARY,
  },

  headerTitleStyle: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'normal',
  },

  headerTintColor: Colors.WHITE,
};