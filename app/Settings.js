import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Settings = ({ navigation, onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          onLogout();
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 60,
    textAlign: "center",
  },
  logoutBtn: {
    backgroundColor: "#ff3b30",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  logoutText: { fontSize: 20, fontWeight: "bold", color: "white" },
});

export default Settings;
