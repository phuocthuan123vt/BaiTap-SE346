import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Home = ({ navigation, listPosts, onPost, currentUser }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim().length === 0) return;
    onPost(text);
    setText("");
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={["#f09433", "#e6683c", "#dc2743", "#cc2366", "#bc1888"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientWrapper}
    >
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.userId}&background=random`,
              }}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.userIdText}>{item.userId}</Text>
              <Text style={styles.timeText}>
                {new Date(item.timeValue).toLocaleString()}
              </Text>
            </View>
          </View>
          <Ionicons name="ellipsis-horizontal" size={20} color="gray" />
        </View>
        <Text style={styles.descText}>{item.description}</Text>
        <View style={styles.postFooter}>
          <Ionicons name="heart-outline" size={24} color="black" />
          <Ionicons
            name="chatbubble-outline"
            size={22}
            color="black"
            style={{ marginLeft: 15 }}
          />
          <Ionicons
            name="paper-plane-outline"
            size={22}
            color="black"
            style={{ marginLeft: 15 }}
          />
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <Text style={styles.mainTitle}>Feed</Text>
      </View>

      <View style={styles.createPostContainer}>
        <Image
          source={{
            uri:
              currentUser?.avatarUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.inputAvatar}
        />
        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          value={text}
          onChangeText={setText}
          multiline
        />
        {text.length > 0 && (
          <TouchableOpacity style={styles.postBtn} onPress={handleSend}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Post</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={listPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  mainTitle: { fontSize: 28, fontWeight: "900" },
  topAvatar: { width: 35, height: 35, borderRadius: 18 },
  createPostContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  inputAvatar: { width: 40, height: 40, borderRadius: 20 },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    fontSize: 15,
  },
  postBtn: {
    backgroundColor: "#1877f2",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  gradientWrapper: {
    marginHorizontal: 12,
    marginTop: 15,
    padding: 1.5,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  postCard: { backgroundColor: "white", borderRadius: 14, padding: 15 },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 35, height: 35, borderRadius: 18 },
  userIdText: { fontWeight: "bold", fontSize: 14 },
  timeText: { fontSize: 10, color: "gray" },
  descText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#1c1e21",
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
});

export default Home;
