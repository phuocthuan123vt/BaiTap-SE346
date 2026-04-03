import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";

import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import Settings from "./Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [db, setDb] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [listPosts, setListPosts] = useState([]);
  const [listComments, setListComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const generateRandomText = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyz  ";
    let res = "";
    for (let i = 0; i < length; i++)
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
  };

  useEffect(() => {
    async function initDB() {
      const database = await SQLite.openDatabaseAsync("social_app_v2.db");
      setDb(database);

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          userId TEXT PRIMARY KEY, 
          name TEXT, email TEXT, 
          password TEXT, address TEXT, 
          avatarUrl TEXT, description TEXT
        );
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          userId TEXT, description TEXT, 
          timeValue INTEGER
        );
        CREATE TABLE IF NOT EXISTS comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          postId INTEGER,
          userId TEXT,
          content TEXT,
          timeValue INTEGER
        );
      `);

      const firstUser = await database.getFirstAsync("SELECT * FROM users");
      if (!firstUser) {
        await seedInitialData(database);
      }

      await refreshData(database);
      setIsLoading(false);
    }
    initDB();
  }, []);

  const seedInitialData = async (database) => {
    const uId = "ADMIN888";
    await database.runAsync(
      "INSERT INTO users (userId, name, email, password) VALUES (?, ?, ?, ?)",
      [uId, "Admin User", "admin@test.com", "1234"],
    );
    for (let j = 0; j < 5; j++) {
      await database.runAsync(
        "INSERT INTO posts (userId, description, timeValue) VALUES (?, ?, ?)",
        [
          uId,
          "Welcome to our new social network! (Seed post)",
          Date.now() - j * 1000,
        ],
      );
    }
  };

  const refreshData = async (database) => {
    const allPosts = await database.getAllAsync(
      "SELECT * FROM posts ORDER BY timeValue DESC",
    );
    const allComments = await database.getAllAsync(
      "SELECT * FROM comments ORDER BY timeValue ASC",
    );
    setListPosts(allPosts);
    setListComments(allComments);
  };

  const handleRegister = async (newUser) => {
    if (!db) return;
    await db.runAsync(
      "INSERT INTO users (userId, name, email, password, address, avatarUrl, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        newUser.userId,
        newUser.name,
        newUser.email,
        newUser.password,
        "",
        "",
        "",
      ],
    );

    for (let i = 0; i < 5; i++) {
      await db.runAsync(
        "INSERT INTO posts (userId, description, timeValue) VALUES (?, ?, ?)",
        [newUser.userId, generateRandomText(60), Date.now() - i * 1000],
      );
    }
    await refreshData(db);
  };

  const handleLogin = async (email, password) => {
    const user = await db.getFirstAsync(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleAddPost = async (content) => {
    if (!currentUser || !db) return;
    await db.runAsync(
      "INSERT INTO posts (userId, description, timeValue) VALUES (?, ?, ?)",
      [currentUser.userId, content, Date.now()],
    );
    await refreshData(db);
  };

  const handleAddComment = async (postId, content) => {
    if (!currentUser || !db) return;
    await db.runAsync(
      "INSERT INTO comments (postId, userId, content, timeValue) VALUES (?, ?, ?, ?)",
      [postId, currentUser.userId, content, Date.now()],
    );
    await refreshData(db);
  };

  const handleUpdateUser = async (updatedInfo) => {
    if (!db) return;
    await db.runAsync(
      "UPDATE users SET name = ?, address = ?, avatarUrl = ?, description = ? WHERE userId = ?",
      [
        updatedInfo.name,
        updatedInfo.address,
        updatedInfo.avatarUrl,
        updatedInfo.description,
        updatedInfo.userId,
      ],
    );
    setCurrentUser(updatedInfo);
  };

  if (isLoading) return null;

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
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { height: 65, paddingBottom: 10 },
        })}
      >
        <Tab.Screen name="Home">
          {(props) => (
            <Home
              {...props}
              listPosts={listPosts}
              listComments={listComments}
              currentUser={currentUser}
              onPost={handleAddPost}
              onComment={handleAddComment}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => (
            <Profile
              key={currentUser?.userId}
              {...props}
              currentUser={currentUser}
              onSave={handleUpdateUser}
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
            {(props) => <Login {...props} onLogin={handleLogin} />}
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
