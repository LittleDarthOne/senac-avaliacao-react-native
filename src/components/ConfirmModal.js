import React, { Component }        from 'react';
import { StyleSheet, Modal, View } from 'react-native';

import { PrimaryButton } from 'components/action/Button';
import { PrimaryLink }   from 'components/action/Link';

import Colors from 'utils/Colors';

export default class ConfirmModal extends React.Component {
  static defaultProps = {
    cancelLabel: 'Cancelar',
    confirmLabel: 'Confirmar',
  };

  state = {
    visible: this.props.visible
  };

  _handleCancel = () => {
    this.close(this.props.onCancel);
  };

  _handleConfirm = () => {
    this.close(this.props.onConfirm);
  };

  open = (callback) => {
    this.setState({ visible: true }, () => {
      if (this.props.onOpen)
        this.props.onOpen();

      if (callback)
        callback();
    });
  };

  close = (callback) => {
    this.setState({ visible: false }, () => {
      if (this.props.onClose)
        this.props.onClose();

      if (callback)
        callback();
    });
  };

  toggle = () => {
    if (!this.state.open)
      this.open();
    else
      this.close();
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible)
      this.open();
    else if (this.props.visible && !nextProps.visible)
      this.close();
  };

  render() {
    const { contentContainerStyle, children, confirmLabel, cancelLabel, disabled } = this.props;

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.visible}
      >
        <View style={styles.overlay} />
        
        <View style={styles.contentContainer}>
          <View style={[styles.childrenContainer, this.props.contentContainerStyle]}>
            {this.props.children}
          </View>

          <View style={styles.buttonsContainer}>
            <PrimaryButton style={styles.actionButton} title={this.props.confirmLabel} disabled={this.props.disabled} onPress={this._handleConfirm} />
            <PrimaryLink style={styles.cancelActionLink} onPress={this._handleCancel} text={this.props.cancelLabel} />
          </View>
        </View>
      </Modal>
    );
  };

};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    opacity: 0.5
  },

  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.WHITE,
  },

  buttonsContainer: {
    alignItems: 'center',
    padding: 16,
  },

  childrenContainer: {
    paddingTop: 16
  },

  actionButton: {
    margin: 8,
  },

  cancelActionLink: {
    marginTop: 12,
  }
});