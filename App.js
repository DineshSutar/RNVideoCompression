import React, { PureComponent } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import RNVideoHelper from "react-native-video-helper";
import ImagePicker from "react-native-image-crop-picker";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      originalUrl: "",
      progress: 0,
      url: ""
    };
  }

  onPressSelect = () => {
    ImagePicker.openPicker({
      mediaType: "video"
    }).then(video => {
      this.setState({ originalUrl: video.path });
      console.log(video);
    });
  };

  onPressStart = () => {
    this.setState({ progress: 0, url: "" });
    RNVideoHelper.compress(this.state.originalUrl, { quality: "low" })
      .progress(value => {
        if (value * 100 > this.state.progress + 10) {
          this.setState({ progress: value * 100 });
          console.log("progress", value);
        }
      })
      .then(compressedUri => {
        this.setState({ url: compressedUri });
        console.log("compressedUri", compressedUri);
      });
  };

  onPressCancel = () => RNVideoHelper.cancelCompress();

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "powderblue",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={this.onPressSelect}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: 50,
            backgroundColor: "#b0c24a",
            margin: 10
          }}
        >
          <Text>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onPressStart}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: 50,
            backgroundColor: "skyblue",
            margin: 10
          }}
        >
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onPressCancel}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: 50,
            backgroundColor: "grey",
            margin: 10
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", margin: 10 }}>
          OriginalUrl: {this.state.originalUrl}
        </Text>
        <Text style={{ textAlign: "center", margin: 10 }}>
          Progress: {this.state.progress}
        </Text>
        <Text style={{ textAlign: "center", margin: 10 }}>
          Url: {this.state.url}
        </Text>
      </View>
    );
  }
}
