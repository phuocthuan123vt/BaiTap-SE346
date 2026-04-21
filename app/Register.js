import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = ({ navigation, onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleCreate = async () => {
    if (!name || !email || !pass) { Alert.alert("Error", "Fill all fields"); return; }
    
    // Tạo Alphanumeric ID 8 ký tự
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const success = await onRegister({ userId: randomId, name, email, password: pass });
    if (success) {
      Alert.alert("Success", "Account created!", [{ text: "OK", onPress: () => navigation.navigate("Login") }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.textInputZone} placeholder="Tester" onChangeText={setName} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.textInputZone} placeholder="test@mail.com" onChangeText={setEmail} autoCapitalize="none" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.textInputZone} placeholder="● ● ● ●" secureTextEntry onChangeText={setPass} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" },
  title: { fontSize: 45, fontWeight: "bold", marginBottom: 20 },
  form: { width: "100%" },
  label: { fontSize: 16, marginTop: 15, marginLeft: 35, fontWeight: "bold" },
  textInputZone: { width: "80%", borderWidth: 3, borderColor: "black", paddingHorizontal: 10, height: 45, marginLeft: 35, marginTop: 5, fontWeight: "bold" },
  button: { marginTop: 40, borderWidth: 3, borderColor: "black", paddingHorizontal: 35, paddingVertical: 10 },
  buttonText: { fontSize: 20, fontWeight: "bold" },
});

export default Register;