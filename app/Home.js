import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Home = ({
  navigation,
  listPosts,
  onPost,
  onDelete,
  onRefresh,
  currentUser,
}) => {
  const [text, setText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Xử lý đăng bài
  const handleSend = () => {
    if (text.trim().length === 0) return;
    onPost(text);
    setText("");
    Keyboard.dismiss();
  };

  // Xử lý kéo xuống để làm mới danh sách
  const onPullToRefresh = async () => {
    setRefreshing(true);
    if (onRefresh) await onRefresh();
    setRefreshing(false);
  };

  // Xác nhận trước khi xóa bài
  const confirmDelete = (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to remove this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => onDelete(postId),
        style: "destructive",
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={["#f09433", "#dc2743", "#bc1888"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientWrapper}
    >
      <View style={styles.postCard}>
        {/* Header bài đăng */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.creator_name || "U"}&background=random`,
              }}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.userNameText}>
                {item.creator_name || "Unknown"}
              </Text>
              <Text style={styles.timeText}>{item.created_at}</Text>
            </View>
          </View>

          {/* Nút Xóa bài viết */}
          <TouchableOpacity onPress={() => confirmDelete(item.id)}>
            <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
          </TouchableOpacity>
        </View>

        {/* Nội dung bài đăng */}
        <View style={styles.postBody}>
          {item.title && <Text style={styles.postTitleText}>{item.title}</Text>}
          <Text style={styles.descText}>{item.description}</Text>
        </View>

        {/* Footer tương tác giả */}
        <View style={styles.postFooter}>
          <View style={styles.footerAction}>
            <Ionicons name="heart-outline" size={24} color="black" />
            <Text style={styles.actionText}>Like</Text>
          </View>
          <View style={[styles.footerAction, { marginLeft: 20 }]}>
            <Ionicons name="chatbubble-outline" size={22} color="black" />
            <Text style={styles.actionText}>Comment</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {/* Header trang Feed */}
      <View style={styles.mainHeader}>
        <Text style={styles.mainTitle}>Feed API</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{
              uri:
                currentUser?.avatarUrl ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.topAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* Ô nhập bài đăng kiểu Facebook */}
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
          placeholderTextColor="#8e8e8e"
          value={text}
          onChangeText={setText}
          multiline
        />
        {text.trim().length > 0 && (
          <TouchableOpacity style={styles.postBtn} onPress={handleSend}>
            <Text style={styles.postBtnText}>Post</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Danh sách bài đăng */}
      <FlatList
        data={listPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={{ color: "gray" }}>No posts available.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },

  // Header Style
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 12,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  mainTitle: { fontSize: 26, fontWeight: "900", color: "#1877f2" },
  topAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },

  // Create Post Area Style
  createPostContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    marginBottom: 5,
    elevation: 2,
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
    maxHeight: 100,
  },
  postBtn: {
    backgroundColor: "#1877f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  postBtnText: { color: "white", fontWeight: "bold" },

  // Post Card Style (Modern & Radiant)
  gradientWrapper: {
    marginHorizontal: 12,
    marginTop: 15,
    padding: 1.5,
    borderRadius: 16,
    // Đổ bóng cho Android & iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  postCard: { backgroundColor: "white", borderRadius: 15, padding: 15 },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 38, height: 38, borderRadius: 19 },
  userNameText: { fontWeight: "bold", fontSize: 15, color: "#050505" },
  timeText: { fontSize: 11, color: "#65676b" },

  postBody: { marginBottom: 15 },
  postTitleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1877f2",
    marginBottom: 4,
  },
  descText: { fontSize: 16, color: "#1c1e21", lineHeight: 22 },

  postFooter: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    paddingTop: 12,
    alignItems: "center",
  },
  footerAction: { flexDirection: "row", alignItems: "center" },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#65676b",
  },

  emptyBox: { marginTop: 50, alignItems: "center" },
});

export default Home;
