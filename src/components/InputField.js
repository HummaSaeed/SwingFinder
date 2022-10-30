import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const InputField = ({ value, placeholder, label, onChangeText }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: "#DADADA",
    padding: 18,
    display: "flex",
    height: 60,
    borderRadius: 12,
  },
  label: {
    color: "#191A1F",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 21,
    marginBottom: 7,
    marginLeft: 5,
  },
});

export default InputField;
