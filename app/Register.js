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

const Register = ({ chuyenSangLogin, onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleCreate = () => {
    if (!name || !email || !pass || !confirmPass) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tất cả các ô!");
      return;
    }
    if (pass !== confirmPass) {
      Alert.alert(
        "Lỗi mật khẩu",
        "Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại!",
      );
      return;
    }
    onRegister(name, email, pass);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInputZone}
            placeholder="test"
            placeholderTextColor="black"
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.textInputZone}
            placeholder="test@mail.com"
            placeholderTextColor="black"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.textInputZone}
            placeholder=" ●   ●   ●   ● "
            placeholderTextColor="black"
            secureTextEntry
            onChangeText={setPass}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.textInputZone}
            placeholder=" ●   ●   ●   ● "
            placeholderTextColor="black"
            secureTextEntry
            onChangeText={setConfirmPass}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={chuyenSangLogin} style={{ marginTop: 20 }}>
          <Text style={{ textDecorationLine: "underline" }}>
            Already have an account? Login
          </Text>
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
  },
  title: { fontSize: 40, fontWeight: "bold", marginBottom: 20, marginTop: -50 },
  form: { width: "100%" },
  label: { fontSize: 16, marginTop: 15, marginLeft: 35, fontWeight: "bold" },
  textInputZone: {
    width: "80%",
    borderWidth: 3,
    borderColor: "black",
    paddingHorizontal: 10,
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    color: "black",
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
