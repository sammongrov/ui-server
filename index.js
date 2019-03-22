import React, { Component } from 'react';
import { TextInput, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from 'react-native-theme';
import { Config } from '@mongrov/config';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Screen, Button } from '@ui/components';
import { Colors } from '@ui/theme_default';

export default class SetServer extends Component {
  constructor(props) {
    super(props);
    const { onConfirmServer, safeBgColors, headerCurve, brandLogo } = this.props;
    this.onConfirmServer = onConfirmServer;
    this.safeBgColors = safeBgColors;
    this.headerCurve = headerCurve;
    this.brandLogo = brandLogo;
    this.state = {
      serverInput: '',
    };
  }

  render() {
    const { serverInput } = this.state;
    return (
      <Screen safeBgColors={this.safeBgColors}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles.whiteBackground}>
            <Image style={styles.loginHeaderCurve} source={this.headerCurve} resizeMode="stretch" />
          </View>
          <View style={[styles.loginBrandLogoView, styles.alignJustifyCenter]}>
            <Image style={{ width: 200, height: 100 }} resizeMode="contain" source={Config.logo} />
          </View>
          <View style={styles.serverBottomContainer}>
            <TextInput
              onChangeText={(text) => this.setState({ serverInput: text })}
              placeholder={`[workspace].${Config.brandName}`}
              autoCapitalize="none"
              style={styles.authTFInput}
              value={serverInput}
              underlineColorAndroid="transparent"
              autoCorrect={false}
            />
            <Button
              title="Confirm"
              onPress={() => this.onConfirmServer(serverInput)}
              color={Colors.BG_BTN}
              buttonStyle={[styles.serverConfirmButton]}
              containerStyle={[styles.marginTop15]}
            />
            <Button
              title="Back"
              onPress={() => Actions.pop()}
              color={Colors.BG_BTN}
              buttonStyle={[styles.serverDisableButton]}
              containerStyle={[styles.marginTop15]}
            />
          </View>
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}

SetServer.propTypes = {
  onConfirmServer: PropTypes.func,
  safeBgColors: PropTypes.array,
  headerCurve: PropTypes.number,
  brandLogo: PropTypes.number,
};

SetServer.defaultProps = {
  onConfirmServer: () => {},
  safeBgColors: [],
  headerCurve: 0,
  brandLogo: 0,
};
