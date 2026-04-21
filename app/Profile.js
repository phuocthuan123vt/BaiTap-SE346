import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Profile = ({ currentUser }) => {
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [desc, setDesc] = useState(currentUser?.description || "");

  // Lắng nghe sự thay đổi của currentUser để điền vào ô nhập
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setDesc(currentUser.description);
    }
  }, [currentUser]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>{name || "Guest"}!</Text>
        </View>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatarImg}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={name} editable={false} />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#eee" }]}
          value={email}
          editable={false}
        />

        <Text style={styles.label}>Description / Bio</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          value={desc}
          multiline
          editable={false}
        />
      </View>
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
    marginBottom: 30,
  },
  textContainer: { flex: 1, marginRight: 10 },
  welcomeText: { fontSize: 40, fontWeight: "bold", color: "#1c1e21" },
  avatarImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#f0f2f5",
  },
  form: { width: "100%" },
  label: { fontSize: 14, color: "#65676b", marginTop: 20, fontWeight: "600" },
  input: {
    backgroundColor: "#f0f2f5",
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
    fontSize: 16,
    color: "black",
  },
});

export default Profile;
