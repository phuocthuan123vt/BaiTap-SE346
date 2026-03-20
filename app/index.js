import React, { useState, useEffect } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';

const Stack = createStackNavigator();

export default function App() {
  const [listUsers, setListUsers] = useState([]); 
  const [currentUser, setCurrentUser] = useState(null);
  const [listPosts, setListPosts] = useState([]);

  const generateID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let res = '';
    for (let i = 0; i < 8; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
  };

  const generateRandomText = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz ';
    let res = '';
    for (let i = 0; i < length; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
  };

  // TỰ ĐỘNG TẠO DỮ LIỆU KHI MỞ APP
  useEffect(() => {
    let tempPosts = [];
    for (let i = 0; i < 3; i++) {
      const fakeUserId = generateID(); 
      for (let j = 0; j < 5; j++) {
        // Tạo một mốc thời gian ngẫu nhiên trong quá khứ (trong vòng 10 ngày qua)
        const randomTime = Date.now() - Math.floor(Math.random() * 1000000000);
        
        tempPosts.push({
          id: Math.random().toString(),
          userId: fakeUserId,
          description: generateRandomText(50),
          timeValue: randomTime // Dùng số này để sort
        });
      }
    }

    // SẮP XẾP: Lấy timeValue lớn nhất (mới nhất) lên đầu
    tempPosts.sort((a, b) => b.timeValue - a.timeValue);

    setListPosts(tempPosts);
  }, []);

  const handleRegister = (newUser) => {
    const fullUser = { ...newUser, address: '', avatarUrl: '', description: '' };
    setListUsers([...listUsers, fullUser]);
  };

  const handleUpdateUser = (updatedInfo) => {
    const newList = listUsers.map(user => user.email === updatedInfo.email ? updatedInfo : user);
    setListUsers(newList);
    setCurrentUser(updatedInfo);
  };

  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} listUsers={listUsers} setCurrentUser={setCurrentUser} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <Register {...props} onRegister={handleRegister} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {(props) => <Home {...props} listPosts={listPosts} />}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            {(props) => <Profile key={currentUser?.email} {...props} currentUser={currentUser} onSave={handleUpdateUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}