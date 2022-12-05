import React from 'react';
import {SafeAreaView, View, Button, Image} from 'react-native';
import ScanbotSDK, {
  DocumentScannerConfiguration,
  InitializationOptions,
} from 'react-native-scanbot-sdk';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.imageFileUri = null;
    this.initScanbotSDK();
  }

  async initScanbotSDK() {
    const options: InitializationOptions = {
      licenseKey: '', // TODO add license key here
      loggingEnabled: true,
    };
    try {
      const result = await ScanbotSDK.initializeSDK(options);
      console.log(result.result);
    } catch (e) {
      console.error(e);
    }
  }

  async scanDocument() {
    const config: DocumentScannerConfiguration = {};
    try {
      const result = await ScanbotSDK.UI.startDocumentScanner(config);
      if (result.status === 'OK') {
        this.imageFileUri = result.pages[0].documentPreviewImageFileUri;
        this.forceUpdate();
      }
    } catch (e) {
      console.error(e);
      alert('Could not start Document Scanner: ' + JSON.stringify(e));
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{padding: 30}}>
          <Button
            title={'Scan Document'}
            onPress={() => {
              this.scanDocument();
            }}
          />
        </View>
        <Image
          source={{uri: this.imageFileUri}}
          style={{width: '50%', height: '50%', resizeMode: 'contain'}}
        />
      </SafeAreaView>
    );
  }
}

export default App;
