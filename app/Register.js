import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

  const handleCreate = async () => {
    if (!name || !email || !pass || !confirmPass) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    if (pass !== confirmPass) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const newUserId = generateID();
      await onRegister({
        userId: newUserId,
        name: name,
        email: email,
        password: pass,
      });

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "Login Now",
          onPress: () => navigation.replace("Login"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not create account. Email might already exist.",
      );
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.textInputZone}
            placeholder="test"
            onChangeText={setName}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.textInputZone}
            placeholder="test@mail.com"
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
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
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 20 }}
        >
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginTop: 15,
    marginLeft: "10%",
    fontWeight: "bold",
    color: "#333",
  },
  textInputZone: {
    width: "80%",
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 12,
    height: 45,
    alignSelf: "center",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    borderWidth: 2,
    borderColor: "black",
    width: "80%",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    textDecorationLine: "underline",
    color: "blue",
    fontSize: 14,
  },
});

export default Register;
