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

const Profile = ({ navigation, currentUser, onSave }) => {
  const [name, setName] = useState(currentUser.name);
  const [address, setAddress] = useState(currentUser.address);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [desc, setDesc] = useState(currentUser.description);

  const handleSave = () => {
    onSave({ ...currentUser, name, address, avatarUrl, description: desc });
    Alert.alert("Success", "Information saved!");
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
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#eee" }]}
          value={currentUser.email}
          editable={false}
        />
        <Text style={styles.label}>User ID</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#eee" }]}
          value={currentUser.userId}
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
          placeholder="http://link.to/image.png"
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

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.footerBtn} onPress={handleSave}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerBtn}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 30, backgroundColor: "white", flexGrow: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  textContainer: { flex: 1, marginRight: 10 },
  welcomeText: { fontSize: 40, fontWeight: "bold" },
  avatarFrame: { width: 90, height: 90, borderWidth: 2, borderColor: "black" },
  avatarImg: { width: "100%", height: "100%" },
  form: { marginTop: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 5,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 30,
  },
  footerBtn: {
    borderWidth: 1,
    borderColor: "black",
    width: "45%",
    paddingVertical: 12,
    alignItems: "center",
  },
  btnText: { fontSize: 18 },
});

export default Profile;
