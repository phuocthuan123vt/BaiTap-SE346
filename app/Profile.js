import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = ({ user, onLogout }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.backLink}>{"< Login"}</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Profile</Text>
        <View style={{ width: 50 }} />
      </View>
      <Text style={styles.headerTitle}>Profile</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={user.name} editable={false} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={user.email} editable={false} />
        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value="0123456789" editable={false} />
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} value="1990-01-01" editable={false} />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value="123 Main St, City, Country"
          editable={false}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value="A passionate developer and tech enthusiast"
          multiline
          editable={false}
        />
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 20 },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    alignItems: "center",
  },
  backLink: { color: "#007AFF", fontSize: 17 },
  navTitle: { fontSize: 17, fontWeight: "600" },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  form: { marginTop: 10 },
  label: { fontSize: 15, color: "#8E8E93", marginTop: 15, marginBottom: 5 },
  input: {
    backgroundColor: "#F2F2F7",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  logoutBtn: {
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    padding: 16,
    marginTop: 40,
    marginBottom: 40,
    alignItems: "center",
  },
  logoutText: { color: "white", fontWeight: "bold", fontSize: 17 },
});

export default Profile;
