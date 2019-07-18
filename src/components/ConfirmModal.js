import React, { Component }                                  from 'react';
import { StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native';

import { PrimaryButton } from 'components/action/Button';
import { PrimaryLink }   from 'components/action/Link';

import Colors from 'utils/Colors';

export default class ConfirmModal extends Component {

  static defaultProps = {
    cancelLabel:  'Cancelar',
    confirmLabel: 'Confirmar',
    dismissable:  true,
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel)
      onCancel();
  };

  handleConfirm = () => {
    const { onConfirm } = this.props;
    if (onConfirm)
      onConfirm();
  };

  render() {
    const { confirmLabel, cancelLabel, disabled, dismissable, contentContainerStyle, children, ...modalProps } = this.props;

    return (
      <Modal
        {...modalProps}
        animationType="none"
        transparent={true}
      >
        <TouchableWithoutFeedback style={StyleSheet.absoluteFillObject} onPress={() => dismissable && this.handleCancel()}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        
        <View style={styles.contentContainer}>
          <View style={[styles.childrenContainer, contentContainerStyle]}>
            {children}
          </View>

          <View style={styles.buttonsContainer}>
            <PrimaryButton style={styles.actionButton} title={confirmLabel} disabled={disabled} onPress={this.handleConfirm} />
            <PrimaryLink style={styles.actionLink} onPress={this.handleCancel} text={cancelLabel} />
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
    opacity: 0.75
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

  actionLink: {
    marginTop: 8,
  }
});