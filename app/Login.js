import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = ({ navigation, listUsers, setCurrentUser, onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignIn = async () => { 
    const success = await onLogin(email, pass);
    if (success) {
      navigation.replace("Main");
    } else {
      Alert.alert("Error", "Invalid email or password!");
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
          placeholder=" ●   ●   ●   ● "
          secureTextEntry
          onChangeText={setPass}
        />
      </View>
      <View style={styles.navigate}>
        <TouchableOpacity>
          <Text style={styles.navText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("Register")}>
          <Text style={styles.navText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
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
  title: { fontSize: 60, marginBottom: 40 },
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
    fontWeight: "bold",
  },
  navigate: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
    marginRight: 46,
  },
  navText: {
    marginTop: 15,
    marginLeft: 35,
    fontSize: 13,
    textDecorationLine: "underline",
  },
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
