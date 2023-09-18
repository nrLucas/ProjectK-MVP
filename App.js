import * as React from "react";

import { StyleSheet, View, Text } from "react-native";
import {
  loadTensorflowModel,
  useTensorflowModel,
} from "react-native-fast-tflite";

export default function App() {
  const [result, setResult] = React.useState("");

  const model = useTensorflowModel(
    require("../assets/object_detection_mobile_object_localizer_v1_1_default_1.tflite"),
    "core-ml"
  );

  React.useEffect(() => {
    if (model.model == null) return;

    console.log(`Running Model...`);
    const r = model.model.run([new Uint8Array([5])]);
    r.then((output) => {
      console.log(`Successfully ran Model!`, output);
      setResult(`${output[0]}${output[1]}${output[2]}...`);
    });
  }, [model.model]);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
