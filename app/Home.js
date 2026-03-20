import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Home = ({ navigation, listPosts }) => {
  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.userIdText}>User ID: {item.userId}</Text>
        <Text style={styles.timeText}>
          {new Date(item.timeValue).toLocaleString()}
        </Text>
      </View>
      <Text style={styles.descText}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
      </View>

      <FlatList
        data={listPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 25 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  title: { fontSize: 40, fontWeight: "bold" },
  profileLink: { color: "blue", fontSize: 16, textDecorationLine: "underline" },
  postCard: {
    borderWidth: 2,
    borderColor: "black",
    padding: 15,
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  userIdText: { fontWeight: "bold", fontSize: 13 },
  timeText: { fontSize: 10, color: "gray" },
  descText: { fontSize: 15, fontStyle: "italic", color: "#333" },
});

export default Home;
