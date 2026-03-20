import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Register = ({ navigation, onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const generateID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreate = () => {
    if (!name || !email || !pass || !confirmPass) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }
    if (pass !== confirmPass) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    onRegister({ userId: generateID(), name, email, password: pass });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInputZone}
          placeholder="test"
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInputZone}
          placeholder="test@mail.com"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInputZone}
          placeholder=" ●   ●   ●   ● "
          secureTextEntry
          onChangeText={setPass}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.textInputZone}
          placeholder=" ●   ●   ●   ● "
          secureTextEntry
          onChangeText={setConfirmPass}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 20 }}
      >
        <Text style={{ textDecorationLine: "underline" }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: { fontSize: 40, fontWeight: "bold", marginBottom: 20 },
  form: { width: "100%" },
  label: { fontSize: 16, marginTop: 15, marginLeft: 35, fontWeight: "bold" },
  textInputZone: {
    width: "80%",
    borderWidth: 3,
    borderColor: "black",
    paddingHorizontal: 10,
    height: 40,
    marginLeft: 35,
    marginTop: 5,
    fontWeight: "bold",
  },
  button: {
    marginTop: 40,
    borderWidth: 3,
    borderColor: "black",
    paddingHorizontal: 35,
    paddingVertical: 5,
  },
  buttonText: { fontSize: 20, fontWeight: "bold" },
});

export default Register;
