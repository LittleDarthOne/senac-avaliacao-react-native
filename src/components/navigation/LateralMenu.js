import React, { Component }                                    from 'react';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import ScreenContainer     from 'components/ScreenContainer';
import ProfilePicture      from 'components/ProfilePicture';
import { PrimaryButton }   from 'components/action/Button';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { getProfile, addProfileSaveListener } from 'services/ProfileService';
import { logout }                             from 'services/AuthenticationService';

import Colors from 'utils/Colors';

const navigate = (navigation, route) => {
  if (route && route.trim().length) {
    navigation.navigate(route);
    navigation.closeDrawer();
  }
};

class MenuGroup extends Component {

  render() {
    const { title, children } = this.props;

    return (
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>{title}</Text>
        { children }
      </View>
    );
  };
};

class MenuOption extends Component {

  render() {
    const { navigation, currentRoute, route, icon, label } = this.props;
    const isActive = currentRoute.key == route;

    const containerStyle = isActive ? { ...styles.optionContainer, backgroundColor: Colors.EXTRA_LIGHT_TEXT } : styles.optionContainer;
    const textStyle = isActive ? {...styles.optionText, color: Colors.PRIMARY } : styles.optionText;

    return (
      <TouchableOpacity style={containerStyle} onPress={() => navigate(navigation, route)}>
        <FontAwesomeIcon size={18} icon={icon} color={textStyle.color} style={styles.optionIcon} />
        <Text style={textStyle}>{label}</Text>
        <FontAwesomeIcon size={14} icon="chevron-right" color={textStyle.color} style={styles.optionIconEnd} />
      </TouchableOpacity>
    );
  };
};

export default class LateralMenu extends Component {

  state = { 
    profile: {}, 
  };

  componentDidMount() {
    this.loadProfile();
  };

  loadProfile = async () => {
    try {
      const profile = await getProfile();
      this.setState({ profile });
      this.profileListener = addProfileSaveListener(profile => this.setState({ profile: profile || {} }));
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    if (this.profileListener)
      this.profileListener.remove();
  };

  attemptLogout = () => {
    try {
      logout();
    } finally {
      this.props.navigation.navigate('Authentication');
    }
  };

  render() {
    const { profile }    = this.state;
    const { navigation } = this.props;
    const currentRoute   = navigation.state.routes[navigation.state.index];

    return (
      <ScreenContainer>
        <View style={styles.itemsContainer}>
          <TouchableOpacity  style={styles.profileContainer} onPress={() => navigate(navigation, 'Profile')}>
            <ProfilePicture style={styles.profileIcon} size={60} />
            <View style={styles.profileDataContainer}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileData}>Morador</Text>
            </View>
            <FontAwesomeIcon size={14} icon="chevron-right" color={styles.profileName.color} style={styles.optionIconEnd} />
          </TouchableOpacity>

          <MenuGroup title="Visitas">
            <MenuOption navigation={navigation} currentRoute={currentRoute} route="VisitsList" icon="clipboard-list" label="Minhas visitas" />
            <MenuOption navigation={navigation} currentRoute={currentRoute} route="VisitorsList" icon="clipboard-check" label="Visitantes autorizados" />
          </MenuGroup>

          <MenuGroup title="Configurações">
            <MenuOption navigation={navigation} currentRoute={currentRoute} route="Config" icon="cogs" label="Configurações" />
          </MenuGroup>
        </View>

        <PrimaryButton title="Sair" style={styles.button} onPress={this.attemptLogout} />
      </ScreenContainer>
    );
  };
};

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1, 
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    paddingTop:  Platform.OS === 'android' ? (16 + StatusBar.currentHeight) : 20,
    padding: 16,
  },

  profileIcon: {
    marginRight: 16,
  },

  profileDataContainer: {
    flex: 1,
  },

  profileName: {
    fontSize: 18,
    color: Colors.WHITE,
  },

  profileData: {
    color: Colors.WHITE,
  },

  groupContainer: {
    borderColor: Colors.LIGHT_TEXT,
    borderTopWidth: 1,
  },

  groupTitle: {
    margin: 12,
    marginBottom: 4,
    fontSize: 14,
    color: Colors.DEFAULT_TEXT,
    opacity: 0.75,
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },

  optionIcon: {
    marginRight: 12,
  },

  optionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.DEFAULT_TEXT,
  },

  optionIconEnd: {
    marginLeft: 8,
    opacity: 0.5,
  },

  button: {
    margin: 16,
  },
});