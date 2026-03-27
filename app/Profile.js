import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Profile = ({ currentUser, onSave }) => {
  const [name, setName] = useState(currentUser.name);
  const [address, setAddress] = useState(currentUser.address || "");
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || "");
  const [desc, setDesc] = useState(currentUser.description || "");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText} numberOfLines={2}>
            {name}!
          </Text>
        </View>
        <View style={styles.avatarFrame}>
          <Image
            source={{ uri: avatarUrl || DEFAULT_IMAGE }}
            style={styles.avatarImg}
          />
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#eee" }]}
          value={currentUser.email}
          editable={false}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          placeholder="XXXXXXXX"
          onChangeText={setAddress}
        />
        <Text style={styles.label}>Avatar URL</Text>
        <TextInput
          style={styles.input}
          value={avatarUrl}
          placeholder="http://link.png"
          onChangeText={setAvatarUrl}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          value={desc}
          multiline
          onChangeText={setDesc}
        />
      </View>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          onSave({
            ...currentUser,
            name,
            address,
            avatarUrl,
            description: desc,
          });
          Alert.alert("Success", "Saved!");
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white" }}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "white",
    flexGrow: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: { flex: 1, marginRight: 10 },
  welcomeText: { fontSize: 40, fontWeight: "bold" },
  avatarFrame: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%" },
  form: { marginTop: 20 },
  label: { fontSize: 14, color: "gray", marginTop: 15 },
  input: {
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#007aff",
    borderRadius: 12,
    padding: 16,
    marginTop: 30,
    alignItems: "center",
  },
});

export default Profile;
