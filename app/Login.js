import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = ({ chuyenSangRegister, onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Email/Username</Text>
        <TextInput
          style={styles.textInputZone}
          placeholder="test@mail.com"
          placeholderTextColor="black"
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInputZone}
          placeholder=" ●   ●   ●   ● "
          placeholderTextColor="black"
          secureTextEntry
          onChangeText={setPass}
        />

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onLogin(email, pass)}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={chuyenSangRegister} style={{ marginTop: 20 }}>
        <Text style={{ textDecorationLine: "underline" }}>
          Don't have an account? Register
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
  title: { fontSize: 60, marginBottom: 40, marginTop: -50 },
  form: { width: "100%" },
  label: { fontSize: 16, marginTop: 45, marginLeft: 35, fontWeight: "bold" },
  textInputZone: {
    width: "80%",
    borderWidth: 3,
    borderColor: "black",
    paddingHorizontal: 10,
    height: 40,
    marginLeft: 35,
    marginTop: 15,
    color: "black",
    fontWeight: "bold",
  },
  forgot: { marginTop: 15, marginLeft: 35, fontSize: 13 },
  button: {
    marginTop: 30,
    borderWidth: 3,
    borderColor: "black",
    paddingHorizontal: 35,
    paddingVertical: 5,
  },
  buttonText: { fontSize: 20, fontWeight: "bold" },
});

export default Login;
