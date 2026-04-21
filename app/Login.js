import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = ({ navigation, onLogin, isLoading }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignIn = async () => {
    if (isLoading) return;
    const success = await onLogin(email, pass);
    if (success) {
      navigation.replace("Main");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
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
          placeholder="● ● ● ●"
          secureTextEntry
          onChangeText={setPass}
        />
      </View>
      <View style={styles.navigate}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.navText}>Register Now</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Loading..." : "Sign in"}
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
  title: { fontSize: 60, marginBottom: 40, fontWeight: "bold" },
  form: { width: "100%" },
  label: { fontSize: 16, marginTop: 40, marginLeft: 35, fontWeight: "bold" },
  textInputZone: {
    width: "80%",
    borderWidth: 3,
    borderColor: "black",
    paddingHorizontal: 10,
    height: 45,
    marginLeft: 35,
    marginTop: 10,
    fontWeight: "bold",
  },
  navigate: { width: "80%", alignItems: "flex-end", marginTop: 10 },
  navText: { fontSize: 14, textDecorationLine: "underline", color: "blue" },
  button: {
    marginTop: 40,
    borderWidth: 3,
    borderColor: "black",
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  buttonText: { fontSize: 22, fontWeight: "bold" },
});

export default Login;
