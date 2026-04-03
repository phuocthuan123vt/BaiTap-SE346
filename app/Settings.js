import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";

const Settings = ({ navigation, onLogout }) => {
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Do you want to log out of this account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            onLogout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.menuContainer}>
        {/* Nút Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  menuContainer: {
    width: "100%",
    alignItems: "center",
  },
  logoutBtn: {
    borderWidth: 2,
    borderColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  dbInfo: {
    marginTop: 40,
    fontSize: 12,
    color: "gray",
  },
  versionText: {
    marginTop: 10,
    fontSize: 12,
    color: "gray",
  },
});

export default Settings;