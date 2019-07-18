import React, { Component }                         from 'react';
import { Platform, StyleSheet, View, Image, Modal } from 'react-native';
import { Camera, ImagePicker, Permissions }         from 'expo';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { PrimaryButton, PrimaryIconButton } from 'components/action/Button';
import { PrimaryLink }                      from 'components/action/Link';

import Colors from 'utils/Colors';

export default class ProfilePicture extends Component {
  static defaultProps = {
    size:       150,
    borderWidth: 2,
  };

  state = {
    galleryPermission: false,
    cameraPermission:  false,
    cameraVisible:     false,
  }

  componentDidMount() {
    this.getPermissions();
  };

  getPermissions = async () => {
    if(Platform.OS === 'ios') { 
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ galleryPermission: status == 'granted' });
    }

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ cameraPermission: status === 'granted' });
  };

  showCamera = () => {
    const { cameraPermission } = this.state;

    if (!cameraPermission) {
      Alert.alert(undefined, 'Para tirar uma foto, é preciso conceder permissão de acesso à sua câmera', [{ text: 'OK' }]);
      return;
    }

    this.setState({ cameraVisible: true });
  };

  handlePictureSelection = async () => {
    const { galleryPermission } = this.state;
    const { onSelect }          = this.props;

    if (Platform.OS === 'ios' && !galleryPermission) {
      return;
    }

    let picture = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:    ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:        [1, 1],
      base64:        true,
    });

    if (!picture.cancelled && onSelect)
      onSelect('data:image/jpeg;base64,' + picture.base64);
  };

  handlePictureCapture = (picture) => {
    const { onSelect } = this.props;

    if (picture && onSelect)
      onSelect('data:image/jpeg;base64,' + picture.base64);

    this.setState({ cameraVisible: false });
  };

  render() {
    const { uri, size, borderWidth, style, onSelect } = this.props;
    const { cameraVisible }                           = this.state;

    const editable    = !!onSelect;
    const optimalSize = size - borderWidth;
    const sizeStyle   = {width: optimalSize, height: optimalSize};
    const borderStyle = {borderRadius: (optimalSize / 2), borderWidth};

    return (
      <View style={[styles.container, style]}>
        {editable && <PrimaryIconButton icon="images" onPress={this.handlePictureSelection} />}

        <View style={[styles.pictureContainer, sizeStyle, borderStyle]}>
            {uri && <Image source={{ uri }} style={sizeStyle} />}
            {!uri && <FontAwesomeIcon size={optimalSize} icon="user" color={Colors.LIGHT_TEXT} />}
        </View> 

        {editable && <PrimaryIconButton icon="camera" onPress={this.showCamera} />}
        {editable && <CameraModal visible={cameraVisible} onPressClose={() => this.setState({ cameraVisible: false })} onPictureTaken={this.handlePictureCapture} />}
      </View>
    );
  };
};

class CameraModal extends Component {
  static defaultProps = {
    visible: false,
  };

  state = {
    type: Camera.Constants.Type.back,
  };

  camera;

  takePicture = async () => {
    const { onPictureTaken } = this.props;

    if (this.camera) {
      let picture = await this.camera.takePictureAsync({ 
        quality: 0.4,
        base64: true,
      });

      if (picture && onPictureTaken)
        onPictureTaken(picture);
    }
  };

  render() {
    const { type } = this.state;
    const { visible, onPressClose } = this.props;

    return (
      <Modal visible={visible}>
        <Camera ref={ref => this.camera = ref} style={styles.camera} type={type} />

        <View style={styles.cameraButtonsContainer}>
          <PrimaryButton title="Tirar uma foto" onPress={this.takePicture} style={styles.cameraActionButton} />
          <PrimaryLink text="Cancelar" onPress={onPressClose} style={styles.cameraActionLink} />
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  pictureContainer: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.LIGHT_TEXT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  camera: { 
    flex: 1 ,
  },

  cameraButtonsContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.WHITE,
  },

  cameraActionButton: {
    margin: 8,
  },

  cameraActionLink: {
    marginTop: 8,
  }
});