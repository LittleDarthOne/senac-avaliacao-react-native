import React, { Component }                                                           from 'react';
import { StyleSheet, View, KeyboardAvoidingView, StatusBar, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView }                                                               from 'react-navigation';

import Colors from 'utils/Colors';

import ScrollableView from './ScrollableView';
import MainHeader     from './navigation/MainHeader';

export default class ScreenContainer extends Component {
  static defaultProps = {
    scrollable: true,
    loading:    false,
  };

  render() {
    const { style, scrollable, loading, loadingMessage, title, subtitle, rightIcon, onPressRightIcon, ...containerViewProps } = this.props;
    const mainHeaderProps = { title, subtitle, rightIcon, onPressRightIcon };

    return (
      <SafeAreaView style={{flexGrow: 1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
          <StatusBar barStyle="light-content" />

          {title && <MainHeader {...mainHeaderProps} />}

          {scrollable && (
            <ScrollableView contentContainerStyle={[styles.contentContainer, style]} {...containerViewProps}>
              {this.props.children}
            </ScrollableView>
          )}

          {!scrollable && (
            <View style={[styles.contentContainer, style]} {...containerViewProps}>
              {this.props.children}
            </View>
          )}

          {loading && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingOverlayBackground} />
              <ActivityIndicator size="large" color={Colors.WHITE} />
              {loadingMessage && <Text style={styles.loadingMessage}>{loadingMessage}</Text>}
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.PRIMARY,
  },

  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingOverlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.PRIMARY,
    opacity: 0.90,
  },

  loadingMessage: {
    color: Colors.WHITE,
    textAlign: 'center',
    marginVertical: 24,
    marginHorizontal: 32,
  }
});