import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Settings = ({ navigation, onLogout }) => {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          // 1. Gọi hàm onLogout ở index.js để xóa currentUser trong AsyncStorage
          await onLogout();

          // 2. Reset Stack điều hướng để quay về Login và xóa sạch lịch sử các màn hình trước
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout Account</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>App Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
    color: "#1c1e21",
  },
  menuContainer: {
    width: "100%",
    alignItems: "center",
  },
  logoutBtn: {
    backgroundColor: "#ff3b30", // Màu đỏ đặc trưng của nút Logout
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    width: "100%",
    alignItems: "center",
    // Hiệu ứng đổ bóng nhẹ cho nút
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  versionText: {
    marginTop: 20,
    color: "gray",
    fontSize: 12,
  },
});

export default Settings;
