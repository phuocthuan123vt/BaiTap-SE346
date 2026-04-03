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

const Home = ({ listPosts, listComments, onPost, onComment, currentUser }) => {
  const [postText, setPostText] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  const handleSendPost = () => {
    if (postText.trim() === "") return;
    onPost(postText);
    setPostText("");
    Keyboard.dismiss();
  };

  const handleSendComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || text.trim() === "") return;
    onComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: "" });
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => {
    const myComments = listComments.filter((c) => c.postId === item.id);

    return (
      <LinearGradient
        colors={["#f09433", "#dc2743", "#bc1888"]}
        style={styles.gradientWrapper}
      >
        <View style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.userId}`,
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

          <Text style={styles.descText}>{item.description}</Text>

          {/* HIỂN THỊ DANH SÁCH COMMENT */}
          <View style={styles.commentSection}>
            {myComments.map((c) => (
              <View key={c.id} style={styles.commentBox}>
                <Text style={styles.commentUser}>{c.userId}: </Text>
                <Text style={styles.commentContent}>{c.content}</Text>
              </View>
            ))}
          </View>

          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.miniInput}
              placeholder="Write a comment..."
              value={commentInputs[item.id] || ""}
              onChangeText={(val) =>
                setCommentInputs({ ...commentInputs, [item.id]: val })
              }
            />
            <TouchableOpacity onPress={() => handleSendComment(item.id)}>
              <Ionicons name="send" size={20} color="#1877f2" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <Text style={styles.mainTitle}>Feed</Text>
      </View>

      <View style={styles.createPostContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          value={postText}
          onChangeText={setPostText}
        />
        <TouchableOpacity style={styles.postBtn} onPress={handleSendPost}>
          <Text style={{ color: "white" }}>Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  mainHeader: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  mainTitle: { fontSize: 24, fontWeight: "bold" },
  createPostContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  postBtn: { backgroundColor: "#1877f2", padding: 10, borderRadius: 20 },

  gradientWrapper: {
    marginHorizontal: 12,
    marginTop: 15,
    padding: 1.5,
    borderRadius: 15,
  },
  postCard: { backgroundColor: "white", borderRadius: 14, padding: 12 },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  avatar: { width: 30, height: 30, borderRadius: 15 },
  userIdText: { fontWeight: "bold", fontSize: 13 },
  timeText: { fontSize: 9, color: "gray" },
  descText: { fontSize: 15, marginBottom: 10 },

  commentSection: {
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  commentBox: { flexDirection: "row", marginBottom: 4 },
  commentUser: { fontWeight: "bold", fontSize: 12 },
  commentContent: { fontSize: 12, color: "#333" },

  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#f0f2f5",
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  miniInput: { flex: 1, height: 40, fontSize: 12 },
});

export default Home;
