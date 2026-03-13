import React, { useState } from "react";
import { Alert, View } from "react-native";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [account, setAccount] = useState({ name: "", email: "", password: "" });

  const handleRegister = (name, email, pass) => {
    setAccount({ name, email, password: pass });
    setScreen("login");
    Alert.alert("Thông báo", "Đăng ký thành công!");
  };

  const handleLogin = (email, pass) => {
    if (email === account.email && pass === account.password && email !== "") {
      setScreen("profile");
    } else {
      Alert.alert(
        "Lỗi",
        "Email hoặc mật khẩu không khớp với tài khoản đã đăng ký!",
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {screen === "login" && (
        <Login
          chuyenSangRegister={() => setScreen("register")}
          onLogin={handleLogin}
        />
      )}
      {screen === "register" && (
        <Register
          chuyenSangLogin={() => setScreen("login")}
          onRegister={handleRegister}
        />
      )}
      {screen === "profile" && (
        <Profile user={account} onLogout={() => setScreen("login")} />
      )}
    </View>
  );
}
