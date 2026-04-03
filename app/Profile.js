import React, { useEffect, useState } from "react";
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
  const [name, setName] = useState(currentUser?.name || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || "");
  const [desc, setDesc] = useState(currentUser?.description || "");

  useEffect(() => {
    setName(currentUser?.name || "");
    setAddress(currentUser?.address || "");
    setAvatarUrl(currentUser?.avatarUrl || "");
    setDesc(currentUser?.description || "");
  }, [currentUser]);

  const handleUpdate = async () => {
    try {
      await onSave({
        ...currentUser,
        name,
        address,
        avatarUrl,
        description: desc,
      });
      Alert.alert("Success", "Information saved to Database!");
    } catch (e) {
      Alert.alert("Error", "Failed to save data.");
    }
  };

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
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#eee" }]}
          value={currentUser?.email}
          editable={false}
        />

        <Text style={styles.label}>User ID (Permanent)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#eee" }]}
          value={currentUser?.userId}
          editable={false}
        />

        <Text style={styles.label}>Home Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          placeholder="Enter your address"
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Avatar URL</Text>
        <TextInput
          style={styles.input}
          value={avatarUrl}
          placeholder="http://image-link.com/photo.png"
          onChangeText={setAvatarUrl}
        />

        <Text style={styles.label}>Bio / Description</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          value={desc}
          multiline={true}
          placeholder="Tell us about yourself"
          onChangeText={setDesc}
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
          Save Changes
        </Text>
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
    marginBottom: 20,
  },
  textContainer: { flex: 1, marginRight: 10 },
  welcomeText: { fontSize: 38, fontWeight: "bold", color: "#1c1e21" },
  avatarFrame: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#f0f2f5",
  },
  avatarImg: { width: "100%", height: "100%", resizeMode: "cover" },
  form: { marginTop: 10 },
  label: { fontSize: 14, color: "#65676b", marginTop: 15, fontWeight: "600" },
  input: {
    backgroundColor: "#f0f2f5",
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    fontSize: 16,
    color: "#050505",
  },
  saveBtn: {
    backgroundColor: "#1877f2",
    borderRadius: 10,
    padding: 16,
    marginTop: 35,
    marginBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Profile;
