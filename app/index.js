import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert } from "react-native";

import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import Settings from "./Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BASE_URL = "http://blackntt.net:4321";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [listPosts, setListPosts] = useState([]);

  // KIỂM TRA DÒNG NÀY: Phải có setIsLoading
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      const data = await response.json();
      setListPosts(data);
    } catch (error) {
      console.log("Fetch posts error:", error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/login?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: { accept: "application/json" },
        },
      );

      const loginData = await response.json();

      if (response.ok) {
        // Cố gắng lấy Profile chi tiết
        const profileRes = await fetch(`${BASE_URL}/profile/${email}`);
        const profileData = await profileRes.json();

        // MẸO CỨU CÁNH: Nếu Profile bị "Not Found", ta tự xây dựng currentUser từ dữ liệu Login
        if (!profileRes.ok || profileData.detail === "Not Found") {
          console.log(
            "MẸO: Server lỗi Profile, tự tạo data từ Login response...",
          );
          setCurrentUser({
            email: email,
            name: loginData.name || "User", // Lấy tên "skibidi" từ server gửi về lúc nãy
            description: "Default ID",
          });
        } else {
          // Nếu server trả về Profile xịn thì dùng luôn
          setCurrentUser(profileData);
        }

        await fetchAllPosts();
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        Alert.alert("Login Failed", "Check your email/password");
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Server is offline");
      return false;
    }
  };

  const handleRegister = async (newUser) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password,
          name: newUser.name,
          description: newUser.userId,
        }),
      });
      return response.ok;
    } catch (e) {
      return false;
    }
  };

  const handleAddPost = async (content) => {
    console.log("--- DEBUG POST ---");
    console.log("1. Dữ liệu User hiện tại:", currentUser);
    console.log("2. Nội dung bài đăng:", content);

    // Kiểm tra xem User đã đăng nhập và có Email chưa
    if (!currentUser?.email) {
      console.log("LỖI: currentUser rỗng hoặc không có email!");
      Alert.alert("Error", "User info not found. Please re-login.");
      return;
    }

    const postPayload = {
      title: "Post by " + (currentUser.name || "User"),
      description: content,
      creator_email: currentUser.email,
    };

    console.log("3. Gửi Payload lên Server:", JSON.stringify(postPayload));

    try {
      const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json", // BẮT BUỘC
        },
        body: JSON.stringify(postPayload),
      });

      console.log("4. Trạng thái HTTP từ Server:", res.status);

      const resData = await res.json();
      console.log("5. Phản hồi từ Server:", resData);

      if (res.ok) {
        console.log("6. ĐĂNG BÀI THÀNH CÔNG!");
        await fetchAllPosts(); // Tải lại danh sách
      } else {
        console.log("6. ĐĂNG BÀI THẤT BẠI (Lỗi Logic):", resData);
        Alert.alert(
          "Server Error",
          resData.detail?.[0]?.msg || "Failed to post",
        );
      }
    } catch (e) {
      console.log("6. LỖI KẾT NỐI MẠNG:", e);
      Alert.alert("Network Error", "Cannot connect to server.");
    }
    console.log("------------------");
  };

  const handleDeletePost = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: { accept: "application/json" },
    });

    if (res.ok) {
      Alert.alert("Success", "Post deleted successfully!");
      await fetchAllPosts();
    } else {
      const errorData = await res.json();
      Alert.alert("Error", errorData.detail || "Cannot delete this post");
    }
  } catch (e) {
    console.log("Delete error:", e);
    Alert.alert("Error", "Server connection failed");
  }
};

  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName =
              route.name === "Home"
                ? "home"
                : route.name === "Profile"
                  ? "person"
                  : "settings";
            return (
              <Ionicons
                name={focused ? iconName : iconName + "-outline"}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#1877f2",
        })}
      >
        <Tab.Screen name="Home">
          {(props) => (
            <Home
              {...props}
              listPosts={listPosts}
              onPost={handleAddPost}
              onDelete={handleDeletePost}
              onRefresh={fetchAllPosts}
              currentUser={currentUser}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => (
            <Profile
              key={currentUser?.email}
              {...props}
              currentUser={currentUser}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {(props) => (
            <Settings {...props} onLogout={() => setCurrentUser(null)} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => (
              <Login {...props} onLogin={handleLogin} isLoading={isLoading} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <Register {...props} onRegister={handleRegister} />}
          </Stack.Screen>
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
