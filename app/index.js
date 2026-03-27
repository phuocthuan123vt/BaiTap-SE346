import React, { useEffect, useState } from "react";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'; // IMPORT MỚI

import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import Settings from "./Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Các Key để lưu vào bộ nhớ
const USERS_KEY = "@list_users";
const POSTS_KEY = "@list_posts";
const CURRENT_USER_KEY = "@current_user";

export default function App() {
  const [listUsers, setListUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [listPosts, setListPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. LOAD DỮ LIỆU KHI MỞ APP
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedUsers = await AsyncStorage.getItem(USERS_KEY);
        const savedPosts = await AsyncStorage.getItem(POSTS_KEY);
        const savedCurrent = await AsyncStorage.getItem(CURRENT_USER_KEY);

        if (savedUsers) setListUsers(JSON.parse(savedUsers));
        
        // Nếu đã có bài post cũ thì load, nếu chưa có thì tạo mới 15 bài ngẫu nhiên
        if (savedPosts) {
          setListPosts(JSON.parse(savedPosts));
        } else {
          generateFakePosts(); 
        }

        if (savedCurrent) setCurrentUser(JSON.parse(savedCurrent));
      } catch (e) {
        console.error("Failed to load data", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // Hàm tạo dữ liệu giả (chỉ dùng nếu bộ nhớ trống)
  const generateFakePosts = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const generateID = () => {
      let res = "";
      for (let i = 0; i < 8; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
      return res;
    };
    const generateText = (len) => {
      const c = "abcdefghijklmnopqrstuvwxyz ";
      let res = "";
      for (let i = 0; i < len; i++) res += c.charAt(Math.floor(Math.random() * c.length));
      return res;
    };

    let tempPosts = [];
    for (let i = 0; i < 3; i++) {
      const fakeId = generateID();
      for (let j = 0; j < 5; j++) {
        tempPosts.push({
          id: Math.random().toString(),
          userId: fakeId,
          description: generateText(60),
          timeValue: Date.now() - Math.floor(Math.random() * 1000000000),
        });
      }
    }
    tempPosts.sort((a, b) => b.timeValue - a.timeValue);
    setListPosts(tempPosts);
    AsyncStorage.setItem(POSTS_KEY, JSON.stringify(tempPosts)); // Lưu luôn vào storage
  };

  // 2. CÁC HÀM XỬ LÝ DỮ LIỆU (CÓ LƯU VÀO ASYNC STORAGE)
  const handleRegister = async (newUser) => {
    const updatedUsers = [...listUsers, { ...newUser, address: "", avatarUrl: "", description: "" }];
    setListUsers(updatedUsers);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  };

  const handleUpdateUser = async (updatedInfo) => {
    const newList = listUsers.map((u) => u.email === updatedInfo.email ? updatedInfo : u);
    setListUsers(newList);
    setCurrentUser(updatedInfo);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(newList));
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedInfo));
  };

  const handleAddPost = async (content) => {
    if (!currentUser) return;
    const newPost = {
      id: Date.now().toString(),
      userId: currentUser?.userId || "Unknown",
      description: content,
      timeValue: Date.now(),
    };
    const updatedPosts = [newPost, ...listPosts];
    setListPosts(updatedPosts);
    await AsyncStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
  };

  const handleSetCurrentUser = async (user) => {
    setCurrentUser(user);
    if (user) {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    }
  };

  if (isLoading) return null; // Hoặc một màn hình Loading

  function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = route.name === "Home" ? "home" : route.name === "Profile" ? "person" : "settings";
            return <Ionicons name={focused ? iconName : iconName + "-outline"} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1877f2",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { height: 65, paddingBottom: 10 },
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <Home {...props} listPosts={listPosts} currentUser={currentUser} onPost={handleAddPost} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => <Profile key={currentUser?.email} {...props} currentUser={currentUser} onSave={handleUpdateUser} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {(props) => <Settings {...props} onLogout={() => handleSetCurrentUser(null)} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        {/* Nếu đã có user trong storage thì vào thẳng Main (Auto-login) */}
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={currentUser ? "Main" : "Login"}>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} listUsers={listUsers} setCurrentUser={handleSetCurrentUser} />}
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